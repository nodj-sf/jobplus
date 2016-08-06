var dummy = [
  { jobtitle: 'Front-End', jobkey: '1', company: 'Google' },
  { jobtitle: 'Back-End', jobkey: '2', company: 'MakerSquare' },
  { jobtitle: 'Full-Stack', jobkey: '3', company: 'Go Daddy' } 
];

export default function(state = dummy, action) {
  switch(action.type) {
    case 'FETCH_JOBS':
      console.log(action , "action in reducer");
      // Returning initial state for now until we get backend data
      return action.payload;
  }
  return state;
}
