export default function(state = [], action) {  
  switch(action.type) {
    case 'FETCH_BUS':
      // Returning initial state for now until we get backend data
      // console.log('action.payload: ',action.payload);
      return action.payload.data.results;
    default:
      return state;
  }
}
