const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')
const mongoose = require('mongoose')
const Paper = require('../server/models/Paper')

const getAll = () => (
  fetch('http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=120')
    .then(r => r.text())
    .then((r) => {
      const dom = new JSDOM(r).window
      const entries = Array.from(dom.document.querySelectorAll('entry'))
        .map(x => ({
          id: x.querySelector('id').textContent,
          authors: Array.from(x.querySelectorAll('author > name'))
            .map(y => y.textContent),
          title: x.querySelector('title').textContent,
          summary: x.querySelector('summary').textContent,
          published: x.querySelector('published').textContent,
          updated: x.querySelector('updated').textContent,
        }))
      console.log('download complete')
      return entries
    })
)


const populate = (entries) => {
  const all = entries.map(x =>
    new Paper({
      title: x.title,
      authors: x.authors.join(','),
      abstract: x.summary,
      submit_date: x.published,
      edit_date: x.updated,
      submitter_id: '1',
      deleted: false,
    })
      .saveWithAutoId())

  return Promise.all(all)
    .then(() => console.log('done'))
    .catch(console.error)
}


mongoose.connect('mongodb://localhost:27017/manypapers')
  .then(getAll)
  .then(populate)
  .catch(console.error)
  .then(() => mongoose.connection.close())
