export default function(state = {}, action) {
  // console.log(`Action ${action} on Active Jobs Reducer.`);
  switch(action.type) {
    case 'JOB_SELECTED':
      // console.log(`Active Job Key ID: ${action.payload.jobkey}`);
      return action.payload;
    case 'DISPLAY_INFO_BOX_ON_LIST_CLICK':
      const newState = Object.assign({}, state, {displayInfoBoxOnListClick: true});
      return newState;
    default:
      // console.log(`Unknown action <${action}> executed! Returning fallback output.`);
      return state;
  }
}
