const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

if (!fs.existsSync('.env')) {
  console.log("No .env found");
  process.exit(1);
}

const envContent = fs.readFileSync('.env', 'utf8');
const uMatch = envContent.match(/VITE_SUPABASE_URL\s*=\s*(.*)/);
const kMatch = envContent.match(/VITE_SUPABASE_ANON_KEY\s*=\s*(.*)/);
const supabaseUrl = uMatch[1].trim().replace(/['"`]/g, '');
const supabaseAnonKey = kMatch[1].trim().replace(/['"`]/g, '');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error } = await supabase
    .from('content')
    .select('id, pagename, type, url, sequence')
    .eq('pagename', 'blog');
  
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Found blog rows:", data.length);
    console.log(data);
  }
}
run();
