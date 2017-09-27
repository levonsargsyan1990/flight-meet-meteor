import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  componentWillMount() {
    this.timeouts = [];
  }

  setTimeout() {
    this.timeouts.push(setTimeout.apply(null, arguments));
  }

  clearTimeouts() {
    this.timeouts.forEach(clearTimeout);
  }

  componentWillUnmount() {
    this.clearTimeouts();
  }

  componentWillUpdate({ notification }) {
    if (!_.isEqual(notification, this.props.notification)) {
      this.clearTimeouts();
      this.setState({ isVisible: true });
      this.setTimeout(() => {
        this.setState({ isVisible: false });
      }, 3000);
    }
  }

  render () {
    if (!this.state.isVisible) {
      return(
        <div />
      );
    }

    const { type, text } = this.props.notification;

    return (
      <div className={`ui ${type} message notification`}>
        <p>{text}</p>
      </div>
    );
  }
}

function mapStateToProps({ notification }) {
  return { notification };
}

export default connect(mapStateToProps)(Notification);
