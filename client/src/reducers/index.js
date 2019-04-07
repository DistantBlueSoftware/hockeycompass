import { combineReducers } from 'redux';
import user from './user';
import games from './games';
import venues from './venues';
import payouts from './payouts';
import system from './system';

export default combineReducers({
  user,
  games,
  venues,
  payouts,
  system
});
