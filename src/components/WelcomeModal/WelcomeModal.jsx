import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const WelcomeModal = ({ show, onHide }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Welcome to Petsee!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Welcome to Petsee! To get started, please add the details of your pet.</p>
      <p>Click on the More button in the dock menu below, illustrated by the dog paw icon, and select Add a Pet.</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onHide}>
        Got it!
      </Button>
    </Modal.Footer>
  </Modal>
);

export default WelcomeModal;
