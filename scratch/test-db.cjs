const { createClient } = require('@supabase/supabase-js');

const fs = require('fs');
const content = fs.readFileSync('src/lib/supabase.js', 'utf8');
const urlMatch = content.match(/const\s+supabaseUrl\s*=\s*['"`](.*?)['"`]/) || content.match(/import\.meta\.env\.VITE_SUPABASE_URL/) || content.match(/supabaseUrl\s*=\s*['"`](.*?)['"`]/);
const keyMatch = content.match(/const\s+supabaseAnonKey\s*=\s*['"`](.*?)['"`]/) || content.match(/import\.meta\.env\.VITE_SUPABASE_ANON_KEY/) || content.match(/supabaseAnonKey\s*=\s*['"`](.*?)['"`]/);

let supabaseUrl = urlMatch ? urlMatch[1] : null;
let supabaseAnonKey = keyMatch ? keyMatch[1] : null;

// Read from process env if import.meta.env
if (!supabaseUrl || !supabaseAnonKey) {
  // Let's read .env
  if (fs.existsSync('.env')) {
    const envContent = fs.readFileSync('.env', 'utf8');
    const uMatch = envContent.match(/VITE_SUPABASE_URL\s*=\s*(.*)/);
    const kMatch = envContent.match(/VITE_SUPABASE_ANON_KEY\s*=\s*(.*)/);
    if (uMatch) supabaseUrl = uMatch[1].trim().replace(/['"`]/g, '');
    if (kMatch) supabaseAnonKey = kMatch[1].trim().replace(/['"`]/g, '');
  }
}

console.log("Connecting to:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error } = await supabase
    .from('content')
    .select('id, pagename, type, url, sequence')
    .eq('pagename', 'projects');
  
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Found rows:", data.length);
    console.log(data);
  }
}
run();
