export default function(state = [], action) {  
  switch(action.type) {
    case 'FETCH_YELP':
      return action.payload.data;
    default:
      return state;
  }
}
