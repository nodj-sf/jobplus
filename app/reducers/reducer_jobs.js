const dummy = [{ 
  jobtitle: 'Front-End', 
  jobkey: '1', 
  company: 'Google', 
  formattedRelativeTime: '1 year ago', 
  latitude:37.745951, 
  longitude: -122.439421 
},{ 
  jobtitle: 'Back-End', 
  jobkey: '2', 
  company: 'MakerSquare', 
  formattedRelativeTime: '15 days ago', 
  latitude: 37.745, 
  longitude: -122.439421 
}, { 
  jobtitle: 'Full-Stack', 
  jobkey: '3', 
  company: 'Go Daddy', 
  formattedRelativeTime: '2 months ago',
  latitude: 37.743, 
  longitude: -122.419421 
}];


export default (state = dummy, action) => {
  switch(action.type) {
    case 'FETCH_JOBS':
      // console.log(`Action ${action} on Jobs Reducer.`);
      return action.payload.data.results;
    default:
      // console.log(`Unknown action <${action}> executed! Returning fallback output.`);
      return state;
  }
}
