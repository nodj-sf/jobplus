import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseComponent from '../components/base_component';
import { toggleGooglePlacesListContainer } from '../actions/index';


class DisplayList extends BaseComponent {
  constructor(props) {
    super(props);
    this.toggleListContainer = this.toggleListContainer.bind(this);
  }

  // Class method calls Redux action on list of type specified by passed-down `listType` prop:
  toggleListContainer() {
    return this.props.toggleGooglePlacesListContainer(this.props.listType);
  }

  renderList(list, job) {    
    return list.slice(0, 6).map((listItem, index) => {
      const [listItem_Latitude, listItem_Longitude] = [listItem.geometry.location.lat, listItem.geometry.location.lng],
            [jobLat, jobLng] = [job.latitude, job.longitude],
            stationDistance = this.getDistanceFromLatLonInKm(jobLat, jobLng, listItem_Latitude, listItem_Longitude),
            GMapsDirectionsURL = `https://www.google.com/maps/dir/${jobLat},${jobLng}/${listItem_Latitude},${listItem_Longitude}/`,
            [fallbackImageURL, fallbackImageAlt] = [
              this.props.item.listImage.fallbackGraphic.sourceURL, 
              this.props.item.listImage.fallbackGraphic.altDescription
            ];

      let itemImage;
      if (listItem.photos) {
        itemImage = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=250&photoreference=${listItem.photos[0].photo_reference}&key=AIzaSyC1_oLFky0FuFjjQJfY7DWwAFFupPP4sSw`;
      }
      
      return (
        <li className='restaurantLI one-third' key={listItem.place_id}>
          <div className='nameRating'>
            <a 
              href={ `http://maps.google.com/?q=${listItem_Latitude},${listItem_Longitude}` }
              target='_blank' >
              
              <h5 className='textEllipsis expandFromCenter'>
                { this.parseAndFormatJobTitle(listItem.name) }
              </h5>
              { 
                (listItem.photos) ? 
                  <div className='yelpPhoto textEllipsis'>
                    <img src={ img } alt={ listItem.name } />
                  </div> : 
                  // No Image 
                  <div className='yelpPhoto textEllipsis'>
                    <img 
                      src={ fallbackImageURL }
                      className='fallbackImage'
                      alt={ fallbackImageAlt } />
                  </div>
              }
            </a>
          </div>
          <div className='yelpDescription card-body'>
            <div className='YelpRating_Div'>
              { 
                listItem.rating 
                  ? this.getStarRating(+listItem.rating)
                  : <div className='starsRating'>
                      {[
                        <i 
                          className='fa fa-heart cardDescriptionGlyph' 
                          key={ `UserReviewRating_${listItem.rating}` }>
                        </i>,
                        '\tNo Reviews'
                      ]}
                    </div>
              }
            </div>

            <div>
              <div className='amenityDistanceInMiles'>
                {[
                  <i 
                    className='fa fa-map cardDescriptionGlyph'
                    key={ `Distance_${stationDistance}` }>
                  </i>,
                  `\t`,
                  <a 
                    href={ GMapsDirectionsURL } 
                    className='YelpPhoneNo expandFromCenter' 
                    target='_blank' 
                    key={ `GMapURL_${GMapsDirectionsURL}` }>

                    <em 
                      key={ `StationDist_${listItem.id}` } 
                      style={{ color: this.distanceColor(stationDistance) }}>
                      { `${stationDistance} mi` }
                    </em>
                  </a>
                ]}
              </div>
              { this.getDistanceBlocks(stationDistance) }
            </div>

            <p style={{ fontSize: '1.25rem', clear: 'both' }}>
              {[
                <i 
                  className='fa fa-tags cardDescriptionGlyph'
                  key={ `AmenityTags_${index}` }>
                </i>,
                `\t${this.getItemTags(listItem.types)}`
              ]}
            </p>
          </div>
        </li>
      );    
    });
  }

  render() {
    return (
      <div className='restaurantContainer'>
        <div style={{ backgroundColor: '#14A4B5' }}>
          <i 
            className='collapseGlyph fa fa-reorder' 
            onClick={ () => this.toggleListContainer() }>
          </i>
          <img 
            src={ this.props.item.listImage.headerGlyph.sourceURL } 
            className='AmenitiesHeader_Img' 
            alt={ this.props.item.listImage.headerGlyph.altDescription } />
          <h5>
            {
              this.props.item.listCategory === 'Transit'
                ? `${this.props.item.listType} Stations`
                : `${this.props.item.listType}s`
            }
          </h5>
        </div>
        <div className='listItemsContainer'>
          {
            this.props.list.length 
              ? <ul className={ this.props.toggleContainerDisplay[`list_container_${this.props.listType}`]
                                  ? 'GPlacesList container inactive' 
                                  : 'GPlacesList container'
                              }>
                  { this.renderList(this.props.list, this.props.job) }
                </ul>
              // : <p className='noResultsMsg'>
              : <p className={ this.props.toggleContainerDisplay[`list_container_${this.props.listType}`]
                                  ? 'noResultsMsg inactive' 
                                  : 'noResultsMsg'
                             }>
                  { `No results to show for ${this.props.listType} stations in this area.` }
                </p>
          }
        </div>
      </div>
    );
  }
  //       <div className="overlay overlayBottomMargin">
  //         <ul className='busList container'>{gymsList.length && this.renderList(gymsList, job) 
  //           || 'There are no results for this area' }
  //         </ul>
  //       </div>


};

let mapStateToProps = (state) => ({
  toggleContainerDisplay: state.toggleContainerDisplay
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleGooglePlacesListContainer
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(DisplayList);
