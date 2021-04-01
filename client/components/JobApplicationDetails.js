import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

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

  const [state, setState] = useState({
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1'
    }
  });

  const styles = reactCSS({
    default: {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${state.color.r}, ${state.color.g}, ${state.color.b}, ${state.color.a})`
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer'
      },
      popover: {
        position: 'absolute',
        zIndex: '1',
        top: '-260px'
      }
    }
  });

  const handleClick = () => {
    setState({ ...state, displayColorPicker: !state.displayColorPicker });
  };

  const handleChange = (color) => {
    setState({ color: color.rgb });
    // update object color
    setEditItem({ ...editItem, color: color.rgb });
  };

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
          <Form.Row>
            <Form.Group as={Col} controlId="colorControl">
              <div style={{ marginTop: '5px' }}>
                <div style={styles.swatch} onClick={handleClick}>
                  <div style={styles.color} />
                </div>
                {state.displayColorPicker ? (
                  <div style={styles.popover}>
                    <SketchPicker
                      color={state.color}
                      name="color"
                      onChange={handleChange}
                    />
                  </div>
                ) : null}
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId="colorControl">
              <div className="float-right">
                <Button variant="primary" type="submit">
                  Save changes
                </Button>
              </div>
              <div className="float-right">
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  style={{ marginRight: '15px' }}
                >
                  Delete
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

// [
//   'Primary',
//   'Secondary',
//   'Success',
//   'Danger',
//   'Warning',
//   'Info',
//   'Light',
//   'Dark',
// ].map((variant, idx) => (
//   <Card
//     bg={variant.toLowerCase()}
//     key={idx}
//     text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
//     style={{ width: '18rem' }}
//     className="mb-2"
//   >
//     <Card.Header>Header</Card.Header>
//     <Card.Body>
//       <Card.Title>{variant} Card Title </Card.Title>
//       <Card.Text>
//         Some quick example text to build on the card title and make up the bulk
//         of the card's content.
//       </Card.Text>
//     </Card.Body>
//   </Card>
// ));
