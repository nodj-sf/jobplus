export default function(state = null, action) {
  switch(action.type) {
    case 'JOB_SELECTED':
      console.log(`Action ${action} on Active Jobs Reducer.`);
      return action.payload;
    // default:
    //   console.log(`Unknown action <${action}> executed! Returning fallback output.`);
    //   return state;
  }
  return state;
}
