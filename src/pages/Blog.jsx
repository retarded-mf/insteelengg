import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, User, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { EditText, EditImage } from '../components/Editable';
import { SectionManager } from '../components/SectionManager';
import { useSectionData } from '../hooks/useSectionData';
import { useAdmin } from '../context/AdminContext';

const defaultPosts = [
  {
    title: "How BIM is Reducing Fabrication Errors by 40%",
    category: "Engineering",
    date: "May 15, 2025",
    excerpt: "The integration of Building Information Modelling (BIM) level 3 is transforming the structural steel industry by providing unprecedented levels of precision before a single beam is cut.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Top 5 High-Rise Steel Projects in India: 2024 Edition",
    category: "Projects",
    date: "April 22, 2025",
    excerpt: "India's skyline is changing. From Mumbai's composite towers to tech parks in Pune, we look at the most innovative steel structures built this year.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Sustainable Roofing Solutions for Large Industrial Warehouses",
    category: "Sustainability",
    date: "March 10, 2025",
    excerpt: "Solar integration and thermal insulation are no longer optional. Discover how Insteel is leading the way in sustainable EPC solutions.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800"
  }
];

const BlogPost = ({ post, index, isAdminActive }) => {
  const navigate = useNavigate();
  const postLink = `/blog/${post.baseId || 'blog_post_'+index}`;

  return (
    <div className="group bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500">
      <div className="h-64 overflow-hidden relative">
        <EditImage id={`${post.baseId || 'blog_post_'+index}_image`} defaultUrl={post.image} alt={post.title || 'Post'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="p-8">
        <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 space-x-4">
          <span className="flex items-center"><Calendar size={14} className="mr-1.5" /> <EditText id={`${post.baseId || 'blog_post_'+index}_date`} defaultValue={post.date || 'Date'} /></span>
          <span className="flex items-center"><User size={14} className="mr-1.5" /> Admin</span>
        </div>
        <h3 className="text-2xl font-extrabold text-charcoal mb-4 line-clamp-2 hover:text-primary-red transition-colors cursor-pointer uppercase">
          <button onClick={() => navigate(postLink)} className="text-left w-full focus:outline-none">
            <EditText id={`${post.baseId || 'blog_post_'+index}_title`} defaultValue={post.title || 'Post Title'} />
          </button>
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 italic">
          <EditText id={`${post.baseId || 'blog_post_'+index}_excerpt`} defaultValue={post.excerpt || 'Post excerpt.'} isTextArea={true} />
        </p>
        <button 
          onClick={() => navigate(postLink)} 
          className="inline-flex items-center text-primary-red font-bold uppercase tracking-widest text-xs group/link focus:outline-none"
        >
          Read More <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const duplicatePostsTo100 = () => {
  const posts = [];
  const baseCategories = ["Engineering", "Projects", "Sustainability", "Innovation", "BIM Detailing"];
  // Count downwards so Page 1 shows higher volume numbers (e.g. Volume 34) and Page 2 shows lower (e.g. Volume 29)
  for (let i = 99; i >= 0; i--) {
    const defaultPost = defaultPosts[i % defaultPosts.length];
    posts.push({
      ...defaultPost,
      title: `${defaultPost.title} (Volume ${Math.floor(i / 3) + 1})`,
      category: baseCategories[i % baseCategories.length],
      baseId: `blog_post_${i}`
    });
  }
  return posts;
};

const Blog = () => {
  const allInitial100 = duplicatePostsTo100();
  const { items: postsData, refetch } = useSectionData('blog', 'blog_post', allInitial100);
  const { isAdminActive } = useAdmin();
  const navigate = useNavigate();

  // If dynamic entries are added, we ensure we scale to at least 100 by supplementing dynamically
  const posts = postsData.length >= 100 ? postsData : [
    ...postsData,
    ...allInitial100.slice(postsData.length)
  ];

  // Dropdown & Grid States (unified to page change throughout)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPage, setDropdownPage] = useState(0);
  const dropdownPageSize = 15; // Number of blogs to fit in the dropdown page

  // Paginated articles calculated dynamically to auto-reflect edits
  const totalDropdownPages = Math.ceil(posts.length / dropdownPageSize);
  const paginatedDropdownPosts = posts.slice(
    dropdownPage * dropdownPageSize,
    (dropdownPage + 1) * dropdownPageSize
  );

  const startEntryIndex = dropdownPage * dropdownPageSize + 1;
  const endEntryIndex = Math.min((dropdownPage + 1) * dropdownPageSize, posts.length);

  const scrollToGridTop = () => {
    const gridEl = document.getElementById('blog-grid-section');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrevDropdownPage = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (dropdownPage > 0) {
      setDropdownPage(prev => prev - 1);
    }
  };

  const handleNextDropdownPage = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (dropdownPage < totalDropdownPages - 1) {
      setDropdownPage(prev => prev + 1);
    }
  };

  const handlePrevBottomPage = () => {
    if (dropdownPage > 0) {
      setDropdownPage(prev => prev - 1);
      setTimeout(scrollToGridTop, 50);
    }
  };

  const handleNextBottomPage = () => {
    if (dropdownPage < totalDropdownPages - 1) {
      setDropdownPage(prev => prev + 1);
      setTimeout(scrollToGridTop, 50);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-24 bg-blue-grey border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-charcoal mb-6 uppercase tracking-tighter">
            <EditText id="blog_header_title" defaultValue="Industry Insights" />
          </h1>
          <p className="text-lg text-gray-400 font-bold uppercase tracking-[0.3em] mb-12">
            <EditText id="blog_header_slogan" defaultValue="Thoughts on Engineering, Construction & Innovation" />
          </p>

          {/* Paginated Dropdown Selector Index */}
          {posts.length > 0 && (
            <div className="relative w-full max-w-md z-30">
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className="w-full bg-white text-charcoal border border-gray-200/80 shadow-md hover:shadow-lg transition-all rounded-xl px-5 py-4 flex items-center justify-between text-xs font-black uppercase tracking-widest outline-none"
              >
                <span>Browse Article Index {totalDropdownPages > 1 && `(Page ${dropdownPage + 1} of ${totalDropdownPages})`}</span>
                <ChevronDown size={16} className={`text-primary-red transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden flex flex-col max-h-[450px]">
                  {/* Dynamic Index List */}
                  <div className="flex-1 overflow-y-auto py-2">
                    {paginatedDropdownPosts.map((p, index) => {
                      const postIdx = dropdownPage * dropdownPageSize + index;
                      const postLink = `/blog/${p.baseId || 'blog_post_' + postIdx}`;
                      return (
                        <button
                          key={p.dbId || postIdx}
                          onClick={() => {
                            setDropdownOpen(false);
                            navigate(postLink);
                          }}
                          className="w-full text-left px-5 py-3 hover:bg-slate-50 transition-colors text-[13px] font-bold text-gray-700 hover:text-primary-red border-b border-gray-50 uppercase tracking-tight block truncate"
                        >
                          {p.title || 'Untitled Article'}
                        </button>
                      );
                    })}
                  </div>

                  {/* Dropdown Page Controls */}
                  {totalDropdownPages > 1 && (
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 shrink-0">
                      <button
                        onClick={handlePrevDropdownPage}
                        disabled={dropdownPage === 0}
                        className="flex items-center gap-1 hover:text-charcoal disabled:opacity-20 outline-none"
                      >
                        <ChevronLeft size={14} /> Prev
                      </button>
                      <span>{dropdownPage + 1} / {totalDropdownPages}</span>
                      <button
                        onClick={handleNextDropdownPage}
                        disabled={dropdownPage === totalDropdownPages - 1}
                        className="flex items-center gap-1 hover:text-charcoal disabled:opacity-20 outline-none"
                      >
                        Next <ChevronRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Dynamic showing info block text */}
              <div className="mt-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Showing {startEntryIndex}-{endEntryIndex} of {posts.length} entries
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Grid */}
      <section id="blog-grid-section" className="py-24 max-w-7xl mx-auto px-4 scroll-mt-24">
        <SectionManager
          pageName="blog"
          type="blog_post"
          items={posts}
          label="Manage Blog Posts"
          renderItemLabel={(item) => item.title || 'New Post'}
          onUpdate={refetch}
          wrapperClassName="flex justify-end mb-8"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {paginatedDropdownPosts.map((post, i) => (
            <BlogPost key={post.dbId || i} index={dropdownPage * dropdownPageSize + i} post={post} isAdminActive={isAdminActive} />
          ))}
        </div>
        
        {/* Bottom Unified Grid Pagination controls */}
        {totalDropdownPages > 1 && (
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 pt-8 gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Showing {startEntryIndex}-{endEntryIndex} of {posts.length} entries
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevBottomPage}
                disabled={dropdownPage === 0}
                className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 text-charcoal border border-gray-200 text-xs font-black uppercase tracking-widest rounded transition-all focus:outline-none flex items-center gap-1"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <span className="text-xs font-black text-charcoal uppercase tracking-widest px-4">
                Page {dropdownPage + 1} of {totalDropdownPages}
              </span>
              <button
                onClick={handleNextBottomPage}
                disabled={dropdownPage === totalDropdownPages - 1}
                className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 text-charcoal border border-gray-200 text-xs font-black uppercase tracking-widest rounded transition-all focus:outline-none flex items-center gap-1"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
            <p className="font-bold text-sm">No blog posts yet</p>
            <p className="text-xs mt-1">Click "Manage Blog Posts" to add articles</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;
