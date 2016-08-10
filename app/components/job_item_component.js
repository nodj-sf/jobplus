import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class JobItem extends Component {
  render() {
    return (
      <div>
        <li className="jobLI" onClick={() => ( this.props.jobFunc(this.props.job), console.log("Active Job:", this.props.jobFunc(this.props.job)) ) }>
          <h2>
            {this.props.job.jobtitle
              .split(" ")
              .reduce((memo, index) => 
                memo += `${index.charAt(0).toUpperCase()}${index.slice(1).toLowerCase()} `, '')
              .trim()
            }
          </h2>
          <div className="jobLI_MetaInfo">
            <h6><b>{this.props.job.company || "Unlisted"}</b></h6>
            <i className="daysSincePosted">
              {
               this.props.job.formattedRelativeTime
                .match(/(\w+){1,}/gmi)
                .map(str => `${str[0].toUpperCase()}${str.slice(1)}`)
                .join(' ') 
              }
            </i>
          </div>
        </li>
        <hr />
      </div>
    );
  }
}
