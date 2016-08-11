import React, { Component } from 'react';
import { connect } from 'react-redux';


class JobDetail extends Component {

  tagFreeSnippet(descrip) {
    return descrip ? 
      descrip.replace(/<[^>]+>|\.(?=\.{3,})/gmi, '') : 
      descrip;
  }

  render() {
    if (!this.props.job) {
      return <h1>Job</h1>;
    }
    
    return (
      <div>
        <h1>{ this.props.job.jobtitle }</h1>
        <h2>{ this.props.job.company }</h2> 
        <p>{ this.props.job.formattedRelativeTime }</p>
        <p>{ this.props.job.formattedLocation }</p>
        <blockquote>{ this.tagFreeSnippet(this.props.job.snippet) }</blockquote>
        <a href={this.props.job.url}>link</a>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({ job: state.activeJob });

export default connect(mapStateToProps)(JobDetail);
