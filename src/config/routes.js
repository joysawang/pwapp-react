import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PublicRoute from './../container/PublicRoute';
import PrivateRoute from './../container/PrivateRoute';

// Import views component
import Login from './../views/login';
import Register from './../views/register';
import Home from './../views/home';
import Error from './../views/error';

class AppRoute extends Component {
  render () {
    return (
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={Register} />
        <PrivateRoute exact path="/" component={Home} />
        <Route component={Error} />
      </Switch>
    );
  }
}

export default AppRoute;
