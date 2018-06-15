import React from 'react'
import { Route } from 'react-router'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import routes from '../routes'
import Context from './Context'

class App extends React.Component {
  static propTypes = {
    initialData: PropTypes.any.isRequired,
  }

  state = {
    userId: '',
    setUserId: (userId) => {
      Cookies.set('userId', userId)
      this.setState({ userId })
    },
  }

  componentDidMount() {
    this.setState({ userId: Cookies.get('userId') })
  }

  render() {
    const { initialData } = this.props
    return (
      <Context.Provider value={this.state}>
        <div className="root-inner">
          {
            routes.map(({
              path, exact, component: C, ...rest
            }) => (
              <Route
                key={path}
                path={path}
                exact={exact}
                render={props => <C {...props} {...rest} initialData={initialData} />}
              />
            ))}
        </div>
      </Context.Provider>

    )
  }
}

export default App
export { routes }
