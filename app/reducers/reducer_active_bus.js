'use strict';
import { FETCH_BUS } from '../actions/index';


export default function activeBus(state = [], action) {
  switch(action.type) {
    case FETCH_BUS:
      // console.log(`Action <${action.type}> executed with payload:\n`, action.payload);
      return action.payload.data.results;
    default:
      return state;
  }
}
