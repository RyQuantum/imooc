import axios from 'axios';
import {getRedirectPath} from "../util";

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
  isAuth: '',
  msg: '',
  user: '',
  pwd: '',
  type: ''
};

export const user = (state = initState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload),isAuth: true, ...action.payload};
    case REGISTER_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload),isAuth: true, ...action.payload};
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg};
    case LOAD_DATA:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

const loginSuccess = data => ({type: 'LOGIN_SUCCESS', payload: data});

const registerSuccess = data => ({type: REGISTER_SUCCESS, payload: data});

const errorMsg = msg => ({type: ERROR_MSG, msg});

export const loadData = userInfo => ({type: LOAD_DATA, payload: userInfo});

export const login = ({user, pwd}) => {
  if (!user || !pwd) {
    return errorMsg('Username and password should\'t be empty!');
  }
  return async dispatch => {
    const res = await axios.post('/user/login', {user, pwd});
    if (res.status === 200 && res.data.code === 0) {
      dispatch(loginSuccess(res.data.data));
    } else {
      dispatch(errorMsg(res.data.msg));
    }
  }
};

export const register = ({user, pwd, repeatpwd, type}) => {
  if (!user || !pwd || !type) {
    return errorMsg('Username and password should\'t be empty.')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('Password and confirm password are not the same!');
  }
  return async dispatch => {
    const res = await axios.post('/user/register', {user, pwd, type});
    if (res.status === 200 && res.data.code === 0) {
      dispatch(registerSuccess({user, pwd, type}));
    } else {
      dispatch(errorMsg(res.data.msg));
    }
  }
};