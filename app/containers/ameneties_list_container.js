import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseComponent from '../components/base_component';
import DisplayList from './display_list_container';
import { toggleParkListDisplay, toggleGymListDisplay } from '../actions/index';


class AmenitiesList extends BaseComponent {
  constructor(props) {
    super(props);

    // this.toggleBusListDisplay = this.toggleBusListDisplay.bind(this);
    // this.toggleTrainListDisplay = this.toggleTrainListDisplay.bind(this);
    this.assignDisplayClass = this.assignDisplayClass.bind(this);
    this.bar = this.bar.bind(this);
  }
  /*
  renderList(list, job) {
    let newList = list.slice(0, 3);

    return newList.map((place, index) => {
      const [placeLat, placeLng] = [place.geometry.location.lat, place.geometry.location.lng],
            [jobLat, jobLng] = [job.latitude, job.longitude],
            amenityDistance = this.getDistanceFromLatLonInKm(jobLat, jobLng, placeLat, placeLng),
            GMapsDirectionsURL = `https://www.google.com/maps/dir/${jobLat},${jobLng}/${placeLat},${placeLng}/`,
            fallbackImageURL = (place.types.includes('gym') ? 'http://goo.gl/OYfm0X' : 'http://goo.gl/Uu31GG'),
            fallbackImageAlt = (place.types.includes('gym') ? 'Fallback gym placeholder graphic (Black).' : 'Fallback park placeholder graphic (Gray).');

      if (place.photos) {
        var img = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${place.photos[0].photo_reference}&key=AIzaSyC1_oLFky0FuFjjQJfY7DWwAFFupPP4sSw`;
      }
      
      return (
        <li className="restaurantLI one-third" key={index} >
          <div className="verticallyCenter">
            <div className="nameRating">
              <a 
                href={ `http://maps.google.com/?q=${place.geometry.location.lat},${place.geometry.location.lng}` } 
                className="textEllipsis" 
                target="_blank" >
                <h5 className="textEllipsis expandFromCenter">{ this.parseAndFormatJobTitle(place.name) }</h5>
                { 
                  (place.photos) ? 
                    <div className="yelpPhoto textEllipsis">
                      <img src={ img } alt={ place.name } />
                    </div> : 
                    // No Image
                    <div className="yelpPhoto textEllipsis">
                      <img src={ fallbackImageURL } className="fallbackImage" alt={ fallbackImageAlt } />
                    </div>
                }
              </a>
            </div>
            <div className="yelpDescription card-body">
              <div className="YelpRating_Div">
                { 
                  place.rating ? 
                    this.getStarRating(+place.rating) :
                    'No Reviews'
                }
              </div>

              <div>
                <div className="amenityDistanceInMiles">
                  {[
                    <i className="fa fa-map" key={ `Distance_${amenityDistance}` }></i>,
                    `\t`,
                    <a href={ GMapsDirectionsURL } className="YelpPhoneNo expandFromCenter" target="_blank" key={ `GMapURL_${GMapsDirectionsURL}` }>
                      <em key={ `AmenityDist_${place.id}` } style={{ color: this.distanceColor(amenityDistance) }}>{ `${amenityDistance} mi` }</em>
                    </a>
                  ]}
                </div>
                { this.getDistanceBlocks(amenityDistance) }
              </div>

              <p style={{ fontSize: "1.25rem", clear: "both" }}>
                {[
                  <i className="fa fa-tags" key={ `AmenityTags_${index}` }></i>,
                  `\t${this.getItemTags(place.types)}`
                ]}
              </p>
            </div>
          </div>
        </li>
      );    
    });
  } */

  assignDisplayClass(obj) {
    return obj === 'flex' ? 'GPlacesList container' : 'GPlacesList container inactive';
  }

  bar(listType) {
    // const displayStateToggle = (displayState) => displayState === 'flex' ? 'none' : 'flex';
    console.log('BAR Called');
    return this.props.toggleContainerDisplay[`${listType.toLowerCase()}ListDisplayState`] === 'flex' ? 'none' : 'flex';
  }

  renderList(listArr) {
    return listArr.map((item, index, listArr) => {
      return (
        <DisplayList
          item={ item }
          list={ item.list }
          listType={ item.listType }
          key={ `DisplayList_${item.listType}` }
          job={ this.props.activeJob }
          displayClass={ this.assignDisplayClass }
          bar={ this.bar }
          toggler={ this.props.toggleContainerDisplay }
          toggleListDisplay={ item.toggleListDisplay } />
      );
    });
  }

  render() {
    const listMap = [
      {
        list: this.props.activeParks,
        listType: 'Park',
        listCategory: 'Amenity',
        listImage: {
          headerGlyph: {
            sourceURL: 'http://goo.gl/GLF2Rk',
            altDescription: 'Park amenity landscape glyph icon (Green).'
          },
          fallbackGraphic: {
            sourceURL: 'http://goo.gl/Uu31GG',
            altDescription: 'Fallback park amenity placeholder graphic (Gray).'
          }
        },
        headerStyle: {
          backgroundColor: 'rgba(90, 153, 126, 0.79)'
        },
        toggleListDisplay: this.props.toggleParkListDisplay
      }, {
        list: this.props.activeGyms,
        listType: 'Gym',
        listCategory: 'Amenity',
        listImage: {
          headerGlyph: {
            sourceURL: 'http://goo.gl/zeyx0P',
            altDescription: 'Gym amenity dumbell glyph icon (Black).'
          },
          fallbackGraphic: {
            sourceURL: 'http://goo.gl/OYfm0X',
            altDescription: 'Fallback gym amenity placeholder graphic (Gray).'
          }
        },
        headerStyle: {
          backgroundColor: 'hsla(0, 0%, 20%, 0.57)'
        },
        toggleListDisplay: this.props.toggleParkListDisplay
      }
    ];


    return (
      (this.props.loading) ?
        <div className='restaurantContainer' style={{ minHeight: '200px' }}>
          {[
            <i className='fa fa-refresh fa-spin fa-5x fa-fw loadingSpinner' key='RefreshLoaderAnimation'></i>,
            `\tLoading...`
          ]}
        </div> :
        <div>{ this.renderList(listMap) }</div>

      // (
      //   <div>
      //     <div className="restaurantContainer">
      //       <div style={{ backgroundColor: "rgba(90, 153, 126, 0.79)" }}>
      //         <img src="http://goo.gl/GLF2Rk" className="AmenitiesHeader_Img" alt="Park amenity landscape glyph icon (Green)." />
      //         <h5>Parks</h5>
      //       </div>
      //       <div className="overlay">
      //         <ul className='trainList container'>{(parksList.length && this.renderList(parksList, job)) 
      //           || 'There are no results for this area'}
      //         </ul> 
      //       </div>
      //     </div>
      //     <div className="restaurantContainer">
      //       <div style={{ backgroundColor: "hsla(0, 0%, 20%, 0.57)" }}>
      //         <img src="http://goo.gl/zeyx0P" className="AmenitiesHeader_Img" alt="Gym amenity dumbell glyph icon (Red)." />
      //         <h5>Gyms</h5>
      //       </div>
      //       <div className="overlay overlayBottomMargin">
      //         <ul className='busList container'>{gymsList.length && this.renderList(gymsList, job) 
      //           || 'There are no results for this area' }
      //         </ul>
      //       </div>
      //     </div>
      //   </div>
      // )
    ); 
  }
}


let mapStateToProps = (state) => ({
  activeJob: state.activeJob,
  activeParks: state.activeParks,
  activeGyms: state.activeGyms,
  loading: state.loading,
  toggleContainerDisplay: state.toggleContainerDisplay
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleParkListDisplay,
  toggleGymListDisplay
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AmenitiesList);



// <i className="fa fa-futbol-o" aria-hidden="true" key="FontAwesome (.fa) soccer ball glyph icon (Black)."></i>

// {[,
//   <img src={DBIc} className="amenityHeaderGlyph" />,
//   "Gyms & Fitness"
// ]}


// <div className="yelpDescription card-body">
//   <p className="numRestaurantReviews">{ place.rating }</p>
//   <i>{ `${this.getDistanceFromLatLonInKm(job.latitude,job.longitude,place.geometry.location.lat, place.geometry.location.lng)} mi` }</i>
// </div>


// var React = require('react');
// var Icon = require('babel!svg-react!../svg/my-icon.svg?name=Icon');

// module.exports = React.createClass({
//     render () {
//         return <Icon className='normal' />;
//     }
// });
