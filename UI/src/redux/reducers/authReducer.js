import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, REFRESH_SESSION } from '../types/authActionTypes';
import { OP_FAILED } from '../types/libraryActions';

const initialState = {
  userIsAuthenticated: false,
  user: {}
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case OP_FAILED:
      return { ...state, errorMsg: payload };
    
    case REGISTER_USER:
      return {
        userIsAuthenticated: true,
        user: payload,
      }

    case LOGIN_USER:
      return {
        userIsAuthenticated: true,
        user: payload,
      }

    case REFRESH_SESSION:
      return {
        userIsAuthenticated: true,
        user: payload,
      }

    case LOGOUT_USER:
      return {
        userIsAuthenticated: false,
        user: payload,
      }

    default:
      return state;
  }
}