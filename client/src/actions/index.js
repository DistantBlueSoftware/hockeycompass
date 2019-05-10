import axios from 'axios';
import { ADMIN_STATS, ROUTE_CHANGE, SEND_REFUND, RESET_PASSWORD, CHANGE_PASSWORD, GET_PAYMENTS_TOTAL, PAYMENTS_ERROR, LIST_VENUES, SAVE_VENUE, GET_PAYOUTS, SEND_PAYOUTS, PROCESS_PAYMENT, ERROR, SAVE_PROFILE, USER_AUTH, LOGOUT, AUTH_ERROR, ADD_PLAYER, REMOVE_PLAYER, NEW_GAME, SHOW_GAME, LIST_GAMES, UPDATE_GAME, CANCEL_GAME, UPDATE_ERROR, SEND_EMAILS } from '../constants/actionTypes';
import moment from 'moment';

export const listVenues = () => async dispatch => {
    try {
      const response = await axios.get(`/api/venues`);
      dispatch ({ type: LIST_VENUES, payload: response.data });
    } catch (e) {
      dispatch({ type: UPDATE_ERROR, payload: 'Sorry, we couldn\t complete this request right now. Please try again.'})
    }
}

export const saveVenue = venue => async dispatch => {
  try {
    const response = await axios.post(
      `/api/venue`, 
      venue
    );
    dispatch({ type: SAVE_VENUE, payload: response.data });
  } catch (e) {
    dispatch({ type: ERROR, payload: 'Could not save venue. Sorry!'});
  }
}

export const processPayment = (token, amount, game, user, callback) => async dispatch => {
  try {
    const response = await axios.post(
      `/api/save-stripe-token`, {
      token,
      amount,
      game: game.name,
      user: user.username
    }
    );
    dispatch({ type: PROCESS_PAYMENT, payload: response });
    callback(game, user);
  } catch (e) {
    const error = e.response && e.response.data ? e.response.data.error : 'Sorry, an error occurred and your payment could not be processed.';
    alert(error);
    dispatch({ type: ERROR, payload: e.response.data.error});
  }
}

export const doRegister = (user, callback) => async dispatch => {
  try {
  const response = await axios.post(
    `/api/register`,
    user
  );
  dispatch({ type: USER_AUTH, payload: response.data });
  localStorage.setItem('token', response.data.token);
  callback();
} catch (e) {
    console.log(e)
    dispatch({ type: AUTH_ERROR, payload: 'Username or email is in use' });
  }
}


export const doLogin = (user, success = ()=>{}, error=()=>{}) => async dispatch => {
  try {
    const response = await axios.post(
      `/api/login`,
      user
    );
    dispatch ({ type: USER_AUTH, payload: response.data });
    localStorage.setItem('token', response.data.token);
    success();
  } catch (e) {
  dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    error();
}
}

export const doLogout = () => {
  localStorage.removeItem('token');
  return {
    type: LOGOUT,
    payload: ''
  }
}

export const addPlayer = (game, user, callback) => async dispatch => {
    try {
      const response = await axios.put(
        `/api/games/${game._id}/add`,
        user
      );
      dispatch ({ type: ADD_PLAYER, payload: response.data });
      callback();
    } catch (e) {
      dispatch({ type: UPDATE_ERROR, payload: 'Sorry, an error occurred and you could not be added to this game.'})
    }
}

export const removePlayer = (game, user, callback) => async dispatch => {
    try {
      const response = await axios.put(
        `/api/games/${game._id}/drop`,
        user
      );
      dispatch ({ type: REMOVE_PLAYER, payload: response.data });
      callback();
    } catch (e) {
      dispatch({ type: UPDATE_ERROR, payload: 'Sorry, an error occurred and you could not be added to this game.'})
    }
}

export const sendEmail = (game, messageDetails) => async dispatch => {
  try {
    const response = await axios.post(
      `/api/games/${game._id}/notification`,
      {...game, ...messageDetails}
    );
    dispatch ({ type: SEND_EMAILS, payload: response.data });
  } catch (e) {
    dispatch({ type: UPDATE_ERROR, payload: 'Sorry, an error occurred; emails were not sent.'})
  }
}

export const newGame = (game, callback) => async dispatch => {
    try {
      const response = await axios.post(
        `/api/games`,
        game
      );
      dispatch ({ type: NEW_GAME, payload: response.data });
      callback();
    } catch (e) {
      dispatch({ type: UPDATE_ERROR, payload: 'Sorry, an error occurred and the game could not be created. Please try again.'})
    }
}

export const updateGame = (game, callback) => async dispatch => {
    try {
      const response = await axios.put(
        `/api/games/${game._id}`,
        game
      );
      dispatch ({ type: UPDATE_GAME, payload: response.data });
      callback();
    } catch (e) {
      dispatch({ type: UPDATE_ERROR, payload: 'Sorry, an error occurred and the game could not be created. Please try again.'})
    }
}

export const listGames = (callback) => async dispatch => {
    try {
      const response = await axios.get(`/api/games`);
      dispatch ({ type: LIST_GAMES, payload: response });
      if (callback) callback()
    } catch (e) {
      dispatch({ type: UPDATE_ERROR, payload: 'Sorry, we couldn\t complete this request right now. Please try again.'})
    }
}

export const getGameDetails = (id, callback) => async dispatch => {
    try {
      const response = await axios.get(`/api/games/${id}`);
      dispatch ({ type: SHOW_GAME, payload: response.data });
      callback();
    } catch (e) {
      dispatch({ type: UPDATE_ERROR, payload: 'Sorry, we couldn\t complete this request right now. Please try again.'})
    }
}

export const cancelGame = (game, callback) => async dispatch => {
    if (moment(game.date).diff(moment().subtract(24, 'hours'), 'hours') < 24) {
      dispatch({ type: UPDATE_ERROR, payload: 'This game is scheduled to start in less than 24 hours and cannot be canceled.'})
    } else {
      try {
        const response = await axios.put(
          `/api/games/${game._id}/cancel`,
          game
        );
        dispatch ({ type: CANCEL_GAME, payload: response.data });
        callback();
      } catch (e) {
        dispatch({ type: UPDATE_ERROR, payload: 'Sorry, an error occurred and the game could not be created. Please try again.'})
      }
  }
}

export const saveProfile = (username, profile, callback) => async dispatch => {
  try {
    const response = await axios.put(
      `api/user/${username}`,
      profile
    );
    dispatch({ type: SAVE_PROFILE, payload: response.data });
    callback();
  } catch (e) {
    dispatch({ type: UPDATE_ERROR, payload: 'Sorry, an error occurred and your profile was not saved. Please try again.' })
  }
}

export const sendAllOutstandingPayouts = callback => async dispatch => {
  try {
    const response = await axios.get(`api/sendPayouts`);
    dispatch({ type: SEND_PAYOUTS, payload: response.data });
    callback();
  } catch (e) {
    dispatch({ type: ERROR, payload: 'Sorry, there was an error. Beerp boop'})
  }
}

export const getPaymentsTotal = () => async dispatch => {
  try {
    const response = await axios.get(`api/payoutsTotal`);
    dispatch({ type: GET_PAYMENTS_TOTAL, payload: response.data });
  } catch (e) {
    dispatch({ type: PAYMENTS_ERROR, payload: 'Sorry, there was an error. Beerp boop'})
  }
}

export const getPaymentsByGame = (data, callback) => async dispatch => {
  try {
    const response = await axios.post(
      `api/payouts/`,
      data
    );
    dispatch({ type: GET_PAYOUTS, payload: response.data });
    callback();
  } catch (e) {
    dispatch({ type: PAYMENTS_ERROR, payload: 'Sorry, an error occurred. Please try again.' })
  }
}

export const resetPassword = email => async dispatch => {
  try {
    const response = await axios.post(
      `/api/reset-password`,
      {email}
    );
    dispatch({ type: RESET_PASSWORD, payload: response.data });
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'That didn\'t work. Try again later?'})
  }
}

export const getResetToken = token => async dispatch => {
  try {
    const response = await axios.get(
      `/api/reset/${token}`
    );
    dispatch({ type: RESET_PASSWORD, payload: response.data });
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'That didn\'t work. Try again later?'})
  }
}

export const changePassword = (token, password, cb) => async dispatch => {
  try {
    const response = await axios.post(
      `/api/reset/${token}`,
      {password}
    );
    dispatch({ type: CHANGE_PASSWORD, payload: response.data });
    if (cb) cb();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Sorry, we couldn\'t change your password at this time. Please try again later.' })
  }
}

export const getAdminStats = () => async dispatch => {
  try {
    const response = await axios.get(
      `/api/admin/stats`
    );
    dispatch({ type: ADMIN_STATS, payload: response.data });
  } catch (e) {
    dispatch({ type: ERROR, payload: 'Could not get admin stats'})
  }
}

export const sendRefund = (paymentID) => async dispatch => {
  try {
    const response = await axios.post(
      `/api/send-refund`,
      paymentID
    );
    dispatch({ type: SEND_REFUND, payload: response.data });
  } catch (e) {
    dispatch({ type: ERROR, payload: 'We couldn\'t send the refund at this time'})
  }
}

export const routeChange = (route) => {
  return({ type: ROUTE_CHANGE, payload: route })
}
