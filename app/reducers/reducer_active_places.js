export default function(state = [], action) {  
  switch(action.type) {
    case 'FETCH_GPLACES':
      // console.log(`Payload: ${action.payload}`);
      return action.payload.data.results;
    default:
      return state;
  }
}
