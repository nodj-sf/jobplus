'use strict';
import { LAST_JOB } from '../actions/index';


export default function lastJob(state = '', action) {
  switch (action.type) {
    case LAST_JOB:
      // console.log(`Action <${action.type}> executed with payload:\n`, action.payload);
      return action.payload;
    default:
      return state;
  }
};
