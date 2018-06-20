const config = require('../config')
const qs = require('qs')
const fetch = require('node-fetch')
const { getAuthtoken } = require('./api/auth')
const User = require('./models/User')
const logger = require('./logger')

const BadRequest = x => x

const google = (req, res) => {
  const query = {
    client_id: config.oauth_id_google,
    redirect_uri: `${config.protocol}://${config.hostname}/oauth-callback`,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/userinfo.email',
    include_granted_scopes: 'true',
  }

  const base = 'https://accounts.google.com/o/oauth2/auth'

  res.redirect(`${base}?${qs.stringify(query)}`)
}

const callback = (req, res, next) => {
  const { code } = req.query
  if (!code) next('Authorization code is not provided.')

  const getAccessToken = () => (
    fetch(
      'https://www.googleapis.com/oauth2/v4/token',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: qs.stringify({
          code,
          client_id: config.oauth_id_google,
          client_secret: config.oauth_secret_google,
          redirect_uri: `${config.protocol}://${config.hostname}/oauth-callback`,
          grant_type: 'authorization_code',
        }),
      }
    )
      .then(r => r.json())
      .then((r) => {
        if (r.error) throw Error(r.error)
        if (!r.access_token) throw BadRequest('access_token is not provided.')
        return r.access_token
      })
  )

  const fetchApi = accessToken => (
    fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
      .then(r => r.json())
      .then((r) => {
        if (r.error) throw Error(r.error)
        return r
      })
  )

  const createUser = ({ id, email, name }) => (
    new User({
      google_id: id,
      email,
      display_name: name,
      create_date: new Date(),
      role: 'normal',
    })
      .saveWithAutoId()
      .then(x => (logger.info(`Created user ${x}`), x))
      .then(user => User.collection.findOne({ _id: user._id }))
  )

  const findOrCreateUser = info => (
    User.collection.findOne({ google_id: info.id })
      .then(x => x || createUser(info))
  )

  const sendResponse = (user) => {
    logger.info(`User login: ${user._id} `)
    res.cookie('authtoken', getAuthtoken(user._id))
    res.cookie('userId', user._id)
    res.redirect('/')
  }

  Promise.resolve()
    .then(getAccessToken)
    .then(fetchApi)
    .then(findOrCreateUser)
    .then(sendResponse)
    .catch(next)
}

module.exports = {
  google,
  callback,
}
