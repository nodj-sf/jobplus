import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import globalReducer from './globalReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  globalReducer
});

export default rootReducer;
