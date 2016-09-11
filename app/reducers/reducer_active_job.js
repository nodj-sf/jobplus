export default function(state = {}, action) {
  switch(action.type) {
    case 'JOB_SELECTED':
      return action.payload;
    default:
      // console.log(`Unknown action <${action}> executed! Returning fallback output.`);
      return state;
  }
};
