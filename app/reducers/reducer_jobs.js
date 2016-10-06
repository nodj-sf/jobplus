export default function(state = [], action) {
  switch(action.type) {
    case 'FETCH_JOBS':
      // console.log(`Action ${action} on Jobs Reducer.`);
      let data = action.payload.data;
        console.log('DATA:', data, data.results);
      // return action.payload.data.results;
      return data.results;
    default:
      // console.log(`Unknown action <${action}> executed! Returning fallback output.`);
      return state;
  }
};
