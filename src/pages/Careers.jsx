import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { EditText } from '../components/Editable';
import { SectionManager } from '../components/SectionManager';
import { useSectionData } from '../hooks/useSectionData';

const defaultJobs = [
  { title: "Senior Structural Engineer", department: "Engineering", location: "Navi Mumbai", type: "Full-Time", description: "Lead structural steel design and BIM coordination for large-scale EPC projects across India." },
  { title: "Tekla Detailing Lead", department: "Engineering", location: "Navi Mumbai", type: "Full-Time", description: "Head the detailing team using Tekla Structures for multi-storey composite buildings and special structures." },
  { title: "Site Erection Supervisor", department: "Construction", location: "Pan India", type: "Full-Time", description: "Supervise on-site erection of steel structures, ensure quality and safety compliance across project sites." },
];

const Careers = () => {
  useScrollReveal();
  const { items: jobs, refetch } = useSectionData('careers', 'job', defaultJobs);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-24 bg-charcoal text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            <EditText id="careers_header_tag" defaultValue="Join Us" />
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">
            <EditText id="careers_header_title" defaultValue="Careers at Insteel" />
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            <EditText id="careers_header_desc" defaultValue="Build your career with India's leading structural steel EPC company. We're looking for passionate engineers, managers, and innovators." isTextArea={true} />
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-24 bg-blue-grey">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-charcoal mb-12 uppercase tracking-tighter text-center">
            <EditText id="careers_why_title" defaultValue="Why Work With Us" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🏗️", title: "Landmark Projects", desc: "Work on India's most prestigious steel structures — airports, railway stations, and high-rise towers." },
              { icon: "📈", title: "Career Growth", desc: "Clear progression paths and exposure to cutting-edge technology like Tekla, REVIT, and BIM Level 3." },
              { icon: "🤝", title: "Collaborative Culture", desc: "A team-first environment where every engineer's contribution shapes the final structure." },
            ].map((perk, i) => (
              <div key={i} className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all reveal-on-scroll">
                <div className="text-4xl mb-6">{perk.icon}</div>
                <h3 className="text-xl font-extrabold text-charcoal mb-3 uppercase tracking-tight">
                  <EditText id={`careers_perk_${i}_title`} defaultValue={perk.title} />
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  <EditText id={`careers_perk_${i}_desc`} defaultValue={perk.desc} isTextArea={true} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-charcoal mb-4 uppercase tracking-tighter">
          <EditText id="careers_positions_title" defaultValue="Open Positions" />
        </h2>
        <p className="text-gray-400 mb-12 text-sm uppercase font-bold tracking-widest">
          <EditText id="careers_positions_subtitle" defaultValue="Current openings across our engineering and construction divisions" />
        </p>
        <SectionManager
          pageName="careers"
          type="job"
          items={jobs}
          label="Manage Job Listings"
          renderItemLabel={(item) => item.title || 'New Position'}
          onUpdate={refetch}
          wrapperClassName="flex justify-end mb-8"
        />
        <div className="space-y-6">
          {jobs.map((job, i) => (
            <div key={job.dbId || i} className="reveal-on-scroll group border border-gray-100 hover:border-primary-red/30 p-8 hover:shadow-xl transition-all bg-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-charcoal uppercase tracking-tight mb-2">
                    <EditText id={`${job.baseId || 'job_'+i}_title`} defaultValue={job.title || 'Position'} />
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={14} className="text-primary-red" />
                      <EditText id={`${job.baseId || 'job_'+i}_department`} defaultValue={job.department || 'Department'} />
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-primary-red" />
                      <EditText id={`${job.baseId || 'job_'+i}_location`} defaultValue={job.location || 'Location'} />
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-primary-red" />
                      <EditText id={`${job.baseId || 'job_'+i}_type`} defaultValue={job.type || 'Full-Time'} />
                    </span>
                  </div>
                </div>
                <a href="/contact" className="btn-red shrink-0 text-center">Apply Now</a>
              </div>
              <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-3xl">
                <EditText id={`${job.baseId || 'job_'+i}_description`} defaultValue={job.description || 'Job description.'} isTextArea={true} />
              </p>
            </div>
          ))}
          {jobs.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
              <p className="font-bold text-sm">No open positions currently</p>
              <p className="text-xs mt-1">Check back soon or send us your resume at sales@insteelengg.com</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Careers;
