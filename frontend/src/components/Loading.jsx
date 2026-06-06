import s from './Loading.module.css';

const STEPS = [
  { key: 'admitted',  label: 'Trip received' },
  { key: 'running',   label: 'Researching flights, hotels & places' },
  { key: 'completed', label: 'Putting your plan together' },
];

export default function Loading({ status, query }) {
  const activeIdx = status === 'completed' ? 2 : status === 'running' ? 1 : 0;

  return (
    <div className={s.page}>
      {query && (
        <p className={s.trip}>
          {query.origin}
          <span className={s.arrow}>→</span>
          {query.destination}
        </p>
      )}
      <div className={s.steps} role="status" aria-live="polite">
        {STEPS.map((step, i) => (
          <div key={step.key} className={`${s.step} ${i < activeIdx ? s.done : ''} ${i === activeIdx ? s.active : ''}`}>
            <span className={s.dot} aria-hidden="true" />
            <span className={s.stepLabel}>{step.label}</span>
          </div>
        ))}
      </div>
      <p className={s.hint}>Usually takes 60–90 seconds</p>
    </div>
  );
}
