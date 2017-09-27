// Import client startup through a single index entry point

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from '../../ui/components/app';
import store from '../../ui/store';

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('app'));
});
