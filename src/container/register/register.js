import React, {Component} from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';


@connect(state => state.user, {register})
class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius'
    };
  }

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    });
  };

  handleRegister = () => {
    this.props.register(this.state);
  };

  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo></Logo>
        <List>
          {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
          <InputItem onChange={v => this.handleChange('user', v)}>Username</InputItem>
          <WhiteSpace/>
          <InputItem type='password' onChange={v => this.handleChange('pwd', v)}>Password</InputItem>
          <WhiteSpace/>
          <InputItem type='password' onChange={v => this.handleChange('repeatpwd', v)}>Confirm</InputItem>
          <WhiteSpace/>
          <RadioItem
            checked={this.state.type === 'genius'}
            onChange={() => this.handleChange('type', 'genius')}
          >
            Genius
          </RadioItem>
          <RadioItem
            checked={this.state.type === 'boss'}
            onChange={() => this.handleChange('type', 'boss')}
          >
            Boss
          </RadioItem>
          <WhiteSpace/>
          <Button type='primary' onClick={this.handleRegister}>Register</Button>
        </List>
        <WingBlank>
        </WingBlank>
      </div>
    )
  }
}

export default Register