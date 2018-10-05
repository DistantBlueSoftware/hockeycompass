import { USER_AUTH, LOGOUT, SAVE_PROFILE, AUTH_ERROR } from '../constants/actionTypes';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_AUTH:
      return { ...state, ...action.payload, authenticated: true, errorMessage: '' };
    case SAVE_PROFILE: 
      return { ...state, profile: {...action.payload}, errorMessage: '' };
    case LOGOUT:
      return {};
    case AUTH_ERROR:
      return { ...state, authenticated: false, errorMessage: action.payload };
    default:
      return state;
  }
}
