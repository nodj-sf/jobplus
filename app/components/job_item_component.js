import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import BaseComponent from './base_component';
import { displayInfoBoxOnListClick } from '../actions/index';


class JobItem extends BaseComponent {
  constructor(props) {
    super(props);
  }

  jobListItemClickHandler() {
    this.props.jobFunc(this.props.job);
  }

  render() {
    return (
      <div>
        <ListItem
          className={this.props.setActive(this.props.job)}
          onClick={() => {
            this.props.jobFunc(this.props.job);
            this.props.displayInfoBoxOnListClick();
            this.props.handleToggle();
          }}
          primaryText={this.props.job.company || 'Unlisted'}
          secondaryText={this.parseAndFormatJobTitle(this.props.job.jobtitle)}
          rightIconButton={<i style={{fontSize: '.7em', color: 'rgba(0, 0, 0, 0.54)'}}>{ this.parseAndFormatDaysSincePosted(this.props.job.formattedRelativeTime) }</i>}
        />
        <Divider />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  displayInfoBoxOnListClick
})(JobItem)
