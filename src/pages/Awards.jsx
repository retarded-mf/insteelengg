import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Award } from 'lucide-react';
import { EditText, EditImage } from '../components/Editable';
import { SectionManager } from '../components/SectionManager';
import { useSectionData } from '../hooks/useSectionData';

const defaultAwards = [
  { title: "Excellence in Structural Steel", year: "2023", event: "Infrastructure Summit", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=600" },
  { title: "Best EPC Contractor — Steel", year: "2022", event: "Construction World Awards", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=600&h=500" },
  { title: "Innovation in BIM Integration", year: "2023", event: "Engineering Design Forum", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=600&h=700" },
  { title: "Safety Excellence Award", year: "2021", event: "National Safety Council", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=600&h=400" },
  { title: "ISO 9001:2015 Certification", year: "2020", event: "Bureau Veritas", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=600&h=600" },
  { title: "Best Fabrication Facility", year: "2022", event: "Steel Fabricators Guild", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=600&h=500" },
];

const Awards = () => {
  useScrollReveal();
  const { items: awards, refetch } = useSectionData('awards', 'award', defaultAwards);

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="pt-48 pb-24 bg-charcoal text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            <EditText id="awards_header_tag" defaultValue="Recognition" />
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">
            <EditText id="awards_header_title" defaultValue="Awards & Recognition" />
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            <EditText id="awards_header_desc" defaultValue="Accreditations and honours that validate our commitment to engineering excellence." isTextArea={true} />
          </p>
        </div>
      </section>

      {/* Awards Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionManager
            pageName="awards"
            type="award"
            items={awards}
            label="Manage Awards"
            renderItemLabel={(item) => item.title || 'New Award'}
            onUpdate={refetch}
            wrapperClassName="flex justify-end mb-8"
          />
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {awards.map((award, i) => (
              <div key={award.dbId || i} className="reveal-on-scroll break-inside-avoid shadow-lg relative group">
                <EditImage
                  id={`${award.baseId || 'award_'+i}_image`}
                  defaultUrl={award.image}
                  alt={award.title || 'Award'}
                  className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-primary-red/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                  <div className="text-center text-white">
                    <Award size={48} className="mx-auto mb-4" />
                    <div className="font-bold uppercase tracking-widest text-sm">
                      <EditText id={`${award.baseId || 'award_'+i}_title`} defaultValue={award.title || 'Award Title'} />
                    </div>
                    <div className="text-xs mt-2 font-medium opacity-80">
                      <EditText id={`${award.baseId || 'award_'+i}_year`} defaultValue={award.year || '2023'} /> — <EditText id={`${award.baseId || 'award_'+i}_event`} defaultValue={award.event || 'Event'} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awards;
