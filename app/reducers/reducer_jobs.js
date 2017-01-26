'use strict';
import { FETCH_JOBS } from '../actions/index';


export default function jobs(state = [], action) {
  switch(action.type) {
    case FETCH_JOBS:
      // console.log(`Action <${action.type}> executed with payload:\n`, action.payload);
      let data = action.payload.data;
        console.log('DATA:', data, data.results);
      return data.results;
    default:
      // console.log(`Unknown action <${action}> executed! Returning fallback output.`);
      return state;
  }
};
