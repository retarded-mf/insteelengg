import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    category: "Railway Stations",
    title: "Gandhinagar Railway Station",
    image: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=1920",
    link: "/projects",
    objectPosition: "center 20%",
    statement: "On time, On spec. No exceptions.",
  },
  {
    category: "High-Rise Steel Buildings",
    title: "Pune - Nyati Plaza",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920",
    link: "/projects",
    objectPosition: "center",
    statement: "From drawing to delivery — one team.",
  },
  {
    category: "Special Structures",
    title: "Center of Excellence, Ahemdabad",
    image: "/src/assets/images/projects/composite/composite_coe-1.jpg",
    link: "/projects",
    objectPosition: "top",
    statement: "Research-led, Precision-built.",
  },
  {
    category: "High-Rise Steel Buildings",
    title: "TCS Sahyadri Park, Mumbai",
    image: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1920",
    link: "/projects",
    objectPosition: "center",
    statement: "Large-scale steel, Delivered without compromise.",
  },
  {
    category: "Airports",
    title: "Lucknow Airport",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=1920",
    link: "/projects",
    objectPosition: "center 30%",
    statement: "Complex structures, Seamless execution.",
  },
  {
    category: "Connecting Bridges",
    title: "Godrej Play Bridge, Mumbai",
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1920",
    link: "/projects",
    objectPosition: "center 40%",
    statement: "Engineering beyond the blueprint.",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-charcoal">

      {/* ── Universal Brand Statement — clears the h-32 fixed navbar ── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex flex-col items-center pt-48 pointer-events-none px-6 text-center">
        <p className="text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.6em] opacity-65 mb-1.5">
          India's Structural Steel EPC Partner
        </p>
        <div className="flex items-center gap-3 justify-center">
          <span className="w-6 h-[1px] bg-primary-red/80" />
          <p className="text-white font-black text-xs md:text-sm lg:text-base uppercase tracking-[0.2em] drop-shadow-md">
            Every Project. On Time. Without Compromise.
          </p>
          <span className="w-6 h-[1px] bg-primary-red/80" />
        </div>
      </div>

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 z-10" />
          <div className="absolute inset-0 bg-black/10 z-10" />

          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title}
            style={{ objectPosition: slide.objectPosition || 'center' }}
            className={`h-full w-full object-cover transition-transform duration-[10000ms] ease-linear ${index === current && !slide.noZoom ? 'scale-110' : 'scale-100'}`}
          />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 md:px-24">
            {/* Main slide text — left-anchored and vertically centered */}
            <div className="max-w-4xl animate-in fade-in slide-in-from-left-8 duration-1000">
              <h3 className="text-white font-black text-sm md:text-lg lg:text-xl uppercase tracking-[0.5em] mb-4 opacity-90 border-l-2 border-primary-red pl-4">
                {slide.category}
              </h3>
              <h2 className="text-5xl md:text-8xl font-black text-white mb-10 leading-none uppercase tracking-tighter drop-shadow-2xl">
                {slide.title}
              </h2>
              <Link to={slide.link} className="group inline-flex items-center space-x-4">
                <span className="w-12 h-[2px] bg-white group-hover:w-20 group-hover:bg-primary-red group-hover:translate-x-2 transition-all duration-500" />
                <span className="text-white font-black uppercase text-xs tracking-[0.4em] group-hover:text-primary-red transition-colors">View Project</span>
              </Link>
            </div>
          </div>

          {/* Per-slide statement — absolutely positioned at bottom center */}
          {slide.statement && (
            <div className="absolute bottom-12 left-0 right-0 z-30 text-center animate-in fade-in duration-1000 delay-500">
              <span className="inline-block border-t border-white/20 pt-4 text-white/70 font-black text-[10px] md:text-xs uppercase tracking-[0.4em]">
                {slide.statement}
              </span>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Controls */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 group flex items-center text-white/50 hover:text-white transition-colors"
      >
        <ChevronLeft size={40} className="group-hover:-translate-x-1 transition-transform" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 group flex items-center text-white/50 hover:text-white transition-colors"
      >
        <ChevronRight size={40} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Slide counter — bottom right */}
      <div className="absolute bottom-6 right-12 z-30 text-white/40 font-black text-xs uppercase tracking-widest">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Progress Segments — inset from edges, one per slide */}
      <div className="absolute bottom-4 left-12 right-12 md:left-24 md:right-24 z-40 flex gap-1.5">
        {slides.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-[2px] rounded-full transition-colors duration-300"
            style={{ backgroundColor: i === current ? '#CC0000' : 'rgba(255,255,255,0.25)' }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
