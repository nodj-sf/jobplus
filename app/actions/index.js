import axios from 'axios';
const FETCH_JOBS = 'FETCH_JOBS';
const JOB_SELECTED = 'JOB_SELECTED';


export const fetchJobs = (jobSearch, city) => {
  const request = axios.post('/api/v1/jobs', {
    jobTitle: jobSearch,
    city: city
  });

  console.log(`Request ${request}`);
  return {
    type: FETCH_JOBS,
    payload: request
  };
};

export const fetchYelp = (city, long, lat) => {
  const request = axios.post('/api/v1/food', {
    city: city,
    coordinate: {
      lat: lat,
      long: long
    }
  });

  return {
    type: 'FETCH_YELP',
    payload: request
  };
};

export const selectJob = (job) => {
  return {
    type: JOB_SELECTED,
    payload: job
  };
};

export const toggleModal = () => {
  console.log(`Google Maps Modal view toggled ON!`);
  return {
    type: 'TOGGLE_MODAL_ON',
    payload: true
  };
};

export const toggleModalOff = () => {
  console.log(`Google Maps Modal view toggled OFF!`);
  return {
    type: 'TOGGLE_MODAL_OFF',
    payload: false
  };
};
