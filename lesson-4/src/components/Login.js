import React from 'react'
import Redirect from 'react-router/Redirect'
import getInitialData from '../lib/getInitialData';

export default class Login extends React.Component {
  state = {
    redirect: window.waterwheel.oauth.tokenExpireTime > new Date().getTime()
  }
  
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  login = (e) => {
    e.preventDefault();
    const { username, password } = e.target
    Object.assign(window.waterwheel.oauth.tokenInformation, {
      username: username.value,
      password: password.value,
    })
    getInitialData()
      .then(() => {
        this.setState({ redirect: true })
      })
      .catch((e) => {
        const message =  e.response ? e.response.data.message : e.message;
        this.setState({ message })
        return Promise.reject(e);
      })
  }

  render() {
    return (
      <div className='login'>
        {this.state.redirect && (
          <Redirect to={'/'}/>
        )}
        {(
          <div>
            <div className='welcomeText'>
              {window.waterwheel.oauth.tokenExpireTime > new Date().getTime() ? (
                ''
              ) : (
                <p>Please login with your 4k Waterwheel Training credentials.</p>
              )}
            </div>
            <form onSubmit={this.login}>
              <input type='text' name='username' onChange={this.handleChange} placeholder='username' />
              <input type='password' name='password' onChange={this.handleChange} placeholder='password' />
              <input type='submit' value='Log in' />
              {this.state.message ? <div className='loginMessage'><div className='messageText'>{this.state.message}</div></div> : ''}
            </form>
          </div>
        )}
      </div>
    )
  }
}
