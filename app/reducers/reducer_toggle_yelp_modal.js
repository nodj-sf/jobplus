export default function(state = {}, action) {
  // Utility function returns the string value of the `yelpID` action's input:
  const extractYelpID = () => action.type.replace(/TOGGLE_YELP_MODAL_/, '');

  switch (action.type) {
    case `TOGGLE_YELP_MODAL_${extractYelpID()}`:
      state = [...new Set(Object.keys(state).concat(`Yelp_Modal_${extractYelpID()}`))]
        .reduce((memo, curr) => {
          memo[curr] = (curr === `Yelp_Modal_${extractYelpID()}` 
            ? !(~~state[`Yelp_Modal_${extractYelpID()}`]) 
            : false
          );
          return memo;
        }, {});
    default:
      return state;
  }
};
