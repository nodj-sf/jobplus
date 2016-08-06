import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class JobItem extends Component {
  render() {
    return (
      <div>
        <li className="jobLI" onClick={() => this.props.jobFunc(this.props.job)}>
          <h2>
            {this.props.job.jobtitle
              .split(" ")
              .reduce((memo, index) => 
                memo += `${index.charAt(0).toUpperCase()}${index.slice(1).toLowerCase()} `, '')
              .trim()
            }
          </h2> 
          <h6><b>{this.props.job.company}</b></h6>
        </li>
        <hr />
      </div>
    );
  }
}
