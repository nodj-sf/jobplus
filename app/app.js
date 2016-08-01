import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './home';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Our App</h1>
        <Home />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
