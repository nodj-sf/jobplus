export default function(state = {}, action) {
  // console.log(`Action ${action} on Active Jobs Reducer.`);
  switch(action.type) {
    case 'JOB_SELECTED':
      // console.log(`Active Job Key ID: ${action.payload.jobkey}`);
      return action.payload;
    default:
      // console.log(`Unknown action <${action}> executed! Returning fallback output.`);
      return state;
  }
};
