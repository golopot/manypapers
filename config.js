const assert = require('assert')
const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: `${__dirname}/env.dev` })
}

const e = process.env

const config = {
  hostname: e.hostname,
  protocol: e.protocol,
  mongourl: e.mongourl,
  appsecret: e.appsecret,
  oauth_id_google: e.oauth_id_google,
  oauth_secret_google: e.oauth_secret_google,
}

Object.entries(config)
  .forEach(([key, value]) => {
    assert.notStrictEqual(value, undefined, `Environment variable "${key}" is required.`)
  })

module.exports = config
