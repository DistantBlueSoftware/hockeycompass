import { LIST_VENUES, SAVE_VENUE } from '../constants/actionTypes';

const INITIAL_STATE = {
  all: [],
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LIST_VENUES:
      return {...state, all:[...action.payload]};
    case SAVE_VENUE:
      return {...state, all: [...state.all, ...action.payload]};
    default:
      return state;
  }
}