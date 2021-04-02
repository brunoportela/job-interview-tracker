import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function NewApplication(props) {
  const [newItem, setNewItem] = useState({});
  const [validated, setValidated] = useState(false);

  const onChangeHandler = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    newItem[name] = value;
    setNewItem({ ...newItem, [name]: value });
  };

  function handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
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
          setValidated(false);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    setValidated(true);
  }

  return (
    <Modal
      onExited={() => {
        setNewItem({});
      }}
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body style={{ padding: '25px 25px 0px' }}>
          <Form.Group>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              placeholder="Enter Company Name"
              type="text"
              name="company"
              onChange={onChangeHandler}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a company name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="roleControl">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              placeholder="Enter Job Title"
              type="text"
              name="role"
              onChange={onChangeHandler}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a job position.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="detailsControl">
            <Form.Label>Details</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              placeholder="Enter any aditional information..."
              type="text"
              name="details"
              defaultValue={props.details}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <div className="float-right">
            <Button variant="primary" type="submit">
              <i class="bi bi-save2"> Save </i>
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default NewApplication;
