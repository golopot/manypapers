import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags'
import styled from 'styled-components'
import Header from './Header'
import Context from './Context'

const routerPropTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const StyledPaperPage = styled.div`

  main {
    display: flex;

    @media (max-width:620px) {
      flex-wrap: wrap;
    }

    .left {
      flex-grow: 1;
    }

    aside {
      padding-top: 24px;
      min-width: 220px;
      padding-left: 48px;
      margin-left: auto;

      @media (max-width: 840px) {
        min-width: 140px;
        padding-left: 12px;
      }

      @media (max-width:620px) {
        padding-left: 0;
        margin-left: 0;
      }

      h3 {
        font-weight: 400;
        font-size: 1.2em;
        margin: 12px 0;
      }
    }
  }
  .abstract {
    line-height: 1.8
  }
  .title {
  }

  .button {
    display: inline-block;
    width: 110px;
    padding: 3px 0px;
    height: auto;
    text-align: center;
    border-radius: 3px;
    border: 2px solid #0a0a0a;
    background: #c2d081;
    margin: 3px 0;
    line-height: 1.4;
  }

  .edit {
    background-color: #e4c75c;
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
      title, authors, abstract, submit_date, submitter_id, pdf_url,
      submitter_display_name, is_sample,
    } = this.props.initialData
    const { id } = this.props.match.params
    return (
      <StyledPaperPage>
        <MetaTags>
          <meta name="citation_title" content={title} />
          <meta name="citation_pdf_url" content={pdf_url} />
          {authors.map(x => <meta name="citation_author" content={x} id={`meta_tag_id_author_${x}`} key={x} />)}
          <meta name="citation_publication_date" content={submit_date.slice(0, 10).replace(/-/g, '/')} />
          <meta name="citation_online_date" content={submit_date.slice(0, 10).replace(/-/g, '/')} />
          {is_sample && <meta name="robots" content="noindex" />}
        </MetaTags>

        <Header />
        <main>
          <div className="left">
            <h1>{title}</h1>
            <section className="abstract">{abstract}</section>
          </div>
          <aside>
            <div>
              <a href={pdf_url} className="button">Download</a>
            </div>

            <Context.Consumer>
              { ({ userId }) => userId === submitter_id && (
                <div>
                  <a href={`/edit/${id}`} className="button edit">Edit</a>
                </div>
              )}
            </Context.Consumer>

            <div>
              <h3>作者</h3>
              <ul>{authors.map(x => <li key={x}>{x}</li>)}</ul>
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
                  <div><span title={submitter_id}>{submitter_display_name}</span></div>
                </li>
              </ul>
            </div>

            {is_sample &&
            <div>
              <h3>備註</h3>
              <ul>
                <li>
                  <div>This entry is a sample paper crawled from arXiv,
                    intended for the prototyping this website.
                  </div>
                </li>
              </ul>
            </div>
            }
          </aside>
        </main>
      </StyledPaperPage>
    )
  }
}

export default withRouter(PaperPage)
