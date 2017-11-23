import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {login, getUserData} from './Auth.redux';

@connect(
  state => state.auth,
  {login, getUserData}
)
class Auth extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserData();
  }

  render() {
    return (
      <div>
        <h2>My name is {this.props.user}, age is {this.props.age}</h2>
        {this.props.isAuth ? <Redirect to='/dashboard'/> : null}
        <h2>no permission, you need to login</h2>
        <button onClick={this.props.login}>Login</button>
      </div>
    )
  }
}

export default Auth;