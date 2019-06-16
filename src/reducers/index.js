import { combineReducers } from 'redux';
import topicReducer from './topicReducer';
import commentReducer from './commentReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';

export default combineReducers({
  topics: topicReducer,
  comments: commentReducer,
  users: userReducer,
  auth: authReducer
});
