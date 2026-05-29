import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { X, Globe, Calendar, Weight, Settings } from 'lucide-react';
import { projects as DEFAULT_PROJECTS, categories } from '../data/projects';
import { supabase } from '../lib/supabase';
import { EditText, EditImage } from './Editable';
import { SectionManager } from './SectionManager';

/* ─── Premium Interactive Project Modal ────────────────────── */
import { useAdmin } from '../context/AdminContext';

/* ─── Premium Interactive Project Modal ────────────────────── */
const ProjectModal = ({ project, onClose }) => {
  const { getContent, isAdminActive } = useAdmin();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Custom detailed specifications
  const getSpecs = (p) => {
    const defaultSpecs = [
      { label: "Steel Tonnage", value: p.tonnage || "1,850 MT", icon: Weight },
      { label: "Engineering Scope", value: p.scope || "Steel Detailing & Connection Design", icon: Settings },
      { label: "Year Completed", value: p.yearCompleted || "2022", icon: Calendar },
      { label: "Execution Standard", value: "AISC / IS 800", icon: Globe },
    ];

    if (p.name.includes("Sahyadri")) {
      return [
        { label: "Steel Tonnage", value: "4,200 MT", icon: Weight },
        { label: "Engineering Scope", value: "BIM Coordination & Connection Design", icon: Settings },
        { label: "Year Completed", value: "2020", icon: Calendar },
        { label: "Execution Standard", value: "AISC & IS Codes", icon: Globe },
      ];
    } else if (p.name.includes("Airport") || p.name.includes("Station")) {
      return [
        { label: "Steel Tonnage", value: "3,800 MT", icon: Weight },
        { label: "Engineering Scope", value: "Tekla Steel Detailing & Shop Fabrication", icon: Settings },
        { label: "Year Completed", value: "2023", icon: Calendar },
        { label: "Execution Standard", value: "ISO 9001 / AWS Codes", icon: Globe },
      ];
    } else if (p.name.includes("Bridge")) {
      return [
        { label: "Steel Tonnage", value: "1,450 MT", icon: Weight },
        { label: "Engineering Scope", value: "Erection Engineering & Bolt Calibrations", icon: Settings },
        { label: "Year Completed", value: "2021", icon: Calendar },
        { label: "Execution Standard", value: "AASHTO / IS Standards", icon: Globe },
      ];
    }
    return defaultSpecs;
  };

  const defaultSpecs = getSpecs(project);
  const specs = defaultSpecs.map((spec, index) => ({
    label: getContent(`${project.baseId}_spec_label_${index}`, spec.label),
    value: getContent(`${project.baseId}_spec_value_${index}`, spec.value),
    icon: spec.icon
  }));

  // Thematic gallery selector — loads from DB or default URLs
  const getGallery = (p) => {
    const defaultGallery = [
      p.image,
      "https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    ];

    let baseGallery = defaultGallery;

    if (p.category.includes("Airports") || p.category.includes("Stations")) {
      baseGallery = [
        p.image,
        "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1473876637954-4b493d59fd97?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
      ];
    } else if (p.category.includes("High-Rise") || p.category.includes("Composite")) {
      baseGallery = [
        p.image,
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800",
      ];
    }

    return [
      getContent(`${p.baseId}_img`, baseGallery[0]),
      getContent(`${p.baseId}_gallery_1`, baseGallery[1]),
      getContent(`${p.baseId}_gallery_2`, baseGallery[2]),
      getContent(`${p.baseId}_gallery_3`, baseGallery[3]),
    ];
  };

  const gallery = getGallery(project);
  const [activeImg, setActiveImg] = useState(gallery[0]);

  // Sync activeImg state if database image updates or changes
  const activeIdx = gallery.indexOf(activeImg) >= 0 ? gallery.indexOf(activeImg) : 0;
  const currentActiveUrl = gallery[activeIdx];

  // We keep activeImg in sync with the dynamically resolved database value
  useEffect(() => {
    setActiveImg(gallery[activeIdx]);
  }, [currentActiveUrl]);

  return createPortal(
    <>
      {/* Backdrop with Blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 pointer-events-none">
        <div className="bg-white text-charcoal w-full max-w-7xl md:h-[750px] max-h-[90vh] rounded-2xl shadow-2xl flex flex-col md:flex-row border border-gray-200 overflow-hidden pointer-events-auto animate-in fade-in zoom-in-95 duration-300">

          {/* Left: Content */}
          <div className="w-full md:w-1/2 overflow-y-auto p-8 md:p-12 flex flex-col justify-between space-y-8 scrollbar-thin h-full">
            <div className="space-y-8">
              <div>
                <span className="text-[11px] text-primary-red font-black uppercase tracking-[0.4em] mb-2.5 block">
                  {project.category}
                </span>
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight text-charcoal">
                  {project.name}
                </h3>
              </div>

              <p className="text-gray-500 text-sm md:text-base leading-loose font-semibold tracking-wide">
                <EditText id={`${project.baseId}_description`} defaultValue={project.description || "Insteel delivered end-to-end structural steel solutions, implementing millimeters-accurate detailing and optimized connection designs to secure accelerated site erection parameters and achieve a flawless safety coefficient."} isTextArea={true} maxLength={150} />
              </p>

              <div className="grid grid-cols-2 gap-5">
                {specs.map((spec, index) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={index}
                      className="bg-blue-grey/40 border border-gray-200/50 p-5 rounded-xl flex items-center gap-4"
                    >
                      <div className="p-2.5 rounded-lg bg-white border border-gray-200/40 text-primary-red shrink-0 shadow-sm">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-0.5">
                          <EditText id={`${project.baseId}_spec_label_${index}`} defaultValue={defaultSpecs[index].label} />
                        </div>
                        <div className="text-charcoal font-black text-sm uppercase">
                          <EditText id={`${project.baseId}_spec_value_${index}`} defaultValue={defaultSpecs[index].value} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6">
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center py-4.5 md:py-5 bg-primary-red hover:bg-red-700 text-white font-black uppercase text-xs tracking-[0.3em] rounded-lg transition-all duration-300 shadow-sm focus:outline-none"
              >
                Inquire About Project
              </a>
            </div>
          </div>

          {/* Right: Media & Gallery */}
          <div className="w-full md:w-1/2 relative bg-gray-50 flex flex-col border-t md:border-t-0 md:border-l border-gray-100 h-[400px] md:h-full">
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white border border-gray-200 text-charcoal hover:text-primary-red transition-all duration-300 transform hover:rotate-90 shadow focus:outline-none"
            >
              <X size={16} />
            </button>

            {/* Active Display */}
            <div className="flex-1 relative overflow-hidden bg-black">
              {isAdminActive ? (
                <EditImage
                  id={activeIdx === 0 ? `${project.baseId}_img` : `${project.baseId}_gallery_${activeIdx}`}
                  defaultUrl={activeImg}
                  alt={`${project.name} active`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={activeImg}
                  alt={`${project.name} active`}
                  className="w-full h-full object-cover transition-all duration-500 animate-in fade-in"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Gallery Thumbnails */}
            <div className="shrink-0 p-4 border-t border-gray-100 bg-white flex gap-3 justify-center z-10 overflow-x-auto scrollbar-none">
              {gallery.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImg(imgUrl)}
                  className={`w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all duration-300 hover:scale-105 focus:outline-none ${activeImg === imgUrl
                    ? 'border-primary-red shadow-md scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                >
                  <img src={imgUrl} alt="Thumbnail preview" className="w-full h-full object-cover pointer-events-none" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>,
    document.body
  );
};

/* ─── Flippable Project Card ───────────────────────────────── */
const FlipCard = ({ project, onViewMore }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer h-[440px]"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 overflow-hidden rounded-xl border border-gray-200/50 shadow-md bg-white ${flipped ? 'pointer-events-none' : 'pointer-events-auto'}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-0 z-0 h-full w-full">
            <EditImage
              id={`${project.baseId}_img`}
              defaultUrl={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 p-8 z-10 pointer-events-auto">
            <div className="text-primary-red text-[10px] font-black uppercase tracking-[0.3em] mb-2.5">
              <EditText id={`${project.baseId}_category`} defaultValue={project.category || 'Category'} />
            </div>
            <h3 className="text-white font-black text-2xl uppercase tracking-tighter leading-none mb-1.5 drop-shadow-md">
              <EditText id={`${project.baseId}_name`} defaultValue={project.name || 'Project Name'} />
            </h3>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">
              <EditText id={`${project.baseId}_location`} defaultValue={project.location || 'Location'} />
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setFlipped(true); }}
            className="absolute top-4 right-4 bg-primary-red/80 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded shadow-sm z-10 hover:bg-primary-red focus:outline-none"
          >
            Tap to read more
          </button>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 bg-charcoal p-8 flex flex-col justify-between rounded-xl border border-white/10 shadow-md ${flipped ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="space-y-4">
            <div>
              <div className="text-primary-red text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                <EditText id={`${project.baseId}_category`} defaultValue={project.category || 'Category'} />
              </div>
              <h3 className="text-white font-black text-2xl uppercase tracking-tighter leading-none">
                <EditText id={`${project.baseId}_name`} defaultValue={project.name || 'Project Name'} />
              </h3>
            </div>
            <p className="text-white/70 text-[14px] leading-loose font-medium line-clamp-6 w-full break-words">
              <EditText id={`${project.baseId}_description`} defaultValue={project.description || 'Description goes here...'} isTextArea={true} truncate={150} maxLength={150} />
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-6 relative">
            {/* Top-right flip back button */}
            <button
              onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded shadow-sm focus:outline-none transition-colors"
            >
              Flip Back
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Stop parent click flip event
                onViewMore(project);
              }}
              className="px-5 py-3 bg-primary-red hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-widest transition-all rounded shadow-md active:scale-95 focus:outline-none shrink-0"
            >
              Read More
            </button>

            <div className="grid grid-cols-2 gap-4 text-right">
              <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-0.5">Location</div>
                <div className="text-white font-black text-xs uppercase">
                  <EditText id={`${project.baseId}_location`} defaultValue={project.location || 'Location'} />
                </div>
              </div>
              <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-0.5">Year Completed</div>
                <div className="text-white font-black text-xs uppercase">{project.yearCompleted || '—'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── ProjectGrid ─────────────────────────────────────────── */
const ProjectGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const { getContent, isAdminActive } = useAdmin();

  const fetchProjects = useCallback(async () => {
    const { data: imgRows } = await supabase
      .from('content')
      .select('id, url, position, sequence')
      .eq('pagename', 'projects')
      .eq('type', 'card')
      .order('sequence');

    const processImgRows = async (rows) => {
      // Fetch all sibling text rows in one query
      const textIds = rows.flatMap(r => {
        const base = r.id.replace('_img', '');
        return [`${base}_name`, `${base}_location`, `${base}_category`, `${base}_description`];
      });
      const { data: textRows } = await supabase.from('content').select('id, url').in('id', textIds);
      const textMap = {};
      (textRows || []).forEach(r => { textMap[r.id] = r.url; });

      const built = rows.map((row, i) => {
        const base = row.id.replace('_img', '');
        return {
          id: row.id, // required for React key
          dbId: row.id, // required for SectionManager
          baseId: base,
          name: textMap[`${base}_name`] || 'New Project',
          location: textMap[`${base}_location`] || 'Location',
          category: textMap[`${base}_category`] || 'Category',
          description: textMap[`${base}_description`] || '',
          image: row.url,
        };
      });

      setProjects(built);
    };

    if (!imgRows || imgRows.length === 0) {
      if (DEFAULT_PROJECTS && DEFAULT_PROJECTS.length > 0) {
        const inserts = [];
        DEFAULT_PROJECTS.forEach((item, index) => {
          const baseId = `card_${Math.random().toString(36).substring(2, 8)}`;
          
          inserts.push({
            id: `${baseId}_img`,
            pagename: 'projects',
            type: 'card',
            status: 'published',
            sequence: index + 1,
            url: item.image || ''
          });

          Object.keys(item).forEach(key => {
            if (key !== 'image' && key !== 'id') {
              inserts.push({
                id: `${baseId}_${key}`,
                pagename: 'projects',
                type: 'text',
                status: 'published',
                sequence: index + 1,
                url: String(item[key] || '')
              });
            }
          });
        });

        await supabase.from('content').insert(inserts);
        const { data: newImgRows } = await supabase
          .from('content')
          .select('id, url, position, sequence')
          .eq('pagename', 'projects')
          .eq('type', 'card')
          .order('sequence');
        if (newImgRows && newImgRows.length > 0) {
          await processImgRows(newImgRows);
        } else {
          setProjects([]);
        }
      } else {
        setProjects([]);
      }
      return;
    }

    await processImgRows(imgRows);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const activeProjects = useMemo(() => {
    return (projects || []).map(p => {
      if (!p) return {};
      const base = p.baseId || '';
      return {
        ...p,
        name: getContent(`${base}_name`, p.name || 'New Project'),
        location: getContent(`${base}_location`, p.location || 'Location'),
        category: getContent(`${base}_category`, p.category || 'Category'),
        description: getContent(`${base}_description`, p.description || ''),
        image: getContent(`${base}_img`, p.image || ''),
      };
    });
  }, [projects, getContent]);

  // Sync category filter and select modal when URL params are present
  useEffect(() => {
    const catParam = searchParams.get('cat');
    if (catParam) {
      const decodedCat = decodeURIComponent(catParam);
      setFilter(decodedCat);
    } else {
      setFilter('All');
    }

    const projParam = searchParams.get('project');
    if (projParam) {
      const decodedProj = decodeURIComponent(projParam).toLowerCase();
      const matched = activeProjects.find(
        (p) => p && p.name && String(p.name).toLowerCase() === decodedProj
      );
      if (matched) {
        setSelectedProject(matched);
      }
    }
  }, [searchParams, activeProjects]);

  const handleFilterChange = (cat) => {
    setFilter(cat);
    const newParams = { cat };
    const currentProj = searchParams.get('project');
    const adminTab = searchParams.get('adminTab');
    if (currentProj) newParams.project = currentProj;
    if (adminTab) newParams.adminTab = adminTab;
    setSearchParams(newParams);
  };

  const handleViewMore = (project) => {
    setSelectedProject(project);
    const newParams = { project: project.name };
    const currentCat = searchParams.get('cat');
    const adminTab = searchParams.get('adminTab');
    if (currentCat) newParams.cat = currentCat;
    if (adminTab) newParams.adminTab = adminTab;
    setSearchParams(newParams);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    const newParams = {};
    const currentCat = searchParams.get('cat');
    const adminTab = searchParams.get('adminTab');
    if (currentCat) newParams.cat = currentCat;
    if (adminTab) newParams.adminTab = adminTab;
    setSearchParams(newParams);
  };

  const filteredProjects = activeProjects.filter(p => filter === 'All' || p.category === filter);

  return (
    <div className="relative">
      <SectionManager
        pageName="projects"
        type="card"
        items={activeProjects}
        label="Manage Portfolio"
        renderItemLabel={(item) => item.name || 'New Project'}
        onUpdate={fetchProjects}
        wrapperClassName="flex justify-center mb-8"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilterChange(cat)}
            className={`px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all border-2 ${filter === cat
              ? "bg-primary-red border-primary-red text-white"
              : "bg-white border-gray-100 text-gray-500 hover:border-primary-red hover:text-primary-red"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Centered Portfolio Layout — ensures single/odd cards center perfectly */}
      <div className="flex flex-wrap gap-8 justify-center">
        {filteredProjects.map((project) => (
          <div key={project.id} className="w-full lg:w-[calc(50%-16px)] max-w-[580px]">
            <FlipCard project={project} onViewMore={handleViewMore} />
          </div>
        ))}
      </div>

      {/* Premium Interactive Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ProjectGrid;