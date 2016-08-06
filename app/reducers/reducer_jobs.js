const dummy = [
  { jobtitle: 'Front-End', jobkey: '1', company: 'Google' },
  { jobtitle: 'Back-End', jobkey: '2', company: 'MakerSquare' },
  { jobtitle: 'Full-Stack', jobkey: '3', company: 'Go Daddy' } 
];

export default function(state = dummy, action) {
    
  switch(action.type) {
    case 'FETCH_JOBS':
      return action.payload.data.results;
  }
  return state;
}
