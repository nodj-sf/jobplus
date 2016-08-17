import React, { Component } from 'react';
import { connect } from 'react-redux';


class TransportationList extends Component {
  renderList(list) {
    var newList = list.slice(0, 3);
    console.log('newList', newList);
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
    var trainsList = this.props.activeTrains;
    var busList = this.props.activeBus;
    return (
      <div id="placesContainer">
       <h4>Train Stop</h4> 
       <ul className='trainList'>{trainsList.length && this.renderList(trainsList)}</ul> 
       <h4>Bus Stop</h4> 
       <ul className='busList'>{busList.length && this.renderList(busList)}</ul>
      </div>
    ); 
  }
}


let mapStateToProps = (state) => ({
  activeTrains: state.activeTrains,
  activeBus: state.activeBus,
});

export default connect(mapStateToProps)(TransportationList);
