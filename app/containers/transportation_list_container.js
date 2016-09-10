import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import BaseComponent from '../components/base_component';
import DisplayList from './display_list_container';
import { toggleBusListDisplay, toggleTrainListDisplay, loading } from '../actions/index';


class TransportationList extends BaseComponent {
  constructor(props) {
    super(props);
    this.toggleBusListDisplay = this.toggleBusListDisplay.bind(this);
    this.toggleTrainListDisplay = this.toggleTrainListDisplay.bind(this);
    this.assignDisplayClass = this.assignDisplayClass.bind(this);
    this.bar = this.bar.bind(this);
    // this.delayOnLoad = this.delayOnLoad.bind(this);
    // this.getData = this.getData.bind(this);
  }


  // renderList(list, job) {    
  //   return list.slice(0, 6).map((transport, index) => {
  //     const [transportLat, transportLng] = [transport.geometry.location.lat, transport.geometry.location.lng],
  //           [jobLat, jobLng] = [job.latitude, job.longitude],
  //           stationDistance = this.getDistanceFromLatLonInKm(jobLat, jobLng, transportLat, transportLng),
  //           GMapsDirectionsURL = `https://www.google.com/maps/dir/${jobLat},${jobLng}/${transportLat},${transportLng}/`,
  //           fallbackImageURL = (transport.types.includes('bus_station') ? 'http://goo.gl/0ZTNZR' : 'http://goo.gl/MvtTS3'),
  //           fallbackImageAlt = (transport.types.includes('bus_station') ? 'Fallback bus placeholder graphic (Green).' : 'Fallback metro placeholder graphic (Blue).');

  //     if (transport.photos) {
  //       var img = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=250&photoreference=${transport.photos[0].photo_reference}&key=AIzaSyC1_oLFky0FuFjjQJfY7DWwAFFupPP4sSw`;
  //     }
      
  //     return (
  //       <li className="restaurantLI one-third" key={transport.place_id} >
  //           <div className="verticallyCenter">
  //             <div className="nameRating">
  //               <a href={ `http://maps.google.com/?q=${transportLat},${transportLng}` } target="_blank" >
  //                 <h5 className="textEllipsis expandFromCenter">{ this.parseAndFormatJobTitle(transport.name) }</h5>
  //                 { 
  //                   (transport.photos) ? 
  //                     <div className="yelpPhoto textEllipsis">
  //                       <img src={ img } alt={ transport.name } />
  //                     </div> : 
  //                     // No Image 
  //                     <div className="yelpPhoto textEllipsis">
  //                       <img src={ fallbackImageURL } className="fallbackImage" alt={ fallbackImageAlt } />
  //                     </div>
  //                 }
  //               </a>
  //             </div>
  //             <div className="yelpDescription card-body">
  //               <div className="YelpRating_Div">
  //                 { 
  //                   transport.rating ? 
  //                     this.getStarRating(+transport.rating) :
  //                     <div className="starsRating">
  //                       {[
  //                         <i className="fa fa-heart cardDescriptionGlyph" key={ `UserLoveRating_${transport.rating}` }></i>,
  //                         '\tNo Reviews'
  //                       ]}
  //                     </div>
  //                 }
  //               </div>

  //               <div>
  //                 <div className="amenityDistanceInMiles">
  //                   {[
  //                     <i className="fa fa-map cardDescriptionGlyph" key={ `Distance_${stationDistance}` }></i>,
  //                     `\t`,
  //                     <a href={ GMapsDirectionsURL } className="YelpPhoneNo expandFromCenter" target="_blank" key={ `GMapURL_${GMapsDirectionsURL}` }>
  //                       <em key={ `StationDist_${transport.id}` } style={{ color: this.distanceColor(stationDistance) }}>{ `${stationDistance} mi` }</em>
  //                     </a>
  //                   ]}
  //                 </div>
  //                 { this.getDistanceBlocks(stationDistance) }
  //               </div>

  //               <p style={{ fontSize: "1.25rem", clear: "both" }}>
  //                 {[
  //                   <i className="fa fa-tags cardDescriptionGlyph" key={ `AmenityTags_${index}` }></i>,
  //                   `\t${this.getItemTags(transport.types)}`
  //                 ]}
  //               </p>
  //             </div>
  //           </div>
  //       </li>
  //     );    
  //   });
  // }


  //
  // componentWillReceiveProps(nextProps) {
  //   console.log('componentWillReceiveProps');
  //   if (nextProps.toggleContainerDisplay !== this.props.toggleContainerDisplay) {
  //     this.setState({ toggleTrainListDisplay: nextProps.toggleContainerDisplay.toggleTrainListDisplay });
  //   }
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return nextProps.toggleContainerDisplay !== this.props.toggleContainerDisplay;
  // }

  // componentWillUpdate() {
  //   console.log('componentWillUpdate');
  //   return this.toggleBusListDisplay();
  // }

  // componentDidUpdate() {
  //   console.log('componentDidUpdate');
  // }

  // delayOnLoad(list) {
  //   this.props.loading(true);
  //   _.debounce(this.getData, 200)(list);
  // }

  // getData(list) {
  //   this.props.loading(false);
  // }

  toggleBusListDisplay() {
    console.log('BUS_DISP:', this.props.toggleContainerDisplay.busListDisplayState);
    return this.props.toggleContainerDisplay.busListDisplayState;
  }

  toggleTrainListDisplay() {
    console.log('FUNC:');
    this.props.toggleTrainListDisplay(this.bar());
  }

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
        list: this.props.activeTrains,
        listType: 'Train',
        listCategory: 'Transit',
        listImage: {
          headerGlyph: {
            sourceURL: 'http://goo.gl/XzVRW7',
            altDescription: 'Subway/metro transport glyph icon (Blue).'
          },
          fallbackGraphic: {
            sourceURL: 'http://goo.gl/MvtTS3',
            altDescription: 'Fallback subway/metro transport placeholder graphic (Blue).'
          }
        },
        headerStyle: {
          backgroundColor: 'hsla(222, 100%, 63%, 0.79)'
        },
        toggleListDisplay: this.props.toggleTrainListDisplay
      }, {
        list: this.props.activeBus,
        listType: 'Bus',
        listCategory: 'Transit',
        listImage: {
          headerGlyph: {
            sourceURL: 'http://goo.gl/wa4ylN',
            altDescription: 'Bus transport glyph icon (Green).'
          },
          fallbackGraphic: {
            sourceURL: 'http://goo.gl/0ZTNZR',
            altDescription: 'Fallback bus transport placeholder graphic (Green).'
          }
        },
        headerStyle: {
          backgroundColor: 'hsla(138, 37%, 47%, 0.82)'
        },
        toggleListDisplay: this.props.toggleBusListDisplay
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
    );
  }
};

let mapStateToProps = (state) => ({
  activeJob: state.activeJob, 
  activeTrains: state.activeTrains,
  activeBus: state.activeBus,
  loading: state.loading,
  toggleContainerDisplay: state.toggleContainerDisplay
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleBusListDisplay,
  toggleTrainListDisplay
  // loading
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransportationList);
                

// <img className="YelpRatingStars" src={ restaurant.rating_img_url } alt="Yelp restaurant photo." /> 
// <p className="numRestaurantReviews">{ place.rating }</p>

// <div>
//   <div className="restaurantContainer">
//     <div style={{ backgroundColor: "hsla(222, 100%, 63%, 0.79)" }}>
//       <i className="collapseGlyph fa fa-reorder" onClick={ () => this.toggleTrainListDisplay() }></i>
//       <img src="http://goo.gl/XzVRW7" className="AmenitiesHeader_Img" alt="Transportation subway/metro glyph icon (Blue)." />
//       <h5>Train Stations</h5>
//     </div>
//     <div className="overlay">
//       {
//         trainList.length 
//           // ? <ul className="trainList container" style={{ display: this.state.trainListDisplayState }}>
//           ? <ul className="trainList container" style={{ display: this.props.toggleContainerDisplay.trainListDisplayState }}>
//               { this.renderList(trainList, job) }
//             </ul>
//           : <p className="noResultsMsg">{ `No results for train stations in this area` }</p>
//       }
//     </div>
//   </div>
//   <div className="restaurantContainer">
//     <div style={{ backgroundColor: "hsla(138, 37%, 47%, 0.82)" }}>
      
//       <i className="collapseGlyph fa fa-reorder" onClick={ () => this.props.toggleBusListDisplay() }></i>
//       <img src="http://goo.gl/wa4ylN" className="AmenitiesHeader_Img" alt="Transportation bus glyph icon (Red)." />
//       <h5>Bus Stations</h5>
//     </div>
//     <div className="overlay overlayBottomMargin">
//       {
//         busList.length 
//           // ? <ul className="busList container" style={{ display: this.state.busListDisplayState }}>
//           // ? <ul className="busList container" style={{ display: this.props.toggleContainerDisplay.busListDisplayState }}>
//           ? <ul className="busList container" style={{ display: this.toggleBusListDisplay() }}>
//               { this.renderList(busList, job) }
//             </ul>
//           : <p className="noResultsMsg">{ `No results for bus stations in this area` }</p>
//       }
//     </div>
//   </div>
// </div>
