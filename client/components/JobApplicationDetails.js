import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function JobApplicationDetails(props) {
  const [editItem, setEditItem] = useState({});
  const [validated, setValidated] = useState(false);

  const onChangeHandler = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    editItem[name] = value;
    setEditItem({
      ...editItem,
      [name]: value
    });
    setEditItem({ ...editItem, [`${editItem.status}_at`]: Date.now() });

    console.log(editItem);
  };

  function handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      props.onHide();

      const data = editItem;

      fetch(`api/interviews/${props.id}`, {
        method: 'PUT',
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

  function handleDelete(e) {
    e.preventDefault();
    props.onHide();

    fetch(`api/interviews/${props.id}`, {
      method: 'DELETE'
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
      onExited={() => {
        setEditItem({});
      }}
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a company name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="locationControl">
              <Form.Label>Location</Form.Label>
              <Form.Control
                placeholder="Location"
                type="text"
                name="location"
                defaultValue={props.location}
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
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a job position.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="urlControl">
            <Form.Label>Job URL</Form.Label>
            <Form.Control
              placeholder="Enter Job URL"
              type="text"
              name="url"
              defaultValue={props.url}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="detailsControl">
            <Form.Label>Details</Form.Label>
            <Form.Control
              as="textarea"
              rows="10"
              placeholder="Enter any aditional information..."
              type="text"
              name="details"
              defaultValue={props.details}
              onChange={onChangeHandler}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="select"
              className="mr-sm-2"
              id="inlineFormCustomSelect"
              custom
              name="status"
              defaultValue={props.status}
              onChange={onChangeHandler}
            >
              <option value="lead">Lead</option>
              <option value="applied">Applied</option>
              <option value="interview">Interviewing</option>
              <option value="offer">Offer Received</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary" type="submit">
            Save changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default JobApplicationDetails;
