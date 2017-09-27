import moment from 'moment';
import { SHOW_NOTIFICATON } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SHOW_NOTIFICATON:const { flight, type } = action.payload;
      let text = '';

      if (type === 'positive') {
        if (flight.airportType === 'arriving') {
          text = `Your request to meet you at the ${flight.arrivalAirport} airport at ${moment(flight.arrivalTime).format('HH:mm')} on ${moment(flight.arrivalTime).format('DD MMM YYYY')} has been accepted.`;
        } else {
          text = `Your request to take you to the ${flight.departureAirport} airport at ${moment(flight.departureTime).format('HH:mm')} on ${moment(flight.departureTime).format('DD MMM YYYY')} has been accepted.`;
        }
      } else {
          if (flight.airportType === 'arriving') {
            text = `Your request to meet you at the ${flight.arrivalAirport} airport at ${moment(flight.arrivalTime).format('HH:mm')} on ${moment(flight.arrivalTime).format('DD MMM YYYY')} has been cancelled.`;
          } else {
            text = `Your request to take you to the ${flight.departureAirport} airport at ${moment(flight.departureTime).format('HH:mm')} on ${moment(flight.departureTime).format('DD MMM YYYY')} has been cancelled.`;
          }
      }

      return { text, type };
    default:
      return state;
  }
}
