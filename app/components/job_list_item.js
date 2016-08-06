import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { selectJob } from '../actions/index';


export default class JobListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {isModalOpen: false};
  }

  render() {
    return (
      <div>
        <li className="jobLI" onClick={() => selectJob(this.props.job)}>
          <h2>{this.props.job.jobtitle}</h2> 
        </li>
        <hr />
      </div>
    );
  }
}
