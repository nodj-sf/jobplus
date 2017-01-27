'use strict';
import { JOB_INPUT_TERM } from '../actions/index';


export default function jobInputTerm(state = '', action) {
  switch (action.type) {
    case JOB_INPUT_TERM:
      // console.log(`Action <${action.type}> executed with payload:\n`, action.payload);
      return action.payload.jobTerm;
    default:
      return state;
  }
};
