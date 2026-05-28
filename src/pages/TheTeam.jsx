import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { supabase } from '../lib/supabase';
import { EditText, EditImage } from '../components/Editable';
import { SectionManager } from '../components/SectionManager';

const DEFAULT_TEAM = [
  { name: "Raju Jagtap", role: "Founder & MD", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Akshay Mhatre", role: "Contracts & Procurement Head", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
  { name: "Suyog Jadhav", role: "Business Development & Operations", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
];

const TheTeam = () => {
  useScrollReveal();
  const [team, setTeam] = useState(DEFAULT_TEAM);

  const fetchTeam = async () => {
    const { data: imgRows } = await supabase
      .from('content')
      .select('id, url, sequence')
      .eq('pagename', 'team')
      .eq('type', 'team')
      .order('sequence');

    if (!imgRows || imgRows.length === 0) {
      setTeam([]);
      return;
    }

    const textIds = imgRows.flatMap(r => {
      const base = r.id.replace('_img', '');
      return [`${base}_name`, `${base}_role`];
    });
    const { data: textRows } = await supabase.from('content').select('id, url').in('id', textIds);
    const textMap = {};
    (textRows || []).forEach(r => { textMap[r.id] = r.url; });

    setTeam(imgRows.map(row => {
      const base = row.id.replace('_img', '');
      return {
        id: base,
        dbId: row.id,
        name: textMap[`${base}_name`] || 'New Team Member',
        role: textMap[`${base}_role`] || 'Role',
        img: row.url,
      };
    }));
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="pt-48 pb-24 bg-charcoal text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            <EditText id="team_header_tag" defaultValue="People" />
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">
            <EditText id="team_header_title" defaultValue="The Team" />
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            <EditText id="team_header_desc" defaultValue="Driven by expertise. United by the goal of engineering excellence." isTextArea={true} />
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-blue-grey relative">
        
        {/* Section Manager for Admins */}
        <SectionManager
          pageName="team"
          type="team"
          items={team}
          label="Manage Team Roster"
          renderItemLabel={(item) => item.name || 'New Member'}
          onUpdate={fetchTeam}
        />

        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading-red text-center mb-16">
            <EditText id="team_grid_title" defaultValue="Leadership" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <div key={member.id || i} className="reveal-on-scroll text-center group">
                <div className="h-96 overflow-hidden mb-6 shadow-xl relative">
                  <EditImage 
                    id={`${member.id || 'team_'+i}_img`}
                    defaultUrl={member.img} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h2 className="text-2xl font-extrabold text-charcoal uppercase">
                  <EditText id={`${member.id || 'team_'+i}_name`} defaultValue={member.name} />
                </h2>
                <div className="text-primary-red font-bold text-xs uppercase tracking-widest mt-2">
                  <EditText id={`${member.id || 'team_'+i}_role`} defaultValue={member.role} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TheTeam;
