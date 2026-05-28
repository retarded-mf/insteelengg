import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Pencil, Trash2, Save, X, UploadCloud, Loader2, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';

/* ─── Helpers ──────────────────────────────────────────────── */
const PROJECT_CATEGORIES = [
  'High-Rise Buildings (Steel)',
  'Connecting Bridges',
  'Composite Buildings',
  'Railway Stations',
  'Airports',
  'Special Structures',
  'Industrial',
  'Roofing',
];

const HERO_POSITIONS = ['center', 'top', 'bottom', 'left', 'right', 'center 20%', 'center 30%', 'center 40%'];

// Upload image to site-assets and return public URL
const uploadImage = async (file, id) => {
  const ext = file.name.split('.').pop();
  const path = `${id}.${ext}`;
  const { error } = await supabase.storage.from('site-assets').upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from('site-assets').getPublicUrl(path);
  return data.publicUrl;
};

/* ─── Image Upload Field ───────────────────────────────────── */
const ImageField = ({ label, currentUrl, onUrlChange, uploadId }) => {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, uploadId);
      onUrlChange(url);
    } catch {
      alert('Image upload failed. Please try again.');
    }
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</label>
      {currentUrl && (
        <img src={currentUrl} alt="preview" className="w-full h-32 object-cover rounded-lg border border-gray-100 mb-2" />
      )}
      <label className="flex items-center gap-3 w-full border-2 border-dashed border-gray-200 hover:border-primary-red/50 bg-gray-50 rounded-lg cursor-pointer transition-all px-4 py-3">
        {uploading ? (
          <><Loader2 size={18} className="text-primary-red animate-spin shrink-0" /><span className="text-xs text-primary-red font-bold">Uploading...</span></>
        ) : (
          <><UploadCloud size={18} className="text-gray-400 shrink-0" /><span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Upload image</span></>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
    </div>
  );
};

/* ─── Text Field ───────────────────────────────────────────── */
const TextField = ({ label, value, onChange, multiline = false, placeholder = '' }) => (
  <div className="space-y-1.5">
    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</label>
    {multiline ? (
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-gray-50 border border-gray-200 focus:border-primary-red/50 focus:ring-1 focus:ring-primary-red/20 px-4 py-3 text-charcoal text-sm rounded transition-all focus:outline-none resize-none"
      />
    ) : (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-50 border border-gray-200 focus:border-primary-red/50 focus:ring-1 focus:ring-primary-red/20 px-4 py-3 text-charcoal text-sm rounded transition-all focus:outline-none"
      />
    )}
  </div>
);

/* ─── Select Field ─────────────────────────────────────────── */
const SelectField = ({ label, value, onChange, options }) => (
  <div className="space-y-1.5">
    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</label>
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 border border-gray-200 focus:border-primary-red/50 px-4 py-3 text-charcoal text-sm rounded transition-all focus:outline-none"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

/* ─── Edit Panel (slide-in drawer) ────────────────────────── */
const EditPanel = ({ title, children, onSave, onClose, saving }) => (
  <div className="fixed inset-0 z-50 flex justify-end">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
    <div className="relative w-full max-w-lg bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <h3 className="font-black text-sm uppercase tracking-tight text-charcoal">{title}</h3>
        <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-charcoal transition-all focus:outline-none"><X size={16} /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        {children}
      </div>
      <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
        <button onClick={onClose} className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-charcoal font-black text-[10px] uppercase tracking-widest rounded transition-all focus:outline-none">
          Cancel
        </button>
        <button onClick={onSave} disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-red hover:bg-red-700 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded transition-all focus:outline-none shadow-md">
          {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════ */
/* ─── Projects Section ─────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════ */
const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dragItemIndex, setDragItemIndex] = useState(null);
  const [dragOverItemIndex, setDragOverItemIndex] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const { data: imgRows } = await supabase
      .from('content')
      .select('*')
      .eq('pagename', 'projects')
      .eq('type', 'card')
      .order('sequence');
      
    if (!imgRows || imgRows.length === 0) {
      setProjects([]);
      setLoading(false);
      return;
    }

    const textIds = imgRows.flatMap(r => {
      const base = r.id.replace('_img', '');
      return [`${base}_name`, `${base}_location`, `${base}_category`, `${base}_description`];
    });
    
    const { data: textRows } = await supabase.from('content').select('id, url').in('id', textIds);
    const textMap = {};
    (textRows || []).forEach(r => { textMap[r.id] = r.url; });

    setProjects(imgRows.map((row) => {
      const base = row.id.replace('_img', '');
      return {
        ...row,
        _base: base,
        _name: textMap[`${base}_name`] || '',
        _location: textMap[`${base}_location`] || '',
        _category: textMap[`${base}_category`] || '',
        _description: textMap[`${base}_description`] || '',
      };
    }));
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const newBlank = () => ({
    id: `project_${Date.now()}`,
    type: 'card',
    pagename: 'projects',
    pageno: 3,
    sectionno: 1,
    status: 'published',
    sequence: (projects.length + 1),
    url: '',
    position: 'center',
    // extra fields stored as JSON in a single text field isn't ideal —
    // we store name/location/category/description as separate rows with suffixed IDs
    _name: '',
    _location: '',
    _category: PROJECT_CATEGORIES[0],
    _description: '',
  });

  const handleEdit = async (project) => {
    // Fetch sibling rows for name/location/category/description
    const base = project.id.replace(/_img$/, '');
    const { data: siblings } = await supabase.from('content').select('id, url').in('id', [
      `${base}_name`, `${base}_location`, `${base}_category`, `${base}_description`,
    ]);
    const map = {};
    (siblings || []).forEach(r => { map[r.id.split('_').pop()] = r.url; });
    setEditItem({
      ...project,
      _base: base,
      _name: map.name || '',
      _location: map.location || '',
      _category: map.category || PROJECT_CATEGORIES[0],
      _description: map.description || '',
    });
  };

  const handleNew = () => setEditItem(newBlank());

  const handleSave = async () => {
    if (!editItem) return;
    setSaving(true);
    const base = editItem._base || editItem.id;
    const imgId = `${base}_img`;

    // Upsert main image row
    await supabase.from('content').upsert({
      id: imgId,
      type: 'card',
      url: editItem.url,
      position: editItem.position || 'center',
      status: 'published',
      pagename: 'projects',
      pageno: 3,
      sectionno: 1,
      sequence: editItem.sequence,
    }, { onConflict: 'id' });

    // Upsert metadata rows
    const meta = [
      { id: `${base}_name`, url: editItem._name },
      { id: `${base}_location`, url: editItem._location },
      { id: `${base}_category`, url: editItem._category },
      { id: `${base}_description`, url: editItem._description },
    ];
    await supabase.from('content').upsert(
      meta.map(m => ({ ...m, type: 'text', status: 'published', pagename: 'projects', pageno: 3, sectionno: 1 })),
      { onConflict: 'id' }
    );

    await fetchProjects();
    setEditItem(null);
    setSaving(false);
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Remove "${project._name || project.id}" from the portfolio?`)) return;
    const base = project.id.replace(/_img$/, '');
    await supabase.from('content').delete().in('id', [
      project.id, `${base}_name`, `${base}_location`, `${base}_category`, `${base}_description`,
    ]);
    await fetchProjects();
  };

  const handleDragStart = (index) => setDragItemIndex(index);
  const handleDragEnter = (index) => setDragOverItemIndex(index);
  
  const handleDragEnd = async () => {
    if (dragItemIndex !== null && dragOverItemIndex !== null && dragItemIndex !== dragOverItemIndex) {
      const updated = [...projects];
      const draggedItem = updated[dragItemIndex];
      updated.splice(dragItemIndex, 1);
      updated.splice(dragOverItemIndex, 0, draggedItem);
      
      setProjects(updated);
      
      await Promise.all(
        updated.map((proj, i) => supabase.from('content').update({ sequence: i + 1 }).eq('id', proj.id))
      );
    }
    setDragItemIndex(null);
    setDragOverItemIndex(null);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-primary-red" size={28} /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-black text-lg uppercase tracking-tight text-charcoal">Projects</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage the portfolio shown on the Projects page</p>
        </div>
        <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2.5 bg-primary-red hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-widest rounded shadow transition-all focus:outline-none">
          <Plus size={13} /> Add Project
        </button>
      </div>

      <div className="space-y-3">
        {projects.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
            <p className="font-bold text-sm">No projects yet</p>
            <p className="text-xs mt-1">Click "Add Project" to get started</p>
          </div>
        )}
        {projects.map((proj, i) => (
          <div 
            key={proj.id} 
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragEnter={() => handleDragEnter(i)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className={`flex items-center gap-8 bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-move ${
              dragOverItemIndex === i ? 'border-primary-red border-dashed' : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <GripVertical className="text-gray-300 shrink-0" size={24} />
            {proj.url && (
              <img src={proj.url} alt="" className="w-40 h-28 object-cover rounded-xl border border-gray-100 shrink-0 pointer-events-none" />
            )}
            <div className="flex-1 min-w-0 pointer-events-none">
              <div className="font-black text-xl text-charcoal truncate">{proj._name || '—'}</div>
              <div className="text-sm text-gray-500 mt-1">{proj._location || ''} {proj._category ? `· ${proj._category}` : ''}</div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button onClick={() => handleEdit(proj)} className="p-3 rounded-xl border border-gray-200 hover:border-primary-red hover:text-primary-red text-gray-400 bg-gray-50 hover:bg-white transition-all focus:outline-none"><Pencil size={18} /></button>
              <button onClick={() => handleDelete(proj)} className="p-3 rounded-xl border border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-400 bg-gray-50 hover:bg-white transition-all focus:outline-none"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>

      {editItem && (
        <EditPanel title={editItem._base ? 'Edit Project' : 'New Project'} onSave={handleSave} onClose={() => setEditItem(null)} saving={saving}>
          <TextField label="Project Name" value={editItem._name} onChange={v => setEditItem(p => ({ ...p, _name: v }))} placeholder="e.g. Nyati Plaza" />
          <TextField label="Location" value={editItem._location} onChange={v => setEditItem(p => ({ ...p, _location: v }))} placeholder="e.g. Pune" />
          <SelectField label="Category" value={editItem._category} onChange={v => setEditItem(p => ({ ...p, _category: v }))} options={PROJECT_CATEGORIES} />
          <TextField label="Description" value={editItem._description} onChange={v => setEditItem(p => ({ ...p, _description: v }))} multiline placeholder="Brief description of the project..." />
          <ImageField
            label="Project Image"
            currentUrl={editItem.url}
            onUrlChange={url => setEditItem(p => ({ ...p, url }))}
            uploadId={`project_${editItem._base || editItem.id}`}
          />
        </EditPanel>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════ */
/* ─── Hero Slides Section ──────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════ */
const HeroSlidesSection = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dragItemIndex, setDragItemIndex] = useState(null);
  const [dragOverItemIndex, setDragOverItemIndex] = useState(null);

  const fetchSlides = useCallback(async () => {
    setLoading(true);
    const { data: imgRows } = await supabase
      .from('content')
      .select('*')
      .eq('pagename', 'home')
      .eq('sectionno', 1)
      .eq('type', 'image')
      .order('sequence');
      
    if (!imgRows || imgRows.length === 0) {
      setSlides([]);
      setLoading(false);
      return;
    }

    const textIds = imgRows.flatMap(r => {
      const base = r.id.replace('_img', '');
      return [`${base}_title`, `${base}_category`, `${base}_statement`];
    });
    
    const { data: textRows } = await supabase.from('content').select('id, url').in('id', textIds);
    const textMap = {};
    (textRows || []).forEach(r => { textMap[r.id] = r.url; });

    setSlides(imgRows.map(row => {
      const base = row.id.replace('_img', '');
      return {
        ...row,
        _base: base,
        _title: textMap[`${base}_title`] || '',
        _category: textMap[`${base}_category`] || '',
        _statement: textMap[`${base}_statement`] || '',
      };
    }));
    setLoading(false);
  }, []);

  useEffect(() => { fetchSlides(); }, [fetchSlides]);

  const handleEdit = async (slide) => {
    const base = slide.id.replace(/_img$/, '');
    const { data: siblings } = await supabase.from('content').select('id, url').in('id', [
      `${base}_title`, `${base}_category`, `${base}_statement`,
    ]);
    const map = {};
    (siblings || []).forEach(r => { map[r.id.split('_').pop()] = r.url; });
    setEditItem({ ...slide, _base: base, _title: map.title || '', _category: map.category || '', _statement: map.statement || '' });
  };

  const handleNew = () => setEditItem({
    id: `hero_slide_${Date.now()}`,
    type: 'image',
    pagename: 'home',
    position: 'hero',
    status: 'published',
    sequence: slides.length + 1,
    url: '',
    _title: '',
    _category: '',
    _statement: '',
  });

  const handleSave = async () => {
    if (!editItem) return;
    setSaving(true);
    const base = editItem._base || editItem.id;
    const imgId = `${base}_img`;

    await supabase.from('content').upsert({
      id: imgId,
      type: 'image',
      url: editItem.url,
      position: editItem.position || 'center',
      status: 'published',
      pagename: 'home',
      pageno: 1,
      sectionno: 1,
      sequence: editItem.sequence,
    }, { onConflict: 'id' });

    await supabase.from('content').upsert([
      { id: `${base}_title`, url: editItem._title, type: 'text', status: 'published', pagename: 'home', pageno: 1, sectionno: 1 },
      { id: `${base}_category`, url: editItem._category, type: 'text', status: 'published', pagename: 'home', pageno: 1, sectionno: 1 },
      { id: `${base}_statement`, url: editItem._statement, type: 'text', status: 'published', pagename: 'home', pageno: 1, sectionno: 1 },
    ], { onConflict: 'id' });

    await fetchSlides();
    setEditItem(null);
    setSaving(false);
  };

  const handleDelete = async (slide) => {
    if (!window.confirm('Remove this hero slide?')) return;
    const base = slide.id.replace(/_img$/, '');
    await supabase.from('content').delete().in('id', [slide.id, `${base}_title`, `${base}_category`, `${base}_statement`]);
    await fetchSlides();
  };

  const move = async (index, dir) => {
    const updated = [...slides];
    const target = index + dir;
    if (target < 0 || target >= updated.length) return;
    [updated[index], updated[target]] = [updated[target], updated[index]];
    // Update sequences
    await Promise.all(updated.map((s, i) => supabase.from('content').update({ sequence: i + 1 }).eq('id', s.id)));
    await fetchSlides();
  };

  const handleDragStart = (index) => setDragItemIndex(index);
  const handleDragEnter = (index) => setDragOverItemIndex(index);
  
  const handleDragEnd = async () => {
    if (dragItemIndex !== null && dragOverItemIndex !== null && dragItemIndex !== dragOverItemIndex) {
      const updated = [...slides];
      const draggedItem = updated[dragItemIndex];
      updated.splice(dragItemIndex, 1);
      updated.splice(dragOverItemIndex, 0, draggedItem);
      
      setSlides(updated);
      
      await Promise.all(
        updated.map((slide, i) => supabase.from('content').update({ sequence: i + 1 }).eq('id', slide.id))
      );
    }
    setDragItemIndex(null);
    setDragOverItemIndex(null);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-primary-red" size={28} /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-black text-lg uppercase tracking-tight text-charcoal">Hero Slides</h2>
          <p className="text-xs text-gray-400 mt-0.5">The full-screen slideshow on the home page</p>
        </div>
        <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2.5 bg-primary-red hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-widest rounded shadow transition-all focus:outline-none">
          <Plus size={13} /> Add Slide
        </button>
      </div>

      <div className="space-y-3">
        {slides.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
            <p className="font-bold text-sm">No slides yet</p>
            <p className="text-xs mt-1">Click "Add Slide" to get started</p>
          </div>
        )}
        {slides.map((slide, i) => (
          <div 
            key={slide.id} 
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragEnter={() => handleDragEnter(i)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className={`flex items-center gap-8 bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-move ${
              dragOverItemIndex === i ? 'border-primary-red border-dashed' : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <GripVertical className="text-gray-300 shrink-0" size={24} />
            {slide.url && (
              <img src={slide.url} alt="" className="w-48 h-28 object-cover rounded-xl border border-gray-100 shrink-0 pointer-events-none" />
            )}
            <div className="flex-1 min-w-0 pointer-events-none">
              <div className="font-black text-xl text-charcoal truncate">{slide._title || '—'}</div>
              <div className="text-sm text-gray-500 mt-1">{slide._category || ''}</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => handleEdit(slide)} className="p-3 rounded-xl border border-gray-200 hover:border-primary-red hover:text-primary-red text-gray-400 bg-gray-50 hover:bg-white transition-all focus:outline-none ml-2"><Pencil size={18} /></button>
              <button onClick={() => handleDelete(slide)} className="p-3 rounded-xl border border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-400 bg-gray-50 hover:bg-white transition-all focus:outline-none"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>

      {editItem && (
        <EditPanel title={editItem._base ? 'Edit Slide' : 'New Slide'} onSave={handleSave} onClose={() => setEditItem(null)} saving={saving}>
          <TextField label="Project / Slide Title" value={editItem._title} onChange={v => setEditItem(p => ({ ...p, _title: v }))} placeholder="e.g. Gandhinagar Railway Station" />
          <TextField label="Category Tag" value={editItem._category} onChange={v => setEditItem(p => ({ ...p, _category: v }))} placeholder="e.g. Railway Stations" />
          <TextField label="Statement (shown at bottom)" value={editItem._statement} onChange={v => setEditItem(p => ({ ...p, _statement: v }))} placeholder="e.g. On time, On spec. No exceptions." />
          <ImageField
            label="Slide Background Image"
            currentUrl={editItem.url}
            onUrlChange={url => setEditItem(p => ({ ...p, url }))}
            uploadId={`hero_slide_${editItem._base || editItem.id}`}
          />
        </EditPanel>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════ */
/* ─── Team Section ─────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════ */
const TeamSection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dragItemIndex, setDragItemIndex] = useState(null);
  const [dragOverItemIndex, setDragOverItemIndex] = useState(null);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    const { data: imgRows } = await supabase
      .from('content')
      .select('*')
      .eq('pagename', 'team')
      .eq('type', 'team')
      .order('sequence');

    if (!imgRows || imgRows.length === 0) {
      setMembers([]);
      setLoading(false);
      return;
    }

    const textIds = imgRows.flatMap(r => {
      const base = r.id.replace('_img', '');
      return [`${base}_name`, `${base}_role`];
    });
    
    const { data: textRows } = await supabase.from('content').select('id, url').in('id', textIds);
    const textMap = {};
    (textRows || []).forEach(r => { textMap[r.id] = r.url; });

    setMembers(imgRows.map(row => {
      const base = row.id.replace('_img', '');
      return {
        ...row,
        _base: base,
        _name: textMap[`${base}_name`] || '',
        _role: textMap[`${base}_role`] || '',
      };
    }));
    setLoading(false);
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const handleEdit = async (member) => {
    const base = member.id.replace(/_img$/, '');
    const { data: siblings } = await supabase.from('content').select('id, url').in('id', [`${base}_name`, `${base}_role`]);
    const map = {};
    (siblings || []).forEach(r => { map[r.id.split('_').pop()] = r.url; });
    setEditItem({ ...member, _base: base, _name: map.name || '', _role: map.role || '' });
  };

  const handleNew = () => setEditItem({
    id: `team_${Date.now()}`,
    type: 'team',
    pagename: 'team',
    status: 'published',
    sequence: members.length + 1,
    url: '',
    _name: '',
    _role: '',
  });

  const handleSave = async () => {
    if (!editItem) return;
    setSaving(true);
    const base = editItem._base || editItem.id;
    const imgId = `${base}_img`;

    await supabase.from('content').upsert({
      id: imgId,
      type: 'team',
      url: editItem.url,
      status: 'published',
      pagename: 'team',
      pageno: 4,
      sectionno: 1,
      sequence: editItem.sequence,
    }, { onConflict: 'id' });

    await supabase.from('content').upsert([
      { id: `${base}_name`, url: editItem._name, type: 'text', status: 'published', pagename: 'team', pageno: 4, sectionno: 1 },
      { id: `${base}_role`, url: editItem._role, type: 'text', status: 'published', pagename: 'team', pageno: 4, sectionno: 1 },
    ], { onConflict: 'id' });

    await fetchMembers();
    setEditItem(null);
    setSaving(false);
  };

  const handleDelete = async (member) => {
    if (!window.confirm(`Remove "${member._name || member.id}" from the team?`)) return;
    const base = member.id.replace(/_img$/, '');
    await supabase.from('content').delete().in('id', [member.id, `${base}_name`, `${base}_role`]);
    await fetchMembers();
  };


  const handleDragStart = (index) => setDragItemIndex(index);
  const handleDragEnter = (index) => setDragOverItemIndex(index);
  
  const handleDragEnd = async () => {
    if (dragItemIndex !== null && dragOverItemIndex !== null && dragItemIndex !== dragOverItemIndex) {
      const updated = [...members];
      const draggedItem = updated[dragItemIndex];
      updated.splice(dragItemIndex, 1);
      updated.splice(dragOverItemIndex, 0, draggedItem);
      
      setMembers(updated);
      
      await Promise.all(
        updated.map((m, i) => supabase.from('content').update({ sequence: i + 1 }).eq('id', m.id))
      );
    }
    setDragItemIndex(null);
    setDragOverItemIndex(null);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-primary-red" size={28} /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-black text-lg uppercase tracking-tight text-charcoal">Team Members</h2>
          <p className="text-xs text-gray-400 mt-0.5">Leadership shown on the Team page</p>
        </div>
        <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2.5 bg-primary-red hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-widest rounded shadow transition-all focus:outline-none">
          <Plus size={13} /> Add Member
        </button>
      </div>

      <div className="space-y-3">
        {members.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
            <p className="font-bold text-sm">No team members yet</p>
            <p className="text-xs mt-1">Click "Add Member" to get started</p>
          </div>
        )}
        {members.map((m, i) => (
          <div 
            key={m.id} 
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragEnter={() => handleDragEnter(i)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className={`flex items-center gap-8 bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-move ${
              dragOverItemIndex === i ? 'border-primary-red border-dashed' : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <GripVertical className="text-gray-300 shrink-0" size={24} />
            {m.url && (
              <img src={m.url} alt="" className="w-24 h-24 object-cover rounded-full border-4 border-gray-50 shrink-0 pointer-events-none" />
            )}
            <div className="flex-1 min-w-0 pointer-events-none">
              <div className="font-black text-xl text-charcoal">{m._name || '—'}</div>
              <div className="text-sm text-gray-500 mt-1">{m._role || ''}</div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button onClick={() => handleEdit(m)} className="p-3 rounded-xl border border-gray-200 hover:border-primary-red hover:text-primary-red text-gray-400 bg-gray-50 hover:bg-white transition-all focus:outline-none"><Pencil size={18} /></button>
              <button onClick={() => handleDelete(m)} className="p-3 rounded-xl border border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-400 bg-gray-50 hover:bg-white transition-all focus:outline-none"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>

      {editItem && (
        <EditPanel title={editItem._base ? 'Edit Member' : 'New Member'} onSave={handleSave} onClose={() => setEditItem(null)} saving={saving}>
          <TextField label="Full Name" value={editItem._name} onChange={v => setEditItem(p => ({ ...p, _name: v }))} placeholder="e.g. Raju Jagtap" />
          <TextField label="Role / Designation" value={editItem._role} onChange={v => setEditItem(p => ({ ...p, _role: v }))} placeholder="e.g. Founder & MD" />
          <ImageField
            label="Photo"
            currentUrl={editItem.url}
            onUrlChange={url => setEditItem(p => ({ ...p, url }))}
            uploadId={`team_${editItem._base || editItem.id}`}
          />
        </EditPanel>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════ */
/* ─── Main Dashboard ───────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════ */
const NAV = [
  { id: 'projects', label: '🏗️ Projects' },
  { id: 'slides', label: '🎞️ Hero Slides' },
  { id: 'team', label: '👥 Team' },
];

const AdminDashboard = () => {
  const [active, setActive] = useState('projects');

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      {/* Sidebar */}
      <aside className="w-80 shrink-0 bg-[#1A1A1A] flex flex-col pt-10 pb-6 fixed left-0 top-0 bottom-0 overflow-y-auto z-10 shadow-2xl border-r border-white/5">
        <div className="px-8 mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/30 block mb-2">Insteel CMS</span>
          <h1 className="text-white font-black text-lg uppercase tracking-wider">Content Portal</h1>
        </div>
        <nav className="flex flex-col gap-2 px-5">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`text-left px-5 py-4 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all focus:outline-none ${
                active === item.id
                  ? 'bg-primary-red text-white shadow-lg translate-x-1'
                  : 'text-white/50 hover:text-white hover:bg-white/5 hover:translate-x-1'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto px-5 pt-8 border-t border-white/10">
          <a
            href="/admin?tab=home"
            className="flex items-center justify-center gap-2 w-full py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-[11px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-white rounded-xl transition-all shadow-sm"
          >
            ← Return to Live Site
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-80 pt-12 pb-24 px-12 xl:px-24 w-full">
        {active === 'projects' && <ProjectsSection />}
        {active === 'slides' && <HeroSlidesSection />}
        {active === 'team' && <TeamSection />}
      </main>
    </div>
  );
};

export default AdminDashboard;
