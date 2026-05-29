import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
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
  const postLink = post.link || '#';

  return (
    <div className="group bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500 reveal-on-scroll">
      <div className="h-64 overflow-hidden relative">
        <EditImage id={`${post.baseId || 'blog_post_'+index}_image`} defaultUrl={post.image} alt={post.title || 'Post'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-primary-red text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
            <EditText id={`${post.baseId || 'blog_post_'+index}_category`} defaultValue={post.category || 'Category'} />
          </span>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 space-x-4">
          <span className="flex items-center"><Calendar size={14} className="mr-1.5" /> <EditText id={`${post.baseId || 'blog_post_'+index}_date`} defaultValue={post.date || 'Date'} /></span>
          <span className="flex items-center"><User size={14} className="mr-1.5" /> Admin</span>
        </div>
        <h3 className="text-2xl font-extrabold text-charcoal mb-4 line-clamp-2 hover:text-primary-red transition-colors cursor-pointer uppercase">
          <a href={postLink} target="_blank" rel="noopener noreferrer">
            <EditText id={`${post.baseId || 'blog_post_'+index}_title`} defaultValue={post.title || 'Post Title'} />
          </a>
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 italic">
          <EditText id={`${post.baseId || 'blog_post_'+index}_excerpt`} defaultValue={post.excerpt || 'Post excerpt.'} isTextArea={true} />
        </p>
        <a 
          href={postLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center text-primary-red font-bold uppercase tracking-widest text-xs group/link"
        >
          Read More <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-2 transition-transform" />
        </a>

        {isAdminActive && (
          <div className="mt-6 pt-4 border-t border-gray-100 text-[10px] text-gray-400 font-bold uppercase tracking-wider flex flex-col gap-1">
            <span>External / Article URL Link:</span>
            <EditText id={`${post.baseId || 'blog_post_'+index}_link`} defaultValue={post.link || '#'} className="text-primary-red" />
          </div>
        )}
      </div>
    </div>
  );
};

const Blog = () => {
  const { items: posts, refetch } = useSectionData('blog', 'blog_post', defaultPosts);
  const { isAdminActive } = useAdmin();

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-24 bg-blue-grey border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-charcoal mb-6 uppercase tracking-tighter">
            <EditText id="blog_header_title" defaultValue="Industry Insights" />
          </h1>
          <p className="text-lg text-gray-400 font-bold uppercase tracking-[0.3em]">
            <EditText id="blog_header_slogan" defaultValue="Thoughts on Engineering, Construction & Innovation" />
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4">
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
          {posts.map((post, i) => (
            <BlogPost key={post.dbId || i} index={i} post={post} isAdminActive={isAdminActive} />
          ))}
        </div>
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
