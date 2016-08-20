import React, { Component } from 'react';

import SearchBar from '../containers/search_bar_container';

class LandingPage extends Component {
 render() {
   return (
    <div>
      <div id="bckgHero">
        <h1 className="intro-logo">Job<span>+</span></h1>
        <SearchBar />
      </div>
    </div>
   );
 }
}

export default LandingPage;
