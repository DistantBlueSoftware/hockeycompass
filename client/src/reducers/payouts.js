import { GET_PAYMENTS_TOTAL, PAYMENTS_ERROR } from '../constants/actionTypes';

const INITIAL_STATE = {
  total: 0,
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PAYMENTS_TOTAL:
      return { total: action.payload, errorMessage: '' };
    case PAYMENTS_ERROR:
      return { ...state, total: 0, errorMessage: action.payload };
    default:
      return state;
  }
}