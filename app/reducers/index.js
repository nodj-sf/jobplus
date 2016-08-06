import { combineReducers } from 'redux';

import JobsReducer from './reducer_jobs';
import ActiveJob from './reducer_active_job';

const rootReducer = combineReducers({
  jobs: JobsReducer,
  activeJob: ActiveJob
});

export default rootReducer;
