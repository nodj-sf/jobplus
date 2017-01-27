'use strict';
import React from 'react';
import RetaurantList from '../../containers/RestaurantListContainer';
import TransportationList from '../../containers/TransportationListContainer';
import AmenitiesList from '../../containers/AmenetiesListContainer';


const TabPanelsData = [
  {
    "name": "Transportation",
    "disp": <TransportationList />
  }, {
    "name": "Amenities",
    "disp": <AmenitiesList />
  }, {
    "name": "Restaurants",
    "disp": <RetaurantList />
  }
];

export default TabPanelsData;
