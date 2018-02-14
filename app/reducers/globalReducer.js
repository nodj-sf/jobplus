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

const initialState = {
  title: undefined,
  city: undefined,
  initialLongitude: undefined,
  initialLatitude: undefined,
  jobs: [],
  restaurants: [],
  trains: [],
  bus: [],
  gyms: [],
  parks: [],
  selectedItem: {},
  displayPrompt: true,
  displayDrawer: false,
  displayListButton: false,
  displayKeys: false,
  displayDialog: false,
  direction_origin: {},
  direction_destination: {}
};

export default (state = initialState, action = {}) => {
  switch(action.type){
    case SET_JOB_DATA:
      const { jobs } = action;
      return {
        ...state,
        jobs
      };
    case SET_QUERIES:
      const { title, city } = action;
      return {
        ...state,
        title,
        city
      };
    case SET_INIT_LONG_LAT:
      const { initialLongitude, initialLatitude } = action;
      return {
        ...state,
        initialLongitude: initialLongitude,
        initialLatitude: initialLatitude
      };
    case SET_RESTAURANTS:
      const { restaurants } = action;
      return {
        ...state,
        restaurants
      };
    case SET_TRAINS:
      const { trains } = action;
      return {
        ...state,
        trains
      };
    case SET_GYMS:
      const { gyms } = action;
      return {
        ...state,
        gyms
      };
    case SET_PARKS:
      const { parks } = action;
      return {
        ...state,
        parks
      };
    case SET_BUS:
      const { bus } = action;
      return {
        ...state,
        bus
      };
    case SELECT_LIST_ITEM:
      const { selectedItem } = action;
      return {
        ...state,
        selectedItem
      };
    case HIDE_PROMPT:
      return {
        ...state,
        displayPrompt: false
      };
    case TOGGLE_DRAWER:
      return {
        ...state,
        displayDrawer: !state.displayDrawer
      };
    case SHOW_FLOATING_LIST_BUTTON:
      return {
        ...state,
        displayListButton: true
      };
    case SET_ORIGIN:
      return {
        ...state,
        direction_origin: action.points
      };
    case SET_DESTINATION:
      return {
        ...state,
        direction_destination: action.points
      };
    case UN_SET_ORIGIN:
      return {
        ...state,
        direction_origin: {}
      };
    case UN_SET_DESTINATION:
      return {
        ...state,
        direction_destination: {}
      };
    case TOGGLE_KEYS:
      return {
        ...state,
        displayKeys: true
      };
    case TOGGLE_DIALOG:
      return {
        ...state,
        displayDialog: !state.displayDialog
      };
    default:
      return state;
  }
};
