import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux'

// Importing Datepicker stylesheet
import 'react-datepicker/dist/react-datepicker.css';

// Importing action
import * as actions from '../actions';

const flightRegex = /\b[a-zA-Z]{2}[0-9]{1,4}\b/;

class Details extends Component {
  constructor(props) {
    super(props);

    // Binding event handlers to context
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFlightChange = this.handleFlightChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      flight: '',
      flightError: false,
      date: moment()
    };
  }

  handleFlightChange(e) {
    this.setState({
      flight: e.target.value.toUpperCase(),
      flightError: false
    });
  }

  handleDateChange(date) {
    this.setState({ date });
  }

  onFormSubmit(event) {
    event.preventDefault();
    const { date, flight } = this.state;
    if(flightRegex.test(flight)) {
      this.props.startLoading();
      this.props.fetchFlight({ flight, date: date.toDate() }, () => {
        this.props.stopLoading();
        // this.props.unselectFlight();
      });
    } else {
      this.setState({ flightError: true });
    }
  }

  render() {
    const { flightError, flight, date } = this.state;

    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="ui attached blue message">
          <div className="content">
            Enter your flight details
          </div>
        </div>

        <div className="ui attached segment">
          <div className="ui three column grid middle aligned">
            <div className="ui four wide column">
              <div className={`ui fluid input field ${flightError ? 'error' : ''}`}>
                <input type="text" placeholder="Enter you flight number..."  onChange={this.handleFlightChange} value={flight} />
                {flightError ? (<div className="ui pointing red basic label">
                  Please enter a valid flight number
                </div>) : ''}
              </div>
            </div>

            <div className="four wide column">
              <DatePicker
                selected={date}
                onChange={this.handleDateChange}
                minDate={moment()}
                maxDate={moment().add(1, 'year')}
                monthsShown={2}
                dateFormat="DD MMM YYYY"
                className="ui blue basic button"
              />
            </div>

            <div className="eight wide column right aligned">
              <button className={`ui right labeled icon primary button ${this.props.loading ? 'loading' : ''}`} type="submit">
                Search
                <i className="search icon"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
};

function mapStateToProps({ loading }) {
  return { loading };
}

export default connect(mapStateToProps, actions)(Details);
