import React from 'react'
// These are imports for the modal thats is included after clicking generate fine report.....
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModelComponent(props) {
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header >
      <Modal.Title id="contained-modal-title-vcenter">
        Fine Information
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>No Fine</h4>
      <p>
        The Books had been issued Just Now.
        No Fine Yet.

      </p>
      <p>10 Days left</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
  )
}
