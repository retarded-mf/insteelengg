import React from 'react';
import ProjectGrid from '../components/ProjectGrid';
import { EditText } from '../components/Editable';

const ProjectsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-24 bg-charcoal text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            <EditText id="projects_header_tag" defaultValue="Our Portfolio" />
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">
            <EditText id="projects_header_title" defaultValue="Our Work" />
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium mb-8">
            <EditText id="projects_header_desc" defaultValue="A showcase of engineering precision and large-scale EPC execution across diverse infrastructure sectors." isTextArea={true} />
          </p>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded">
              <span className="text-2xl font-black text-primary-red">
                <EditText id="projects_header_stat" defaultValue="500+" />
              </span>
              <span className="w-[1px] h-4 bg-white/20" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/70">
                <EditText id="projects_header_stat_label" defaultValue="Projects Delivered" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <ProjectGrid />
      </section>

      {/* Call to action */}
      <section className="py-24 bg-blue-grey text-center">
        <h2 className="text-3xl font-extrabold text-charcoal mb-8 uppercase">
          <EditText id="projects_cta_title" defaultValue="Have a vision for a project?" />
        </h2>
        <a href="/contact" className="btn-red">
          <EditText id="projects_cta_button" defaultValue="Get in Touch with Our Engineers" />
        </a>
      </section>
    </div>
  );
};

export default ProjectsPage;

