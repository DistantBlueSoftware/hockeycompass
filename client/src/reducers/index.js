import { combineReducers } from 'redux';
import user from './user';
import games from './games';
import { SEND_EMAILS } from '../constants/actionTypes';

const initialState = {};

const common = (state = initialState, action) => {
  switch(action.type) {
    case SEND_EMAILS:
      const body = JSON.stringify(action.payload);
      console.log(body)
      fetch(`/api/games/${action.payload.id}/notification`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
        body: body
        })
        .then(res => res.json())
        .then(json => console.log(json))
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  user,
  games,
  common
});
