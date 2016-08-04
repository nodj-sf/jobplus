var dummy = [ {jobtitle: 'Front-End', jobkey: '1'}, 
              {jobtitle: 'Back-End', jobkey: '2'},
              {jobtitle: 'Full-Stack', jobkey: '3'} 
            ];

export default function(state = dummy, action) {
  switch(action.type) {
  case 'FETCH_JOBS':
    console.log(action , "action in reducer");
    // returning initial state for now until we get backend data
    return action.payload;
  }
  
  return state;
}