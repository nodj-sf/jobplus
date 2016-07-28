const React = require('react');
const ReactDOM = require('react-dom');
const Home = require('./home.jsx');

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>Our App</h1>
        <Home/>
      </div>
    );
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('app'));
