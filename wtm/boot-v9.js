(()=>{
const realFetch=window.fetch.bind(window);
window.__wtmRealFetch=realFetch;
window.fetch=(input,init)=>{
  try{
    const raw=typeof input==='string'?input:input.url;
    const u=new URL(raw,location.href);
    const isBase=u.hostname==='toolbox-nine-eta.vercel.app'&&u.pathname==='/api/wtm-events';
    const isSingleImport=u.searchParams.has('url');
    if(isBase&&!isSingleImport){
      const next=new URL('https://toolbox-nine-eta.vercel.app/api/wtm-all');
      for(const [k,v] of u.searchParams)next.searchParams.set(k,v);
      return realFetch(next.toString(),init);
    }
  }catch{}
  return realFetch(input,init);
};
if('serviceWorker' in navigator){
  navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister())).catch(()=>{});
  try{navigator.serviceWorker.register=()=>Promise.reject(new Error('WTM cache disabled during active development'))}catch{}
}
if('caches' in window){caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('wtm-')).map(k=>caches.delete(k)))).catch(()=>{});}
})();