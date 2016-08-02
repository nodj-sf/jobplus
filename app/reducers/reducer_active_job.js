export default function(state = null, action) {
  switch(action.type) {
  case 'JOB_SELECTED':
    return action.payload;
  }
  
  return state;
}