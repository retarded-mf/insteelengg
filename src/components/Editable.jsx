import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAdmin } from '../context/AdminContext';
import { supabase } from '../lib/supabase';
import { convertToWebp } from '../lib/convertToWebp';
import { Edit3, Camera, Save, X, Image as ImageIcon, UploadCloud, Loader2 } from 'lucide-react';

/* ─── Inline Editable Text Component ──────────────────────── */
export const EditText = ({ id, defaultValue, className = '', isTextArea = false, truncate = null, maxLength = null, options = null }) => {
  const { isAdminActive, getContent, setContent } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const textRef = useRef(null);

  const value = getContent(id, defaultValue);
  const displayedValue = truncate && value && value.length > truncate
    ? value.slice(0, truncate) + '...'
    : value;

  useEffect(() => {
    if (isModalOpen) {
      setInputValue(value || (options ? options[0] : ''));
    }
  }, [isModalOpen, value, options]);

  const handleSave = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    const finalVal = maxLength ? trimmed.slice(0, maxLength) : trimmed;
    setContent(id, finalVal || defaultValue);
    setIsModalOpen(false);
  };

  const handleRevert = () => {
    setContent(id, undefined);
    setIsModalOpen(false);
  };

  if (!isAdminActive) {
    return <span className={`break-words max-w-full whitespace-pre-wrap ${className}`}>{displayedValue}</span>;
  }

  return (
    <>
      <span
        ref={textRef}
        onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
        className={`inline-block max-w-full break-words whitespace-pre-wrap relative group/text cursor-pointer border-b border-dashed border-transparent hover:border-primary-red/50 hover:bg-primary-red/5 pr-4 transition-all rounded ${className}`}
        title="Click to edit text"
      >
        {displayedValue || <span className="text-primary-red/50 italic font-bold tracking-wider">[Click to Edit Text]</span>}
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
                {options ? (
                  <select
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-primary-red/50 focus:ring-1 focus:ring-primary-red/25 px-4 py-3 text-charcoal text-sm rounded transition-all focus:outline-none"
                    autoFocus
                  >
                    {options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : isTextArea ? (
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    maxLength={maxLength}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-primary-red/50 focus:ring-1 focus:ring-primary-red/25 px-4 py-3 text-charcoal text-sm rounded transition-all focus:outline-none resize-y min-h-[150px]"
                    autoFocus
                  />
                ) : (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    maxLength={maxLength}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-primary-red/50 focus:ring-1 focus:ring-primary-red/25 px-4 py-3 text-charcoal text-sm rounded transition-all focus:outline-none"
                    autoFocus
                  />
                )}
                <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 gap-4">
                  <span className="flex-1">Changes apply immediately upon saving. Leave blank to restore the default text.</span>
                  <span className={`${maxLength && inputValue.length >= maxLength ? 'text-primary-red font-black' : 'font-bold'} whitespace-nowrap`}>
                    {maxLength ? `${inputValue.length} / ${maxLength}` : `${inputValue.length} chars`}
                  </span>
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
export const EditImage = ({ id, defaultUrl, className = '', imgClassName = 'object-cover', alt = '', style = {} }) => {
  const { isAdminActive, getContent, setContent } = useAdmin();
  const [uploading, setUploading] = useState(false);

  const imageUrl = getContent(id, defaultUrl);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    let uploadBlob = file;
    let fileExt = file.name.split('.').pop();

    try {
      uploadBlob = await convertToWebp(file);
      fileExt = 'webp';
    } catch (err) {
      console.warn('WebP conversion failed, uploading original:', err);
    }

    const timestamp = Date.now();
    const filePath = `${id}_${timestamp}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('site-assets')
      .upload(filePath, uploadBlob, { upsert: true });

    if (uploadError) {
      console.error('Upload failed:', uploadError.message);
      alert('Image upload failed. Please try again.');
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('site-assets').getPublicUrl(filePath);
    // Immediately save to database
    setContent(id, data.publicUrl);
    setUploading(false);
  };

  const handleRevert = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setContent(id, undefined);
  };

  if (!isAdminActive) {
    return <img src={imageUrl} alt={alt} className={className} style={style} />;
  }

  return (
    <div className={`relative group/image overflow-hidden ${className}`} style={style}>
      {/* Standard Image tag */}
      <img src={imageUrl} alt={alt} className={`w-full h-full transition-all ${imgClassName}`} />

      {/* Admin Hover Overlay: Direct Upload Button */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover/image:opacity-100 flex flex-col items-center justify-center gap-4 transition-all duration-300 z-10">

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={32} className="text-white animate-spin" />
            <span className="text-white font-black text-[10px] uppercase tracking-[0.25em]">Uploading...</span>
          </div>
        ) : (
          <>
            <label className="flex flex-col items-center justify-center gap-2 cursor-pointer group/btn">
              <div className="p-3 bg-white/10 group-hover/btn:bg-primary-red rounded-full border border-white/20 text-white shadow-md transition-colors">
                <Camera size={20} />
              </div>
              <span className="text-white font-black text-[10px] uppercase tracking-[0.25em] bg-black/45 border border-white/10 px-3.5 py-1.5 rounded">
                Click to Change Image
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>

            {imageUrl !== defaultUrl && defaultUrl && (
              <button
                onClick={handleRevert}
                className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors"
                title="Remove image and revert to default"
              >
                <X size={16} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/* ─── Inline Editable File Component ──────────────────────── */
export const EditFileButton = ({ id, defaultUrl, accept = "*/*", label = "Upload File" }) => {
  const { isAdminActive, getContent, setContent } = useAdmin();
  const [uploading, setUploading] = useState(false);

  if (!isAdminActive) return null;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const filePath = `${id}_${timestamp}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('site-assets')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Upload failed:', uploadError.message);
      alert('File upload failed. Please try again.');
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('site-assets').getPublicUrl(filePath);
    setContent(id, data.publicUrl);
    setUploading(false);
  };

  return (
    <div className="mt-2 flex items-center gap-2">
      {uploading ? (
        <span className="text-xs text-primary-red font-bold animate-pulse">Uploading...</span>
      ) : (
        <label className="cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded border border-blue-200 transition-colors">
          {label}
          <input type="file" accept={accept} className="hidden" onChange={handleFileUpload} />
        </label>
      )}
    </div>
  );
};
