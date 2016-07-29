import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '!xoblie' };
  }
  render() {
    return (
      <div>
        <input
          value={this.state.term}
          onChange={event => this.setState({ term: event.target.value })} />
        <p>Value of state: { this.state.term }</p>
      </div>
    );
  }
}

export default Home;
