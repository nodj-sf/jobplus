const dummy = [
  { jobtitle: 'Front-End', jobkey: '1' },
  { jobtitle: 'Back-End', jobkey: '2' },
  { jobtitle: 'Full-Stack', jobkey: '3' } 
];

export default function(state = dummy, action) {
  
  console.log('action in reducer: ', action);
  
  switch(action.type) {
    case 'FETCH_JOBS':
      // Returning initial state for now until we get backend data
      console.log('action.payload.data: ', action.payload.data);
      return action.payload.data.results;
  }
  return state;
}
