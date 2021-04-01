import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function NewApplication(props) {
  const [newItem, setNewItem] = useState({});

  const onChangeHandler = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    newItem[name] = value;
    setNewItem({ ...newItem, [name]: value });
    console.log(newItem);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onHide();

    const data = newItem;

    fetch('api/interviews/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      responseType: 'text'
    })
      .then((data) => {
        console.log('Success:', data);
        props.refresh();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form>
        <Modal.Body style={{ padding: '25px' }}>
          <Form.Row>
            <Form.Group as={Col} controlId="companyControl">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                placeholder="Enter Company Name"
                type="text"
                name="company"
                defaultValue={props.company}
                onChange={onChangeHandler}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="locationControl">
              <Form.Label>Location</Form.Label>
              <Form.Control
                placeholder="Location"
                type="text"
                name="location"
                // defaultValue={props.role}
                onChange={onChangeHandler}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="roleControl">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              placeholder="Enter Job Title"
              type="text"
              name="role"
              defaultValue={props.role}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="detailsControl">
            <Form.Label>Details</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter any aditional information..."
              type="text"
              name="details"
              defaultValue={props.details}
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default NewApplication;
