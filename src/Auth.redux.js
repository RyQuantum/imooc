'use strict';
import axios from 'axios';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const USERDATA = 'USERDATA';

const initState = {
  isAuth: false,
  user: '李云龙',
  age: 30
}

export const auth = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, isAuth: true};
    case LOGOUT:
      return {...state, isAuth: false};
    case USERDATA:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export const getUserData = () =>
  async dispatch => {
    const res = await axios.get('/data');
    if (res.status === 200) {
      dispatch(userData(res.data));
    }
  };

export const userData = data => ({type: USERDATA, payload: data});
export const login = () => ({type: LOGIN});
export const logout = () => ({type: LOGOUT});