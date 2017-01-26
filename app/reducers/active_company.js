'use strict';
import { FETCH_COMPANY_DATA } from '../actions/index';


export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_COMPANY_DATA:
      console.log(`Action <${action.type}> executed with output:\n`, action.payload);
      return action.payload.data[0] || { logo: null, domain: 'https://www.google.com/', name: '' };
    default:
      return state;
  }
};
