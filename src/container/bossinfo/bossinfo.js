import React, {Component} from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {update} from '../../redux/user.redux';

@connect(state => state.user, {update})
class BossInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: '',
      company: '',
      money: '',
      require: ''
    }
  }

  onChange = (key, val) => {
    this.setState({
      [key]: val
    });
  };

  selectAvatar = text => {
    this.setState({
      avatar: text
    })
  };

  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={redirect}/> : null}
        <NavBar mode="dark">Boss Info</NavBar>
        <AvatarSelector
          selectAvatar={this.selectAvatar}
        ></AvatarSelector>
        <InputItem onChange={v => this.onChange('position', v)}>
          Position
        </InputItem>
        <InputItem onChange={v => this.onChange('company', v)}>
          Company
        </InputItem>
        <InputItem onChange={v => this.onChange('money', v)}>
          Money
        </InputItem>
        <TextareaItem
          title='Require'
          onChange={v => this.onChange('require', v)}
          rows={3}
          autoHeight
        />
        <Button
          type='primary'
          onClick={() => this.props.update(this.state)}
        >Save</Button>
      </div>
    )
  }
}

export default BossInfo;