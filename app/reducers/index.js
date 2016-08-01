import { combineReducers } from 'redux';
import JobsReducer from './reducer_jobs';

const rootReducer = combineReducers({
  jobs: JobsReducer
});

export default rootReducer;
