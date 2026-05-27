import React from 'react';
import ProjectGrid from '../components/ProjectGrid';

const ProjectsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">Our Work</h1>
              <p className="text-xl text-gray-400 font-medium">A showcase of engineering precision and large-scale EPC execution across diverse infrastructure sectors.</p>
            </div>
            <div className="bg-primary-red px-8 py-6 text-white hidden lg:block">
              <div className="text-4xl font-black">500+</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">Projects Delivered</div>
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
        <h2 className="text-3xl font-extrabold text-charcoal mb-8 uppercase">Have a vision for a project?</h2>
        <a href="/contact" className="btn-red">Get in Touch with Our Engineers</a>
      </section>
    </div>
  );
};

export default ProjectsPage;
