'use strict';
import { FETCH_GYMS } from '../actions/index';


export default function activeGyms(state = [], action) {
  switch(action.type) {
    case FETCH_GYMS:
      // console.log(`Action <${action.type}> executed with payload:\n`, action.payload);
      return action.payload.data.results;
    default:
      return state;
  }
};
