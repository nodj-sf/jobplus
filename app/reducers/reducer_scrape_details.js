export default function(state = null, action) {
  switch(action.type) {
    case 'SCRAPE_DATA':
      return action.payload;
    default:
      return state;
  }
}
