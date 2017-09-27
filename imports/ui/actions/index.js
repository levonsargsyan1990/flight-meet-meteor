import axios from 'axios';
import {
  FETCH_FLIGHT,
  START_LOADING,
  STOP_LOADING,
  SELECT_FLIGHT,
  UNSELECT_FLIGHT,
  SHOW_NOTIFICATON
} from './types';
import store from '../store';

// importing Meteor methods
import { getFlights } from '../../api/flights/methods.js';

/* eslint-disable import/prefer-default-export */
export function showNotification(flight, type) {
  return {
    type: SHOW_NOTIFICATON,
    payload: { flight, type }
  };
}

export function fetchFlight({ flight, date }, ck) {
  const request = getFlights.callPromise({ flight, date })
    .then((res) => {
      ck();
      return res;
    })
    .catch(err => {
      ck();
      return {
        arriving: {
          error: true
        },
        departing: {
          error: true
        }
      }
    });

  return {
    type: FETCH_FLIGHT,
    payload: request
  };
}

export function startLoading() {
  return {
    type: START_LOADING
  };
}

export function stopLoading() {
  return {
    type: STOP_LOADING
  };
}

export function selectFlight(flight) {
  store.dispatch(showNotification(flight, 'positive'));
  return {
    type: SELECT_FLIGHT,
    payload: flight
  };
}

export function unselectFlight(flight) {
  store.dispatch(showNotification(flight, 'negative'));
  return {
    type: UNSELECT_FLIGHT,
    payload: flight
  };
}
/* eslint-enable import/prefer-default-export */
