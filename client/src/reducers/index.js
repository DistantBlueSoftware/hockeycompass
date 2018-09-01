import { combineReducers } from 'redux';
import user from './user';
import games from './games';

export default combineReducers({
  user,
  games
});
