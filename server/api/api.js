const express = require('express')
const bodyParser = require('body-parser')
const paper = require('./paper')
const auth = require('./auth')
const me = require('./me')

const router = express.Router()

router.get('/paper', paper.GET)
router.get('/paper/:id', paper.GET$)
router.post('/paper', auth.auth, paper.POST)
router.get('/me', auth.auth, me.GET)
router.patch('/me', auth.auth, me.PATCH)

const routerWrapper = express.Router()
routerWrapper.use(bodyParser.json())
routerWrapper.use(router)
routerWrapper.use((req, res, next) => {
  const matched = router.stack.some(layer => layer.regexp.test(req.url))

  if (!matched) {
    res.status(404).json({ error: 'Not Found' })
  }
  next()
})

routerWrapper.use((err, req, res, next) => {
  console.log(err)

  if (typeof err === 'string') {
    res.status(400).json({
      error: err,
    })
    return
  }

  res.status(500).json({
    error: '500 Server Error',
  })

  next()
})


module.exports = routerWrapper
