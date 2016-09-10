import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import jobs from './reducer_jobs';
import activeJob from './reducer_active_job';
import activeYelp from './reducer_active_yelp';
import activeTrains from './reducer_active_trains';
import activeBus from './reducer_active_bus';
import activeParks from './reducer_active_parks';
import activeGyms from './reducer_active_gyms';
import toggleModal from './reducer_toggle_modal';
import jobInputTerm from './reducer_job_search_term';
import lastJob from './reducer_last_job';
import locationInputTerm from './reducer_location_search_term';
import lastLocation from './reducer_last_location';
import searchInputs from './reducer_search_inputs';
import scrapDetails from './reducer_scrap_details';
import loading from './reducer_toggle_loading';
import toggleContainerDisplay from './reducer_toggle_container_display';


const rootReducer = combineReducers({
  jobs,
  activeJob,
  activeYelp,
  activeTrains,
  activeBus,
  activeParks,
  activeGyms,
  toggleModal,
  routing: routerReducer,
  jobInputTerm,
  lastJob,
  locationInputTerm,
  lastLocation,
  searchInputs,
  scrapDetails,
  loading,
  toggleContainerDisplay
});

export default rootReducer;
