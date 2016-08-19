import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { selectJob } from '../actions/index';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';


import BaseComponent from './base_component';


export default class JobItem extends BaseComponent {

  constructor(props) {
    super(props);
    //this.setActive = this.setActive.bind(this);
  }

  // setActive(job) {
  //   console.log('job: ', job);
  //   console.log('this.props.selectJob: ', this.props.selectJob);
  //   if (job === this.props.selectJob) {
  //     return 'active jobLI';
  //   } else {
  //     return 'jobLI';
  //   }
  // } 

  jobListItemClickHandler() {
    this.props.jobFunc(this.props.job);
  }

  render() {
    return (
      <div>
        <li className={this.props.setActive(this.props.job)} onClick={() => this.props.jobFunc(this.props.job) }>
          <h2>{ this.parseAndFormatJobTitle(this.props.job.jobtitle) }</h2>
          <div className="jobLI_MetaInfo">
            <h6>
              <b>{this.props.job.company || 'Unlisted'}</b>
            </h6>
            <i className="daysSincePosted">{ this.parseAndFormatDaysSincePosted(this.props.job.formattedRelativeTime) }</i>
          </div>
        </li>
        <hr />
      </div>
    );
  }
}

// let mapDispatchToProps = (dispatch) =>  {
//   return bindActionCreators({ 
//     selectJob
//   }, dispatch);
// };

// Promote JobList to a container:
// export default connect(mapDispatchToProps)(JobItem);