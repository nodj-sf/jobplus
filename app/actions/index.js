import axios from 'axios';


const getCookie = (name) => {
  const value = `;${document.cookie}`,
        parts = value.split('; ' + name + '=');
  return parts.length === 2 ? decodeURIComponent(parts.pop().split(';').shift()) : '';
};

export const fetchJobs = (jobSearch, city) => {
  const request = axios.post('/api/v1/jobs', {
    jobTitle: jobSearch,
    city: city,
    _csrf: getCookie('_csrf')
  });
  return {
    type: 'FETCH_JOBS',
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
    type: 'FETCH_YELP',
    payload: request
  };
};

export const fetchTrains = (lat, long) => {
  const request = axios.post('/api/v1/places', {
    coordinate: {
      lat: lat,
      long: long
    },
    _csrf: getCookie('_csrf'),
    type: 'subway_station|train_station' 
  });
  return {
    type: 'FETCH_TRAINS',
    payload: request
  };
};

export const fetchBus = (lat, long) => {
  const request = axios.post('/api/v1/places', {
    coordinate: {
      lat: lat,
      long: long
    },
    _csrf: getCookie('_csrf'),
    type: 'bus_station',
  });
  return {
    type: 'FETCH_BUS',
    payload: request
  };
};

export const fetchParks = (lat, long) => {
  const request = axios.post('/api/v1/places', {
    coordinate: {
      lat: lat,
      long: long
    },
    _csrf: getCookie('_csrf'),
    type: 'park' 

  });
  return {
    type: 'FETCH_PARKS',
    payload: request
  };
};

export const fetchGyms = (lat, long) => {
  const request = axios.post('/api/v1/places', {
    coordinate: {
      lat: lat,
      long: long
    },
    _csrf: getCookie('_csrf'),
    type: 'gym' 
  });
  return {
    type: 'FETCH_GYMS',
    payload: request
  };
};

export const scrapeDetail = (url) => {
  const request = axios.post('/api/v1/scrape', {
    url: url,
    _csrf: getCookie('_csrf')
  });
  return {
    type: 'SCRAPE_DATA',
    payload: request
  }
};

export const selectJob = (job) => ({
  type: 'JOB_SELECTED',
  payload: job
});

export const jobInputTerm = (jobTerm) => ({
  type: 'JOB_INPUT_TERM',
  payload: { jobTerm }
});

export const lastJobSearch = (lastJob) => ({
  type: 'LAST_JOB',
  payload: lastJob
});

export const locationInputTerm = (locationTerm) => ({
  type: 'LOCATION_INPUT_TERM',
  payload: { locationTerm }
});

export const lastLocationSearch = (lastLocation) => ({
  type: 'LAST_LOCATION',
  payload: lastLocation
});

export const toggleModal = () => ({
  type: 'TOGGLE_MODAL'
});

export const toggleYelpModal = (yelpId) => ({
  type: `TOGGLE_YELP_MODAL_${yelpId}`
});

// Loading animation display state:
export const loading = (bool) => ({
  type: 'LOADING',
  payload: bool
});

//
export const toggleBusListDisplay = () => ({
  type: 'TOGGLE_BUS_LIST_DISPLAY'
});

export const toggleTrainListDisplay = (func) => ({
  type: 'TOGGLE_TRAIN_LIST_DISPLAY',
  payload: func
});

export const toggleParkListDisplay = () => ({
  type: 'TOGGLE_PARK_LIST_DISPLAY'
});

export const toggleGymListDisplay = () => ({
  type: 'TOGGLE_GYM_LIST_DISPLAY'
});
