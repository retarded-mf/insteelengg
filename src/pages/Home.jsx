import React from 'react';
import { ArrowRight } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import WhyInsteel from '../components/WhyInsteel';
import ClientProof from '../components/ClientProof';
import StatCounter from '../components/StatCtr';
import { EditText, EditImage } from '../components/Editable';
import { SectionManager } from '../components/SectionManager';
import { useSectionData } from '../hooks/useSectionData';

const Home = () => {
  useScrollReveal();

  const { items: featuredProjects, refetch: refetchProjects } = useSectionData('home', 'featured_projects', [
    { name: "Nyati Plaza", loc: "Pune", type: "High-Rise Buildings (Steel)", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
    { name: "TCS Sahyadri Park", loc: "Mumbai", type: "High-Rise Buildings (Steel)", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800" },
    { name: "Lucknow Airport", loc: "Lucknow", type: "Airports", image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=800" },
  ]);

  const { items: principles, refetch: refetchPrinciples } = useSectionData('home', 'principles', [
    {
      tag: "Thought",
      title: "Manan",
      body: "Constantly building capabilities of self and people to create lasting value. We believe in the power of deliberate reflection and foresight in engineering.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200",
      rev: "false"
    },
    {
      tag: "Way To",
      title: "Sadhana",
      body: "To provide an engineering and construction platform of innovative, simplified solutions to structural projects through dedicated practice and refinement.",
      image: "https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=1200",
      rev: "true"
    },
  ]);

  return (
    <div>
      {/* Hero */}
      <HeroCarousel />

      {/* Section 2: Who We Are */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="reveal-on-scroll order-2 lg:order-1">
              <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-6 block">
                <EditText id="home_whoweare_tagline" defaultValue="Building Capabilities" />
              </span>
              <h2 className="text-charcoal font-black text-6xl md:text-8xl uppercase tracking-tighter leading-[0.9] mb-10">
                <EditText id="home_whoweare_header" defaultValue="Who We Are" />
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed mb-10 font-bold italic border-l-4 border-gray-100 pl-10 max-w-xl">
                <EditText id="home_whoweare_body" defaultValue="For over two decades, Insteel Engineers Ltd has delivered landmark steel structures across India — from high-rise composite buildings to railway stations. We are a one-window EPC solution." isTextArea={true} />
              </p>

              <div className="grid grid-cols-2 gap-12 mb-16">
                {[
                  { label: "Years", val: "20+" },
                  { label: "Engineers", val: "150+" },
                  { label: "Sq. Ft. Office", val: "8000+" },
                  { label: "Clients", val: "200+" }
                ].map((stat, i) => (
                  <div key={i} className="group">
                    <StatCounter
                      value={stat.val}
                      label={stat.label}
                      valueClassName="text-6xl font-black text-charcoal group-hover:text-primary-red transition-colors duration-500 tracking-tighter"
                    />
                  </div>
                ))}
              </div>

              <Link to="/about" className="group inline-flex items-center space-x-6">
                <span className="text-charcoal font-black uppercase text-xs tracking-[0.4em] group-hover:text-primary-red transition-colours duration-500">
                  <EditText id="home_discover_button" defaultValue="Discover Our Journey" />
                </span>
                <span className="w-16 h-[2px] bg-charcoal group-hover:w-24 group-hover:bg-primary-red transition-all duration-500" />
              </Link>
            </div>
            <div className="reveal-on-scroll order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary-red translate-x-6 translate-y-6 -z-10 opacity-5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
                <EditImage
                  id="home_whoweare_image"
                  defaultUrl="https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=1200"
                  alt="Who We Are"
                  className="w-full h-[700px] object-cover shadow-2xl group-hover:scale-[1.03] transition-all duration-1000"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyInsteel />

      {/* Section 6: Featured Projects */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-24 reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
                <EditText id="home_projects_tag" defaultValue="Archive" />
              </span>
              <h2 className="text-charcoal font-black text-6xl md:text-8xl uppercase tracking-tighter leading-none">
                <EditText id="home_projects_title" defaultValue="Our Work Speaks" />
              </h2>
            </div>
            <SectionManager
              pageName="home"
              type="featured_projects"
              items={featuredProjects}
              label="Manage Featured Projects"
              renderItemLabel={(item) => item.name || 'Project'}
              onUpdate={refetchProjects}
              wrapperClassName="shrink-0"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {featuredProjects.map((proj, i) => (
              <div key={proj.dbId || i} className="reveal-on-scroll group">
                <div className="h-[500px] overflow-hidden mb-10 relative">
                  <EditImage id={`${proj.baseId || 'home_featured_project_' + i}_image`} defaultUrl={proj.image} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <h3 className="text-charcoal font-black text-3xl mb-1 uppercase tracking-tighter">
                  <EditText id={`${proj.baseId || 'home_featured_project_' + i}_name`} defaultValue={proj.name} />
                </h3>
                <p className="text-gray-400 text-[18px] font-black uppercase tracking-widest">
                  <EditText id={`${proj.baseId || 'home_featured_project_' + i}_loc`} defaultValue={proj.loc} /> — Site Archive
                </p>
                <div className="text-primary-red text-[11px] font-black uppercase tracking-[0.3em] mb-4">
                  <EditText id={`${proj.baseId || 'home_featured_project_' + i}_type`} defaultValue={proj.type} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex justify-center reveal-on-scroll">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-4 text-charcoal font-black uppercase text-xs tracking-[0.4em] hover:text-primary-red transition-colors"
            >
              Explore Full Portfolio
              <span className="w-12 h-[2px] bg-charcoal group-hover:w-20 group-hover:bg-primary-red transition-all duration-500" />
            </Link>
          </div>
        </div>
      </section>

      <ClientProof />

      {/* Section 7: Company Principles */}
      <section className="pt-32 pb-40 bg-blue-grey">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-5">
            <h2 className="text-primary-red font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
              <EditText id="home_principles_title" defaultValue="Insteel Principles" />
            </h2>
          </div>

          <SectionManager
            pageName="home"
            type="principles"
            items={principles}
            label="Manage Principles"
            renderItemLabel={(item) => item.title || 'Principle'}
            onUpdate={refetchPrinciples}
            wrapperClassName="flex justify-center mb-16"
          />
          <div className="space-y-60 relative">
            {principles.map((prin, i) => (
              <div key={prin.dbId || i} className={`flex flex-col ${(prin.rev === 'true' || prin.rev === true) ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-32 reveal-on-scroll`}>
                <div className="w-full lg:w-3/5 relative group">
                  <div className="absolute inset-0 bg-primary-red translate-x-4 translate-y-4 -z-10 opacity-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
                  <EditImage id={`${prin.baseId || 'home_principle_' + i}_image`} defaultUrl={prin.image} alt={prin.title} className="w-full h-[600px] object-cover shadow-2xl" />
                </div>
                <div className="w-full lg:w-2/5">
                  <span className="text-primary-red font-black text-xs uppercase tracking-[0.6em] mb-8 block opacity-50">
                    /<EditText id={`${prin.baseId || 'home_principle_' + i}_tag`} defaultValue={prin.tag} />/
                  </span>
                  <h3 className="text-6xl md:text-8xl font-black text-charcoal mb-10 uppercase tracking-tighter leading-none">
                    <EditText id={`${prin.baseId || 'home_principle_' + i}_title`} defaultValue={prin.title} />
                  </h3>
                  <p className="text-2xl text-gray-400 leading-relaxed font-bold italic border-l-2 border-gray-100 pl-10">
                    <EditText id={`${prin.baseId || 'home_principle_' + i}_body`} defaultValue={prin.body} isTextArea={true} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
