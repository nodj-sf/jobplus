export default function(state = [], action) {  
  switch(action.type) {
    case 'FETCH_YELP':
      // Returning initial state for now until we get backend data
      return action.payload.data;
    default:
      return state;
  }
}
