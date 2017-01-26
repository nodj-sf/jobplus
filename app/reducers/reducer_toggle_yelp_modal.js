'use strict';
import { TOGGLE_YELP_MODAL_ } from '../actions/index';


export default function(state = {}, action) {
  // Utility function returns the string value of the `yelpID` action's input:
  const extractYelpID = () => action.type.replace(/TOGGLE_YELP_MODAL_/, '');

  switch (action.type) {
    case `${TOGGLE_YELP_MODAL_}${extractYelpID()}`:
      console.log(`Action <${action.type}> executed.`);

      // let newState = [...new Set(Object.keys(state).concat(`Yelp_Modal_${extractYelpID()}`))].reduce((memo, curr) => {
      //     memo[curr] = (curr === `Yelp_Modal_${extractYelpID()}`
      //       ? !(~~state[`Yelp_Modal_${extractYelpID()}`])
      //       : false
      //     );
      //     return memo;
      //   }, {});
      //   console.log('STATE YELP:', newState);
      //   return newState;

      const modalKey = `Yelp_Modal_${extractYelpID()}`,
            newState = Object.assign({}, state, {
              [modalKey]: (modalKey in state ? !state[modalKey] : true)
            });
      // console.log('NEW STATE:', newState);
      return newState;
    default:
      return state;
  }
};
