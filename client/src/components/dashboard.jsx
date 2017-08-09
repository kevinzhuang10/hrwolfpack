import React from 'react';
import ReactDOM from 'react-dom';
import Listings from './Listings.jsx'
import { Button, Modal, Form } from 'react-bootstrap';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      lgShow: false
    };
  }

  hideModal(e){
    this.setState({
      lgShow: false
    });
  }

  showModal(e){
    e.preventDefault();
    this.setState({
      lgShow: true
    });
  }


  render () {
    return (
      <div>
        <Modal show={this.state.lgShow}  bsSize="large" aria-labelledby="contained-modal-title-sm">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-sm">Create New Listing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Sup</h4>
            <p>Some awesome form here</p>
            
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.hideModal.bind(this)}>Cancel</Button>
            <Button bsStyle="success" onClick={this.showModal.bind(this)}>Create</Button>

          </Modal.Footer>
        </Modal>
        <Listings/>
        <Button bsStyle="primary" onClick={this.showModal.bind(this)}>Create Listing</Button>
      </div>
    )
  }
}

export default Dashboard;