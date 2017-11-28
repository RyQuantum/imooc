import React, {Component} from 'react';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import NavLinkBar from '../navlink/navlink';
import Boss from '../../component/boss/boss'

const Genius = () => <h2>Genius</h2>;
const Msg = () => <h2>Message</h2>;
const User = () => <h2>User</h2>;

@connect(state => state, {})
class Dashboard extends Component {
  render() {
    const user = this.props.user;
    const pathname = this.props.location.pathname;
    const navList = [
      {
        path: '/boss',
        text: 'Genius',
        icon: 'boss',
        title: 'Genius list',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'Boss',
        icon: 'job',
        title: 'Boss list',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: 'Message',
        icon: 'msg',
        title: 'Message',
        component: Msg,
      },
      {
        path: '/me',
        text: 'Me',
        icon: 'user',
        title: 'Profile',
        component: User
      }
    ];
    return (
      <div>
        <NavBar className='fixed-header' mode='dark'>{navList.find(v => v.path === pathname).title}</NavBar>
        <div style={{marginTop: 45}}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component}/>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    );
  }
}

export default Dashboard;