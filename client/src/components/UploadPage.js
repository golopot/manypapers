import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Header from './Header'
import Uploader from './Uploader'


export default class UploadPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Uploader />
      </div>
    )
  }
}
