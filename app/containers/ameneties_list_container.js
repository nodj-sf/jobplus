import React, { Component } from 'react';
import { connect } from 'react-redux';

class AmenetiesList extends Component {
  renderList(list) {
    var newList = list.slice(0, 3);
    return newList.map((place) => {
      return (
        <div>
          <li className="placesLI" 
              key={place.place_id} >
            <h4>{place.name }</h4>
          </li>
        </div>
      );    
    });
  }

  render() {
    var parksList = this.props.activeParks;
    var gymsList = this.props.activeGyms;
    return (
      <div id="placesContainer">
       <h4>Parks</h4> 
       <ul className='trainList'>{parksList.length && this.renderList(parksList)}</ul> 
       <h4>Gyms & Fitness</h4> 
       <ul className='busList'>{gymsList.length && this.renderList(gymsList)}</ul>
      </div>
    ); 
  }
}

let mapStateToProps = (state) => ({
  activeParks: state.activeParks,
  activeGyms: state.activeGyms
});

export default connect(mapStateToProps)(AmenetiesList);
