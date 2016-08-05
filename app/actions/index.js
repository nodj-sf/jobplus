export function fetchJobs(jobData) {
  console.log('Redux Action:', jobData);
  return {
    type: 'FETCH_JOBS',
    payload: jobData
  };
}

export function selectJob(job) {
  console.log('A job has been selected:', job);
  return {
    type: 'JOB_SELECTED',
    payload: job
  };
}


// export function login() {
//   return {
//     type: LOGGED_IN,
//     payload: {
//       userId: 123
//     },
//     meta: {
//       transition: (state, action) => ({
//         path: `/logged-in/${action.payload.userId}`,
//         query: {
//           some: 'queryParam'
//         },
//         state: {
//           some: 'state'
//         }
//       })
//     }
//   };
// }