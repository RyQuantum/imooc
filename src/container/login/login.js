import React, {Component} from 'react'
import Logo from '../../component/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../../redux/user.redux';


@connect(state => state.user, {login})
class Login extends Component{

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      user: '',
      pwd: ''
    }
  }

  register = () => {
    this.props.history.push('/register');
  }

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    });
  };

  handleLogin = () => {
    this.props.login(this.state);
  };

  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo></Logo>
        <h2>Login page</h2>
        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
        <WingBlank>
          <List>
            <InputItem onChange={v => this.handleChange('user', v)}>Username</InputItem>
            <WhiteSpace/>
            <InputItem type='password' onChange={v => this.handleChange('pwd', v)}>Password</InputItem>
          </List>
          <Button onClick={this.handleLogin} type='primary'>Login</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type='primary'>Register</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login