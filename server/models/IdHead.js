const mongoose = require('mongoose')

module.exports = mongoose.model(
  'IdHead',
  mongoose.Schema({
    _id: { type: String, required: true },
    id_head: { type: Number, required: true },
  })
)
