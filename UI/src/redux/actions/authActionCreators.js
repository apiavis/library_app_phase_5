import axios from 'axios';
import store from '../store';
import { baseUrl } from '../../util/defaultAxiosConfig';
import { OP_FAILED } from '../types/libraryActions';
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, REFRESH_SESSION } from '../types/authActionTypes';

export function register(credentials) {
  return axios
    .post(`${baseUrl}/auth/register`, credentials)
    .then((res) => {
      if (res.status === 200 && res.data.auth === true) {
        const userObj = {
          email: credentials.email,
          password: credentials.password,
          token: res.data.token
        }
        const action  = {
          type: REGISTER_USER,
          payload: userObj
        };
        store.dispatch(action);
      }
    })
    .catch((err) => {
      const action  = {
        type: REGISTER_USER,
        payload: {}
      };
      store.dispatch(action);
      store.dispatch({ type: OP_FAILED, payload: err });
    });
}

export function login(credentials) {
  return axios
    .post(`${baseUrl}/auth/login`, credentials)
    .then((res) => {
      if (res.status === 200 && res.data.auth === true) {
        const userObj = {
          email: credentials.email,
          password: credentials.password,
          token: res.data.token
        }
        const action  = {
          type: LOGIN_USER,
          payload: userObj
        };
        store.dispatch(action);
      }
    })
    .catch((err) => {
      const action  = {
        type: LOGIN_USER,
        payload: {}
      };
      store.dispatch(action);
      store.dispatch({ type: OP_FAILED, payload: err });
    });
}

export function refreshSession() {
  var credentials = {
    email: store.getState().auth.user.email,
    password: store.getState().auth.user.password
  }
  let confirmation = window.confirm(
    `Your session is about to end.  Would you like to continue browsing the library?`
  );
  if (confirmation) {
    return axios
      .post(`${baseUrl}/auth/login`, credentials)
      .then((res) => {
        if (res.status === 200 && res.data.auth === true) {
          const userObj = {
            email: credentials.email,
            password: credentials.password,
            token: res.data.token
          }
          const action  = {
            type: REFRESH_SESSION,
            payload: userObj
          };
          store.dispatch(action);
        }
      })
      .catch((err) => {
        const action  = {
          type: REFRESH_SESSION,
          payload: {}
        };
        store.dispatch(action);
        store.dispatch({ type: OP_FAILED, payload: err });
      });
  } else {
    logout(credentials);
  }
}

export function logout(credentials) {
  return axios
    .get(`${baseUrl}/auth/logout`)
    .then((res) => {
      if (res.status === 200 && res.data) {
        const action  = {
          type: LOGOUT_USER,
          payload: {}
        };
        store.dispatch(action);
      }
    })
    .catch((err) => {
      store.dispatch({ type: OP_FAILED, payload: err });
    });
}