export default function(state = null, action) {  
  switch(action.type) {
    case 'LOADING':
      return action.payload;
    default:
      return state;
  }
}
