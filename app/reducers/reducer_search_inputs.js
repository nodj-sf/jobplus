export default function(state = {}, action) {
  // console.log(`Search Inputs Reducer triggered by action <${action.type}>`);
  switch (action.type) {
    case 'SEARCH_INPUTS':
    case 'LOCATION_CHANGE':
      // console.log(`Search Inputs Reducer Payload: ${action.payload}`);
      return action.payload;
    default:
      return state;
  }
};
