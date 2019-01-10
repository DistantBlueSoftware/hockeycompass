import { combineReducers } from 'redux';
import user from './user';
import games from './games';
import venues from './venues';
import payouts from './payouts';

export default combineReducers({
  user,
  games,
  venues,
  payouts
});
