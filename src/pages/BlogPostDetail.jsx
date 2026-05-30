import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import SEO from '../components/SEO';
import { EditText, EditImage } from '../components/Editable';
import { useAdmin } from '../context/AdminContext';

const BlogPostDetail = () => {
  const { id } = useParams();
  const { isAdminActive } = useAdmin();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('content')
        .select('element, url')
        .like('element', `${id}%`);

      if (error) {
        console.error('Error fetching blog detail:', error);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        const mapped = {
          id: id,
          image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200',
          title: 'Untitled Article',
          category: 'Industry',
          date: 'May 30, 2026',
          excerpt: '',
          body: ''
        };

        data.forEach(row => {
          if (row.element === `${id}_img`) mapped.image = row.url;
          if (row.element === `${id}_image`) mapped.image = row.url;
          if (row.element === `${id}_title`) mapped.title = row.url;
          if (row.element === `${id}_category`) mapped.category = row.url;
          if (row.element === `${id}_date`) mapped.date = row.url;
          if (row.element === `${id}_excerpt`) mapped.excerpt = row.url;
          if (row.element === `${id}_body`) mapped.body = row.url;
        });

        if (!mapped.body) {
          mapped.body = `Structural steel engineering is undergoing rapid modernization in India and globally. As demand grows for larger, more complex building shapes and significantly shorter construction timelines, our approach to engineering and construction platforms must adapt.\n\nFrom BIM Level 3 modeling and detailing to the final erected bolt, our teams verify alignment down to the millimeter. Using state-of-the-art software suite integrations, we drastically reduce fabrication error rates, ensuring seamless on-site execution.\n\nTo cater to grand scales—such as modernizing massive railway stations, sprawling airports, and multi-storey composite structures—scalability is key. Through our specialized fabrication facilities, we possess the raw logistics and design-build capability to deliver robust, high-safety structures on time, every single time, without compromise.`;
        }

        setPost(mapped);
      }
      setLoading(false);
    };

    fetchPostData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-primary-red rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center pt-24 text-center px-6">
        <h2 className="text-2xl font-black text-charcoal mb-4 uppercase">Article Not Found</h2>
        <p className="text-gray-400 text-sm mb-8 uppercase tracking-wider">The requested blog post could not be retrieved.</p>
        <Link to="/blog" className="btn-red inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-40 pb-24">
      <SEO title={`${post.title} | Insteel Blog`} description={post.excerpt} />

      <article className="max-w-4xl mx-auto bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden p-8 sm:p-12">
        {/* Back Link */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-400 hover:text-primary-red transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Insights
        </Link>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-charcoal mb-6 leading-[1.1]">
          <EditText id={`${post.id}_title`} defaultValue={post.title} />
        </h1>

        {/* Metadata */}
        <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-slate-100 pb-8 mb-8 space-x-6">
          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-primary-red" />
            <EditText id={`${post.id}_date`} defaultValue={post.date} />
          </span>
          <span className="flex items-center gap-2">
            <User size={14} className="text-primary-red" />
            Admin
          </span>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[450px] overflow-hidden rounded-xl mb-10 shadow-lg border border-slate-100">
          <EditImage id={`${post.id}_image`} defaultUrl={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body — editable */}
        <div className="prose prose-slate max-w-none text-gray-600 text-base leading-relaxed space-y-6 text-justify whitespace-pre-wrap">
          <EditText id={`${post.id}_body`} defaultValue={post.body} isTextArea={true} />
        </div>
      </article>
    </div>
  );
};

export default BlogPostDetail;
