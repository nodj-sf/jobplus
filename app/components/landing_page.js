import React, { Component } from 'react';

import SearchBar from '../containers/search_bar_container';

class LandingPage extends Component {
 render() {
   return (
    <div>
      <h1>Landing Page</h1>
      <div id="bckgHero">
        <SearchBar />
      </div>
    </div>
   );
 }
}

export default LandingPage;
