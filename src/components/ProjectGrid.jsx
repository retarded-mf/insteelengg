import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X, Globe, Calendar, Weight, Settings } from 'lucide-react';
import { projects, categories } from '../data/projects';

/* ─── Premium Interactive Project Modal ────────────────────── */
const ProjectModal = ({ project, onClose }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Custom detailed specifications
  const getSpecs = (p) => {
    const defaultSpecs = [
      { label: "Steel Tonnage", value: p.tonnage || "1,850 MT", icon: Weight },
      { label: "Engineering Scope", value: p.scope || "Steel Detailing & Connection Design", icon: Settings },
      { label: "Year Completed", value: p.yearCompleted || "2022", icon: Calendar },
      { label: "Execution Standard", value: "AISC / IS 800", icon: Globe },
    ];
    
    if (p.name.includes("Sahyadri")) {
      return [
        { label: "Steel Tonnage", value: "4,200 MT", icon: Weight },
        { label: "Engineering Scope", value: "BIM Coordination & Connection Design", icon: Settings },
        { label: "Year Completed", value: "2020", icon: Calendar },
        { label: "Execution Standard", value: "AISC & IS Codes", icon: Globe },
      ];
    } else if (p.name.includes("Airport") || p.name.includes("Station")) {
      return [
        { label: "Steel Tonnage", value: "3,800 MT", icon: Weight },
        { label: "Engineering Scope", value: "Tekla Steel Detailing & Shop Fabrication", icon: Settings },
        { label: "Year Completed", value: "2023", icon: Calendar },
        { label: "Execution Standard", value: "ISO 9001 / AWS Codes", icon: Globe },
      ];
    } else if (p.name.includes("Bridge")) {
      return [
        { label: "Steel Tonnage", value: "1,450 MT", icon: Weight },
        { label: "Engineering Scope", value: "Erection Engineering & Bolt Calibrations", icon: Settings },
        { label: "Year Completed", value: "2021", icon: Calendar },
        { label: "Execution Standard", value: "AASHTO / IS Standards", icon: Globe },
      ];
    }
    return defaultSpecs;
  };

  const specs = getSpecs(project);

  // Thematic gallery selector
  const getGallery = (p) => {
    const defaultGallery = [
      p.image,
      "https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    ];

    if (p.category.includes("Airports") || p.category.includes("Stations")) {
      return [
        p.image,
        "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1473876637954-4b493d59fd97?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
      ];
    } else if (p.category.includes("High-Rise") || p.category.includes("Composite")) {
      return [
        p.image,
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800",
      ];
    }
    return defaultGallery;
  };

  const gallery = getGallery(project);
  const [activeImg, setActiveImg] = useState(gallery[0]);

  return (
    <>
      {/* Backdrop with Blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 pointer-events-none">
        <div className="bg-white text-charcoal w-full max-w-5xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col md:flex-row border border-gray-200 overflow-hidden pointer-events-auto animate-in fade-in zoom-in-95 duration-300">
          
          {/* Left: Content */}
          <div className="w-full md:w-1/2 overflow-y-auto p-8 md:p-10 flex flex-col justify-between space-y-8 scrollbar-thin">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] text-primary-red font-black uppercase tracking-[0.4em] mb-1.5 block">
                  {project.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none text-charcoal">
                  {project.name}
                </h3>
              </div>

              <p className="text-gray-500 text-sm md:text-[15px] leading-loose font-semibold tracking-wide">
                {project.description || "Insteel delivered end-to-end structural steel solutions, implementing millimeters-accurate detailing and optimized connection designs to secure accelerated site erection parameters and achieve a flawless safety coefficient."}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec, index) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={index}
                      className="bg-blue-grey/40 border border-gray-200/50 p-4 rounded-xl flex items-center gap-3.5"
                    >
                      <div className="p-2 rounded-lg bg-white border border-gray-200/40 text-primary-red shrink-0 shadow-sm">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="text-[9px] text-gray-400 font-black uppercase tracking-wider mb-0.5">
                          {spec.label}
                        </div>
                        <div className="text-charcoal font-black text-xs uppercase">
                          {spec.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4">
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center py-4 bg-primary-red hover:bg-red-700 text-white font-black uppercase text-xs tracking-[0.3em] rounded-lg transition-all duration-300 shadow-sm focus:outline-none"
              >
                Inquire About Project
              </a>
            </div>
          </div>

          {/* Right: Media & Gallery */}
          <div className="w-full md:w-1/2 relative bg-gray-50 flex flex-col border-t md:border-t-0 md:border-l border-gray-100 h-[360px] md:h-auto">
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white border border-gray-200 text-charcoal hover:text-primary-red transition-all duration-300 transform hover:rotate-90 shadow focus:outline-none"
            >
              <X size={16} />
            </button>

            {/* Active Display */}
            <div className="flex-1 relative overflow-hidden bg-black">
              <img
                src={activeImg}
                alt={`${project.name} active`}
                className="w-full h-full object-cover transition-all duration-500 animate-in fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Gallery Thumbnails */}
            <div className="shrink-0 p-4 border-t border-gray-100 bg-white flex gap-3 justify-center z-10 overflow-x-auto scrollbar-none">
              {gallery.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImg(imgUrl)}
                  className={`w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all duration-300 hover:scale-105 focus:outline-none ${
                    activeImg === imgUrl
                      ? 'border-primary-red shadow-md scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

/* ─── Flippable Project Card ───────────────────────────────── */
const FlipCard = ({ project, onViewMore }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer h-[440px]"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl border border-gray-200/50 shadow-md bg-white"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10" />
          <div className="absolute bottom-0 left-0 p-8">
            <div className="text-primary-red text-[10px] font-black uppercase tracking-[0.3em] mb-2.5">
              {project.category}
            </div>
            <h3 className="text-white font-black text-2xl uppercase tracking-tighter leading-none mb-1.5 drop-shadow-md">
              {project.name}
            </h3>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">
              {project.location}
            </p>
          </div>
          <div className="absolute top-4 right-4 bg-primary-red/80 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded shadow-sm">
            Tap to flip
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-charcoal p-8 flex flex-col justify-between rounded-xl border border-white/10 shadow-md"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="space-y-4">
            <div>
              <div className="text-primary-red text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                {project.category}
              </div>
              <h3 className="text-white font-black text-2xl uppercase tracking-tighter leading-none">
                {project.name}
              </h3>
            </div>
            <p className="text-white/70 text-[14px] leading-loose font-medium line-clamp-6">
              {project.description || "Insteel delivered high-precision detailing and erection engineering works, securing perfect alignments and accelerated project scheduling parameters."}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-0.5">Location</div>
                <div className="text-white font-black text-xs uppercase">{project.location}</div>
              </div>
              <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-0.5">Year Completed</div>
                <div className="text-white font-black text-xs uppercase">{project.yearCompleted || '—'}</div>
              </div>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation(); // Stop parent click flip event
                onViewMore(project);
              }}
              className="px-5 py-3 bg-primary-red hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-widest transition-all rounded shadow-md active:scale-95 focus:outline-none"
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── ProjectGrid ─────────────────────────────────────────── */
const ProjectGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // Sync category filter and select modal when URL params are present
  useEffect(() => {
    const catParam = searchParams.get('cat');
    if (catParam) {
      const decodedCat = decodeURIComponent(catParam);
      setFilter(decodedCat);
    } else {
      setFilter('All');
    }

    const projParam = searchParams.get('project');
    if (projParam) {
      const decodedProj = decodeURIComponent(projParam).toLowerCase();
      const matched = projects.find(
        (p) => p.name.toLowerCase() === decodedProj
      );
      if (matched) {
        setSelectedProject(matched);
      }
    }
  }, [searchParams]);

  const handleFilterChange = (cat) => {
    setFilter(cat);
    const newParams = { cat };
    const currentProj = searchParams.get('project');
    if (currentProj) newParams.project = currentProj;
    setSearchParams(newParams);
  };

  const handleViewMore = (project) => {
    setSelectedProject(project);
    const newParams = { project: project.name };
    const currentCat = searchParams.get('cat');
    if (currentCat) newParams.cat = currentCat;
    setSearchParams(newParams);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    const newParams = {};
    const currentCat = searchParams.get('cat');
    if (currentCat) newParams.cat = currentCat;
    setSearchParams(newParams);
  };

  const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilterChange(cat)}
            className={`px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all border-2 ${
              filter === cat
                ? "bg-primary-red border-primary-red text-white"
                : "bg-white border-gray-100 text-gray-500 hover:border-primary-red hover:text-primary-red"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid: 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <FlipCard key={project.id} project={project} onViewMore={handleViewMore} />
        ))}
      </div>

      {/* Premium Interactive Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ProjectGrid;