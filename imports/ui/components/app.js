import React, { Component } from 'react';

// Importing react components
import Header from './header';
import Details from './details';
import Flights from './flights';
import Cart from './cart';
import Notification from './notification';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="ui container">
          <Header />
          <Details />
          <Flights />
          <Cart />
          <Notification />
        </div>
      </div>
    );
  }
}
