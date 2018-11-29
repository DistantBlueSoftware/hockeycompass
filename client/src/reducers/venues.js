import { LIST_VENUES, SAVE_VENUE, EDIT_VENUE } from '../constants/actionTypes';

const INITIAL_STATE = {
  all: [],
  errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LIST_VENUES:
    return {
      ...state,
      all: [...action.payload]
    }
    case SAVE_VENUE:
      return {...state, all: [...state.all, ...action.payload]};
    case EDIT_VENUE:
      return {
        ...state,
        all: [...state.all].map((venue) => {

          if (venue._id === action.payload._id) {
            return action.payload;
          }
          return venue;
        })
      }
    default:
      return state;
  }
}