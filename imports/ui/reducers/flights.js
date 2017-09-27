import { FETCH_FLIGHT } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_FLIGHT:
      return action.payload;
    default:
      return state;
  }
}
