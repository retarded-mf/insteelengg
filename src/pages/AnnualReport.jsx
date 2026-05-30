import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { EditText, EditImage, EditFileButton } from '../components/Editable';
import { SectionManager } from '../components/SectionManager';
import { useSectionData } from '../hooks/useSectionData';
import { useAdmin } from '../context/AdminContext';

const defaultReports = [
  { title: "Annual Report 2024", year: "2024", description: "Comprehensive overview of Insteel's operations, financials, and strategic milestones for FY 2024.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800" },
  { title: "Annual Report 2023", year: "2023", description: "Key achievements including landmark project completions and revenue growth across engineering and construction divisions.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800" },
  { title: "Annual Report 2022", year: "2022", description: "A pivotal year of expansion with new fabrication facilities and ISO recertification.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800" },
];

const AnnualReport = () => {
  const { items: reports, refetch } = useSectionData('annual-report', 'report', defaultReports);
  const { isAdminActive, getContent } = useAdmin();

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-24 bg-charcoal text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            <EditText id="annual_header_tag" defaultValue="Financial Disclosure" />
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">
            <EditText id="annual_header_title" defaultValue="Annual Reports" />
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            <EditText id="annual_header_desc" defaultValue="Access Insteel's annual reports for a detailed view of our financial performance, strategic direction, and operational achievements." isTextArea={true} />
          </p>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <SectionManager
          pageName="annual-report"
          type="report"
          items={reports}
          label="Manage Reports"
          renderItemLabel={(item) => item.title || 'New Report'}
          onUpdate={refetch}
          wrapperClassName="flex justify-end mb-8"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {reports.map((report, i) => {
            const rid = report.baseId || 'report_'+i;
            const docUrl = getContent(`${rid}_doc`, '');

            return (
              <div key={report.dbId || i} className="group bg-white border border-gray-100 hover:shadow-2xl hover:border-primary-red/20 transition-all duration-500 overflow-hidden">
                <div className="h-48 overflow-hidden bg-blue-grey relative">
                  <EditImage
                    id={`${rid}_image`}
                    defaultUrl={report.image}
                    alt={report.title || 'Report'}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <span className="text-white text-4xl font-black tracking-tighter">
                      <EditText id={`${rid}_year`} defaultValue={report.year || '2024'} />
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-extrabold text-charcoal mb-3 uppercase tracking-tight">
                    <EditText id={`${rid}_title`} defaultValue={report.title || 'Report Title'} />
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    <EditText id={`${rid}_description`} defaultValue={report.description || 'Report description.'} isTextArea={true} />
                  </p>

                  {/* Download / View button — only works when a doc is linked */}
                  {docUrl ? (
                    <div className="flex items-center gap-4">
                      <a
                        href={docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary-red font-bold uppercase tracking-widest text-xs hover:text-red-700 transition-colors"
                      >
                        <ExternalLink size={16} /> View Report
                      </a>
                      <a
                        href={docUrl}
                        download
                        className="flex items-center gap-2 text-charcoal font-bold uppercase tracking-widest text-xs hover:text-primary-red transition-colors"
                      >
                        <Download size={16} /> Download
                      </a>
                    </div>
                  ) : (
                    <span className="text-gray-300 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                      <FileText size={16} /> No document linked
                    </span>
                  )}

                  {/* Admin: upload/link document */}
                  <EditFileButton
                    id={`${rid}_doc`}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                    label="Upload / Link Document"
                  />
                </div>
              </div>
            );
          })}
        </div>
        {reports.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="font-bold text-sm">No reports uploaded yet</p>
            <p className="text-xs mt-1">Click "Manage Reports" to add annual reports</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AnnualReport;
