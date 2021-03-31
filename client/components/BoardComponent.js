import React, { useState, useEffect } from 'react';
import CardComponent from './CardComponent';
var moment = require('moment');

const styles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gridTemplateRows: '10% 1fr',
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

function BoardComponent(props) {
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

  return (
    <div>
      <div style={styles}>
        <div style={leadTitle}>Leads</div>
        <div style={appliedTitle}>Applications</div>
        <div style={inProgressTitle}>In Progress</div>
        <div style={offerTitle}>Offers</div>
        <div style={leadBoard}>
          {leadCards.map((card) => (
            <CardComponent
              key={card._id}
              company={card.company}
              role={card.role}
              details={card.details}
              created_at={moment().format('MMM Do YY')}
            />
          ))}
        </div>
        <div style={appliedBoard}>
          {appliedCards.map((card) => (
            <CardComponent
              key={card._id}
              company={card.company}
              role={card.role}
              details={card.details}
              created_at={moment().format('MMM Do YY')}
            />
          ))}
        </div>
        <div style={inProgressBoard}>
          {inProgressCards.map((card) => (
            <CardComponent
              key={card._id}
              company={card.company}
              role={card.role}
              details={card.details}
              created_at={moment().format('MMM Do YY')}
            />
          ))}
        </div>
        <div style={offerBoard}>
          {offerCards.map((card) => (
            <CardComponent
              key={card._id}
              company={card.company}
              role={card.role}
              details={card.details}
              created_at={moment().format('MMM Do YY')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoardComponent;
