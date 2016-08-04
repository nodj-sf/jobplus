import React, {Component} from 'react';
import Banner from './banner_component';
import SearchBar from './search_bar';
import JobDetail from '../containers/job_detail';
import JobList from '../containers/job_list';
import DataDiagram from './diagram_component';
import GMap from './google_map';
import Footer from './footer_component';


class App extends Component {
  render() {
    return (
      <div>
        <Banner />

        <div id='appContainer' className='appContainer'>
          <SearchBar className='twelve columns' />
          
          <JobDetail />
          
          <div id='jobInfoBody'>
            <JobList />
            <DataDiagram />
          </div>

        </div>        

        <h1 style={{width: '90%', margin: 'auto', textAlign: 'center'}}>NODJ Map</h1>
        <GMap />

        <Footer />
      </div>
    );
  }
};

export default App; 
