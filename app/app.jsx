import React from 'react';
import ReactDOM from 'react-dom';

import Home from './home.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Good Location App</h1>
        <Home />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));

