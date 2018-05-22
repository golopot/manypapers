import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'

const root = document.querySelector('.react-root')

ReactDom.hydrate(
  <BrowserRouter>
    <App initialData={window.__INITIAL_DATA__} />
  </BrowserRouter>
  , root
)
