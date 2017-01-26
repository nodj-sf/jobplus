'use strict';
import { LAST_LOCATION } from '../actions/index';


export default function lastLocation(state = '', action) {
  // console.log(`Action ${action} on Active Jobs Reducer.`);
  switch(action.type) {
    case LAST_LOCATION:
      // console.log(`Action <${action.type}> executed with payload:\n`, action.payload);
      return action.payload;
    default:
      // console.log(`Unknown action <${action}> executed! Returning fallback output.`);
      return state;
  }
};
