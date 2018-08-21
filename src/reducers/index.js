import { REGISTER, LOGIN, LOGOUT, ADD_PLAYER, NEW_GAME } from '../constants/actionTypes';

const initialState = {
  games: [{
    id: 1356,
    name: 'Awesome Game 1',
    date: '08/17/2019',
    type: 'Public',
    location: 'Lake Nokomis',
    host: 'Paul Paulson',
    maxPlayers: 18,
    players: ['Homer', 'Jan', 'Walter', 'Steve', 'Charlie', 'Sam', 'Nate', 'Dan', 'Jeeves']
  }],
  user: {
    name: 'Sam Hock',
    username: 'shock',
    email: 'hi@hello.com'
  },
  gameId: 1356
};
const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case REGISTER:
    case LOGIN:
      return {...state, user: action.payload};
    case ADD_PLAYER:
      const gameIndex = state.games.map(g => g.id).indexOf(action.payload.id);
      return {...state, games: state.games.map((game, index) => {
        if (index === gameIndex) {
          if (game.players.indexOf(state.user.name) === -1) {
            game.players = [...game.players, state.user.name];
          }
        }
        return game;
      })}
    case NEW_GAME:
      const gameId = state.gameId + 1;
      let game = action.payload;
      game.players = [state.user.name];
      game.id = gameId;
      return {...state, gameId: gameId, games: [...state.games, game]}
    case LOGOUT:
      return {...state, user: null}
    default:
      return state;
  }
}

export default rootReducer;
