import React, { Component } from 'react';

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

class App extends Component {
  render() {
    return (
      <div style={styles}>
        <div style={leadTitle}>Leads</div>
        <div style={appliedTitle}>Applications</div>
        <div style={inProgressTitle}>In Progress</div>
        <div style={offerTitle}>Offers</div>
        <div style={leadBoard}></div>
        <div style={appliedBoard}></div>
        <div style={inProgressBoard}></div>
        <div style={offerBoard}></div>
      </div>
    );
  }
}

export default App;
