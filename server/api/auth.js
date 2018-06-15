const { appsecret } = require('../../config')
const jwt = require('jsonwebtoken')

const badRequest = x => x

const getAuthtoken = userId => jwt.sign({ userId }, appsecret)

const auth = (req, res, next) => {
  /* csrf check */
  if (!req.headers['x-csrf']) {
    throw badRequest('API requests that requires authentication must include the header `x-csrf: 1`.')
  }

  jwt.verify(req.cookies.authtoken, appsecret, (err, decoded) => {
    if (err) {
      console.log(err)
      next('Authentication error')
      return
    }
    req.userId = decoded.userId
    next()
  })
}


module.exports = {
  auth,
  getAuthtoken,
}
