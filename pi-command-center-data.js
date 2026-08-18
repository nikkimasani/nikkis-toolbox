const S=(title,summary,actions,success,warning,visual)=>({title,summary,actions,success,warning,visual});
const P=(id,title,icon,difficulty,time,category,summary,materials,steps)=>({id,title,icon,difficulty,time,category,summary,materials,steps});
window.PI_FOUNDATION=[
'Flash Raspberry Pi OS 64-bit Desktop to the 128 GB SanDisk microSD card with Raspberry Pi Imager.',
'In Raspberry Pi Imager settings, enable SSH, enter your Wi-Fi credentials, set hostname to nikkipi, and choose America/Chicago.',
'Install the Raspberry Pi 5 in the Pi 5 metal case. Use the 45W USB-C power supply for the Pi 5.',
'Boot once with HDMI if needed. Finish Raspberry Pi OS setup, then run sudo apt update && sudo apt full-upgrade -y.',
'Power the Pi completely off before connecting or disconnecting any DSI ribbon cable.',
'Connect one 7-inch display, boot again, then test display, touch, Wi-Fi, SSH, and temperature before mounting anything permanently.'
];
window.PI_PROJECTS=[
P('smart-mirror','Smart Mirror','🪞','Medium','6–8 hours','Display','Build a real two-way smart mirror in the 12 × 12 shadow box with the Pi 5 and 7-inch display.',[
'Raspberry Pi 5 4GB','iUniker Pi 5 metal case','7-inch DSI touchscreen','Pi 5 DSI FPC cable','12 × 12 shadow box','Two-way acrylic mirror sheet','45W USB-C power supply','128 GB microSD','Heavy-duty Velcro','Black foam board or matte black tape','Precision screwdriver set'
],[
S('Test the mirror effect before mounting','Confirm your particular mirror acrylic and display are bright enough together before you cut, tape, or mount anything.',[
'Place the powered-off 7-inch display flat on a soft, clean towel so the screen cannot scratch.','Power the display and Pi on while everything is still loose on your desk.','Open a mostly black test page with very large white text, a white clock, and one bright icon.','Hold one two-way mirror sheet directly in front of the screen without removing protective film if the film is transparent enough to test.','Look at the mirror from straight on, then from your normal standing angle. Test once with room lights on and once with lights dimmed.','Increase display brightness only as much as needed. Note the brightness level that gives the best balance between mirror reflection and readable text.'],
'You can clearly read white text through the mirror while black areas mostly disappear into the reflection.','Do not cut the acrylic or permanently mount the display until this test passes.',['Two-way mirror','7-inch display','White text visible','Black background hidden']),
S('Dry-fit every layer in the shadow box','Make sure the mirror, display, Pi, and cable paths physically fit before adding adhesive.',[
'Open the shadow box and remove its rear panel and any decorative insert.','Place the two-way mirror sheet at the very front where the original glass would sit.','Position the display centered behind the mirror. Keep the LCD face parallel to the mirror.','Place the Pi 5 metal case behind or beside the display where it will not press against the LCD.','Hold the back panel in position without closing it. Confirm there is room for the DSI ribbon, USB-C power lead, and airflow.','Mark the display center and Pi position lightly with painter tape so you can reproduce the layout.'],
'The back panel can close without pushing on the display, Pi, or cables.','Pressure on the LCD can cause bright spots, cracking, or touch problems. Nothing should squeeze the screen.',['Front of frame','Mirror acrylic','Display','Pi 5','Back panel']),
S('Mount the display with removable fasteners','Secure the screen while keeping the first installation reversible.',[
'Power the Pi off and disconnect the USB-C power cable.','Clean only the rigid mounting surfaces where Velcro will attach. Do not put adhesive on the visible display area.','Apply short Velcro strips to the display frame or a rigid backing plate, not over electronics or ribbon connectors.','Attach matching Velcro inside the shadow box using your center marks.','Press the display into place gently and check it from the front.','Correct any tilt now. The visible screen area should be level and centered behind the mirror.'],
'The display does not move when the shadow box is gently tilted, and it appears level from the front.','Keep Velcro and adhesive away from the DSI connector, vents, exposed components, and touchscreen flex cables.',['Shadow box back','Velcro strips','Display centered','No pressure on LCD']),
S('Black out everything around the screen','Stop the Pi, cables, and inside of the shadow box from showing through the mirror.',[
'With the display still off, look through the front mirror under bright room light and identify any light-colored or shiny areas behind it.','Cut black foam board to surround the active display area without covering the visible pixels.','Use matte black tape on small shiny surfaces that cannot be hidden by foam board.','Keep the Pi metal case and ventilation openings uncovered.','Turn the display on with a black background and inspect the mirror again.','Adjust the blackout mask until the only obvious illuminated area is the screen content itself.'],
'The mirror looks like a normal dark mirror when the screen background is black.','Do not wrap the Pi in foam or tape. The Pi 5 needs a path for heat to escape.',['Mirror view','Black mask','Visible screen only','Ventilation left open']),
S('Route the DSI and power cables safely','Create gentle cable paths that do not pinch when the back closes.',[
'Power the Pi completely off before touching the DSI cable.','Connect the Pi 5-compatible DSI cable firmly and squarely at both ends. Lock the connector tabs if your display uses locking tabs.','Route the DSI ribbon in a broad curve. Use a bend radius of roughly a finger width or larger rather than a sharp fold.','Route the USB-C power cable on a different path so it cannot press the ribbon against the frame.','Use small pieces of tape or loose cable clips as strain relief. Do not tape across hot surfaces.','Hold the back panel in place and inspect every cable edge before fastening the panel.'],
'The back closes without pinching, sharply bending, or pulling on either cable.','A creased DSI ribbon can create intermittent display failures. Never fold it tightly like paper.',['Pi 5 DSI port','Wide ribbon curve','Display DSI port','USB-C exit path']),
S('Configure mirror kiosk mode','Make the Pi boot directly into a clean black-background mirror screen.',[
'Boot Raspberry Pi OS and confirm touch and Wi-Fi still work after mounting.','Open Chromium and load the production dashboard or mirror page.','Use a mirror layout with a pure black background, white primary text, and only a few high-value widgets.','Test full-screen kiosk mode manually first. On Raspberry Pi OS, use Chromium with --kiosk and your production URL.','After the command works manually, add it to your desktop autostart configuration so Chromium launches after login.','Reboot twice to confirm the Pi reaches the mirror screen without keyboard input.'],
'A cold boot ends on the full-screen mirror dashboard automatically.','Do not put API keys, private tokens, or passwords in browser-visible JavaScript.',['Power on','Raspberry Pi OS','Chromium kiosk','Mirror dashboard']),
S('Run a thermal and stability test','Verify the finished enclosure can run safely before you permanently close it.',[
'Leave the back panel open for the first test.','Run the mirror dashboard continuously for at least 30 minutes.','Check CPU temperature with vcgencmd measure_temp or your device-status screen.','Touch the outside of the metal Pi case carefully. Warm is expected, but the system should remain stable without throttling or shutdowns.','Watch for display flicker, touch failures, Wi-Fi drops, or power warnings.','If stable, close the back and repeat a shorter 15-minute test. Add ventilation openings if temperature rises excessively.'],
'The display stays stable, the Pi does not show undervoltage warnings, and temperature remains reasonable in the closed box.','Solve heat or power problems before leaving the mirror running unattended for long periods.',['30 min test','Temperature check','No flicker','Close back','Retest'])
]),
P('dashboard','Personal Dashboard','🖥️','Easy','3–4 hours','Software','Create the touch-first command center that becomes the software foundation for several other builds.',[
'Raspberry Pi 5','7-inch touchscreen','Raspberry Pi OS','Chromium','Vercel-hosted dashboard'
],[
S('Design for the real 7-inch screen','Start with the screen size you will actually use instead of shrinking a desktop UI later.',[
'Open browser developer tools on your computer and set the viewport to 800 × 480.','Choose a minimum touch target around 44–48 pixels high.','Place the most important information in the top two-thirds of the screen.','Limit the first screen to six primary destinations: Today, Fitness, Focus, Photos, Devices, and Settings.','Avoid hover-only interactions because the Pi touchscreen does not have a mouse hover state.'],
'Every primary action is readable and tappable at 800 × 480 without zooming.','Do not use tiny icon-only buttons unless the icon meaning is obvious.',['800 × 480','6 large tiles','48px touch targets']),
S('Build the dashboard shell','Create a consistent header, content area, and bottom or side navigation.',[
'Add a compact header showing time, date, connectivity, and a settings shortcut.','Create a responsive content grid that becomes two columns on the Pi display and one column on narrow phones.','Add persistent navigation that never covers interactive content.','Use the same spacing, type scale, and card style across every mode.','Test the shell with placeholder content before connecting live data.'],
'You can switch between all major sections without layout jumps or accidental taps.','Keep animation subtle. The Pi should feel responsive even under load.',['Header','Content grid','Navigation','Consistent card system']),
S('Create reusable widgets','Turn each information block into a small component with one clear job.',[
'Build a clock widget with local time and date.','Build a weather widget with current conditions and a short forecast.','Build a calendar widget showing only the next few events.','Build a focus widget with timer status.','Build a Pi status widget for connectivity, CPU temperature, and memory later.','Give every widget a loading, success, and error state.'],
'Each widget can render independently and a failed widget does not break the whole dashboard.','Avoid making the home screen a wall of information. Show summaries, then drill into details.',['Clock','Weather','Calendar','Focus','Pi status']),
S('Add display modes','Let one app behave differently depending on how the Pi is being used.',[
'Create a mode setting with Dashboard, Mirror, Focus, Photos, and Glance options.','Persist the selected mode in localStorage first.','Make Mirror mode pure black with sparse white content.','Make Focus mode hide unrelated widgets.','Make Photos mode prioritize full-screen imagery.','Add a visible Exit or Home action so you cannot trap yourself in a mode.'],
'Switching modes changes the layout immediately and survives a page refresh.','Keep a reliable way to return to normal Dashboard mode.',['Mode selector','Dashboard','Mirror','Focus','Photos']),
S('Test on the actual Pi','Move from desktop simulation to the real hardware before polishing details.',[
'Deploy the latest version to Vercel.','Open the production URL in Chromium on the Pi.','Tap every control using a finger, not a mouse.','Check text size from your normal viewing distance.','Rotate through modes and watch for scrollbars, clipped cards, or keyboard popups.','Fix anything that feels difficult before adding more features.'],
'The dashboard is comfortable to use entirely by touch on the real 7-inch display.','Do not rely only on desktop browser previews for touchscreen usability.',['Vercel','Pi Chromium','Finger test','Real-screen adjustments'])
]),
P('ai-terminal','Mini AI Terminal','💬','Medium','4–6 hours','Software','Turn the Pi into a small dedicated AI terminal controlled from the touchscreen and mini keyboard.',[
'Raspberry Pi 5','7-inch touchscreen','Rii mini wireless keyboard','Chromium','Vercel server route','AI API credential stored server-side'
],[
S('Pair and verify the mini keyboard','Make sure input hardware is reliable before building around it.',[
'Insert the keyboard receiver if your model uses a USB dongle, or pair it through Bluetooth settings.','Open a plain text editor on the Pi.','Type every letter row, numbers, Backspace, Enter, arrows, and touchpad clicks.','Test at the actual distance you expect to use the cyberdeck or desk terminal.','Replace or charge batteries before troubleshooting software.'],
'Every required key and the touchpad work consistently on the Pi.','Solve keyboard issues before debugging the web app.',['Mini keyboard','USB/Bluetooth','Text test','Touchpad test']),
S('Build a full-screen prompt interface','Keep the AI screen simple enough to operate from a 7-inch display.',[
'Create one large multiline prompt box.','Add clearly labeled Send, Stop, Clear, and New Chat controls.','Keep the response area scrollable without moving the input off-screen.','Add large quick-action chips such as Explain this build step, Start Focus, Open Dashboard, and Device Status.','Support Enter to send only when appropriate; preserve Shift+Enter for new lines.'],
'You can submit, read, and clear a conversation without precision tapping.','Do not crowd the interface with every AI setting at once.',['Prompt box','Send','Response','Quick actions']),
S('Protect the AI credential','Route AI requests through server-side code.',[
'Create a Vercel server endpoint for AI requests.','Store the API key in Vercel Environment Variables.','Send only the user prompt and necessary context from the browser to your server endpoint.','Have the server call the AI provider and return the response.','Inspect browser source and network responses to verify the raw secret is never exposed.'],
'The terminal works while the API key remains absent from client-side source.','Never put an API secret in a public HTML or JavaScript file.',['Browser','Vercel server','Secret env var','AI provider']),
S('Add build-aware shortcuts','Make the terminal useful specifically for your Pi projects.',[
'Add a shortcut that inserts the current project name and current step into the prompt.','Add Explain simpler, Troubleshoot this step, and What should I check next actions.','Include the current material list when troubleshooting hardware.','Do not automatically send private information that the user did not choose to include.','Display the exact context being sent in a small expandable panel.'],
'One tap can ask for help with the exact build step currently open.','Keep context transparent so you know what is being sent.',['Current step','Context preview','AI help']),
S('Add local Pi commands later','Prepare a safe boundary between cloud AI and physical hardware.',[
'Run a small local Pi agent that exposes only approved commands such as get temperature or change display mode.','Use an allowlist rather than accepting arbitrary shell commands from the web.','Require explicit UI confirmation before actions that modify hardware state.','Log each command and result.','Keep dangerous system operations outside the AI command surface.'],
'The AI can request only explicitly allowed Pi actions.','Never give a remote AI endpoint unrestricted shell access to your Pi.',['AI request','Allowlist','Local Pi agent','Approved action'])
]),
P('cyberdeck','Portable Cyberdeck','⌨️','Advanced','8–12 hours','Portable','Build a portable Pi computer with the touchscreen and mini keyboard.',[
'Raspberry Pi 5','7-inch touchscreen','Rii mini keyboard','USB-C PD power bank suitable for Pi 5','Rigid enclosure','Short USB cables','Velcro or standoffs','Ventilation openings','Optional handle or hinge'
],[
S('Choose the correct portable power source','Select a power bank that can reliably power a Pi 5.',[
'Do not plan to use the PiSugar Zero battery as the Pi 5 main battery.','Choose a USB-C PD power bank with enough output for sustained Pi 5 use.','Use a short high-quality USB-C cable.','Boot the Pi from the power bank and run a heavy workload for 15 minutes.','Watch for undervoltage warnings or random reboots.'],
'The Pi stays stable under load from the battery bank.','A battery that can charge a phone is not automatically sufficient for a Pi 5.',['PD power bank','USB-C','Pi 5','Load test']),
S('Build a cardboard layout first','Prototype ergonomics before buying or cutting an enclosure.',[
'Cut cardboard to the approximate enclosure size.','Place the display at the top and mini keyboard below it.','Try the layout on a desk and in your lap.','Check whether ports, power cable, and SD card remain accessible.','Adjust the screen angle and keyboard distance until typing feels comfortable.'],
'You can type and view the screen comfortably without awkward cable placement.','Do not commit to an enclosure shape before testing ergonomics.',['Cardboard mockup','Screen angle','Keyboard position','Port access']),
S('Plan cooling and airflow','Make sure a portable case does not trap Pi 5 heat.',[
'Keep the metal Pi case exposed to moving air.','Mark intake and exhaust openings in the enclosure.','Leave space around the case fins.','Keep foam, fabric, and battery surfaces away from the hottest area.','Run a 30-minute test in the mock enclosure before final assembly.'],
'Temperature remains stable with the enclosure in the position you will actually use.','Do not bury a passively cooled Pi 5 in foam or a sealed compartment.',['Air in','Pi heatsink','Air out','Battery separated']),
S('Mount the screen and Pi','Secure components without stressing connectors.',[
'Use standoffs, brackets, or removable Velcro on rigid parts.','Support the screen around its frame rather than pressing the LCD panel.','Mount the Pi where HDMI, USB, Ethernet, and USB-C remain reachable.','Leave enough slack for the DSI cable without allowing it to flap into sharp edges.','Shake the powered-off enclosure gently and correct any movement.'],
'All major parts remain fixed while connectors stay accessible.','Never let mounting hardware press against the LCD or exposed circuit traces.',['Display mount','Pi mount','DSI slack','Accessible ports']),
S('Add the keyboard and cable management','Finish the input area and reduce cable strain.',[
'Attach the keyboard with removable fasteners so it can still be charged or serviced.','Route the receiver or USB connection internally if practical.','Use short cables to reduce loops.','Add strain relief at the external charging/power port.','Confirm the lid or hinge movement cannot pinch wires.'],
'The keyboard is stable and every cable has a safe path through the full range of motion.','Moving hinges are common pinch points. Test slowly before closing the case.',['Keyboard','Receiver','Short cables','Strain relief']),
S('Create a cyberdeck launcher','Make the software feel like a dedicated portable computer.',[
'Create large launcher tiles for Browser, AI, Dashboard, Notes, Files, GitHub, and System.','Add battery status if your chosen power bank exposes it.','Add a large shutdown button that requires confirmation.','Make the launcher usable with touch, keyboard, and touchpad.','Test offline behavior for local tools.'],
'You can operate the most important functions without opening the normal desktop first.','Always shut down Raspberry Pi OS cleanly before removing power when possible.',['Launcher','AI','Files','System','Safe shutdown'])
]),
P('home-panel','Home Assistant Panel','🏠','Medium','3–5 hours','Smart Home','Use the Pi touchscreen as a dedicated smart-home control panel.',[
'Raspberry Pi display setup','Home Assistant instance','Home network','Smart bulbs or plugs when ready','Optional wall mount'
],[
S('Inventory the devices you actually want to control','Start with real use cases instead of building a giant empty dashboard.',[
'List each smart bulb, plug, fan, thermostat, or scene you already use.','Group them by room.','Mark which actions need one tap and which should require confirmation.','Choose three scenes you will use often, such as Morning, Focus, and Sleep.'],
'You have a short prioritized control list before designing the screen.','Do not buy extra smart-home hardware just to fill the dashboard.',['Rooms','Devices','Priority controls','Scenes']),
S('Create a touch-first control layout','Make controls easy to use from a wall or desk.',[
'Use one large card per room or scene.','Use clear On and Off state styling.','Make sliders wide enough for a finger.','Place destructive or security-related actions away from common lighting controls.','Keep the first screen to the controls you use most.'],
'Common actions require one or two obvious taps.','Avoid tiny toggle switches copied from desktop dashboards.',['Room cards','Large toggles','Wide sliders','Scene buttons']),
S('Connect Home Assistant safely','Keep Home Assistant credentials on the server side when possible.',[
'Confirm Home Assistant is reachable from the Pi on your local network.','Create the minimum necessary token or integration method.','Store secrets in a server-side environment, not public browser JavaScript.','Test reading device state before adding write controls.','Add clear error states for offline devices.'],
'The panel accurately shows live state for at least one device.','Do not expose a long-lived Home Assistant token in a public repository.',['Pi browser','Server/API','Home Assistant','Device state']),
S('Add scenes and confirmation rules','Make the panel practical for daily use.',[
'Add Morning, Focus, Evening, Sleep, and Away scenes only if they map to real routines.','Require confirmation for Away, unlock, garage, or security-sensitive actions.','Show a short success message after a scene runs.','Prevent rapid repeated taps while a command is processing.'],
'Each scene gives clear feedback and sensitive actions cannot happen accidentally.','Treat door, lock, alarm, and garage controls as higher risk than lights.',['Scene button','Confirmation','Device changes','Success feedback']),
S('Run kiosk mode on the Pi','Turn the browser into a dedicated control panel.',[
'Open the Home panel URL on the Pi.','Test every control with touch.','Launch Chromium in kiosk mode.','Configure screen dimming or night mode for the room.','Reboot and confirm the panel returns automatically.'],
'The Pi boots back into the home panel and remains usable without a keyboard.','Provide a hidden or protected escape path from kiosk mode for maintenance.',['Pi boot','Chromium kiosk','Home panel','Night mode'])
]),
P('electronics-lab','Electronics Lab','💡','Medium','4–6 hours','GPIO','Learn safe GPIO basics with LEDs and buttons before moving on to sensors.',[
'Raspberry Pi 5','Breadboard','Jumper wires','LEDs','220–330 Ω resistors','Push buttons','gpiozero Python package'
],[
S('Learn the GPIO numbering you will use','Separate physical pin numbers from BCM GPIO numbers before wiring.',[
'Open a Raspberry Pi 5 GPIO pinout reference.','For this guide, use BCM GPIO numbering in Python.','Identify a 3.3V pin, multiple GND pins, and GPIO17.','Never assume a pin number without checking the diagram.','Keep the Pi powered off while building the first circuit.'],
'You can point to GPIO17 and a GND pin on the physical header confidently.','Putting 5V directly into a GPIO input can damage the Pi. GPIO uses 3.3V logic.',['40-pin header','GPIO17','GND','3.3V logic']),
S('Place one LED and resistor on the breadboard','Build the simplest safe output circuit.',[
'Insert the LED so its two legs are in different breadboard rows.','Identify the long LED leg as the anode and the shorter leg/flat-edge side as the cathode.','Connect GPIO17 to a 220–330 Ω resistor.','Connect the resistor to the LED anode.','Connect the LED cathode to a Pi GND pin.','Inspect the breadboard row alignment twice before powering on.'],
'The circuit path is GPIO17 → resistor → LED → GND with no direct GPIO-to-GND short.','Never connect an LED directly from GPIO to GND without a current-limiting resistor.',['GPIO17','220–330Ω','LED anode','LED cathode','GND']),
S('Blink the LED from Python','Confirm software can control the output.',[
'Power on the Pi.','Install gpiozero if needed using sudo apt install python3-gpiozero.','Create a Python file importing LED from gpiozero.','Create led = LED(17).','Turn the LED on for one second, off for one second, and repeat several times.','If it does not light, power down before rewiring.'],
'The LED turns on and off under Python control.','Do not move jumper wires around while troubleshooting a powered circuit unless you know the connection is safe.',['Python','gpiozero','GPIO17','Blinking LED']),
S('Add a push button input','Read a physical button safely.',[
'Power the Pi off.','Place the push button across the breadboard center gap so opposite legs are not accidentally shorted together.','Connect one side of the button to GPIO2 or another chosen input GPIO.','Connect the other side to GND.','Use gpiozero Button with the internal pull-up configuration.','Boot and print a message when the button is pressed.'],
'Each physical press produces one clear software event.','Four-leg tactile buttons connect pairs of legs internally. Check orientation before wiring.',['GPIO input','Button','GND','Python event']),
S('Make the button control the LED','Combine one input and one output into a complete interaction.',[
'Keep the existing LED on GPIO17.','Keep the button on its input pin.','Write a script that turns the LED on while the button is held or toggles it on each press.','Add a small debounce time if one press triggers multiple events.','Run the script and press the button repeatedly.'],
'Button presses reliably change the LED state without false triggers.','If one press appears as several presses, solve switch bounce in software rather than rewiring randomly.',['Button press','Python logic','GPIO17 LED']),
S('Expose hardware state in the web UI','Bridge the physical experiment to Pi Command Center.',[
'Create a small local agent that can report LED and button state.','Use an allowlisted API endpoint such as /status rather than exposing a general shell.','Display LED state and last button press on a Devices card.','Refresh or push updates at a modest rate.','Test that losing the web UI does not leave the hardware script in an unsafe state.'],
'The dashboard can show physical state while GPIO control stays local to the Pi.','Keep direct GPIO access on the Pi itself. Vercel cannot electrically drive the local pins.',['GPIO hardware','Local agent','Status API','Dashboard'])
]),
P('pomodoro','Pomodoro Station','⏱️','Easy','2–3 hours','Productivity','Create a dedicated focus timer, then optionally add physical buttons and status LEDs.',[
'Pi 5','7-inch touchscreen','Optional push buttons','Optional LEDs and resistors','Vercel app'
],[
S('Build the basic focus timer','Create the simple timer before adding hardware.',[
'Add a large 25:00 countdown.','Add Start, Pause, Reset, and Complete buttons.','Show one current task under the timer.','Disable Start while the timer is already running.','Play or show a subtle completion alert.'],
'A full focus session can be started, paused, resumed, completed, and reset by touch.','Avoid notification sounds so loud that the Pi becomes annoying to keep on your desk.',['25:00','Task','Start','Pause','Complete']),
S('Save sessions locally','Make the station useful even without a database.',[
'When a session completes, save start time, end time, duration, and task name to localStorage.','Display today’s completed session count.','Display total focused minutes for the day.','Add a clear-history action behind a confirmation dialog.'],
'Completed sessions survive a page refresh.','Do not store sensitive task content if the Pi display is visible to other people.',['Completed session','localStorage','Daily total']),
S('Add break mode','Make the focus cycle complete.',[
'After a completed focus session, offer a 5-minute break.','Change the screen styling enough to make break mode obvious.','Add Skip Break and Start Next Focus actions.','Do not automatically start the next focus session without a deliberate action.'],
'Focus and break states are visually distinct and easy to switch.','Automatic timers should not surprise you by starting another work interval.',['Focus','5-min break','Next focus']),
S('Add physical controls later','Use buttons only after the software timer is stable.',[
'Wire one button for Start/Pause and another for Complete using the safe button pattern from Electronics Lab.','Handle button presses in a local Pi agent.','Send only simple approved events to the web UI.','Label the buttons physically.','Test debounce and long-press behavior.'],
'Physical buttons reliably perform the same actions as touchscreen controls.','Finish the Electronics Lab button exercise before wiring this project.',['Start/Pause button','Complete button','Local agent','Focus UI']),
S('Add LED status','Show focus state without reading the screen.',[
'Use a resistor with each LED.','Choose one LED color for focus and another for break or done.','Drive LEDs from the local Pi agent, not directly from Vercel.','Turn LEDs off when the timer is idle.','Add a brightness or disable option for nighttime.'],
'You can tell focus, break, and idle state from the LEDs alone.','Every LED still needs a current-limiting resistor.',['Focus LED','Break LED','GPIO','Timer state'])
]),
P('glance','Desk Info Center','ℹ️','Easy','2–3 hours','Display','Create an always-on passive display that rotates through useful information.',[
'Pi 5','7-inch display','Chromium kiosk mode','Dashboard web app'
],[
S('Choose only five glance pages','Keep the display useful rather than busy.',[
'Choose five screens such as Clock, Weather, Calendar, Fitness, and Current Project.','Give each screen one clear visual hierarchy.','Use large text readable from desk distance.','Remove interactive controls from passive pages unless essential.'],
'Each page communicates its main information in under two seconds.','A glance display should not require reading dense paragraphs.',['Clock','Weather','Calendar','Fitness','Project']),
S('Add automatic rotation','Cycle pages at a calm pace.',[
'Rotate to the next page every 20–30 seconds.','Pause rotation when the user touches or clicks the screen.','Resume after a short period of inactivity.','Use a subtle fade transition instead of large animations.'],
'Pages rotate smoothly without feeling distracting.','Fast transitions can make an always-on display irritating.',['Page 1','30 sec','Page 2','Pause on touch']),
S('Add day and night behavior','Prevent the display from being too bright after dark.',[
'Create a Night mode with lower brightness and less content.','Schedule it based on local time or trigger it manually.','Use darker colors and avoid bright white full-screen backgrounds.','Add a quick Wake control.'],
'The display remains comfortable in both daylight and a dark room.','Do not depend on software dimming alone if the physical display brightness remains excessive.',['Day mode','Night mode','Dim display']),
S('Run kiosk mode','Make the Info Center boot like an appliance.',[
'Open the Glance route in Chromium.','Test one full rotation cycle.','Launch Chromium with --kiosk.','Add the command to autostart.','Reboot and confirm the rotation starts automatically.'],
'The Pi boots directly into the rotating desk display.','Keep a maintenance escape method for exiting kiosk mode.',['Pi boot','Chromium kiosk','Auto-rotate']),
S('Tune from real-world use','Adjust content after leaving it on your desk for a day.',[
'Note which pages you actually look at.','Remove pages you consistently ignore.','Increase dwell time for useful pages.','Reduce update frequency for data that rarely changes.','Check CPU usage and temperature after several hours.'],
'The display shows information you actually use without unnecessary load.','More widgets are not automatically better.',['Observe use','Remove clutter','Tune timing','Check load'])
]),
P('photo-frame','Digital Photo Frame','🖼️','Easy','2–3 hours','Display','Turn the Pi display into a rotating personal photo frame with collections and captions.',[
'Pi 5','7-inch display','Photo files or Supabase Storage','Vercel app'
],[
S('Prepare a small test album','Start with a few correctly sized photos.',[
'Choose 10–20 photos for the first test.','Use high-quality images but avoid enormous originals when a smaller web version looks identical on a 7-inch screen.','Rotate images correctly before upload.','Add optional caption, date, and location metadata.'],
'The test album loads quickly and every image is oriented correctly.','Do not upload private photos to a public storage bucket.',['Album','10–20 photos','Captions']),
S('Build the full-screen slideshow','Make the image the focus.',[
'Use the entire available screen.','Preserve image aspect ratio with contain or cover depending on your preference.','Use a black background around letterboxed images.','Show captions subtly and allow them to be hidden.','Add Previous and Next touch zones.'],
'Photos look clean in both landscape and portrait orientations.','Do not stretch images to fill the screen.',['Photo','Black background','Caption','Prev/Next']),
S('Add automatic advance','Create a smooth unattended slideshow.',[
'Advance every 10–20 seconds.','Pause when the user touches the screen.','Resume after inactivity.','Preload the next image to prevent a blank flash.','Use a gentle fade instead of an aggressive transition.'],
'Images advance smoothly without flashes or long loading pauses.','Long transitions can consume more GPU resources than they are worth.',['Current photo','15 sec','Next photo','Preload']),
S('Organize collections','Make it easy to change what the frame shows.',[
'Create collections such as Family, Travel, Friends, Favorites, and Projects.','Add a collection picker in Settings rather than overlaying it on every photo.','Remember the selected collection locally.','Add Shuffle as an option.'],
'The frame restarts in the collection you previously selected.','Keep personal album access permissions appropriate for the content.',['Collections','Favorites','Shuffle']),
S('Run as a kiosk frame','Make the Pi behave like a dedicated frame.',[
'Open the Photos route on the Pi.','Hide browser chrome with kiosk mode.','Configure the display to avoid sleep while Photo mode is active if desired.','Add a Night schedule that blanks or dims the screen.','Reboot and confirm the frame resumes automatically.'],
'The Pi starts the slideshow automatically and dims or sleeps when you want it to.','Consider screen longevity and power use if leaving it on continuously.',['Kiosk','Slideshow','Night schedule'])
]),
P('magic-frame','Magic Mirror Frame','✨','Advanced','6–8 hours','Hybrid','Combine the smart mirror and photo frame so the display appears only when needed.',[
'Completed Smart Mirror hardware','Photo Frame mode','Optional motion sensor','Optional push button','Pi local agent'
],[
S('Finish the Smart Mirror first','Use a stable mirror build as the foundation.',[
'Complete the Smart Mirror project through its thermal test.','Verify black screen areas disappear behind the mirror.','Verify kiosk mode starts reliably.','Do not continue until the physical build is stable.'],
'The Smart Mirror can run for at least 30 minutes without display or heat problems.','This project depends on the Smart Mirror. Do not troubleshoot two unfinished builds at once.',['Smart Mirror complete','Stable hardware']),
S('Create a true sleep appearance','Make the screen nearly invisible behind the mirror.',[
'Create a Sleep mode with a pure black page.','Hide all status bars, cursors, and bright overlays.','Set display brightness to the lowest usable level or blank the display if your setup supports it.','Check the mirror from several angles.'],
'The front looks like a normal mirror when the display is sleeping.','Some displays glow slightly even on black. Test in your actual room before relying on the effect.',['Black screen','Mirror reflection','No visible UI']),
S('Choose the wake trigger','Decide how the mirror should come alive.',[
'Start with a touchscreen tap or keyboard shortcut because it requires no extra wiring.','If adding a physical button, use the safe button wiring from Electronics Lab.','If adding motion later, confirm the exact sensor voltage and interface before connecting it.','Set a single wake event to show the dashboard or photo mode.'],
'One deliberate trigger wakes the display consistently.','Do not wire an unknown sensor directly to GPIO until you verify its voltage requirements.',['Tap/Button/Motion','Wake event','Display on']),
S('Add an automatic timeout','Return to mirror mode without requiring another action.',[
'Start a 30–90 second timer after wake.','Reset the timer when the user actively interacts.','Return to Sleep mode when the timer ends.','Provide a Keep Awake control for longer use.'],
'The display returns to the mirror appearance automatically after inactivity.','Make the timeout long enough that the UI does not vanish while you are reading it.',['Wake','60 sec','Sleep']),
S('Add photo reveal mode','Use the hidden screen for a surprising photo display.',[
'Add a Photo action from the wake screen.','Fade from black to the selected photo.','Keep dark margins where possible to preserve the mirror illusion.','Return to Sleep automatically after the configured timeout.'],
'A photo can appear and disappear cleanly without exposing other desktop elements.','Avoid bright system notifications over the mirror.',['Mirror','Photo reveal','Fade','Return to black']),
S('Add sensor automation only after manual mode works','Finish with optional physical automation.',[
'Choose a compatible motion or proximity sensor.','Power it according to its documentation.','Read it through the local Pi agent.','Debounce or rate-limit triggers so motion does not wake the screen continuously.','Add a quiet-hours schedule that ignores motion overnight if desired.'],
'Sensor wake works predictably without constant false triggers.','Verify the sensor output voltage before connecting it to a Pi GPIO input.',['Sensor','Pi GPIO','Local agent','Wake','Quiet hours'])
])
];