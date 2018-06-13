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

const StyledDiv = styled.div`
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

class DashboardPage extends Component {
  static propTypes = {
    ...routerPropTypes,
  }

  static dataUrl = id => `/api/paper/${id}`

  render() {
    return (
      <StyledDiv>
        <MetaTags />
        <Header />

        <h1>帳號設定</h1>
        <div>
          <span>名稱</span>{' '}<input placeholder="名稱" />{' '}
        </div>
        <div>
          <span>Oauth 帳號</span> <span>Foo</span>{' '}
        </div>
      </StyledDiv>
    )
  }
}

export default withRouter(DashboardPage)
