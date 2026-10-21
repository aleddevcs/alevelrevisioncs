/*
 * Revision: Unit 1, Topic 1 – Hardware and communication.
 * Written from the Topic 1 lessons (resources/unit1/topic1/lesson1–4).
 * Every item has a `lesson` number so students can revise one lesson at a time.
 */
RS.content.registerTopic({
  id: 'u1-t1',
  unit: 1,
  topic: 1,
  title: 'Hardware and communication',
  icon: 'cpu',
  colour: 'blue',
  summary: 'Hardware and connections, CPU architecture and Von Neumann, memory and caching, parallel processing, the fetch-execute cycle, input and output, secondary storage, fragmentation, networks, standards, protocols, handshaking and the internet.',
  keywords: ['motherboard', 'CPU', 'ALU', 'control unit', 'register', 'PC', 'MAR', 'MDR', 'CIR', 'ACC', 'bus', 'Von Neumann', 'bottleneck', 'cache', 'RAM', 'ROM', 'virtual memory', 'parallel processing', 'fetch-execute', 'input', 'output', 'HDD', 'SSD', 'tape', 'cloud', 'fragmentation', 'defragmentation', 'PAN', 'LAN', 'WAN', 'client-server', 'peer-to-peer', 'switch', 'router', 'MAC address', 'IP address', 'standards', 'protocol', 'HTTP', 'FTP', 'SMTP', 'IMAP', 'TCP/IP', 'DHCP', 'UDP', 'Wi-Fi', 'Bluetooth', 'handshaking', 'internet'],
  specRefs: [
    'Lesson 1 – 1.1.1 hardware and communication elements; 1.2.1 computer architecture and Von Neumann; 1.2.2 types of memory and caching',
    'Lesson 2 – 1.2.3 parallel processing; 1.3.1 the fetch-execute cycle; 1.4.1 and 1.4.2 input and output methods and devices',
    'Lesson 3 – 1.5.1 secondary storage; 1.6.1 fragmentation and defragmentation; 1.7.1 networks and how they communicate',
    'Lesson 4 – 1.7.1 network devices, addressing and media; 1.7.2 networking standards; 1.7.3 protocols; 1.7.4 handshaking; 1.8.1 the internet'
  ],

  notes: [
    /* ---------- Lesson 1: Inside the box ---------- */
    {
      lesson: 1,
      heading: 'The motherboard is the hub (1.1.1)',
      html: '<p>Everything connects to the motherboard, either directly (a socket or slot) or through a port, and communicates over buses and interfaces.</p>' +
        '<table><thead><tr><th scope="col">Component</th><th scope="col">Job</th><th scope="col">Connects through</th></tr></thead><tbody>' +
        '<tr><td>CPU</td><td>Executes instructions (control unit, ALU, registers, cache)</td><td>CPU socket → system bus</td></tr>' +
        '<tr><td>RAM</td><td>Volatile working memory for running programs and data</td><td>DIMM slots → memory bus</td></tr>' +
        '<tr><td>ROM</td><td>Non-volatile firmware (BIOS/UEFI) used to boot</td><td>On the motherboard</td></tr>' +
        '<tr><td>SSD / HDD</td><td>Non-volatile long-term storage</td><td>SATA or NVMe (PCIe)</td></tr>' +
        '<tr><td>GPU</td><td>Dedicated processor for images, video and 3D, with its own memory (VRAM)</td><td>PCIe slot</td></tr>' +
        '<tr><td>Sound card</td><td>Processes audio: a DSP, a DAC (digital → analogue, out) and an ADC (analogue → digital, in)</td><td>On-board, PCIe or USB</td></tr>' +
        '<tr><td>NIC / Wi-Fi</td><td>Joins the network, wired (Ethernet) or wireless</td><td>PCIe or on-board</td></tr>' +
        '<tr><td>Input / output devices</td><td>Keyboard, mouse, monitor, printer…</td><td>USB, HDMI, DisplayPort, Bluetooth</td></tr>' +
        '<tr><td>PSU</td><td>Converts mains AC to the DC the components need</td><td>Power cables (power only, no data)</td></tr>' +
        '</tbody></table>'
    },
    {
      lesson: 1,
      heading: 'Communication elements (1.1.1)',
      points: [
        'The <strong>system bus</strong> links the CPU, memory and input/output: the <strong>data bus</strong> carries the data, the <strong>address bus</strong> says where, and the <strong>control bus</strong> carries commands such as read, write and interrupt.',
        '<strong>Controllers and interfaces</strong>: input/output controllers (for example USB and SATA controllers) manage traffic between the CPU and devices; USB, Thunderbolt and Bluetooth connect peripherals.',
        'The <strong>network interface card (NIC)</strong> connects the computer to a network, wired (Ethernet) or wireless (Wi-Fi), and talks to switches and routers using TCP/IP.'
      ]
    },
    {
      lesson: 1,
      heading: 'Inside the CPU (1.2.1)',
      points: [
        '<strong>Control unit (CU)</strong>: fetches and decodes instructions and coordinates everything else, telling the other components what to do.',
        '<strong>Arithmetic logic unit (ALU)</strong>: carries out arithmetic (add, subtract), comparisons and logic (AND, OR, NOT).',
        '<strong>Registers</strong>: tiny, very fast storage locations inside the CPU, each with one job.',
        '<strong>Cache</strong>: keeps frequently used instructions and data close to the cores (L1, L2, L3).'
      ]
    },
    {
      lesson: 1,
      heading: 'The five registers (1.2.1)',
      html: '<table><thead><tr><th scope="col">Register</th><th scope="col">What it holds</th></tr></thead><tbody>' +
        '<tr><td>Program counter (PC)</td><td>The <em>address</em> of the <em>next</em> instruction to fetch. It increments after each fetch (unless a jump changes it).</td></tr>' +
        '<tr><td>Memory address register (MAR)</td><td>The address in memory being read from or written to. It is sent out on the address bus.</td></tr>' +
        '<tr><td>Memory data register (MDR)</td><td>The data just read from, or about to be written to, memory: a buffer between the CPU and RAM.</td></tr>' +
        '<tr><td>Current instruction register (CIR)</td><td>The instruction being executed now, split into opcode and operand for decoding.</td></tr>' +
        '<tr><td>Accumulator (ACC)</td><td>Intermediate results from the ALU.</td></tr>' +
        '</tbody></table><p>PC → MAR → MDR → CIR → ACC is the order they are used in a fetch-execute cycle.</p>'
    },
    {
      lesson: 1,
      heading: 'The three buses and their direction (1.2.1)',
      points: [
        '<strong>Data bus</strong>: carries the data itself, in <strong>both directions</strong> between the CPU and memory or input/output.',
        '<strong>Address bus</strong>: carries <em>where</em> in memory (from the MAR). It goes from the CPU to memory <strong>only</strong>; memory never sends the CPU an address.',
        '<strong>Control bus</strong>: carries control signals such as read, write, interrupt and the clock, in <strong>both directions</strong>.',
        'Exam favourite: the address bus is unidirectional.'
      ]
    },
    {
      lesson: 1,
      heading: 'Von Neumann architecture (1.2.1)',
      points: [
        'Four defining features: <strong>one memory</strong> for both instructions and data; <strong>sequential</strong> execution, one instruction at a time in order; a <strong>control unit</strong> drives the fetch and execute; the <strong>stored program</strong> concept, so you change the program, not the hardware.',
        'Instructions and data share the same memory and the same bus.',
        'Advantages: simple to design and build; flexible (update the program, keep the hardware); cost-effective (one memory, one bus).',
        '<strong>The Von Neumann bottleneck</strong>: instructions and data must squeeze through the same bus. The CPU is faster than memory, so it waits, and memory bandwidth becomes the limit.',
        'Working around it: Harvard architecture (separate instruction and data memory, used in embedded systems); cache hierarchies (L1/L2/L3); multi-core, pipelining and out-of-order execution.'
      ]
    },
    {
      lesson: 1,
      heading: 'The memory hierarchy (1.2.2)',
      html: '<table><thead><tr><th scope="col">Level</th><th scope="col">Where and what</th></tr></thead><tbody>' +
        '<tr><td>Registers</td><td>Inside the CPU · CPU speed · bytes</td></tr>' +
        '<tr><td>L1 · L2 · L3 cache</td><td>On the CPU · KB to MB · SRAM</td></tr>' +
        '<tr><td>RAM</td><td>Main memory · GB · DRAM · volatile</td></tr>' +
        '<tr><td>Virtual memory</td><td>Disk space used as if it were RAM · slow</td></tr>' +
        '<tr><td>SSD · HDD · flash</td><td>Secondary storage · TB · non-volatile</td></tr>' +
        '</tbody></table>' +
        '<p>Going up: faster, smaller and more costly per byte. Going down: slower, larger and cheaper per byte. ROM sits outside the ladder: non-volatile firmware on the motherboard, read at boot.</p>'
    },
    {
      lesson: 1,
      heading: 'Types of memory (1.2.2)',
      points: [
        '<strong>RAM</strong>: volatile and fast; holds running programs and data. DRAM is used for main memory; SRAM is used for cache.',
        '<strong>ROM</strong>: non-volatile; written at manufacture (or by a firmware update); holds the BIOS/UEFI used to boot.',
        '<strong>Cache</strong>: small and very fast, next to the cores. L1 is the smallest and fastest; L3 is the largest and is shared.',
        '<strong>Virtual memory</strong>: part of the disk used as an extension of RAM when RAM is full. It lets more or bigger programs run, but slowly.',
        '<strong>Flash</strong>: non-volatile solid-state memory (USB sticks, SSDs, memory cards); faster than an HDD and needs no power to keep data.',
        '<strong>Registers</strong>: tiny and CPU-speed, inside the processor. <strong>Secondary storage</strong> (HDD/SSD): non-volatile, large and slow.'
      ]
    },
    {
      lesson: 1,
      heading: 'Caching (1.2.2)',
      points: [
        'The CPU looks for data in L1, then L2, then L3, then RAM, then disk. A <strong>hit</strong> means it is found, so the search stops; a <strong>miss</strong> means drop down a level and try again. Each step down is slower.',
        '<strong>CPU cache</strong> holds frequently used instructions and data: L1 per core, L2 per core or shared, L3 shared by all cores. It reduces time spent waiting on RAM.',
        '<strong>Disk cache</strong>: RAM (or a buffer on the drive) holding frequently read blocks, speeding up reads and writes to an HDD or SSD.',
        'Analogy: desk (registers) → drawer (cache) → filing cabinet (RAM) → archive (disk). You don’t fetch from the archive if it’s already in your drawer.'
      ]
    },

    /* ---------- Lesson 2: Many hands, one cycle ---------- */
    {
      lesson: 2,
      heading: 'Parallel processing (1.2.3)',
      points: [
        '<strong>Sequential</strong>: one core; tasks queue and run one after another, so the total time is the sum of every task.',
        '<strong>Parallel</strong>: several cores; tasks are divided and run at the same time, so the total time shrinks towards the length of the longest single task.',
        'The catch: dividing the work, coordinating the cores and combining the results all take time too. Parallel processing isn’t free.',
        'Four ideas: <strong>task division</strong> (break a big job into smaller independent pieces); <strong>concurrency</strong> (pieces genuinely running at the same time on separate cores); <strong>coordination</strong> (cores communicate and stay in step so results combine correctly); <strong>scalability</strong> (add more cores to handle more work, up to a point).',
        'Welsh: parallel processing – <em>prosesu cyfochrog</em>; core / multi-core – <em>craidd / amlgraidd</em>; synchronisation – <em>cydamseru</em>.'
      ]
    },
    {
      lesson: 2,
      heading: 'Parallel processing: advantages, challenges and uses (1.2.3)',
      points: [
        '<strong>Advantages</strong>: increased speed; efficiency (more done per second); scalability; handles large data sets.',
        '<strong>Challenges</strong>: task dependency (some steps must wait for others); synchronisation overhead; resource contention (cores competing for shared resources); added complexity.',
        '<strong>Where it is used</strong>: supercomputers, graphics processing (GPUs), search engines and machine learning.'
      ]
    },
    {
      lesson: 2,
      heading: 'The fetch-execute cycle (1.3.1)',
      html: '<ol>' +
        '<li><strong>PC → MAR</strong>: the address of the next instruction is copied from the PC into the MAR.</li>' +
        '<li><strong>MAR → RAM</strong>: the MAR sends that address out on the address bus.</li>' +
        '<li><strong>RAM → MDR</strong>: the instruction stored at that address is copied into the MDR.</li>' +
        '<li><strong>MDR → CIR</strong>: the instruction moves into the CIR to be decoded.</li>' +
        '<li><strong>Decode</strong>: the control unit splits the instruction in the CIR into opcode and operand.</li>' +
        '<li><strong>Execute</strong>: the ALU carries out the operation and the result goes to the ACC.</li>' +
        '</ol>' +
        '<p>Fetch (steps 1–4) · Decode (step 5) · Execute (step 6), then the cycle repeats from the new PC. The PC is incremented once the instruction has been fetched, so it is already pointing at the next instruction while the current one is decoded and executed.</p>' +
        '<p>Welsh: fetch – <em>cyrchu</em>; decode – <em>datgodio</em>; execute – <em>gweithredu</em>; register – <em>cofrestr</em>; instruction – <em>cyfarwyddyd</em>.</p>'
    },
    {
      lesson: 2,
      heading: 'Where the cycle catches people out (1.3.1)',
      points: [
        '<strong>MAR vs MDR</strong>: the MAR holds an <em>address</em> (where to look); the MDR holds the <em>data</em> (what was found there).',
        '<strong>When does the PC increment?</strong> After the instruction is fetched, not after it is executed.',
        'Register names in Welsh: PC – <em>Cyfrif Rhaglen</em>; MAR – <em>Cofrestr Cyfeiriad Cof</em>; MDR – <em>Cofrestr Data Cof</em>; CIR – <em>Cofrestr Cyfarwyddyd Cyfredol</em>; ACC – <em>Cronnwr</em>.'
      ]
    },
    {
      lesson: 2,
      heading: 'Input and output devices, and their suitability (1.4.1, 1.4.2)',
      html: '<table><thead><tr><th scope="col">Device</th><th scope="col">Type</th><th scope="col">Best suited to…</th></tr></thead><tbody>' +
        '<tr><td>Touchscreen</td><td>Input</td><td>Kiosks and tablets: intuitive and needs no extra hardware, but imprecise for detailed work</td></tr>' +
        '<tr><td>Keyboard and mouse</td><td>Input</td><td>Precise text entry and navigation: desktop and office work</td></tr>' +
        '<tr><td>Barcode / QR scanner</td><td>Input</td><td>Retail and stock control: fast, with a low error rate on repetitive data</td></tr>' +
        '<tr><td>Microphone (voice input)</td><td>Input</td><td>Hands-free or accessibility contexts, such as driving or mobility impairment</td></tr>' +
        '<tr><td>Monitor</td><td>Output</td><td>General visual output in most contexts</td></tr>' +
        '<tr><td>3D / laser printer</td><td>Output</td><td>Physical documents, or prototyping and manufacture</td></tr>' +
        '<tr><td>Speakers</td><td>Output</td><td>Audio feedback; accessibility for visually impaired users</td></tr>' +
        '<tr><td>Braille display</td><td>Output</td><td>Tactile output for blind or low-vision users</td></tr>' +
        '</tbody></table>' +
        '<p>Suitability means matching the device to the user, the task and the environment. Welsh: input device – <em>dyfais fewnbwn</em>; output device – <em>dyfais allbwn</em>; suitable – <em>addas</em>.</p>'
    },

    /* ---------- Lesson 3: Storage, fragmentation and networks ---------- */
    {
      lesson: 3,
      heading: 'Six contemporary storage devices (1.5.1)',
      points: [
        '<strong>HDD</strong>: magnetic platters and a moving read/write head. Cheap per byte and large capacity, but slower than an SSD.',
        '<strong>SSD</strong>: flash memory with no moving parts. Fast access, but more expensive per byte than an HDD.',
        '<strong>Optical (CD/DVD/Blu-ray)</strong>: discs read by a laser. Cheap and portable, but limited capacity and easily damaged.',
        '<strong>Magnetic tape</strong>: serial access and very cheap per byte. Slow, but reliable for large-scale archival backup.',
        '<strong>Flash / USB drive</strong>: small, portable solid-state storage. Fast and convenient, with limited capacity.',
        '<strong>Cloud storage</strong>: data stored on remote servers over a network. Accessible anywhere; speed depends on the network.'
      ]
    },
    {
      lesson: 3,
      heading: 'Comparing storage devices (1.5.1)',
      html: '<table><thead><tr><th scope="col">Device</th><th scope="col">Speed of access</th><th scope="col">Cost per unit</th><th scope="col">Portability</th><th scope="col">Typical capacity</th></tr></thead><tbody>' +
        '<tr><td>HDD</td><td>Fast (but slower than SSD)</td><td>Low</td><td>Low–medium</td><td>Large (TBs)</td></tr>' +
        '<tr><td>SSD</td><td>Very fast</td><td>Higher</td><td>Medium</td><td>Medium–large</td></tr>' +
        '<tr><td>Optical disc</td><td>Slow</td><td>Very low</td><td>High</td><td>Small (GBs)</td></tr>' +
        '<tr><td>Magnetic tape</td><td>Slow (serial access)</td><td>Very low</td><td>High</td><td>Very large (archival)</td></tr>' +
        '<tr><td>Flash / USB</td><td>Fast</td><td>Low–medium</td><td>Very high</td><td>Small–medium</td></tr>' +
        '<tr><td>Cloud storage</td><td>Depends on network</td><td>Ongoing (subscription)</td><td>Accessible anywhere</td><td>Scalable / very large</td></tr>' +
        '</tbody></table>' +
        '<p>A “compare” answer trades characteristics against each other: for example, tape is cheap and huge but far too slow for daily access; an SSD is fast but costs more per byte. Durability matters too: no moving parts makes solid-state storage more robust.</p>'
    },
    {
      lesson: 3,
      heading: 'How fragmentation happens (1.6.1)',
      points: [
        'On an HDD, data is stored on a spinning magnetic platter, in tracks and sectors. A read/write head moves across the disk to reach each sector.',
        'A file doesn’t always fit in one contiguous space, so it is split and stored in whatever free sectors are available, often scattered across the disk.',
        'The more the disk fills and empties over time, the more fragmented it becomes.'
      ]
    },
    {
      lesson: 3,
      heading: 'Consequences, and what defragmentation does (1.6.1)',
      points: [
        '<strong>Consequences</strong>: the read/write head must move to several different positions to read one file. Each move takes time, so access is slower overall. More fragmentation means more head movement, and more wear.',
        '<strong>Defragmentation</strong> physically rearranges fragmented data so each file’s parts sit together. There are fewer positions for the head to move between, so access speeds improve.',
        '<strong>SSDs don’t need defragmenting</strong>: they have no moving head, so reading any location takes the same time and scattered data isn’t slower to read. SSDs use a different maintenance process (TRIM) instead.'
      ]
    },
    {
      lesson: 3,
      heading: 'Types of network (1.7.1)',
      html: '<table><thead><tr><th scope="col">Network</th><th scope="col">What it is</th><th scope="col">Typical range</th></tr></thead><tbody>' +
        '<tr><td>PAN – personal area network</td><td>One person’s own devices, such as a phone to a smartwatch or wireless earbuds</td><td>Metres</td></tr>' +
        '<tr><td>LAN – local area network</td><td>One site, such as a school or office building</td><td>One building or site</td></tr>' +
        '<tr><td>WLAN – wireless LAN</td><td>A LAN using wireless connections instead of cables</td><td>One building or site</td></tr>' +
        '<tr><td>WAN – wide area network</td><td>Connects LANs across a large area; the internet is the largest WAN</td><td>Cities, countries, global</td></tr>' +
        '</tbody></table>'
    },
    {
      lesson: 3,
      heading: 'Client-server and peer-to-peer (1.7.1)',
      points: [
        '<strong>Client-server</strong>: clients send requests; a central server provides the resource or service, such as a website or a file share.',
        '<strong>Peer-to-peer</strong>: every device can act as both client and server, sharing directly with each other with no central server.'
      ]
    },

    /* ---------- Lesson 4: Standards, protocols, handshaking and the internet ---------- */
    {
      lesson: 4,
      heading: 'The hardware that builds a network (1.7.1)',
      points: [
        '<strong>NIC</strong>: hardware inside a device that lets it connect to a network, wired (Ethernet) or wireless. Every networked device needs one.',
        '<strong>Switch</strong>: connects multiple devices within a LAN and sends data only to the device it is addressed to.',
        '<strong>Router</strong>: connects different networks together (for example a LAN to the internet) and directs data between networks using addresses.',
        '<strong>Hub</strong>: an older, simpler way to connect devices in a LAN. It broadcasts data to every device, so it is far less efficient than a switch.',
        '<strong>Wireless access point</strong>: lets wireless devices join a wired network.',
        '<strong>Modem</strong>: connects a network to an external line (for example from an ISP), converting between the network’s signals and the line’s signal.'
      ]
    },
    {
      lesson: 4,
      heading: 'Addressing: MAC and IP (1.7.1)',
      points: [
        '<strong>MAC address</strong>: a unique physical address built into a device’s network hardware (its NIC). It doesn’t change and identifies the physical device. It is used to deliver data to the right device within a local network.',
        '<strong>IP address</strong>: a logical address assigned to a device on a network. It can change: it is assigned automatically (DHCP) or set manually. It is used to route data between networks, including across the internet.',
        'Both are needed: the IP address gets data to the right network; the MAC address gets it to the right device on that network.'
      ]
    },
    {
      lesson: 4,
      heading: 'Transmission media, and networked vs standalone (1.7.1)',
      html: '<table><thead><tr><th scope="col">Medium</th><th scope="col">Examples</th><th scope="col">Advantage</th><th scope="col">Disadvantage</th></tr></thead><tbody>' +
        '<tr><td>Copper / twisted pair</td><td>Ethernet cables, telephone wiring</td><td>Cheap and simple to install</td><td>Limited distance and bandwidth; prone to interference</td></tr>' +
        '<tr><td>Fibre optic</td><td>High-speed backbone and broadband links</td><td>Very high bandwidth, long distance, resistant to interference</td><td>More expensive to buy and install</td></tr>' +
        '<tr><td>Wireless (radio)</td><td>Wi-Fi, Bluetooth, cellular</td><td>No cables needed, so devices can move freely</td><td>Usually slower and less secure than wired; prone to interference</td></tr>' +
        '</tbody></table>' +
        '<p><strong>Advantages of networking</strong>: share resources (printers, files, internet connections); centralised management of updates, backups and security; easy communication. <strong>Disadvantages</strong>: a bigger security risk (more points of attack); if the network goes down, every connected device can be affected; more expensive to set up and maintain than standalone computers.</p>'
    },
    {
      lesson: 4,
      heading: 'Why networking standards matter (1.7.2)',
      points: [
        '<strong>Interoperability</strong>: hardware and software from different vendors can work together. Without shared standards, building networks that share information easily would be difficult or impossible.',
        '<strong>No vendor lock-in</strong>: customers aren’t forced to buy every device from one company, so they have a genuine choice of suppliers.',
        '<strong>Competition and price</strong>: open standards promote competition between vendors, which helps hold prices down.',
        '<strong>Easier development</strong>: hardware and software can be developed one layer at a time; developers build to the standard, not to every possible device.'
      ]
    },
    {
      lesson: 4,
      heading: 'Protocols that run the internet (1.7.3)',
      html: '<p>A protocol is an agreed set of rules for how data is communicated.</p>' +
        '<table><thead><tr><th scope="col">Protocol</th><th scope="col">What it does</th><th scope="col">Why it matters</th></tr></thead><tbody>' +
        '<tr><td>HTTP</td><td>Transfers web pages between a server and a browser</td><td>Any browser can request and display pages the way the author intended</td></tr>' +
        '<tr><td>FTP</td><td>Transfers files between computers over a network</td><td>Errors are detected and data is re-sent, so files arrive intact</td></tr>' +
        '<tr><td>SMTP</td><td>Sends email from a client to a server, or from server to server</td><td>A standard way of passing email between different mail servers</td></tr>' +
        '<tr><td>IMAP</td><td>Retrieves and syncs email, keeping messages on the server</td><td>The same inbox on every device, without using up local storage</td></tr>' +
        '<tr><td>TCP/IP</td><td>The core protocol suite of the internet: breaks data into packets and routes them</td><td>The basic, shared language every device on the internet uses</td></tr>' +
        '<tr><td>DHCP</td><td>Automatically assigns IP addresses to devices joining a network</td><td>Returns addresses no longer in use to the pool for reallocation</td></tr>' +
        '<tr><td>UDP</td><td>Sends data fast, with very little error recovery</td><td>Suits video and audio streaming, where speed matters more than the odd lost packet</td></tr>' +
        '</tbody></table>'
    },
    {
      lesson: 4,
      heading: 'Wireless communication protocols (1.7.3)',
      points: [
        '<strong>Wi-Fi (802.11)</strong>: wireless local area networking, connecting devices to a router within a building or site; used for most home and office wireless internet access.',
        '<strong>Bluetooth</strong>: short-range, low-power, device-to-device connections such as headphones, keyboards and wearables. It forms a wireless PAN, not a full network.',
        '<strong>Cellular (4G/5G)</strong>: wide-area mobile data over the phone network, giving internet access without a fixed Wi-Fi connection. 5G adds higher speed and lower latency than 4G.'
      ]
    },
    {
      lesson: 4,
      heading: 'Handshaking (1.7.4)',
      points: [
        'Handshaking is when a computer system establishes a device’s readiness to communicate. It happens <strong>before</strong> any real data is sent.',
        'It confirms that both devices are ready and agree on how to communicate, which avoids data being sent to a device that isn’t listening, or can’t understand it.',
        'The usual three steps: <strong>1. Request</strong> – device A signals it wants to communicate; <strong>2. Acknowledge</strong> – device B responds that it is ready and how it can communicate; <strong>3. Confirm</strong> – device A confirms, and data transfer begins.',
        'Order is the whole point: if data is sent before the handshake completes, the receiving device may not be ready, and data is lost or misread.'
      ]
    },
    {
      lesson: 4,
      heading: 'The internet: a network of networks (1.8.1)',
      points: [
        'Each LAN (school, office, home, college, business) is its own network. The internet connects them all together.',
        'It is a world-wide communications infrastructure built from many smaller networks, not one single network.',
        'Routers, standards and shared protocols (TCP/IP) are what let all these separate networks communicate.'
      ]
    }
  ],

  misconceptions: [
    { lesson: 1, wrong: 'Cache is a type of RAM.', right: 'Cache is SRAM on or next to the CPU. RAM is main memory (DRAM) on the motherboard.' },
    { lesson: 1, wrong: 'A faster clock means a faster computer.', right: 'Cache size, cores, bus width and memory speed all matter; the bottleneck is usually memory.' },
    { lesson: 1, wrong: 'ROM is old storage.', right: 'ROM is non-volatile firmware (BIOS/UEFI) used to boot, not somewhere you save files.' },
    { lesson: 1, wrong: 'Virtual memory is extra RAM.', right: 'It is disk space used as if it were RAM. It works, but it is slow.' },
    { lesson: 2, wrong: 'The MAR and MDR hold the same kind of thing.', right: 'The MAR holds an address (where to look); the MDR holds the data (what was found there).' },
    { lesson: 2, wrong: 'The PC increments after the instruction has been executed.', right: 'The PC increments after the instruction is fetched, so it already points to the next instruction during decode and execute.' },
    { lesson: 3, wrong: 'SSDs need defragmenting, just like HDDs.', right: 'SSDs have no moving head, so scattered data is no slower to read. They use TRIM instead.' },
    { lesson: 4, wrong: 'A hub and a switch do the same job.', right: 'A hub broadcasts data to every device; a switch sends it only to the device it is addressed to.' }
  ],

  examTips: [
    { lesson: 1, text: 'When asked about buses, always say what each one carries <em>and</em> its direction. “The address bus is unidirectional” is a frequent mark.' },
    { lesson: 2, text: 'Describe the fetch-execute cycle as a sequence of register transfers (PC → MAR → MDR → CIR), naming each register and what it holds.' },
    { lesson: 2, text: 'For suitability questions, link the device to the situation: “a barcode scanner, because it is fast with a low error rate on repetitive data”.' },
    { lesson: 3, text: 'A “compare” answer must trade characteristics against each other for both devices, for example speed against cost per byte.' },
    { lesson: 4, text: 'For protocols, say what each one does <em>and</em> why it matters. Just expanding the acronym rarely earns marks.' }
  ],

  flashcards: [
    /* Lesson 1 */
    { id: 'u1t1-fc1', lesson: 1, front: 'What does the control unit (CU) do?', back: 'Fetches and decodes instructions and coordinates the other components, telling them what to do.' },
    { id: 'u1t1-fc2', lesson: 1, front: 'What does the ALU do?', back: 'Arithmetic (add, subtract), comparisons and logic (AND, OR, NOT).' },
    { id: 'u1t1-fc3', lesson: 1, front: 'What does the program counter (PC) hold?', back: 'The address of the next instruction to fetch.' },
    { id: 'u1t1-fc4', lesson: 1, front: 'What does the MAR hold?', back: 'The address in memory being read from or written to. It is sent out on the address bus.' },
    { id: 'u1t1-fc5', lesson: 1, front: 'What does the MDR hold?', back: 'The data just read from, or about to be written to, memory: a buffer between the CPU and RAM.' },
    { id: 'u1t1-fc6', lesson: 1, front: 'What does the CIR hold?', back: 'The instruction being executed now, split into opcode and operand for decoding.' },
    { id: 'u1t1-fc7', lesson: 1, front: 'Which bus is unidirectional, and why?', back: 'The address bus: addresses only go from the CPU to memory. Memory never tells the CPU an address.' },
    { id: 'u1t1-fc8', lesson: 1, front: 'Name the four defining features of Von Neumann architecture.', back: 'One memory for instructions and data; sequential execution; a control unit drives fetch and execute; the stored program concept.' },
    { id: 'u1t1-fc9', lesson: 1, front: 'What is the Von Neumann bottleneck?', back: 'Instructions and data share the same bus, and the CPU is faster than memory, so it waits. Memory bandwidth becomes the limit.' },
    { id: 'u1t1-fc10', lesson: 1, front: 'Give two ways of working around the Von Neumann bottleneck.', back: 'Any two of: Harvard architecture (separate instruction and data memory); cache hierarchies; multi-core; pipelining; out-of-order execution.' },
    { id: 'u1t1-fc11', lesson: 1, front: 'What is ROM used for?', back: 'Non-volatile firmware (BIOS/UEFI) used to boot the computer.' },
    { id: 'u1t1-fc12', lesson: 1, front: 'What is virtual memory?', back: 'Part of the disk used as an extension of RAM when RAM is full. It lets more programs run, but slowly.' },
    { id: 'u1t1-fc13', lesson: 1, front: 'What is a cache hit and a cache miss?', back: 'Hit: the data is found at that level, so the search stops. Miss: drop down a level (L1 → L2 → L3 → RAM → disk) and try again.' },
    { id: 'u1t1-fc14', lesson: 1, front: 'What does a sound card’s DAC and ADC do?', back: 'DAC: digital → analogue (sound out). ADC: analogue → digital (sound in).' },
    /* Lesson 2 */
    { id: 'u1t1-fc15', lesson: 2, front: 'Parallel processing <br><span class="muted">(prosesu cyfochrog)</span>', back: 'Dividing a task between several cores so that the pieces run at the same time.' },
    { id: 'u1t1-fc16', lesson: 2, front: 'Name the four ideas behind parallel processing.', back: 'Task division, concurrency, coordination and scalability.' },
    { id: 'u1t1-fc17', lesson: 2, front: 'Give two challenges of parallel processing.', back: 'Any two of: task dependency; synchronisation overhead; resource contention; added complexity.' },
    { id: 'u1t1-fc18', lesson: 2, front: 'Synchronisation <br><span class="muted">(cydamseru)</span>', back: 'Keeping cores in step so their results combine correctly. It adds overhead to parallel processing.' },
    { id: 'u1t1-fc19', lesson: 2, front: 'Put the fetch stage in order: CIR, MAR, MDR, PC.', back: 'PC → MAR → (RAM) → MDR → CIR.' },
    { id: 'u1t1-fc20', lesson: 2, front: 'What happens during decode?', back: 'The control unit splits the instruction in the CIR into opcode and operand.' },
    { id: 'u1t1-fc21', lesson: 2, front: 'When is the PC incremented?', back: 'After the instruction is fetched, not after it is executed.' },
    { id: 'u1t1-fc22', lesson: 2, front: 'Fetch, decode, execute in Welsh?', back: '<em>Cyrchu</em>, <em>datgodio</em>, <em>gweithredu</em>.' },
    { id: 'u1t1-fc23', lesson: 2, front: 'Accumulator <br><span class="muted">(cronnwr)</span>', back: 'The register that holds intermediate results from the ALU.' },
    { id: 'u1t1-fc24', lesson: 2, front: 'When is a touchscreen a good choice, and when is it not?', back: 'Good: kiosks and tablets (intuitive, no extra hardware). Poor: detailed, precise work.' },
    { id: 'u1t1-fc25', lesson: 2, front: 'Why is a barcode scanner suitable for retail?', back: 'It is fast, with a low error rate on repetitive data.' },
    /* Lesson 3 */
    { id: 'u1t1-fc26', lesson: 3, front: 'Which storage is best for large-scale archival backup, and why?', back: 'Magnetic tape: very cheap per byte and reliable, with very large capacity. Its slow serial access doesn’t matter for rarely used archives.' },
    { id: 'u1t1-fc27', lesson: 3, front: 'SSD vs HDD in one line each?', back: 'SSD: flash, no moving parts, very fast, more expensive per byte. HDD: magnetic platters and a moving head, cheaper per byte, larger, slower.' },
    { id: 'u1t1-fc28', lesson: 3, front: 'One advantage and one disadvantage of cloud storage?', back: 'Advantage: accessible anywhere and scalable. Disadvantage: depends on network speed, with ongoing subscription costs.' },
    { id: 'u1t1-fc29', lesson: 3, front: 'What is fragmentation?', back: 'When a file is split and stored in scattered, non-contiguous sectors because it does not fit in one free space.' },
    { id: 'u1t1-fc30', lesson: 3, front: 'Why does fragmentation slow down an HDD?', back: 'The read/write head must move to several positions to read one file, and each move takes time.' },
    { id: 'u1t1-fc31', lesson: 3, front: 'What does defragmentation do?', back: 'Rearranges the data so each file’s parts sit together, reducing head movement and improving access speed.' },
    { id: 'u1t1-fc32', lesson: 3, front: 'Why don’t SSDs need defragmenting?', back: 'No moving head: every location takes the same time to read, so scattered data is no slower. SSDs use TRIM instead.' },
    { id: 'u1t1-fc33', lesson: 3, front: 'PAN, LAN, WLAN, WAN?', back: 'PAN: one person’s devices (metres). LAN: one site. WLAN: a wireless LAN. WAN: connects LANs over a large area; the internet is the largest.' },
    { id: 'u1t1-fc34', lesson: 3, front: 'Client-server vs peer-to-peer?', back: 'Client-server: clients request, a central server provides. Peer-to-peer: every device is both client and server, with no central server.' },
    /* Lesson 4 */
    { id: 'u1t1-fc35', lesson: 4, front: 'Switch vs hub?', back: 'A switch sends data only to the device it is addressed to; a hub broadcasts to every device, so it is less efficient.' },
    { id: 'u1t1-fc36', lesson: 4, front: 'What does a router do?', back: 'Connects different networks (for example a LAN to the internet) and directs data between them using addresses.' },
    { id: 'u1t1-fc37', lesson: 4, front: 'MAC address vs IP address?', back: 'MAC: fixed physical address built into the NIC, used within a local network. IP: logical address that can change, used to route data between networks.' },
    { id: 'u1t1-fc38', lesson: 4, front: 'Give two reasons networking standards matter.', back: 'Any two of: interoperability between vendors; no vendor lock-in; competition keeps prices down; easier development one layer at a time.' },
    { id: 'u1t1-fc39', lesson: 4, front: 'SMTP vs IMAP?', back: 'SMTP sends email (client to server, server to server). IMAP retrieves and syncs email, keeping it on the server.' },
    { id: 'u1t1-fc40', lesson: 4, front: 'What does DHCP do?', back: 'Automatically assigns IP addresses to devices joining a network, and returns unused addresses to the pool.' },
    { id: 'u1t1-fc41', lesson: 4, front: 'Why does streaming use UDP?', back: 'UDP is fast with very little error recovery; for video and audio, speed matters more than the odd lost packet.' },
    { id: 'u1t1-fc42', lesson: 4, front: 'Wi-Fi vs Bluetooth vs cellular?', back: 'Wi-Fi: wireless LAN within a site. Bluetooth: short-range, low-power device-to-device (a PAN). Cellular (4G/5G): wide-area mobile data.' },
    { id: 'u1t1-fc43', lesson: 4, front: 'What is handshaking?', back: 'Establishing a device’s readiness to communicate, and agreeing how, before any data is sent: request, acknowledge, confirm.' },
    { id: 'u1t1-fc44', lesson: 4, front: 'Describe the internet in one sentence.', back: 'A world-wide communications infrastructure: a network of networks connecting many separate LANs.' }
  ],

  questions: [
    /* ---------- Lesson 1 ---------- */
    {
      id: 'u1t1-q1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Through which interface does a graphics card (GPU) usually connect to the motherboard?',
      options: ['PCIe slot', 'DIMM slot', 'SATA', 'The CPU socket'],
      answer: 0,
      feedback: ['', 'DIMM slots hold RAM modules.', 'SATA connects storage drives such as HDDs and SSDs.', 'The CPU socket holds the CPU.'],
      explanation: 'GPUs connect through a PCIe slot. RAM uses DIMM slots; storage uses SATA or NVMe.'
    },
    {
      id: 'u1t1-q2', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which register holds the address of the next instruction to be fetched?',
      options: ['Program counter (PC)', 'Memory address register (MAR)', 'Current instruction register (CIR)', 'Accumulator (ACC)'],
      answer: 0,
      feedback: ['', 'The MAR holds the address currently being accessed, which is not necessarily the next instruction.', 'The CIR holds the instruction currently being executed, not an address.', 'The ACC holds results from the ALU.'],
      explanation: 'The PC holds the address of the next instruction to fetch, and increments after each fetch.'
    },
    {
      id: 'u1t1-q3', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which statement about the three buses is correct?',
      options: ['The address bus carries addresses from the CPU to memory only', 'The data bus only carries data from memory to the CPU', 'The control bus carries memory addresses', 'All three buses carry data in one direction only'],
      answer: 0,
      feedback: ['', 'The data bus works in both directions: data is read from and written to memory.', 'The control bus carries signals such as read, write, interrupt and clock.', 'The data and control buses are both two-directional.'],
      explanation: 'The address bus is unidirectional: memory never tells the CPU an address.'
    },
    {
      id: 'u1t1-q4', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which of these is <strong>not</strong> a defining feature of Von Neumann architecture?',
      options: ['Separate memories for instructions and data', 'One memory for both instructions and data', 'Instructions are executed sequentially', 'The stored program concept'],
      answer: 0,
      feedback: ['', 'This is a defining feature of Von Neumann architecture.', 'This is a defining feature of Von Neumann architecture.', 'This is a defining feature of Von Neumann architecture.'],
      explanation: 'Separate instruction and data memory is Harvard architecture, one way of working around the Von Neumann bottleneck.'
    },
    {
      id: 'u1t1-q5', lesson: 1, type: 'mcq', skill: 'application',
      question: 'A processor often waits for instructions and data to arrive from memory because they share one bus. What is this problem called?',
      options: ['The Von Neumann bottleneck', 'A cache hit', 'Virtual memory', 'Resource contention between cores'],
      answer: 0,
      feedback: ['', 'A cache hit is when data is found in cache, which reduces waiting.', 'Virtual memory is disk space used as RAM.', 'Resource contention is a challenge of parallel processing with several cores.'],
      explanation: 'Instructions and data squeeze through the same bus, and the CPU is faster than memory, so it waits.'
    },
    {
      id: 'u1t1-q6', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which list is in order from fastest and smallest to slowest and largest?',
      options: ['Registers, cache, RAM, secondary storage', 'Cache, registers, RAM, secondary storage', 'RAM, cache, registers, secondary storage', 'Registers, RAM, cache, secondary storage'],
      answer: 0,
      feedback: ['', 'Registers are inside the CPU and are faster than cache.', 'RAM is slower and larger than both cache and registers.', 'Cache is faster and smaller than RAM.'],
      explanation: 'The memory hierarchy: registers → L1/L2/L3 cache → RAM → (virtual memory) → secondary storage.'
    },
    {
      id: 'u1t1-q7', lesson: 1, type: 'mcq', skill: 'application',
      question: 'The CPU needs a value. It is not in L1 or L2 cache, but it is in L3. What happens?',
      options: ['A miss at L1 and L2, then a hit at L3, so the value is read from L3', 'The CPU reads the value from RAM straight away', 'The CPU waits until the value is copied to the registers by the user', 'The value is fetched from the hard disk'],
      answer: 0,
      feedback: ['', 'RAM is only searched if L3 also misses.', 'Data movement between levels is automatic, not done by the user.', 'The disk is only reached after misses at every faster level.'],
      explanation: 'The CPU checks L1, then L2, then L3, then RAM, then disk; the search stops at the first hit.'
    },
    {
      id: 'u1t1-q8', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'What is virtual memory?',
      options: ['Part of the disk used as an extension of RAM when RAM is full', 'Extra RAM chips that are switched on when needed', 'Memory stored in the cloud', 'A type of cache inside the CPU'],
      answer: 0,
      feedback: ['', 'Virtual memory is not extra RAM; it is disk space used as if it were RAM.', 'It uses the computer’s own secondary storage, not the cloud.', 'Cache is fast SRAM; virtual memory is slow disk space.'],
      explanation: 'Virtual memory lets more or bigger programs run, but slowly, because the disk is much slower than RAM.'
    },
    {
      id: 'u1t1-q9', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Why is cache made from SRAM while main memory uses DRAM?',
      options: ['SRAM is faster, which matters most for the small amount of cache next to the cores', 'SRAM is cheaper, so it is used where lots of memory is needed', 'SRAM is non-volatile, so cache keeps data when switched off', 'DRAM cannot be placed on the motherboard'],
      answer: 0,
      feedback: ['', 'SRAM is more expensive per byte, which is why only small amounts are used.', 'Both SRAM and DRAM are volatile.', 'DRAM is exactly what sits in the DIMM slots on the motherboard.'],
      explanation: 'Speed is what cache is for, so the faster, more expensive SRAM is used in small amounts.'
    },
    {
      id: 'u1t1-q10', lesson: 1, type: 'mcq', skill: 'technique',
      question: 'A question asks: “Describe the role of the address bus. [2 marks]”. Which answer gains both marks?',
      options: ['It carries the memory address (from the MAR) to memory, and it is unidirectional, from the CPU to memory only.', 'It is a bus.', 'It carries data around the computer.', 'It connects things together in both directions.'],
      answer: 0,
      feedback: ['', 'This gives no detail about what the bus carries.', 'Data is carried by the data bus.', 'The address bus is one-directional, and this does not say what it carries.'],
      explanation: 'Two marks: what it carries, and its direction. Precise wording such as “unidirectional” earns marks.'
    },

    /* ---------- Lesson 2 ---------- */
    {
      id: 'u1t1-q11', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'Which of the four ideas behind parallel processing means “breaking a big job into smaller independent pieces”?',
      options: ['Task division', 'Concurrency', 'Coordination', 'Scalability'],
      answer: 0,
      feedback: ['', 'Concurrency is pieces genuinely running at the same time on separate cores.', 'Coordination is cores communicating and staying in step.', 'Scalability is handling more work by adding more cores.'],
      explanation: 'Task division comes first: the job must be split before pieces can run in parallel.'
    },
    {
      id: 'u1t1-q12', lesson: 2, type: 'mcq', skill: 'application',
      question: 'Four tasks take 4 s, 3 s, 2 s and 1 s. Ignoring overheads, roughly how long do they take on one core, and on four cores (one task per core)?',
      options: ['10 s on one core; about 4 s on four cores', '10 s on one core; 2.5 s on four cores', '4 s on one core; 1 s on four cores', '10 s on both'],
      answer: 0,
      feedback: ['', 'With one task per core, the total is set by the longest single task (4 s), not an even share.', 'Sequential time is the sum of all the tasks, not the longest one.', 'Running at the same time on four cores reduces the total.'],
      explanation: 'Sequential: 4 + 3 + 2 + 1 = 10 s. Parallel: the total shrinks towards the longest single task, 4 s.'
    },
    {
      id: 'u1t1-q13', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'Which is a <strong>challenge</strong> of parallel processing?',
      options: ['Task dependency: some steps must wait for others', 'Handling large data sets', 'Increased speed', 'Scalability'],
      answer: 0,
      feedback: ['', 'This is an advantage of parallel processing.', 'This is an advantage of parallel processing.', 'This is an advantage of parallel processing.'],
      explanation: 'Challenges: task dependency, synchronisation overhead, resource contention and added complexity.'
    },
    {
      id: 'u1t1-q14', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'What is the first step of the fetch-execute cycle?',
      options: ['The address in the PC is copied into the MAR', 'The instruction is copied from the MDR into the CIR', 'The control unit decodes the instruction', 'The ALU stores a result in the ACC'],
      answer: 0,
      feedback: ['', 'This is step 4, after the instruction has arrived in the MDR.', 'Decoding is step 5.', 'This happens during execute, step 6.'],
      explanation: 'PC → MAR → RAM → MDR → CIR, then decode, then execute.'
    },
    {
      id: 'u1t1-q15', lesson: 2, type: 'mcq', skill: 'application',
      question: 'During a fetch, the MAR contains 25. What does this tell you?',
      options: ['The instruction is being fetched from memory address 25', 'The instruction being fetched has the value 25', 'The result of the last calculation was 25', 'There are 25 instructions left to run'],
      answer: 0,
      feedback: ['', 'The MAR holds an address, not data. The data would be in the MDR.', 'Results from the ALU go to the ACC.', 'The MAR holds a single memory address.'],
      explanation: 'The MAR holds an address (where to look); the MDR holds what was found there.'
    },
    {
      id: 'u1t1-q16', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'When is the program counter incremented?',
      options: ['After the instruction is fetched', 'After the instruction is executed', 'Before the PC is copied to the MAR', 'Only when a jump instruction is executed'],
      answer: 0,
      feedback: ['', 'This is the common mistake: the PC has already moved on during decode and execute.', 'The current address must be copied to the MAR first.', 'A jump changes the PC, but it is also incremented after every normal fetch.'],
      explanation: 'The PC is already pointing at the next instruction while the current one is decoded and executed.'
    },
    {
      id: 'u1t1-q17', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'During decode, what does the control unit do?',
      options: ['Splits the instruction in the CIR into opcode and operand', 'Copies the instruction from RAM into the MDR', 'Adds the two operands in the ALU', 'Increments the MAR'],
      answer: 0,
      feedback: ['', 'This is part of the fetch.', 'This is execute.', 'The MAR is loaded, not incremented; the PC is the register that increments.'],
      explanation: 'Decode: the CU works out what the instruction means by splitting it into opcode and operand.'
    },
    {
      id: 'u1t1-q18', lesson: 2, type: 'mcq', skill: 'application',
      question: 'A supermarket wants to record items quickly at the till with very few errors. Which input device is most suitable?',
      options: ['Barcode scanner', 'Microphone', 'Touchscreen keyboard', 'Braille display'],
      answer: 0,
      feedback: ['', 'Voice input would be slow and error-prone in a noisy shop.', 'Typing codes is slower and more error-prone than scanning.', 'A Braille display is an output device.'],
      explanation: 'Barcode scanners are fast, with a low error rate on repetitive data.'
    },
    {
      id: 'u1t1-q19', lesson: 2, type: 'mcq', skill: 'application',
      question: 'A user with a mobility impairment needs to control a computer hands-free. Which input method is most suitable?',
      options: ['Voice input through a microphone', 'Keyboard and mouse', 'Touchscreen', 'Barcode scanner'],
      answer: 0,
      feedback: ['', 'These need precise hand movements.', 'A touchscreen still needs hand movement.', 'A barcode scanner reads codes; it cannot control the computer.'],
      explanation: 'Voice input suits hands-free and accessibility contexts.'
    },
    {
      id: 'u1t1-q20', lesson: 2, type: 'mcq', skill: 'technique',
      question: 'A question asks you to “Describe the fetch-execute cycle, showing how data is read from RAM into registers. [4 marks]”. Which approach is best?',
      options: ['Give the steps in order, naming each register and what moves into it (PC → MAR → MDR → CIR, decode, execute)', 'Write one sentence: “the CPU gets instructions and runs them”', 'List the five registers with no explanation', 'Describe how cache works'],
      answer: 0,
      feedback: ['', 'Too vague for more than one mark.', 'A list does not show how data moves.', 'Cache is not what the question asks about.'],
      explanation: 'Each mark is usually one precise transfer step. Keep them in order.'
    },

    /* ---------- Lesson 3 ---------- */
    {
      id: 'u1t1-q21', lesson: 3, type: 'mcq', skill: 'application',
      question: 'A large company must keep 10 years of financial records. They are rarely accessed but must never be lost. Which storage is most suitable?',
      options: ['Magnetic tape', 'SSD', 'Optical disc', 'USB flash drive'],
      answer: 0,
      feedback: ['', 'SSDs are fast, but cost more per byte; speed is not needed for rarely accessed archives.', 'Optical discs have small capacity and are easily damaged.', 'Flash drives have limited capacity and are easily lost.'],
      explanation: 'Tape is very cheap per byte, very large and reliable for archival backup; slow serial access does not matter here.'
    },
    {
      id: 'u1t1-q22', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'Which statement compares an SSD with an HDD correctly?',
      options: ['An SSD has faster access but costs more per byte', 'An SSD is cheaper per byte but slower', 'An SSD has moving parts, so it is less robust', 'An SSD stores data on magnetic platters'],
      answer: 0,
      feedback: ['', 'HDDs are the cheaper per byte, slower option.', 'SSDs have no moving parts; that makes them more robust.', 'Magnetic platters are used in HDDs; SSDs use flash memory.'],
      explanation: 'SSD: flash, no moving parts, very fast, higher cost per byte. HDD: cheap per byte, large, slower.'
    },
    {
      id: 'u1t1-q23', lesson: 3, type: 'mcq', skill: 'application',
      question: 'A student wants to access their coursework from home, school and their phone. Which storage fits best?',
      options: ['Cloud storage', 'Magnetic tape', 'An internal HDD in the home computer', 'Blu-ray discs'],
      answer: 0,
      feedback: ['', 'Tape is for archival backup and is far too slow for everyday access.', 'An internal drive can only be reached from that computer.', 'Discs would have to be rewritten and carried around.'],
      explanation: 'Cloud storage is accessible anywhere with a network connection.'
    },
    {
      id: 'u1t1-q24', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'Why does a file become fragmented on an HDD?',
      options: ['It doesn’t fit in one contiguous space, so it is split across whatever free sectors are available', 'The read/write head damages the platter over time', 'Files are deliberately split to make them load faster', 'The SSD controller moves files around'],
      answer: 0,
      feedback: ['', 'Wear is a consequence of extra head movement, not the cause of fragmentation.', 'Fragmentation makes files load more slowly on an HDD.', 'This is about HDDs, not SSDs.'],
      explanation: 'As the disk fills and empties over time, free space becomes scattered, so files are stored in pieces.'
    },
    {
      id: 'u1t1-q25', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'What is the main consequence of fragmentation on an HDD?',
      options: ['Slower access, because the head must move to several positions to read one file', 'Files are lost permanently', 'The disk’s capacity is reduced by half', 'The CPU runs at a lower clock speed'],
      answer: 0,
      feedback: ['', 'The data is still there; it is just scattered.', 'Fragmentation does not change the disk’s capacity.', 'Fragmentation affects disk access, not the CPU clock.'],
      explanation: 'More head movement means slower access, and more wear.'
    },
    {
      id: 'u1t1-q26', lesson: 3, type: 'mcq', skill: 'application',
      question: 'Why is it unnecessary to defragment an SSD?',
      options: ['It has no moving head, so reading scattered data is no slower', 'SSDs never store files in pieces', 'SSDs are too small to become fragmented', 'Defragmentation would erase the SSD'],
      answer: 0,
      feedback: ['', 'Files can be scattered on an SSD; it just does not slow access.', 'Size has nothing to do with it.', 'Defragmenting does not erase data.'],
      explanation: 'SSD access time is the same for any location. SSDs use TRIM instead.'
    },
    {
      id: 'u1t1-q27', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'A phone connected to a smartwatch and wireless earbuds forms which type of network?',
      options: ['PAN', 'LAN', 'WAN', 'WLAN'],
      answer: 0,
      feedback: ['', 'A LAN covers one site such as a school.', 'A WAN connects LANs across a large area.', 'A WLAN is a wireless LAN covering a building or site.'],
      explanation: 'A personal area network covers one person’s own devices, over a few metres.'
    },
    {
      id: 'u1t1-q28', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'Which describes a peer-to-peer network?',
      options: ['Every device can act as both client and server, sharing directly with no central server', 'Clients request resources from a central server', 'Devices connect only through a hub', 'Only one device can communicate at a time'],
      answer: 0,
      feedback: ['', 'This is client-server.', 'Peer-to-peer is about roles, not the connecting hardware.', 'Peer-to-peer does not limit communication in this way.'],
      explanation: 'In peer-to-peer, devices share directly with each other.'
    },
    {
      id: 'u1t1-q29', lesson: 3, type: 'mcq', skill: 'technique',
      question: 'A question asks you to “Compare magnetic tape and SSDs for backing up a company’s data. [4 marks]”. Which answer style is best?',
      options: ['Trade characteristics against each other for both, for example “tape is much cheaper per byte than an SSD, but far slower to access”', 'Describe how an SSD works in detail', 'List four facts about tape', 'Say SSDs are better because they are newer'],
      answer: 0,
      feedback: ['', 'Describing one device is not a comparison.', 'Facts about one device do not compare them.', 'This gives no characteristics or reasons.'],
      explanation: 'Compare answers weigh the same characteristic (speed, cost, capacity, portability, durability) for both devices.'
    },

    /* ---------- Lesson 4 ---------- */
    {
      id: 'u1t1-q30', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which device connects a school LAN to the internet and directs data between networks?',
      options: ['Router', 'Switch', 'Hub', 'NIC'],
      answer: 0,
      feedback: ['', 'A switch connects devices within a LAN.', 'A hub connects devices within a LAN by broadcasting to all of them.', 'A NIC connects a single device to a network.'],
      explanation: 'Routers connect different networks and direct data between them using addresses.'
    },
    {
      id: 'u1t1-q31', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Why is a switch more efficient than a hub?',
      options: ['A switch sends data only to the device it is addressed to; a hub broadcasts to every device', 'A switch connects to the internet; a hub cannot', 'A switch is wireless; a hub is wired', 'A switch converts signals for the phone line'],
      answer: 0,
      feedback: ['', 'Connecting to the internet is the job of a router.', 'Both can be wired; a wireless access point provides wireless access.', 'That is a modem.'],
      explanation: 'Broadcasting to every device wastes bandwidth, so switches have replaced hubs.'
    },
    {
      id: 'u1t1-q32', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which statement about MAC and IP addresses is correct?',
      options: ['A MAC address is fixed in the NIC; an IP address can change and is used to route data between networks', 'An IP address is fixed in the NIC; a MAC address is assigned by DHCP', 'Both always change every time the device restarts', 'Only one of them is needed to deliver data'],
      answer: 0,
      feedback: ['', 'This is reversed.', 'MAC addresses do not change.', 'Both are needed: IP to reach the right network, MAC to reach the right device on it.'],
      explanation: 'The IP address gets data to the right network; the MAC address gets it to the right device on that network.'
    },
    {
      id: 'u1t1-q33', lesson: 4, type: 'mcq', skill: 'application',
      question: 'A business needs a very high-bandwidth link between two buildings 2 km apart, with no interference. Which medium is most suitable?',
      options: ['Fibre optic', 'Copper twisted pair', 'Bluetooth', 'A USB cable'],
      answer: 0,
      feedback: ['', 'Copper has limited distance and bandwidth and is prone to interference.', 'Bluetooth is short-range, for personal devices.', 'USB is for connecting peripherals over very short distances.'],
      explanation: 'Fibre optic: very high bandwidth, long distance and resistant to interference, but more expensive.'
    },
    {
      id: 'u1t1-q34', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which is an importance of networking standards?',
      options: ['Hardware and software from different vendors can work together (interoperability)', 'They make every device cost the same', 'They let one company control all network hardware', 'They remove the need for protocols'],
      answer: 0,
      feedback: ['', 'Standards encourage competition, which helps hold prices down, but prices are not made equal.', 'Standards prevent vendor lock-in; they do the opposite.', 'Protocols are themselves standards.'],
      explanation: 'Standards give interoperability, no vendor lock-in, competition and easier development.'
    },
    {
      id: 'u1t1-q35', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which protocol keeps emails on the server so the same inbox appears on every device?',
      options: ['IMAP', 'SMTP', 'FTP', 'DHCP'],
      answer: 0,
      feedback: ['', 'SMTP sends email; it does not retrieve it.', 'FTP transfers files.', 'DHCP assigns IP addresses.'],
      explanation: 'IMAP retrieves and syncs email, keeping messages on the server.'
    },
    {
      id: 'u1t1-q36', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which protocol automatically gives a laptop an IP address when it joins a network?',
      options: ['DHCP', 'HTTP', 'UDP', 'SMTP'],
      answer: 0,
      feedback: ['', 'HTTP transfers web pages.', 'UDP is a fast transport protocol with little error recovery.', 'SMTP sends email.'],
      explanation: 'DHCP assigns IP addresses and returns unused ones to the pool.'
    },
    {
      id: 'u1t1-q37', lesson: 4, type: 'mcq', skill: 'application',
      question: 'Why is UDP suited to a live video stream?',
      options: ['Speed matters more than the occasional lost packet', 'It guarantees every packet arrives in order', 'It encrypts the video automatically', 'It is the only protocol that can carry video'],
      answer: 0,
      feedback: ['', 'UDP has very little error recovery, so it does not guarantee delivery or order.', 'UDP does not provide encryption.', 'Video can also be sent with TCP; UDP is chosen for speed.'],
      explanation: 'UDP sends data fast with very little error recovery.'
    },
    {
      id: 'u1t1-q38', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which wireless protocol is short-range and low-power, used for headphones and wearables?',
      options: ['Bluetooth', 'Wi-Fi (802.11)', '5G', 'TCP/IP'],
      answer: 0,
      feedback: ['', 'Wi-Fi is for wireless local area networks within a building or site.', '5G is wide-area cellular data.', 'TCP/IP is the internet’s core protocol suite, not a wireless protocol.'],
      explanation: 'Bluetooth forms a wireless PAN for device-to-device connections.'
    },
    {
      id: 'u1t1-q39', lesson: 4, type: 'mcq', skill: 'application',
      question: 'What are the three steps of a handshake, in order?',
      options: ['Request, acknowledge, confirm', 'Acknowledge, request, confirm', 'Confirm, request, acknowledge', 'Request, confirm, acknowledge'],
      answer: 0,
      feedback: ['', 'Device B cannot acknowledge before device A has made a request.', 'Confirmation comes last, once both sides are ready.', 'Device A can only confirm after device B has acknowledged.'],
      explanation: 'Device A requests, device B acknowledges it is ready, device A confirms, then data transfer begins.'
    },
    {
      id: 'u1t1-q40', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which best describes the internet?',
      options: ['A world-wide network of networks connecting many separate LANs', 'A single network owned by one company', 'The same thing as the World Wide Web', 'A type of LAN'],
      answer: 0,
      feedback: ['', 'The internet is built from many networks owned by many organisations.', 'The web is a service that runs over the internet.', 'The internet is the largest WAN, connecting LANs.'],
      explanation: 'The internet is a world-wide communications infrastructure built from smaller networks.'
    },
    {
      id: 'u1t1-q41', lesson: 4, type: 'mcq', skill: 'technique',
      question: 'A question asks: “Describe the importance of the SMTP protocol. [2 marks]”. Which answer gains both marks?',
      options: ['SMTP sends email from a client to a server, or between servers, giving a standard way of passing email between different mail servers.', 'Simple Mail Transfer Protocol.', 'It is used for email.', 'It retrieves email so it appears on all your devices.'],
      answer: 0,
      feedback: ['', 'Expanding the acronym does not describe what it does or why it matters.', 'Too vague for two marks.', 'That describes IMAP.'],
      explanation: 'Say what the protocol does and why it matters.'
    },

    /* ---------- Typed answers ---------- */
    {
      id: 'u1t1-q42', lesson: 2, type: 'input', skill: 'application',
      question: 'Four tasks take 4 s, 3 s, 2 s and 1 s. How many seconds do they take in total when run <strong>sequentially</strong> on one core?',
      accept: ['10', '10s', '10 s', '10 seconds'],
      explanation: 'Sequentially, the total time is the sum of every task: 4 + 3 + 2 + 1 = 10 s. On four cores it would shrink towards the longest single task, 4 s.'
    },
    {
      id: 'u1t1-q43', lesson: 1, type: 'input', skill: 'recall',
      question: 'Which register holds the address of the next instruction to fetch? Give its abbreviation or full name.',
      accept: ['PC', 'program counter', 'the program counter'],
      explanation: 'The program counter (PC) holds the address of the next instruction and increments after each fetch.'
    },
    {
      id: 'u1t1-q44', lesson: 3, type: 'input', skill: 'recall',
      question: 'Give the abbreviation for the type of network that connects one person’s own devices, such as a phone, a smartwatch and wireless earbuds.',
      accept: ['PAN', 'personal area network'],
      explanation: 'A personal area network (PAN) covers one person’s own devices over a range of a few metres.'
    }
  ],

  exam: [
    {
      id: 'u1t1-e1', lesson: 1, marks: 4,
      question: 'Describe the main features of Von Neumann architecture and explain the Von Neumann bottleneck.',
      markPoints: [
        'One memory holds both instructions and data.',
        'Instructions are executed sequentially, one at a time.',
        'A control unit drives the fetch and execute of instructions.',
        'Stored program concept: the program can be changed without changing the hardware.',
        'Bottleneck: instructions and data share the same bus…',
        '…and the CPU is faster than memory, so it has to wait; memory bandwidth limits performance.'
      ],
      technique: 'Two parts: features, then the bottleneck. Give at least one point for the bottleneck with a reason.'
    },
    {
      id: 'u1t1-e2', lesson: 1, marks: 4,
      question: 'Describe what is meant by caching and explain how the use of cache improves performance.',
      markPoints: [
        'Cache is a small amount of very fast memory (SRAM) on or next to the CPU.',
        'It holds frequently used instructions and data.',
        'The CPU checks cache (L1, then L2, then L3) before RAM; if the data is there, it is a hit.',
        'A hit avoids the slower access to RAM, so the CPU spends less time waiting.',
        'Disk cache: RAM or a buffer holds frequently read blocks, speeding up reads from secondary storage.'
      ],
      technique: '“Explain how it improves performance” needs the link: fewer slow accesses to RAM, so less waiting.'
    },
    {
      id: 'u1t1-e3', lesson: 2, marks: 4,
      question: 'Describe the fetch-execute cycle, showing how an instruction is read from RAM into the registers.',
      markPoints: [
        'The address in the PC is copied into the MAR.',
        'The MAR sends the address to memory along the address bus.',
        'The instruction at that address is copied into the MDR.',
        'The instruction is copied from the MDR into the CIR, and the PC is incremented.',
        'The control unit decodes the instruction into opcode and operand.',
        'The instruction is executed (by the ALU), with results stored in the ACC.'
      ],
      technique: 'Name each register and what moves into it, in order.'
    },
    {
      id: 'u1t1-e4', lesson: 2, marks: 4,
      question: 'Describe and explain parallel processing, including one advantage and one challenge.',
      markPoints: [
        'Parallel processing uses several cores/processors at the same time.',
        'A task is divided into smaller independent pieces (task division)…',
        '…which run concurrently and are coordinated so the results combine correctly.',
        'Advantage: increased speed / more work done per second / handles large data sets / scalability.',
        'Challenge: task dependency, synchronisation overhead, resource contention or added complexity.'
      ],
      technique: 'Use the key vocabulary (task division, concurrency, coordination) and give one advantage and one challenge.'
    },
    {
      id: 'u1t1-e5', lesson: 3, marks: 4,
      question: 'Explain what fragmentation is, its consequences, and why defragmentation is needed.',
      markPoints: [
        'Files are split and stored in non-contiguous (scattered) sectors when they do not fit in one free space.',
        'This gets worse as the disk fills and empties over time.',
        'The read/write head must move to several positions to read one file, so access is slower (and there is more wear).',
        'Defragmentation rearranges the data so each file’s parts are together…',
        '…so there is less head movement and access speed improves.'
      ],
      technique: 'Three parts: what it is, its consequences, and why defragmentation helps. Keep the read/write head at the centre of your explanation.'
    },
    {
      id: 'u1t1-e6', lesson: 3, marks: 4,
      context: 'A photographer needs to store several terabytes of photos for many years, and also wants fast access to the photos they are currently editing.',
      question: 'Compare two suitable secondary storage devices for the photographer.',
      markPoints: [
        'SSD for photos currently being edited, because it has very fast access.',
        'SSD costs more per byte, so it is less suitable for storing all the photos.',
        'HDD (or magnetic tape) for the long-term archive, because it is much cheaper per byte with large capacity.',
        'HDD/tape is slower to access than an SSD, which matters less for older photos.',
        'Cloud storage could be compared as an off-site option: accessible anywhere, but dependent on the network and an ongoing subscription.'
      ],
      technique: 'Compare means trading the same characteristics for both devices, using the photographer’s needs.'
    },
    {
      id: 'u1t1-e7', lesson: 4, marks: 4,
      question: 'Explain the importance of networking standards.',
      markPoints: [
        'Interoperability: hardware and software from different vendors can work together.',
        'Without standards, building networks that share information would be difficult or impossible.',
        'No vendor lock-in: customers can choose between suppliers.',
        'Open standards promote competition, which helps keep prices down.',
        'Development is easier: developers build to the standard, one layer at a time, not for every device.'
      ],
      technique: 'Each point should say why the standard matters, not just name a feature.'
    },
    {
      id: 'u1t1-e8', lesson: 4, marks: 3,
      question: 'Explain the role of handshaking.',
      markPoints: [
        'Handshaking establishes that a device is ready to communicate before any data is sent.',
        'The devices agree how they will communicate (the rules/protocol).',
        'Steps: request → acknowledge → confirm, then data transfer begins.',
        'This avoids data being sent to a device that is not ready or cannot understand it, so data is not lost or misread.'
      ],
      technique: 'Explain why it happens before data transfer, not just what the steps are.'
    }
  ],

  traces: [
    {
      id: 'u1t1-t1', lesson: 2,
      title: 'Register tracker: a short program',
      intro: '<p>A simple processor uses the Little Man Computer style instructions <code>LDA</code> (load the accumulator from an address), <code>ADD</code> (add the contents of an address to the accumulator), <code>SUB</code> (subtract), <code>STA</code> (store the accumulator at an address) and <code>HLT</code> (halt).</p>' +
        '<p>The program starts at address 0, so the PC is initially 0. Addresses 10, 11 and 12 hold 25, 17 and 8. Address 13 holds 0. Complete one row for each instruction, showing values <strong>after the instruction has been executed</strong>. The MAR changes only when memory is accessed, and the PC is incremented after each fetch.</p>',
      code: '0  LDA 10\n1  ADD 11\n2  SUB 12\n3  STA 13\n4  HLT',
      columns: ['CIR', 'PC', 'MAR', 'ACC', 'Address 13'],
      rows: [
        ['LDA 10', '1', '10', '25', '0'],
        ['ADD 11', '2', '11', '42', '0'],
        ['SUB 12', '3', '12', '34', '0'],
        ['STA 13', '4', '13', '34', '34'],
        ['HLT', '5', '4', '34', '34']
      ],
      given: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
      explanation: 'Each fetch copies the PC to the MAR and then increments the PC. Executing <code>LDA</code>, <code>ADD</code>, <code>SUB</code> and <code>STA</code> puts the operand address in the MAR. <code>HLT</code> does not access memory, so the MAR still holds 4, the address used to fetch it. 25 + 17 = 42, then 42 − 8 = 34, which <code>STA 13</code> stores at address 13.'
    }
  ]
});
