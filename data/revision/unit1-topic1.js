/*
 * Revision: Unit 1, Topic 1 – Hardware and communication.
 * Written only from the Topic 1 lesson resources (resources/unit1/topic1/lesson1–4):
 * the slides, starters, interactive activities and exit tickets.
 * Items are in specification order. Every item has `spec` (the entry it covers, as listed in
 * data/course/unit1.js) and `lesson` (the lesson that teaches it).
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
    'Lesson 1 – 1.1.1 · 1.2.1 · 1.2.2',
    'Lesson 2 – 1.2.3 · 1.3.1 · 1.4.1 · 1.4.2',
    'Lesson 3 – 1.5.1 · 1.6.1 · 1.7.1',
    'Lesson 4 – 1.7.1 · 1.7.2 · 1.7.3 · 1.7.4 · 1.8.1'
  ],

  /* =================================================================== NOTES */
  notes: [
    /* ---------- 1.1.1 ---------- */
    {
      spec: '1.1.1', lesson: 1,
      heading: 'The motherboard is the hub',
      html: '<p>Everything connects to the motherboard – directly (socket, slot) or through a port – and talks over buses and interfaces.</p>' +
        '<table><thead><tr><th scope="col">Component</th><th scope="col">Job</th><th scope="col">Connects through</th></tr></thead><tbody>' +
        '<tr><td>CPU</td><td>Executes instructions (CU, ALU, registers, cache)</td><td>CPU socket → system bus</td></tr>' +
        '<tr><td>RAM</td><td>Volatile working memory</td><td>DIMM slots → memory bus</td></tr>' +
        '<tr><td>ROM</td><td>Firmware (BIOS/UEFI) for booting</td><td>On the motherboard</td></tr>' +
        '<tr><td>SSD / HDD</td><td>Non-volatile long-term storage</td><td>SATA · NVMe (PCIe)</td></tr>' +
        '<tr><td>GPU</td><td>Renders graphics</td><td>PCIe</td></tr>' +
        '<tr><td>Sound card</td><td>DSP, DAC, ADC for audio</td><td>On-board · PCIe · USB</td></tr>' +
        '<tr><td>NIC / Wi-Fi</td><td>Joins the network</td><td>PCIe · on-board</td></tr>' +
        '<tr><td>Input / output</td><td>Keyboard, mouse, monitor, printer…</td><td>USB · HDMI · DisplayPort · Bluetooth</td></tr>' +
        '<tr><td>PSU</td><td>Converts and supplies power</td><td>Power cables (no data)</td></tr>' +
        '</tbody></table>'
    },
    {
      spec: '1.1.1', lesson: 1,
      heading: 'The core: processing, memory, storage',
      points: [
        '<strong>CPU</strong> – executes instructions; the “brain”. The control unit (CU) directs operations; the arithmetic logic unit (ALU) does maths and logic; registers are tiny, fastest storage inside the CPU; cache is high-speed memory for frequent data.',
        '<strong>Memory</strong> – RAM is volatile working memory for running programs; ROM is non-volatile and holds the BIOS/UEFI firmware; cache sits on or near the CPU and cuts latency.',
        '<strong>Storage</strong> – an HDD uses magnetic platters (high capacity, mechanical); an SSD uses flash memory (no moving parts, faster). Both are non-volatile: they keep data with the power off.'
      ]
    },
    {
      spec: '1.1.1', lesson: 1,
      heading: 'Around the core: I/O, graphics, sound, power',
      points: [
        '<strong>Input and output</strong> – input: keyboard, mouse, scanner, microphone; output: monitor, printer, speakers. They connect through USB, HDMI, DisplayPort or Bluetooth.',
        '<strong>GPU</strong> – a dedicated processor for images, video and 3D, with its own memory (VRAM). Connects through a PCIe slot.',
        '<strong>Sound card</strong> – a DSP processes audio; a DAC converts digital → analogue (out); an ADC converts analogue → digital (in). Integrated on-board, or PCIe or USB.',
        '<strong>PSU</strong> – converts mains AC to the DC the parts need, and powers the motherboard, drives and GPU through cables. Power only, no data.'
      ]
    },
    {
      spec: '1.1.1', lesson: 1,
      heading: 'Communication elements',
      points: [
        '<strong>The system bus</strong> – the data bus carries the data; the address bus says where; the control bus carries commands (read, write, interrupt).',
        '<strong>Controllers and interfaces</strong> – I/O controllers (USB, SATA) manage traffic between the CPU and devices; USB, Thunderbolt and Bluetooth connect peripherals.',
        '<strong>Network interface (NIC)</strong> – wired (Ethernet) or wireless (Wi-Fi), PCIe or on-board. It talks to routers and switches using TCP/IP.'
      ]
    },

    /* ---------- 1.2.1 ---------- */
    {
      spec: '1.2.1', lesson: 1,
      heading: 'Inside the CPU',
      points: [
        '<strong>Control unit (CU)</strong> – fetches, decodes and coordinates; tells everything else what to do.',
        '<strong>ALU</strong> – add, subtract, compare, AND/OR/NOT.',
        '<strong>Registers</strong> – tiny, fastest storage; each has one job.',
        '<strong>Cache</strong> – keeps frequently used data close to the cores (L1 · L2 · L3).'
      ]
    },
    {
      spec: '1.2.1', lesson: 1,
      heading: 'The five registers – what each one holds',
      html: '<table><thead><tr><th scope="col">Register</th><th scope="col">What it holds</th></tr></thead><tbody>' +
        '<tr><td>PC – Program Counter</td><td>Address of the NEXT instruction to fetch. Increments after each fetch (unless a jump).</td></tr>' +
        '<tr><td>MAR – Memory Address Register</td><td>The address in memory being read from or written to. Sent out on the address bus.</td></tr>' +
        '<tr><td>MDR – Memory Data Register</td><td>The data just read from, or about to be written to, memory. Buffer between CPU and RAM.</td></tr>' +
        '<tr><td>CIR – Current Instruction Register</td><td>The instruction being executed right now, split into opcode and operand for decoding.</td></tr>' +
        '<tr><td>ACC – Accumulator</td><td>Intermediate results from the ALU.</td></tr>' +
        '</tbody></table><p>PC → MAR → MDR → CIR → ACC is the order they appear in a fetch.</p>'
    },
    {
      spec: '1.2.1', lesson: 1,
      heading: 'Three buses – what travels, and which way',
      points: [
        '<strong>Data bus</strong> – carries the data itself; both ways.',
        '<strong>Address bus</strong> – carries where in memory (from the MAR); CPU → memory only.',
        '<strong>Control bus</strong> – carries read · write · interrupt · clock; both ways.',
        'Exam favourite: the address bus is unidirectional – memory never tells the CPU an address.'
      ]
    },
    {
      spec: '1.2.1', lesson: 1,
      heading: 'Von Neumann architecture (1945)',
      points: [
        'Four defining features: <strong>one memory</strong> for instructions AND data; <strong>sequential</strong> – one instruction at a time, in order; a <strong>control unit</strong> drives fetch and execute; <strong>stored program</strong> – change the program, not the hardware.',
        'Instructions and data share the same memory and the same bus.'
      ]
    },
    {
      spec: '1.2.1', lesson: 1,
      heading: 'Why it won – and where it hurts',
      points: [
        '<strong>Advantages</strong> – simple to design and build; flexible (update the program, keep the hardware); cost-effective (one memory, one bus).',
        '<strong>The Von Neumann bottleneck</strong> – instructions AND data must squeeze through the same bus; the CPU is faster than memory, so it waits; memory bandwidth becomes the limit.',
        '<strong>Working around it</strong> – Harvard architecture (separate instruction and data memory, used in embedded systems); cache hierarchies (L1/L2/L3); multi-core, pipelining and out-of-order execution.'
      ]
    },

    /* ---------- 1.2.2 ---------- */
    {
      spec: '1.2.2', lesson: 1,
      heading: 'The memory hierarchy',
      html: '<table><thead><tr><th scope="col">Level</th><th scope="col">Details</th></tr></thead><tbody>' +
        '<tr><td>Registers</td><td>Inside the CPU · CPU speed · bytes</td></tr>' +
        '<tr><td>L1 · L2 · L3 cache</td><td>On the CPU · KB–MB · SRAM</td></tr>' +
        '<tr><td>RAM</td><td>Main memory · GB · DRAM · volatile</td></tr>' +
        '<tr><td>Virtual memory</td><td>Disk pretending to be RAM · slow</td></tr>' +
        '<tr><td>SSD · HDD · flash</td><td>Secondary storage · TB · non-volatile</td></tr>' +
        '</tbody></table>' +
        '<p>↑ Faster · smaller · costlier per byte. ↓ Slower · larger · cheaper per byte. ROM sits outside the ladder: non-volatile firmware on the motherboard, read at boot.</p>'
    },
    {
      spec: '1.2.2', lesson: 1,
      heading: 'Types of memory – the ones the exam names',
      points: [
        '<strong>RAM</strong> – volatile; fast; holds running programs and data. DRAM (main memory) · SRAM (cache).',
        '<strong>ROM</strong> – non-volatile; written at manufacture or by a firmware update. BIOS/UEFI – used to boot.',
        '<strong>Cache</strong> – small, very fast, next to the cores. L1 smallest/fastest → L3 largest, shared.',
        '<strong>Virtual memory</strong> – part of the disk used as an extension of RAM when it is full. Lets more or bigger programs run – slowly.',
        '<strong>Flash</strong> – non-volatile solid state: USB sticks, SSDs, cards. Faster than an HDD; no power needed to keep data.',
        '<strong>Registers and secondary storage</strong> – registers: CPU-speed, tiny, inside the processor. Secondary (HDD/SSD): non-volatile, large, slow.'
      ]
    },
    {
      spec: '1.2.2', lesson: 1,
      heading: 'Caching: keep what you need next, closer',
      points: [
        'The CPU asks L1? → L2? → L3? → RAM → disk. A <strong>hit</strong> stops the search there; a <strong>miss</strong> drops down a level and tries again. Each step down is slower.',
        '<strong>CPU cache</strong> – holds frequently used instructions and data. L1 per core · L2 per core or shared · L3 shared by all cores. Reduces the time waiting on RAM.',
        '<strong>Disk cache</strong> – RAM (or a buffer on the drive) holding frequently read blocks. Speeds up reads and writes to an HDD or SSD.',
        'Analogy: desk (registers) → drawer (cache) → filing cabinet (RAM) → archive (disk). You don’t fetch from the archive if it’s in your drawer.'
      ]
    },

    /* ---------- 1.2.3 ---------- */
    {
      spec: '1.2.3', lesson: 2,
      heading: 'One queue, or many at once?',
      points: [
        '<strong>Sequential</strong> – one core. Tasks queue and run one after another; the total time is the sum of every task.',
        '<strong>Parallel</strong> – several cores. Tasks are divided and run at the same time; the total time shrinks towards the length of the longest single task.',
        'The catch: dividing the work, coordinating the cores and combining results all cost time too – parallel isn’t free.',
        'Key vocabulary: parallel processing – <em>prosesu cyfochrog</em>; core / multi-core – <em>craidd / amlgraidd</em>; synchronisation – <em>cydamseru</em>.'
      ]
    },
    {
      spec: '1.2.3', lesson: 2,
      heading: 'Four ideas behind parallel processing',
      points: [
        '<strong>Task division</strong> – break a big job into smaller independent pieces that can run separately.',
        '<strong>Concurrency</strong> – multiple pieces genuinely running at the same time, on separate cores.',
        '<strong>Coordination</strong> – cores must communicate and stay in step so results combine correctly.',
        '<strong>Scalability</strong> – add more cores, handle more work – up to a point.'
      ]
    },
    {
      spec: '1.2.3', lesson: 2,
      heading: 'Why bother – and where it bites',
      points: [
        '<strong>Advantages</strong> – increased speed; efficiency (more done per second); scalability; handles large data sets.',
        '<strong>Challenges</strong> – task dependency (some steps must wait for others); synchronisation overhead; resource contention; added complexity.',
        '<strong>Where it’s used</strong> – supercomputers; graphics processing (GPUs); search engines; machine learning.'
      ]
    },

    /* ---------- 1.3.1 ---------- */
    {
      spec: '1.3.1', lesson: 2,
      heading: 'The five registers – quick recap',
      html: '<table><thead><tr><th scope="col">Register</th><th scope="col">Cymraeg</th><th scope="col">Holds</th></tr></thead><tbody>' +
        '<tr><td>PC – Program Counter</td><td><em>Cyfrif Rhaglen</em></td><td>Address of the next instruction</td></tr>' +
        '<tr><td>MAR – Memory Address Register</td><td><em>Cofrestr Cyfeiriad Cof</em></td><td>The address currently being accessed</td></tr>' +
        '<tr><td>MDR – Memory Data Register</td><td><em>Cofrestr Data Cof</em></td><td>Data just read from, or about to be written to, memory</td></tr>' +
        '<tr><td>CIR – Current Instruction Register</td><td><em>Cofrestr Cyfarwyddyd Cyfredol</em></td><td>The instruction being decoded / executed</td></tr>' +
        '<tr><td>ACC – Accumulator</td><td><em>Cronnwr</em></td><td>Intermediate results from the ALU</td></tr>' +
        '</tbody></table>'
    },
    {
      spec: '1.3.1', lesson: 2,
      heading: 'The fetch-execute cycle',
      html: '<ol>' +
        '<li><strong>PC → MAR</strong> – the address of the next instruction is copied into the MAR.</li>' +
        '<li><strong>MAR → RAM</strong> – the MAR sends that address out on the address bus.</li>' +
        '<li><strong>RAM → MDR</strong> – the instruction stored there is copied into the MDR.</li>' +
        '<li><strong>MDR → CIR</strong> – the instruction moves into the CIR to be decoded.</li>' +
        '<li><strong>Decode</strong> – the control unit splits the CIR into opcode + operand.</li>' +
        '<li><strong>Execute</strong> – the ALU runs the operation; the result goes to the ACC.</li>' +
        '</ol>' +
        '<p>Fetch (1–4) · Decode (5) · Execute (6) – then the cycle repeats from the new PC.<br>' +
        '<em>Cyrchu</em> (1–4) · <em>Datgodio</em> (5) · <em>Gweithredu</em> (6). Register – <em>cofrestr</em>; instruction – <em>cyfarwyddyd</em>.</p>'
    },
    {
      spec: '1.3.1', lesson: 2,
      heading: 'Where the cycle catches people out',
      points: [
        '<strong>MAR vs MDR</strong> – the MAR holds an ADDRESS (where to look); the MDR holds the DATA (what was found there). They are easy to mix up: both are four-letter registers that look similar on the diagram.',
        '<strong>When does the PC increment?</strong> After the instruction is fetched – not after it is executed. So the PC is already pointing at the NEXT instruction while the current one is still being decoded and executed.'
      ]
    },

    /* ---------- 1.4.1 ---------- */
    {
      spec: '1.4.1', lesson: 2,
      heading: 'Contemporary input and output devices',
      points: [
        '<strong>Input devices</strong> (<em>dyfais fewnbwn</em>) – touchscreen; keyboard and mouse; barcode / QR scanner; microphone (voice input); scanner.',
        '<strong>Output devices</strong> (<em>dyfais allbwn</em>) – monitor; 3D / laser printer; speakers; Braille display.',
        'They connect to the computer through USB, HDMI, DisplayPort or Bluetooth.'
      ]
    },

    /* ---------- 1.4.2 ---------- */
    {
      spec: '1.4.2', lesson: 2,
      heading: 'Device, and where it’s the right choice',
      html: '<table><thead><tr><th scope="col">Device</th><th scope="col">Type</th><th scope="col">Best suited to…</th></tr></thead><tbody>' +
        '<tr><td>Touchscreen</td><td>Input</td><td>Kiosks, tablets – intuitive, no extra hardware, but imprecise for detailed work</td></tr>' +
        '<tr><td>Keyboard and mouse</td><td>Input</td><td>Precise text entry and navigation – desktop / office work</td></tr>' +
        '<tr><td>Barcode / QR scanner</td><td>Input</td><td>Retail and stock control – fast, low error rate on repetitive data</td></tr>' +
        '<tr><td>Microphone (voice input)</td><td>Input</td><td>Hands-free or accessibility contexts – driving, mobility impairment</td></tr>' +
        '<tr><td>Monitor</td><td>Output</td><td>General visual output – most contexts</td></tr>' +
        '<tr><td>3D / laser printer</td><td>Output</td><td>Physical documents, or prototyping and manufacture</td></tr>' +
        '<tr><td>Speakers</td><td>Output</td><td>Audio feedback, accessibility for visually impaired users</td></tr>' +
        '<tr><td>Braille display</td><td>Output</td><td>Accessibility – tactile output for blind or low-vision users</td></tr>' +
        '</tbody></table><p>Suitable / appropriate – <em>addas</em>.</p>'
    },

    /* ---------- 1.5.1 ---------- */
    {
      spec: '1.5.1', lesson: 3,
      heading: 'Six contemporary storage devices',
      points: [
        '<strong>HDD</strong> – magnetic platters, moving read/write head. Cheap per byte, large capacity, slower than SSD.',
        '<strong>SSD</strong> – no moving parts, flash memory. Fast access, more expensive per byte than HDD.',
        '<strong>Optical (CD/DVD/Blu-ray)</strong> – laser-read discs. Cheap, portable, limited capacity, easily damaged.',
        '<strong>Magnetic tape</strong> – serial access, very cheap per byte. Slow, but reliable for large-scale archival backup.',
        '<strong>Flash / USB drive</strong> – small, portable solid-state storage. Fast, convenient, limited capacity.',
        '<strong>Cloud storage</strong> – data stored on remote servers over a network. Accessible anywhere, depends on network speed.'
      ]
    },
    {
      spec: '1.5.1', lesson: 3,
      heading: 'Comparing them on the same characteristics',
      html: '<table><thead><tr><th scope="col">Device</th><th scope="col">Speed of access</th><th scope="col">Cost per unit</th><th scope="col">Portability</th><th scope="col">Typical capacity</th></tr></thead><tbody>' +
        '<tr><td>HDD</td><td>Fast (but slower than SSD)</td><td>Low</td><td>Low–medium</td><td>Large (TBs)</td></tr>' +
        '<tr><td>SSD</td><td>Very fast</td><td>Higher</td><td>Medium</td><td>Medium–large</td></tr>' +
        '<tr><td>Optical disc</td><td>Slow</td><td>Very low</td><td>High</td><td>Small (GBs)</td></tr>' +
        '<tr><td>Magnetic tape</td><td>Slow (serial access)</td><td>Very low</td><td>High</td><td>Very large (archival)</td></tr>' +
        '<tr><td>Flash / USB</td><td>Fast</td><td>Low–medium</td><td>Very high</td><td>Small–medium</td></tr>' +
        '<tr><td>Cloud storage</td><td>Depends on network</td><td>Ongoing (subscription)</td><td>Accessible anywhere</td><td>Scalable / very large</td></tr>' +
        '</tbody></table>' +
        '<p>A “compare” answer always trades characteristics against each other – e.g. tape is cheap and huge but far too slow for daily access; SSD is fast but costs more per byte.</p>'
    },

    /* ---------- 1.6.1 ---------- */
    {
      spec: '1.6.1', lesson: 3,
      heading: 'How data gets fragmented on an HDD',
      points: [
        '<strong>The physical picture</strong> – data is stored on a spinning magnetic platter, in tracks and sectors. A read/write head moves across the disk to reach each sector.',
        '<strong>Where fragmentation comes from</strong> – a file doesn’t always fit in one contiguous space. It gets split and stored in whatever free sectors are available – often scattered across the disk.',
        'The more the disk fills and empties over time, the more fragmented it becomes.'
      ]
    },
    {
      spec: '1.6.1', lesson: 3,
      heading: 'Consequences, and what defragmentation does',
      points: [
        '<strong>Consequences</strong> – the read/write head must move to several different positions to read one file. Each move takes time, so access is slower overall. More fragmentation → more head movement → more wear.',
        '<strong>What defragmentation does</strong> – physically rearranges fragmented data so each file’s parts sit closer together. Fewer positions for the head to move between, so access speeds improve.',
        '<strong>Common exam mix-up: SSDs don’t need defragmenting</strong> – an SSD has no moving head, so random access to any location costs the same and scattered data isn’t slower to read. SSDs use a different maintenance process (TRIM) instead.'
      ]
    },

    /* ---------- 1.7.1 ---------- */
    {
      spec: '1.7.1', lesson: 3,
      heading: 'From personal to worldwide',
      html: '<table><thead><tr><th scope="col">Network</th><th scope="col">What it is</th><th scope="col">Typical range</th></tr></thead><tbody>' +
        '<tr><td>PAN – Personal Area Network</td><td>A single person’s own devices – e.g. phone to smartwatch or wireless earbuds</td><td>Metres</td></tr>' +
        '<tr><td>LAN – Local Area Network</td><td>One site – e.g. a school or office building</td><td>One building / site</td></tr>' +
        '<tr><td>WLAN – Wireless LAN</td><td>A LAN using wireless connections instead of cables</td><td>One building / site</td></tr>' +
        '<tr><td>WAN – Wide Area Network</td><td>Connects LANs across a large area – the internet is the largest WAN</td><td>Cities / countries / global</td></tr>' +
        '</tbody></table>'
    },
    {
      spec: '1.7.1', lesson: 3,
      heading: 'How devices on a network communicate',
      points: [
        '<strong>Client-server</strong> – clients request; a central server provides the resource or service, e.g. a website or a file share.',
        '<strong>Peer-to-peer</strong> – every device can act as both client and server, sharing directly with each other, with no central server.'
      ]
    },
    {
      spec: '1.7.1', lesson: 4,
      heading: 'The hardware that builds a network',
      points: [
        '<strong>NIC</strong> – hardware inside a device that lets it connect to a network. Every networked device needs one – wired (Ethernet) or wireless.',
        '<strong>Switch</strong> – connects multiple devices within a LAN. Sends data only to the device it’s addressed to, not every device.',
        '<strong>Router</strong> – connects different networks together, e.g. a LAN to the internet. Directs data between networks using addresses.',
        '<strong>Hub</strong> – an older, simpler way to connect devices in a LAN. Broadcasts data to every device – far less efficient than a switch.',
        '<strong>Wireless access point</strong> – lets wireless devices join a wired network; turns Wi-Fi signals into a form the wired network understands.',
        '<strong>Modem</strong> – connects a network to an external line, e.g. from an ISP; converts between the network’s signals and the line’s signal.'
      ]
    },
    {
      spec: '1.7.1', lesson: 4,
      heading: 'Addressing: finding the right device',
      points: [
        '<strong>MAC address</strong> – a unique physical address built into a device’s network hardware (its NIC). Doesn’t change – it identifies the physical device itself. Used to deliver data to the right device within a local network.',
        '<strong>IP address</strong> – a logical address assigned to a device on a network. Can change – assigned automatically (DHCP) or set manually. Used to route data between networks, including across the internet.',
        'Both are needed: the IP address gets data to the right network, the MAC address gets it to the right device on that network.'
      ]
    },
    {
      spec: '1.7.1', lesson: 4,
      heading: 'Transmission media: wired and wireless',
      html: '<table><thead><tr><th scope="col">Medium</th><th scope="col">Examples</th><th scope="col">Advantage</th><th scope="col">Disadvantage</th></tr></thead><tbody>' +
        '<tr><td>Copper / twisted pair</td><td>Ethernet cables, telephone wiring</td><td>Cheap and simple to install</td><td>Limited distance and bandwidth, prone to interference</td></tr>' +
        '<tr><td>Fibre optic</td><td>High-speed backbone and broadband links</td><td>Very high bandwidth, long distance, resistant to interference</td><td>More expensive to buy and install</td></tr>' +
        '<tr><td>Wireless (radio)</td><td>Wi-Fi, Bluetooth, cellular</td><td>No cables needed – devices can move freely</td><td>Usually slower and less secure than wired, prone to interference</td></tr>' +
        '</tbody></table>'
    },
    {
      spec: '1.7.1', lesson: 4,
      heading: 'Networked vs standalone',
      points: [
        '<strong>Advantages of networking</strong> – share resources (printers, files, internet connections); centralised management (updates, backups and security controlled from one place); easy communication between devices and users.',
        '<strong>Disadvantages of networking</strong> – a bigger security risk (more points where an attacker could get in); if the network goes down, every connected device can be affected; costs more to set up and maintain than standalone computers.'
      ]
    },

    /* ---------- 1.7.2 ---------- */
    {
      spec: '1.7.2', lesson: 4,
      heading: 'Why networking standards matter',
      points: [
        '<strong>Interoperability</strong> – hardware and software from different vendors can work together. Without shared standards, building networks that easily share information would be difficult or impossible.',
        '<strong>No vendor lock-in</strong> – customers aren’t forced to buy every device from one company; standards mean genuine choice between suppliers.',
        '<strong>Competition and price</strong> – open standards promote competition between vendors, and more competition helps hold prices down.',
        '<strong>Easier development</strong> – software and hardware can be developed one layer at a time; developers build to the standard, not to every possible device.'
      ]
    },

    /* ---------- 1.7.3 ---------- */
    {
      spec: '1.7.3', lesson: 4,
      heading: 'Protocols that run the internet',
      html: '<table><thead><tr><th scope="col">Protocol</th><th scope="col">What it does</th><th scope="col">Why it matters</th></tr></thead><tbody>' +
        '<tr><td>HTTP</td><td>Transfers web pages between a server and a browser</td><td>Lets any browser request and display pages the way the author intended</td></tr>' +
        '<tr><td>FTP</td><td>Transfers files between computers over a network</td><td>Errors are checked for, and data is re-transmitted if something goes wrong</td></tr>' +
        '<tr><td>SMTP</td><td>Sends email from a client to a server, or server to server</td><td>A standard way of passing email between different mail servers</td></tr>' +
        '<tr><td>IMAP</td><td>Retrieves and syncs email, keeping messages on the server</td><td>Same inbox on every device, without using up local storage</td></tr>' +
        '<tr><td>TCP/IP</td><td>The core protocol suite the internet runs on – breaks data into packets and routes them</td><td>The basic, shared language every device on the internet uses</td></tr>' +
        '<tr><td>DHCP</td><td>Automatically assigns IP addresses to devices joining a network</td><td>Frees addresses no longer in use back to the pool for reallocation</td></tr>' +
        '<tr><td>UDP</td><td>Sends data fast, with very little error recovery</td><td>Suits video/audio streaming, where speed matters more than the odd lost packet</td></tr>' +
        '</tbody></table><p>Learn why each one matters – not just what it stands for.</p>'
    },
    {
      spec: '1.7.3', lesson: 4,
      heading: 'Wireless communication protocols',
      points: [
        '<strong>Wi-Fi (802.11)</strong> – wireless local area networking. Connects devices to a router within a building or site; used for most home and office wireless internet access.',
        '<strong>Bluetooth</strong> – short-range, low-power connections. Device-to-device: headphones, keyboards, wearables. A wireless PAN, not a full network.',
        '<strong>Cellular (4G / 5G)</strong> – wide-area mobile data over the phone network. Internet access without a fixed Wi-Fi connection; 5G adds higher speed and lower latency than 4G.'
      ]
    },

    /* ---------- 1.7.4 ---------- */
    {
      spec: '1.7.4', lesson: 4,
      heading: 'Handshaking: agreeing to talk before talking',
      points: [
        '<strong>What it is</strong> – when a computer system establishes a device’s readiness to communicate. It happens before any real data is sent.',
        '<strong>Why it matters</strong> – it confirms both devices are ready and agree on how to communicate, and avoids data being sent to a device that isn’t listening, or can’t understand it.',
        '<strong>1. Request</strong> – device A signals it wants to communicate. <strong>2. Acknowledge</strong> – device B responds: I’m ready, here’s how I can communicate. <strong>3. Confirm</strong> – device A confirms: agreed, data transfer begins.',
        'Order is the whole point: if a device sends data before the handshake completes, the receiving device may not be ready – data gets lost or misread.'
      ]
    },

    /* ---------- 1.8.1 ---------- */
    {
      spec: '1.8.1', lesson: 4,
      heading: 'A network of networks',
      points: [
        'Each LAN – school, office, home, college, business – is its own network.',
        'The internet connects them all together: a world-wide infrastructure built from smaller networks, not one single network.'
      ]
    }
  ],

  /* ===================================================== MISCONCEPTIONS (from the slides) */
  misconceptions: [
    { spec: '1.2.1', lesson: 1, wrong: 'Faster clock = faster computer.', right: 'Cache size, cores, bus width and memory speed all matter – the bottleneck is usually memory.' },
    { spec: '1.2.2', lesson: 1, wrong: 'Cache is a type of RAM.', right: 'Cache is SRAM on/next to the CPU. RAM is main memory (DRAM) on the motherboard.' },
    { spec: '1.2.2', lesson: 1, wrong: 'ROM is old storage.', right: 'ROM is non-volatile firmware (BIOS/UEFI) used to boot – not somewhere you save files.' },
    { spec: '1.2.2', lesson: 1, wrong: 'Virtual memory is extra RAM.', right: 'It’s disk space used as if it were RAM. It works, but it’s slow.' },
    { spec: '1.3.1', lesson: 2, wrong: 'The MAR and MDR hold the same kind of thing.', right: 'The MAR holds an ADDRESS – where to look. The MDR holds the DATA – what was found there.' },
    { spec: '1.3.1', lesson: 2, wrong: 'The PC increments after the instruction is executed.', right: 'It increments after the instruction is fetched, so it already points at the next instruction during decode and execute.' },
    { spec: '1.6.1', lesson: 3, wrong: 'SSDs need defragmenting, like HDDs.', right: 'An SSD has no moving head, so scattered data isn’t slower to read. SSDs use TRIM instead.' }
  ],

  /* ===================================================== EXAM TECHNIQUE (from the slides) */
  examTips: [
    { spec: '1.2.1', lesson: 1, text: 'Exam favourite: the address bus is unidirectional – memory never tells the CPU an address.' },
    { spec: '1.3.1', lesson: 2, text: 'Learn the cycle as six steps: Fetch (1–4: PC → MAR, MAR → RAM, RAM → MDR, MDR → CIR) · Decode (5) · Execute (6).' },
    { spec: '1.5.1', lesson: 3, text: 'A “compare” answer always trades characteristics against each other – e.g. tape is cheap and huge but far too slow for daily access; SSD is fast but costs more per byte.' },
    { spec: '1.6.1', lesson: 3, text: 'Common exam mix-up: SSDs don’t need defragmenting – say why (no moving head).' },
    { spec: '1.7.3', lesson: 4, text: 'For each protocol, know why it matters – not just what it stands for.' }
  ],

  /* ============================================================== FLASHCARDS */
  flashcards: [
    /* 1.1.1 */
    { id: 'u1t1-111-fc1', spec: '1.1.1', lesson: 1, front: 'What does everything in a PC connect to?', back: 'The motherboard – directly (socket, slot) or through a port – talking over buses and interfaces.' },
    { id: 'u1t1-111-fc2', spec: '1.1.1', lesson: 1, front: 'How do RAM, storage and a GPU connect to the motherboard?', back: 'RAM: DIMM slots → memory bus. SSD/HDD: SATA or NVMe (PCIe). GPU: PCIe slot.' },
    { id: 'u1t1-111-fc3', spec: '1.1.1', lesson: 1, front: 'What do a sound card’s DSP, DAC and ADC do?', back: 'DSP processes audio; DAC converts digital → analogue (out); ADC converts analogue → digital (in).' },
    { id: 'u1t1-111-fc4', spec: '1.1.1', lesson: 1, front: 'What does the PSU do?', back: 'Converts mains AC to the DC the parts need. Power only – no data.' },
    /* 1.2.1 */
    { id: 'u1t1-121-fc1', spec: '1.2.1', lesson: 1, front: 'Name the four parts inside the CPU.', back: 'Control unit (fetches, decodes, coordinates), ALU (arithmetic and logic), registers (tiny, fastest storage), cache (frequently used data).' },
    { id: 'u1t1-121-fc2', spec: '1.2.1', lesson: 1, front: 'PC', back: 'Program Counter: address of the NEXT instruction to fetch. Increments after each fetch (unless a jump).' },
    { id: 'u1t1-121-fc3', spec: '1.2.1', lesson: 1, front: 'MAR', back: 'Memory Address Register: the address in memory being read from or written to. Sent out on the address bus.' },
    { id: 'u1t1-121-fc4', spec: '1.2.1', lesson: 1, front: 'MDR', back: 'Memory Data Register: the data just read from, or about to be written to, memory. Buffer between CPU and RAM.' },
    { id: 'u1t1-121-fc5', spec: '1.2.1', lesson: 1, front: 'CIR', back: 'Current Instruction Register: the instruction being executed right now, split into opcode and operand.' },
    { id: 'u1t1-121-fc6', spec: '1.2.1', lesson: 1, front: 'ACC', back: 'Accumulator: intermediate results from the ALU.' },
    { id: 'u1t1-121-fc7', spec: '1.2.1', lesson: 1, front: 'Which way does each bus carry signals?', back: 'Data bus: both ways. Address bus: CPU → memory only. Control bus: both ways.' },
    { id: 'u1t1-121-fc8', spec: '1.2.1', lesson: 1, front: 'Four defining features of Von Neumann architecture?', back: 'One memory for instructions and data; sequential; a control unit drives fetch and execute; stored program.' },
    { id: 'u1t1-121-fc9', spec: '1.2.1', lesson: 1, front: 'The Von Neumann bottleneck?', back: 'Instructions AND data squeeze through the same bus; the CPU is faster than memory, so it waits.' },
    /* 1.2.2 */
    { id: 'u1t1-122-fc1', spec: '1.2.2', lesson: 1, front: 'Put in hierarchy order: RAM, registers, secondary storage, cache, virtual memory.', back: 'Registers → cache → RAM → virtual memory → secondary storage (faster/smaller → slower/larger).' },
    { id: 'u1t1-122-fc2', spec: '1.2.2', lesson: 1, front: 'DRAM or SRAM: which is main memory and which is cache?', back: 'DRAM is main memory; SRAM is cache.' },
    { id: 'u1t1-122-fc3', spec: '1.2.2', lesson: 1, front: 'What is ROM used for?', back: 'Non-volatile firmware (BIOS/UEFI) used to boot.' },
    { id: 'u1t1-122-fc4', spec: '1.2.2', lesson: 1, front: 'What is virtual memory?', back: 'Part of the disk used as an extension of RAM when it’s full – lets more or bigger programs run, slowly.' },
    { id: 'u1t1-122-fc5', spec: '1.2.2', lesson: 1, front: 'Cache hit vs cache miss?', back: 'Hit: found at this level, stop. Miss: drop down a level (L1 → L2 → L3 → RAM → disk) and try again.' },
    { id: 'u1t1-122-fc6', spec: '1.2.2', lesson: 1, front: 'What is a disk cache?', back: 'RAM (or a buffer on the drive) holding frequently read blocks, speeding up reads and writes to an HDD or SSD.' },
    /* 1.2.3 */
    { id: 'u1t1-123-fc1', spec: '1.2.3', lesson: 2, front: 'Parallel processing<br><span class="muted">prosesu cyfochrog</span>', back: 'Tasks are divided and run at the same time on several cores.' },
    { id: 'u1t1-123-fc2', spec: '1.2.3', lesson: 2, front: 'Four ideas behind parallel processing?', back: 'Task division, concurrency, coordination, scalability.' },
    { id: 'u1t1-123-fc3', spec: '1.2.3', lesson: 2, front: 'Four challenges of parallel processing?', back: 'Task dependency, synchronisation overhead, resource contention, added complexity.' },
    { id: 'u1t1-123-fc4', spec: '1.2.3', lesson: 2, front: 'Where is parallel processing used?', back: 'Supercomputers, graphics processing (GPUs), search engines, machine learning.' },
    { id: 'u1t1-123-fc5', spec: '1.2.3', lesson: 2, front: 'Core / multi-core; synchronisation – in Welsh?', back: '<em>Craidd / amlgraidd</em>; <em>cydamseru</em>.' },
    /* 1.3.1 */
    { id: 'u1t1-131-fc1', spec: '1.3.1', lesson: 2, front: 'The four fetch steps, in order?', back: 'PC → MAR; MAR → RAM; RAM → MDR; MDR → CIR.' },
    { id: 'u1t1-131-fc2', spec: '1.3.1', lesson: 2, front: 'What happens at decode and execute?', back: 'Decode: the CU splits the CIR into opcode + operand. Execute: the ALU runs the operation; the result goes to the ACC.' },
    { id: 'u1t1-131-fc3', spec: '1.3.1', lesson: 2, front: 'When does the PC increment?', back: 'After the instruction is fetched – not after it’s executed.' },
    { id: 'u1t1-131-fc4', spec: '1.3.1', lesson: 2, front: 'Fetch, decode, execute – in Welsh?', back: '<em>Cyrchu</em>, <em>datgodio</em>, <em>gweithredu</em>.' },
    { id: 'u1t1-131-fc5', spec: '1.3.1', lesson: 2, front: 'PC, MAR, MDR, CIR, ACC – in Welsh?', back: '<em>Cyfrif Rhaglen</em>, <em>Cofrestr Cyfeiriad Cof</em>, <em>Cofrestr Data Cof</em>, <em>Cofrestr Cyfarwyddyd Cyfredol</em>, <em>Cronnwr</em>.' },
    /* 1.4.1 / 1.4.2 */
    { id: 'u1t1-141-fc1', spec: '1.4.1', lesson: 2, front: 'Name four input and four output devices.', back: 'Input: touchscreen, keyboard and mouse, barcode/QR scanner, microphone. Output: monitor, 3D/laser printer, speakers, Braille display.' },
    { id: 'u1t1-142-fc1', spec: '1.4.2', lesson: 2, front: 'Touchscreen: when right, when wrong?', back: 'Right: kiosks, tablets (intuitive, no extra hardware). Wrong: detailed work – it’s imprecise.' },
    { id: 'u1t1-142-fc2', spec: '1.4.2', lesson: 2, front: 'Why a barcode / QR scanner for retail and stock control?', back: 'Fast, with a low error rate on repetitive data.' },
    { id: 'u1t1-142-fc3', spec: '1.4.2', lesson: 2, front: 'Which devices suit accessibility needs?', back: 'Microphone (hands-free, mobility impairment); speakers (visually impaired users); Braille display (blind or low-vision users).' },
    /* 1.5.1 */
    { id: 'u1t1-151-fc1', spec: '1.5.1', lesson: 3, front: 'HDD vs SSD?', back: 'HDD: magnetic platters, moving head, cheap per byte, large, slower. SSD: flash, no moving parts, very fast, more expensive per byte.' },
    { id: 'u1t1-151-fc2', spec: '1.5.1', lesson: 3, front: 'Why is magnetic tape used for archives?', back: 'Very cheap per byte and very large – slow serial access barely matters if the data is rarely read.' },
    { id: 'u1t1-151-fc3', spec: '1.5.1', lesson: 3, front: 'Optical discs: strengths and weaknesses?', back: 'Cheap and portable, but limited capacity and easily damaged; slow.' },
    { id: 'u1t1-151-fc4', spec: '1.5.1', lesson: 3, front: 'Cloud storage: strength and weakness?', back: 'Accessible anywhere and scalable – but depends on network speed and has an ongoing subscription cost.' },
    { id: 'u1t1-151-fc5', spec: '1.5.1', lesson: 3, front: 'Which characteristics do you compare storage on?', back: 'Speed of access, cost per unit, portability, capacity (and durability).' },
    /* 1.6.1 */
    { id: 'u1t1-161-fc1', spec: '1.6.1', lesson: 3, front: 'Why do files become fragmented on an HDD?', back: 'A file doesn’t fit in one contiguous space, so it’s split across whatever free sectors are available.' },
    { id: 'u1t1-161-fc2', spec: '1.6.1', lesson: 3, front: 'Consequence of fragmentation?', back: 'The read/write head must move to several positions to read one file → slower access, more wear.' },
    { id: 'u1t1-161-fc3', spec: '1.6.1', lesson: 3, front: 'What does defragmentation do?', back: 'Physically rearranges data so each file’s parts sit closer together – fewer head positions, faster access.' },
    { id: 'u1t1-161-fc4', spec: '1.6.1', lesson: 3, front: 'Why don’t SSDs need defragmenting?', back: 'No moving head – any location costs the same to access. SSDs use TRIM instead.' },
    /* 1.7.1 */
    { id: 'u1t1-171-fc1', spec: '1.7.1', lesson: 3, front: 'PAN, LAN, WLAN, WAN?', back: 'PAN: one person’s devices (metres). LAN: one site. WLAN: a LAN using wireless. WAN: connects LANs over a large area – the internet is the largest.' },
    { id: 'u1t1-171-fc2', spec: '1.7.1', lesson: 3, front: 'Client-server vs peer-to-peer?', back: 'Client-server: clients request, a central server provides. Peer-to-peer: every device is both client and server, no central server.' },
    { id: 'u1t1-171-fc3', spec: '1.7.1', lesson: 4, front: 'Switch vs hub?', back: 'A switch sends data only to the device it’s addressed to; a hub broadcasts to every device – far less efficient.' },
    { id: 'u1t1-171-fc4', spec: '1.7.1', lesson: 4, front: 'Router, wireless access point, modem?', back: 'Router: connects different networks. WAP: lets wireless devices join a wired network. Modem: connects a network to an external line (e.g. ISP).' },
    { id: 'u1t1-171-fc5', spec: '1.7.1', lesson: 4, front: 'MAC address vs IP address?', back: 'MAC: physical, built into the NIC, doesn’t change – right device on a local network. IP: logical, can change (DHCP) – routes data between networks.' },
    { id: 'u1t1-171-fc6', spec: '1.7.1', lesson: 4, front: 'Copper vs fibre optic vs wireless?', back: 'Copper: cheap, limited distance/bandwidth. Fibre: very high bandwidth, long distance, more expensive. Wireless: no cables, but slower, less secure, interference.' },
    { id: 'u1t1-171-fc7', spec: '1.7.1', lesson: 4, front: 'One advantage and one disadvantage of networking?', back: 'Advantage: share resources / centralised management / easy communication. Disadvantage: bigger security risk / network down affects everyone / higher cost.' },
    /* 1.7.2 */
    { id: 'u1t1-172-fc1', spec: '1.7.2', lesson: 4, front: 'Four reasons networking standards matter?', back: 'Interoperability; no vendor lock-in; competition and price; easier development.' },
    /* 1.7.3 */
    { id: 'u1t1-173-fc1', spec: '1.7.3', lesson: 4, front: 'HTTP and FTP?', back: 'HTTP transfers web pages between server and browser. FTP transfers files between computers.' },
    { id: 'u1t1-173-fc2', spec: '1.7.3', lesson: 4, front: 'SMTP vs IMAP?', back: 'SMTP sends email (client → server, server → server). IMAP retrieves and syncs email, keeping it on the server.' },
    { id: 'u1t1-173-fc3', spec: '1.7.3', lesson: 4, front: 'TCP/IP, DHCP, UDP?', back: 'TCP/IP: core suite – breaks data into packets and routes them. DHCP: assigns IP addresses automatically. UDP: fast, little error recovery – streaming.' },
    { id: 'u1t1-173-fc4', spec: '1.7.3', lesson: 4, front: 'Wi-Fi vs Bluetooth vs cellular?', back: 'Wi-Fi (802.11): wireless LAN. Bluetooth: short-range, low-power, device-to-device (a PAN). Cellular (4G/5G): wide-area mobile data.' },
    /* 1.7.4 */
    { id: 'u1t1-174-fc1', spec: '1.7.4', lesson: 4, front: 'What is handshaking?', back: 'Establishing a device’s readiness to communicate, before any real data is sent.' },
    { id: 'u1t1-174-fc2', spec: '1.7.4', lesson: 4, front: 'The three handshake steps?', back: 'Request → acknowledge → confirm; then data transfer begins.' },
    /* 1.8.1 */
    { id: 'u1t1-181-fc1', spec: '1.8.1', lesson: 4, front: 'Describe the internet in one sentence.', back: 'A network of networks: a world-wide infrastructure connecting many separate LANs, not one single network.' }
  ],

  /* =============================================================== QUESTIONS */
  questions: [
    /* ---------- 1.1.1 ---------- */
    {
      id: 'u1t1-111-q1', spec: '1.1.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Through which interface does a GPU connect to the motherboard?',
      options: ['PCIe', 'DIMM slots', 'SATA', 'CPU socket'],
      answer: 0,
      feedback: ['', 'DIMM slots hold RAM.', 'SATA connects storage (SSD/HDD).', 'The CPU socket holds the CPU.'],
      explanation: 'The connection map: GPU → PCIe; RAM → DIMM slots; SSD/HDD → SATA or NVMe; CPU → CPU socket.'
    },
    {
      id: 'u1t1-111-q2', spec: '1.1.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which component converts mains AC to the DC the parts need, and carries no data?',
      options: ['PSU', 'NIC', 'Sound card', 'GPU'],
      answer: 0,
      feedback: ['', 'The NIC joins the network.', 'The sound card processes audio (DSP, DAC, ADC).', 'The GPU renders graphics.'],
      explanation: 'The PSU converts and supplies power through power cables – no data.'
    },
    {
      id: 'u1t1-111-q3', spec: '1.1.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'On a sound card, what does the ADC do?',
      options: ['Converts analogue → digital (sound in)', 'Converts digital → analogue (sound out)', 'Processes audio signals', 'Connects the card to the motherboard'],
      answer: 0,
      feedback: ['', 'That is the DAC.', 'That is the DSP.', 'The card connects on-board, through PCIe or USB.'],
      explanation: 'DSP processes audio; DAC: digital → analogue (out); ADC: analogue → digital (in).'
    },
    {
      id: 'u1t1-111-q4', spec: '1.1.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'On the system bus, which bus “says where”?',
      options: ['The address bus', 'The data bus', 'The control bus', 'The memory bus'],
      answer: 0,
      feedback: ['', 'The data bus carries the data.', 'The control bus carries commands (read, write, interrupt).', 'The memory bus links the DIMM slots; the system bus is made of data, address and control buses.'],
      explanation: 'Data bus carries the data · address bus says where · control bus carries commands.'
    },

    /* ---------- 1.2.1 ---------- */
    {
      id: 'u1t1-121-q1', spec: '1.2.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which part of the CPU fetches, decodes and coordinates – telling everything else what to do?',
      options: ['Control unit (CU)', 'ALU', 'Registers', 'Cache'],
      answer: 0,
      feedback: ['', 'The ALU does add, subtract, compare and AND/OR/NOT.', 'Registers are tiny, fastest storage; each has one job.', 'Cache keeps frequently used data close to the cores.'],
      explanation: 'The control unit directs and coordinates; the ALU does arithmetic and logic.'
    },
    {
      id: 'u1t1-121-q2', spec: '1.2.1', lesson: 1, type: 'input', skill: 'recall',
      question: 'Which register holds the address of the next instruction to be fetched? Give its abbreviation or full name.',
      accept: ['PC', 'program counter', 'the program counter'],
      explanation: 'The Program Counter (PC) holds the address of the NEXT instruction to fetch, and increments after each fetch.'
    },
    {
      id: 'u1t1-121-q3', spec: '1.2.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which register holds the instruction being executed right now, split into opcode and operand?',
      options: ['CIR', 'MDR', 'MAR', 'ACC'],
      answer: 0,
      feedback: ['', 'The MDR holds data just read from, or about to be written to, memory.', 'The MAR holds the address being read from or written to.', 'The ACC holds intermediate results from the ALU.'],
      explanation: 'Current Instruction Register: the instruction being executed, split into opcode and operand for decoding.'
    },
    {
      id: 'u1t1-121-q4', spec: '1.2.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which bus is unidirectional?',
      options: ['Address bus – CPU → memory only', 'Data bus – CPU → memory only', 'Control bus – memory → CPU only', 'All three are unidirectional'],
      answer: 0,
      feedback: ['', 'The data bus carries data both ways.', 'The control bus carries read, write, interrupt and clock signals both ways.', 'Only the address bus is unidirectional.'],
      explanation: 'Exam favourite: the address bus is unidirectional – memory never tells the CPU an address.'
    },
    {
      id: 'u1t1-121-q5', spec: '1.2.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which is <strong>not</strong> one of the four defining features of Von Neumann architecture?',
      options: ['Separate memories for instructions and data', 'One memory for instructions AND data', 'Sequential – one instruction at a time, in order', 'Stored program – change the program, not the hardware'],
      answer: 0,
      feedback: ['', 'This is a defining feature.', 'This is a defining feature.', 'This is a defining feature.'],
      explanation: 'Separate instruction and data memory is Harvard architecture – one way of working around the Von Neumann bottleneck.'
    },
    {
      id: 'u1t1-121-q6', spec: '1.2.1', lesson: 1, type: 'mcq', skill: 'application',
      question: 'Why does a Von Neumann CPU often have to wait?',
      options: ['Instructions and data must squeeze through the same bus, and the CPU is faster than memory', 'The control unit can only decode one instruction per day', 'The ALU has to wait for the PSU', 'ROM has to be read before every instruction'],
      answer: 0,
      feedback: ['', 'The CU decodes instructions continuously; this is not the limit.', 'The PSU supplies power, not data.', 'ROM is only read at boot.'],
      explanation: 'This is the Von Neumann bottleneck: memory bandwidth becomes the limit.'
    },
    {
      id: 'u1t1-121-q7', spec: '1.2.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which of these is a way of working around the Von Neumann bottleneck?',
      options: ['Cache hierarchies (L1/L2/L3)', 'Using a single bus for everything', 'Removing the control unit', 'Running instructions out of the hard disk'],
      answer: 0,
      feedback: ['', 'A single shared bus is the cause of the bottleneck.', 'Every Von Neumann CPU needs a control unit.', 'The disk is far slower than memory, so this would make things worse.'],
      explanation: 'Work-arounds: Harvard architecture, cache hierarchies, and multi-core, pipelining and out-of-order execution.'
    },
    {
      id: 'u1t1-121-q8', spec: '1.2.1', lesson: 1, type: 'mcq', skill: 'technique',
      question: 'A question asks you to “Describe the role of the address bus. [2 marks]”. Which answer would gain both marks?',
      options: ['It carries where in memory – the address from the MAR – and it is unidirectional, CPU → memory only.', 'It is one of the buses.', 'It carries data around the computer.', 'It carries signals both ways between CPU and memory.'],
      answer: 0,
      feedback: ['', 'Too vague: what does it carry, and which way?', 'The data bus carries the data.', 'The address bus is one-way.'],
      explanation: 'Two marks: what it carries, and its direction – the “exam favourite”.'
    },

    /* ---------- 1.2.2 ---------- */
    {
      id: 'u1t1-122-q1', spec: '1.2.2', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which list is in memory hierarchy order, from fastest and smallest to slowest and largest?',
      options: ['Registers → cache → RAM → virtual memory → secondary storage', 'Cache → registers → RAM → secondary storage → virtual memory', 'RAM → cache → registers → virtual memory → secondary storage', 'Registers → RAM → cache → secondary storage → virtual memory'],
      answer: 0,
      feedback: ['', 'Registers are inside the CPU, at CPU speed – faster than cache.', 'RAM is slower and larger than cache and registers.', 'Cache sits between registers and RAM.'],
      explanation: '↑ faster · smaller · costlier per byte; ↓ slower · larger · cheaper per byte.'
    },
    {
      id: 'u1t1-122-q2', spec: '1.2.2', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Cache is…',
      options: ['SRAM on or next to the CPU', 'a type of main memory (DRAM) on the motherboard', 'part of the disk used as RAM', 'non-volatile firmware used to boot'],
      answer: 0,
      feedback: ['', 'That is RAM. “Cache is a type of RAM” is one of the four things people get wrong.', 'That is virtual memory.', 'That is ROM.'],
      explanation: 'Cache is SRAM on/next to the CPU. RAM is main memory (DRAM) on the motherboard.'
    },
    {
      id: 'u1t1-122-q3', spec: '1.2.2', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'What is ROM used for?',
      options: ['Non-volatile firmware (BIOS/UEFI) used to boot', 'Saving your files', 'Holding running programs and data', 'Extending RAM when it is full'],
      answer: 0,
      feedback: ['', 'ROM is not somewhere you save files – “ROM is old storage” is a common mistake.', 'That is RAM.', 'That is virtual memory.'],
      explanation: 'ROM is non-volatile, written at manufacture or by a firmware update, and read at boot.'
    },
    {
      id: 'u1t1-122-q4', spec: '1.2.2', lesson: 1, type: 'mcq', skill: 'application',
      question: 'The CPU needs some data. It isn’t in L1 or L2, but it is in L3. What happens?',
      options: ['Miss at L1, miss at L2, hit at L3 – the search stops there', 'The CPU goes straight to RAM', 'The CPU fetches it from the disk', 'The data is copied to ROM first'],
      answer: 0,
      feedback: ['', 'RAM is only checked after a miss at L3.', 'The disk is only reached after misses at every faster level.', 'ROM holds boot firmware; it is not part of caching.'],
      explanation: 'L1? L2? L3? RAM? Disk? – hit → stop here; miss → drop down a level and try again.'
    },
    {
      id: 'u1t1-122-q5', spec: '1.2.2', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which statement about virtual memory is correct?',
      options: ['It is disk space used as if it were RAM – it works, but it’s slow', 'It is extra RAM that switches on when needed', 'It is a faster type of cache', 'It is stored in ROM'],
      answer: 0,
      feedback: ['', '“Virtual memory is extra RAM” is one of the four things people get wrong.', 'It is much slower than cache.', 'It uses part of the disk.'],
      explanation: 'Virtual memory lets more or bigger programs run when RAM is full – slowly.'
    },
    {
      id: 'u1t1-122-q6', spec: '1.2.2', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'What is a disk cache?',
      options: ['RAM (or a buffer on the drive) holding frequently read blocks', 'The L3 cache inside the CPU', 'A spare hard disk', 'A backup of the disk in the cloud'],
      answer: 0,
      feedback: ['', 'L3 is CPU cache.', 'A spare disk is not a cache.', 'A cloud backup is not a cache.'],
      explanation: 'A disk cache speeds up reads and writes to an HDD or SSD.'
    },

    /* ---------- 1.2.3 ---------- */
    {
      id: 'u1t1-123-q1', spec: '1.2.3', lesson: 2, type: 'input', skill: 'application',
      question: 'Four tasks take 4 s, 3 s, 2 s and 1 s. How many seconds do they take in total on <strong>one core</strong> (sequentially)?',
      accept: ['10', '10s', '10 s', '10 seconds'],
      explanation: 'Sequentially, the total time is the sum of every task: 4 + 3 + 2 + 1 = 10 s. In parallel it shrinks towards the longest single task (4 s).'
    },
    {
      id: 'u1t1-123-q2', spec: '1.2.3', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'Which of the four ideas means “multiple pieces genuinely running at the same time, on separate cores”?',
      options: ['Concurrency', 'Task division', 'Coordination', 'Scalability'],
      answer: 0,
      feedback: ['', 'Task division is breaking a big job into smaller independent pieces.', 'Coordination is cores communicating and staying in step.', 'Scalability is adding more cores to handle more work.'],
      explanation: 'Task division · concurrency · coordination · scalability.'
    },
    {
      id: 'u1t1-123-q3', spec: '1.2.3', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'Which is a <strong>challenge</strong> of parallel processing?',
      options: ['Synchronisation overhead', 'Increased speed', 'Handles large data sets', 'Scalability'],
      answer: 0,
      feedback: ['', 'This is an advantage.', 'This is an advantage.', 'This is an advantage.'],
      explanation: 'Challenges: task dependency, synchronisation overhead, resource contention, added complexity.'
    },
    {
      id: 'u1t1-123-q4', spec: '1.2.3', lesson: 2, type: 'mcq', skill: 'application',
      question: 'Adding more cores makes a job faster “up to a point”. Why isn’t parallel processing free?',
      options: ['Dividing the work, coordinating the cores and combining results all cost time too', 'Each extra core slows the clock down', 'Cores cannot share any data', 'Parallel processing only works on supercomputers'],
      answer: 0,
      feedback: ['', 'Clock speed is not what limits it here.', 'Cores do communicate – that is coordination.', 'It is also used in GPUs, search engines and machine learning.'],
      explanation: 'The catch: dividing, coordinating and combining all take time.'
    },

    /* ---------- 1.3.1 ---------- */
    {
      id: 'u1t1-131-q1', spec: '1.3.1', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'What is the first step of the fetch-execute cycle?',
      options: ['PC → MAR', 'MDR → CIR', 'RAM → MDR', 'Decode'],
      answer: 0,
      feedback: ['', 'This is step 4.', 'This is step 3.', 'Decode is step 5.'],
      explanation: '1 PC → MAR · 2 MAR → RAM · 3 RAM → MDR · 4 MDR → CIR · 5 Decode · 6 Execute.'
    },
    {
      id: 'u1t1-131-q2', spec: '1.3.1', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'MAR and MDR are easy to mix up. Which one holds the actual data, not the address?',
      options: ['MDR', 'MAR', 'PC', 'CIR'],
      answer: 0,
      feedback: ['', 'The other way round – the MAR holds the ADDRESS to look up.', 'The PC holds the address of the next instruction.', 'The CIR holds the instruction being decoded or executed.'],
      explanation: 'MAR holds where to look; MDR holds what was found there.'
    },
    {
      id: 'u1t1-131-q3', spec: '1.3.1', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'When does the Program Counter increment?',
      options: ['After the instruction is fetched', 'After the instruction is executed', 'Before it is copied into the MAR', 'Only when the program ends'],
      answer: 0,
      feedback: ['', 'A common mix-up – by then the PC is already pointing at the next instruction.', 'Its value must be copied to the MAR first.', 'It increments every cycle.'],
      explanation: 'The PC increments right after fetch, so it already points at the next instruction during decode and execute.'
    },
    {
      id: 'u1t1-131-q4', spec: '1.3.1', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'During decode, what does the control unit do?',
      options: ['Splits the CIR into opcode + operand', 'Copies the PC into the MAR', 'Sends the result to the ACC', 'Copies the instruction from RAM into the MDR'],
      answer: 0,
      feedback: ['', 'That is step 1 of the fetch.', 'That is execute.', 'That is step 3 of the fetch.'],
      explanation: 'Decode (step 5): the CU splits the instruction into opcode and operand.'
    },
    {
      id: 'u1t1-131-q5', spec: '1.3.1', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'Put these stages in order.',
      options: ['Fetch → Decode → Execute', 'Decode → Fetch → Execute', 'Fetch → Execute → Decode', 'Execute → Fetch → Decode'],
      answer: 0,
      feedback: ['', 'An instruction must be fetched before it can be decoded.', 'It must be decoded before it can be executed.', 'Nothing can be executed before it has been fetched.'],
      explanation: '<em>Cyrchu</em> (1–4) · <em>Datgodio</em> (5) · <em>Gweithredu</em> (6) – then the cycle repeats from the new PC.'
    },

    /* ---------- 1.4.1 ---------- */
    {
      id: 'u1t1-141-q1', spec: '1.4.1', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'Which of these is an <strong>output</strong> device?',
      options: ['Braille display', 'Barcode / QR scanner', 'Touchscreen used to select options', 'Microphone'],
      answer: 0,
      feedback: ['', 'A scanner reads codes in – input.', 'Selecting options on a touchscreen is input.', 'A microphone captures sound – input.'],
      explanation: 'A Braille display gives tactile output for blind or low-vision users.'
    },

    /* ---------- 1.4.2 ---------- */
    {
      id: 'u1t1-142-q1', spec: '1.4.2', lesson: 2, type: 'mcq', skill: 'application',
      question: 'A warehouse needs to scan hundreds of items a minute with a very low error rate. Best input device?',
      options: ['Barcode scanner', 'Touchscreen', 'Microphone', 'Keyboard and mouse'],
      answer: 0,
      feedback: ['', 'Touchscreens are intuitive, but slower and imprecise for this.', 'Voice input would be slow and error-prone here.', 'Typing codes would be slow and error-prone.'],
      explanation: 'Barcode / QR scanners: fast, low error rate on repetitive data.'
    },
    {
      id: 'u1t1-142-q2', spec: '1.4.2', lesson: 2, type: 'mcq', skill: 'application',
      question: 'Why would a touchscreen be a POOR choice for detailed spreadsheet entry?',
      options: ['It’s imprecise for detailed work', 'It requires no extra hardware', 'It’s intuitive for casual use', 'It is an output device'],
      answer: 0,
      feedback: ['', 'That is an advantage, not a problem.', 'That is an advantage, not a problem.', 'A touchscreen is used as an input device here.'],
      explanation: 'Touchscreens suit kiosks and tablets, but are imprecise for detailed, structured entry.'
    },
    {
      id: 'u1t1-142-q3', spec: '1.4.2', lesson: 2, type: 'mcq', skill: 'application',
      question: 'A user with a mobility impairment needs to control a computer hands-free. Which is most suitable?',
      options: ['Microphone (voice input)', 'Keyboard and mouse', 'Touchscreen', 'Barcode scanner'],
      answer: 0,
      feedback: ['', 'These need precise hand movements.', 'A touchscreen still needs hand movement.', 'A barcode scanner reads codes; it cannot control the computer.'],
      explanation: 'Voice input suits hands-free or accessibility contexts – driving, mobility impairment.'
    },

    /* ---------- 1.5.1 ---------- */
    {
      id: 'u1t1-151-q1', spec: '1.5.1', lesson: 3, type: 'mcq', skill: 'application',
      question: 'A company must keep 10 years of financial records. They are rarely opened but must never be lost, and the archive keeps growing. Best storage?',
      options: ['Magnetic tape', 'SSD', 'Optical disc', 'USB flash drive'],
      answer: 0,
      feedback: ['', 'Fast, but that speed is wasted on data you’ll almost never touch – and it costs far more per byte.', 'Capacity is small next to a growing archive.', 'Limited capacity – fine for a few files, not an archive.'],
      explanation: 'Tape: very cheap per byte and very large; slow serial access barely matters if you almost never read it back.'
    },
    {
      id: 'u1t1-151-q2', spec: '1.5.1', lesson: 3, type: 'mcq', skill: 'application',
      question: 'A video editor needs the fastest possible read and write speeds to scrub through huge 4K files. Best storage?',
      options: ['SSD', 'HDD', 'Magnetic tape', 'Cloud storage'],
      answer: 0,
      feedback: ['', 'Its mechanical read/write head makes it noticeably slower – footage would stutter.', 'Built for cheap bulk archive, not fast access.', 'Speed depends on the network, which adds lag.'],
      explanation: 'No moving parts means very fast access – speed of access is everything here.'
    },
    {
      id: 'u1t1-151-q3', spec: '1.5.1', lesson: 3, type: 'mcq', skill: 'application',
      question: 'A student moves a handful of coursework files between library PCs and a laptop, plugging into whatever PC is free. Best storage?',
      options: ['Flash / USB drive', 'Optical disc', 'External HDD', 'Magnetic tape'],
      answer: 0,
      feedback: ['', 'Many laptops don’t have a disc drive any more.', 'It would work, but it’s bulkier than needed for a few files.', 'Tape is for archives.'],
      explanation: 'Portability is the deciding factor – small, works in any USB port, no network needed.'
    },
    {
      id: 'u1t1-151-q4', spec: '1.5.1', lesson: 3, type: 'mcq', skill: 'application',
      question: 'A family wants to view thousands of photos from a phone, a laptop or a tablet, wherever they are, and doesn’t mind a monthly fee. Best storage?',
      options: ['Cloud storage', 'HDD', 'Optical disc', 'Magnetic tape'],
      answer: 0,
      feedback: ['', 'A disk at home can’t be reached from every device, anywhere.', 'Discs would have to be carried around.', 'Tape is far too slow for everyday viewing.'],
      explanation: 'Cloud storage is accessible anywhere; its cost is an ongoing subscription.'
    },
    {
      id: 'u1t1-151-q5', spec: '1.5.1', lesson: 3, type: 'mcq', skill: 'technique',
      question: 'A question asks you to “Compare tape and SSD for backing up data. [4 marks]”. Which style of answer is best?',
      options: ['Trade characteristics against each other: “tape is cheap and huge but far too slow for daily access; an SSD is fast but costs more per byte”', 'Describe how an SSD works', 'List four facts about tape', 'Say SSD is better because it is newer'],
      answer: 0,
      feedback: ['', 'Describing one device is not a comparison.', 'Facts about one device do not compare them.', 'No characteristics or reasons are given.'],
      explanation: 'A “compare” answer always trades characteristics against each other.'
    },

    /* ---------- 1.6.1 ---------- */
    {
      id: 'u1t1-161-q1', spec: '1.6.1', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'Why does a fragmented file take longer to read on an HDD?',
      options: ['The read/write head has to move to several different positions to collect all its parts', 'The file becomes corrupted the more it is split up', 'The CPU has to decode each fragment separately', 'Fragmented files are automatically compressed'],
      answer: 0,
      feedback: ['', 'Fragmentation doesn’t corrupt data – the parts are just scattered.', 'The slowdown is physical head movement, not decoding.', 'Fragmentation has nothing to do with compression.'],
      explanation: 'Each move to a new position takes time – the more scattered the file, the more moves.'
    },
    {
      id: 'u1t1-161-q2', spec: '1.6.1', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'What does defragmentation actually do?',
      options: ['Physically rearranges data so each file’s parts are stored closer together', 'Deletes files that haven’t been opened in a long time', 'Compresses every file to save space', 'Increases the total capacity of the disk'],
      answer: 0,
      feedback: ['', 'Defragmentation doesn’t delete anything.', 'It doesn’t shrink files.', 'It doesn’t create space.'],
      explanation: 'Fewer positions for the head to move between, so access speeds improve.'
    },
    {
      id: 'u1t1-161-q3', spec: '1.6.1', lesson: 3, type: 'mcq', skill: 'application',
      question: 'After years of use, an HDD’s free space is in lots of small, scattered gaps. What is most likely to happen when a fairly large new file is saved?',
      options: ['It will be split across several of the small gaps, becoming fragmented', 'It will automatically be stored in one contiguous block', 'It will be refused', 'It will be saved to a different disk'],
      answer: 0,
      feedback: ['', 'There is no single gap big enough for the whole file.', 'The disk stores it in pieces rather than refusing it.', 'It is saved on the same disk, in pieces.'],
      explanation: 'A file doesn’t always fit in one contiguous space, so it is split across whatever free sectors are available.'
    },
    {
      id: 'u1t1-161-q4', spec: '1.6.1', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'Why don’t SSDs need defragmenting the way an HDD does?',
      options: ['They have no moving read/write head, so any location costs the same to access', 'They never run out of free space', 'They automatically delete old files', 'They can only store one file at a time'],
      answer: 0,
      feedback: ['', 'SSDs can fill up like any drive.', 'SSDs don’t delete files on their own.', 'SSDs store many files.'],
      explanation: 'Common exam mix-up: no moving head means scattered data isn’t slower to read. SSDs use TRIM instead.'
    },

    /* ---------- 1.7.1 ---------- */
    {
      id: 'u1t1-171-q1', spec: '1.7.1', lesson: 3, type: 'input', skill: 'recall',
      question: 'A phone connected to a smartwatch and wireless earbuds forms which type of network? Give the abbreviation.',
      accept: ['PAN', 'personal area network'],
      explanation: 'A Personal Area Network: a single person’s own devices, over a range of metres.'
    },
    {
      id: 'u1t1-171-q2', spec: '1.7.1', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'What specifically makes a WLAN different from a standard LAN?',
      options: ['It uses wireless connections instead of cables', 'It spans multiple countries', 'It can only connect one device at a time', 'It doesn’t need any addressing'],
      answer: 0,
      feedback: ['', 'That would be a WAN.', 'A WLAN connects many devices.', 'Wireless devices still need addresses.'],
      explanation: 'The “W” is the whole difference: a WLAN is a LAN using wireless connections.'
    },
    {
      id: 'u1t1-171-q3', spec: '1.7.1', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'What is true of a peer-to-peer network that ISN’T true of a client-server network?',
      options: ['Every device can act as both a client and a server', 'A central server provides resources', 'It needs dedicated server hardware', 'Access is controlled from one central server'],
      answer: 0,
      feedback: ['', 'That is client-server.', 'Peer-to-peer has no central server.', 'That describes client-server.'],
      explanation: 'Peer-to-peer: devices share directly with each other, with no central server.'
    },
    {
      id: 'u1t1-171-q4', spec: '1.7.1', lesson: 4, type: 'mcq', skill: 'application',
      question: 'Forty desktops on one office floor are wired into a single LAN. Data should go only to the machine it’s addressed to. Which device?',
      options: ['Switch', 'Hub', 'Router', 'Wireless access point'],
      answer: 0,
      feedback: ['', 'A hub broadcasts every signal to every device – the opposite of what is needed.', 'A router connects different networks; this is one LAN.', 'These are wired desktops, not wireless devices.'],
      explanation: 'A switch connects devices within a LAN and sends data only to the device it’s addressed to.'
    },
    {
      id: 'u1t1-171-q5', spec: '1.7.1', lesson: 4, type: 'mcq', skill: 'application',
      question: 'A new laptop can’t reach the network at all. Nothing else will work until one piece of hardware inside it is fitted and enabled. Which one?',
      options: ['NIC', 'Switch', 'Router', 'Modem'],
      answer: 0,
      feedback: ['', 'A switch connects devices already on the network.', 'A router assumes the laptop can already get onto a network.', 'A modem deals with the external line, not one laptop.'],
      explanation: 'A NIC is what lets a device connect to a network at all – wired or wireless.'
    },
    {
      id: 'u1t1-171-q6', spec: '1.7.1', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which statement about MAC and IP addresses is correct?',
      options: ['A MAC address is built into the NIC and doesn’t change; an IP address can change and routes data between networks', 'An IP address is built into the NIC; a MAC address is assigned by DHCP', 'Both change every time the device restarts', 'Only the IP address is needed to deliver data'],
      answer: 0,
      feedback: ['', 'This is the wrong way round.', 'A MAC address doesn’t change.', 'Both are needed: IP gets data to the right network, MAC to the right device on it.'],
      explanation: 'The IP address gets data to the right network; the MAC address gets it to the right device on that network.'
    },
    {
      id: 'u1t1-171-q7', spec: '1.7.1', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which transmission medium has very high bandwidth over long distances and resists interference, but is more expensive to install?',
      options: ['Fibre optic', 'Copper / twisted pair', 'Wireless (radio)', 'Bluetooth'],
      answer: 0,
      feedback: ['', 'Copper is cheap but limited in distance and bandwidth, and prone to interference.', 'Wireless is usually slower and prone to interference.', 'Bluetooth is short-range.'],
      explanation: 'Fibre optic is used for high-speed backbone and broadband links.'
    },
    {
      id: 'u1t1-171-q8', spec: '1.7.1', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which is a <strong>disadvantage</strong> of networking computers rather than leaving them standalone?',
      options: ['If the network goes down, every connected device can be affected', 'Resources such as printers can be shared', 'Backups can be managed from one place', 'Users can communicate easily'],
      answer: 0,
      feedback: ['', 'This is an advantage of networking.', 'This is an advantage (centralised management).', 'This is an advantage.'],
      explanation: 'Disadvantages: a bigger security risk; network failure affects everyone; higher set-up and maintenance cost.'
    },

    /* ---------- 1.7.2 ---------- */
    {
      id: 'u1t1-172-q1', spec: '1.7.2', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'What does “interoperability” mean as a reason for networking standards?',
      options: ['Hardware and software from different vendors can work together', 'Every device must come from one company', 'Prices are fixed by law', 'Networks no longer need protocols'],
      answer: 0,
      feedback: ['', 'Standards mean the opposite – no vendor lock-in.', 'Standards promote competition, which helps hold prices down, but don’t fix them.', 'Protocols are themselves standards.'],
      explanation: 'Interoperability · no vendor lock-in · competition and price · easier development.'
    },
    {
      id: 'u1t1-172-q2', spec: '1.7.2', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'How do open networking standards help keep prices down?',
      options: ['They promote competition between vendors', 'They force vendors to sell at cost', 'They remove the need for hardware', 'They let one vendor supply every device'],
      answer: 0,
      feedback: ['', 'Standards don’t set prices.', 'Hardware is still needed.', 'That is vendor lock-in, which standards prevent.'],
      explanation: 'More competition helps hold prices down.'
    },

    /* ---------- 1.7.3 ---------- */
    {
      id: 'u1t1-173-q1', spec: '1.7.3', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which protocol sends email from a client to a server, or server to server?',
      options: ['SMTP', 'IMAP', 'HTTP', 'DHCP'],
      answer: 0,
      feedback: ['', 'IMAP retrieves and syncs email.', 'HTTP transfers web pages.', 'DHCP assigns IP addresses.'],
      explanation: 'SMTP: a standard way of passing email between different mail servers.'
    },
    {
      id: 'u1t1-173-q2', spec: '1.7.3', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which protocol keeps email on the server, so the same inbox appears on every device?',
      options: ['IMAP', 'SMTP', 'FTP', 'UDP'],
      answer: 0,
      feedback: ['', 'SMTP sends email.', 'FTP transfers files.', 'UDP sends data fast with little error recovery.'],
      explanation: 'IMAP: same inbox on every device, without using up local storage.'
    },
    {
      id: 'u1t1-173-q3', spec: '1.7.3', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which protocol automatically assigns IP addresses to devices joining a network?',
      options: ['DHCP', 'TCP/IP', 'HTTP', 'SMTP'],
      answer: 0,
      feedback: ['', 'TCP/IP breaks data into packets and routes them.', 'HTTP transfers web pages.', 'SMTP sends email.'],
      explanation: 'DHCP also frees addresses no longer in use back to the pool.'
    },
    {
      id: 'u1t1-173-q4', spec: '1.7.3', lesson: 4, type: 'mcq', skill: 'application',
      question: 'Why does video and audio streaming suit UDP?',
      options: ['Speed matters more than the odd lost packet', 'It guarantees every packet arrives', 'It assigns IP addresses', 'It keeps messages on a server'],
      answer: 0,
      feedback: ['', 'UDP has very little error recovery – it doesn’t guarantee delivery.', 'That is DHCP.', 'That is IMAP.'],
      explanation: 'UDP sends data fast, with very little error recovery.'
    },
    {
      id: 'u1t1-173-q5', spec: '1.7.3', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which wireless protocol gives short-range, low-power, device-to-device connections such as headphones – a wireless PAN?',
      options: ['Bluetooth', 'Wi-Fi (802.11)', 'Cellular (4G/5G)', 'TCP/IP'],
      answer: 0,
      feedback: ['', 'Wi-Fi is wireless local area networking within a building or site.', 'Cellular is wide-area mobile data.', 'TCP/IP is the internet’s core protocol suite, not a wireless protocol.'],
      explanation: 'Bluetooth forms a wireless PAN, not a full network.'
    },
    {
      id: 'u1t1-173-q6', spec: '1.7.3', lesson: 4, type: 'mcq', skill: 'technique',
      question: 'A question asks: “Describe the importance of SMTP. [2 marks]”. Which answer gains both marks?',
      options: ['It sends email from a client to a server or server to server, giving a standard way of passing email between different mail servers.', 'Simple Mail Transfer Protocol.', 'It is to do with email.', 'It keeps your emails on the server.'],
      answer: 0,
      feedback: ['', 'Expanding the acronym says nothing about what it does or why it matters.', 'Too vague for two marks.', 'That is IMAP.'],
      explanation: 'Know why each protocol matters – not just what it stands for.'
    },

    /* ---------- 1.7.4 ---------- */
    {
      id: 'u1t1-174-q1', spec: '1.7.4', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'What are the three steps of a handshake, in order?',
      options: ['Request → acknowledge → confirm', 'Acknowledge → request → confirm', 'Confirm → request → acknowledge', 'Request → confirm → acknowledge'],
      answer: 0,
      feedback: ['', 'Device B can’t acknowledge before device A has asked.', 'Confirmation comes last.', 'Device A can only confirm once device B has responded.'],
      explanation: 'Device A requests; device B acknowledges; device A confirms; then data transfer begins.'
    },
    {
      id: 'u1t1-174-q2', spec: '1.7.4', lesson: 4, type: 'mcq', skill: 'application',
      question: 'What could happen if a laptop started sending data before the router had confirmed the connection?',
      options: ['The router might not be ready or listening, so the data could be lost or misread', 'The data would arrive faster', 'Nothing – handshaking is optional', 'The router would assign a new MAC address'],
      answer: 0,
      feedback: ['', 'Skipping the handshake doesn’t make the data arrive faster – it may not arrive at all.', 'Order is the whole point of handshaking.', 'MAC addresses are fixed in the hardware.'],
      explanation: 'Handshaking happens before any real data is sent, so both devices are ready.'
    },

    /* ---------- 1.8.1 ---------- */
    {
      id: 'u1t1-181-q1', spec: '1.8.1', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which best describes the internet?',
      options: ['A network of networks – a world-wide infrastructure built from smaller networks', 'One single network', 'A type of LAN', 'A wireless PAN'],
      answer: 0,
      feedback: ['', 'It is built from many separate networks.', 'It connects LANs; it is the largest WAN.', 'A PAN is one person’s devices.'],
      explanation: 'Each LAN is its own network; the internet connects them all together.'
    }
  ],

  /* ============================================== EXAM-STYLE (exit tickets and spec statements) */
  exam: [
    {
      id: 'u1t1-111-e1', spec: '1.1.1', lesson: 1, marks: 2,
      context: 'Exit ticket, Lesson 1.',
      question: 'Name one component and the interface it connects to the motherboard through.',
      markPoints: [
        'A correct component, e.g. CPU, RAM, SSD/HDD, GPU, sound card, NIC, keyboard…',
        'Its matching interface, e.g. CPU socket; DIMM slots; SATA or NVMe (PCIe); PCIe; on-board/PCIe/USB; USB/HDMI/DisplayPort/Bluetooth.'
      ],
      technique: 'Use the connection map – component, job, connects through.'
    },
    {
      id: 'u1t1-121-e1', spec: '1.2.1', lesson: 1, marks: 2,
      context: 'Exit ticket, Lesson 1.',
      question: 'What is the Von Neumann bottleneck?',
      markPoints: [
        'Instructions and data share the same memory and must squeeze through the same bus…',
        '…and the CPU is faster than memory, so it waits – memory bandwidth becomes the limit.'
      ]
    },
    {
      id: 'u1t1-121-e2', spec: '1.2.1', lesson: 1, marks: 4,
      question: 'Describe the four defining features of Von Neumann architecture.',
      markPoints: [
        'One memory for instructions AND data.',
        'Sequential – one instruction at a time, in order.',
        'A control unit drives fetch and execute.',
        'Stored program – change the program, not the hardware.'
      ]
    },
    {
      id: 'u1t1-122-e1', spec: '1.2.2', lesson: 1, marks: 2,
      context: 'Exit ticket, Lesson 1.',
      question: 'Why is L1 cache smaller than L3?',
      markPoints: [
        'L1 is the smallest and fastest level, closest to the core (per core)…',
        '…and faster memory costs more per byte, so only a small amount is used; L3 is larger, slower and shared by all cores.'
      ],
      technique: 'Use the hierarchy: ↑ faster · smaller · costlier per byte.'
    },
    {
      id: 'u1t1-123-e1', spec: '1.2.3', lesson: 2, marks: 2,
      context: 'Exit ticket, Lesson 2.',
      question: 'Name one advantage AND one challenge of parallel processing.',
      markPoints: [
        'Advantage: increased speed / efficiency (more done per second) / scalability / handles large data sets.',
        'Challenge: task dependency / synchronisation overhead / resource contention / added complexity.'
      ]
    },
    {
      id: 'u1t1-131-e1', spec: '1.3.1', lesson: 2, marks: 5,
      context: 'Exit ticket, Lesson 2.',
      question: 'Put PC, MAR, MDR, CIR and ACC in fetch-execute order and say what each holds.',
      markPoints: [
        'PC – the address of the next instruction.',
        'MAR – the address currently being accessed.',
        'MDR – data just read from, or about to be written to, memory.',
        'CIR – the instruction being decoded / executed.',
        'ACC – intermediate results from the ALU. (Order: PC → MAR → MDR → CIR → ACC.)'
      ]
    },
    {
      id: 'u1t1-131-e2', spec: '1.3.1', lesson: 2, marks: 6,
      question: 'Describe the fetch-execute cycle, showing how data can be read from RAM into registers.',
      markPoints: [
        'PC → MAR: the address of the next instruction is copied into the MAR.',
        'MAR → RAM: the MAR sends that address out on the address bus.',
        'RAM → MDR: the instruction stored there is copied into the MDR.',
        'MDR → CIR: the instruction moves into the CIR; the PC increments.',
        'Decode: the control unit splits the CIR into opcode + operand.',
        'Execute: the ALU runs the operation; the result goes to the ACC.'
      ],
      technique: 'Six steps, six marks – one register transfer per point, in order.'
    },
    {
      id: 'u1t1-142-e1', spec: '1.4.2', lesson: 2, marks: 2,
      context: 'Exit ticket, Lesson 2.',
      question: 'Name a device and one situation where it would be the wrong choice.',
      markPoints: [
        'A named input or output device, e.g. touchscreen.',
        'A situation it doesn’t suit, with a reason, e.g. detailed spreadsheet entry, because it is imprecise.'
      ]
    },
    {
      id: 'u1t1-151-e1', spec: '1.5.1', lesson: 3, marks: 2,
      context: 'Exit ticket, Lesson 3.',
      question: 'Name a storage device and one situation where it would be the wrong choice.',
      markPoints: [
        'A named device, e.g. magnetic tape.',
        'A situation it doesn’t suit, with a reason, e.g. a video editor’s daily work – serial access is far too slow.'
      ]
    },
    {
      id: 'u1t1-161-e1', spec: '1.6.1', lesson: 3, marks: 3,
      context: 'Exit ticket, Lesson 3.',
      question: 'Explain why fragmentation slows down an HDD but not an SSD.',
      markPoints: [
        'On an HDD a fragmented file is scattered, so the read/write head must move to several positions to read it.',
        'Each move takes time, so access is slower.',
        'An SSD has no moving head – any location costs the same to access – so scattered data isn’t slower.'
      ]
    },
    {
      id: 'u1t1-171-e1', spec: '1.7.1', lesson: 3, marks: 1,
      context: 'Exit ticket, Lesson 3.',
      question: 'Give one difference between a LAN and a WAN.',
      markPoints: [
        'A LAN covers one site (e.g. a school or office building); a WAN connects LANs across a large area (cities, countries, global).',
        'The internet is the largest WAN.'
      ]
    },
    {
      id: 'u1t1-172-e1', spec: '1.7.2', lesson: 4, marks: 1,
      context: 'Exit ticket, Lesson 4.',
      question: 'Give one reason networking standards matter.',
      markPoints: [
        'Interoperability – hardware and software from different vendors work together.',
        'No vendor lock-in – genuine choice between suppliers.',
        'Competition – helps hold prices down.',
        'Easier development – build to the standard, one layer at a time.'
      ]
    },
    {
      id: 'u1t1-173-e1', spec: '1.7.3', lesson: 4, marks: 2,
      context: 'Exit ticket, Lesson 4.',
      question: 'Name a protocol used for sending email, and one used for web pages.',
      markPoints: [
        'Email: SMTP.',
        'Web pages: HTTP.'
      ]
    },
    {
      id: 'u1t1-174-e1', spec: '1.7.4', lesson: 4, marks: 1,
      context: 'Exit ticket, Lesson 4.',
      question: 'Explain in one sentence why handshaking happens before data is sent.',
      markPoints: [
        'To confirm both devices are ready and agree how to communicate, so data isn’t sent to a device that isn’t listening (and lost or misread).'
      ]
    },
    {
      id: 'u1t1-181-e1', spec: '1.8.1', lesson: 4, marks: 2,
      question: 'Describe the internet in terms of a world-wide communications infrastructure.',
      markPoints: [
        'A network of networks: each LAN (school, office, home…) is its own network.',
        'The internet connects them all together – a world-wide infrastructure built from smaller networks, not one single network.'
      ]
    }
  ],

  /* ================================================================= TRACING */
  traces: [
    {
      id: 'u1t1-131-t1', spec: '1.3.1', lesson: 2,
      title: 'Register tracker: one fetch-execute cycle',
      intro: '<p>Step through one cycle, as in the Lesson 2 register tracker. The PC holds 5. Address 5 holds the instruction <code>ADD 12</code>. The ACC holds 10 and address 12 holds 7. For this exercise, the execute step adds the value at address 12 to the ACC.</p>' +
        '<p>Complete one row for each step, showing the register values <strong>after</strong> that step. Leave a cell empty if the register has not been given a value yet. Remember: the PC increments once the instruction has been fetched (by the end of step 4).</p>',
      code: '1  PC → MAR\n2  MAR → RAM\n3  RAM → MDR\n4  MDR → CIR\n5  Decode\n6  Execute',
      columns: ['Step', 'PC', 'MAR', 'MDR', 'CIR', 'ACC'],
      rows: [
        ['PC → MAR', '5', '5', '', '', '10'],
        ['MAR → RAM', '5', '5', '', '', '10'],
        ['RAM → MDR', '5', '5', 'ADD 12', '', '10'],
        ['MDR → CIR', '6', '5', 'ADD 12', 'ADD 12', '10'],
        ['Decode', '6', '5', 'ADD 12', 'ADD 12', '10'],
        ['Execute', '6', '5', 'ADD 12', 'ADD 12', '17']
      ],
      given: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]],
      explanation: 'Step 1 copies the PC (5) into the MAR. Step 2 sends that address on the address bus – no register changes. Step 3 copies the instruction into the MDR; step 4 moves it into the CIR, and the PC has incremented to 6. Decode splits the CIR into opcode (ADD) and operand (12) – no value changes. Execute: 10 + 7 = 17 in the ACC.'
    }
  ]
});
