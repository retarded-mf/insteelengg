import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* ─── Timeline Data ──────────────────────────────────────────
   imageProgress = construction / fabrication phase
   imageFinished = completed / delivered structure
   stats are marked [placeholder] — swap in real figures
──────────────────────────────────────────────────────────── */
const timelineData = [
  {
    year: '2006',
    projects: [
      {
        name: 'Insteel Engineering Founded',
        category: 'Company Milestone',
        imageProgress:
          'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=900',
        imageFinished:
          'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=900',
        stats: [
          { label: 'Core Service', value: 'Steel Design' },
          { label: 'Headquarters', value: 'Mumbai' },
        ],
      },
    ],
  },
  {
    year: '2015',
    projects: [
      {
        name: 'First Full EPC Project',
        category: 'First Full EPC Project',
        imageProgress:
          'https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?auto=format&fit=crop&q=80&w=900',
        imageFinished:
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=900',
        stats: [
          { label: 'Steel Erected', value: '[placeholder] MT' },
          { label: 'Duration', value: '[placeholder] Months' },
        ],
      },
    ],
  },
  {
    year: '2018',
    projects: [
      {
        name: 'Gandhinagar Railway Station',
        category: 'Railway Stations',
        imageProgress:
          'https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=900',
        imageFinished:
          'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=900',
        stats: [
          { label: 'Steel Erected', value: '[placeholder] MT' },
          { label: 'Duration', value: '[placeholder] Months' },
        ],
      },
    ],
  },
  {
    year: '2020',
    projects: [
      {
        name: 'Madinah Airport',
        category: 'Airports — First International',
        imageProgress:
          'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=900',
        imageFinished:
          'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=900',
        stats: [
          { label: 'Steel Erected', value: '[placeholder] MT' },
          { label: 'Duration', value: '[placeholder] Months' },
        ],
      },
    ],
  },
  {
    year: '2023',
    projects: [
      {
        name: 'Godrej Play Bridge, Mumbai',
        category: 'Connecting Bridges',
        imageProgress:
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=900',
        imageFinished:
          'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=900',
        stats: [
          { label: 'Steel Erected', value: '[placeholder] MT' },
          { label: 'Duration', value: '[placeholder] Months' },
        ],
      },
    ],
  },
  {
    year: '2026',
    projects: [
      {
        name: 'Lucknow Airport',
        category: 'Airports',
        imageProgress:
          'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=900',
        imageFinished:
          'https://images.unsplash.com/photo-1473876637954-4b493d59fd97?auto=format&fit=crop&q=80&w=900',
        stats: [
          { label: 'Steel Erected', value: '[placeholder] MT' },
          { label: 'Duration', value: '[placeholder] Months' },
        ],
      },
    ],
  },
];

/* ─── Component ─────────────────────────────────────────── */

const TimelineShowcase = () => {
  const [activeYear, setActiveYear] = useState('2018');

  const activeIndex = timelineData.findIndex((e) => e.year === activeYear);
  const activeEntry = timelineData[activeIndex];

  // Red line fills left-to-active-dot proportionally
  const progressPct =
    activeIndex === 0
      ? 0
      : (activeIndex / (timelineData.length - 1)) * 100;

  return (
    <section className="py-24 bg-blue-grey">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* ── Section Header ─────────────────────────────── */}
        <div className="text-center mb-20 reveal-on-scroll">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            Two Decades of Delivery
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-charcoal uppercase tracking-tighter leading-none mb-4">
            What We've Built
          </h2>
          <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">
            Landmark structures across India and beyond — delivered end-to-end
          </p>
        </div>

        {/* ── Project Cards — keyed to year so animation re-fires ── */}
        <div
          key={activeYear}
          className={`animate-in fade-in slide-in-from-bottom-4 duration-500 mb-16 ${activeEntry.projects.length === 1
              ? 'w-full'
              : 'grid grid-cols-1 lg:grid-cols-2 gap-4'
            }`}
        >
          {activeEntry.projects.map((project, i) => (
            <div
              key={i}
              className="group relative overflow-hidden h-[680px] cursor-default bg-charcoal"
            >
              {/* ── Single full-width project image ── */}
              <img
                src={project.imageFinished}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Vignette Overlay for readability of white text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/35" />

              {/* ── Info bar — always visible at bottom, spans full width ── */}
              <div className="absolute bottom-0 left-0 right-0 px-8 py-7 bg-transparent">
                <span className="text-primary-red font-black text-[10px] uppercase tracking-[0.4em] block mb-2">
                  {project.category}
                </span>
                <h3 className="text-white font-black text-2xl md:text-3xl uppercase tracking-tighter leading-tight mb-5">
                  {project.name}
                </h3>

                {/* Stats — slide up and fade in on hover */}
                <div className="flex items-end gap-8 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {project.stats.map((stat, j) => (
                    <div key={j}>
                      <div className="text-white font-black text-xl leading-none">
                        {stat.value}
                      </div>
                      <div className="text-white/40 font-black text-[9px] uppercase tracking-widest mt-1.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                  <Link
                    to="/projects"
                    className="ml-auto text-white/40 hover:text-white font-black text-[9px] uppercase tracking-widest transition-colors"
                  >
                    All Projects →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Interactive Timeline Bar — below cards ──────────── */}
        <div className="relative reveal-on-scroll">
          {/* Track container running from first dot center to last dot center */}
          <div className="absolute top-[9px] left-[9px] right-[9px] h-[2px]">
            {/* Base track */}
            <div className="absolute inset-0 bg-charcoal/10" />

            {/* Red progress fill */}
            <div
              className="absolute inset-y-0 left-0 bg-primary-red transition-all duration-500 ease-in-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Year buttons */}
          <div className="relative flex justify-between">
            {timelineData.map((entry) => {
              const isActive = entry.year === activeYear;
              return (
                <button
                  key={entry.year}
                  type="button"
                  onClick={() => setActiveYear(entry.year)}
                  className="relative flex flex-col items-center group focus:outline-none w-[18px] h-[18px]"
                  aria-label={`Show ${entry.year} projects`}
                >
                  {/* Dot */}
                  <div
                    className={`w-[18px] h-[18px] rounded-full border-2 z-10 transition-all duration-300 ${isActive
                        ? 'bg-primary-red border-primary-red shadow-[0_0_16px_rgba(204,0,0,0.55)]'
                        : 'bg-white border-charcoal/20 group-hover:border-primary-red'
                      }`}
                  />
                  {/* Year label — absolutely positioned to not affect button width */}
                  <span
                    className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-black text-[11px] uppercase tracking-widest transition-colors duration-300 ${isActive
                        ? 'text-primary-red'
                        : 'text-charcoal/40 group-hover:text-charcoal'
                      }`}
                  >
                    {entry.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TimelineShowcase;
