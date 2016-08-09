import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class JobItem extends Component {
  render() {
    return (
      <div>
        <li className="jobLI" onClick={() => this.props.jobFunc(this.props.job)}>
          <h2>{this.props.job.jobtitle}</h2> 
        </li>
        <hr />
      </div>
    );
  }
}
