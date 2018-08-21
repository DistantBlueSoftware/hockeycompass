import { REGISTER, LOGIN, LOGOUT, ADD_PLAYER, NEW_GAME } from '../constants/actionTypes';

export const doRegister = user => ({ type: REGISTER, payload: user });
export const doLogin = user => ({ type: LOGIN, payload: user });
export const doLogout = () => ({ type: LOGOUT, payload: null });
export const addPlayer = data => ({ type: ADD_PLAYER, payload: data });
export const newGame = game => ({ type: NEW_GAME, payload: game });
