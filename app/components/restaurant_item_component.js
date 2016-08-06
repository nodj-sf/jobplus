import React, { Component } from 'react';

class RestaurantListItem extends Component {

  render() {
    return (
      <li className="jobLI" onClick={() => selectJob(this.props.job)}>
        <h2>{this.state.job.jobtitle}</h2> 
      </li>
    );
  }
}

export default RestaurantListItem;

/*
{
  name: 'pseudoRestaurant',
  url: 'www.pesudo.com',
  rating: 5,
  review_count: 999,
  phone: 123-456-7891,
  coordinate: null
}
*/