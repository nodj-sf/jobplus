import React, { Component } from 'react';
import { connect } from 'react-redux';


class JobDetail extends Component {
  
  parseJobDescription(descrip) {
    return descrip.replace(/<[^>]+>|\.(?=\.{3,})/gmi, '');
  }

  render() {
    if (!this.props.job) {
      return <h1>Job</h1>;
    }
    
    console.log(`PROPS: ${this.props.job}`);
    return (
      <div>
        <h3>Details for:</h3>
        <div>
          <h1>{this.props.job.jobtitle}</h1>
          <blockquote>{this.props.job.snippet}</blockquote>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({ job: state.activeJob });

export default connect(mapStateToProps)(JobDetail);
