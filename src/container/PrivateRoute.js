import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class PrivateRoute extends React.Component {
  render () {
    const {
      isLoggedIn,
      component: Component,
      ...props
    } = this.props;

    return (
      <Route
        {...props}
        render={(props) =>
          isLoggedIn
            ? <Component {...props} />
            : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
          )
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
