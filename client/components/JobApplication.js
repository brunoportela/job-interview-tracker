import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import JobApplicationDetails from './JobApplicationDetails';

function JobApplication(props) {
  const [modalShow, setModalShow] = useState(false);

  function renderTimestamp(status) {
    let time;
    switch (status) {
      case 'applied':
        time = props.applied_at;
        break;
      case 'interview':
        time = props.interview_at;
        break;
      case 'offer':
        time = props.offer_at;
        break;
      default:
        time = props.lead_at;
        break;
    }
    return <small className="text-muted">{time}</small>;
  }

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
          <Card.Text>{renderTimestamp(props.status)}</Card.Text>
        </Card.Body>
      </Card>
      <JobApplicationDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={props.id}
        company={props.company}
        location={props.location}
        url={props.url}
        role={props.role}
        details={props.details}
        status={props.status}
        refresh={props.refresh}
      />
    </div>
  );
}

export default JobApplication;
