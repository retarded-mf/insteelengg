import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { EditText, EditImage } from '../components/Editable';
import { SectionManager } from '../components/SectionManager';
import { useSectionData } from '../hooks/useSectionData';
import { useAdmin } from '../context/AdminContext';

const defaultNews = [
  { title: "Insteel Wins Major Railway Station Contract", date: "May 2025", excerpt: "Insteel has been awarded the structural steel EPC contract for a flagship railway station modernisation project in Western India.", image: "https://images.unsplash.com/photo-1474487548417-781fbc05477d?auto=format&fit=crop&q=80&w=800" },
  { title: "New Fabrication Facility Inaugurated", date: "March 2025", excerpt: "A state-of-the-art 50,000 sq ft fabrication facility has been commissioned to expand production capacity by 40%.", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800" },
  { title: "ISO 9001:2015 Recertification Achieved", date: "January 2025", excerpt: "Insteel has successfully renewed its ISO 9001:2015 certification, reaffirming its commitment to quality management.", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800" },
];

const News = () => {
  const { items: news, refetch } = useSectionData('news', 'news_article', defaultNews);
  const { isAdminActive } = useAdmin();

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-48 pb-24 bg-charcoal text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            <EditText id="news_header_tag" defaultValue="Company Updates" />
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">
            <EditText id="news_header_title" defaultValue="News" />
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            <EditText id="news_header_desc" defaultValue="Latest announcements, contract wins, and milestones from Insteel Engineers." isTextArea={true} />
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <SectionManager
          pageName="news"
          type="news_article"
          items={news}
          label="Manage News"
          renderItemLabel={(item) => item.title || 'New Article'}
          onUpdate={refetch}
          wrapperClassName="flex justify-end mb-8"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {news.map((article, i) => {
            const articleLink = article.link || '#';

            return (
              <div key={article.dbId || i} className="group bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
                <div>
                  <div className="h-56 overflow-hidden">
                    <EditImage
                      id={`${article.baseId || 'news_'+i}_image`}
                      defaultUrl={article.image}
                      alt={article.title || 'News'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                      <Calendar size={14} className="mr-1.5 text-primary-red" />
                      <EditText id={`${article.baseId || 'news_'+i}_date`} defaultValue={article.date || 'Date'} />
                    </div>
                    <h3 className="text-xl font-extrabold text-charcoal mb-3 uppercase tracking-tight line-clamp-2">
                      <a href={articleLink} target="_blank" rel="noopener noreferrer">
                        <EditText id={`${article.baseId || 'news_'+i}_title`} defaultValue={article.title || 'Article Title'} />
                      </a>
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      <EditText id={`${article.baseId || 'news_'+i}_excerpt`} defaultValue={article.excerpt || 'Article excerpt.'} isTextArea={true} />
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <a 
                    href={articleLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-primary-red font-bold uppercase tracking-widest text-xs group/link"
                  >
                    Read Article <ArrowRight size={14} className="ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                  </a>

                  {isAdminActive && (
                    <div className="mt-6 pt-4 border-t border-gray-100 text-[10px] text-gray-400 font-bold uppercase tracking-wider flex flex-col gap-1">
                      <span>External / Article URL Link:</span>
                      <EditText id={`${article.baseId || 'news_'+i}_link`} defaultValue={article.link || '#'} className="text-primary-red" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {news.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
            <p className="font-bold text-sm">No news articles yet</p>
            <p className="text-xs mt-1">Click "Manage News" to add articles</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default News;
