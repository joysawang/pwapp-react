import { combineReducers } from 'redux';
import authReducer from './authReducer';

const AppReducer = combineReducers({
  auth: authReducer
});

export default AppReducer;
