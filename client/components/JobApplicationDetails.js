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

  const [state, setState] = useState({
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1'
    }
  });

  return (
    <Modal
      onExited={() => {
        setEditItem({});
      }}
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body style={{ padding: '25px 25px 0px' }}>
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
              rows="5"
              placeholder="Enter any aditional information..."
              type="text"
              name="details"
              defaultValue={props.details}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group controlId="statusControl">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-2"
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
            <Form.Group as={Col} controlId="submitControl">
              <Form.Label>Card Color</Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                custom
                name="color"
                defaultValue={props.color}
                onChange={onChangeHandler}
              >
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="Success">Success</option>
                <option value="Danger">Danger</option>
                <option value="Warning">Warning</option>
                <option value="Info">Info</option>
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group
              as={Col}
              controlId="submitControl"
              style={{ paddingLeft: 0 }}
            >
              <div className="float-right">
                <Button variant="primary" type="submit">
                  <i class="bi bi-save2"> Save </i>
                </Button>
              </div>
              <div className="float-left">
                <Button variant="danger" onClick={handleDelete}>
                  <i class="bi bi-trash"> Delete </i>
                </Button>
              </div>
            </Form.Group>
          </Form.Row>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default JobApplicationDetails;
