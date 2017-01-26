'use strict';
import { JOB_SELECTED } from '../actions/index';


export default function activeJob(state = {}, action) {
  // console.log(`Action ${action} on Active Jobs Reducer.`);
  switch(action.type) {
    case JOB_SELECTED:
      console.log(`Queried active job (with key/ID ${action.payload.jobkey}) and payload:\n`, action.payload);
      return action.payload;
    default:
      // console.log(`Unknown action <${action}> executed! Returning fallback output.`);
      return state;
  }
};
