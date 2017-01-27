'use strict';
import React, { Component } from 'react';
import GMap from '../GMap';
import JobList from '../../containers/JobListContainer';


const ListSidebar = () => (
  <div id="jobResultsPane">
    <div>
      <GMap />
    </div>
    <JobList />
  </div>
);

export default ListSidebar;
