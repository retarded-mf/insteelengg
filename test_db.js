import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://enxjxhvefmfhproeitnj.supabase.co',
  'sb_publishable_s1Fa1-4mfhpdRtnZz5GTOA_uiQjPTi9'
);

async function check() {
  const { data, error } = await supabase.from('content').select('*').eq('pagename', 'home');
  console.log('Slides in DB with pagename home:', data ? data.map(d => ({id: d.id})) : error);
}

check();
