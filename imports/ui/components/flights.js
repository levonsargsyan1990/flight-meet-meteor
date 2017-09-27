import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlightTable from './flightTable';

class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  getMetaData(data) {
    data.scheduledFlights.forEach(flight => {
      // Adding name of the airline to each flight
      flight.airline = data.appendix.airlines.find(airline => airline.fs === flight.carrierFsCode).name;

      // Handling codeshare case
      if (flight.isCodeshare) {
        flight.operator.airline = data.appendix.airlines.find(airline => airline.fs === flight.operator.carrierFsCode).name;
      }

      // Adding name of the departure airport
      flight.departureAirport = data.appendix.airports.find(airport => airport.fs === flight.departureAirportFsCode).name;

      // Adding name of the arrival airport
      flight.arrivalAirport = data.appendix.airports.find(airport => airport.fs === flight.arrivalAirportFsCode).name;
    });
  }

  renderDeparting() {
    const { departing } = this.props.flights;

    if (!departing) {
      // Initial case
      return (
        <div />
      );
    }


    if (departing.error) {
      // Error case
      return (
        <div>
          <h2 className="ui header departing">
            <i className="plane icon"></i>
            <div className="content">
              Departing
            </div>
          </h2>
          <div className="ui icon red message">
            <i className="warning sign icon"></i>
            Unable to get information about departing flights
          </div>
        </div>
      );
    }

    if (departing.scheduledFlights.length === 0) {
      // No flight
      return (
        <div className="ui warning message">
        <p>No departures on selected day</p>
        </div>
      );
    }

    this.getMetaData(departing);
    return (
      <div>
        <h2 className="ui header departing">
          <i className="plane icon"></i>
          <div className="content">
            Departing
          </div>
        </h2>
        <FlightTable flights={departing} flightType="departing"/>
      </div>
    );
  }

  renderArriving() {
    const { arriving } = this.props.flights;

    if (!arriving) {
      // Initial case
      return (
        <div />
      );
    }

    if (arriving.error) {
      // Error case
      return (
        <div>
          <h2 className="ui header arriving">
            <i className="plane icon"></i>
            <div className="content">
              Arriving
            </div>
          </h2>
          <div className="ui icon red message">
            <i className="warning sign icon"></i>
            Unable to get information about arriving flights
          </div>
        </div>
      );
    }

    if (arriving.scheduledFlights.length === 0) {
      // No flight
      return (
        <div className="ui warning message">
        <p>No arrivals on selected day</p>
        </div>
      );
    }

    this.getMetaData(arriving);
    return (
      <div>
        <h2 className="ui header arriving">
          <i className="plane icon"></i>
          <div className="content">
            Arriving
          </div>
        </h2>
        <FlightTable flights={arriving} flightType="arriving"/>
      </div>
    );
  }

  render() {
    // Show loader while request is in progress
    if(this.props.loading) {
      return (
        <div className="ui active  inverted dimmer">
          <div className="ui large text loader">Loading</div>
        </div>
      );
    }

    return(
      <div className="flight-section">
        {this.renderDeparting()}
        {this.renderArriving()}
      </div>
    );
  }
}

function mapStateToProps({ flights, loading }) {
  return { flights, loading };
}

export default connect(mapStateToProps)(Flights);
