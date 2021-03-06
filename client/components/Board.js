import React, { useState, useEffect } from 'react';
import JobApplication from './JobApplication';
import NewApplication from './NewApplication';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
var moment = require('moment');

const styles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gridTemplateRows: '5% 1fr',
  gap: '30px 10px',
  gridTemplateAreas: `
    'leadTitle appliedTitle inProgressTitle offerTitle'
    'leadBoard appliedBoard inProgressBoard offerBoard'
    `,
  margin: '30px',
  justifyItems: 'center',
  boxShadow: '0px 0px 5px 0px',
  padding: '25px 0',
  background: 'rgba(242, 243, 244, 0.5)'
};
const leadTitle = { gridArea: 'leadTitle', textAlign: 'center' };
const appliedTitle = { gridArea: 'appliedTitle', textAlign: 'center' };
const inProgressTitle = { gridArea: 'inProgressTitle', textAlign: 'center' };
const offerTitle = { gridArea: 'offerTitle', textAlign: 'center' };
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
    } else if (card.status === 'interview') {
      inProgressCards.push(card);
    } else if (card.status === 'offer') {
      offerCards.push(card);
    }
  });

  const [modalShow, setModalShow] = useState(false);

  return (
    <Container fluid>
      <div style={{ textAlign: 'right', margin: '30px' }}>
        <Button variant="info" onClick={() => setModalShow(true)}>
          <i class="bi bi-plus-square"> New Application </i>
        </Button>
      </div>
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
              location={card.location}
              url={card.url}
              role={card.role}
              details={card.details}
              color={card.color}
              status={card.status}
              lead_at={`created on ${moment(card.lead_at).format('ll')}`}
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
              location={card.location}
              url={card.url}
              role={card.role}
              details={card.details}
              color={card.color}
              status={card.status}
              applied_at={`applied on ${moment(card.applied_at).format('ll')}`}
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
              location={card.location}
              url={card.url}
              role={card.role}
              details={card.details}
              color={card.color}
              status={card.status}
              interview_at={`interviews started on ${moment(
                card.interview_at
              ).format('ll')}`}
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
              location={card.location}
              url={card.url}
              role={card.role}
              details={card.details}
              color={card.color}
              status={card.status}
              offer_at={`offer received on ${moment(card.offer_at).format(
                'll'
              )}`}
              refresh={props.refresh}
            />
          ))}
        </div>
      </div>
      <NewApplication
        show={modalShow}
        onHide={() => setModalShow(false)}
        refresh={props.refresh}
      />
    </Container>
  );
}

export default Board;
