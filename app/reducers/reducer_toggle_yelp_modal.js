'use strict';
import { TOGGLE_YELP_MODAL_ } from '../actions/index';
import { extractIdentifier } from './utilities';


export default function toggleYelpModal(state = {}, action) {
  const extractYelpID = extractIdentifier(action.type, 'TOGGLE_YELP_MODAL_');

  switch (action.type) {
    case `${TOGGLE_YELP_MODAL_}${extractYelpID}`:
      // console.log(`Action <${action.type}> executed with empty payload (intentionally).`);
      const YelpID = `Yelp_Modal_${extractYelpID}`,
            newState = Object.assign({}, state, {
              [YelpID]: (YelpID in state ? !state[YelpID] : true)
            });
      return newState;
    default:
      return state;
  }
};
