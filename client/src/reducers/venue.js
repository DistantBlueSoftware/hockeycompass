import { SELECT_VENUE } from '../constants/actionTypes';

const INITIAL_STATE = {
  selectedVenue: {},
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SELECT_VENUE:
      return {
        ...action.payload
      }
    default:
      return state;
  }
}