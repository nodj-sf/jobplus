'use strict';
import { FETCH_TRAINS } from '../actions/index';


export default function activeTrains(state = [], action) {
  switch(action.type) {
    case FETCH_TRAINS:
      // console.log(`Action <${action.type}> executed with payload:\n`, action.payload);
      return action.payload.data.results;
    default:
      return state;
  }
};
