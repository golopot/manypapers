import React, { Component } from 'react'
import styled from 'styled-components'


const Div = styled.div`
  width: 700px;
  margin: 0 auto;

  input,
  textarea {
    width: 100%;
    resize: vertical;
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

export default class Uploader extends Component {
  state = {
    waiting: false,
    error: '',
  }

  onFileChange = () => {

  }

  onSubmit = (ev) => {
    ev.preventDefault()
    this.setState({
      waiting: true,
      error: '',
    })
    this.upload()
  }

  upload = () => {
    const body = new FormData(this.form)
    fetch('/api/paper', {
      method: 'post',
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
        window.location = `/paper/${r.id}`
      })
  }

  render() {
    const { waiting, error } = this.state
    return (
      <Div>
        <h1>上傳論文</h1>
        <form ref={(el) => { this.form = el }} className="upload">
          <div>
            <input name="file" type="file" onChange={this.onFileChange} accept=".pdf" />
          </div>
          <div>
            <input name="title" placeholder="Title" />
          </div>
          <div>
            <input name="authors" placeholder="Authors" />
          </div>
          <div>
            <textarea name="abstract" placeholder="Abstract" />
          </div>

          <div>
            <button
              type="submit"
              onClick={this.onSubmit}
              disabled={Boolean(waiting)}
            >
              {waiting ? 'waiting' : 'submit' }

            </button>
            {' '}
            { error &&
            <span>{ error }</span>
            }
          </div>
        </form>
      </Div>
    )
  }
}
