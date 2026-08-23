// Cloudflare-only app registry for Nikki's Toolbox.
// This file is injected only into the Cloudflare build output. The Vercel
// production branch and its links remain unchanged.
window.NIKKI_CLOUDFLARE_APPS = {
  tradelab: { name: "Nikki's TradeLab", project: "tradelab-cloudflare", type: "pages", url: "https://tradelab-cloudflare.pages.dev" },
  booknook: { name: "The Book Nook", project: "reader-hub-cloudflare", type: "pages+r2", url: "https://reader-hub-cloudflare.pages.dev" },
  pmp: { name: "PMP Boot Camp", project: "pmp-boot-camp-cloudflare", type: "pages", url: "https://pmp-boot-camp-cloudflare.pages.dev" },
  slaterun: { name: "SlateRun Sports Hub", project: "slaterun-cloudflare", type: "pages", url: "https://slaterun-cloudflare.pages.dev" },
  craftclub: { name: "Dabble", project: "dabble-cloudflare", type: "pages", url: "https://dabble-cloudflare.pages.dev" },
  pmcopilot: { name: "PM Copilot", project: "pm-copilot-cloudflare", type: "pages", url: "https://pm-copilot-cloudflare.pages.dev" },
  lifecommand: { name: "Life OS", project: "life-os-cloudflare", type: "pages", url: "https://life-os-cloudflare.pages.dev" },
  careerarsenal: { name: "Career Arsenal", project: "career-arsenal-cloudflare", type: "workers-opennext", url: null },
  drawyourfont: { name: "Draw Your Font", project: "draw-your-font-cloudflare", type: "pages", url: "https://draw-your-font-cloudflare.pages.dev" },
  statvault: { name: "StatVault", project: "statvault-cloudflare", type: "pages-functions", url: "https://statvault-cloudflare.pages.dev" },
  bodycompass: { name: "Body Compass", project: "body-compass-cloudflare", type: "workers-opennext", url: null },
  makeitpretty: { name: "Make It Pretty", project: "make-it-pretty-cloudflare", type: "pages+python-worker", url: "https://make-it-pretty-cloudflare.pages.dev" },
  projectmanager: { name: "Nikki Project Manager", project: "nikki-project-manager-cloudflare", type: "pages", url: "https://nikki-project-manager-cloudflare.pages.dev" },
  ocode: { name: "OCode", project: "ocode-cloudflare", type: "workers-opennext", url: null },
  picommand: { name: "Pi Command Center", project: "pi-command-center-cloudflare", type: "pages", url: "https://pi-command-center-cloudflare.pages.dev" },
  hobonichi: { name: "Hobonichi Planner", project: "hobonichi-planner-cloudflare", type: "pages", url: "https://hobonichi-planner-cloudflare.pages.dev" },
  wtm: { name: "WTM | What’s the Move", project: "wtm-whats-the-move-cloudflare", type: "pages-functions", url: "https://wtm-whats-the-move-cloudflare.pages.dev" }
};

(function applyCloudflareRegistry() {
  document.documentElement.dataset.hosting = 'cloudflare';
  document.title = "Nikki's Toolbox · Cloudflare";
  const masthead = document.querySelector('.masthead .kicker');
  if (masthead) masthead.textContent = 'Personal toolbox · Cloudflare edition';

  for (const [className, app] of Object.entries(window.NIKKI_CLOUDFLARE_APPS)) {
    const card = document.querySelector(`.card.${className}`);
    if (!card) continue;
    card.dataset.cloudflareProject = app.project;
    card.dataset.cloudflareType = app.type;
    card.dataset.hosting = 'cloudflare';
    if (app.url) {
      card.href = app.url;
      card.dataset.cloudflareUrl = app.url;
      delete card.dataset.cloudflarePending;
    } else {
      card.dataset.cloudflarePending = 'true';
      card.setAttribute('aria-label', `${app.name} Cloudflare deployment pending final Worker URL`);
    }
  }
})();
