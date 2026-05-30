import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditText, EditImage } from './Editable';
import { SectionManager } from './SectionManager';
import { useAdmin } from '../context/AdminContext';
import { supabase } from '../lib/supabase';

const DEFAULT_SLIDES = [
  { id: 'hero_slide_0', image: 'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=1920', objectPosition: 'center 20%', link: '/projects' },
  { id: 'hero_slide_1', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920', objectPosition: 'center', link: '/projects' },
  { id: 'hero_slide_2', image: '/src/assets/images/projects/composite/composite_coe-1.jpg', objectPosition: 'top', link: '/projects' },
  { id: 'hero_slide_3', image: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1920', objectPosition: 'center', link: '/projects' },
  { id: 'hero_slide_4', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=1920', objectPosition: 'center 30%', link: '/projects' },
  { id: 'hero_slide_5', image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1920', objectPosition: 'center 40%', link: '/projects' },
];

/* Build ordered set of slide indices to keep mounted: current + adjacent */
function getVisibleIndices(current, total) {
  if (total === 0) return [];
  const prev = current === 0 ? total - 1 : current - 1;
  const next = current >= total - 1 ? 0 : current + 1;
  return [...new Set([prev, current, next])];
}

const fetchSlides = async () => {
  const { data: imgRows } = await supabase
    .from('content')
    .select('id,element, url, position, sequence')
    .eq('pagename', 'home')
    .eq('sectionno', 1)
    .eq('type', 'image')
    .order('sequence');

  if (!imgRows || imgRows.length === 0) return [];

  const textIds = imgRows.flatMap(r => {
    const base = r.element.replace('_img', '');
    return [`${base}_title`, `${base}_category`, `${base}_statement`];
  });
  const { data: textRows } = await supabase.from('content').select('element, url').in('element', textIds);
  const textMap = {};
  (textRows || []).forEach(r => { textMap[r.element] = r.url; });

  return imgRows.map(row => {
    const base = row.element.replace('_img', '');
    return {
      id: base,
      dbId: row.element,
      numericId: row.id,
      image: row.url,
      objectPosition: row.position || 'center',
      link: '/projects',
      title: textMap[`${base}_title`] || 'Slide Title',
      category: textMap[`${base}_category`] || 'Category',
      statement: textMap[`${base}_statement`] || 'Slide Statement',
    };
  });
};

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const { isAdminActive } = useAdmin();
  const [isPaused, setIsPaused] = useState(false);
  const [slides, setSlides] = useState(DEFAULT_SLIDES);

  // Clamp current index whenever slides array changes (add/delete)
  useEffect(() => {
    setCurrent(prev => {
      if (slides.length === 0) return 0;
      if (prev >= slides.length) return slides.length - 1;
      return prev;
    });
  }, [slides]);

  // Fetch slides from Supabase on mount
  useEffect(() => {
    fetchSlides().then(rows => { if (rows.length > 0) setSlides(rows); });
  }, []);

  const total = slides.length;
  const next = useCallback(() => setCurrent(prev => (total === 0 ? 0 : prev >= total - 1 ? 0 : prev + 1)), [total]);
  const prevSlide = useCallback(() => setCurrent(prev => (total === 0 ? 0 : prev === 0 ? total - 1 : prev - 1)), [total]);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused || total === 0) return;
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [isPaused, total, next]);

  // Only keep current + adjacent slides mounted to reduce GPU load
  const visibleIndices = getVisibleIndices(current, total);

  const refreshSlides = useCallback(() => {
    fetchSlides().then(rows => { if (rows.length > 0) setSlides(rows); });
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-charcoal">

      {/* Admin Section Manager for Hero Slides */}
      <SectionManager
        pageName="home"
        type="image"
        idPrefix="hero_slide"
        sectionno={1}
        items={slides}
        label="Manage Hero Slides"
        wrapperClassName="absolute top-40 right-6 z-50"
        renderItemLabel={(item) => item.title || 'Hero Slide'}
        onUpdate={refreshSlides}
      />

      {/* ── Universal Brand Statement — clears the h-32 fixed navbar ── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex flex-col items-center pt-48 pointer-events-none px-6 text-center">
        <p className="text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.6em] opacity-65 mb-1.5 pointer-events-auto">
          <EditText id="hero_brand_tagline" defaultValue="India's Structural Steel EPC Partner" />
        </p>
        <div className="flex items-center gap-3 justify-center pointer-events-auto">
          <span className="w-6 h-[1px] bg-primary-red/80" />
          <p className="text-white font-black text-xs md:text-sm lg:text-base uppercase tracking-[0.2em] drop-shadow-md">
            <EditText id="hero_brand_statement" defaultValue="Every Project, On Time, Without Compromise." />
          </p>
          <span className="w-6 h-[1px] bg-primary-red/80" />
        </div>
      </div>

      {/*
        Performance: only render prev/current/next slides.
        Hidden slides are unmounted entirely — no GPU cost from off-screen images or admin overlays.
      */}
      {slides.map((slide, index) => {
        const isCurrent = index === current;
        const isMounted = visibleIndices.includes(index);

        if (!isMounted) return null;

        return (
          <div
            key={slide.id || index}
            className="absolute inset-0"
            style={{
              opacity: isCurrent ? 1 : 0,
              zIndex: isCurrent ? 10 : 0,
              transition: 'opacity 1000ms ease-in-out',
              pointerEvents: isCurrent ? 'auto' : 'none',
            }}
          >
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

            {/* Image — zoom only on active slide to prevent off-screen GPU animations */}
            <div
              className="absolute inset-0 z-0"
              style={{
                transform: isCurrent ? 'scale(1.1)' : 'scale(1)',
                transition: isCurrent ? 'transform 10000ms linear' : 'none',
              }}
            >
              <EditImage
                id={`${slide.id}_img`}
                defaultUrl={slide.image}
                alt={slide.title || ''}
                style={{ objectPosition: slide.objectPosition || 'center' }}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 md:px-24 pointer-events-none">
              <div className="max-w-4xl animate-in fade-in slide-in-from-left-8 duration-1000 pointer-events-auto">
                <h3 className="text-white font-black text-sm md:text-lg lg:text-xl uppercase tracking-[0.5em] mb-4 opacity-90 border-l-2 border-primary-red pl-4 drop-shadow-md">
                  <EditText id={`${slide.id}_category`} defaultValue={slide.category || ''} />
                </h3>
                <h2 className="text-5xl md:text-8xl font-black text-white mb-10 leading-none uppercase tracking-tighter drop-shadow-2xl">
                  <EditText id={`${slide.id}_title`} defaultValue={slide.title || ''} />
                </h2>
                <Link to={slide.link} className="group inline-flex items-center space-x-4">
                  <span className="w-12 h-[2px] bg-white group-hover:w-20 group-hover:bg-primary-red group-hover:translate-x-2 transition-all duration-500" />
                  <span className="text-white font-black uppercase text-xs tracking-[0.4em] group-hover:text-primary-red transition-colors">View Project</span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Controls */}
      <button
        type="button"
        onClick={prevSlide}
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

      {/* Slide counter — bottom right (admin only) */}
      {isAdminActive && (
        <div className="absolute bottom-6 right-12 z-30 text-white/40 font-black text-xs uppercase tracking-widest flex items-center gap-4 select-none">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 bg-black/40 hover:bg-black/60 rounded border border-white/10 hover:border-primary-red transition-all text-white flex items-center justify-center pointer-events-auto"
            title={isPaused ? "Play Carousel" : "Pause Carousel"}
          >
            {isPaused ? <Play size={10} fill="white" /> : <Pause size={10} fill="white" />}
          </button>
          <span>
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      )}

      {/* Progress Segments — inset from edges, one per slide */}
      <div className="absolute bottom-4 left-12 right-12 md:left-24 md:right-24 z-40 flex gap-1.5">
        {slides.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-[3.5px] rounded-full transition-colors duration-300"
            style={{ backgroundColor: i === current ? '#CC0000' : 'rgba(255,255,255,0.25)' }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
