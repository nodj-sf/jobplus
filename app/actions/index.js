import axios from 'axios';


<<<<<<< d0a4d65a4eb98b577823df9d7afa468cda245b15
const getCookie = (name) => {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return '';
}
=======
export const jobInputTerm = (jobTerm) => {
  return {
    type: 'JOB_INPUT_TERM',
    payload: { jobTerm }
  };
};

export const locationInputTerm = (locationTerm) => {
  return {
    type: 'LOCATION_INPUT_TERM',
    // payload: { locationTerm: locationTerm }
    payload: { locationTerm }
  };
};

export const userSearchInputs = (jobTerm, locationTerm) => {
  // console.log(`
  //   User\'s \`Job\` Search Input: ${jobTerm}
  //   User\'s \`Location\` Search Input: ${locationTerm}`
  // );
  return {
    type: 'SEARCH_INPUTS',
    payload: { jobTerm, locationTerm }
  };
};

export const selectJob = (job) => {
  // console.log(`Job: ${job} ${Object.getOwnPropertyNames(job)}`);
  // console.log(`Formatted Location: ${job.formattedLocation}`);
  return {
    type: 'JOB_SELECTED',
    payload: job
  };
};
>>>>>>> Configured Redux to save users' jobTerm and locationTerm input queries

export const jobInputTerm = (jobTerm) => {
  return {
    type: 'JOB_INPUT_TERM',
    payload: { jobTerm }
  };
};

export const locationInputTerm = (locationTerm) => {
  return {
    type: 'LOCATION_INPUT_TERM',
    // payload: { locationTerm: locationTerm }
    payload: { locationTerm }
  };
};

export const userSearchInputs = (jobTerm, locationTerm) => {
  // console.log(`
  //   User\'s \`Job\` Search Input: ${jobTerm}
  //   User\'s \`Location\` Search Input: ${locationTerm}`
  // );
  return {
    type: 'SEARCH_INPUTS',
    payload: { jobTerm, locationTerm }
  };
};

export const selectJob = (job) => {
  // console.log(`Job: ${job} ${Object.getOwnPropertyNames(job)}`);
  // console.log(`Formatted Location: ${job.formattedLocation}`);
  return {
    type: 'JOB_SELECTED',
    payload: job
  };
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

export const fetchGPlaces = (lat, long) => {
  const request = axios.post('/api/v1/places', {
<<<<<<< d0a4d65a4eb98b577823df9d7afa468cda245b15
    coordinate: {
      lat: lat,
      long: long
    },
    _csrf: getCookie('_csrf')
<<<<<<< 7b53573f80aa4709794ab1d67ad38ca26377d907
=======
    coordinate: { lat, long }
>>>>>>> Configured Redux to save users' jobTerm and locationTerm input queries
=======
    coordinate: { lat, long }
>>>>>>> Configured Redux to save users' jobTerm and locationTerm input queries
  });
  return {
    type: 'FETCH_GPLACES',
    payload: request
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
