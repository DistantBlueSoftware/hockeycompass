import { ADD_PLAYER, NEW_GAME, LIST_GAMES, UPDATE_ERROR, SEND_EMAILS } from '../constants/actionTypes';

const INITIAL_STATE = {
  games: [],
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_PLAYER:
    case NEW_GAME:
      const updatedGames = state.games.map(game => {
        if (game._id === action.payload._id) {
          return {...action.payload};
        }
        return game;
      })
      return {...state, games: updatedGames, lastUpdate: new Date()};
    case LIST_GAMES:
      return {...state, games: [...action.payload.data]};
    case UPDATE_ERROR:
      return {...state, errorMessage: action.payload};
    case SEND_EMAILS:
      return state;
    default:
      return state;
  }
}
