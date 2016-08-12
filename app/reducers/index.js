import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import JobsReducer from './reducer_jobs';
import ActiveJob from './reducer_active_job';
import ActiveYelp from './reducer_active_yelp';
import ActivePlaces from './reducer_active_places';
import ToggleModal from './reducer_toggle_modal_on';
import JobInputTerm from './reducer_job_search_term';
import LocationInputTerm from './reducer_location_search_term';
import SearchInputs from './reducer_search_inputs';


const rootReducer = combineReducers({
  jobs: JobsReducer,
  activeJob: ActiveJob,
  activeYelp: ActiveYelp,
  activePlaces: ActivePlaces,
  toggleModal: ToggleModal,
  routing: routerReducer,
  jobInputTerm: JobInputTerm,
  locationInputTerm: LocationInputTerm,
  searchInputs: SearchInputs
});

export default rootReducer;
