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
