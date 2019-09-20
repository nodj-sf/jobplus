import axios from 'axios';
import {
  FETCH_JOBS,
  JOB_SELECTED,
  FETCH_YELP,
  FETCH_TRAINS,
  FETCH_BUS,
  FETCH_PARKS,
  FETCH_GYMS,
  SCRAP_DATA,
  SELECT_LIST_ITEM,
  HIDE_PROMPT,
  TOGGLE_DRAWER,
  SHOW_FLOATING_LIST_BUTTON,
  SET_JOB_DATA,
  SET_QUERIES,
  SET_INIT_LONG_LAT,
  SET_RESTAURANTS,
  SET_TRAINS,
  SET_GYMS,
  SET_PARKS,
  SET_BUS,
  SET_ORIGIN,
  SET_DESTINATION,
  UN_SET_ORIGIN,
  UN_SET_DESTINATION,
  TOGGLE_KEYS,
  TOGGLE_DIALOG
} from '../types';


const getCookie = (name) => {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return '';
};

export const scrapDetail = (url) => {
  const request = axios.post('/api/v1/scrap', {
    url: url,
    _csrf: getCookie('_csrf')
  });

  return {
    type: SCRAP_DATA,
    payload: request
  }
}

export const fetchJobs = (jobSearch, city) => {
  return dispatch => {
    return axios.post('/api/v1/jobs', {
      jobTitle: jobSearch,
      city: city,
      _csrf: getCookie('_csrf')
    })
  }
};

export const setJobs = (jobs) => {
  return {
    type: SET_JOB_DATA,
    jobs
  }
};

export const setQueries = (title, city) => {
  return {
    type: SET_QUERIES,
    title,
    city
  };
};

export const setInitialLongLat = (initialLongitude, initialLatitude) => {
  return {
    type: SET_INIT_LONG_LAT,
    initialLongitude,
    initialLatitude
  };
};

export const fetchRestaurants = (city, lat, long) => {
  return dispatch => {
    return axios.post('/api/v1/food', {
      city: city,
      coordinate: {
        latitude: lat,
        longitude: long
      },
      _csrf: getCookie('_csrf')
    })
  }
};

export const setRestaurants = (restaurants) => {
  return {
    type: SET_RESTAURANTS,
    restaurants
  };
};

export const fetchTrains = (lat, long) => {
  return dispatch => {
    return axios.post('/api/v1/places', {
      coordinate: {
        lat: lat,
        long: long
      },
      _csrf: getCookie('_csrf'),
      type: 'subway_station|train_station'
    });
  }
};

export const setTrains = (trains) => {
  return {
    type: SET_TRAINS,
    trains
  };
};

export const fetchGyms = (lat, long) => {
  return dispatch => {
    return axios.post('/api/v1/places', {
      coordinate: {
        lat: lat,
        long: long
      },
      _csrf: getCookie('_csrf'),
      type: 'gym'
    });
  }
};

export const setGyms = (gyms) => {
  return {
    type: SET_GYMS,
    gyms
  };
}

export const fetchParks = (lat, long) => {
  return dispatch => {
    return axios.post('/api/v1/places', {
      coordinate: {
        lat: lat,
        long: long
      },
      _csrf: getCookie('_csrf'),
      type: 'park'
    });
  }
};

export const setParks = (parks) => {
  return {
    type: SET_PARKS,
    parks
  };
}

export const fetchBus = (lat, long) => {
  return dispatch => {
    return axios.post('/api/v1/places', {
      coordinate: {
        lat: lat,
        long: long
      },
      _csrf: getCookie('_csrf'),
      type: 'bus_station',
    });
  }
};

export const setBus = (bus) => {
  return {
    type: SET_BUS,
    bus
  };
};

export const selectItem = (index, type) => {
  const selectedItem = {
    index,
    type
  };
  return {
    type: SELECT_LIST_ITEM,
    selectedItem
  };
};

export const hidePrompt = () => {
  return {
    type: HIDE_PROMPT
  };
};

export const toggleDrawer = () => {
  return {
    type: TOGGLE_DRAWER
  };
};

export const showFloatingListButton = () => {
  return {
    type: SHOW_FLOATING_LIST_BUTTON
  };
};

export const setOrigin = (latitude, longitude) => {
  return {
    type: SET_ORIGIN,
    points: { latitude, longitude }
  };
};

export const setDestination = (latitude, longitude) => {
  return {
    type: SET_DESTINATION,
    points: { latitude, longitude }
  };
};

export const unSetOrigin = () => {
  return {
    type: UN_SET_ORIGIN
  };
};

export const unSetDestination = () => {
  return {
    type: UN_SET_DESTINATION
  };
};

export const toggleKeys = () => {
  return {
    type: TOGGLE_KEYS
  };
};

export const toggleDialog = () => {
  return {
    type: TOGGLE_DIALOG
  };
};
