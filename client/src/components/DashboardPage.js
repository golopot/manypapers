import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Header from './Header'

const routerPropTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const StyledDiv = styled.div`

  input {
    height: 28px;
    padding-left: 4px;
  }

  dt {
    display: inline-block;
    width: 120px;
    padding: 6px 0;
  }

  dd {
    padding-bottom: 2px ;
    margin-left: 12px;
  }
`

class DashboardPage extends Component {
  static propTypes = {
    ...routerPropTypes,
  }

  constructor() {
    super()
    this.state = {
      email: '',
      display_name: '',
    }
  }

  componentDidMount() {
    fetch('/api/me', {
      credentials: 'include',
      headers: {
        'x-csrf': 1,
      },
    })
      .then(r => r.json())
      .then(({ error, email, display_name }) => {
        if (error) throw error
        this.setState({
          email,
          display_name,
        })
      })
  }

  onChange = (event) => {
    this.setState({ display_name: event.target.value })
  }

  save = () => {
    fetch('/api/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        'x-csrf': 1,
      },
      body: JSON.stringify({
        display_name: this.state.display_name,
      }),
    })
      .then(r => r.json())
      .then(({ error }) => {
        if (error) throw error
      })
      .then(() => { window.location = window.location })
      .catch(console.error)
  }

  render() {
    return (
      <StyledDiv>
        <Header />

        <h1>帳號設定</h1>
        <dl>
          <dt>
            <label htmlFor="display_name">名稱</label>{' '}
          </dt>
          <dd>
            <input id="display_name" placeholder="名稱" value={this.state.display_name} onChange={this.onChange} />{' '}
          </dd>
          <dt>
            <label htmlFor="email">Oauth by</label>{' '}
          </dt>
          <dd>
            <span id="email">{this.state.email}</span>{' '}
          </dd>
        </dl>
        <div><button onClick={this.save}>儲存</button></div>

      </StyledDiv>
    )
  }
}

export default withRouter(DashboardPage)
