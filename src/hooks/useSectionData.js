import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useSectionData(pageName, type, defaultData = []) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    
    // 1. Fetch the "anchor" rows (images or main card objects)
    const { data: mainRows, error } = await supabase
      .from('content')
      .select('id, url, position, sequence')
      .eq('pagename', pageName)
      .eq('type', type)
      .order('sequence');

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    if (!mainRows || mainRows.length === 0) {
      if (defaultData && defaultData.length > 0) {
        // Seed the database with default data
        const inserts = [];
        defaultData.forEach((item, index) => {
          const baseId = `${type}_${Math.random().toString(36).substring(2, 8)}`;
          
          // Insert the anchor row
          inserts.push({
            id: `${baseId}_img`,
            pagename: pageName,
            type: type,
            status: 'published',
            sequence: index + 1,
            url: item.image || '' // Optional image
          });

          // Insert text fields
          Object.keys(item).forEach(key => {
            if (key !== 'image' && key !== 'id') {
              inserts.push({
                id: `${baseId}_${key}`,
                pagename: pageName,
                type: 'text', // Or something else, but text is fine
                status: 'published',
                sequence: index + 1,
                url: String(item[key])
              });
            }
          });
        });

        await supabase.from('content').insert(inserts);
        // Fetch again after seeding
        const { data: newMainRows } = await supabase
          .from('content')
          .select('id, url, position, sequence')
          .eq('pagename', pageName)
          .eq('type', type)
          .order('sequence');
          
        if (newMainRows) {
           await processAndSetItems(newMainRows);
        } else {
           setItems([]);
        }
      } else {
        setItems([]);
      }
      setLoading(false);
      return;
    }

    await processAndSetItems(mainRows);
    setLoading(false);
  }, [pageName, type]);

  const processAndSetItems = async (mainRows) => {

    // 2. Fetch all sibling text fields for this type in this page
    // By looking up all text fields that start with the base IDs
    const baseIds = mainRows.map(r => r.id.replace('_img', ''));
    
    // Supabase .in() max is large, but we can also just fetch all text for this page+type
    // Unfortunately, we didn't always store text with the same `type` (e.g. they might be type='text').
    // So we fetch by ID pattern. Since we can't easily do multiple LIKEs, we'll fetch all text for the page
    // and filter in memory, or use multiple .in() chunks.
    // Actually, just fetching all content for the page is super fast for a small site.
    const { data: allPageContent } = await supabase
      .from('content')
      .select('id, url')
      .eq('pagename', pageName);

    const textMap = {};
    (allPageContent || []).forEach(r => { textMap[r.id] = r.url; });

    // 3. Assemble
    const built = mainRows.map((row) => {
      const base = row.id.replace('_img', '');
      
      // We extract all keys that start with `${base}_` from the textMap
      const mappedData = {
        id: base,
        dbId: row.id,
        baseId: base,
        image: row.url,
        position: row.position,
      };

      Object.keys(textMap).forEach(key => {
        if (key.startsWith(`${base}_`)) {
          const propName = key.replace(`${base}_`, '');
          mappedData[propName] = textMap[key];
        }
      });

      return mappedData;
    });

    setItems(built);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { items, loading, refetch: fetchData };
}
