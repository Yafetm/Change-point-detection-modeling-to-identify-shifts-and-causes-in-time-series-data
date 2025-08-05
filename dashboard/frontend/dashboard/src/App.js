import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css';

function App() {
  const [priceData, setPriceData] = useState([]);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/prices')
      .then(response => {
        const data = response.data.dates.map((date, index) => ({
          date: date,
          price: response.data.prices[index]
        }));
        setPriceData(data);
      })
      .catch(error => console.error('Error fetching prices:', error));
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        setEventData(response.data);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="App">
      <h1>Brent Oil Price Dashboard</h1>
      <LineChart width={800} height={400} data={priceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        {eventData.dates && eventData.dates.map((date, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey=""
            stroke="red"
            strokeWidth={2}
            dot={{ r: 8 }}
            xAxisId={0}
            data={[{ date: date, price: priceData.find(d => d.date === date)?.price }]}
          />
        ))}
      </LineChart>
      <h2>Key Events</h2>
      <ul>
        {eventData.dates && eventData.dates.map((date, index) => (
          <li key={index}>{date}: {eventData.descriptions[index]}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;