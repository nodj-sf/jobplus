import React, { Component } from 'react';

import SearchBar from '../containers/search_bar_container';

class LandingPage extends Component {
 render() {
   return (
     <div className="u-full-width">
        <div className="container">
          <div className="row">
            <h1>Job Search</h1>
          </div>
        </div>
        <SearchBar />
     </div>
   );
 }
}

export default LandingPage;
