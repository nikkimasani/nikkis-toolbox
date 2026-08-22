(()=>{
const UNIFIED='https://toolbox-nine-eta.vercel.app/api/wtm-all';
async function loadUnified(show=true){const s=document.querySelector('#sync');if(show&&s)s.textContent='Loading all Houston sources…';try{const r=await fetch(UNIFIED+'?t='+Date.now(),{cache:'no-store'}),d=await r.json();if(!r.ok)throw Error('Unified feed failed');statuses=d.statuses||statuses;events=dedupe([...(d.events||[]),...imported]);if(typeof updateSelects==='function')updateSelects();render();if(s)s.textContent=`${d.count||d.events?.length||0} live events · unified Houston feed`;return d}catch(e){console.error('WTM unified feed failed',e);if(s)s.textContent='Some live sources could not load';return null}}
const oldRefresh=window.refresh;
window.refresh=()=>loadUnified(true);
const rb=document.querySelector('#refresh');if(rb)rb.onclick=()=>loadUnified(true);
setTimeout(()=>loadUnified(false),900);
setTimeout(()=>loadUnified(false),2600);
})();