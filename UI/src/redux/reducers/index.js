import { combineReducers } from 'redux';

import libraryReducer from './libraryReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  library: libraryReducer,
  auth: authReducer
});

export default rootReducer;
