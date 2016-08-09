import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux'; 
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';

import Results from './components/results_page';
import LandingPage from './components/landing_page';
import reducers from './reducers/index';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={hashHistory}>
          <Route path="/" component={LandingPage} />
          <Route path="results" component={Results} />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
