import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux'; 
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';

import App from './components/app';
import LandingPage from './components/landing_page';
import reducers from './reducers/index';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory}>
      <Route path="/" component={LandingPage}/>
      <Route path="results" component={App}/>
    </Router>
  </Provider>, 
  document.getElementById("app")
);
