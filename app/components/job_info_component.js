import React, { Component } from 'react';
import RestaurantList from '../containers/restaurant_list_container';

export default class JobInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1></h1>
        <RestaurantList />
      </div>
    );
  }
}
