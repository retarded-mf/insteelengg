import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAdmin } from '../context/AdminContext';
import { supabase } from '../lib/supabase';
import { Edit3, Camera, Save, X, Image as ImageIcon, UploadCloud, Loader2 } from 'lucide-react';

/* ─── Inline Editable Text Component ──────────────────────── */
export const EditText = ({ id, defaultValue, className = '', isTextArea = false }) => {
  const { isAdminActive, getContent, setContent } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const textRef = useRef(null);

  const value = getContent(id, defaultValue);

  useEffect(() => {
    if (isModalOpen) {
      setInputValue(value);
    }
  }, [isModalOpen, value]);

  const handleSave = (e) => {
    e.preventDefault();
    setContent(id, inputValue.trim() || defaultValue);
    setIsModalOpen(false);
  };

  const handleRevert = () => {
    setContent(id, undefined);
    setIsModalOpen(false);
  };

  if (!isAdminActive) {
    return <span className={className}>{value}</span>;
  }

  return (
    <>
      <span
        ref={textRef}
        onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
        className={`inline-block relative group/text cursor-pointer border-b border-dashed border-transparent hover:border-primary-red/50 hover:bg-primary-red/5 pr-6 transition-all rounded ${className}`}
        title="Click to edit text"
      >
        {value}
        <span className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/text:opacity-100 transition-opacity ml-1.5 text-primary-red pointer-events-none">
          <Edit3 size={11} />
        </span>
      </span>

      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/65 backdrop-blur-sm pointer-events-auto overflow-y-auto">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-charcoal max-w-2xl w-full p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-100 flex flex-col space-y-6 animate-in fade-in zoom-in-95 duration-300"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <Edit3 size={18} className="text-primary-red" />
                <h4 className="text-base font-black uppercase tracking-tight">Text Editor</h4>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-charcoal p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-all focus:outline-none"
              >
                <X size={14} />
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSave} className="flex flex-col space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Edit Content
                </label>
                {isTextArea ? (
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-primary-red/50 focus:ring-1 focus:ring-primary-red/25 px-4 py-3 text-charcoal text-sm rounded transition-all focus:outline-none resize-y min-h-[150px]"
                    autoFocus
                  />
                ) : (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-primary-red/50 focus:ring-1 focus:ring-primary-red/25 px-4 py-3 text-charcoal text-sm rounded transition-all focus:outline-none"
                    autoFocus
                  />
                )}
                <div className="text-[10px] text-gray-400 mt-2">
                  Changes apply immediately upon saving. Leave blank to restore the default text.
                </div>
              </div>

              {/* Action Buttons Form */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3.5 border border-gray-200 hover:bg-gray-50 text-charcoal font-black text-[10px] uppercase tracking-widest rounded transition-all focus:outline-none"
                >
                  Cancel
                </button>
                {value !== defaultValue && (
                  <button
                    type="button"
                    onClick={handleRevert}
                    className="py-3.5 px-3.5 border border-red-200 hover:bg-red-50 text-primary-red font-black text-[10px] uppercase tracking-widest rounded transition-all focus:outline-none flex items-center justify-center gap-1.5"
                    title="Remove custom text and restore original default"
                  >
                    Revert to Default
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-grow flex items-center justify-center gap-2 py-3.5 bg-primary-red hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-widest rounded transition-all focus:outline-none shadow-md"
                >
                  <Save size={12} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

/* ─── Inline Editable Image Component ──────────────────────── */
export const EditImage = ({ id, defaultUrl, className = '', alt = '', style = {} }) => {
  const { isAdminActive, getContent, setContent } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newPosition, setNewPosition] = useState('center');
  const [uploadTab, setUploadTab] = useState('upload');
  const [hasError, setHasError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const imageUrl = getContent(id, defaultUrl);
  const imagePosition = getContent(id + '_position', style.objectPosition || 'center');

  useEffect(() => {
    if (isModalOpen) {
      setNewUrl(imageUrl);
      setNewPosition(imagePosition);
    }
  }, [isModalOpen, imageUrl, imagePosition]);

  useEffect(() => {
    setHasError(false);
  }, [newUrl]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `${id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('site-assets')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Upload failed:', uploadError.message);
      alert('Image upload failed. Please try again.');
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('site-assets').getPublicUrl(filePath);
    setNewUrl(data.publicUrl);
    setUploading(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (newUrl.trim()) {
      setContent(id, newUrl.trim());
      setContent(id + '_position', newPosition);
    }
    setIsModalOpen(false);
  };

  const handleRevert = () => {
    setContent(id, undefined);
    setContent(id + '_position', undefined);
    setIsModalOpen(false);
  };

  if (!isAdminActive) {
    return <img src={imageUrl} alt={alt} className={className} style={{ ...style, objectPosition: imagePosition }} />;
  }

  return (
    <div className={`relative group/image overflow-hidden ${className}`} style={style}>
      {/* Standard Image tag */}
      <img src={imageUrl} alt={alt} className="w-full h-full object-cover transition-all" style={{ objectPosition: imagePosition }} />

      {/* Admin Hover Overlay Banner */}
      <div
        onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover/image:opacity-100 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 z-10"
      >
        <div className="p-3 bg-white/10 rounded-full border border-white/20 text-white shadow-md">
          <Camera size={20} />
        </div>
        <span className="text-white font-black text-[10px] uppercase tracking-[0.25em] bg-black/45 border border-white/10 px-3.5 py-1.5 rounded">
          Swap Image
        </span>
      </div>

      {/* Image Swap Modal Popup */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/65 backdrop-blur-sm pointer-events-auto overflow-y-auto">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-charcoal max-w-4xl w-full p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-100 flex flex-col space-y-6 animate-in fade-in zoom-in-95 duration-300"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <ImageIcon size={18} className="text-primary-red" />
                <h4 className="text-base font-black uppercase tracking-tight">Image CMS Dashboard</h4>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-charcoal p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-all focus:outline-none"
              >
                <X size={14} />
              </button>
            </div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Live Cropping Preview */}
              <div className="md:col-span-6 flex flex-col space-y-3">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Live Cropped Preview
                </label>
                <div className="h-80 w-full rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center shadow-inner relative">
                  {newUrl && !hasError ? (
                    <img
                      src={newUrl}
                      alt="Url Preview"
                      className="w-full h-full object-cover transition-all duration-300"
                      style={{ objectPosition: newPosition }}
                      onError={() => setHasError(true)}
                    />
                  ) : (
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">No Preview Available</span>
                  )}
                </div>
                <div className="text-[10px] text-gray-400 leading-normal mt-1 text-center bg-gray-50/50 p-2.5 rounded border border-gray-100">
                  ⚠️ This preview simulates the exact <strong>object-cover</strong> scaling and crop layout seen on the live website.
                </div>
              </div>

              {/* Right Column: Controls Panel */}
              <div className="md:col-span-6 flex flex-col space-y-6">
                
                {/* Upload vs URL Tabs */}
                <div className="flex border-b border-gray-100">
                  <button
                    type="button"
                    onClick={() => setUploadTab('upload')}
                    className={`flex-1 pb-3 text-[11px] font-black uppercase tracking-wider border-b-2 transition-all focus:outline-none ${
                      uploadTab === 'upload'
                        ? 'border-primary-red text-primary-red'
                        : 'border-transparent text-gray-400 hover:text-charcoal'
                    }`}
                  >
                    Local File Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadTab('url')}
                    className={`flex-1 pb-3 text-[11px] font-black uppercase tracking-wider border-b-2 transition-all focus:outline-none ${
                      uploadTab === 'url'
                        ? 'border-primary-red text-primary-red'
                        : 'border-transparent text-gray-400 hover:text-charcoal'
                    }`}
                  >
                    URL / Asset Path String
                  </button>
                </div>

                {/* Form Inputs */}
                {uploadTab === 'upload' ? (
                  /* Tab 1: Local File Uploader */
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Select Local File
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 hover:border-primary-red/50 bg-gray-50 rounded-lg cursor-pointer transition-all hover:bg-gray-100/50">
                      <div className="flex flex-col items-center justify-center pt-4 pb-4">
                        {uploading ? (
                          <>
                            <Loader2 size={24} className="text-primary-red mb-1 animate-spin" />
                            <p className="text-[11px] text-primary-red font-bold uppercase tracking-wider">Uploading...</p>
                          </>
                        ) : (
                          <>
                            <UploadCloud size={24} className="text-gray-400 mb-1 transition-colors" />
                            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Click to browse file</p>
                            <p className="text-[9px] text-gray-300 mt-0.5">PNG, JPG, SVG or WEBP</p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={uploading}
                      />
                    </label>
                  </div>
                ) : (
                  /* Tab 2: Text input URL / path */
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Web URL or Local Asset path
                    </label>
                    <input
                      type="text"
                      required
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      placeholder="Paste image link e.g. /src/assets/..."
                      className="w-full bg-gray-50 border border-gray-200 focus:border-primary-red/50 focus:ring-1 focus:ring-primary-red/25 px-4 py-3 text-charcoal placeholder-gray-300 text-sm rounded transition-all focus:outline-none"
                    />
                  </div>
                )}

                {/* Crop Focus / Placement Selection */}
                <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Adjust Zoom Cropping Placement
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { val: 'top', label: 'Top' },
                      { val: 'center', label: 'Center' },
                      { val: 'bottom', label: 'Bottom' },
                      { val: 'left', label: 'Left' },
                      { val: 'right', label: 'Right' }
                    ].map((p) => (
                      <button
                        key={p.val}
                        type="button"
                        onClick={() => setNewPosition(p.val)}
                        className={`py-2 px-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider border rounded transition-all focus:outline-none ${
                          newPosition === p.val
                            ? 'bg-primary-red border-primary-red text-white shadow-sm'
                            : 'bg-white border-gray-200 text-gray-400 hover:text-charcoal hover:bg-gray-50'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons Form */}
                <form onSubmit={handleSave} className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3.5 border border-gray-200 hover:bg-gray-50 text-charcoal font-black text-[10px] uppercase tracking-widest rounded transition-all focus:outline-none"
                  >
                    Cancel
                  </button>
                  {imageUrl !== defaultUrl && (
                    <button
                      type="button"
                      onClick={handleRevert}
                      className="py-3.5 px-3.5 border border-red-200 hover:bg-red-50 text-primary-red font-black text-[10px] uppercase tracking-widest rounded transition-all focus:outline-none flex items-center justify-center gap-1.5"
                      title="Remove custom swapped image and restore brand default"
                    >
                      Remove Image
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-grow flex items-center justify-center gap-2 py-3.5 bg-primary-red hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-widest rounded transition-all focus:outline-none shadow-md"
                  >
                    <Save size={12} />
                    <span>Save Changes</span>
                  </button>
                </form>

              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
