export default function(state = [], action) {  
  switch(action.type) {
    // console.log(`Payload: ${action.payload}`);
    case 'FETCH_GPLACES':
      return action.payload.data.results;
    default:
      return state;
  }
}
