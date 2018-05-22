const IdHead = require('../IdHead')

function saveWithAutoId() {
  const { name } = this.collection
  return Promise.resolve()
    .then(() => IdHead.collection.findOneAndUpdate(
      { _id: name },
      {
        $setOnInsert: { id_head: 0 },
      },
      {
        upsert: true,
      }
    ))
    .then(() => IdHead.collection.findOneAndUpdate(
      { _id: name },
      {
        $inc: { id_head: 1 },
      },
      {
        upsert: true,
        returnOriginal: false,
      }
    ))
    .then((doc) => {
      this._id = doc.value.id_head
      return this.save()
    })
}

module.exports = saveWithAutoId
