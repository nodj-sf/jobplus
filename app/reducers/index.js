import { combineReducers } from 'redux';

import JobsReducer from './reducer_jobs';
import ActiveJob from './reducer_active_job';
import ActiveYelp from './reducer_active_yelp';
import ActivePlaces from './reducer_active_places';
import ToggleModal from './reducer_toggle_modal_on';

import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  jobs: JobsReducer,
  activeJob: ActiveJob,
  activeYelp: ActiveYelp,
  activePlaces: ActivePlaces,
  toggleModal: ToggleModal,
  routing: routerReducer
});

export default rootReducer;
