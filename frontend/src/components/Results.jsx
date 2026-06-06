import { useState } from 'react';
import s from './Results.module.css';

export default function Results({ data, query, onReset }) {
  const [flightTab, setFlightTab] = useState('economy');

  return (
    <div className={s.page}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerInner}>
          <button className={s.back} onClick={onReset} aria-label="New search">
            <ChevronLeft /> New trip
          </button>
          <span className={s.logoSmall}>Waypoint</span>
        </div>
      </header>

      <main className={s.main}>
        {/* Overview */}
        <section className={s.overview}>
          <p className={s.route}>
            {query?.origin} <span className={s.arrow}>→</span> {query?.destination}
          </p>
          <p className={s.overviewText}>{data.overview}</p>
        </section>

        {/* Flights */}
        <Section title="Flights">
          <div className={s.tabs}>
            <button
              className={`${s.tab} ${flightTab === 'economy' ? s.tabActive : ''}`}
              onClick={() => setFlightTab('economy')}
            >Economy</button>
            <button
              className={`${s.tab} ${flightTab === 'first_class' ? s.tabActive : ''}`}
              onClick={() => setFlightTab('first_class')}
            >First Class</button>
          </div>

          <div className={s.flightGrid}>
            {(data.flights?.[flightTab] || []).map((f, i) => (
              <FlightCard key={i} flight={f} />
            ))}
          </div>

          {data.flights?.recommendation && (
            <div className={s.recommendation}>
              <span className={s.recLabel}>Recommendation</span>
              <p className={s.recText}>{data.flights.recommendation}</p>
            </div>
          )}
        </Section>

        {/* Hotels */}
        <Section title="Hotels">
          <div className={s.hotelGrid}>
            {(data.hotels || []).map((h, i) => (
              <HotelCard key={i} hotel={h} />
            ))}
          </div>
          {data.hotel_recommendation && (
            <div className={s.recommendation}>
              <span className={s.recLabel}>Recommendation</span>
              <p className={s.recText}>{data.hotel_recommendation}</p>
            </div>
          )}
        </Section>

        {/* Itinerary */}
        <Section title="Itinerary">
          <div className={s.itinerary}>
            {(data.itinerary || []).map((day, i) => (
              <DayCard key={i} day={day} index={i} />
            ))}
          </div>
        </Section>

        {/* Highlights */}
        {data.highlights?.length > 0 && (
          <Section title="Don't miss">
            <div className={s.highlights}>
              {data.highlights.map((h, i) => (
                <div key={i} className={s.highlight}>
                  <span className={s.highlightNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className={s.highlightName}>{h.name}</p>
                    <p className={s.highlightReason}>{h.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Budget */}
        {data.budget && (
          <Section title="Estimated budget">
            <BudgetBreakdown budget={data.budget} />
          </Section>
        )}

        {/* Practical notes */}
        {data.practical_notes && (
          <Section title="Good to know">
            <div className={s.notes}>
              {data.practical_notes.booking_advice && (
                <Note label="Booking" text={data.practical_notes.booking_advice} />
              )}
              {data.practical_notes.transportation && (
                <Note label="Getting around" text={data.practical_notes.transportation} />
              )}
              {data.practical_notes.group_notes && (
                <Note label="Group" text={data.practical_notes.group_notes} />
              )}
            </div>
          </Section>
        )}
      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className={s.section}>
      <h2 className={s.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function formatTime(raw) {
  if (!raw) return raw;
  // Handle ISO datetime or plain time strings
  const d = raw.includes('T') ? new Date(raw) : new Date(`1970-01-01T${raw}`);
  if (isNaN(d)) return raw;
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function FlightCard({ flight }) {
  return (
    <div className={s.flightCard}>
      <div className={s.flightTop}>
        <span className={s.airline}>{flight.airline}</span>
        <span className={s.flightNum}>{flight.flight_number}</span>
      </div>
      <div className={s.flightTimes}>
        <span className={s.time}>{formatTime(flight.departure_time)}</span>
        <span className={s.flightArrow}>→</span>
        <span className={s.time}>{formatTime(flight.arrival_time)}</span>
      </div>
      <div className={s.flightMeta}>
        <span>{flight.duration}</span>
        <span className={s.dot}>·</span>
        <span>{flight.stops}</span>
      </div>
      {flight.perks && <p className={s.perks}>{flight.perks}</p>}
      <div className={s.flightBottom}>
        <span className={s.price}>${flight.price_per_person?.toLocaleString()}<small>/person</small></span>
        {flight.notes && <span className={s.flightNote}>{flight.notes}</span>}
      </div>
    </div>
  );
}

function HotelCard({ hotel }) {
  return (
    <div className={s.hotelCard}>
      <div className={s.hotelTop}>
        <div>
          <p className={s.hotelName}>{hotel.name}</p>
          <p className={s.hotelNeighborhood}>{hotel.neighborhood}</p>
        </div>
        <Stars count={hotel.stars} />
      </div>
      {hotel.amenities?.length > 0 && (
        <div className={s.amenities}>
          {hotel.amenities.slice(0, 4).map((a, i) => (
            <span key={i} className={s.amenity}>{a}</span>
          ))}
        </div>
      )}
      <p className={s.hotelDesc}>{hotel.description}</p>
      <div className={s.hotelBottom}>
        <span className={s.price}>${hotel.price_per_night?.toLocaleString()}<small>/night</small></span>
        {hotel.best_for && <span className={s.bestFor}>{hotel.best_for}</span>}
      </div>
    </div>
  );
}

function Stars({ count }) {
  return (
    <span className={s.stars} aria-label={`${count} stars`}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  );
}

function DayCard({ day, index }) {
  return (
    <div className={s.dayCard}>
      <div className={s.dayHeader}>
        <span className={s.dayIndex}>{String(index + 1).padStart(2, '0')}</span>
        <div>
          <p className={s.dayLabel}>{day.label}</p>
          <p className={s.dayDate}>{day.date}{day.weather ? ` · ${day.weather}` : ''}</p>
        </div>
      </div>
      <div className={s.dayBody}>
        {day.morning && <TimeBlock period="Morning" text={day.morning} />}
        {day.afternoon && <TimeBlock period="Afternoon" text={day.afternoon} />}
        {day.evening && <TimeBlock period="Evening" text={day.evening} />}
      </div>
    </div>
  );
}

function TimeBlock({ period, text }) {
  return (
    <div className={s.timeBlock}>
      <span className={s.period}>{period}</span>
      <p className={s.periodText}>{text}</p>
    </div>
  );
}

function BudgetBreakdown({ budget }) {
  const lines = [
    { label: 'Flights',              val: budget.flights },
    { label: 'Hotel',                val: budget.hotel },
    { label: 'Activities & dining',  val: budget.activities_and_dining },
    { label: 'Transport',            val: budget.transport },
  ].filter((l) => l.val);

  return (
    <div className={s.budget}>
      {lines.map((l, i) => (
        <div key={i} className={s.budgetRow}>
          <span className={s.budgetLabel}>{l.label}</span>
          <span className={s.budgetVal}>${l.val?.toLocaleString()}</span>
        </div>
      ))}
      {budget.total && (
        <div className={`${s.budgetRow} ${s.budgetTotal}`}>
          <span>Total estimate</span>
          <span>${budget.total?.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}

function Note({ label, text }) {
  return (
    <div className={s.note}>
      <span className={s.noteLabel}>{label}</span>
      <p className={s.noteText}>{text}</p>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
