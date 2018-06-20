const mongoose = require('mongoose')
const M = require('./utils/Moi')
const saveWithAutoId = require('./utils/saveWithAutoId')

const User = mongoose.model(
  'User',
  mongoose.Schema(M.translate({
    _id: M.string().required(),
    role: {
      type: String,
      enum: [
        'sysop',
        'sample-submitter',
        'normal',
      ],
      required: true,
    },
    google_id: M.string(),
    display_name: M.string(),
    email: M.string(),
    create_date: M.date().required(),
  }))
    .method('saveWithAutoId', saveWithAutoId)
)

User.collection.createIndex({ google_id: 1 }, { unique: true })

module.exports = User
