import { ADD_PLAYER, REMOVE_PLAYER, NEW_GAME, SHOW_GAME, LIST_GAMES, CANCEL_GAME, UPDATE_ERROR, SEND_EMAILS } from '../constants/actionTypes';

const INITIAL_STATE = {
  games: [],
  current: {},
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case NEW_GAME:
      return {...state, games: [...state.games, action.payload]}
    case ADD_PLAYER:
    case REMOVE_PLAYER:
      const updatedGames = state.games.map(game => {
        if (game._id === action.payload._id) {
          return {...action.payload};
        }
        return game;
      })
      return {...state, games: updatedGames, lastUpdate: new Date()};
    case SHOW_GAME: 
      return {...state, current: {...action.payload}}
    case CANCEL_GAME:
      const index = state.games.findIndex(game => game._id === action.payload._id)
      return {...state, games: [...state.games.slice(0, index), ...state.games.slice(index + 1)]}
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
