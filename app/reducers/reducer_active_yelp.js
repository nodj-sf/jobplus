export default function(state = null, action) {  
  switch(action.type) {
    case 'FETCH_YELP':
      // Returning initial state for now until we get backend data
      console.log('FETCH_YELP Payload: ', action.payload);
      return action.payload;
  }
  return state;
}