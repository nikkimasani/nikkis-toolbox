(function(){
'use strict';
if(!Array.isArray(window.PI_PROJECTS)) return;
const S=(title,summary,actions,success,warning,visual)=>({title,summary,actions,success,warning,visual});
const byId=id=>window.PI_PROJECTS.find(p=>p.id===id);
const prepend=(id,steps)=>{const p=byId(id);if(!p)return;if(p.steps.some(s=>s.title==='Complete the Raspberry Pi base setup'))return;p.steps=[...steps,...p.steps];};
const base=S('Complete the Raspberry Pi base setup','Finish the computer, microSD, Raspberry Pi OS, Wi-Fi, SSH, update, and software-tool walkthrough before this project.',[
'Open the Setup Guide from the Pi Command Center sidebar. Do not skip directly to project wiring if this is your first Raspberry Pi build.',
'Use Raspberry Pi Imager on your Windows, macOS, or Ubuntu computer to write Raspberry Pi OS 64-bit Desktop to the 128 GB microSD card.',
'In Imager customization, set a username you will remember, hostname nikkipi, your Wi-Fi network, correct locale and timezone, and enable SSH with password authentication.',
'Boot the Pi and confirm you can sign in locally with the username and password you created.',
'From your normal computer, open Command Prompt, PowerShell, or Terminal and connect with ssh YOUR_USERNAME@nikkipi.local. If .local fails, use the Pi IP address shown by hostname -I.',
'Run the update commands from the Setup Guide, reboot, reconnect over SSH, and verify the Pi is online.',
'Install Chromium, Git, curl, Python, pip, venv, and gpiozero from the Setup Guide. Install Node.js only for projects that need JavaScript tooling.',
'Open the Setup Guide final verification page and confirm storage, RAM, temperature, Wi-Fi, SSH, Chromium, and shutdown all work before continuing.'
],'You can SSH into the Pi from your regular computer, the Pi is fully updated, and all required base tools are installed.','Do not continue with ribbon cables or GPIO wiring while the Pi is powered. Use sudo shutdown -h now before hardware changes.',['Imager','Raspberry Pi OS','Wi-Fi','SSH','Updates','Tools']);
prepend('smart-mirror',[base,
S('Create and test the mirror dashboard software','Build the black-background mirror page before installing anything in the frame.',[
'On your development computer, open the repository for your dashboard app or create a new Next.js project if you are starting from scratch.',
'Create a dedicated /mirror route so the mirror can have a simpler layout than your normal dashboard.',
'Set the page background to true black (#000000). Use high-contrast white text and avoid gray cards behind widgets because dark pixels are what disappear behind the two-way mirror.',
'Add only the first four widgets for the initial test: clock, date, weather placeholder, and one calendar placeholder. Do not connect every API yet.',
'Run the app locally and open the mirror route in a browser. Resize the browser to approximately 800 × 480 so it resembles the 7-inch screen.',
'Confirm no white margins, browser scrollbars, or accidental light backgrounds appear around the page.',
'Commit this basic mirror route to GitHub before adding physical hardware so you always have a working software checkpoint.'
],'The mirror route fills the browser with a black background and large readable content at 800 × 480.','Do not place API keys directly in client-side JavaScript. Use server-side environment variables for services that require secrets.',['Project folder','/mirror route','800 × 480 preview','Black background','Git commit']),
S('Deploy the mirror page and test it from the Pi','Move the working page from your development computer to Vercel, then verify the production URL on Raspberry Pi Chromium.',[
'Push the latest project commit to GitHub.',
'Open the connected Vercel project and wait until the production deployment reports Ready.',
'Copy the production mirror URL. Open that exact URL on your phone first to confirm the public deployment works.',
'SSH into nikkipi.local from your regular computer or use Terminal directly on the Pi.',
'Launch Chromium normally and open the production mirror URL. Verify the Pi can reach Vercel over Wi-Fi.',
'Press F11 or use Chromium full-screen once to verify the content fits the actual display before trying kiosk mode.',
'Only after the normal browser test passes, use the copy-ready kiosk command shown in this step.'
],'The production mirror page opens on the Pi, fits the 7-inch display, and remains readable in full-screen mode.','If the Vercel page works on your phone but not the Pi, troubleshoot Wi-Fi, DNS, and system time before changing your app code.',['GitHub push','Vercel Ready','Pi Chromium','Full screen','Kiosk test'])]);
prepend('dashboard',[base,
S('Create the dashboard project on your development computer','Scaffold the touch dashboard and verify it runs before connecting any Pi-specific hardware.',[
'Open Windows Terminal, PowerShell, macOS Terminal, or Ubuntu Terminal on your normal computer.',
'Choose a projects folder and create a new Next.js app using the copy-ready command below. Use TypeScript, App Router, and Tailwind when prompted.',
'Change into the new project folder, then start the local development server.',
'Open http://localhost:3000 in your browser and confirm the starter page appears.',
'Replace the starter page with a simple heading and six large placeholder tiles: Today, Fitness, Focus, Photos, Devices, and Settings.',
'Keep the terminal window running while you edit. The browser should refresh automatically after each saved change.',
'Create the first Git commit only after the clean six-tile shell is working.'
],'The dashboard runs locally and shows six large touch-friendly tiles without errors.','If npm is not recognized, install Node.js first. Do not troubleshoot React code until node -v and npm -v both work.',['Terminal','create-next-app','npm run dev','localhost:3000','6 tiles']),
S('Push the dashboard to GitHub and deploy it to Vercel','Create a repeatable cloud deployment before testing on the Pi.',[
'Create or choose the GitHub repository for the dashboard.',
'From the project folder, initialize Git if needed, add the files, create a commit, and push to the main branch.',
'Import the GitHub repository into Vercel and keep the default Next.js build settings unless the project requires something different.',
'Wait for Vercel to report a successful production deployment.',
'Open the production URL on your normal computer and phone. Test every tile and make sure refreshing a page does not cause an error.',
'Copy the production URL into a notes file because you will use the same URL in Chromium kiosk mode on the Pi.',
'After later edits, push to GitHub and verify Vercel finishes redeploying before judging the result on the Pi.'
],'The GitHub main branch and Vercel production deployment both contain the same working dashboard.','Do not test an old Vercel deployment by mistake. Confirm the deployment commit matches your latest GitHub commit.',['Git commit','GitHub','Vercel import','Production URL','Pi-ready'])]);
prepend('ai-terminal',[base,
S('Prepare the AI terminal web project','Create the browser UI and server route separately so the API credential never reaches the Pi browser.',[
'Use your existing dashboard repository or create a dedicated Next.js app from your development computer.',
'Create an /ai page with a large textarea, Send button, Stop button, Clear button, and a scrollable response area.',
'Create a server-side API route such as /api/chat. For the first test, make it return a hard-coded message instead of calling an AI service.',
'Run npm run dev and submit a message from the browser. Confirm the request reaches /api/chat and the hard-coded response appears.',
'Only after the local request path works should you add the AI SDK or provider package.',
'Put the API key in .env.local on your development computer and in Vercel Environment Variables for production. Never commit .env.local.',
'Restart the local dev server after changing environment variables, then test one real AI request.'
],'A prompt submitted in the browser returns a real response through the server route, while the API key remains absent from browser source.','Never paste an AI API key into HTML, client JavaScript, GitHub source, or a URL query string.',['AI page','/api/chat','env variable','Server request','Response']),
S('Deploy and test the AI terminal on the Pi','Verify keyboard, network, production API, and full-screen interaction on the real hardware.',[
'Commit and push the working AI terminal to GitHub.',
'Wait for Vercel production deployment to finish and confirm the required environment variable exists in the Production environment.',
'Open the production /ai URL on your normal computer and send a test prompt.',
'Open the same URL in Chromium on the Pi and connect the mini keyboard or its USB receiver.',
'Type a multi-line prompt, submit it, scroll a long response, clear the conversation, and test the touch controls.',
'If the Pi receives an HTTP error, open Chromium developer tools or test the API endpoint from your normal computer before changing hardware.',
'After the normal browser workflow is reliable, test full-screen or kiosk mode.'
],'The Pi can type, submit, receive, scroll, and clear AI conversations reliably using the production deployment.','Do not give the cloud AI unrestricted shell access to the Pi. Hardware commands should later go through a small allowlisted local agent.',['Vercel env','Production /ai','Mini keyboard','Touch test','Kiosk'])]);
prepend('cyberdeck',[base,
S('Prepare the cyberdeck operating environment','Verify the Pi can be administered remotely before enclosing ports and connectors.',[
'Complete the base Setup Guide and make sure SSH works from your normal computer.',
'Run hostname -I and write down the Pi IP address as a backup to nikkipi.local.',
'Run df -h, free -h, vcgencmd measure_temp, and uname -a to capture a healthy baseline before the Pi is enclosed.',
'Pair or connect the mini keyboard and test all typing rows, Enter, Backspace, arrow keys, and the touchpad.',
'Open Chromium, Terminal, and the Pi Command Center on the 7-inch display and verify the screen orientation is comfortable.',
'Reboot once, reconnect over SSH, and confirm the keyboard and display still work after boot.',
'Only after this software baseline passes should you begin the enclosure mock-up.'
],'You can control the Pi locally and over SSH, and you have recorded its normal temperature and system status.','Once the Pi is enclosed, troubleshooting ports becomes harder. Solve networking, keyboard, and display issues first.',['SSH baseline','System status','Keyboard','Touchscreen','Reboot test'])]);
prepend('home-panel',[base,
S('Choose where Home Assistant will run','Decide whether this Pi is only a touchscreen client or will also host Home Assistant before installing anything.',[
'If this Pi will mainly be your display and general-purpose computer, keep Raspberry Pi OS installed and run Home Assistant somewhere else.',
'If you want a dedicated Home Assistant appliance, understand that Home Assistant OS replaces normal Raspberry Pi OS and changes the rest of this project plan.',
'For the flexible path, use Raspberry Pi OS on this Pi and connect to an existing Home Assistant server over the network.',
'Write down the Home Assistant local URL and verify it opens from your normal computer.',
'Open the same URL in Chromium on the Pi and sign in manually.',
'Create a simple Home Assistant dashboard with only a few safe test entities before designing the final touch panel.',
'Confirm the Pi touchscreen can toggle a test light or helper entity successfully.'
],'The Pi can open your Home Assistant dashboard and control at least one test entity from the touchscreen.','Do not expose Home Assistant directly to the public internet just to make this panel work. Use supported remote-access methods.',['Raspberry Pi OS','Home Assistant URL','Login','Test entity','Touch control']),
S('Create the wall-panel or desk-panel browser workflow','Turn the tested Home Assistant page into a simple appliance-like display.',[
'Create a dedicated Home Assistant dashboard view for the 7-inch panel instead of using your full administrator dashboard.',
'Use large cards and keep the most-used controls on the first screen.',
'Hide destructive administration controls from the panel view.',
'Open the dedicated panel URL in Chromium on the Pi and test every control by touch.',
'Use Chromium full-screen first. Confirm no authentication prompts or browser dialogs interrupt normal use.',
'After the panel is stable, test kiosk launch with the dedicated panel URL.',
'Reboot the Pi and confirm you can still recover to the desktop or SSH if the browser fails.'
],'The panel opens to a dedicated touch-friendly Home Assistant view and remains recoverable through SSH.','Always keep a recovery path. A kiosk should not prevent you from administering the Pi when the browser or network fails.',['Panel dashboard','Large cards','Chromium','Kiosk','SSH recovery'])]);
prepend('electronics-lab',[base,
S('Create a safe Python project folder','Set up a dedicated place for GPIO scripts before wiring the first circuit.',[
'SSH into the Pi from your regular computer or open Terminal directly on the Pi.',
'Create a projects folder in your home directory, then create an electronics-lab folder inside it.',
'Change into the electronics-lab folder and run pwd so you can see the exact path you are working in.',
'Create a Python virtual environment if you want package isolation, or use the Raspberry Pi OS gpiozero package installed by the Setup Guide.',
'Create an empty blink.py file using nano or your preferred editor.',
'Exit the editor without running anything yet. Hardware should still be disconnected while you prepare the script.',
'Use ls -la to confirm blink.py exists in the folder.'
],'You are in a dedicated electronics-lab folder and have an empty blink.py ready for the first circuit.','Do not experiment as root. Normal GPIO learning scripts should run from your regular Pi user account.',['SSH','~/projects/electronics-lab','blink.py','ls -la']),
S('Learn the GPIO header before connecting a wire','Identify physical pin numbers versus BCM GPIO numbers so the written code matches the correct header pin.',[
'Power the Pi off before placing jumper wires on the GPIO header.',
'Locate physical pin 1 on the 40-pin header using a reliable Raspberry Pi 5 pinout reference.',
'Understand that gpiozero LED(17) means BCM GPIO17, not physical pin 17.',
'Locate BCM GPIO17 and a GND pin on the header before inserting a jumper wire.',
'Choose a 220 Ω to 330 Ω resistor from the component kit for the LED circuit.',
'Identify the LED long leg as anode (+) and the short leg / flat side as cathode (-).',
'Build the circuit with power still disconnected, then compare every connection against the diagram before booting.'
],'You can point to BCM GPIO17, GND, the resistor, LED anode, and LED cathode before applying power.','The Pi GPIO uses 3.3 V logic. Never connect a GPIO pin directly to 5 V. Never omit the LED resistor.',['Pi header','BCM GPIO17','GND','Resistor','LED polarity'])]);
prepend('pomodoro',[base,
S('Build the timer in the web app before using the Pi','Create and test the focus timer on your development computer first.',[
'Open your dashboard repository on your normal computer.',
'Create a /focus page with a large 25:00 display and Start, Pause, Reset, and Complete buttons.',
'Keep timer state in JavaScript and update the display once per second.',
'Add a 5-minute break mode after the first timer works. Do not add statistics yet.',
'Run npm run dev and test Start, Pause, Reset, tab switching, and browser refresh behavior.',
'Add localStorage persistence only after the basic timer is reliable.',
'Commit the working timer before adding hardware buttons.'
],'The local /focus page can complete a full shortened test cycle and recover cleanly after pause/reset.','Test with a 10-second temporary duration during development. Waiting 25 minutes to test each change wastes time.',['/focus route','25:00','Controls','localStorage','Git commit']),
S('Deploy Focus mode and open it on the Pi','Confirm the touchscreen workflow before wiring physical buttons.',[
'Push the focus page to GitHub and wait for the Vercel production deployment to finish.',
'Open the production /focus page on your normal computer and verify the latest version is live.',
'Open the same URL in Pi Chromium.',
'Tap Start, Pause, Reset, and Complete using only your finger.',
'Check whether the display dims or sleeps during a running timer and adjust desktop power settings if necessary.',
'Test full-screen mode, then kiosk mode only after normal browser use works.',
'Run several short test sessions before adding GPIO buttons.'
],'The production timer is comfortable to operate on the Pi touchscreen without a mouse or keyboard.','Do not debug GPIO buttons and web-timer bugs at the same time. Prove the touchscreen version first.',['Vercel','Pi Chromium','Touch controls','Screen awake','Kiosk'])]);
prepend('glance',[base,
S('Create the rotating information page','Build a passive display that works without touching the screen.',[
'Create a /glance page in your dashboard project.',
'Add five full-screen panels: clock/weather, calendar, fitness, current project, and photos.',
'Add a simple JavaScript timer that advances to the next panel every 30 seconds.',
'Add a visible development control that lets you manually move Next and Previous while testing.',
'Use CSS transitions that last less than one second and avoid CPU-heavy animated backgrounds.',
'Run locally at 800 × 480 and watch several complete rotations for clipping or layout jumps.',
'Add a Night mode with reduced brightness or darker content before deploying.'
],'The page rotates through every panel automatically and remains readable at 800 × 480.','A passive display should not require constant network calls every second. Cache or update data at sensible intervals.',['/glance','5 panels','30-second rotation','Night mode','800 × 480']),
S('Deploy and configure Glance mode on the Pi','Make the passive display start reliably and recover after network interruptions.',[
'Push the page to GitHub and wait for Vercel production to report Ready.',
'Open the production /glance URL on the Pi in normal Chromium.',
'Leave it running for at least 15 minutes and confirm multiple rotations complete.',
'Disconnect Wi-Fi briefly and observe what the page does. Static clock and cached content should not collapse the whole layout.',
'Reconnect Wi-Fi and confirm widgets recover without a manual reboot.',
'Test kiosk mode manually with the production URL.',
'Only after the manual test passes should you add Chromium to autostart.'
],'The Pi can run the rotating display for 15 minutes, survive a brief network interruption, and recover.','Do not add autostart before the manual kiosk command works. Otherwise boot failures become much harder to troubleshoot.',['Vercel','15-minute run','Offline test','Recovery','Autostart'])]);
prepend('photo-frame',[base,
S('Prepare the photo source and slideshow page','Start with a small controlled album before loading hundreds of images.',[
'Create a /photos route in your dashboard app.',
'Choose five test images with different orientations and aspect ratios.',
'Place the test images in the public folder or use a small cloud storage collection.',
'Create a full-screen image area using object-fit: cover or contain depending on whether cropping is acceptable.',
'Add automatic advance every 15 seconds and manual Previous/Next controls for testing.',
'Add a caption area that can be hidden when no caption exists.',
'Run the page at 800 × 480 and inspect portrait, landscape, and square photos for awkward cropping.'
],'Five test images rotate correctly and look intentional on the 7-inch aspect ratio.','Do not optimize hundreds of images before the five-image test layout is correct.',['/photos','5 images','15-second timer','Caption','800 × 480']),
S('Deploy the slideshow and test long-running playback','Verify the Pi can display the gallery without memory growth, sleep interruptions, or browser chrome.',[
'Push the photo page to GitHub and wait for the production deployment.',
'Open /photos on the Pi in normal Chromium.',
'Let the slideshow run for at least 20 minutes while watching for stalled images or screen sleep.',
'Use the Pi desktop settings to prevent unwanted screen blanking if the frame should remain on.',
'Test full-screen mode and verify no browser UI covers the photo.',
'Add more images in batches only after the test set is stable.',
'If using cloud storage, test what happens when Wi-Fi disconnects and reconnects.'
],'The slideshow runs for 20 minutes without stopping, sleeping unexpectedly, or showing broken images.','Consider screen longevity. An always-on display should have a sleep schedule or dim period when you do not need it.',['Vercel','Pi slideshow','20-minute test','Screen blanking','Full screen'])]);
prepend('magic-frame',[base,
S('Finish Smart Mirror and Photo Frame software first','Treat the Magic Mirror Frame as an integration project rather than trying to invent every subsystem at once.',[
'Complete the Smart Mirror software test through production kiosk mode before continuing.',
'Complete the Digital Photo Frame five-image slideshow test before continuing.',
'Confirm both modes work from separate URLs or a reliable mode switch in the same app.',
'On your development computer, add a single Magic mode that can switch between black mirror state and photo state.',
'Add a manual Wake button for testing before connecting any motion sensor.',
'Add an automatic timeout that returns the page to the black mirror state after 30 to 90 seconds.',
'Run repeated manual wake/sleep cycles locally before deploying to the Pi.'
],'The web app can repeatedly switch from black mirror state to photo state and automatically return to black.','Do not add a motion sensor until manual software wake/sleep behavior is reliable.',['Mirror mode','Photo mode','Wake','Timeout','Black state']),
S('Deploy and test the combined Magic mode on the Pi','Verify the complete software state machine before adding the physical trigger.',[
'Push the combined mode to GitHub and wait for Vercel production.',
'Open the Magic mode URL on the Pi.',
'Run at least ten manual wake/sleep cycles using the touchscreen or keyboard.',
'Confirm the page returns to true black after every timeout and does not leave bright controls visible.',
'Reboot the Pi, reopen the mode, and verify the default state is the intended mirror state.',
'Test kiosk mode manually.',
'Only after all tests pass should you proceed to a GPIO button or motion sensor trigger.'
],'Ten wake/sleep cycles and one reboot complete without the page becoming stuck in the wrong state.','A black webpage is not the same as turning the LCD backlight off. Decide whether you want mirror illusion only or actual display sleep.',['Production Magic mode','10 cycles','Black state','Reboot','Kiosk'])]);
window.PI_DEEP_DIVE_VERSION='2026-08-17';
})();