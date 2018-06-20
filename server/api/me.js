const User = require('../models/User')
const Paper = require('../models/Paper')

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
