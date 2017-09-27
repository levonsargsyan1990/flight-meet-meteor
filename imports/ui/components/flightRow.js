import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { selectFlight, unselectFlight } from '../actions';

const FlightRow = ({ flightType, flight, selectFlight, unselectFlight, selectedFlights }) => {
  function isAirportSelected(airportType) {
    return _.findIndex(selectedFlights, { referenceCode: flight.referenceCode, flightType, airportType }) !== -1;
  }

  function handleSelection(airportType) {
    if(!isAirportSelected(airportType)) {
      selectFlight({ ...flight, flightType, airportType });
    } else {
      unselectFlight({ ...flight, flightType, airportType });
    }
  }

  return (
    <tr>
      <td>
        {flight.airline} ({flight.carrierFsCode})
        <span>
          {flight.isCodeshare ? `(${flight.operator.airline})` : ''}
        </span>
      </td>
      <td>{flight.carrierFsCode}{flight.flightNumber}</td>
      <td
        className={isAirportSelected('departing') ? 'selected airport' : 'airport'}
        onClick={() => handleSelection('departing')}
      >
        {flight.departureAirport} ({flight.departureAirportFsCode})
      </td>
      <td
        className={isAirportSelected('arriving') ? 'selected airport' : 'airport'}
        onClick={() => handleSelection('arriving')}
      >
        {flight.arrivalAirport} ({flight.arrivalAirportFsCode})
      </td>
      <td>{moment(flight.departureTime).format('DD MMM YYYY')}</td>
      <td>{moment(flight.departureTime).format('HH:mm')}</td>
      <td>{moment(flight.arrivalTime).format('DD MMM YYYY')}</td>
      <td>{moment(flight.arrivalTime).format('HH:mm')}</td>
    </tr>
  );
};

function mapStateToProps({ selectedFlights }) {
  return { selectedFlights };
}

export default connect(mapStateToProps, { selectFlight, unselectFlight })(FlightRow);
