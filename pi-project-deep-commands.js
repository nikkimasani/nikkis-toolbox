(function(){
'use strict';
const REG={
'Create and test the mirror dashboard software':[
['Create a Next.js app if needed','Windows / macOS / Ubuntu terminal','npx create-next-app@latest pi-dashboard\ncd pi-dashboard\nnpm run dev'],
['Open the local mirror page','Browser','http://localhost:3000/mirror']
],
'Deploy the mirror page and test it from the Pi':[
['Connect to the Pi over SSH','Windows Command Prompt / PowerShell / macOS / Ubuntu terminal','ssh YOUR_USERNAME@nikkipi.local'],
['Launch production mirror in normal Chromium','Raspberry Pi terminal','chromium https://YOUR-APP.vercel.app/mirror'],
['Test kiosk mode','Raspberry Pi terminal','chromium --kiosk --noerrdialogs --disable-infobars https://YOUR-APP.vercel.app/mirror']
],
'Create the dashboard project on your development computer':[
['Create the dashboard','Windows / macOS / Ubuntu terminal','npx create-next-app@latest pi-dashboard'],
['Enter the project folder','Terminal','cd pi-dashboard'],
['Start the development server','Terminal','npm run dev'],
['Verify Node and npm if npm fails','Terminal','node -v\nnpm -v']
],
'Push the dashboard to GitHub and deploy it to Vercel':[
['Initialize Git','Terminal','git init\ngit add .\ngit commit -m "Initial Pi dashboard"'],
['Check Git status','Terminal','git status'],
['Push after adding your GitHub remote','Terminal','git branch -M main\ngit push -u origin main']
],
'Prepare the AI terminal web project':[
['Create a Next.js app if needed','Terminal','npx create-next-app@latest pi-ai-terminal\ncd pi-ai-terminal\nnpm run dev'],
['Install the OpenAI package only when ready','Terminal','npm install openai'],
['Create a local environment file','macOS / Ubuntu terminal','touch .env.local'],
['Create a local environment file','Windows PowerShell','New-Item .env.local -ItemType File']
],
'Deploy and test the AI terminal on the Pi':[
['SSH into the Pi','Computer terminal','ssh YOUR_USERNAME@nikkipi.local'],
['Open the AI page on the Pi','Raspberry Pi terminal','chromium https://YOUR-APP.vercel.app/ai'],
['Test full-screen kiosk','Raspberry Pi terminal','chromium --kiosk https://YOUR-APP.vercel.app/ai']
],
'Prepare the cyberdeck operating environment':[
['Connect over SSH','Computer terminal','ssh YOUR_USERNAME@nikkipi.local'],
['Show IP address','Raspberry Pi terminal','hostname -I'],
['Check disk, RAM, temperature, and kernel','Raspberry Pi terminal','df -h\nfree -h\nvcgencmd measure_temp\nuname -a']
],
'Choose where Home Assistant will run':[
['Check the Pi IP address','Raspberry Pi terminal','hostname -I'],
['Test network reachability from Windows','Windows Command Prompt','ping nikkipi.local'],
['Test network reachability from Ubuntu/macOS','Terminal','ping -c 4 nikkipi.local']
],
'Create the wall-panel or desk-panel browser workflow':[
['Open Home Assistant normally','Raspberry Pi terminal','chromium http://HOME_ASSISTANT_IP:8123'],
['Test kiosk mode','Raspberry Pi terminal','chromium --kiosk http://HOME_ASSISTANT_IP:8123']
],
'Create a safe Python project folder':[
['Create the folder and file','Raspberry Pi terminal','mkdir -p ~/projects/electronics-lab\ncd ~/projects/electronics-lab\ntouch blink.py\npwd\nls -la'],
['Optional virtual environment','Raspberry Pi terminal','python3 -m venv .venv\nsource .venv/bin/activate']
],
'Learn the GPIO header before connecting a wire':[
['Safely shut down before wiring','Raspberry Pi terminal','sudo shutdown -h now']
],
'Build the timer in the web app before using the Pi':[
['Start your dashboard locally','Development computer terminal','cd YOUR_DASHBOARD_FOLDER\nnpm install\nnpm run dev'],
['Open Focus mode locally','Browser','http://localhost:3000/focus']
],
'Deploy Focus mode and open it on the Pi':[
['SSH to Pi','Computer terminal','ssh YOUR_USERNAME@nikkipi.local'],
['Open production Focus page','Raspberry Pi terminal','chromium https://YOUR-APP.vercel.app/focus'],
['Test Focus kiosk mode','Raspberry Pi terminal','chromium --kiosk https://YOUR-APP.vercel.app/focus']
],
'Create the rotating information page':[
['Start the web app locally','Development computer terminal','npm run dev'],
['Open Glance mode locally','Browser','http://localhost:3000/glance']
],
'Deploy and configure Glance mode on the Pi':[
['Open Glance mode on Pi','Raspberry Pi terminal','chromium https://YOUR-APP.vercel.app/glance'],
['Test kiosk mode','Raspberry Pi terminal','chromium --kiosk https://YOUR-APP.vercel.app/glance']
],
'Prepare the photo source and slideshow page':[
['Start local development','Development computer terminal','npm run dev'],
['Open Photos mode locally','Browser','http://localhost:3000/photos']
],
'Deploy the slideshow and test long-running playback':[
['Open slideshow on Pi','Raspberry Pi terminal','chromium https://YOUR-APP.vercel.app/photos'],
['Test slideshow kiosk mode','Raspberry Pi terminal','chromium --kiosk https://YOUR-APP.vercel.app/photos']
],
'Finish Smart Mirror and Photo Frame software first':[
['Start the combined app locally','Development computer terminal','npm run dev'],
['Open Magic mode locally','Browser','http://localhost:3000/magic']
],
'Deploy and test the combined Magic mode on the Pi':[
['Open Magic mode on Pi','Raspberry Pi terminal','chromium https://YOUR-APP.vercel.app/magic'],
['Test Magic kiosk mode','Raspberry Pi terminal','chromium --kiosk https://YOUR-APP.vercel.app/magic']
]
};
function esc(v){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function block(items){return `<section class="command-section deep-command-section"><div class="section-mini"><span>Exact commands</span><h3>Copy, paste, then verify</h3><p>Replace placeholders such as YOUR_USERNAME and YOUR-APP before running. Run only the commands for the computer named above the block.</p></div>${items.map((x,i)=>`<div class="code-card"><div class="code-head"><div><strong>${esc(x[0])}</strong><span>${esc(x[1])}</span></div><button class="copy-btn deep-copy" data-deep-copy="deepcmd-${i}">⧉ Copy</button></div><pre id="deepcmd-${i}"><code>${esc(x[2])}</code></pre></div>`).join('')}</section>`;}
function copy(btn){const el=document.getElementById(btn.dataset.deepCopy);if(!el)return;const text=el.innerText;const ok=()=>{const old=btn.textContent;btn.textContent='✓ Copied';setTimeout(()=>btn.textContent=old,1200)};if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(ok).catch(()=>fallback(el,ok));}else fallback(el,ok);}
function fallback(el,ok){const r=document.createRange();r.selectNodeContents(el);const s=window.getSelection();s.removeAllRanges();s.addRange(r);document.execCommand('copy');s.removeAllRanges();ok();}
function enhance(){const guide=document.querySelector('.guide-card');if(!guide)return;const title=guide.querySelector('h2')?.textContent?.trim();if(!title||!REG[title]||guide.querySelector('.deep-command-section'))return;const target=guide.querySelector('.build-section');if(target)target.insertAdjacentHTML('beforebegin',block(REG[title]));}
const obs=new MutationObserver(()=>enhance());obs.observe(document.documentElement,{subtree:true,childList:true});
document.addEventListener('click',e=>{const b=e.target.closest('[data-deep-copy]');if(b){e.preventDefault();copy(b);}},true);
setTimeout(enhance,0);
})();