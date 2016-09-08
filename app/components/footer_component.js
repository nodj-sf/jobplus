import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';


class Footer extends Component {
  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  onBtnClick(evt) {
    this.props.push('/about');
  }

  render() {
    return (
      <div className='footerCont'>
        <nav>
          <a onClick={ this.onBtnClick }>About</a>
        </nav>
      </div>
    );
  }
};

let mapDispatchToProps = (dispatch) => bindActionCreators({
  push 
}, dispatch);

export default connect(null, mapDispatchToProps)(Footer);

