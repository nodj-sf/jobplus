export default function(state = null, action) {
  console.log("action", action.payload);
  switch(action.type) {
    case 'JOB_SELECTED':
      return action.payload;
  }

  return state;
}