import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import JobApplicationDetails from './JobApplicationDetails';

function JobApplication(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <Card
        bg={'Light'.toLowerCase()}
        key={1}
        text={'Light'.toLowerCase() === 'light' ? 'dark' : 'white'}
        style={{ width: '18rem' }}
        className="mb-2"
        onClick={() => setModalShow(true)}
      >
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            {props.company}
          </Card.Subtitle>
          <Card.Title>{props.role}</Card.Title>
          <Card.Text>
            <small className="text-muted">{props.created_at}</small>
          </Card.Text>
        </Card.Body>
      </Card>
      <JobApplicationDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={props.id}
        company={props.company}
        role={props.role}
        details={props.details}
        status={props.status}
        refresh={props.refresh}
      />
    </div>
  );
}

export default JobApplication;
