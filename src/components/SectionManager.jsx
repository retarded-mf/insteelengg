import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAdmin } from '../context/AdminContext';
import { supabase } from '../lib/supabase';
import { Settings, Plus, Trash2, GripVertical, X, Loader2 } from 'lucide-react';

export const SectionManager = ({
  pageName,
  type,
  idPrefix,
  items,
  label = "Manage Section",
  renderItemLabel, // e.g. (item) => item.name
  onUpdate, // callback to refresh parent data
  wrapperClassName = "absolute top-4 right-4 z-50",
  sectionno
}) => {
  const { isAdminActive, getContent } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState(null);

  if (!isAdminActive) return null;

  // ── Drag & Drop Handlers ──
  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = async (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedIdx(null);
  };

  const handleDrop = async (e, targetIdx) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) return;

    setLoading(true);
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIdx, 1);
    newItems.splice(targetIdx, 0, draggedItem);

    // Save sequence to DB
    const updates = newItems.map((item, idx) => ({
      id: item.numericId, // numeric Primary Key
      sequence: idx + 1
    }));

    try {
      await Promise.all(
        updates.map(u =>
          supabase.from('content').update({ sequence: u.sequence }).eq('id', u.id)
        )
      );
      await onUpdate();
    } catch (err) {
      console.error(err);
      alert("Failed to reorder items.");
    }
    setLoading(false);
  };

  // ── Add Item ──
  const handleAdd = async () => {
    setLoading(true);
    const shortId = Math.random().toString(36).substring(2, 8);
    const baseId = `${idPrefix || pageName}_${shortId}`;
    const newSequence = items.length + 1;

    try {
      // We only insert the image row as the "anchor" row. Text rows get created automatically when Edited inline.
      const insertData = {
        element: `${baseId}_img`,
        pagename: pageName,
        type: type,
        status: 'published',
        sequence: newSequence,
        url: 'https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=400' // Placeholder
      };
      if (sectionno !== undefined) {
        insertData.sectionno = sectionno;
      }
      await supabase.from('content').insert(insertData);
      await onUpdate();
    } catch (err) {
      console.error(err);
      alert("Failed to add new item.");
    }
    setLoading(false);
  };

  // ── Delete Item ──
  const handleDelete = async (item) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setLoading(true);
    try {
      const baseId = item.dbId ? item.dbId.replace('_img', '') : item.id;

      // 1. Scan for all related content rows matching the prefix to purge any custom uploaded image files in storage
      const { data: relatedRows, error: fetchError } = await supabase
        .from('content')
        .select('url')
        .like('element', `${baseId}%`);

      if (!fetchError && relatedRows && relatedRows.length > 0) {
        const filenamesToPurge = [];
        relatedRows.forEach(row => {
          if (row.url && row.url.includes('/storage/v1/object/public/site-assets/')) {
            const filename = row.url.split('/public/site-assets/')[1];
            if (filename) {
              filenamesToPurge.push(filename);
            }
          }
        });

        // Also check direct item image/img/url values as fallback
        const itemUrl = item.image || item.img || item.url;
        if (itemUrl && itemUrl.includes('/storage/v1/object/public/site-assets/')) {
          const filename = itemUrl.split('/public/site-assets/')[1];
          if (filename && !filenamesToPurge.includes(filename)) {
            filenamesToPurge.push(filename);
          }
        }

        if (filenamesToPurge.length > 0) {
          try {
            await supabase.storage.from('site-assets').remove(filenamesToPurge);
          } catch (storageErr) {
            console.warn("Storage cleanup failed for some files:", storageErr);
          }
        }
      }

      // 2. Delete the database image anchor and all associated text fields
      await supabase.from('content').delete().like('element', `${baseId}%`);

      await onUpdate();
    } catch (err) {
      console.error(err);
      alert("Failed to delete item.");
    }
    setLoading(false);
  };

  return (
    <>
      {/* ── Hover Overlay Trigger ── */}
      <div className={wrapperClassName}>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-white text-charcoal shadow-lg px-4 py-2 rounded font-black text-[10px] uppercase tracking-widest border border-gray-200 hover:border-primary-red hover:text-primary-red transition-all"
        >
          <Settings size={14} />
          {label}
        </button>
      </div>

      {/* ── Dashboard Modal ── */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm pointer-events-auto overflow-y-auto">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-charcoal max-w-3xl w-full p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-100 flex flex-col animate-in fade-in zoom-in-95 duration-300 relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <Settings size={20} className="text-primary-red" />
                <h4 className="text-lg font-black uppercase tracking-tight">{label}</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-charcoal p-2 rounded-full hover:bg-gray-50 transition-all focus:outline-none"
              >
                <X size={16} />
              </button>
            </div>

            {loading && (
              <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center rounded-2xl">
                <Loader2 className="w-8 h-8 text-primary-red animate-spin" />
              </div>
            )}

            {/* Item List */}
            <div className="space-y-3 mb-8 max-h-[60vh] overflow-y-auto pr-2">
              {items.map((item, i) => {
                const baseId = item.baseId || item.id || (item.dbId ? item.dbId.replace('_img', '') : null);
                
                // Dynamically resolve image in real-time from cache
                const resolvedImg = baseId ? (
                  getContent(`${baseId}_image`) || 
                  getContent(`${baseId}_img`) || 
                  item.image || 
                  item.img || 
                  item.url
                ) : (item.image || item.img || item.url);

                // Dynamically resolve name/title in real-time from cache
                const resolvedLabel = baseId ? (
                  getContent(`${baseId}_name`) || 
                  getContent(`${baseId}_title`) || 
                  getContent(`${baseId}_headline`) || 
                  renderItemLabel(item)
                ) : renderItemLabel(item);

                return (
                  <div
                    key={item.id || item.dbId || i}
                    draggable
                    onDragStart={(e) => handleDragStart(e, i)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, i)}
                    className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-primary-red/30 transition-colors group cursor-grab active:cursor-grabbing"
                  >
                    <GripVertical size={18} className="text-gray-300 group-hover:text-gray-500" />

                    {resolvedImg && (
                      <img src={resolvedImg} alt="Thumb" className="w-12 h-12 rounded object-cover border border-gray-100" />
                    )}

                    <div className="flex-1">
                      <div className="font-bold text-sm uppercase tracking-wide text-charcoal">
                        {resolvedLabel}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 text-gray-400 hover:text-primary-red hover:bg-red-50 rounded transition-colors focus:outline-none"
                      title="Delete Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}

              {items.length === 0 && (
                <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No items found.</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleAdd}
                className="flex items-center justify-center gap-2 flex-1 py-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-charcoal font-black text-xs uppercase tracking-[0.2em] rounded transition-all focus:outline-none"
              >
                <Plus size={14} className="text-primary-red" />
                Add New Record
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 flex-1 py-4 bg-primary-red hover:bg-red-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded shadow-md transition-all focus:outline-none"
              >
                Close Manager
              </button>
            </div>

            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-5">
              To edit text and images, close this manager and double-click the content directly on the page.
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
