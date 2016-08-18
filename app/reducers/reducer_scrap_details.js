export default function(state = null, action) {
  switch(action.type) {
    case 'SCRAP_DATA':
      return action.payload;
    default:
      return state;
  }
}
