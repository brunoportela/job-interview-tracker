import React, { useState, useEffect } from 'react';
import JobApplication from './JobApplication';
import NewApplication from './NewApplication';
import Button from 'react-bootstrap/Button';
var moment = require('moment');

const styles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gridTemplateRows: '5% 1fr',
  gap: '30px 10px',
  gridTemplateAreas: `
    'leadTitle appliedTitle inProgressTitle offerTitle'
    'leadBoard appliedBoard inProgressBoard offerBoard'
    `
};
const leadTitle = { gridArea: 'leadTitle' };
const appliedTitle = { gridArea: 'appliedTitle' };
const inProgressTitle = { gridArea: 'inProgressTitle' };
const offerTitle = { gridArea: 'offerTitle' };
const leadBoard = { gridArea: 'leadBoard' };
const appliedBoard = { gridArea: 'appliedBoard' };
const inProgressBoard = { gridArea: 'inProgressBoard' };
const offerBoard = { gridArea: 'offerBoard' };

function Board(props) {
  const leadCards = [];
  const appliedCards = [];
  const inProgressCards = [];
  const offerCards = [];
  props.cards.map((card) => {
    if (card.status === 'lead') {
      leadCards.push(card);
    } else if (card.status === 'applied') {
      appliedCards.push(card);
    } else if (card.status === 'inProgress') {
      inProgressCards.push(card);
    } else if (card.status === 'offer') {
      offerCards.push(card);
    }
  });

  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <Button variant="info" onClick={() => setModalShow(true)}>
        <i class="bi bi-plus-circle-fill"></i> New Application
      </Button>
      <div style={styles}>
        <div style={leadTitle}>
          <h4>Leads</h4>
        </div>
        <div style={appliedTitle}>
          <h4>Applications</h4>
        </div>
        <div style={inProgressTitle}>
          <h4>Interviewing</h4>
        </div>
        <div style={offerTitle}>
          <h4>Offers</h4>
        </div>
        <div style={leadBoard}>
          {leadCards.map((card) => (
            <JobApplication
              key={card._id}
              id={card._id}
              company={card.company}
              role={card.role}
              details={card.details}
              status={card.status}
              created_at={moment().format('MMM Do YY')}
              refresh={props.refresh}
            />
          ))}
        </div>
        <div style={appliedBoard}>
          {appliedCards.map((card) => (
            <JobApplication
              key={card._id}
              id={card._id}
              company={card.company}
              role={card.role}
              details={card.details}
              status={card.status}
              created_at={moment().format('MMM Do YY')}
              refresh={props.refresh}
            />
          ))}
        </div>
        <div style={inProgressBoard}>
          {inProgressCards.map((card) => (
            <JobApplication
              key={card._id}
              id={card._id}
              company={card.company}
              role={card.role}
              details={card.details}
              status={card.status}
              created_at={moment().format('MMM Do YY')}
              refresh={props.refresh}
            />
          ))}
        </div>
        <div style={offerBoard}>
          {offerCards.map((card) => (
            <JobApplication
              key={card._id}
              id={card._id}
              company={card.company}
              role={card.role}
              details={card.details}
              status={card.status}
              created_at={moment().format('MMM Do YY')}
              refresh={props.refresh}
            />
          ))}
        </div>
      </div>
      <NewApplication show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default Board;
