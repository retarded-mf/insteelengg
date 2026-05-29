const { createClient } = require('@supabase/supabase-client');
require('dotenv').config(); // if any, or read supabase config

// We can just import supabase client config from d:\insteelengg\src\lib\supabase.js
// Wait, we can run a simple node script that reads supabase client variables from src/lib/supabase.js
const fs = require('fs');
const content = fs.readFileSync('d:/insteelengg/src/lib/supabase.js', 'utf8');
const urlMatch = content.match(/supabaseUrl\s*=\s*['"`](.*?)['"`]/);
const keyMatch = content.match(/supabaseAnonKey\s*=\s*['"`](.*?)['"`]/);

if (!urlMatch || !keyMatch) {
  console.log("Could not find supabase credentials in supabase.js");
  process.exit(1);
}

const supabaseUrl = urlMatch[1];
const supabaseAnonKey = keyMatch[1];

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
