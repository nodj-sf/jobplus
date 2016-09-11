export default function(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_YELP_MODAL':
      return state = !state;
    default:
      return state;
  }
};
