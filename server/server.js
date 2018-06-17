const config = require('../config')
const mongoose = require('mongoose')
const api = require('./api/api')
const express = require('express')
const nunjucks = require('nunjucks')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const App = require('../dist/js/App').default
const { routes } = require('../dist/js/App')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { StaticRouter, matchPath } = require('react-router-dom')
const pdf = require('./pdf')
const oauth = require('./oauth')
const serialize = require('serialize-javascript')
const { ServerStyleSheet } = require('styled-components')
const html = require('./html')
const fetch = require('node-fetch')

const MetaTagsServer = require('react-meta-tags/server')
const { MetaTagsContext } = require('react-meta-tags')


const h = React.createElement

const app = express()
nunjucks.configure('views', { express: app })

app.get('/pdf/:id', pdf.GET$)

app.use(compression())
app.use(cookieParser())
app.disable('x-powered-by')

app.use('/js', express.static(`${__dirname}/../dist/js`))
app.use('/css', express.static(`${__dirname}/../dist/css`))
app.use('/assets', express.static(`${__dirname}/../assets`))

app.use('/api', api)

app.get('/login-google', oauth.google)
app.get('/oauth-callback', oauth.callback)

app.get(routes.map(x => x.path), (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route))

  if (activeRoute) {
    const { id } = matchPath(req.url, activeRoute)
      .params
    const fetchData = activeRoute.component.dataUrl
      ? fetch(`http://localhost:9090${activeRoute.component.dataUrl(id)}`)
        .then(r => r.json())
      : Promise.resolve({})

    fetchData
      .then((data) => {
        const sheet = new ServerStyleSheet()

        const metaTagsServer = MetaTagsServer()

        const wrapRouter = C =>
          h(
            StaticRouter,
            { location: req.url, context: {} },
            h(C, { initialData: data })
          )

        const wrapStyle = C => sheet.collectStyles(C)

        const wrapMeta = C => h(
          MetaTagsContext,
          { extract: metaTagsServer.extract },
          C
        )

        const body = ReactDOMServer.renderToString(wrapMeta(wrapStyle(wrapRouter(App))))

        res.send(html({
          meta: metaTagsServer.renderToString(),
          initialData: serialize(data),
          styles: sheet.getStyleTags(),
          body,
        }))
      })
      .catch(next)
  }
})

app.use((req, res, next) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang='zh'>
    <head>
      <title>Not found</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      <pre>Not found: ${req.method} ${req.url}</pre>
    </body>
    </html>`)
  next()
})

app.use((err, req, res, next) => {
  if (/^\/api\//.test(req.url)) {
    next()
    return
  }
  console.log(err)
  res.send('Server error.')
  next()
})


Promise.resolve()
  .then(() => (
    mongoose.connect(config.mongourl)
      .then(() => console.log(`Mongodb is connected. ${config.mongourl}`))
  ))
  .then(() => {
    app.listen(9090, () => {
      console.log('Server listening on http://localhost:9090')
    })
  })
  .catch(console.error)
