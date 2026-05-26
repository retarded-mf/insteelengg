import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    category: "Outstanding Structures",
    title: "Pondicherry Convention Centre",
    image: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=1920",
    link: "/projects"
  },
  {
    category: "High-Rise Steel Buildings",
    title: "Nyati Plaza - Pune",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920",
    link: "/projects"
  },
  {
    category: "Critical Infrastructure",
    title: "Panvel Connecting Bridge",
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1920",
    link: "/projects"
  }
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
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />
          <div className="absolute inset-0 bg-black/10 z-10 shadow-[inner_0_0_100px_rgba(0,0,0,0.5)]" />
          
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className={`h-full w-full object-cover transition-transform duration-[10000ms] ease-linear ${index === current ? 'scale-110' : 'scale-100'}`}
          />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 md:px-24">
            <div className="max-w-4xl animate-in fade-in slide-in-from-left-8 duration-1000">
              <h3 className="text-white font-black text-xs md:text-sm uppercase tracking-[0.6em] mb-4 opacity-80 border-l-2 border-primary-red pl-4">
                {slide.category}
              </h3>
              <h1 className="text-5xl md:text-8xl font-black text-white mb-10 leading-none uppercase tracking-tighter drop-shadow-2xl">
                {slide.title}
              </h1>
              <Link to={slide.link} className="group inline-flex items-center space-x-4">
                <span className="w-12 h-[2px] bg-white group-hover:w-20 group-hover:bg-primary-red transition-all duration-500" />
                <span className="text-white font-black uppercase text-xs tracking-[0.4em] group-hover:text-primary-red transition-colors">View Project</span>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-12 z-30 flex items-center space-x-6">
        <button
          onClick={prev}
          className="group flex items-center space-x-2 text-white/40 hover:text-white transition-colors"
        >
          <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Prev</span>
        </button>
        <div className="w-[1px] h-8 bg-white/20" />
        <button
          onClick={next}
          className="group flex items-center space-x-2 text-white/40 hover:text-white transition-colors"
        >
          <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Next</span>
          <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 h-1 bg-primary-red z-40 transition-all duration-8000 ease-linear" style={{ width: `${((current + 1) / slides.length) * 100}%` }} />
    </div>
  );
};

export default HeroCarousel;
