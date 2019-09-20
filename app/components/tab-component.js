import React, { Component } from 'react';
import { connect } from 'react-redux';
import Subheader from 'material-ui/Subheader';
import { Tabs, Tab } from 'material-ui/Tabs';

import ListComponent from './list-component';

class TabComponent extends Component {
  constructor(props) {
    super(props);
    this.renderJobList = this.renderJobList.bind(this);
  }

  renderJobList(jobs) {
    return jobs.map((job) => {
      return renderListItem(job, 'job');
    })
  }

  render() {
    const { jobs, restaurants, trains, gyms, parks, bus } = this.props;
    const renderJobList = jobs.length > 0 ? <ListComponent listData={jobs} dataType="job" /> : null;
    const renderRestaurantList = restaurants.length > 0 ? <ListComponent listData={restaurants} dataType="restaurant" /> : null;
    const renderGymList = gyms.length > 0 ? <ListComponent listData={gyms.slice(0, 7)} dataType="gym" /> : null;
    const renderParkList = parks.length > 0 ? <ListComponent listData={parks.slice(0, 7)} dataType="park" /> : null;
    const renderTrainList = trains.length > 0 ? <ListComponent listData={trains.slice(0, 7)} dataType="train" /> : null;
    const renderBusList = bus.length > 0 ? <ListComponent listData={bus.slice(0, 7)} dataType="bus" /> : null;

    return (
      <Tabs inkBarStyle={{background: 'rgb(82, 179, 217)'}}>
        <Tab label={<i className="material-icons">work</i>}>
          { renderJobList }
        </Tab>
        <Tab label={<i className="material-icons">restaurant</i>}>
          { renderRestaurantList }
        </Tab>
        <Tab label={<i className="material-icons">train</i>}>
          { renderTrainList }
        </Tab>
        <Tab label={<i className="material-icons">directions_bus</i>}>
          { renderBusList }
        </Tab>
        <Tab label="Gyms">
          { renderGymList }
        </Tab>
        <Tab label="Parks">
          { renderParkList }
        </Tab>
      </Tabs>
    );
  }
};

const mapStateToProps = (state) => {
  const { jobs, restaurants, trains, gyms, parks, bus } = state.globalReducer;
  return {
    jobs,
    restaurants,
    trains,
    gyms,
    parks,
    bus
  };
};

export default connect(mapStateToProps, {})(TabComponent);
