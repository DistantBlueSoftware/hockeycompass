import { combineReducers } from 'redux';
import user from './user';
import games from './games';
import venues from './venues';
import selectedVenue from './venue';

export default combineReducers({
  user,
  games,
  venues,
  selectedVenue,
});
