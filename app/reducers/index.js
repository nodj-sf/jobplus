import { combineReducers } from 'redux';

import JobsReducer from './reducer_jobs';
import ActiveJob from './reducer_active_job';
import ToggleModal from './reducer_toggle_modal_on';
// import ToggleModalOff from './reducer_toggle_modal_off';


const rootReducer = combineReducers({
  jobs: JobsReducer,
  activeJob: ActiveJob,
  toggleModal: ToggleModal
});

export default rootReducer;
