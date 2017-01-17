export default function(state = [], action) {
  switch(action.type) {
    case 'FETCH_YELP':
      console.log(`Yelp API Payload:\n`, action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
}
