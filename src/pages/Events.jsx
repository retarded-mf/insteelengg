import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Calendar, MapPin, ChevronDown, Images, X, GripVertical, UploadCloud, Loader2 } from 'lucide-react';
import { EditText, EditImage } from '../components/Editable';
import { SectionManager } from '../components/SectionManager';
import { useSectionData } from '../hooks/useSectionData';
import { useAdmin } from '../context/AdminContext';
import { supabase } from '../lib/supabase';
import { convertToWebp } from '../lib/convertToWebp';

const defaultEvents = [
  { title: "Structural Steel Summit 2025", date: "March 15, 2025", location: "Mumbai", description: "Insteel showcased its latest BIM-integrated EPC workflow at India's premier steel summit.", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800" },
  { title: "GreenBuild Expo 2024", date: "November 8, 2024", location: "New Delhi", description: "Solar carport and in-roof solar solutions demonstrated live for industry leaders.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" },
  { title: "Construction World Awards", date: "September 22, 2024", location: "Pune", description: "Insteel received the Best EPC Contractor award for high-rise steel structures.", image: "https://images.unsplash.com/photo-1531050171651-61afc0821d71?auto=format&fit=crop&q=80&w=800" },
];

/* ── Event Gallery sub-component (admin: multi-upload + drag reorder) ── */
const EventGallery = ({ eventId }) => {
  const { isAdminActive } = useAdmin();
  const [galleryImages, setGalleryImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // Fetch gallery images for this event from supabase
  const fetchGallery = useCallback(async () => {
    const { data } = await supabase
      .from('content')
      .select('id, element, url, sequence')
      .eq('pagename', 'events')
      .eq('type', 'gallery')
      .like('element', `${eventId}_gallery_%`)
      .order('sequence');
    setGalleryImages(data || []);
  }, [eventId]);

  useEffect(() => { fetchGallery(); }, [fetchGallery]);

  // Multi-file upload
  const handleMultiUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      let uploadBlob = files[i];
      let ext = files[i].name.split('.').pop();
      try { uploadBlob = await convertToWebp(files[i]); ext = 'webp'; } catch {}

      const ts = Date.now() + i;
      const path = `${eventId}_gallery_${ts}.${ext}`;
      const { error } = await supabase.storage.from('site-assets').upload(path, uploadBlob, { upsert: true });
      if (error) { console.error('Upload failed:', error.message); continue; }

      const { data: urlData } = supabase.storage.from('site-assets').getPublicUrl(path);
      const nextSeq = (galleryImages.length + i + 1);
      await supabase.from('content').upsert({
        pagename: 'events',
        sectionno: 1,
        element: `${eventId}_gallery_${ts}`,
        type: 'gallery',
        url: urlData.publicUrl,
        sequence: nextSeq,
      }, { onConflict: 'element' });
    }

    e.target.value = '';
    await fetchGallery();
    setUploading(false);
  };

  // Delete single gallery image
  const handleDelete = async (img) => {
    await supabase.from('content').delete().eq('element', img.element);
    await fetchGallery();
  };

  // Drag reorder
  const handleDragStart = (idx) => { setDragIdx(idx); };
  const handleDragOver = (e, idx) => { e.preventDefault(); setDragOverIdx(idx); };
  const handleDrop = async (idx) => {
    if (dragIdx === null || dragIdx === idx) { setDragIdx(null); setDragOverIdx(null); return; }
    const reordered = [...galleryImages];
    const [moved] = reordered.splice(dragIdx, 1);
    reordered.splice(idx, 0, moved);
    setGalleryImages(reordered);
    setDragIdx(null);
    setDragOverIdx(null);

    // Persist new order
    await Promise.all(reordered.map((img, i) =>
      supabase.from('content').update({ sequence: i + 1 }).eq('element', img.element)
    ));
  };

  if (galleryImages.length === 0 && !isAdminActive) return null;

  return (
    <div className="mt-6">
      {galleryImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {galleryImages.map((img, idx) => (
            <div
              key={img.element}
              className={`relative group/gi aspect-[4/3] overflow-hidden rounded-lg border transition-all cursor-pointer ${
                dragOverIdx === idx ? 'border-primary-red border-2 scale-[1.02]' : 'border-gray-100'
              }`}
              draggable={isAdminActive}
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={() => handleDrop(idx)}
              onDragEnd={() => { setDragIdx(null); setDragOverIdx(null); }}
              onClick={() => { if (!isAdminActive) setLightboxIdx(idx); }}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />
              {isAdminActive && (
                <>
                  <div className="absolute top-1 left-1 opacity-0 group-hover/gi:opacity-100 transition-opacity cursor-grab">
                    <GripVertical size={16} className="text-white drop-shadow-lg" />
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(img); }}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover/gi:opacity-100 transition-opacity shadow-lg"
                  >
                    <X size={12} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Admin: upload button */}
      {isAdminActive && (
        <div className="mt-4">
          {uploading ? (
            <div className="flex items-center gap-2 text-primary-red text-xs font-black uppercase tracking-wider">
              <Loader2 size={14} className="animate-spin" /> Uploading images...
            </div>
          ) : (
            <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-50 hover:bg-slate-100 border border-gray-200 text-charcoal px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors">
              <UploadCloud size={14} className="text-primary-red" />
              Add Gallery Images
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleMultiUpload} />
            </label>
          )}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-6" onClick={() => setLightboxIdx(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={() => setLightboxIdx(null)}>
            <X size={28} />
          </button>
          <img src={galleryImages[lightboxIdx].url} alt="" className="max-w-full max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          {galleryImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === lightboxIdx ? 'bg-primary-red' : 'bg-white/30 hover:bg-white/60'}`}
                  onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Events = () => {
  useScrollReveal();
  const { items: events, refetch } = useSectionData('events', 'event', defaultEvents);
  const [expandedEvent, setExpandedEvent] = useState(null);

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
          {events.map((event, i) => {
            const eid = event.baseId || 'event_'+i;
            const isExpanded = expandedEvent === eid;
            return (
              <div key={event.dbId || i} className="reveal-on-scroll group bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-80 h-56 md:h-auto overflow-hidden flex-shrink-0">
                    <EditImage
                      id={`${eid}_image`}
                      defaultUrl={event.image}
                      alt={event.title || 'Event'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center flex-1">
                    <div className="flex items-center gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-primary-red" />
                        <EditText id={`${eid}_date`} defaultValue={event.date || 'Date'} />
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-primary-red" />
                        <EditText id={`${eid}_location`} defaultValue={event.location || 'Location'} />
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-charcoal mb-3 uppercase tracking-tight">
                      <EditText id={`${eid}_title`} defaultValue={event.title || 'Event Title'} />
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xl mb-4">
                      <EditText id={`${eid}_description`} defaultValue={event.description || 'Event description.'} isTextArea={true} />
                    </p>
                    {/* Gallery Toggle */}
                    <button
                      onClick={() => setExpandedEvent(isExpanded ? null : eid)}
                      className="inline-flex items-center gap-2 text-primary-red font-black text-[10px] uppercase tracking-widest hover:text-red-700 transition-colors self-start"
                    >
                      <Images size={14} />
                      {isExpanded ? 'Hide Gallery' : 'View Gallery'}
                      <ChevronDown size={12} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Collapsible Gallery */}
                {isExpanded && (
                  <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300 border-t border-gray-50">
                    <EventGallery eventId={eid} />
                  </div>
                )}
              </div>
            );
          })}
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
