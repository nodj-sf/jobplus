import axios from 'axios';

export function fetchJobs(city) {
  console.log('Request:', city);

  return {
    type: 'FETCH_JOBS',
    payload: city
  };
}

export function selectJob(job) {
  console.log('A job has been selected:', job);
  return {
    type: 'JOB_SELECTED',
    payload: job
  };
}
