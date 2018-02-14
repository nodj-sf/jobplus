import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import StarRatings from 'react-star-ratings';

import { selectItem, toggleDrawer } from '../actions/index';
import styles from './app.css';

class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.renderListItems = this.renderListItems.bind(this);
  }

  renderListItems(item, type) {
    return item.map((item, index) => {
      var primaryText = null;
      var secondaryText = null;
      var rightAvatar = null;
      var listPhoto;
      const listItemStyle = this.props.selectedItem.index === index && this.props.selectedItem.type === type ? {backgroundColor: 'rgba(0, 0, 0, 0.1)' } : null;
      if (type === 'job') {
        primaryText = item.jobtitle;
        secondaryText = item.company;
      } else if (type === 'restaurant') {
        listPhoto = item.photo ? <img className="img-responsive" style={{width: 50, borderRadius: 5}} src={ item.photo } /> : null;
        primaryText = item.name;
        secondaryText = (
          <div>
            <StarRatings rating={item.rating} starRatedColor="#6C7A89" numberOfStars={5} starDimension="14px" />
          </div>
        );
        rightAvatar = <span style={{fontSize: '.6em', color: 'rgba(0, 0, 0, 0.54)', lineHeight: 2}}>{item.review_count} reviews</span>
      } else if (type === 'park') {
        primaryText = item.name;
        secondaryText = (
          <div>
            <StarRatings rating={item.rating} starRatedColor="#6C7A89" numberOfStars={5} starDimension="14px" />
          </div>
        );
      } else if (type === 'gym') {
        primaryText = item.name;
        secondaryText = (
          <div>
            <StarRatings rating={item.rating} starRatedColor="#6C7A89" numberOfStars={5} starDimension="14px" />
          </div>
        );
      } else if (type === 'train') {
        primaryText = item.name;
        secondaryText = (
          <div>
            <StarRatings rating={item.rating} starRatedColor="#6C7A89" numberOfStars={5} starDimension="14px" />
          </div>
        );
      } else if (type === 'bus') {
        primaryText = item.name;
        secondaryText = (
          <div>
            <StarRatings rating={item.rating} starRatedColor="#6C7A89" numberOfStars={5} starDimension="14px" />
          </div>
        );
      }

      return (
          <ListItem
            className="col-xs-12"
            primaryText={primaryText}
            secondaryText={secondaryText}
            leftAvatar={listPhoto}
            secondaryTextLines={1}
            key={index}
            onClick={this.selectItem.bind(this, index, type)}
            style={listItemStyle}
            rightAvatar={rightAvatar}
          />
      );
    })
  }

  selectItem(index, type, event) {
    event.stopPropagation();
    this.props.selectItem(index, type);
    if (this.props.displayDrawer) {
      this.props.toggleDrawer();
    }
  }

  render() {
    const lengthOfList = this.props.listData.length;
    const listType =  this.props.dataType !== 'bus' ? this.props.dataType[0].toUpperCase() + this.props.dataType.slice(1) + `s(${lengthOfList})` : this.props.dataType[0].toUpperCase() + this.props.dataType.slice(1) + `(${lengthOfList})`;
    return (
      <List className="desktop-list-style" style={{overflow: 'scroll', padding: 0}}>
        <div className="col-xs-12" style={{padding: 0, position: 'absolute', zIndex: 5, backgroundColor:'#FFFFFF'}}>
          <Subheader>{listType}</Subheader>
          <Divider fullWidth={true} />
        </div>
        <div className="col-xs-12" style={{padding: 0, marginTop: 48}}>
          { this.renderListItems(this.props.listData, this.props.dataType) }
        </div>
      </List> : null
    );
  }
};

const mapStateToProps = (state) => {
  const { selectedItem, displayDrawer } = state.globalReducer;
  return {
    selectedItem,
    displayDrawer
  };
};

export default connect(mapStateToProps, {
  selectItem,
  toggleDrawer
})(ListComponent);
