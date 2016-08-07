const dummy = [
  { jobtitle: 'Front-End', jobkey: '1', company: 'Google', formattedRelativeTime: '1 year ago' },
  { jobtitle: 'Back-End', jobkey: '2', company: 'MakerSquare', formattedRelativeTime: '15 days ago' },
  { jobtitle: 'Full-Stack', jobkey: '3', company: 'Go Daddy', formattedRelativeTime: '2 months ago' } 
];

export default function(state = dummy, action) {
    
  switch(action.type) {
    case 'FETCH_JOBS':
      return action.payload.data.results;
  }
  return state;
}
