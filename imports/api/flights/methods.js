import { Meteor } from 'meteor/meteor';
import axios from 'axios';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

const ROOT_URL = 'https://api.flightstats.com/flex/schedules/rest/v1/json/flight';

export const getFlights = new ValidatedMethod({
  name: 'flights.get',
  mixins: [CallPromiseMixin],
  validate: function({ flight, date }) {
    if (!flight || !date) {
      throw new Error('Invalid data');
    }
  },
  run({ flight, date }) {
    if (Meteor.isServer) {
      const { appId, appKey } = Meteor.settings.private.flightStats;
      const year = date.getFullYear();
      // 'getMonth' returns the month from 0-11, the API however needs from 1-12
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const carrier = flight.substr(0, 2).toUpperCase();
      // parseInt will suppress leading zeros
      const flightNumber = parseInt(flight.substr(2, flight.length).trim(), 10);

      const departingRequest = axios.get(`${ROOT_URL}/${carrier}/${flightNumber}/departing/${year}/${month}/${day}?appId=${appId}&appKey=${appKey}`);
      const arrivingRequest = axios.get(`${ROOT_URL}/${carrier}/${flightNumber}/arriving/${year}/${month}/${day}?appId=${appId}&appKey=${appKey}`);

      return Promise.all([departingRequest, arrivingRequest])
        .then((values) => {
          const data = values.map(value => (value.data)); // Getting the data from axios responses
          return _.mapKeys(data, el => (el.request.departing ? 'departing' : 'arriving')); // mapping responses to responsive keys
        })
    }
  }
});
