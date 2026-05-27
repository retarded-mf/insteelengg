import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { EditText, EditImage } from '../components/Editable';

const BlogPost = ({ index, title, category, date, excerpt, img }) => (
  <div className="group bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500 reveal-on-scroll">
    <div className="h-64 overflow-hidden relative">
      <EditImage id={`blog_post_${index}_image`} defaultUrl={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-primary-red text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
          <EditText id={`blog_post_${index}_category`} defaultValue={category} />
        </span>
      </div>
    </div>
    <div className="p-8">
      <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 space-x-4">
        <span className="flex items-center"><Calendar size={14} className="mr-1.5" /> <EditText id={`blog_post_${index}_date`} defaultValue={date} /></span>
        <span className="flex items-center"><User size={14} className="mr-1.5" /> Admin</span>
      </div>
      <h3 className="text-2xl font-extrabold text-charcoal mb-4 line-clamp-2 hover:text-primary-red transition-colors cursor-pointer uppercase">
        <EditText id={`blog_post_${index}_title`} defaultValue={title} />
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 italic">
        <EditText id={`blog_post_${index}_excerpt`} defaultValue={excerpt} isTextArea={true} />
      </p>
      <button className="flex items-center text-primary-red font-bold uppercase tracking-widest text-xs group/link">
        Read More <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-2 transition-transform" />
      </button>
    </div>
  </div>
);

const Blog = () => {
  const posts = [
    {
      title: "How BIM is Reducing Fabrication Errors by 40%",
      category: "Engineering",
      date: "May 15, 2025",
      excerpt: "The integration of Building Information Modelling (BIM) level 3 is transforming the structural steel industry by providing unprecedented levels of precision before a single beam is cut.",
      img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Top 5 High-Rise Steel Projects in India: 2024 Edition",
      category: "Projects",
      date: "April 22, 2025",
      excerpt: "India's skyline is changing. From Mumbai's composite towers to tech parks in Pune, we look at the most innovative steel structures built this year.",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Sustainable Roofing Solutions for Large Industrial Warehouses",
      category: "Sustainability",
      date: "March 10, 2025",
      excerpt: "Solar integration and thermal insulation are no longer optional. Discover how Insteel is leading the way in sustainable EPC solutions.",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800"
    }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <BlogPost key={i} index={i} {...post} />
          ))}
        </div>
        
        {/* Pagination Placeholder */}
        <div className="mt-20 flex justify-center space-x-4">
          <button className="w-12 h-12 border-2 border-primary-red bg-primary-red text-white font-bold flex items-center justify-center">1</button>
          <button className="w-12 h-12 border-2 border-gray-100 text-gray-400 font-bold hover:border-primary-red hover:text-primary-red flex items-center justify-center transition-all">2</button>
          <button className="w-12 h-12 border-2 border-gray-100 text-gray-400 font-bold hover:border-primary-red hover:text-primary-red flex items-center justify-center transition-all">3</button>
        </div>
      </section>
    </div>
  );
};

export default Blog;
