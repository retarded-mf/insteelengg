import React, { useState } from 'react';
import { projects, categories } from '../data/projects';

const FlipCard = ({ project }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer h-80"
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
          className="absolute inset-0 overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <div className="text-primary-red text-[10px] font-black uppercase tracking-[0.3em] mb-1">
              {project.category}
            </div>
            <h3 className="text-white font-black text-xl uppercase tracking-tight">
              {project.name}
            </h3>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">
              {project.location}
            </p>
          </div>
          {/* Flip hint */}
          <div className="absolute top-4 right-4 bg-primary-red/80 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1">
            Tap to flip
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-charcoal p-8 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div>
            <div className="text-primary-red text-[10px] font-black uppercase tracking-[0.3em] mb-3">
              {project.category}
            </div>
            <h3 className="text-white font-black text-2xl uppercase tracking-tight mb-4">
              {project.name}
            </h3>
            <p className="text-white/60 text-sm font-bold leading-relaxed">
              {project.description || "Insteel Engineers Ltd delivered high-precision structural steel works for this project, adhering to strict safety and quality standards."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Location</div>
              <div className="text-white font-black text-sm">{project.location}</div>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Year</div>
              <div className="text-white font-black text-sm">{project.yearCompleted || '—'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectGrid = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <FlipCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;