import { combineReducers } from 'redux';

import JobsReducer from './reducer_jobs';
import ActiveJob from './reducer_active_job';
import ActiveYelp from './reducer_active_yelp';
import ActiveTrains from './reducer_active_trains';
import ActiveBus from './reducer_active_bus';
import ActiveParks from './reducer_active_parks';
import ActiveGyms from './reducer_active_gyms';
import ToggleModal from './reducer_toggle_modal_on';

import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  jobs: JobsReducer,
  activeJob: ActiveJob,
  activeYelp: ActiveYelp,
  activeBus: ActiveBus,
  activeTrains: ActiveTrains,
  activeParks: ActiveParks,
  activeGyms: ActiveGyms,
  toggleModal: ToggleModal,
  routing: routerReducer
});

export default rootReducer;