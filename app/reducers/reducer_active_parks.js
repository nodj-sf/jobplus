'use strict';
import { FETCH_PARKS } from '../actions/index';


export default function activeParks(state = [], action) {
  switch(action.type) {
    case FETCH_PARKS:
      // console.log(`Action <${action.type}> executed with payload:\n`, action.payload);
      return action.payload.data.results;
    default:
      return state;
  }
};
