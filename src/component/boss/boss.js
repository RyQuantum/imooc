import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';

import {getUserList} from '../../redux/chatuser.redux';

@connect(state => state.chatUser, {getUserList})
class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.props.getUserList('genius');
  }
  render() {
    return (
      <WingBlank>
        <WhiteSpace/>
        {this.props.userList.map(v => (
          v.avatar ?<Card key={v._id}>
            <Card.Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
            />
            <Card.Body>
              {v.profile && v.profile.split('\n').map(v => (
                <div key={v}>v</div>
              ))}
            </Card.Body>
          </Card> : null
        ))}
      </WingBlank>
    );
  }
}

export default Boss;