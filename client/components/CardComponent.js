import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

function CardComponent(props) {
  return (
    <div>
      <Card
        bg={'Light'.toLowerCase()}
        key={1}
        text={'Light'.toLowerCase() === 'light' ? 'dark' : 'white'}
        style={{ width: '18rem' }}
        className="mb-2"
      >
        <Card.Header>{props.company}</Card.Header>
        <Card.Body>
          <Card.Title>{props.role}</Card.Title>
          <Card.Text>{props.details}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{props.created_at}</small>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default CardComponent;
