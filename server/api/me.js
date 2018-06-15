const User = require('../models/User')

const GET = (req, res, next) => {
  console.log(req.userId)
  User.collection.findOne({ _id: req.userId })
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
  User.collection.updateOne({
    _id: req.userId,
  }, {
    $set: {
      display_name: req.body.display_name,
    },
  })
    .then(() => {
      res.json({ message: 'Success' })
    })
    .catch(next)
}

module.exports = {
  GET,
  PATCH,
}
