import { LIST_VENUES, SAVE_VENUE } from '../constants/actionTypes';

const INITIAL_STATE = {
  all: [],
  errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LIST_VENUES:
<<<<<<< HEAD
      return {
        ...state,
        all: [...action.payload]
      }
=======
      return {...state, all:[...action.payload]};
>>>>>>> f8b4e0a067832ab8f4541c75e44ac51d17d8247d
    case SAVE_VENUE:
      return { ...state, all: [...state.all, ...action.payload] };
    default:
      return state;
  }
}