import React from 'react'
import PropTypes from 'prop-types'

import Uploader from './Uploader'
import PaperList from './PaperList'
import Header from './Header'

export default function Home({ initialData }) {
  return (
    <div>
      <Header />
      <PaperList papers={initialData} />
    </div>
  )
}

Home.propTypes = {
  initialData: PropTypes.arrayOf(PropTypes.object).isRequired,
}

Home.dataUrl = () => '/api/paper'
