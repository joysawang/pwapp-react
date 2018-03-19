import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history';
import './App.css';

class Home extends Component {
  render() {
    return (
      <div className='container'>
        <p>Welcome to Application</p>
        <p>PWA with ReactJS</p>
        <button className='btn btn-primary' onClick={() => this.props.history.push('/login')}>Login</button>
      </div>
    );
  }
}

class Login extends Component {
  render() {
    return (
      <div className='container'>
        <p>Login Form</p>
        <button className='btn btn-primary' onClick={() => this.props.history.goBack()}>Back</button>
      </div>
    );
  }
}

const configureHistory = () => {
  return window.matchMedia('(display-mode: standalone)').matches
    ? createHashHistory()
    : createBrowserHistory()
}

class App extends Component {
  render() {
    return (
      <Router history={configureHistory()}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
