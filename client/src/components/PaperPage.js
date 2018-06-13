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

  main {
    display: flex;

    > .left {
    }

    aside {
      min-width: 260px;
      padding: 0 24px;

      h3 {
        font-weight: 400;
        font-size: 1.2em;
        margin: 12px 0;
      }
    }
  }

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
  .download {
    display: inline-block;
    width: 110px;
    padding: 3px 0px;
    height: auto;
    text-align: center;
    border-radius: 3px;
    border: 2px solid #0a0a0a;
    background: #c2d081;
    margin: 22px 0;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0 0 35px;
  }

  ul > li {
    padding: 6px 0;
  }
`

class PaperPage extends Component {
  static propTypes = {
    ...routerPropTypes,
  }

  static dataUrl = id => `/api/paper/${id}`

  render() {
    const {
      title, authors, abstract, submit_date, submitter_id,
    } = this.props.initialData
    const { id } = this.props.match.params
    return (
      <StyledPaperPage>
        <MetaTags>
          <meta name="citation_title" content={title} />
          <meta name="citation_pdf_url" content={`http://domain/${id}`} />
        </MetaTags>
        <Header />
        <main>
          <div className="left">
            <h1>{title}</h1>
            <div>{abstract}</div>
          </div>
          <aside>
            <div>
              <a href={`/pdf/${id}`} className="download">Download</a>
            </div>

            <div>
              <h3>作者</h3>
              <ul>{authors.map(x => <li>{x}</li>)}</ul>
            </div>

            <div>
              <h3>提交日期</h3>
              <ul>
                <li>
                  <div>{new Date(submit_date).toISOString().slice(0, 10)}</div>
                </li>
              </ul>
            </div>

            <div>
              <h3>提交者</h3>
              <ul>
                <li>
                  <div>{submitter_id}</div>
                </li>
              </ul>
            </div>
          </aside>
        </main>
      </StyledPaperPage>
    )
  }
}

export default withRouter(PaperPage)
