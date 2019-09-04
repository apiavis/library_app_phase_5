import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../redux/actions/authActionCreators';

import '../css/layout.css';
import '../css/bootstrap.min.css';

const LogoutButton = (props) => (
  <button className="btn btn-primary logout-btn" onClick={props.logout}>
    Logout
  </button>
);

const mapDispatchToProps = (dispatch) => ({
  logout
});

export default connect(
  null,
  mapDispatchToProps
)(LogoutButton);