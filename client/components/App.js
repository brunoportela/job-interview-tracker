import React, { useState, useEffect } from 'react';
import BoardComponent from './BoardComponent';
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

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
    setLoading(false);
  }, []);

  return { data, loading };
};

function App() {
  const { data, loading } = useFetch('/api/interviews');

  return (
    <div>
      {loading ? (
        <div>Loading... please wait...</div>
      ) : (
        <BoardComponent cards={data} />
      )}
    </div>
  );
}

export default App;
