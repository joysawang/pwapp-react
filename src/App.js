import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { configureHistory } from './config/routes';

// Import views component
import Login from './views/login';
import Register from './views/register';
import Home from './views/home';

class AppWithRouter extends Component {
  render() {
    return (
      <Router history={configureHistory()}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default AppWithRouter;
