import React, { Component } from 'react';
<<<<<<< HEAD
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchJobs } from '../actions/index';
=======
>>>>>>> b5e0203ec8c6751d0a9207f448a524c8689df22d

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
  }

  onFormSubmit(event) {
    event.preventDefault();
    // We need to go and fetch job data
    this.props.fetchJobs(this.state.term);
    this.setState({ term: '' });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
<<<<<<< HEAD
        <div className="box">
          <div className="container-3">
              <span className="icon"><i className="fa fa-search"></i></span>
              <input 
                id="search" 
                type="search" 
                results="4" 
                autoSave="Developer Jobs" 
                placeholder="Search..."
                onChange={this.onInputChange} />
=======

        <div className="box">
          <div className="container-3">
              <span className="icon"><i className="fa fa-search"></i></span>
              <input id="search" type="search" results="4" autoSave="Developer Jobs" placeholder="Search..." />
>>>>>>> b5e0203ec8c6751d0a9207f448a524c8689df22d
          </div>
        </div>

        <button type="submit" className="button-primary">Search</button>
      </form>
    );
  }
};

<<<<<<< HEAD

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchJobs }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
=======
export default SearchBar;

        // <input 
        //   placeholder="Search for a job"

        //   type="search"
        //   className="searchBar"

        //   type="search"
        //   className="searchBar"
        //   value={ this.state.term }
        //   onChange={ this.onInputChange } />
>>>>>>> b5e0203ec8c6751d0a9207f448a524c8689df22d
