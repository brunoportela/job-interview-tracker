import React, { useState, useEffect } from 'react';
import Board from './Board';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    loadData();
  }, [data]);

  async function loadData() {
    const response = await fetch('/api/interviews');
    const data = await response.json();
    setData(data);
    setLoading(false);
  }

  function updateData(newItem) {
    setData(({ data }) => ({ data: { ...data, newItem } }));
  }

  return (
    <div>
      {loading ? (
        <div>Loading... please wait...</div>
      ) : (
        <Board
          cards={data}
          refresh={loadData}
          updateData={(val) => updateData(val)}
        />
      )}
    </div>
  );
}

export default App;
