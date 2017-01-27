'use strict';
import { FETCH_YELP } from '../actions/index';


export default function activeYelp(state = [], action) {
  switch(action.type) {
    case FETCH_YELP:
      // console.log(`Action <${action.type}> executed with payload:\n`, action.payload);
      return action.payload.data;
    default:
      return state;
  }
};
