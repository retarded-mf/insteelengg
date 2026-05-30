import React from 'react';
import { TrendingUp, Shield, BarChart3, Users } from 'lucide-react';
import { EditText } from '../components/Editable';

const Investor = () => {

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-24 bg-charcoal text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            <EditText id="investor_header_tag" defaultValue="Stakeholder Relations" />
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">
            <EditText id="investor_header_title" defaultValue="Investor Relations" />
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            <EditText id="investor_header_desc" defaultValue="Transparency, growth, and sustainable value creation for all stakeholders." isTextArea={true} />
          </p>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-24 bg-blue-grey">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-charcoal mb-12 uppercase tracking-tighter text-center">
            <EditText id="investor_highlights_title" defaultValue="Company Highlights" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, stat: "₹500+ Cr", label: "Revenue (FY24)", color: "text-green-600" },
              { icon: Users, stat: "150+", label: "Engineering Team", color: "text-blue-600" },
              { icon: BarChart3, stat: "38+", label: "Partner Facilities", color: "text-purple-600" },
              { icon: Shield, stat: "20+", label: "Years in Operations", color: "text-primary-red" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center">
                <item.icon size={36} className={`mx-auto mb-4 ${item.color}`} />
                <div className="text-3xl font-black text-charcoal tracking-tighter mb-1">
                  <EditText id={`investor_stat_${i}_value`} defaultValue={item.stat} />
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <EditText id={`investor_stat_${i}_label`} defaultValue={item.label} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Governance */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-extrabold text-charcoal mb-6 uppercase tracking-tighter">
              <EditText id="investor_governance_title" defaultValue="Corporate Governance" />
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              <EditText id="investor_governance_desc" defaultValue="Insteel Engineers Ltd is committed to the highest standards of corporate governance, ensuring ethical business practices, transparency, and accountability in all operations. Our board comprises experienced professionals from the engineering and finance sectors." isTextArea={true} />
            </p>
            <a href="/contact" className="btn-red inline-flex items-center">
              Contact Investor Relations
            </a>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-extrabold text-charcoal uppercase tracking-tight mb-4">
              <EditText id="investor_docs_title" defaultValue="Key Documents" />
            </h3>
            {[
              { name: "Annual Report FY 2024", type: "PDF" },
              { name: "Q4 Financial Results", type: "PDF" },
              { name: "Board of Directors Profile", type: "PDF" },
              { name: "Corporate Governance Policy", type: "PDF" },
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-blue-grey border border-gray-100 hover:border-primary-red/30 hover:shadow-md transition-all group">
                <div>
                  <div className="font-bold text-charcoal text-sm uppercase tracking-tight">
                    <EditText id={`investor_doc_${i}_name`} defaultValue={doc.name} />
                  </div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{doc.type}</div>
                </div>
                <button className="text-primary-red font-black text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                  Download →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Investor;
