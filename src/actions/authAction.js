import types from './actionTypes';
import { replace } from 'react-router-redux';


export function onLogin(username, password) {
  return (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST });

    setTimeout(() => {
      if (username === 'pwareact' && password === 'pwa@react') {
        dispatch({ type: types.LOGIN_SUCCESS, payload: { username: username } });
        dispatch(replace('/'));
      } else {
        dispatch({ type: types.LOGIN_FAILURE, payload: { errorMessage: 'Invalid Username or Password' } });
      }
    }, 1000);
  }
}

export function onLogout() {
  return (dispatch) => {
    dispatch({ type: types.LOGOUT });
  }
}
