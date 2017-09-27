import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';

import { unselectFlight } from '../actions';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.handleOpenButtonClick = this.handleOpenButtonClick.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);

    this.state = {
      isOpen: false
    };
  }

  handleOpenButtonClick() {
    this.setState({ isOpen: true });
  }

  handleCloseButtonClick() {
    this.setState({ isOpen: false });
  }

  renderSelectedFlights() {
    return this.props.selectedFlights.map(flight => {
      return (
        <tr key={`${flight.airportType}-${flight.referenceCode}`}>
          <td>{flight.carrierFsCode}{flight.flightNumber}</td>
          <td>{flight.airportType === 'departing' ? flight.departureAirport : flight.arrivalAirport}</td>
          <td>{_.capitalize(flight.airportType)}</td>
          <td>{flight.airportType === 'departing' ? moment(flight.departureTime).format('HH:mm') : moment(flight.arrivalTime).format('HH:mm')}</td>
          <td>{flight.airportType === 'departing' ? moment(flight.departureTime).format('DD MMM YYYY') : moment(flight.arrivalTime).format('DD MMM YYYY')}</td>
          <td><button onClick={() => this.props.unselectFlight(flight)} className="ui red button">Remove</button></td>
        </tr>
      )
    })
  }

  renderCardInfo() {
    if (this.props.selectedFlights.length === 0) {
      return (
        <div className="ui message">
          <div className="header">
            No orders just yet
          </div>
          <p>Click on any airport and we will be there!</p>
        </div>
      );
    }

    return (
      <table className="ui very basic table">
        <thead>
          <tr>
            <th>Flight</th>
            <th>Airport</th>
            <th>Arrival/Departure</th>
            <th>Date</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <thead>
          {this.renderSelectedFlights()}
        </thead>
      </table>
    );
  }

  render() {
    if (!this.state.isOpen) {
      return (
        <div className="cart">
          <button onClick={this.handleOpenButtonClick} className="ui circular blue icon button cart-open-button">
            <i className="shop icon"></i>
          </button>

          <span className="cart-selected-number">{this.props.selectedFlights.length}</span>
        </div>
      );
    }

    return (
      <div className="cart">
        <button onClick={this.handleCloseButtonClick} className="ui circular blue icon button cart-close-button">
          <i className="remove icon"></i>
        </button>
        <div className="ui blue segment">
          {this.renderCardInfo()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ selectedFlights }){
  return { selectedFlights };
}

export default connect(mapStateToProps, { unselectFlight })(Cart);
