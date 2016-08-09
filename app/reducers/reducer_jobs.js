const dummy = [
  { jobtitle: 'Front-End', jobkey: '1' },
  { jobtitle: 'Back-End', jobkey: '2' },
  { jobtitle: 'Full-Stack', jobkey: '3' } 
];

export default function(state = dummy, action) {
    
  switch(action.type) {
    case 'FETCH_JOBS':
      return action.payload.data.results;
  }
  return state;
}
