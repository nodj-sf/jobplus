var dummy = [ {title: 'Front-End', id: '1'}, 
              {title: 'Back-End', id: '2'},
              {title: 'Full-Stack', id: '3'} 
            ];

export default function(state = dummy, action) {
  switch(action.type) {
  case 'FETCH_JOBS':
    // returning initial state for now until we get backend data
    return state;
    //return action.payload;
  }
  
  return state;
}