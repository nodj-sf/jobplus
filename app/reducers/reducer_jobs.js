export default (state = [], action) => {
  switch(action.type) {
    case 'FETCH_JOBS':
      // console.log(`Action ${action} on Jobs Reducer.`);
      return action.payload.data.results;
    default:
      // console.log(`Unknown action <${action}> executed! Returning fallback output.`);
      return state;
  }
}
