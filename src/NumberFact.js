import React, { useState } from 'react';

function NumberFact() {
  const [number, setNumber] = useState('');
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  const fetchFact = () => {
    if (!number) {
      setError('Please enter a valid number');
      return;
    }

    setLoading(true);
    setError('');
    fetch(`http://numbersapi.com/${number}/math`)
      .then((response) => response.text())
      .then((data) => {
        setFact(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Enter a Number to Get a Math Fact</h1>
      <input
        type="text"
        value={number}
        onChange={handleChange}
        placeholder="Enter a number if you dare"
      />
      <button onClick={fetchFact}>Get Fact</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {fact && <p id="number-fact">{fact}</p>}
    </div>
  );
}

export default NumberFact;
