import { useState } from 'react';
import s from './SearchForm.module.css';

export default function SearchForm({ onSubmit, error }) {
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    departure_date: '',
    return_date: '',
    travelers: '',
    description: '',
  });

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className={s.page}>
      <header className={s.header}>
        <span className={s.logo}>Waypoint</span>
        <p className={s.tagline}>Tell me about your trip. I'll handle the rest.</p>
      </header>

      <form className={s.form} onSubmit={handleSubmit} noValidate>
        <div className={s.row}>
          <Field label="From" id="origin" placeholder="Boston, MA" value={form.origin} onChange={set('origin')} required />
          <Field label="To" id="destination" placeholder="New York City" value={form.destination} onChange={set('destination')} required />
        </div>

        <div className={s.row}>
          <Field label="Departure" id="departure_date" type="date" value={form.departure_date} onChange={set('departure_date')} required />
          <Field label="Return" id="return_date" type="date" value={form.return_date} onChange={set('return_date')} required />
        </div>

        <Field
          label="Travelers"
          id="travelers"
          placeholder="2 adults"
          value={form.travelers}
          onChange={set('travelers')}
          required
        />

        <Field
          label="What's the occasion?"
          id="description"
          placeholder="Anniversary trip, loves seafood and rooftop bars"
          value={form.description}
          onChange={set('description')}
          textarea
        />

        {error && <p className={s.error}>{error}</p>}

        <button type="submit" className={s.submit}>
          Plan my trip
          <ArrowIcon />
        </button>
      </form>
    </div>
  );
}

function Field({ label, id, placeholder, value, onChange, required, type = 'text', textarea }) {
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>{label}</label>
      {textarea ? (
        <textarea
          id={id}
          className={s.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={3}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={s.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
