const KEY='nikki-project-manager-cloudflare-v1';
const state=load();
const statuses=[['todo','To do'],['doing','In progress'],['done','Done']];
const board=document.getElementById('board'),search=document.getElementById('search'),notes=document.getElementById('notes'),modal=document.getElementById('modal'),form=document.getElementById('taskForm');
notes.value=state.notes||'';
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{tasks:[],notes:''}}catch{return{tasks:[],notes:''}}}
function save(){state.notes=notes.value;localStorage.setItem(KEY,JSON.stringify(state))}
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function render(){const q=search.value.trim().toLowerCase();board.innerHTML=statuses.map(([id,label])=>{const items=state.tasks.filter(t=>t.status===id&&(!q||`${t.title} ${t.project} ${t.detail}`.toLowerCase().includes(q)));return `<section class="col"><h2>${label}<span class="count">${items.length}</span></h2><div class="cards">${items.length?items.map(taskCard).join(''):'<div class="empty">No tasks here.</div>'}</div></section>`}).join('')}
function taskCard(t){const idx=statuses.findIndex(([s])=>s===t.status);return `<article class="card"><h3>${esc(t.title)}</h3>${t.detail?`<p>${esc(t.detail)}</p>`:''}<div class="meta"><span>${esc(t.project||'General')}</span><span class="move">${idx>0?`<button onclick="moveTask('${t.id}',-1)">←</button>`:''}${idx<2?`<button onclick="moveTask('${t.id}',1)">→</button>`:''}<button onclick="editTask('${t.id}')">Edit</button><button onclick="deleteTask('${t.id}')">×</button></span></div></article>`}
window.moveTask=(id,dir)=>{const t=state.tasks.find(x=>x.id===id);if(!t)return;const i=statuses.findIndex(([s])=>s===t.status);t.status=statuses[Math.max(0,Math.min(2,i+dir))][0];save();render()};
window.deleteTask=id=>{state.tasks=state.tasks.filter(t=>t.id!==id);save();render()};
window.editTask=id=>open(state.tasks.find(t=>t.id===id));
function open(t=null){form.dataset.id=t?.id||'';document.getElementById('taskTitle').value=t?.title||'';document.getElementById('taskProject').value=t?.project||'';document.getElementById('taskDetail').value=t?.detail||'';document.getElementById('taskStatus').value=t?.status||'todo';modal.classList.add('open');document.getElementById('taskTitle').focus()}
function close(){modal.classList.remove('open');form.reset();form.dataset.id=''}
form.addEventListener('submit',e=>{e.preventDefault();const item={id:form.dataset.id||crypto.randomUUID(),title:document.getElementById('taskTitle').value.trim(),project:document.getElementById('taskProject').value.trim(),detail:document.getElementById('taskDetail').value.trim(),status:document.getElementById('taskStatus').value,updatedAt:Date.now()};const i=state.tasks.findIndex(t=>t.id===item.id);if(i>=0)state.tasks[i]=item;else state.tasks.push(item);save();close();render()});
document.getElementById('newTaskBtn').onclick=()=>open();document.getElementById('cancelBtn').onclick=close;modal.addEventListener('click',e=>{if(e.target===modal)close()});search.addEventListener('input',render);notes.addEventListener('input',save);
document.getElementById('clearDone').onclick=()=>{state.tasks=state.tasks.filter(t=>t.status!=='done');save();render()};
document.getElementById('exportBtn').onclick=()=>{save();const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),...state},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`nikki-project-manager-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
document.getElementById('importInput').addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{const data=JSON.parse(await f.text());if(!Array.isArray(data.tasks))throw Error();state.tasks=data.tasks.filter(t=>t&&t.title&&['todo','doing','done'].includes(t.status));state.notes=String(data.notes||'');notes.value=state.notes;save();render()}catch{alert('That backup could not be imported.')}e.target.value=''});
render();
