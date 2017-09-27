import _ from 'lodash';
import { SELECT_FLIGHT, UNSELECT_FLIGHT } from '../actions/types';


export default function (state = [], action) {
  switch (action.type) {
    case SELECT_FLIGHT:
      return state.concat([action.payload]);
    case UNSELECT_FLIGHT:
      return _.reject(state, _.pick(action.payload, 'flightType', 'airportType', 'referenceCode'));
    default:
      return state;
  }
}
