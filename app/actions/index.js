import axios from 'axios';

const FETCH_JOBS = 'FETCH_JOBS';
const JOB_SELECTED = 'JOB_SELECTED';
const FETCH_YELP = 'FETCH_YELP';
const FETCH_GPLACES = 'FETCH_GPLACES';


const getCookie = (name) => {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return '';
}

export const fetchJobs = (jobSearch, city) => {
  const request = axios.post('/api/v1/jobs', {
    jobTitle: jobSearch,
    city: city,
    _csrf: getCookie('_csrf')
  });

  return {
    type: FETCH_JOBS,
    payload: request
  };
};

export const fetchYelp = (city, lat, long) => {
  const request = axios.post('/api/v1/food', {
    city: city,
    coordinate: {
      latitude: lat,
      longitude: long
    },
    _csrf: getCookie('_csrf')
  });
  return {
    type: FETCH_YELP,
    payload: request
  };
};

export const fetchGPlaces = (lat, long) => {
  const request = axios.post('/api/v1/places', {
    coordinate: {
      lat: lat,
      long: long
    },
    _csrf: getCookie('_csrf')
  });
  return {
    type: FETCH_GPLACES,
    payload: request
  };
};

export const selectJob = (job) => {
  return {
    type: JOB_SELECTED,
    payload: job
  };
};

export const jobInputTerm = (jobTerm) => {
  return {
    type: 'JOB_INPUT_TERM',
    payload: { jobTerm }
  };
};

export const locationInputTerm = (locationTerm) => {
  return {
    type: 'LOCATION_INPUT_TERM',
    payload: { locationTerm }
  };
};

export const toggleModal = () => {
  // console.log(`Google Maps Modal view toggled ON!`);
  return {
    type: 'TOGGLE_MODAL_ON',
    payload: true
  };
};

export const toggleModalOff = () => {
  // console.log(`Google Maps Modal view toggled OFF!`);
  return {
    type: 'TOGGLE_MODAL_OFF',
    payload: false
  };
};
