import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags'
import styled from 'styled-components'
import Header from './Header'

const routerPropTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const StyledPaperPage = styled.div`
  .authors {
    font-size: 20px;
    padding: 10px 0;
  }
  .abstract {
    font-size: 20px;
    padding: 10px 0;
  }
  .title {
    font-size: 26px;
    padding: 20px 0;
  }
`

class PaperPage extends Component {
  static propTypes = {
    ...routerPropTypes,
  }

  static dataUrl = id => `/api/paper/${id}`

  render() {
    const { title, authors, abstract } = this.props.initialData
    const { id } = this.props.match.params
    return (
      <StyledPaperPage>
        <MetaTags>
          <meta name="citation_title" content={title} />
          <meta name="citation_pdf_url" content={`http://domain/${id}`} />
        </MetaTags>
        <Header />
        <h1>{title}</h1>
        <h2>{authors}</h2>
        <div>{abstract}</div>
        <div>
          <a href={`/pdf/${id}`}>Download</a>
        </div>
      </StyledPaperPage>
    )
  }
}

export default withRouter(PaperPage)
