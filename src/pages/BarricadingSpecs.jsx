import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, FileText, ArrowLeft, Info } from 'lucide-react';
import { EditText } from '../components/Editable';

export default function BarricadingSpecs() {
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
            Compliance Code
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-charcoal mb-4">
            Barricading Mandates
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl font-medium leading-relaxed">
            Official municipal (BMC, MMRDA) and national structural guidelines required for all active civil construction, infrastructure development, and street-level work zones.
          </p>
        </header>

        {/* Main Mandates Section */}
        <div className="space-y-12">
          
          {/* Section 1: Dimensions */}
          <section className="space-y-4">
            <h2 className="text-lg font-black uppercase tracking-wider text-charcoal border-l-4 border-primary-red pl-4 flex items-center gap-2">
              <Shield size={18} className="text-primary-red" />
              1. Height & Dimensions Mandates
            </h2>
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-black text-xs uppercase tracking-wider text-gray-400 mb-1">Standard Height</h4>
                  <p className="font-bold text-slate-800">35 Feet (10.6 Meters)</p>
                  <p className="text-gray-500 text-xs mt-1">Mandated for major metro, bridge flyover, and heavy arterial highway construction zones.</p>
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-wider text-gray-400 mb-1">Secondary Height</h4>
                  <p className="font-bold text-slate-800">25 Feet (7.6 Meters)</p>
                  <p className="text-gray-500 text-xs mt-1">Applicable for arterial street junctions, residential street works, and minor utility pipelines.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Material Specifications */}
          <section className="space-y-4">
            <h2 className="text-lg font-black uppercase tracking-wider text-charcoal border-l-4 border-primary-red pl-4 flex items-center gap-2">
              <FileText size={18} className="text-primary-red" />
              2. Structural Material Specifications
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm">
              <table className="w-full border-collapse text-left text-sm text-gray-500">
                <thead className="bg-slate-50 text-xs font-black uppercase tracking-wider text-gray-400 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-6 py-4">Component</th>
                    <th scope="col" className="px-6 py-4">Mandate Standard</th>
                    <th scope="col" className="px-6 py-4">Structural Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr>
                    <td className="px-6 py-4 font-bold text-charcoal">Main Post / Column</td>
                    <td className="px-6 py-4">ISMC 150 / 200 channels</td>
                    <td className="px-6 py-4">IS 2062 Structural Steel</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-charcoal">Cladding Sheet</td>
                    <td className="px-6 py-4">1.2mm - 1.6mm dynamic CGI sheet</td>
                    <td className="px-6 py-4">Galvanized zinc-coated</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-charcoal">Wind Bracing</td>
                    <td className="px-6 py-4">ISA 50x50x6 structural angles</td>
                    <td className="px-6 py-4">IS 2062 Grade A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Visual & Lighting Compliance */}
          <section className="space-y-4">
            <h2 className="text-lg font-black uppercase tracking-wider text-charcoal border-l-4 border-primary-red pl-4 flex items-center gap-2">
              <CheckCircle size={18} className="text-primary-red" />
              3. Visual & Lighting Compliance
            </h2>
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-6 space-y-4 text-sm leading-relaxed text-gray-600">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-charcoal">Reflective Sheeting:</strong> High-intensity retro-reflective hazard stripes (Yellow/Black or Red/White) conforming to IRC:67 standards must be applied to the bottom 1.5 meters.
                </li>
                <li>
                  <strong className="text-charcoal">LED Warning Lights:</strong> Solar-powered amber flashing LED beacons placed at 5-meter intervals at the top edge of the barricade.
                </li>
                <li>
                  <strong className="text-charcoal">Corporate Branding:</strong> A dedicated 1-meter high uniform zone on panels for safety signage, helpline contact information, and client logos.
                </li>
              </ul>
            </div>
          </section>

        </div>

        {/* Warning Indicator */}
        <div className="mt-12 bg-red-50 border border-red-200/50 rounded-xl p-6 flex gap-4 text-xs sm:text-sm">
          <Info className="text-primary-red shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-black uppercase tracking-wider text-primary-red mb-1">Non-Compliance Warning</h4>
            <p className="text-red-700/80 leading-relaxed">
              Failure to deploy compliant steel structures aligned with municipal heights can result in immediate spot-fines, stop-work orders from project authorities, and structural hazards due to dynamic wind loads in coastal monsoon regions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
