import { ADD_PLAYER, NEW_GAME, LIST_GAMES, UPDATE_ERROR } from '../constants/actionTypes';

const INITIAL_STATE = {
  games: [],
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_PLAYER:
      const gameIndex = state.games.map(g => g.id).indexOf(action.payload.id);
      return {...state, games: state.games.map((game, index) => {
        if (index === gameIndex) {
          if (game.players.indexOf(state.user.username) === -1) {
            game.players = [...game.players, state.user.username];
          }
        }
        return game;
      })}
    case NEW_GAME:
      return {...state, games: [...state.games, action.payload]}
    case LIST_GAMES:
      console.log(action.payload)
      return {...state, games: [...action.payload.data]}
    case UPDATE_ERROR:
      return {...state, errorMessage: action.payload}
    default:
      return state;
  }
}
