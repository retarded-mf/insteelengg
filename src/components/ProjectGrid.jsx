import React, { useState } from 'react';
import { projects, categories } from '../data/projects';
import { X, ExternalLink } from 'lucide-react';

const ProjectGrid = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group cursor-pointer bg-white overflow-hidden shadow-md hover:shadow-xl transition-all"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-charcoal mb-0.5">{project.name}</h3>
              <div className="text-primary-red text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                {project.category}
              </div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">{project.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Gallery Expand */}
      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90">
          <button 
            onClick={() => setSelectedProject(null)}
            className="absolute top-8 right-8 text-white hover:text-primary-red transition-colors"
          >
            <X size={40} />
          </button>
          
          <div className="max-w-6xl w-full bg-white max-h-[90vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-[400px] lg:h-full">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-12">
                <span className="text-primary-red font-bold uppercase tracking-widest text-sm">
                  {selectedProject.category}
                </span>
                <h2 className="text-4xl font-extrabold text-charcoal mt-2 mb-6 uppercase">
                  {selectedProject.name}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {selectedProject.description || "Insteel Engineers Ltd delivered high-precision structural steel works for this project, adhering to strict safety and quality standards."}
                </p>
                <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Location</h4>
                    <p className="font-bold text-charcoal">{selectedProject.location}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Year Completed</h4>
                    <p className="font-bold text-charcoal">2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
