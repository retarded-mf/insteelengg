// ─── seed.js ────────────────────────────────────────────────
// Run once to seed the Supabase content table with all default
// site content. Then delete this file.
//
// Usage: node seed.js
// ────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://enxjxhvefmfhproeitnj.supabase.co',
  'sb_publishable_s1Fa1-4mfhpdRtnZz5GTOA_uiQjPTi9'
);

const rows = [
  // ── Hero Carousel ──────────────────────────────────────────
  { id: 'hero_brand_tagline',         type: 'text',  url: "India's Structural Steel EPC Partner",      pagename: 'home', pageno: 1, sectionno: 1, sequence: 1 },
  { id: 'hero_brand_statement',       type: 'text',  url: 'Every Project. On Time. Without Compromise.', pagename: 'home', pageno: 1, sectionno: 1, sequence: 2 },

  // Slide 0
  { id: 'hero_slide_0_img',      type: 'image', url: 'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=1920', position: 'center 20%', pagename: 'home', pageno: 1, sectionno: 1, sequence: 10 },
  { id: 'hero_slide_0_category', type: 'text',  url: 'Railway Stations',                          pagename: 'home', pageno: 1, sectionno: 1, sequence: 11 },
  { id: 'hero_slide_0_title',    type: 'text',  url: 'Gandhinagar Railway Station',               pagename: 'home', pageno: 1, sectionno: 1, sequence: 12 },
  { id: 'hero_slide_0_statement',type: 'text',  url: 'On time, On spec. No exceptions.',          pagename: 'home', pageno: 1, sectionno: 1, sequence: 13 },

  // Slide 1
  { id: 'hero_slide_1_img',      type: 'image', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920', position: 'center', pagename: 'home', pageno: 1, sectionno: 1, sequence: 20 },
  { id: 'hero_slide_1_category', type: 'text',  url: 'High-Rise Steel Buildings',                pagename: 'home', pageno: 1, sectionno: 1, sequence: 21 },
  { id: 'hero_slide_1_title',    type: 'text',  url: 'Pune - Nyati Plaza',                        pagename: 'home', pageno: 1, sectionno: 1, sequence: 22 },
  { id: 'hero_slide_1_statement',type: 'text',  url: 'From drawing to delivery — one team.',      pagename: 'home', pageno: 1, sectionno: 1, sequence: 23 },

  // Slide 2
  { id: 'hero_slide_2_img',      type: 'image', url: '/src/assets/images/projects/composite/composite_coe-1.jpg', position: 'top', pagename: 'home', pageno: 1, sectionno: 1, sequence: 30 },
  { id: 'hero_slide_2_category', type: 'text',  url: 'Special Structures',                       pagename: 'home', pageno: 1, sectionno: 1, sequence: 31 },
  { id: 'hero_slide_2_title',    type: 'text',  url: 'Center of Excellence, Ahmedabad',          pagename: 'home', pageno: 1, sectionno: 1, sequence: 32 },
  { id: 'hero_slide_2_statement',type: 'text',  url: 'Research-led, Precision-built.',           pagename: 'home', pageno: 1, sectionno: 1, sequence: 33 },

  // Slide 3
  { id: 'hero_slide_3_img',      type: 'image', url: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1920', position: 'center', pagename: 'home', pageno: 1, sectionno: 1, sequence: 40 },
  { id: 'hero_slide_3_category', type: 'text',  url: 'High-Rise Steel Buildings',                pagename: 'home', pageno: 1, sectionno: 1, sequence: 41 },
  { id: 'hero_slide_3_title',    type: 'text',  url: 'TCS Sahyadri Park, Mumbai',                pagename: 'home', pageno: 1, sectionno: 1, sequence: 42 },
  { id: 'hero_slide_3_statement',type: 'text',  url: 'Large-scale steel, Delivered without compromise.', pagename: 'home', pageno: 1, sectionno: 1, sequence: 43 },

  // Slide 4
  { id: 'hero_slide_4_img',      type: 'image', url: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=1920', position: 'center 30%', pagename: 'home', pageno: 1, sectionno: 1, sequence: 50 },
  { id: 'hero_slide_4_category', type: 'text',  url: 'Airports',                                 pagename: 'home', pageno: 1, sectionno: 1, sequence: 51 },
  { id: 'hero_slide_4_title',    type: 'text',  url: 'Lucknow Airport',                          pagename: 'home', pageno: 1, sectionno: 1, sequence: 52 },
  { id: 'hero_slide_4_statement',type: 'text',  url: 'Complex structures, Seamless execution.',  pagename: 'home', pageno: 1, sectionno: 1, sequence: 53 },

  // Slide 5
  { id: 'hero_slide_5_img',      type: 'image', url: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1920', position: 'center 40%', pagename: 'home', pageno: 1, sectionno: 1, sequence: 60 },
  { id: 'hero_slide_5_category', type: 'text',  url: 'Connecting Bridges',                      pagename: 'home', pageno: 1, sectionno: 1, sequence: 61 },
  { id: 'hero_slide_5_title',    type: 'text',  url: 'Godrej Play Bridge, Mumbai',               pagename: 'home', pageno: 1, sectionno: 1, sequence: 62 },
  { id: 'hero_slide_5_statement',type: 'text',  url: 'Engineering beyond the blueprint.',        pagename: 'home', pageno: 1, sectionno: 1, sequence: 63 },

  // ── Home Page — Who We Are (Section 2) ────────────────────
  { id: 'home_whoweare_tagline', type: 'text',  url: 'Building Capabilities', pagename: 'home', pageno: 1, sectionno: 2, sequence: 1 },
  { id: 'home_whoweare_header',  type: 'text',  url: 'Who We Are',             pagename: 'home', pageno: 1, sectionno: 2, sequence: 2 },
  { id: 'home_whoweare_body',    type: 'text',  url: 'For over two decades, Insteel Engineers Ltd has delivered landmark steel structures across India — from high-rise composite buildings to railway stations. We are a one-window EPC solution.', pagename: 'home', pageno: 1, sectionno: 2, sequence: 3 },
  { id: 'home_whoweare_image',   type: 'image', url: 'https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=1200', pagename: 'home', pageno: 1, sectionno: 2, sequence: 4 },

  // ── Home Page — Featured Projects (Section 3) ─────────────
  { id: 'home_featured_project_0_image', type: 'image', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', pagename: 'home', pageno: 1, sectionno: 3, sequence: 1 },
  { id: 'home_featured_project_0_name',  type: 'text',  url: 'Nyati Plaza',                   pagename: 'home', pageno: 1, sectionno: 3, sequence: 2 },
  { id: 'home_featured_project_0_type',  type: 'text',  url: 'High-Rise Buildings (Steel)',   pagename: 'home', pageno: 1, sectionno: 3, sequence: 3 },
  { id: 'home_featured_project_0_loc',   type: 'text',  url: 'Pune',                          pagename: 'home', pageno: 1, sectionno: 3, sequence: 4 },
  { id: 'home_featured_project_1_image', type: 'image', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800', pagename: 'home', pageno: 1, sectionno: 3, sequence: 5 },
  { id: 'home_featured_project_1_name',  type: 'text',  url: 'TCS Sahyadri Park',             pagename: 'home', pageno: 1, sectionno: 3, sequence: 6 },
  { id: 'home_featured_project_1_type',  type: 'text',  url: 'High-Rise Buildings (Steel)',   pagename: 'home', pageno: 1, sectionno: 3, sequence: 7 },
  { id: 'home_featured_project_1_loc',   type: 'text',  url: 'Mumbai',                        pagename: 'home', pageno: 1, sectionno: 3, sequence: 8 },
  { id: 'home_featured_project_2_image', type: 'image', url: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=800', pagename: 'home', pageno: 1, sectionno: 3, sequence: 9 },
  { id: 'home_featured_project_2_name',  type: 'text',  url: 'Lucknow Airport',               pagename: 'home', pageno: 1, sectionno: 3, sequence: 10 },
  { id: 'home_featured_project_2_type',  type: 'text',  url: 'Airports',                      pagename: 'home', pageno: 1, sectionno: 3, sequence: 11 },
  { id: 'home_featured_project_2_loc',   type: 'text',  url: 'Lucknow',                       pagename: 'home', pageno: 1, sectionno: 3, sequence: 12 },

  // ── Home Page — Principles (Section 4) ────────────────────
  { id: 'home_principle_0_image', type: 'image', url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200', pagename: 'home', pageno: 1, sectionno: 4, sequence: 1 },
  { id: 'home_principle_0_tag',   type: 'text',  url: 'Thought',  pagename: 'home', pageno: 1, sectionno: 4, sequence: 2 },
  { id: 'home_principle_0_title', type: 'text',  url: 'Manan',    pagename: 'home', pageno: 1, sectionno: 4, sequence: 3 },
  { id: 'home_principle_0_body',  type: 'text',  url: 'Constantly building capabilities of self and people to create lasting value. We believe in the power of deliberate reflection and foresight in engineering.', pagename: 'home', pageno: 1, sectionno: 4, sequence: 4 },
  { id: 'home_principle_1_image', type: 'image', url: 'https://images.unsplash.com/photo-1541888941259-79273ceb0022?auto=format&fit=crop&q=80&w=1200', pagename: 'home', pageno: 1, sectionno: 4, sequence: 5 },
  { id: 'home_principle_1_tag',   type: 'text',  url: 'Way To',   pagename: 'home', pageno: 1, sectionno: 4, sequence: 6 },
  { id: 'home_principle_1_title', type: 'text',  url: 'Sadhana',  pagename: 'home', pageno: 1, sectionno: 4, sequence: 7 },
  { id: 'home_principle_1_body',  type: 'text',  url: 'To provide an engineering and construction platform of innovative, simplified solutions to structural projects through dedicated practice and refinement.', pagename: 'home', pageno: 1, sectionno: 4, sequence: 8 },

  // ── About Page ────────────────────────────────────────────
  { id: 'about_header_tagline',     type: 'text', url: 'Who We Are',                pagename: 'about', pageno: 2, sectionno: 1, sequence: 1 },
  { id: 'about_header_title',       type: 'text', url: 'About Insteel',             pagename: 'about', pageno: 2, sectionno: 1, sequence: 2 },
  { id: 'about_header_description', type: 'text', url: 'From BIM and detailing to the last erected bolt — one team, every stage, zero compromise.', pagename: 'about', pageno: 2, sectionno: 1, sequence: 3 },

  // ── Projects Page ──────────────────────────────────────────
  { id: 'project_nyatiplaza_img',        type: 'card', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', position: 'center', pagename: 'projects', pageno: 3, sectionno: 1, sequence: 1 },
  { id: 'project_nyatiplaza_name',       type: 'text', url: 'Nyati Plaza',                   pagename: 'projects', pageno: 3, sectionno: 1, sequence: 2 },
  { id: 'project_nyatiplaza_location',   type: 'text', url: 'Pune',                          pagename: 'projects', pageno: 3, sectionno: 1, sequence: 3 },
  { id: 'project_nyatiplaza_category',   type: 'text', url: 'High-Rise Buildings (Steel)',   pagename: 'projects', pageno: 3, sectionno: 1, sequence: 4 },
  { id: 'project_nyatiplaza_description',type: 'text', url: 'Multi-storey steel composite structure in the heart of Pune.', pagename: 'projects', pageno: 3, sectionno: 1, sequence: 5 },

  { id: 'project_tcssahyadri_img',        type: 'card', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800', position: 'center', pagename: 'projects', pageno: 3, sectionno: 1, sequence: 10 },
  { id: 'project_tcssahyadri_name',       type: 'text', url: 'TCS Sahyadri Park',            pagename: 'projects', pageno: 3, sectionno: 1, sequence: 11 },
  { id: 'project_tcssahyadri_location',   type: 'text', url: 'Mumbai',                       pagename: 'projects', pageno: 3, sectionno: 1, sequence: 12 },
  { id: 'project_tcssahyadri_category',   type: 'text', url: 'High-Rise Buildings (Steel)',  pagename: 'projects', pageno: 3, sectionno: 1, sequence: 13 },
  { id: 'project_tcssahyadri_description',type: 'text', url: 'Extensive steel works for one of the largest IT campuses.', pagename: 'projects', pageno: 3, sectionno: 1, sequence: 14 },

  { id: 'project_lucknowairport_img',        type: 'card', url: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=800', position: 'center', pagename: 'projects', pageno: 3, sectionno: 1, sequence: 20 },
  { id: 'project_lucknowairport_name',       type: 'text', url: 'Lucknow Airport',           pagename: 'projects', pageno: 3, sectionno: 1, sequence: 21 },
  { id: 'project_lucknowairport_location',   type: 'text', url: 'Lucknow',                   pagename: 'projects', pageno: 3, sectionno: 1, sequence: 22 },
  { id: 'project_lucknowairport_category',   type: 'text', url: 'Airports',                  pagename: 'projects', pageno: 3, sectionno: 1, sequence: 23 },
  { id: 'project_lucknowairport_description',type: 'text', url: 'Complex structural steel for the terminal building.', pagename: 'projects', pageno: 3, sectionno: 1, sequence: 24 },

  { id: 'project_mopaairport_img',      type: 'card', url: 'https://images.unsplash.com/photo-1473876637954-4b493d59fd97?auto=format&fit=crop&q=80&w=800', position: 'center', pagename: 'projects', pageno: 3, sectionno: 1, sequence: 30 },
  { id: 'project_mopaairport_name',     type: 'text', url: 'Mopa Airport',                   pagename: 'projects', pageno: 3, sectionno: 1, sequence: 31 },
  { id: 'project_mopaairport_location', type: 'text', url: 'Goa',                            pagename: 'projects', pageno: 3, sectionno: 1, sequence: 32 },
  { id: 'project_mopaairport_category', type: 'text', url: 'Airports',                       pagename: 'projects', pageno: 3, sectionno: 1, sequence: 33 },

  { id: 'project_godrejbridge_img',      type: 'card', url: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=800', position: 'center', pagename: 'projects', pageno: 3, sectionno: 1, sequence: 40 },
  { id: 'project_godrejbridge_name',     type: 'text', url: 'Godrej Play Bridge',            pagename: 'projects', pageno: 3, sectionno: 1, sequence: 41 },
  { id: 'project_godrejbridge_location', type: 'text', url: 'Mumbai',                        pagename: 'projects', pageno: 3, sectionno: 1, sequence: 42 },
  { id: 'project_godrejbridge_category', type: 'text', url: 'Connecting Bridges',            pagename: 'projects', pageno: 3, sectionno: 1, sequence: 43 },

  { id: 'project_gandhinagarstation_img',      type: 'card', url: 'https://images.unsplash.com/photo-1474487548417-781fbc05477d?auto=format&fit=crop&q=80&w=800', position: 'center', pagename: 'projects', pageno: 3, sectionno: 1, sequence: 50 },
  { id: 'project_gandhinagarstation_name',     type: 'text', url: 'Gandhinagar Station',     pagename: 'projects', pageno: 3, sectionno: 1, sequence: 51 },
  { id: 'project_gandhinagarstation_location', type: 'text', url: 'Gandhinagar',             pagename: 'projects', pageno: 3, sectionno: 1, sequence: 52 },
  { id: 'project_gandhinagarstation_category', type: 'text', url: 'Railway Stations',        pagename: 'projects', pageno: 3, sectionno: 1, sequence: 53 },

  { id: 'project_sciencepark_img',      type: 'card', url: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800', position: 'center', pagename: 'projects', pageno: 3, sectionno: 1, sequence: 60 },
  { id: 'project_sciencepark_name',     type: 'text', url: 'Science Park',                  pagename: 'projects', pageno: 3, sectionno: 1, sequence: 61 },
  { id: 'project_sciencepark_location', type: 'text', url: 'Ahmedabad',                     pagename: 'projects', pageno: 3, sectionno: 1, sequence: 62 },
  { id: 'project_sciencepark_category', type: 'text', url: 'High-Rise Buildings',           pagename: 'projects', pageno: 3, sectionno: 1, sequence: 63 },

  { id: 'project_pondicherry_img',      type: 'card', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800', position: 'center', pagename: 'projects', pageno: 3, sectionno: 1, sequence: 70 },
  { id: 'project_pondicherry_name',     type: 'text', url: 'Pondicherry Convention Centre', pagename: 'projects', pageno: 3, sectionno: 1, sequence: 71 },
  { id: 'project_pondicherry_location', type: 'text', url: 'Pondicherry',                   pagename: 'projects', pageno: 3, sectionno: 1, sequence: 72 },
  { id: 'project_pondicherry_category', type: 'text', url: 'Special Structures',            pagename: 'projects', pageno: 3, sectionno: 1, sequence: 73 },

  // ── Team Page ──────────────────────────────────────────────
  { id: 'team_rajujagtap_img',       type: 'team', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', pagename: 'team', pageno: 4, sectionno: 1, sequence: 1 },
  { id: 'team_rajujagtap_name',      type: 'text', url: 'Raju Jagtap',                          pagename: 'team', pageno: 4, sectionno: 1, sequence: 2 },
  { id: 'team_rajujagtap_role',      type: 'text', url: 'Founder & MD',                         pagename: 'team', pageno: 4, sectionno: 1, sequence: 3 },

  { id: 'team_akshaymhatre_img',     type: 'team', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', pagename: 'team', pageno: 4, sectionno: 1, sequence: 10 },
  { id: 'team_akshaymhatre_name',    type: 'text', url: 'Akshay Mhatre',                        pagename: 'team', pageno: 4, sectionno: 1, sequence: 11 },
  { id: 'team_akshaymhatre_role',    type: 'text', url: 'Contracts & Procurement Head',         pagename: 'team', pageno: 4, sectionno: 1, sequence: 12 },

  { id: 'team_suyogjadhav_img',      type: 'team', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400', pagename: 'team', pageno: 4, sectionno: 1, sequence: 20 },
  { id: 'team_suyogjadhav_name',     type: 'text', url: 'Suyog Jadhav',                         pagename: 'team', pageno: 4, sectionno: 1, sequence: 21 },
  { id: 'team_suyogjadhav_role',     type: 'text', url: 'Business Development & Operations',    pagename: 'team', pageno: 4, sectionno: 1, sequence: 22 },
];

// Add status: 'published' to all rows
const data = rows.map(r => ({ ...r, status: 'published' }));

async function seed() {
  console.log(`Seeding ${data.length} rows...`);
  const { error } = await supabase.from('content').upsert(data, { onConflict: 'id' });
  if (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
  console.log('✅ Seed complete.');
}

seed();
