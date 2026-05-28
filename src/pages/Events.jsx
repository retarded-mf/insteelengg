import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Calendar, MapPin } from 'lucide-react';
import { EditText, EditImage } from '../components/Editable';
import { SectionManager } from '../components/SectionManager';
import { useSectionData } from '../hooks/useSectionData';

const defaultEvents = [
  { title: "Structural Steel Summit 2025", date: "March 15, 2025", location: "Mumbai", description: "Insteel showcased its latest BIM-integrated EPC workflow at India's premier steel summit.", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800" },
  { title: "GreenBuild Expo 2024", date: "November 8, 2024", location: "New Delhi", description: "Solar carport and in-roof solar solutions demonstrated live for industry leaders.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" },
  { title: "Construction World Awards", date: "September 22, 2024", location: "Pune", description: "Insteel received the Best EPC Contractor award for high-rise steel structures.", image: "https://images.unsplash.com/photo-1531050171651-61afc0821d71?auto=format&fit=crop&q=80&w=800" },
];

const Events = () => {
  useScrollReveal();
  const { items: events, refetch } = useSectionData('events', 'event', defaultEvents);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-24 bg-blue-grey border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            <EditText id="events_header_tag" defaultValue="Milestones & Presence" />
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-charcoal mb-6 uppercase tracking-tighter">
            <EditText id="events_header_title" defaultValue="Events" />
          </h1>
          <p className="text-lg text-gray-400 font-bold uppercase tracking-[0.3em]">
            <EditText id="events_header_subtitle" defaultValue="Trade Shows, Conferences & Industry Gatherings" />
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <SectionManager
          pageName="events"
          type="event"
          items={events}
          label="Manage Events"
          renderItemLabel={(item) => item.title || 'New Event'}
          onUpdate={refetch}
          wrapperClassName="flex justify-end mb-8"
        />
        <div className="space-y-12">
          {events.map((event, i) => (
            <div key={event.dbId || i} className="reveal-on-scroll group flex flex-col md:flex-row gap-8 bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="w-full md:w-80 h-56 md:h-auto overflow-hidden flex-shrink-0">
                <EditImage
                  id={`${event.baseId || 'event_'+i}_image`}
                  defaultUrl={event.image}
                  alt={event.title || 'Event'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary-red" />
                    <EditText id={`${event.baseId || 'event_'+i}_date`} defaultValue={event.date || 'Date'} />
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary-red" />
                    <EditText id={`${event.baseId || 'event_'+i}_location`} defaultValue={event.location || 'Location'} />
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-charcoal mb-3 uppercase tracking-tight">
                  <EditText id={`${event.baseId || 'event_'+i}_title`} defaultValue={event.title || 'Event Title'} />
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                  <EditText id={`${event.baseId || 'event_'+i}_description`} defaultValue={event.description || 'Event description.'} isTextArea={true} />
                </p>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-gray-200">
              <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">Coming Soon</span>
              <p className="text-charcoal font-black text-2xl uppercase tracking-tighter">Event gallery is being assembled</p>
              <p className="text-gray-400 text-sm mt-4 max-w-md">Photos and highlights from trade shows and events will appear here.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
