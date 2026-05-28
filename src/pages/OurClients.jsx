import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { EditText, EditImage } from '../components/Editable';
import { SectionManager } from '../components/SectionManager';
import { useSectionData } from '../hooks/useSectionData';

const defaultClients = [
  { name: 'TATA', image: '' },
  { name: 'L&T', image: '' },
  { name: 'Godrej', image: '' },
  { name: 'Adani', image: '' },
  { name: 'TCS', image: '' },
  { name: 'GMR', image: '' },
  { name: 'DMRC', image: '' },
  { name: 'NHAI', image: '' },
];

const OurClients = () => {
  useScrollReveal();
  const { items: clients, refetch } = useSectionData('clients', 'client', defaultClients);

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="pt-48 pb-24 bg-charcoal text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-primary-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            <EditText id="clients_header_tag" defaultValue="Social Proof" />
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">
            <EditText id="clients_header_title" defaultValue="Our Clients" />
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            <EditText id="clients_header_desc" defaultValue="Trusted by India's most respected infrastructure and industrial brands." isTextArea={true} />
          </p>
        </div>
      </section>

      {/* Client Logo Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionManager
            pageName="clients"
            type="client"
            items={clients}
            label="Manage Clients"
            renderItemLabel={(item) => item.name || 'Client'}
            onUpdate={refetch}
            wrapperClassName="flex justify-end mb-8"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 reveal-on-scroll">
            {clients.map((client, i) => (
              <div
                key={client.dbId || i}
                className="h-28 border border-gray-100 flex items-center justify-center text-xl font-black uppercase tracking-[0.25em] text-charcoal/50 hover:border-primary-red hover:text-primary-red transition-all duration-300 relative group overflow-hidden"
              >
                {client.image ? (
                  <EditImage
                    id={`${client.baseId || 'client_'+i}_image`}
                    defaultUrl={client.image}
                    alt={client.name || 'Client'}
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <EditText id={`${client.baseId || 'client_'+i}_name`} defaultValue={client.name || 'Client'} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurClients;
