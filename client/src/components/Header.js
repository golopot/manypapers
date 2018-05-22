import React from 'react'
import styled from 'styled-components'
import Context from './Context'

const StyledHeader = styled.header`

  padding-top: 10px;
  display: flex;
  justify-content: space-between;

  .right {
    > * + *{
      margin-left: 10px;
    }
  }

  .logo {
    padding-right: 20px;
  }

  .right {
    align-self: flex-end;
  }

  input {
    display: none;
    width: 200px;
    margin-right: 20px;
  }
`

class SearchBox extends React.Component {
  onKeyDown = (ev) => {
    if (ev.key === 'Enter') {
      const site = 'domainname.com'
      const q = ev.target.value
      window.location = `https://www.google.com/search?q=${q}+site%3A${site}`
    }
  }

  render() {
    return <input placeholder="Search" onKeyDown={this.onKeyDown} />
  }
}


export default function Header() {
  return (
    <StyledHeader>
      <div>
        <a className="logo" href="/">Manypapers</a>{' '}
      </div>
      <div className="right">
        <SearchBox />
        <a href="/upload">上傳論文</a>
        <Context.Consumer>
          {context => (

            context.userId
              ? (
                <React.Fragment>
                  <span>{context.userId}</span>{' '}
                  <button className="anchor-like" onClick={() => context.setUserId('')}>Logout</button>
                </React.Fragment>
              )
              : <a href="/login-google">登入</a>
          )}
        </Context.Consumer>
      </div>
    </StyledHeader>
  )
}
