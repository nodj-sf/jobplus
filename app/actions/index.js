import axios from 'axios';

export const fetchJobs = (jobSearch, city) => {
  const request = axios.post('/api/v1/jobs', {
    jobTitle: jobSearch,
    city: city
  });

  return {
    type: 'FETCH_JOBS',
    payload: request
  };
};

export const fetchYelp = (long, lat) => {
  const request = axios.post('/api/v1/food', {
    lat: lat,
    long: long
  });

  console.log('longlat',long, lat);
  
  return {
    type: 'FETCH_YELP',
    payload: request
  };
};

export const selectJob = (job) => {
  console.log('selectjob', job);
  return {
    type: 'JOB_SELECTED',
    payload: job
  };
};
  