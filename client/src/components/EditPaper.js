import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledDiv = styled.div`
  width: 700px;
  margin: 0 auto;

  input,
  textarea {
    width: 100%;
    resize: vertical;
    font: inherit;
  }

  input {
    height: 30px;
  }

  textarea[name="abstract"] {
    height: 160px;
  }

  form > div + div {
    margin-top: 16px;
  }
`

export default class EditPaper extends Component {
  static propTypes = {
    paperId: PropTypes.string.isRequired,
  }

  state = {
    waiting: false,
    error: '',
    title: '',
    abstract: '',
    authors: [],
  }

  componentDidMount() {
    fetch(`/api/paper/${this.props.paperId}`)
      .then(r => r.json())
      .then(({
        error, title, abstract, authors,
      }) => {
        if (error) throw error
        this.setState({ title, abstract, authors })
      })
      .catch(console.error)
  }

  onInputChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value })
  }

  onSubmit = (ev) => {
    ev.preventDefault()
    this.setState({
      waiting: true,
      error: '',
    })
    this.submit()
  }

  submit = () => {
    const body = new FormData(this.form)
    fetch(`/api/paper/${this.props.paperId}`, {
      method: 'PATCH',
      body,
      credentials: 'include',
      headers: {
        'x-csrf': 1,
      },
    })
      .then(r => r.json())
      .then((r) => {
        this.setState({ waiting: false })
        if (r.error) {
          this.setState({ error: r.error })
          return
        }
        window.location = `/paper/${this.props.paperId}`
      })
  }

  render() {
    const {
      waiting, error, title, abstract, authors,
    } = this.state
    const { onInputChange } = this

    return (
      <StyledDiv>
        <h1>編輯 /paper/{this.props.paperId}</h1>
        <form ref={(el) => { this.form = el }} className="upload">
          <div>
            <input name="title" placeholder="Title" value={title} onChange={onInputChange} />
          </div>
          <div>
            <input name="authors" placeholder="Authors" value={authors} onChange={onInputChange} />
          </div>
          <div>
            <textarea name="abstract" placeholder="Abstract" value={abstract} onChange={onInputChange} />
          </div>

          <div>
            <button
              type="submit"
              onClick={this.onSubmit}
              disabled={Boolean(waiting)}
            >
              {waiting ? 'waiting' : 'submit' }
            </button>{' '}
            { error && <span>{ error }</span> }
          </div>
        </form>
      </StyledDiv>
    )
  }
}
