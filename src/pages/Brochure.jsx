import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Download, Trash2, Plus, ChevronUp, ChevronDown, X, Settings } from 'lucide-react';
import { EditText, EditImage } from '../components/Editable';
import { useAdmin } from '../context/AdminContext';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import logoImg from '../assets/images/logo.png';
import { PROJECT_CATEGORIES } from '../data/categories';

/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Constants Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
const PAGE_W = 'w-[11.69in]';
const PAGE_H = 'h-[8.27in]';
const PAGE_DIMS = `${PAGE_W} ${PAGE_H}`;

const Brochure = () => {
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [brochureSlides, setBrochureSlides] = useState([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);

  const { getContent, isAdminActive } = useAdmin();

  /* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Data Fetching Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */
  const fetchAllData = useCallback(async () => {
    // 1. Fetch Portfolio Projects (for the import dropdown)
    const { data: pImgRows } = await supabase
      .from('content')
      .select('*')
      .eq('pagename', 'projects')
      .eq('type', 'card');

    if (pImgRows && pImgRows.length > 0) {
      const pTextIds = pImgRows.flatMap((r) => {
        const base = r.element.replace('_img', '');
        return [`${base}_name`, `${base}_location`, `${base}_category`, `${base}_description`];
      });
      const { data: pTextRows } = await supabase
        .from('content')
        .select('element, url')
        .in('element', pTextIds);
      const pTextMap = {};
      (pTextRows || []).forEach((r) => { pTextMap[r.element] = r.url; });

      const builtPortfolio = pImgRows.map((row) => {
        const base = row.element.replace('_img', '');
        return {
          id: base,
          name: pTextMap[`${base}_name`] || 'Unnamed Project',
          location: pTextMap[`${base}_location`] || '',
          category: pTextMap[`${base}_category`] || '',
          description: pTextMap[`${base}_description`] || '',
          image: row.url,
        };
      });
      setPortfolioProjects(builtPortfolio);
      if (builtPortfolio.length > 0 && !selectedPortfolioId) {
        setSelectedPortfolioId(builtPortfolio[0].id);
      }
    }

    // 2. Fetch Brochure Dedicated Slides
    const { data: bImgRows } = await supabase
      .from('content')
      .select('*')
      .eq('pagename', 'brochure')
      .eq('type', 'slide')
      .order('sequence');

    if (!bImgRows || bImgRows.length === 0) {
      setBrochureSlides([]);
      return;
    }

    const bTextIds = bImgRows.flatMap((r) => {
      const base = r.element.replace('_img_main', '');
      return [`${base}_name`, `${base}_location`, `${base}_category`, `${base}_description`, `${base}_client`];
    });
    const { data: bTextRows } = await supabase
      .from('content')
      .select('element, url')
      .in('element', bTextIds);
    const bTextMap = {};
    (bTextRows || []).forEach((r) => { bTextMap[r.element] = r.url; });

    const builtSlides = bImgRows.map((row) => {
      const base = row.element.replace('_img_main', '');
      return {
        id: base,
        baseId: base,
        name: bTextMap[`${base}_name`] || 'Imported Project',
        location: bTextMap[`${base}_location`] || '',
        category: bTextMap[`${base}_category`] || '',
        description: bTextMap[`${base}_description`] || '',
        client: bTextMap[`${base}_client`] || 'Client Name',
        image: row.url,
        sequence: row.sequence || 0,
      };
    });
    setBrochureSlides(builtSlides);
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Merge live admin changes
  const activeSlides = useMemo(() => {
    return (brochureSlides || []).map((p) => {
      if (!p) return {};
      const base = p.baseId || '';
      return {
        ...p,
        name: getContent(`${base}_name`, p.name),
        location: getContent(`${base}_location`, p.location),
        category: getContent(`${base}_category`, p.category),
        description: getContent(`${base}_description`, p.description),
        client: getContent(`${base}_client`, p.client || 'Client Name'),
        image: getContent(`${base}_img_main`, p.image),
      };
    });
  }, [brochureSlides, getContent]);

  /* ────────────────────────────────── Actions ────────────────────────────────── */
  const handlePrint = () => {
    window.print();
  };

  const handleImportProject = async () => {
    const proj = portfolioProjects.find((p) => p.id === selectedPortfolioId);
    if (!proj) return;
    setIsImporting(true);
    const timestamp = Date.now();
    const newBaseId = `brochure_slide_${timestamp}`;
    const newSequence = (brochureSlides.length > 0 ? Math.max(...brochureSlides.map((s) => s.sequence || 0)) : 0) + 1;

    const newRows = [
      { pagename: 'brochure', type: 'slide', element: `${newBaseId}_img_main`, url: proj.image || '', sequence: newSequence, status: 'published' },
      { pagename: 'brochure', type: 'text', element: `${newBaseId}_name`, url: proj.name || 'Unnamed Project', sequence: newSequence, status: 'published' },
      { pagename: 'brochure', type: 'text', element: `${newBaseId}_location`, url: proj.location || '', sequence: newSequence, status: 'published' },
      { pagename: 'brochure', type: 'text', element: `${newBaseId}_category`, url: proj.category || '', sequence: newSequence, status: 'published' },
      { pagename: 'brochure', type: 'text', element: `${newBaseId}_description`, url: proj.description || '', sequence: newSequence, status: 'published' },
      { pagename: 'brochure', type: 'text', element: `${newBaseId}_client`, url: 'Client Name', sequence: newSequence, status: 'published' },
    ];
    console.log('Inserting brochure rows:', JSON.stringify(newRows, null, 2));
    const { error } = await supabase.from('content').insert(newRows);
    if (error) {
      console.error('Import failed:', error.message, error.details, error.hint, error);
      alert(`Failed to import project: ${error.message}`);
    } else {
      await fetchAllData();
    }
    setIsImporting(false);
  };

  const handleDeleteSlide = async (baseId) => {
    if (!window.confirm('Remove this slide from the brochure?')) return;
    await supabase.from('content').delete().like('element', `${baseId}%`);
    await fetchAllData();
  };

  const handleMoveSlide = async (index, direction) => {
    const slides = [...brochureSlides];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    // Swap sequences
    const seqA = slides[index].sequence;
    const seqB = slides[targetIndex].sequence;

    await supabase
      .from('content')
      .update({ sequence: seqB })
      .eq('element', `${slides[index].baseId}_img_main`);
    await supabase
      .from('content')
      .update({ sequence: seqA })
      .eq('element', `${slides[targetIndex].baseId}_img_main`);

    await fetchAllData();
  };

  // Client logos grid
  const clientLogoSlots = Array.from({ length: 15 }, (_, i) => i + 1);

  // Total page count for page numbers (cover + philosophy + capabilities + why insteel + slides + back cover)
  const staticPageCount = 4;
  const totalPages = staticPageCount + activeSlides.length + 1; // +1 for back cover

  return (
    <div className="bg-neutral-200 min-h-screen pt-32 pb-12 print:p-0 print:pt-0 print:pb-0 print:m-0 print:bg-white font-sans text-charcoal flex flex-col items-center overflow-x-hidden">
      <SEO
        title="Corporate Presentation | Insteel Engineers"
        description="Download or view our official corporate presentation highlighting our capabilities and major projects."
      />

      {/* Floating Controls (hidden in print) */}
      <div className="fixed bottom-8 right-8 z-50 no-print flex gap-3 items-center">
        {isAdminActive && (
          <button
            onClick={() => setManagerOpen(true)}
            className="flex items-center gap-2 bg-charcoal hover:bg-black text-white px-5 py-3.5 rounded-full shadow-2xl font-black uppercase text-[10px] tracking-widest"
          >
            <Settings size={16} />
            Manage Projects
          </button>
        )}
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-primary-red hover:bg-red-700 text-white px-5 py-3.5 rounded-full shadow-2xl font-black uppercase text-[10px] tracking-widest"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>

      {/* Slide Manager Modal (Admin Only) */}
      {isAdminActive && managerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm no-print">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
              <h3 className="text-lg font-black uppercase tracking-widest text-charcoal">Brochure Slide Manager</h3>
              <button onClick={() => setManagerOpen(false)} className="text-gray-400 hover:text-charcoal p-1.5 rounded-full border border-gray-200 hover:bg-gray-50">
                <X size={16} />
              </button>
            </div>

            {/* Import Section */}
            <div className="px-8 py-5 border-b border-gray-100 bg-gray-50">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Import Project from Portfolio</label>
              <div className="flex gap-3">
                <select
                  value={selectedPortfolioId}
                  onChange={(e) => setSelectedPortfolioId(e.target.value)}
                  className="flex-1 bg-white text-charcoal text-sm border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-primary-red"
                >
                  {portfolioProjects.length === 0 && <option value="">No projects available</option>}
                  {portfolioProjects.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <button
                  onClick={handleImportProject}
                  disabled={isImporting || portfolioProjects.length === 0}
                  className="flex items-center gap-2 bg-primary-red hover:bg-red-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-black uppercase text-[10px] tracking-widest"
                >
                  {isImporting ? 'Importing...' : 'Add'}
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Slide List */}
            <div className="flex-1 overflow-y-auto px-8 py-4">
              {brochureSlides.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-12">No slides added yet. Import a project above to get started.</p>
              ) : (
                <div className="space-y-2">
                  {brochureSlides.map((slide, idx) => (
                    <div key={slide.id} className="flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                      {/* Thumbnail */}
                      <div className="w-14 h-10 bg-gray-200 rounded overflow-hidden shrink-0">
                        {slide.image && <img src={slide.image} alt="" className="w-full h-full object-cover" />}
                      </div>
                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-charcoal truncate">{slide.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">{slide.category}</p>
                      </div>
                      {/* Reorder */}
                      <div className="flex flex-col gap-0.5 shrink-0">
                        <button
                          onClick={() => handleMoveSlide(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-gray-400 hover:text-charcoal disabled:opacity-20"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button
                          onClick={() => handleMoveSlide(idx, 'down')}
                          disabled={idx === brochureSlides.length - 1}
                          className="p-1 text-gray-400 hover:text-charcoal disabled:opacity-20"
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>
                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteSlide(slide.baseId)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-4 border-t border-gray-100 bg-gray-50">
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-wider">
                {brochureSlides.length} slide{brochureSlides.length !== 1 ? 's' : ''} in brochure â€¢ Close this panel to edit text and images directly on the page
              </p>
            </div>
          </div>
        </div>
      )}

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {/*  ### PAGE 1: COVER  ###  */}
        <section className={`brochure-page relative flex items-center ${PAGE_DIMS} overflow-hidden bg-white`}>
          {/* Left panel */}
          <div className="w-[38%] h-full self-stretch flex flex-col justify-center px-12 border-r-4 border-primary-red py-12">
            <div className="flex-1 flex flex-col justify-center">
              <EditImage id="brochure_cover_logo" defaultUrl={logoImg} className="h-[65px] w-[240px] mb-8" imgClassName="object-contain object-left" />
              <h1 className="text-[10px] font-black tracking-[0.35em] uppercase text-gray-400 mb-6">
                <EditText id="brochure_cover_subtitle" defaultValue="Building Capabilities" />
              </h1>
            </div>
            <div className="pb-8">
              <p className="text-base font-black tracking-widest uppercase text-charcoal mb-3 leading-relaxed">
                <EditText id="brochure_cover_desc" defaultValue="One Window Solution Provider For Engineering & Construction" />
              </p>
              <p className="text-xs text-primary-red font-black tracking-widest uppercase">
                <EditText id="brochure_cover_web" defaultValue="www.insteelengg.com" />
              </p>
            </div>
          </div>
          {/* Right hero image */}
          <div className="w-[62%] h-[85%] ml-8 relative">
            <EditImage id="brochure_cover_hero" defaultUrl="https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover shadow-xl" />
          </div>
          {/* Page number */}
          <span className="absolute bottom-4 right-6 text-[9px] font-bold text-gray-300 tracking-widest">01</span>
        </section>

        {/*  ### PAGE 2: PHILOSOPHY / STATS  ###  */}
        <section className={`brochure-page relative bg-primary-red text-white flex items-center ${PAGE_DIMS} overflow-hidden px-14 py-8`}>
          <div className="w-1/2 pr-12 border-r border-white/20 h-full flex flex-col justify-center overflow-y-auto space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight">INSTEEL ENGINEERS PVT LTD</h2>
            <p className="text-xs opacity-90 font-bold tracking-widest uppercase mb-2">One Window Solution Provider</p>

            <div>
              <h3 className="text-sm font-black text-white/90 uppercase tracking-widest border-b border-white/20 pb-1 mb-2 inline-block">INSTEEL Soch:</h3>
              <div className="text-[13px] font-serif italic leading-relaxed opacity-95 text-justify">
                <EditText id="brochure_soch_quote" defaultValue="Constantly Building Capabilities of Self and People to Create Value for Ecosystem By Providing Engineering and Construction Platform of Innovative and Simplified Solutions to the Structural Projects Globally." isTextArea />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black text-white/90 uppercase tracking-widest border-b border-white/20 pb-1 mb-2 inline-block">INSTEEL Spiritual Foundations:</h3>
              <ul className="text-[11px] font-bold uppercase tracking-wider space-y-1.5 opacity-90">
                <li className="flex items-center gap-2 border border-white/20 bg-black/10 px-3 py-1.5 rounded"><span className="text-[9px]">✓</span> <EditText id="brochure_spiritual_1" defaultValue="Effective utilization of resources available" /></li>
                <li className="flex items-center gap-2 border border-white/20 bg-black/10 px-3 py-1.5 rounded"><span className="text-[9px]">✓</span> <EditText id="brochure_spiritual_2" defaultValue="Always have collaborative approach" /></li>
                <li className="flex items-center gap-2 border border-white/20 bg-black/10 px-3 py-1.5 rounded"><span className="text-[9px]">✓</span> <EditText id="brochure_spiritual_3" defaultValue="It is better to be fair than being Nice" /></li>
                <li className="flex items-center gap-2 border border-white/20 bg-black/10 px-3 py-1.5 rounded"><span className="text-[9px]">✓</span> <EditText id="brochure_spiritual_4" defaultValue="Growth without capability is liability" /></li>
                <li className="flex items-center gap-2 border border-white/20 bg-black/10 px-3 py-1.5 rounded"><span className="text-[9px]">✓</span> <EditText id="brochure_spiritual_5" defaultValue="Only Good Business will lead to BIG business" /></li>
              </ul>
            </div>
          </div>

          <div className="w-1/2 pl-12">
            <div className="grid grid-cols-2 gap-5 w-full">
              <div className="border border-white/20 bg-black/10 p-7">
                <h4 className="text-3xl font-black mb-1"><EditText id="brochure_stat1_val" defaultValue="200+" /></h4>
                <p className="text-[9px] tracking-[0.2em] uppercase opacity-80 font-bold"><EditText id="brochure_stat1_lbl" defaultValue="Engineers/Designers" /></p>
              </div>
              <div className="border border-white/20 bg-black/10 p-7">
                <h4 className="text-3xl font-black mb-1"><EditText id="brochure_stat2_val" defaultValue="12000+" /></h4>
                <p className="text-[9px] tracking-[0.2em] uppercase opacity-80 font-bold"><EditText id="brochure_stat2_lbl" defaultValue="Sq. Ft. Office" /></p>
              </div>
              <div className="border border-white/20 bg-black/10 p-7">
                <h4 className="text-3xl font-black mb-1"><EditText id="brochure_stat3_val" defaultValue="300+" /></h4>
                <p className="text-[9px] tracking-[0.2em] uppercase opacity-80 font-bold"><EditText id="brochure_stat3_lbl" defaultValue="Projects Executed" /></p>
              </div>
              <div className="border border-white/20 bg-black/10 p-7">
                <h4 className="text-3xl font-black mb-1"><EditText id="brochure_stat4_val" defaultValue="15+" /></h4>
                <p className="text-[9px] tracking-[0.2em] uppercase opacity-80 font-bold"><EditText id="brochure_stat4_lbl" defaultValue="Countries Presence" /></p>
              </div>
            </div>
          </div>
          <span className="absolute bottom-4 right-6 text-[9px] font-bold text-white/40 tracking-widest">02</span>
        </section>

        {/*  ### PAGE 3: OUR SERVICES (5x3 GRID)  ###  */}
        <section className={`brochure-page relative bg-white flex flex-col justify-center ${PAGE_DIMS} overflow-hidden px-12 py-8`}>
          <div className="w-full h-full grid grid-cols-3 grid-rows-5 gap-3.5 items-center">
            {/* Slot 1 */}
            <div className="h-full flex flex-col justify-between p-1 relative overflow-hidden bg-transparent">
              <EditImage id="brochure_srv_img_1" defaultUrl="https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=300" className="w-full h-[83%] object-cover rounded-sm" />
              <div className="text-[11px] font-black text-charcoal uppercase tracking-wider text-center mt-1 truncate"><EditText id="brochure_srv_t1" defaultValue="Steel Fabrication" /></div>
            </div>

            {/* Slot 2 */}
            <div className="h-full flex flex-col justify-between p-1 relative overflow-hidden bg-transparent">
              <EditImage id="brochure_srv_img_2" defaultUrl="https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=300" className="w-full h-[83%] object-cover rounded-sm" />
              <div className="text-[11px] font-black text-charcoal uppercase tracking-wider text-center mt-1 truncate"><EditText id="brochure_srv_t2" defaultValue="Steel Erection" /></div>
            </div>

            {/* Slot 3 */}
            <div className="h-full flex flex-col justify-between p-1 relative overflow-hidden bg-transparent">
              <EditImage id="brochure_srv_img_3" defaultUrl="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=300" className="w-full h-[83%] object-cover rounded-sm" />
              <div className="text-[11px] font-black text-charcoal uppercase tracking-wider text-center mt-1 truncate"><EditText id="brochure_srv_t3" defaultValue="Civil & RCC Work" /></div>
            </div>

            {/* Slot 4 */}
            <div className="h-full flex flex-col justify-between p-1 relative overflow-hidden bg-transparent">
              <EditImage id="brochure_srv_img_4" defaultUrl="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=300" className="w-full h-[83%] object-cover rounded-sm" />
              <div className="text-[11px] font-black text-charcoal uppercase tracking-wider text-center mt-1 truncate"><EditText id="brochure_srv_t4" defaultValue="BIM Detailing" /></div>
            </div>

            {/* Slot 5 */}
            <div className="h-full flex flex-col justify-between p-1 relative overflow-hidden bg-transparent">
              <EditImage id="brochure_srv_img_5" defaultUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300" className="w-full h-[83%] object-cover rounded-sm" />
              <div className="text-[11px] font-black text-charcoal uppercase tracking-wider text-center mt-1 truncate"><EditText id="brochure_srv_t5" defaultValue="Composite Structures" /></div>
            </div>

            {/* Slot 6 */}
            <div className="h-full flex flex-col justify-between p-1 relative overflow-hidden bg-transparent">
              <EditImage id="brochure_srv_img_6" defaultUrl="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=300" className="w-full h-[83%] object-cover rounded-sm" />
              <div className="text-[11px] font-black text-charcoal uppercase tracking-wider text-center mt-1 truncate"><EditText id="brochure_srv_t6" defaultValue="Connection Design" /></div>
            </div>

            {/* Slot 7 */}
            <div className="h-full flex flex-col justify-between p-1 relative overflow-hidden bg-transparent">
              <EditImage id="brochure_srv_img_7" defaultUrl="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=300" className="w-full h-[83%] object-cover rounded-sm" />
              <div className="text-[11px] font-black text-charcoal uppercase tracking-wider text-center mt-1 truncate"><EditText id="brochure_srv_t7" defaultValue="Solar Mounting" /></div>
            </div>

            {/* Slot 8: Center Slot */}
            <div className="h-full flex flex-col justify-center items-center text-center p-4 bg-gray-50 rounded-md shadow-sm">
              <h2 className="text-base font-black uppercase tracking-widest text-primary-red mb-1"><EditText id="brochure_srv_center_title" defaultValue="Our Services" /></h2>
              <div className="w-8 h-0.5 bg-primary-red mb-2"></div>
              <div className="text-[10px] uppercase tracking-wider font-bold leading-relaxed max-w-[180px] mx-auto text-charcoal/90 break-words"><EditText id="brochure_srv_center_desc" defaultValue="Precision engineered turnkey design-build capability" /></div>
            </div>

            {/* Slot 9 */}
            <div className="h-full flex flex-col justify-between p-1 relative overflow-hidden bg-transparent">
              <EditImage id="brochure_srv_img_9" defaultUrl="https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=300" className="w-full h-[83%] object-cover rounded-sm" />
              <div className="text-[11px] font-black text-charcoal uppercase tracking-wider text-center mt-1 truncate"><EditText id="brochure_srv_t9" defaultValue="Urban Barricading" /></div>
            </div>

            {/* Slot 10 */}
            <div className="h-full flex flex-col justify-between p-1 relative overflow-hidden bg-transparent">
              <EditImage id="brochure_srv_img_10" defaultUrl="https://images.unsplash.com/photo-1466611653911-95281773ad90?auto=format&fit=crop&q=80&w=300" className="w-full h-[83%] object-cover rounded-sm" />
              <div className="text-[11px] font-black text-charcoal uppercase tracking-wider text-center mt-1 truncate"><EditText id="brochure_srv_t10" defaultValue="EPC Turnkey Works" /></div>
            </div>

            {/* Slot 11 */}
            <div className="h-full flex flex-col justify-between p-1 relative overflow-hidden bg-transparent">
              <EditImage id="brochure_srv_img_11" defaultUrl="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300" className="w-full h-[83%] object-cover rounded-sm" />
              <div className="text-[11px] font-black text-charcoal uppercase tracking-wider text-center mt-1 truncate"><EditText id="brochure_srv_t11" defaultValue="In-Roof Solar Systems" /></div>
            </div>

            {/* Slot 12 */}
            <div className="h-full flex flex-col justify-between p-1 relative overflow-hidden bg-transparent">
              <EditImage id="brochure_srv_img_12" defaultUrl="https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=300" className="w-full h-[83%] object-cover rounded-sm" />
              <div className="text-[11px] font-black text-charcoal uppercase tracking-wider text-center mt-1 truncate"><EditText id="brochure_srv_t12" defaultValue="Solar Carports" /></div>
            </div>

            {/* Slot 13 */}
            <div className="h-full flex flex-col justify-between p-1 relative overflow-hidden bg-transparent">
              <EditImage id="brochure_srv_img_13" defaultUrl="https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=300" className="w-full h-[83%] object-cover rounded-sm" />
              <div className="text-[11px] font-black text-charcoal uppercase tracking-wider text-center mt-1 truncate"><EditText id="brochure_srv_t13" defaultValue="Civil Detailing" /></div>
            </div>

            {/* Slot 14 */}
            <div className="h-full flex flex-col justify-between p-1 relative overflow-hidden bg-transparent">
              <EditImage id="brochure_srv_img_14" defaultUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300" className="w-full h-[83%] object-cover rounded-sm" />
              <div className="text-[11px] font-black text-charcoal uppercase tracking-wider text-center mt-1 truncate"><EditText id="brochure_srv_t14" defaultValue="Tekla Manpower" /></div>
            </div>

            {/* Slot 15 */}
            <div className="h-full flex flex-col justify-between p-1 relative overflow-hidden bg-transparent">
              <EditImage id="brochure_srv_img_15" defaultUrl="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=300" className="w-full h-[83%] object-cover rounded-sm" />
              <div className="text-[11px] font-black text-charcoal uppercase tracking-wider text-center mt-1 truncate"><EditText id="brochure_srv_t15" defaultValue="Structural Design" /></div>
            </div>
          </div>
          <span className="absolute bottom-4 right-6 text-[9px] font-bold text-gray-300 tracking-widest">03</span>
        </section>

        {/* PAGE 4: WHY INSTEEL */}
        <section className={`brochure-page relative bg-charcoal text-white flex items-center ${PAGE_DIMS} overflow-hidden px-14`}>
          <div className="w-1/2 pr-14">
            <h2 className="text-3xl font-black mb-8 text-primary-red uppercase tracking-widest"><EditText id="brochure_why_title" defaultValue="Why Insteel:" /></h2>

            <ul className="space-y-5 text-base font-medium leading-relaxed">
              <li className="flex gap-4">
                <span className="text-primary-red mt-1 text-base shrink-0">■</span>
                <span><EditText id="brochure_why_p1" defaultValue="Inhouse Structural & Connection designs, shop drawings capacity with 50 Tekla licences and 125+ people in Engineering." isTextArea /></span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary-red mt-1 text-base shrink-0">■</span>
                <span><EditText id="brochure_why_p2" defaultValue="Inhouse BIM and Project management team for Clash detection, BOQ, Coordinated drgs, detailed planning and monitoring." isTextArea /></span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary-red mt-1 text-base shrink-0">■</span>
                <span><EditText id="brochure_why_p3" defaultValue="Scalability of fabrication to cater large project requirements pan India through own and 38 associated facilities apart from our own factory at Taloja." isTextArea /></span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary-red mt-1 text-base shrink-0">■</span>
                <span><EditText id="brochure_why_p4" defaultValue="Turnkey execution including Civil + Steel works." isTextArea /></span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary-red mt-1 text-base shrink-0">■</span>
                <span><EditText id="brochure_why_p5" defaultValue="Experience of delivering projects Pan India." isTextArea /></span>
              </li>
            </ul>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <div className="bg-white/5 border-l-4 border-primary-red p-10 w-full shadow-xl">
              <h3 className="text-2xl font-black text-white uppercase mb-4"><EditText id="brochure_promise_title" defaultValue="Insteel Brand Promise:" /></h3>
              <p className="text-xl italic text-gray-300 leading-relaxed"><EditText id="brochure_promise_desc" defaultValue="Timely Execution with Acceptable Quality & Safety." isTextArea /></p>
            </div>
          </div>
          <span className="absolute bottom-4 right-6 text-[9px] font-bold text-white/30 tracking-widest">04</span>
        </section>

        {/* DYNAMIC PROJECT SLIDES */}
        {activeSlides.map((slide, slideIndex) => {
          const pageNum = String(staticPageCount + slideIndex + 1).padStart(2, '0');
          return (
            <section key={slide.id} className={`brochure-page relative bg-white flex flex-col ${PAGE_DIMS} overflow-hidden group`}>
              {/* Admin delete badge */}
              {isAdminActive && (
                <button
                  onClick={() => handleDeleteSlide(slide.baseId)}
                  className="absolute top-3 right-3 z-50 bg-red-600 hover:bg-red-700 text-white p-2 shadow-lg opacity-0 group-hover:opacity-100 no-print rounded-full"
                >
                  <Trash2 size={14} />
                </button>
              )}

              {/* Top: Title row */}
              <div className="px-10 pt-6 pb-3 border-b-2 border-primary-red shrink-0">
                <h2 className="text-2xl font-black text-primary-red uppercase tracking-tight leading-tight">
                  <EditText id={`${slide.baseId}_name`} defaultValue={slide.name} />
                </h2>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  <EditText id={`${slide.baseId}_location`} defaultValue={slide.location} /> &nbsp;|&nbsp; <EditText id={`${slide.baseId}_category`} defaultValue={slide.category} options={PROJECT_CATEGORIES} /> &nbsp;|&nbsp; <EditText id={`${slide.baseId}_client`} defaultValue={slide.client || "Client Name"} />
                </p>
              </div>

              {/* Middle: Images area */}
              <div className="flex-1 flex flex-col px-10 py-4 min-h-0">
                {/* Hero image - full width */}
                <div className="w-full h-[48%] relative shrink-0 overflow-hidden">
                  <EditImage
                    id={`${slide.baseId}_img_main`}
                    defaultUrl={slide.image}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Two medium images side by side */}
                <div className="flex gap-4 mt-4 h-[30%] shrink-0">
                  <div className="w-1/2 relative overflow-hidden rounded shadow-sm">
                    <EditImage
                      id={`${slide.baseId}_img_sub1`}
                      defaultUrl="https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=600"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-1/2 relative overflow-hidden rounded shadow-sm">
                    <EditImage
                      id={`${slide.baseId}_img_sub2`}
                      defaultUrl="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Description text */}
                <div className="mt-4 flex-1 min-h-0 overflow-hidden">
                  <p className="text-[13px] text-charcoal font-medium leading-relaxed text-justify">
                    <EditText id={`${slide.baseId}_description`} defaultValue={slide.description} isTextArea />
                  </p>
                </div>
              </div>

              {/* Corner logo + page number */}
              <div className="absolute bottom-3 left-6 h-6 no-print">
                <img src={logoImg} alt="Insteel" className="h-full w-auto object-contain opacity-30" />
              </div>
              <div className="absolute bottom-3 left-6 h-6 hidden print:block">
                <img src={logoImg} alt="Insteel" className="h-full w-auto object-contain opacity-20" />
              </div>
              <span className="absolute bottom-4 right-6 text-[9px] font-bold text-gray-300 tracking-widest">{pageNum}</span>
            </section>
          );
        })}

        {/* BACK COVER */}
        <section className={`brochure-page relative bg-white text-charcoal flex ${PAGE_DIMS} overflow-hidden`}>
          {/* Left: Greyscale building image */}
          <div className="w-[28%] h-full">
            <EditImage id="brochure_back_hero" defaultUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale" />
          </div>

          <div className="w-[72%] h-full flex flex-col p-10">
            {/* Client logos grid */}
            <div className="flex-1">
              <div className="grid grid-cols-5 gap-4">
                {clientLogoSlots.map((num) => (
                  <div key={num} className="aspect-[3/2] border border-gray-100 rounded flex items-center justify-center p-3 shadow-sm bg-white">
                    <EditImage id={`brochure_client_${num}`} defaultUrl={`https://logo.clearbit.com/client${num}.com`} className="w-full h-full object-contain mix-blend-multiply" imgClassName="object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="shrink-0 mt-8 grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-sm font-black mb-2 uppercase text-charcoal tracking-widest"><EditText id="brochure_contact_hq_title" defaultValue="INDIA:" /></h2>
                <p className="text-xs leading-relaxed text-gray-600 mb-1">
                  <EditText id="brochure_contact_hq_addr" defaultValue="804, The Ambience Court, Opp. RTO office, Sector 19D, Vashi, Navi Mumbai - 400703" isTextArea />
                </p>
                <p className="text-xs text-gray-800">
                  Tel.: <EditText id="brochure_contact_hq_tel" defaultValue="+91 22 41112000" /> | Email: <EditText id="brochure_contact_hq_email" defaultValue="contact@insteelengg.com" />
                </p>
              </div>
              <div>
                <h2 className="text-sm font-black mb-2 uppercase text-charcoal tracking-widest"><EditText id="brochure_contact_n_title" defaultValue="North India Sales Office:" /></h2>
                <p className="text-xs leading-relaxed text-gray-600 mb-1">
                  <EditText id="brochure_contact_n_addr" defaultValue="E-91, First Floor , Sector 6 , Noida -201401" isTextArea />
                </p>
                <p className="text-xs text-gray-800">
                  Tel.: <EditText id="brochure_contact_n_tel" defaultValue="+91 0120 4374434" /> | Email: <EditText id="brochure_contact_n_email" defaultValue="sales@insteelengg.com" />
                </p>
              </div>
            </div>

            {/* Website box */}
            <div className="mt-6 bg-gray-100 text-charcoal py-2.5 px-8 rounded inline-block w-max text-sm font-black text-center tracking-[0.2em] self-end">
              <EditText id="brochure_contact_web" defaultValue="www.insteelengg.com" />
            </div>
          </div>
          <span className="absolute bottom-4 right-6 text-[9px] font-bold text-gray-300 tracking-widest">{String(totalPages).padStart(2, '0')}</span>
        </section>

    </div>
  );
};

export default Brochure;
