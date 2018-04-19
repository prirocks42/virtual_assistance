import React from 'react';
import store from './store.js';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Switch, BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import ToDo from './components/ToDo';
import App from './components/App';
import Login from './components/Login';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


let RouterConfig = () =>
<Provider store={store}>
  <Router>
    <Switch>
      <Route path="/login"  component={Login} />
      <PrivateRoute path="/"  component={App} />
    </Switch>  
  </Router>
</Provider>

module.exports = RouterConfig;
