import React from 'react'
import { Provider } from 'react-redux'
import createStore from './lib/createStore'
import getInitialData from './lib/getInitialData';
import App from './containers/App'
import Login from './components/Login'
import Redirect from 'react-router/Redirect'
import Match from 'react-router/Match'
import Router from 'react-router/BrowserRouter'
import config from './config'
import './Main.css';

const { apiURL, client_id, client_secret } = config;
window.waterwheel = new window.Waterwheel({
  base: apiURL,
  oauth: {
   grant_type: 'password',
   client_id: client_id,
   client_secret: client_secret,
  }
})

export const MatchWhenAuthorized = ({ component: Component, ...rest }) => (
  <Match {...rest} render={props => (
    window.waterwheel.oauth.tokenExpireTime > new Date().getTime() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{ pathname: '/login' }}/>
    )
  )}/>
)

export const TodoApp = () => (
  <Provider store={createStore()}>
    <App />
  </Provider>
)

export class Main extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    if (window.waterwheel.oauth.tokenInformation.access_token) {
      getInitialData()
        .then(() => {
          this.setState({loading: false})
        })
        .catch(e => {
          window.waterwheel.oauth.tokenInformation.grant_type = 'password'
          delete window.waterwheel.oauth.tokenInformation.access_token
          delete window.waterwheel.oauth.tokenInformation.refresh_token
          this.setState({loading: false})
        })
    }
    else {
      this.setState({loading: false})
    }
  }

  render() {
    return (
      <Router>
        {({ router }) => (
            this.state.loading ?
              <div className="loader">Loading...</div> :
              <div>
                <MatchWhenAuthorized pattern="/" component={TodoApp}/>
                <Match pattern="/login" component={Login}/>
              </div>
        )}
      </Router>
    )
  }
}

export default Main
