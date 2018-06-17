import React from 'react'
import PropTypes from 'prop-types'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import styled from 'styled-components'
import Context from './Context'


const StyledHeader = styled.header`

  line-height: 20px;
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


const DropdownStyles = styled.span`
  .dropdown {
    display: inline-block;
  }

  .dropdown__content {
    display: none;
    position: absolute;
    margin-left: -11px;
    margin-top: 7px;
    border: 1px solid #eee;

    > div {
      padding: 6px 6px;
    }
  }

  .dropdown--active .dropdown__content {
    display: block;
  }
`

function AccountDropdown({ logout }) {
  return (
    <DropdownStyles>
      <Dropdown className="account-dropdown">
        <DropdownTrigger>
          <button className="anchor-like">選單</button>
        </DropdownTrigger>
        <DropdownContent>
          <div>
            <a href="/dashboard">帳號設定</a>
          </div>
          <div>
            <button className="anchor-like" onClick={logout} >登出</button>
          </div>
        </DropdownContent>
      </Dropdown>
    </DropdownStyles>
  )
}

AccountDropdown.propTypes = {
  logout: PropTypes.func.isRequired,
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
                <AccountDropdown logout={() => context.setUserId('')} />
              )
              : <a href="/login-google">登入</a>
          )}
        </Context.Consumer>
      </div>
    </StyledHeader>
  )
}
