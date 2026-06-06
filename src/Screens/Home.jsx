import React, { useState } from 'react';
import { runCityExplorer } from '../backend/cityExplorer';

function HomeScreen() {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await runCityExplorer({
      location: `${departure} to ${destination}`,
      dates: date ? [date] : [],
      group_size: 1,
      description: `Flight from ${departure} to ${destination}`,
    });
    console.log({ departure, destination, date });
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Flight Search</h1>
          <p style={styles.subtitle}>Quickly find your next trip with a clean and simple search form.</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label htmlFor="departure" style={styles.label}>Departure</label>
            <input
              id="departure"
              type="text"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              placeholder="Starting from"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="destination" style={styles.label}>Destination</label>
            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Going to"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="date" style={styles.label}>Travel Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>Search Flights</button>
        </form>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    padding: '24px',
    background: '#f2f5f9',
    fontFamily: 'Inter, Arial, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '460px',
    background: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 18px 50px rgba(25, 47, 80, 0.08)',
    padding: '32px',
    border: '1px solid rgba(15, 35, 60, 0.08)',
  },
  header: {
    marginBottom: '28px',
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    letterSpacing: '-0.03em',
    color: '#102a43',
  },
  subtitle: {
    marginTop: '10px',
    color: '#486581',
    lineHeight: 1.6,
    fontSize: '0.98rem',
  },
  form: {
    display: 'grid',
    gap: '18px',
  },
  field: {
    display: 'grid',
    gap: '8px',
  },
  label: {
    color: '#334e68',
    fontSize: '0.95rem',
    fontWeight: 600,
  },
  input: {
    width: '95%',
    minHeight: '46px',
    padding: '12px 14px',
    borderRadius: '14px',
    border: '1px solid #d9e2ec',
    fontSize: '0.98rem',
    color: '#102a43',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '14px',
    border: 'none',
    background: '#3b82f6',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },
};

export default HomeScreen;
