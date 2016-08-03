import axios from 'axios';

const API_Key = '';
const ROOT_URL = `http://fdlkjdfsljk?appid=${API_Key}`;

export const FETCH_JOBS = 'FETCH_JOBS';

export function fetchJobs(city) {
  // The was from example code
  // const url = `${ROOT_URL}&q=${city},us`;
  // const request = axios.get(url);

  console.log('Request:', city); // city chould be changed to request 

  return {
    type: FETCH_JOBS,
    payload: request
  };
}

export function selectJob(job) {
  console.log('A job has been selected:', job.title);
  return {
    type: 'JOB_SELECTED',
    payload: job
  };
}
