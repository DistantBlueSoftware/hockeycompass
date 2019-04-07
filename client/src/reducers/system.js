import { ROUTE_CHANGE } from '../constants/actionTypes';

const INITIAL_STATE = {
  route: '/',
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ROUTE_CHANGE:
      return { route: action.payload, errorMessage: '' };
    default:
      return state;
  }
}