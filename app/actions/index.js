'use strict';
import Axios from 'axios';

export const FETCH_COMPANY_DATA = 'FETCH_COMPANY_DATA';
export const FETCH_JOBS = 'FETCH_JOBS';
export const FETCH_YELP = 'FETCH_YELP';
export const FETCH_TRAINS = 'FETCH_TRAINS';
export const FETCH_BUS = 'FETCH_BUS';
export const FETCH_PARKS = 'FETCH_PARKS';
export const FETCH_GYMS = 'FETCH_GYMS';
export const SCRAPE_DATA = 'SCRAPE_DATA';
export const JOB_SELECTED = 'JOB_SELECTED';
export const JOB_INPUT_TERM = 'JOB_INPUT_TERM';
export const LOCATION_INPUT_TERM = 'LOCATION_INPUT_TERM';
export const LAST_JOB = 'LAST_JOB';
export const LAST_LOCATION = 'LAST_LOCATION';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const TOGGLE_YELP_MODAL_ = 'TOGGLE_YELP_MODAL_';
export const TOGGLE_DISPLAY_LIST_ = 'TOGGLE_DISPLAY_LIST_';
export const LOADING = 'LOADING';


// Utility function for generating Express session token:
export const getCookie = (name) => {
  const cookieVal = `; ${document.cookie}`,
        cookieParts = cookieVal.split(`; ${name}=`);
  return (cookieParts.length === 2 ? decodeURIComponent(cookieParts.pop().split(';').shift()) : '');
};

// export const getCookie = (name) => {
//   const value = '; ' + document.cookie;
//   const parts = value.split('; ' + name + '=');
//   if (parts.length === 2) {
//     return decodeURIComponent(parts.pop().split(';').shift());
//   }
//   return '';
// };

// Cues retrieval of selected (i.e., active) company data via call to Clearbit API:
export const fetchCompanyData = (companyName) => {
  const request = Axios
    .get('https://autocomplete.clearbit.com/v1/companies/suggest', {
      params: { query: companyName }
    })
    .then(response => {
      console.log('Axios GET response:', response);
      return response;
    });

  return {
    type: FETCH_COMPANY_DATA,
    payload: request
  };
};

// Cues retrieval of job data via call to /jobs Indeed API endpoint:
export const fetchJobs = (jobSearch, city) => {
  const request = Axios.post('/api/v1/jobs', {
    jobTitle: jobSearch,
    city: city,
    _csrf: getCookie('_csrf')
  });

  return {
    type: FETCH_JOBS,
    payload: request
  };
};

// Cues retrieval of restaurant data via call to /food Yelp API endpoint:
export const fetchYelp = (city, lat, long) => {
  const request = Axios.post('/api/v1/food', {
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

// Cues retrieval of train station data via call to /places Google Places API endpoint:
export const fetchTrains = (lat, long) => {
  const request = Axios.post('/api/v1/places', {
    coordinate: {
      lat: lat,
      long: long
    },
    _csrf: getCookie('_csrf'),
    type: 'subway_station|train_station'
  });

  return {
    type: FETCH_TRAINS,
    payload: request
  };
};

// Cues retrieval of bus station data via call to /places Google Places API endpoint:
export const fetchBus = (lat, long) => {
  const request = Axios.post('/api/v1/places', {
    coordinate: {
      lat: lat,
      long: long
    },
    _csrf: getCookie('_csrf'),
    type: 'bus_station',
  });

  return {
    type: FETCH_BUS,
    payload: request
  };
};

// Cues retrieval of park data via call to /places Google Places API endpoint:
export const fetchParks = (lat, long) => {
  const request = Axios.post('/api/v1/places', {
    coordinate: {
      lat: lat,
      long: long
    },
    _csrf: getCookie('_csrf'),
    type: 'park'
  });

  return {
    type: FETCH_PARKS,
    payload: request
  };
};

// Cues retrieval of gym data via call to /places Google Places API endpoint:
export const fetchGyms = (lat, long) => {
  const request = Axios.post('/api/v1/places', {
    coordinate: { lat, long },
    _csrf: getCookie('_csrf'),
    type: 'gym'
  });

  return {
    type: FETCH_GYMS,
    payload: request
  };
};

// Cues call to /scrape endpoint for call to/retrieval of Google Places API gym data:
// Cues cheerio-based web scraper upon active (i.e., selected) job:
export const scrapeDetail = (url) => {
  const request = Axios.post('/api/v1/scrape', {
    url,
    _csrf: getCookie('_csrf')
  });

  return {
    type: SCRAPE_DATA,
    payload: request
  }
};

// Action stores job object (given via the Indeed API) as currently selected (i.e., active):
export const selectJob = (job) => ({
  type: JOB_SELECTED,
  payload: job
  // payload: Object.assign({}, job, { companyData: fetchCompanyData(job.company) })
});

//
export const jobInputTerm = (jobTerm) => ({
  type: JOB_INPUT_TERM,
  payload: { jobTerm }
});

//
export const locationInputTerm = (locationTerm) => ({
  type: LOCATION_INPUT_TERM,
  payload: { locationTerm }
});

// Action registers for job input on user submission of new search query:
export const lastJobSearch = (lastJob) => ({
  type: LAST_JOB,
  payload: lastJob
});

// Action registers for location input on user submission of new search query:
export const lastLocationSearch = (lastLocation) => ({
  type: LAST_LOCATION,
  payload: lastLocation
});

// Action used to handle display toggle of Google Maps Modal box:
export const toggleModal = () => ({
  type: TOGGLE_MODAL
});

// Action used to handle display toggle of Yelp Modal boxes:
export const toggleYelpModal = (yelpID) => ({
  type: `${TOGGLE_YELP_MODAL_}${yelpID}`
});

// Action to handle display toggle of Google Places list containers:
export const toggleGooglePlacesListContainer = (listName) => ({
  type: `${TOGGLE_DISPLAY_LIST_}${listName}`
});

// Controls the display state of the loading animation:
export const loading = (bool) => ({
  type: LOADING,
  payload: bool
});


// const getCookie = (name) => {
//   const value = '; ' + document.cookie;
//   const parts = value.split('; ' + name + '=');
//   if (parts.length === 2) {
//     return decodeURIComponent(parts.pop().split(';').shift());
//   }
//   return '';
// };

// export const fetchJobs = (jobSearch, city) => {
//   const request = axios.post('/api/v1/jobs', {
//     jobTitle: jobSearch,
//     city: city,
//     _csrf: getCookie('_csrf')
//   });
//   return {
//     type: FETCH_JOBS,
//     payload: request
//   };
// };

// export const fetchYelp = (city, lat, long) => {
//   const request = axios.post('/api/v1/food', {
//     city: city,
//     coordinate: {
//       latitude: lat,
//       longitude: long
//     },
//     _csrf: getCookie('_csrf')
//   });
//   return {
//     type: FETCH_YELP,
//     payload: request
//   };
// };

// export const fetchTrains = (lat, long) => {
//   const request = axios.post('/api/v1/places', {
//     coordinate: {
//       lat: lat,
//       long: long
//     },
//     _csrf: getCookie('_csrf'),
//     type: 'subway_station|train_station'
//   });
//   return {
//     type: FETCH_TRAINS,
//     payload: request
//   };
// };

// export const fetchBus = (lat, long) => {
//   const request = axios.post('/api/v1/places', {
//     coordinate: {
//       lat: lat,
//       long: long
//     },
//     _csrf: getCookie('_csrf'),
//     type: 'bus_station',
//   });
//   return {
//     type: FETCH_BUS,
//     payload: request
//   };
// };

// export const fetchParks = (lat, long) => {
//   const request = axios.post('/api/v1/places', {
//     coordinate: {
//       lat: lat,
//       long: long
//     },
//     _csrf: getCookie('_csrf'),
//     type: 'park'

//   });
//   return {
//     type: FETCH_PARKS,
//     payload: request
//   };
// };

// export const fetchGyms = (lat, long) => {
//   const request = axios.post('/api/v1/places', {
//     coordinate: {
//       lat: lat,
//       long: long
//     },
//     _csrf: getCookie('_csrf'),
//     type: 'gym'
//   });
//   return {
//     type: FETCH_GYMS,
//     payload: request
//   };
// };

// export const selectJob = (job) => {
//   return {
//     type: JOB_SELECTED,
//     payload: job
//   };
// };

// export const jobInputTerm = (jobTerm) => {
//   return {
//     type: 'JOB_INPUT_TERM',
//     payload: { jobTerm }
//   };
// };

// export const locationInputTerm = (locationTerm) => {
//   return {
//     type: 'LOCATION_INPUT_TERM',
//     payload: { locationTerm }
//   };
// };

// export const toggleModal = () => {
//   // console.log(`Google Maps Modal view toggled ON!`);
//   return {
//     type: 'TOGGLE_MODAL_ON',
//     payload: true
//   };
// };

// export const toggleModalOff = () => {
//   // console.log(`Google Maps Modal view toggled OFF!`);
//   return {
//     type: 'TOGGLE_MODAL_OFF',
//     payload: false
//   };
// };

// export const scrapDetail = (url) => {
//   const request = axios.post('/api/v1/scrap', {
//     url: url,
//     _csrf: getCookie('_csrf')
//   });

//   return {
//     type: SCRAP_DATA,
//     payload: request
//   }
// }
