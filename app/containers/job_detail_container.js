import React, { Component } from 'react';
import { connect } from 'react-redux';


class JobDetail extends Component {
  
  tagFreeSnippet() {
    if (this.props.job.snippet) {
      var regex = /(<([^>]+)>)/ig;
      var newSnippet = this.props.job.snippet.replace(regex, '');
      return newSnippet;
    }
  }

  render() {
    if (!this.props.job) {
      return <h1>Job</h1>;
    }
    
    return (
      <div>
        <h2>{ this.props.job.company }</h2> 
        <h3>{ this.props.job.jobtitle }</h3>
        <p>{ this.props.job.formattedRelativeTime }</p>
        <p>{ this.props.job.formattedLocation }</p>
        <p> { this.tagFreeSnippet() }</p>
        <a href={this.props.job.url}>link</a>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({ job: state.activeJob });

export default connect(mapStateToProps)(JobDetail);
