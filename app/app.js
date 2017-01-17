import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';

import '../public/css/normalize.css';
import '../public/css/skeleton.css';

import '../public/css/styles.css';
import '../public/css/custom_class_styles.css';
import '../public/css/jobResults_styles.css';
import '../public/css/jobDetail_styles.css';
import '../public/css/fontAwesome_styles.css';
import '../public/css/mobile_style.css';
import '../public/css/keyframes.css';

import Results from './components/results_page';
import LandingPage from './components/landing_page';
import AboutPage from './components/about_page';
import reducers from './reducers/index';


const routerMid = routerMiddleware(browserHistory),
      createStoreWithMiddleware = applyMiddleware(promiseMiddleware, routerMid)(createStore),
      store = createStoreWithMiddleware(reducers),
      history = syncHistoryWithStore(browserHistory, store);

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router history={ history }>
          <Route path='/'component={ LandingPage } />
          <Route path='results' component={ Results } />
          <Route path='about' component={ AboutPage } />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
