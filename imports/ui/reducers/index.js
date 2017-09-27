import { combineReducers } from 'redux';
import flightReducer from './flights';
import selectedFlightsReducer from './selectedFlights';
import loadingReducer from './loading';
import notificationReducer from './notification';

const rootReducer = combineReducers({
  flights: flightReducer,
  selectedFlights: selectedFlightsReducer,
  loading: loadingReducer,
  notification: notificationReducer,
});

export default rootReducer;
