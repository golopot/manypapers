const mongoose = require('mongoose')
const M = require('./utils/Moi')
const saveWithAutoId = require('./utils/saveWithAutoId')

module.exports = mongoose.model(
  'Paper',
  mongoose.Schema(M.translate({
    _id: M.string().required(),
    title: M.string().required(),
    authors: M.string().required(),
    submitter_id: M.string().required(),
    abstract: M.string().required(),
    submit_date: M.date().required(),
    edit_date: M.date(),
    delete_date: M.date(),
    deleted: M.boolean().required(),
  }))
    .method('saveWithAutoId', saveWithAutoId)
)
