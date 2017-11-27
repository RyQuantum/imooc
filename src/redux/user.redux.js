import axios from 'axios';
import {getRedirectPath} from "../util";

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
  msg: '',
  user: '',
  pwd: '',
  type: ''
};

export const user = (state = initState, action) => {
  switch(action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload};
    case ERROR_MSG:
      return {...state, msg: action.msg};
    case LOAD_DATA:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

const authSuccess = obj => {
  const {pwd, ...data} = obj;
  return {type: 'AUTH_SUCCESS', payload: data};
}

const errorMsg = msg => ({type: ERROR_MSG, msg});

export const loadData = userInfo => ({type: LOAD_DATA, payload: userInfo});

export const update = data => {
  return async dispatch => {
    const res = await axios.post('/user/update', data);
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess(res.data.data));
    } else {
      dispatch(errorMsg(res.data.msg));
    }
  }
}

export const login = ({user, pwd}) => {
  if (!user || !pwd) {
    return errorMsg('Username and password should\'t be empty!');
  }
  return async dispatch => {
    const res = await axios.post('/user/login', {user, pwd});
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess(res.data.data));
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
      dispatch(authSuccess({user, pwd, type}));
    } else {
      dispatch(errorMsg(res.data.msg));
    }
  }
};