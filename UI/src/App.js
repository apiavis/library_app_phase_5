import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Main from './components/Main';
import About from './components/About';

import './css/bootstrap.min.css';
import './css/layout.css';

const App = (props) => {
  if (props.errorMsg) console.error('ERROR! \n', props.errorMsg);

  return (
      <Switch>
        <PrivateRoute component={Main} exact path="/" authed={props.userIsAuthenticated} />

        <PrivateRoute component={About} path="/about" authed={props.userIsAuthenticated} />

        <Route
          path="/login"
          render={() => {
            return <Login authed={props.userIsAuthenticated} {...props} />;
          }}
        />
      </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMsg: state.library.errorMsg,
    userIsAuthenticated: state.auth.userIsAuthenticated,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps
)(withRouter(App));