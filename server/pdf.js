const Storage = require('@google-cloud/storage')

const storage = new Storage()


const GET$ = (req, res, next) => {
  const file = storage
    .bucket('manypapers-dev')
    .file(`${req.params.id}.pdf`)

  file
    .getMetadata()
    .then((data) => {
      const { size } = data[0]

      res.setHeader('content-length', size)
      res.setHeader('content-type', 'application/pdf')
      // res.setHeader('etag', etag)

      file
        .createReadStream()
        .on('error', (err) => {
          console.log(err)
          res.end()
        })
        .on('response', () => {
        })
        .on('end', () => {
          res.end()
        })
        .pipe(res)
    })
    .catch((err) => {
      if (err.code === 404) {
        res.status(404).send(`No such file "${req.params.id}.pdf"`)
        return
      }
      next(err)
    })
}

module.exports = {
  GET$,
}
