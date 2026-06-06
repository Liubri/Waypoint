import { useState } from 'react';
import SearchForm from './components/SearchForm.jsx';
import Results from './components/Results.jsx';
import Loading from './components/Loading.jsx';
import { planTrip } from './api.js';
import styles from './App.module.css';

const DEMO = new URLSearchParams(location.search).has('demo');

export default function App() {
  const [phase, setPhase] = useState(DEMO ? 'loading-demo' : 'search');
  const [loadStatus, setLoadStatus] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(
    DEMO ? { origin: 'Boston, MA', destination: 'New York City' } : null
  );

  // Load demo data on mount
  useState(() => {
    if (!DEMO) return;
    fetch('/demo.json')
      .then((r) => r.json())
      .then((d) => { setResult(d.output.result); setPhase('results'); });
  });

  async function handleSearch(input) {
    setQuery(input);
    setPhase('loading');
    setError(null);
    try {
      const data = await planTrip(input, setLoadStatus);
      setResult(data);
      setPhase('results');
    } catch (err) {
      setError(err.message);
      setPhase('search');
    }
  }

  function handleReset() {
    setPhase('search');
    setResult(null);
    setQuery(null);
    setError(null);
  }

  return (
    <div className={styles.app}>
      {phase === 'search' && (
        <SearchForm onSubmit={handleSearch} error={error} />
      )}
      {phase === 'loading' && (
        <Loading status={loadStatus} query={query} />
      )}
      {phase === 'results' && result && (
        <Results data={result} query={query} onReset={handleReset} />
      )}
    </div>
  );
}
