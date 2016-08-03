import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Modal from "react-modal";


const customStyles = {
  content: {
    top        : "50%",
    left       : "50%",
    right      : "auto",
    bottom     : "auto",
    marginRight: "-50%",
    transform  : "translate(-50%, -50%)"
  }
};


// class JobListItem extends Component {
const JobListItem = ({job}) => {
  constructor(props) {
    super(props);
    this.state = {isModalOpen: false}
  }

  openModal() {
    this.setState({isModalOpen: true});
  }

  closeModal() {
    this.setState({isModalOpen: false});
  }


  render() {
    return (
      <div>
      <li className="jobLI">
        <h2>{job.title}</h2>

        <div>
          <button onClick={() => this.openModal()}>Open Modal</button>
          <Modal
            isOpen={this.state.isModalOpen}
            onClose={() => this.closeModal()}>

            <h2 ref="subtitle">Hello</h2>
            <button onClick={() => this.closeModal()}>close</button>
          </Modal>
        </div>
      </li>
      </div>
    );
  }
}


export default JobListItem;
