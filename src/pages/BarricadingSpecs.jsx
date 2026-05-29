import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import { EditText } from '../components/Editable';
import { EditFileButton } from '../components/Editable';
import { SectionManager } from '../components/SectionManager';
import { useSectionData } from '../hooks/useSectionData';

const defaultDocs = [
  {
    title: "BMC Structural Guidelines for Construction Barricading",
    size: "2.4 MB",
    date: "Updated Jan 2024",
    url: "/docs/bmc-guidelines.pdf"
  },
  {
    title: "MMRDA Safety Protocol for Urban Work Zones",
    size: "1.8 MB",
    date: "Updated Nov 2023",
    url: "/docs/mmrda-safety.pdf"
  },
  {
    title: "NHAI Barricading Standards & Specifications",
    size: "3.2 MB",
    date: "Updated Mar 2024",
    url: "/docs/nhai-standards.pdf"
  },
  {
    title: "IS 2062 Grade Steel Mandates for Temporary Structures",
    size: "1.1 MB",
    date: "Updated Aug 2023",
    url: "/docs/is-2062-grade.pdf"
  }
];

export default function BarricadingSpecs() {
  const { items: documents, refetch } = useSectionData('barricading-specs', 'pdf', defaultDocs);

  return (
    <div className="bg-slate-50 min-h-screen text-charcoal py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 shadow-xl rounded-2xl overflow-hidden p-8 sm:p-12">
        
        {/* Navigation Breadcrumb */}
        <Link 
          to="/products/barricading" 
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-400 hover:text-primary-red transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Barricading
        </Link>

        {/* Header */}
        <header className="border-b border-slate-100 pb-8 mb-10">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-3 block">
            <EditText id="barricading_specs_tag" defaultValue="Compliance Code" />
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-charcoal mb-4">
            <EditText id="barricading_specs_title" defaultValue="Barricading Mandates" />
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl font-medium leading-relaxed">
            <EditText id="barricading_specs_desc" defaultValue="Download the official municipal and national structural guidelines required for all active civil construction, infrastructure development, and street-level work zones." isTextArea={true} />
          </p>
        </header>

        {/* Documents List */}
        <div className="space-y-4">
          <SectionManager
            pageName="barricading-specs"
            type="pdf"
            items={documents}
            label="Manage Mandate PDFs"
            renderItemLabel={(item) => item.title || 'New PDF'}
            onUpdate={refetch}
            wrapperClassName="flex justify-end mb-4"
          />

          {documents.map((doc, index) => {
            const base = doc.baseId || `pdf_${index}`;
            return (
              <div key={doc.dbId || index} className="group relative">
                <a 
                  href={doc.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-4 sm:p-6 bg-slate-50 border border-slate-200/80 rounded-xl hover:border-primary-red hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 sm:gap-6 w-full">
                    <div className="p-3 sm:p-4 bg-white shadow-sm border border-slate-100 text-primary-red rounded-xl group-hover:bg-primary-red group-hover:text-white transition-colors shrink-0">
                      <FileText size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm sm:text-base text-charcoal group-hover:text-primary-red transition-colors mb-1.5" onClick={e => e.preventDefault()}>
                        <EditText id={`${base}_title`} defaultValue={doc.title || "New PDF Title"} />
                      </h3>
                      <div className="flex items-center flex-wrap gap-3 text-[10px] sm:text-xs text-gray-400 font-black uppercase tracking-wider" onClick={e => e.preventDefault()}>
                        <span>PDF Document</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <EditText id={`${base}_size`} defaultValue={doc.size || "1.0 MB"} />
                        <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block"></span>
                        <span className="hidden sm:block">
                          <EditText id={`${base}_date`} defaultValue={doc.date || "Updated Today"} />
                        </span>
                      </div>
                      
                      {/* Admin Upload Button (only visible when in admin mode) */}
                      <EditFileButton 
                        id={`${base}_url`} 
                        defaultUrl={doc.url} 
                        accept="application/pdf" 
                        label="Upload PDF File" 
                      />
                    </div>
                  </div>
                  <div className="p-3 text-gray-300 group-hover:text-primary-red group-hover:bg-red-50 rounded-lg transition-all shrink-0">
                    <Download size={20} />
                  </div>
                </a>
              </div>
            );
          })}

          {documents.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
              <FileText size={32} className="mx-auto mb-3 text-gray-300" />
              <p className="font-bold text-sm">No PDFs added yet</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
