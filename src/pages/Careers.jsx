import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Briefcase, MapPin, Clock, ChevronDown, X, Send, CheckCircle } from 'lucide-react';
import { EditText } from '../components/Editable';
import { SectionManager } from '../components/SectionManager';
import { useSectionData } from '../hooks/useSectionData';
import { supabase } from '../lib/supabase';

const defaultJobs = [
  { title: "Senior Structural Engineer", department: "Engineering", location: "Navi Mumbai", type: "Full-Time", description: "Lead structural steel design and BIM coordination for large-scale EPC projects across India." },
  { title: "Tekla Detailing Lead", department: "Engineering", location: "Navi Mumbai", type: "Full-Time", description: "Head the detailing team using Tekla Structures for multi-storey composite buildings and special structures." },
  { title: "Site Erection Supervisor", department: "Construction", location: "Pan India", type: "Full-Time", description: "Supervise on-site erection of steel structures, ensure quality and safety compliance across project sites." },
];

const Careers = () => {
  useScrollReveal();
  const { items: jobs, refetch } = useSectionData('careers', 'job', defaultJobs);

  // Dropdown & Application States
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);
  
  // Form fields
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleScrollToJob = (baseId) => {
    setFilterDropdownOpen(false);
    const element = document.getElementById(`job-card-${baseId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleOpenApplyModal = (job) => {
    setSelectedJobForModal(job);
    setSubmitSuccess(false);
    setCandidateName('');
    setCandidateEmail('');
    setCandidatePhone('');
    setCoverNote('');
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase.from('career_applications').insert([
      {
        candidate_name: candidateName,
        candidate_email: candidateEmail,
        candidate_phone: candidatePhone,
        designation_applied: selectedJobForModal.title,
        cover_note: coverNote,
        status: 'submitted'
      }
    ]);

    setIsSubmitting(false);
    if (error) {
      console.error('Application failed:', error);
      alert(`Submission failed: ${error.message}`);
    } else {
      setSubmitSuccess(true);
      setTimeout(() => {
        setSelectedJobForModal(null);
      }, 2000);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-24 bg-charcoal text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 z-10 relative">
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

      {/* Open Positions Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-4xl font-extrabold text-charcoal mb-4 uppercase tracking-tighter">
              <EditText id="careers_positions_title" defaultValue="Open Positions" />
            </h2>
            <p className="text-gray-400 text-sm uppercase font-bold tracking-widest">
              <EditText id="careers_positions_subtitle" defaultValue="Current openings across our engineering and construction divisions" />
            </p>
          </div>
        </div>

        <SectionManager
          pageName="careers"
          type="job"
          items={jobs}
          label="Manage Job Listings"
          renderItemLabel={(item) => item.title || 'New Position'}
          onUpdate={refetch}
          wrapperClassName="flex justify-end mb-8"
        />

        {/* Scrollable Job List */}
        <div className="space-y-8">
          {jobs.map((job, i) => {
            const baseId = job.baseId || `job_${i}`;
            return (
              <div 
                key={job.dbId || i} 
                id={`job-card-${baseId}`}
                className="group border border-gray-100 hover:border-primary-red/30 p-10 sm:p-12 hover:shadow-2xl transition-all bg-white scroll-mt-24 min-h-[350px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
                    <div>
                      <h3 className="text-3xl font-extrabold text-charcoal uppercase tracking-tight mb-3">
                        <EditText id={`${baseId}_title`} defaultValue={job.title || 'Position'} />
                      </h3>
                      <div className="flex flex-wrap items-center gap-5 text-xs font-black uppercase tracking-widest text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={14} className="text-primary-red" />
                          <EditText id={`${baseId}_department`} defaultValue={job.department || 'Department'} />
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-primary-red" />
                          <EditText id={`${baseId}_location`} defaultValue={job.location || 'Location'} />
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-primary-red" />
                          <EditText id={`${baseId}_type`} defaultValue={job.type || 'Full-Time'} />
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleOpenApplyModal(job)}
                      className="btn-red shrink-0 text-center focus:outline-none px-8 py-4 text-xs font-black uppercase tracking-widest"
                    >
                      Apply Now
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-red mb-2">Job Description</h4>
                      <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-4xl text-justify">
                        <EditText id={`${baseId}_description`} defaultValue={job.description || 'Job description.'} isTextArea={true} />
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-50">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-red mb-2">Specifications & Requirements</h4>
                      <p className="text-charcoal font-bold text-sm sm:text-base leading-relaxed max-w-4xl text-justify">
                        <EditText id={`${baseId}_requirements`} defaultValue="• Minimum 3-5 years of industry experience in large-scale structural projects.\n• Strong familiarity with Tekla Structures, BIM Level 3 workflows, or Revit detailing.\n• Excellent communication skills and capability to collaborate directly with EPC site leads." isTextArea={true} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {jobs.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
              <p className="font-bold text-sm">No open positions currently</p>
              <p className="text-xs mt-1">Check back soon or send us your resume at sales@insteelengg.com</p>
            </div>
          )}
        </div>
      </section>

      {/* Themed Application Modal Form */}
      {selectedJobForModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white text-charcoal max-w-2xl w-full p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-100 flex flex-col space-y-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 shrink-0">
              <div className="flex flex-col">
                <span className="text-[10px] text-primary-red font-black uppercase tracking-widest block mb-1">Applying For Position</span>
                <h4 className="text-xl font-extrabold uppercase tracking-tight leading-tight">{selectedJobForModal.title}</h4>
              </div>
              <button
                onClick={() => setSelectedJobForModal(null)}
                className="text-gray-400 hover:text-charcoal p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-all focus:outline-none"
              >
                <X size={16} />
              </button>
            </div>

            {submitSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <CheckCircle size={56} className="text-green-500 animate-bounce" />
                <h5 className="text-lg font-black uppercase tracking-tight text-charcoal">Submission Complete</h5>
                <p className="text-gray-400 text-xs uppercase tracking-wider">Your application has been delivered to Insteel HR successfully.</p>
              </div>
            ) : (
              /* Themed Form */
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input
                      type="text"
                      required
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary-red/50 focus:ring-1 focus:ring-primary-red/25 px-4 py-3 text-sm text-charcoal rounded transition-all focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input
                      type="email"
                      required
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      placeholder="john.doe@example.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary-red/50 focus:ring-1 focus:ring-primary-red/25 px-4 py-3 text-sm text-charcoal rounded transition-all focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={candidatePhone}
                    onChange={(e) => setCandidatePhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary-red/50 focus:ring-1 focus:ring-primary-red/25 px-4 py-3 text-sm text-charcoal rounded transition-all focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Cover Note / Resume Summary</label>
                  <textarea
                    required
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Briefly summarize your engineering background and detailing experience..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary-red/50 focus:ring-1 focus:ring-primary-red/25 px-4 py-3 text-sm text-charcoal rounded transition-all focus:outline-none min-h-[140px] resize-y"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJobForModal(null)}
                    className="flex-1 py-3.5 border border-gray-200 hover:bg-gray-50 text-charcoal font-black text-[10px] uppercase tracking-widest rounded transition-all focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-grow flex items-center justify-center gap-2 py-3.5 bg-primary-red hover:bg-red-700 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded transition-all focus:outline-none shadow-md"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={12} />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
