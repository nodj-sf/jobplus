import React, { Component } from 'react';

import SearchBar from '../containers/search_bar_container';


export default class Banner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <span>NODJ</span>
          </div>
        </div>
      </div>
    );
  };
}
