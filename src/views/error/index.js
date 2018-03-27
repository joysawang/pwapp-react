import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Error extends Component {
  render () {
    return (
      <div className="app-error">
        <p className="error-header">404</p>
        <p className="error-text">Page Not Found. That Page Doesn't Exist!</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default withRouter(connect(mapStateToProps)(Error));
