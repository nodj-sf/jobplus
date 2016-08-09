import axios from 'axios';
const FETCH_JOBS = 'FETCH_JOBS';
const JOB_SELECTED = 'JOB_SELECTED';

export const fetchJobs = (jobSearch, city) => {
  const request = axios.post('/api/v1/jobs', {
    jobTitle: jobSearch,
    city: city
  });

  return {
    type: FETCH_JOBS,
    payload: request
  };
};

export const selectJob = (job) => {
  console.log('A job has been selected:', job);
  return {
    type: JOB_SELECTED,
    payload: job
  };
};
