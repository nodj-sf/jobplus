import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import JobsReducer from './reducer_jobs';
import ActiveJob from './reducer_active_job';
import ActiveYelp from './reducer_active_yelp';
import ActiveTrains from './reducer_active_trains';
import ActiveBus from './reducer_active_bus';
import ActiveParks from './reducer_active_parks';
import ActiveGyms from './reducer_active_gyms';
import ToggleModal from './reducer_toggle_modal_on';
import JobInputTerm from './reducer_job_search_term';
import LocationInputTerm from './reducer_location_search_term';
import SearchInputs from './reducer_search_inputs';
import scrapDetails from './reducer_scrap_details';
import loading from './reducer_toggle_loading';


const rootReducer = combineReducers({
  jobs: JobsReducer,
  activeJob: ActiveJob,
  activeYelp: ActiveYelp,
  activeBus: ActiveBus,
  activeTrains: ActiveTrains,
  activeParks: ActiveParks,
  activeGyms: ActiveGyms,
  toggleModal: ToggleModal,
  routing: routerReducer,
  jobInputTerm: JobInputTerm,
  locationInputTerm: LocationInputTerm,
  searchInputs: SearchInputs,
  scrapDetails: scrapDetails,
  loading: loading
});

export default rootReducer;
