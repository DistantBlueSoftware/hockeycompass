import { USER_AUTH, LOGOUT, SAVE_PROFILE, RESET_PASSWORD, CHANGE_PASSWORD, AUTH_ERROR } from '../constants/actionTypes';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_AUTH:
    const fullName = action.payload.firstName + ' ' + action.payload.lastName;
      return { ...action.payload, fullName, authenticated: true, errorMessage: '' };
    case SAVE_PROFILE: 
      return { ...state, profile: {...action.payload}, errorMessage: '' };
    case LOGOUT:
      return {};
    case RESET_PASSWORD:
    case CHANGE_PASSWORD:
      if (action.payload.message) return { errorMessage: action.payload.message };
      else return { ...action.payload }
    case AUTH_ERROR:
      return { ...state, authenticated: false, errorMessage: action.payload };
    default:
      return state;
  }
}
