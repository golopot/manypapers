const Paper = require('../models/Paper')
const path = require('path')
const upload = require('multer')({ dest: path.join(__dirname, '../uploads') })
const Storage = require('@google-cloud/storage')
const fs = require('fs')
const unlink = require('util').promisify(fs.unlink)
const config = require('../../config')

const storage = new Storage({
  keyFilename: '/home/jchn/Krust-58cde96d52f7.json',
})


const badRequest = x => x

const GET = (req, res, next) => {
  Paper.collection
    .find({})
    .sort({ submit_date: -1 })
    .toArray()
    .then((docs) => {
      res.json(docs.map(x => ({
        ...x,
        pdf_url: `${config.protocol}://${config.hostname}/pdf/${x._id}`,
      })))
      next()
    })
    .catch(next)
}

const GET$ = (req, res, next) => {
  Paper.collection
    .findOne({ _id: req.params.id })
    .then((doc) => {
      res.json({
        ...doc,
        pdf_url: `${config.protocol}://${config.hostname}/pdf/${doc._id}`,
      })
      next()
    })
    .catch(next)
}

const POST = [
  upload.single('file'),
  (req, res, next) => {
    console.log(req.file)

    if (req.file === undefined) {
      next(badRequest('Upload file is required.'))
      return
    }
    console.log(req.body)
    const { title, authors, abstract } = req.body

    if (!title.length >= 1) {
      next(badRequest('title is invalid.'))
      return
    }

    const authorsList = authors.split(',')
      .map(x => x.trim())

    const doc = {
      title,
      authors: authorsList,
      abstract: abstract.replace(/\r\n/g, '\n'),
      submitter_id: req.userId,
      submit_date: new Date(),
      deleted: false,
    }
    new Paper(doc)
      .saveWithAutoId()
      .then(({ _id }) =>
        storage
          .bucket('manypapers-dev')
          .upload(req.file.path, {
            destination: `${_id}.pdf`,
            resumable: false,
          })
          .then(() => unlink(req.file.path))
          .then(() => {
            res.json({ id: _id })
            next()
          }))
      .catch(next)
  },
]

const PATCH$ = [
  upload.none(),
  (req, res, next) => {
    const { title, abstract, authors } = req.body
    if (!title.length >= 1) {
      next(badRequest('title is invalid.'))
      return
    }

    const authorsList = authors.split(',')
      .map(x => x.trim())

    const doc = {
      title,
      authors: authorsList,
      abstract: abstract.replace(/\r\n/g, '\n'),
    }

    Paper.updateOne({ _id: req.params.id }, { $set: doc })
      .then(r => console.log(r))
      .then(() => res.json({}))
      .catch(next)
  }]

module.exports = {
  GET,
  GET$,
  POST,
  PATCH$,
}
