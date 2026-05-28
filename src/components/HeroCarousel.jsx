import React, { useState, useEffect } from 'react';
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

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const { isAdminActive, getContent } = useAdmin();
  const [isPaused, setIsPaused] = useState(false);
  const [slides, setSlides] = useState(DEFAULT_SLIDES);

  // Fetch slide image rows from Supabase, build slides list
  useEffect(() => {
    const fetchSlides = async () => {
      const { data: imgRows } = await supabase
        .from('content')
        .select('id, url, position, sequence')
        .eq('pagename', 'home')
        .eq('sectionno', 1)
        .eq('type', 'image')
        .order('sequence');

      if (!imgRows || imgRows.length === 0) {
        setSlides([]);
        return;
      }

      const textIds = imgRows.flatMap(r => {
        const base = r.id.replace('_img', '');
        return [`${base}_title`, `${base}_category`, `${base}_statement`];
      });
      const { data: textRows } = await supabase.from('content').select('id, url').in('id', textIds);
      const textMap = {};
      (textRows || []).forEach(r => { textMap[r.id] = r.url; });

      setSlides(imgRows.map(row => {
        const base = row.id.replace('_img', '');
        return {
          id: base,
          dbId: row.id,
          image: row.url,
          objectPosition: row.position || 'center',
          link: '/projects',
          title: textMap[`${base}_title`] || 'Slide Title',
          category: textMap[`${base}_category`] || 'Category',
          statement: textMap[`${base}_statement`] || 'Slide Statement',
        };
      }));
    };
    fetchSlides();
  }, []);

  const next = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-charcoal">

      {/* Admin Section Manager for Hero Slides */}
      <SectionManager
        pageName="home"
        type="image"
        sectionno={1}
        items={slides}
        label="Manage Hero Slides"
        wrapperClassName="absolute top-40 right-6 z-50"
        renderItemLabel={(item) => item.title || 'Hero Slide'}
        onUpdate={() => {
          // hacky way to force fetch without dependency loop
          supabase
            .from('content')
            .select('id, url, position, sequence')
            .eq('pagename', 'home')
            .eq('sectionno', 1)
            .eq('type', 'image')
            .order('sequence')
            .then(({ data: imgRows }) => {
               if (!imgRows || imgRows.length === 0) { setSlides([]); return; }
               const textIds = imgRows.flatMap(r => { const base = r.id.replace('_img', ''); return [`${base}_title`, `${base}_category`, `${base}_statement`]; });
               supabase.from('content').select('id, url').in('id', textIds).then(({ data: textRows }) => {
                 const textMap = {};
                 (textRows || []).forEach(r => { textMap[r.id] = r.url; });
                 setSlides(imgRows.map(row => {
                   const base = row.id.replace('_img', '');
                   return {
                     id: base, dbId: row.id, image: row.url, objectPosition: row.position || 'center', link: '/projects',
                     title: textMap[`${base}_title`] || 'Slide Title', category: textMap[`${base}_category`] || 'Category', statement: textMap[`${base}_statement`] || 'Slide Statement',
                   };
                 }));
               });
            });
        }}
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

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

          {/* Image */}
          <div className="absolute inset-0 z-0">
            <EditImage
              id={slide.dbId || `${slide.id}_img`}
              defaultUrl={slide.image}
              alt={slide.title || ''}
              style={{ objectPosition: slide.objectPosition || 'center' }}
              className={`h-full w-full object-cover transition-transform duration-[10000ms] ease-linear ${index === current && !slide.noZoom ? 'scale-110' : 'scale-100'}`}
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 md:px-24 pointer-events-none">
            {/* Main slide text — left-anchored and vertically centered */}
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
      <div className="absolute bottom-6 right-12 z-30 text-white/40 font-black text-xs uppercase tracking-widest flex items-center gap-4 select-none">
        {isAdminActive && (
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 bg-black/40 hover:bg-black/60 rounded border border-white/10 hover:border-primary-red transition-all text-white flex items-center justify-center pointer-events-auto"
            title={isPaused ? "Play Carousel" : "Pause Carousel"}
          >
            {isPaused ? <Play size={10} fill="white" /> : <Pause size={10} fill="white" />}
          </button>
        )}
        <span>
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
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
