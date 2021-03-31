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
  return (
    <div>
      <div style={styles}>
        <div style={leadTitle}>Leads</div>
        <div style={appliedTitle}>Applications</div>
        <div style={inProgressTitle}>In Progress</div>
        <div style={offerTitle}>Offers</div>
        <div style={leadBoard}>
          {props.card.map((card) => (
            <CardComponent
              company={card.company}
              role={card.role}
              details={card.details}
              created_at={moment().format('MMM Do YY')}
            />
          ))}
        </div>
        <div style={appliedBoard}></div>
        <div style={inProgressBoard}></div>
        <div style={offerBoard}></div>
      </div>
    </div>
  );
}

export default BoardComponent;
