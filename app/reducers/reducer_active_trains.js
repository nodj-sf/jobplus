export default function(state = [], action) {  
  switch(action.type) {
    case 'FETCH_TRAINS':
      // Returning initial state for now until we get backend data
      console.log('action.payload: ', action.payload, action.payload.data.results);
      console.log('STATE\n:', state);
      return action.payload.data.results;
    default:
      return state;
  }
}
