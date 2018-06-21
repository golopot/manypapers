const User = require('../models/User')
const Paper = require('../models/Paper')
const Joi = require('joi')

const badRequest = x => x

const GET = (req, res, next) => {
  console.log(req.userId)
  User.collection
    .findOne({ _id: req.userId })
    .then((doc) => {
      if (doc === null) {
        next('User not found.')
        return
      }
      res.json(doc)
    })
    .catch(next)
}

const PATCH = (req, res, next) => {
  const { error } = Joi.validate(req.body, Joi.object({
    display_name: Joi.string().min(1).max(40).label('name'),
  }))

  if (error) {
    next(badRequest(error.details.pop().message))
    return
  }

  Promise.resolve()
    .then(() => User.collection.updateOne(
      { _id: req.userId },
      { $set: { display_name: req.body.display_name } }
    ))
    .then(() => Paper.collection.updateMany(
      { submitter_id: req.userId },
      { $set: { submitter_display_name: req.body.display_name } }
    ))
    .then(() => {
      res.json({ message: 'Success' })
    })
    .catch(next)
}

module.exports = {
  GET,
  PATCH,
}
