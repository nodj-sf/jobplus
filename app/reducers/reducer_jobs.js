export default function(state = [], action) {
  switch(action.type) {
    case 'FETCH_JOBS':
      // console.log(`Action ${action.type} on Jobs Reducer.`);
      let data = action.payload.data;
        console.log('DATA:', data, data.results);
      return data.results;
    default:
      // console.log(`Unknown action <${action.type}> executed! Returning fallback output.`);
      return state;
  }
};
