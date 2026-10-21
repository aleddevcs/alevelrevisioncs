/*
 * Revision: Unit 1, Topic 3 – Data transmission.
 * Written only from the Topic 3 lesson resources (resources/unit1/topic3): the slides, starters
 * and interactive activities. Items are in specification order; every item has `spec` and `lesson`.
 */
RS.content.registerTopic({
  id: 'u1-t3',
  unit: 1,
  topic: 3,
  title: 'Data transmission',
  icon: 'network',
  colour: 'indigo',
  summary: 'Serial and parallel transmission, skew and crosstalk, simplex and duplex, multiplexing and switching, packet contents, collisions and CSMA/CD, and routing.',
  keywords: ['serial', 'parallel', 'skew', 'crosstalk', 'clock speed', 'USB', 'SATA', 'PCIe', 'simplex', 'half duplex', 'full duplex', 'multiplexing', 'TDM', 'FDM', 'switching', 'circuit switching', 'packet switching', 'packet', 'header', 'payload', 'checksum', 'sequence number', 'TTL', 'collision', 'CSMA/CD', 'random wait', 'routing', 'routing table', 'router'],
  specRefs: [
    'Lesson 1 – 3.1.1 serial and parallel; 3.1.2 simplex, half duplex and full duplex',
    'Lesson 2 – 3.1.3 multiplexing and switching; 3.2.1 packet contents; 3.2.2 collisions; 3.2.3 routing'
  ],

  /* =================================================================== NOTES */
  notes: [
    /* ---------- 3.1.1 ---------- */
    {
      spec: '3.1.1', lesson: 1,
      heading: 'Serial transmission',
      points: [
        '<strong>How it works</strong> – data is sent one bit at a time; bits travel one after another down a single channel; bits arrive in the same order they were sent.',
        '<strong>Where it is used</strong> – USB and Thunderbolt; Ethernet network cables; SATA drives and PCIe expansion cards; long-distance links between devices.'
      ]
    },
    {
      spec: '3.1.1', lesson: 1,
      heading: 'Parallel transmission',
      points: [
        '<strong>How it works</strong> – several bits are sent at the same time; each bit has its own wire (8, 16 or 32 wires); a whole byte can arrive on one clock tick.',
        '<strong>Where it is used</strong> – buses inside the computer, e.g. CPU to RAM; older printer cables (IEEE 1284); older IDE hard drive cables.'
      ]
    },
    {
      spec: '3.1.1', lesson: 1,
      heading: 'Why parallel struggles over distance',
      points: [
        '<strong>Skew</strong> – signals on different wires travel at slightly different speeds. The longer the cable, the further the bits drift out of sync.',
        '<strong>Crosstalk</strong> – wires running side by side interfere with each other electrically, which can corrupt bits.',
        '<strong>Result</strong> – parallel has to run at a slower clock speed, or over short distances only. Serial has neither problem.'
      ]
    },
    {
      spec: '3.1.1', lesson: 1,
      heading: 'Serial vs parallel',
      html: '<table><thead><tr><th scope="col"></th><th scope="col">Serial</th><th scope="col">Parallel</th></tr></thead><tbody>' +
        '<tr><td>Bits sent</td><td>One at a time</td><td>Several at the same time</td></tr>' +
        '<tr><td>Speed</td><td>Slower per clock tick, but can be clocked much faster</td><td>Faster over short distances</td></tr>' +
        '<tr><td>Distance</td><td>Reliable over long distances</td><td>Short distances only (skew)</td></tr>' +
        '<tr><td>Cost</td><td>Cheaper: fewer wires</td><td>More expensive: more wires</td></tr>' +
        '<tr><td>Interference</td><td>No crosstalk between data wires</td><td>Crosstalk between wires</td></tr>' +
        '</tbody></table>'
    },
    {
      spec: '3.1.1', lesson: 1,
      heading: 'So why is almost everything serial now?',
      points: [
        'Parallel is faster per clock tick, but skew and crosstalk stop it from being clocked faster. With one data wire, serial can be pushed to much higher clock speeds.',
        'Printer: then a parallel port, now USB. Hard drive: then IDE (parallel), now SATA (serial). Expansion card: then PCI (parallel), now PCIe (serial).',
        'Key terms: serial transmission – <em>trawsyrru cyfresol</em>; parallel transmission – <em>trawsyrru paralel</em>; skew – <em>sgiw</em>; crosstalk – <em>croes-siarad</em>.'
      ]
    },

    /* ---------- 3.1.2 ---------- */
    {
      spec: '3.1.2', lesson: 1,
      heading: 'Three transmission methods',
      html: '<table><thead><tr><th scope="col">Method</th><th scope="col">Description</th><th scope="col">Examples</th></tr></thead><tbody>' +
        '<tr><td>Simplex (<em>simplecs</em>)</td><td>Data travels in one direction only.</td><td>Keyboard to computer, TV broadcast, baby monitor</td></tr>' +
        '<tr><td>Half duplex (<em>hanner duplecs</em>)</td><td>Data travels in both directions, but only one direction at a time.</td><td>Walkie-talkie</td></tr>' +
        '<tr><td>Full duplex (<em>dublecs llawn</em>)</td><td>Data travels in both directions at the same time.</td><td>Phone call, video call, broadband</td></tr>' +
        '</tbody></table>'
    },
    {
      spec: '3.1.2', lesson: 1,
      heading: 'Getting the marks',
      points: [
        '<strong>Earns the mark</strong> – “Data can travel in both directions, but only one direction at a time” (half duplex); “Data can travel in both directions at the same time” (full duplex).',
        'A definition plus a separate, correct example.',
        '<strong>Loses the mark</strong> – “Half duplex sends data both ways” (doesn’t say one at a time); “Full duplex is faster” (doesn’t describe the method); reusing the same example, or an example that doesn’t fit (e.g. “the internet” for simplex).',
        'Watch for the tricky ones: some devices use different methods for different jobs.'
      ]
    },

    /* ---------- 3.1.3 ---------- */
    {
      spec: '3.1.3', lesson: 2,
      heading: 'Multiplexing: many signals, one line',
      points: [
        '<strong>What it is</strong> – several independent data sources are combined so they can be sent along a single route. A demultiplexer separates them again at the other end.',
        '<strong>Why it is needed</strong> – one line instead of a separate cable for every user; cheaper to install and maintain; makes full use of the line’s bandwidth.',
        '<strong>Time division (TDM)</strong> – each user gets a time slot and takes turns using the whole line. The turns are so quick that everyone seems to send at once. Example: digital telephone networks.',
        '<strong>Frequency division (FDM)</strong> – each user gets their own frequency band and sends all the time, side by side on the same line. Example: radio and TV broadcasting.'
      ]
    },
    {
      spec: '3.1.3', lesson: 2,
      heading: 'Switching: getting from A to B',
      html: '<p>Switching directs data from its source to its destination through a network of connected nodes.</p>' +
        '<table><thead><tr><th scope="col"></th><th scope="col">Circuit switching</th><th scope="col">Packet switching</th></tr></thead><tbody>' +
        '<tr><td>How</td><td>A dedicated path is set up between sender and receiver for the whole communication.</td><td>Data is split into packets that are sent independently and can take different routes.</td></tr>' +
        '<tr><td>Example</td><td>Traditional telephone network</td><td>The internet</td></tr>' +
        '<tr><td>+</td><td>Once connected, data arrives fast and in order.</td><td>If a link fails, packets take another route. Links are shared, so they are used efficiently.</td></tr>' +
        '<tr><td>−</td><td>If any part of the path fails, the connection breaks. The path is reserved even when nothing is sent.</td><td>Packets can arrive out of order and must be reassembled.</td></tr>' +
        '</tbody></table>'
    },

    /* ---------- 3.2.1 ---------- */
    {
      spec: '3.2.1', lesson: 2,
      heading: 'Anatomy of a TCP/IP packet',
      points: [
        '<strong>Header</strong> – control information that lets the network deliver the packet, check it and put the message back together: source address, destination address, sequence number, protocol, TTL, checksum. Other fields include header length, flags and payload size.',
        '<strong>Payload</strong> – the actual data being sent: a piece of a web page, email or file. A large file is split across many packets.',
        '<strong>Packet or frame?</strong> Some notes show a trailer with a frame check sequence. That belongs to an Ethernet frame, which wraps a packet for one hop. A TCP/IP packet is a header plus a payload.'
      ]
    },
    {
      spec: '3.2.1', lesson: 2,
      heading: 'Every field has a purpose',
      html: '<table><thead><tr><th scope="col">Field</th><th scope="col">Purpose: the part that earns the mark</th></tr></thead><tbody>' +
        '<tr><td>Source address</td><td>Identifies the sender, so the receiver can reply or ask for a resend</td></tr>' +
        '<tr><td>Destination address</td><td>Allows the packet to be routed to the correct device</td></tr>' +
        '<tr><td>Sequence number</td><td>Allows the packets to be reassembled in the correct order</td></tr>' +
        '<tr><td>Checksum</td><td>Allows the receiver to check the packet for errors</td></tr>' +
        '<tr><td>Protocol</td><td>Tells the receiver how to handle the data, e.g. TCP or UDP</td></tr>' +
        '<tr><td>Time to live (TTL)</td><td>Limits the number of hops, so lost packets don’t circulate forever</td></tr>' +
        '<tr><td>Acknowledgement number</td><td>Confirms which packets have arrived, so missing ones can be resent</td></tr>' +
        '<tr><td>Payload</td><td>The meaningful data the packet exists to carry</td></tr>' +
        '</tbody></table>' +
        '<p><strong>Field + what it allows = the mark.</strong> A list of field names on its own earns no credit.</p>'
    },

    /* ---------- 3.2.2 ---------- */
    {
      spec: '3.2.2', lesson: 2,
      heading: 'What is a collision?',
      points: [
        'A collision happens when two devices transmit at the same time on a shared medium (e.g. one shared cable, a bus). The two signals interfere, both are corrupted, and neither message can be read.',
        'Exam wording: two sets of data are detected on the network simultaneously.'
      ]
    },
    {
      spec: '3.2.2', lesson: 2,
      heading: 'Detect it, then deal with it: CSMA/CD',
      points: [
        '<strong>1. Listen</strong> – before sending, a device checks the line is quiet (carrier sense).',
        '<strong>2. Detect</strong> – while sending, devices monitor the network. A signal that doesn’t match what they sent means a collision.',
        '<strong>3. Wait</strong> – each device waits a short, random amount of time.',
        '<strong>4. Resend</strong> – the device listens again, then sends again.',
        '<strong>Why random?</strong> If both devices waited the same fixed time, they would resend at the same moment and collide again. A random wait means one almost always goes first.',
        'CSMA/CD – Carrier Sense Multiple Access with Collision Detection – is the name for this whole process.'
      ]
    },

    /* ---------- 3.2.3 ---------- */
    {
      spec: '3.2.3', lesson: 2,
      heading: 'How a packet is routed',
      html: '<ol>' +
        '<li><strong>Split and number</strong> – data is split into packets, each with a destination address and a packet number.</li>' +
        '<li><strong>Look up</strong> – each router checks the destination in its routing table.</li>' +
        '<li><strong>Forward</strong> – packets are sent along the most appropriate path: lowest cost or least traffic.</li>' +
        '<li><strong>Different routes</strong> – packets travel independently and can take different routes.</li>' +
        '<li><strong>Reassemble</strong> – at the destination, packets are put back in order using their numbers.</li>' +
        '<li><strong>Confirm or resend</strong> – a confirmation is sent once all arrive, or a resend is requested for a missing or corrupted packet.</li>' +
        '</ol>'
    },
    {
      spec: '3.2.3', lesson: 2,
      heading: 'When a router fails',
      points: [
        'Usual route A → B → E. If router B fails, routing tables update and packets take a longer path (A → C → D → E), but still arrive.',
        'Most students lose marks by stopping once the packets arrive – finish with reassembly and the confirmation or resend request.'
      ]
    }
  ],

  /* ===================================================== MISCONCEPTIONS (from the lessons) */
  misconceptions: [
    { spec: '3.1.1', lesson: 1, wrong: 'Parallel is always faster, so it should be used everywhere.', right: 'Skew and crosstalk stop parallel being clocked faster or used over distance; serial can be pushed to much higher clock speeds.' },
    { spec: '3.1.2', lesson: 1, wrong: 'Half duplex sends data both ways.', right: 'Half duplex sends data both ways, but only one direction at a time.' },
    { spec: '3.2.1', lesson: 2, wrong: 'A TCP/IP packet has a header, a payload and a trailer.', right: 'The trailer (frame check sequence) belongs to an Ethernet frame. A TCP/IP packet is a header plus a payload.' }
  ],

  /* ===================================================== EXAM TECHNIQUE (from the lessons) */
  examTips: [
    { spec: '3.1.1', lesson: 1, text: 'If a question asks for advantages and disadvantages, balance them: four advantages alone only earn the advantage marks.' },
    { spec: '3.1.2', lesson: 1, text: 'Give a definition plus a separate, correct example for each method – don’t reuse an example.' },
    { spec: '3.2.1', lesson: 2, text: 'Field + what it allows = the mark. A field on its own is a list, and a list earns nothing.' },
    { spec: '3.2.2', lesson: 2, text: 'Collision answers have three parts: what a collision is, how it is detected, and what happens next (a random wait, then resend).' },
    { spec: '3.2.3', lesson: 2, text: 'For routing, start with packet numbers and finish with what happens at the destination – reassembly, then confirmation or a resend request.' }
  ],

  /* ============================================================== FLASHCARDS */
  flashcards: [
    /* 3.1.1 */
    { id: 'u1t3-311-fc1', spec: '3.1.1', lesson: 1, front: 'Serial transmission<br><span class="muted">trawsyrru cyfresol</span>', back: 'Data is sent one bit at a time down a single channel; bits arrive in the order they were sent.' },
    { id: 'u1t3-311-fc2', spec: '3.1.1', lesson: 1, front: 'Parallel transmission<br><span class="muted">trawsyrru paralel</span>', back: 'Several bits are sent at the same time, each on its own wire (8, 16 or 32 wires); a whole byte can arrive on one clock tick.' },
    { id: 'u1t3-311-fc3', spec: '3.1.1', lesson: 1, front: 'Skew<br><span class="muted">sgiw</span>', back: 'Signals on different wires travel at slightly different speeds; the longer the cable, the further the bits drift out of sync.' },
    { id: 'u1t3-311-fc4', spec: '3.1.1', lesson: 1, front: 'Crosstalk<br><span class="muted">croes-siarad</span>', back: 'Wires running side by side interfere with each other electrically, which can corrupt bits.' },
    { id: 'u1t3-311-fc5', spec: '3.1.1', lesson: 1, front: 'If parallel is faster per tick, why is USB serial?', back: 'Skew and crosstalk stop parallel being clocked faster; with one data wire, serial can run at much higher clock speeds.' },
    { id: 'u1t3-311-fc6', spec: '3.1.1', lesson: 1, front: 'Where is parallel still used?', back: 'Buses inside the computer, e.g. CPU to RAM (and older printer and IDE cables).' },
    /* 3.1.2 */
    { id: 'u1t3-312-fc1', spec: '3.1.2', lesson: 1, front: 'Simplex<br><span class="muted">simplecs</span>', back: 'Data travels in one direction only – e.g. keyboard to computer, TV broadcast.' },
    { id: 'u1t3-312-fc2', spec: '3.1.2', lesson: 1, front: 'Half duplex<br><span class="muted">hanner duplecs</span>', back: 'Data travels in both directions, but only one direction at a time – e.g. walkie-talkie.' },
    { id: 'u1t3-312-fc3', spec: '3.1.2', lesson: 1, front: 'Full duplex<br><span class="muted">dublecs llawn</span>', back: 'Data travels in both directions at the same time – e.g. phone call, broadband.' },
    /* 3.1.3 */
    { id: 'u1t3-313-fc1', spec: '3.1.3', lesson: 2, front: 'What is multiplexing?', back: 'Combining several independent data sources so they can be sent along a single route; a demultiplexer separates them at the other end.' },
    { id: 'u1t3-313-fc2', spec: '3.1.3', lesson: 2, front: 'Why is multiplexing needed?', back: 'One line instead of a cable per user – cheaper to install and maintain, and it makes full use of the line’s bandwidth.' },
    { id: 'u1t3-313-fc3', spec: '3.1.3', lesson: 2, front: 'TDM vs FDM?', back: 'TDM: each user gets a time slot and takes turns. FDM: each user gets their own frequency band and sends all the time.' },
    { id: 'u1t3-313-fc4', spec: '3.1.3', lesson: 2, front: 'Circuit switching?', back: 'A dedicated path for the whole communication (e.g. traditional telephone). Fast and in order, but breaks if the path fails, and is reserved even when idle.' },
    { id: 'u1t3-313-fc5', spec: '3.1.3', lesson: 2, front: 'Packet switching?', back: 'Data split into packets sent independently by different routes (e.g. the internet). Survives link failures and shares links, but packets must be reassembled.' },
    /* 3.2.1 */
    { id: 'u1t3-321-fc1', spec: '3.2.1', lesson: 2, front: 'Header vs payload?', back: 'Header: control information to deliver, check and reassemble the packet. Payload: the actual data being sent.' },
    { id: 'u1t3-321-fc2', spec: '3.2.1', lesson: 2, front: 'Source and destination address – purpose?', back: 'Source: identifies the sender, so the receiver can reply or ask for a resend. Destination: allows the packet to be routed to the correct device.' },
    { id: 'u1t3-321-fc3', spec: '3.2.1', lesson: 2, front: 'Sequence number and checksum – purpose?', back: 'Sequence number: allows reassembly in the correct order. Checksum: allows the receiver to check for errors.' },
    { id: 'u1t3-321-fc4', spec: '3.2.1', lesson: 2, front: 'TTL, protocol, acknowledgement number – purpose?', back: 'TTL: limits hops so lost packets don’t circulate forever. Protocol: how to handle the data (TCP or UDP). Acknowledgement: confirms arrival so missing packets can be resent.' },
    /* 3.2.2 */
    { id: 'u1t3-322-fc1', spec: '3.2.2', lesson: 2, front: 'What is a network collision?', back: 'Two sets of data are detected on the network simultaneously – both signals are corrupted.' },
    { id: 'u1t3-322-fc2', spec: '3.2.2', lesson: 2, front: 'The four steps of CSMA/CD?', back: 'Listen (carrier sense), detect (monitor while sending), wait a short random time, resend.' },
    { id: 'u1t3-322-fc3', spec: '3.2.2', lesson: 2, front: 'Why is the wait random?', back: 'With a fixed wait, both devices would resend at the same moment and collide again.' },
    /* 3.2.3 */
    { id: 'u1t3-323-fc1', spec: '3.2.3', lesson: 2, front: 'The six routing steps?', back: 'Split and number; look up (routing table); forward (lowest cost / least traffic); different routes; reassemble; confirm or resend.' },
    { id: 'u1t3-323-fc2', spec: '3.2.3', lesson: 2, front: 'What happens if a router on the usual route fails?', back: 'Routing tables update and packets take another (longer) path, but still arrive.' }
  ],

  /* =============================================================== QUESTIONS */
  questions: [
    /* ---------- 3.1.1 ---------- */
    {
      id: 'u1t3-311-q1', spec: '3.1.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which describes serial transmission?',
      options: ['Data is sent one bit at a time down a single channel', 'Several bits are sent at the same time on separate wires', 'Data is sent in both directions at once', 'Several signals share one line using time slots'],
      answer: 0,
      feedback: ['', 'That is parallel transmission.', 'That is full duplex – a direction method, not serial/parallel.', 'That is time-division multiplexing.'],
      explanation: 'Serial: one bit at a time; bits arrive in the same order they were sent.'
    },
    {
      id: 'u1t3-311-q2', spec: '3.1.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'What is skew?',
      options: ['Signals on different wires travelling at slightly different speeds, drifting out of sync', 'Wires side by side interfering with each other electrically', 'Two devices transmitting at the same time', 'Bits arriving in the wrong order on a single wire'],
      answer: 0,
      feedback: ['', 'That is crosstalk.', 'That is a collision.', 'On a single wire, bits arrive in the order they were sent.'],
      explanation: 'The longer the cable, the further the bits drift out of sync.'
    },
    {
      id: 'u1t3-311-q3', spec: '3.1.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which is a <strong>disadvantage</strong> of parallel transmission compared with serial?',
      options: ['More expensive, because more wires are needed', 'Data is transmitted one bit at a time', 'It works well over short distances', 'A set of bits is transferred simultaneously'],
      answer: 0,
      feedback: ['', 'That describes serial.', 'That is an advantage of parallel.', 'That is an advantage of parallel.'],
      explanation: 'Parallel disadvantages: more wires (cost), skew and crosstalk, short distances only.'
    },
    {
      id: 'u1t3-311-q4', spec: '3.1.1', lesson: 1, type: 'mcq', skill: 'application',
      question: 'Why is almost every modern external connection (USB, SATA, PCIe) serial?',
      options: ['Skew and crosstalk stop parallel being clocked faster, but serial can be pushed to much higher clock speeds', 'Serial sends more bits per clock tick', 'Parallel cannot carry binary data', 'Serial cables need more wires'],
      answer: 0,
      feedback: ['', 'Parallel sends more bits per tick; serial wins on clock speed.', 'Parallel carries binary data – e.g. inside the computer.', 'Serial needs fewer wires.'],
      explanation: 'With one data wire, serial has neither skew nor crosstalk between data wires.'
    },
    {
      id: 'u1t3-311-q5', spec: '3.1.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Where is parallel transmission still used?',
      options: ['Buses inside the computer, e.g. CPU to RAM', 'USB cables', 'Ethernet network cables', 'Long-distance links between devices'],
      answer: 0,
      feedback: ['', 'USB is serial.', 'Ethernet is serial.', 'Long-distance links use serial; parallel suffers from skew over distance.'],
      explanation: 'Parallel only works well over very short distances, such as inside the computer.'
    },
    /* ---------- 3.1.2 ---------- */
    {
      id: 'u1t3-312-q1', spec: '3.1.2', lesson: 1, type: 'mcq', skill: 'application',
      question: 'A baby monitor sends sound from the nursery to the parents’ unit only. Which method is this?',
      options: ['Simplex', 'Half duplex', 'Full duplex', 'Parallel'],
      answer: 0,
      feedback: ['', 'Half duplex needs data in both directions (one at a time).', 'Full duplex needs data in both directions at once.', 'Parallel describes how bits are sent, not the direction.'],
      explanation: 'One way only = simplex.'
    },
    {
      id: 'u1t3-312-q2', spec: '3.1.2', lesson: 1, type: 'mcq', skill: 'application',
      question: 'Which example is half duplex?',
      options: ['Walkie-talkie', 'Video call', 'TV broadcast', 'Keyboard to PC'],
      answer: 0,
      feedback: ['', 'Both people can talk at once – full duplex.', 'One way only – simplex.', 'One way only – simplex.'],
      explanation: 'Half duplex: both ways, taking turns.'
    },
    {
      id: 'u1t3-312-q3', spec: '3.1.2', lesson: 1, type: 'mcq', skill: 'technique',
      question: 'Which description of half duplex would earn the mark?',
      options: ['Data can travel in both directions, but only one direction at a time', 'Half duplex sends data both ways', 'Half duplex is slower than full duplex', 'Half duplex is used on the internet'],
      answer: 0,
      feedback: ['', 'It doesn’t say one direction at a time.', 'This doesn’t describe the method.', 'This is an example, and not a correct one.'],
      explanation: 'The mark needs “both directions” and “only one direction at a time”.'
    },
    {
      id: 'u1t3-312-q4', spec: '3.1.2', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which describes full duplex?',
      options: ['Data travels in both directions at the same time', 'Data travels in one direction only', 'Data travels in both directions, one at a time', 'Several bits travel side by side'],
      answer: 0,
      feedback: ['', 'That is simplex.', 'That is half duplex.', 'That is parallel transmission.'],
      explanation: 'Examples: phone call, video call, broadband.'
    },
    /* ---------- 3.1.3 ---------- */
    {
      id: 'u1t3-313-q1', spec: '3.1.3', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'What is multiplexing?',
      options: ['Combining several independent data sources so they can be sent along a single route', 'Splitting data into packets', 'Sending each bit on its own wire', 'Choosing the best route through a network'],
      answer: 0,
      feedback: ['', 'That is part of packet switching.', 'That is parallel transmission.', 'That is routing.'],
      explanation: 'A demultiplexer separates the signals again at the other end.'
    },
    {
      id: 'u1t3-313-q2', spec: '3.1.3', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'In time-division multiplexing (TDM)…',
      options: ['each user gets a time slot and takes turns using the whole line', 'each user gets their own frequency band', 'each user has a separate cable', 'only one user can ever use the line'],
      answer: 0,
      feedback: ['', 'That is frequency division (FDM).', 'Multiplexing avoids a separate cable per user.', 'All users share the line, taking very quick turns.'],
      explanation: 'The turns are so quick that everyone seems to send at once. Example: digital telephone networks.'
    },
    {
      id: 'u1t3-313-q3', spec: '3.1.3', lesson: 2, type: 'mcq', skill: 'application',
      question: 'A link on the path of a circuit-switched call fails. What happens?',
      options: ['The connection breaks', 'The call automatically takes another route', 'The data is split into packets', 'Nothing – circuits cannot fail'],
      answer: 0,
      feedback: ['', 'Rerouting around a failure is an advantage of packet switching.', 'Circuit switching uses a dedicated path, not packets.', 'Any part of the path can fail.'],
      explanation: 'Circuit switching: a dedicated path for the whole communication – if any part fails, the connection breaks.'
    },
    {
      id: 'u1t3-313-q4', spec: '3.1.3', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'Which is a disadvantage of packet switching?',
      options: ['Packets can arrive out of order and must be reassembled', 'The path is reserved even when nothing is sent', 'If any part of the path fails, the connection breaks', 'Links cannot be shared'],
      answer: 0,
      feedback: ['', 'That is a disadvantage of circuit switching.', 'That is circuit switching; packets can take another route.', 'Packet switching shares links efficiently.'],
      explanation: 'Packets travel independently by different routes, so they need putting back in order.'
    },
    /* ---------- 3.2.1 ---------- */
    {
      id: 'u1t3-321-q1', spec: '3.2.1', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'Which header field allows the packets to be reassembled in the correct order?',
      options: ['Sequence number', 'Checksum', 'Time to live (TTL)', 'Source address'],
      answer: 0,
      feedback: ['', 'The checksum allows the receiver to check for errors.', 'TTL limits the number of hops.', 'The source address identifies the sender.'],
      explanation: 'Field + what it allows: the sequence number allows reassembly in the correct order.'
    },
    {
      id: 'u1t3-321-q2', spec: '3.2.1', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'What is the purpose of the time to live (TTL) field?',
      options: ['It limits the number of hops, so lost packets don’t circulate forever', 'It records how long the user has been online', 'It checks the packet for errors', 'It identifies the sender'],
      answer: 0,
      feedback: ['', 'TTL is about the packet, not the user.', 'That is the checksum.', 'That is the source address.'],
      explanation: 'Each hop reduces the TTL; when it runs out the packet is discarded.'
    },
    {
      id: 'u1t3-321-q3', spec: '3.2.1', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'What is the payload of a packet?',
      options: ['The actual data being sent, e.g. a piece of a web page, email or file', 'The control information', 'The destination address', 'The trailer with a frame check sequence'],
      answer: 0,
      feedback: ['', 'Control information is the header.', 'That is a header field.', 'A trailer belongs to an Ethernet frame, not a TCP/IP packet.'],
      explanation: 'A TCP/IP packet is a header plus a payload.'
    },
    {
      id: 'u1t3-321-q4', spec: '3.2.1', lesson: 2, type: 'mcq', skill: 'technique',
      question: 'Which answer about packet contents would earn marks?',
      options: ['“The checksum allows the receiver to check the packet for errors.”', '“Source address, destination address, sequence number, checksum.”', '“A packet contains lots of information.”', '“The header and the payload.”'],
      answer: 0,
      feedback: ['', 'A list earns no credit.', 'Too vague to earn a mark.', 'Naming the parts without purposes is still a list.'],
      explanation: 'Field + what it allows = the mark.'
    },
    /* ---------- 3.2.2 ---------- */
    {
      id: 'u1t3-322-q1', spec: '3.2.2', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'What is a network collision?',
      options: ['Two sets of data detected on the network simultaneously', 'A packet taking a longer route', 'A router failing', 'Bits drifting out of sync on a parallel cable'],
      answer: 0,
      feedback: ['', 'That is rerouting.', 'That is a router failure.', 'That is skew.'],
      explanation: 'Two devices transmit at the same time on a shared medium; both signals are corrupted.'
    },
    {
      id: 'u1t3-322-q2', spec: '3.2.2', lesson: 2, type: 'mcq', skill: 'application',
      question: 'After a collision is detected, why does each device wait a <strong>random</strong> time before resending?',
      options: ['With a fixed wait, both would resend at the same moment and collide again', 'Random waits use less bandwidth', 'So the router can update its routing table', 'Random waits make the data more secure'],
      answer: 0,
      feedback: ['', 'Bandwidth isn’t the reason.', 'Routing tables are not involved in CSMA/CD.', 'Security is not the reason.'],
      explanation: 'A random wait means one device almost always goes first.'
    },
    {
      id: 'u1t3-322-q3', spec: '3.2.2', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'Put the steps of CSMA/CD in order.',
      options: ['Listen → detect → wait (random) → resend', 'Detect → listen → resend → wait', 'Wait → listen → resend → detect', 'Resend → wait → detect → listen'],
      answer: 0,
      feedback: ['', 'A device listens before it sends.', 'Waiting happens after a collision.', 'Resending is the last step.'],
      explanation: 'Carrier Sense Multiple Access with Collision Detection.'
    },
    /* ---------- 3.2.3 ---------- */
    {
      id: 'u1t3-323-q1', spec: '3.2.3', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'What does each router use to decide where to send a packet next?',
      options: ['Its routing table, checking the packet’s destination address', 'The packet’s payload', 'The checksum', 'A dedicated circuit set up in advance'],
      answer: 0,
      feedback: ['', 'Routers don’t need to read the data being carried.', 'The checksum is for error checking.', 'Dedicated circuits belong to circuit switching.'],
      explanation: 'Packets are forwarded along the most appropriate path: lowest cost or least traffic.'
    },
    {
      id: 'u1t3-323-q2', spec: '3.2.3', lesson: 2, type: 'mcq', skill: 'application',
      question: 'One packet arrives corrupted. What happens?',
      options: ['A resend is requested for that packet', 'The whole message is deleted', 'The packet is used anyway', 'The router fails'],
      answer: 0,
      feedback: ['', 'Only the missing or corrupted packet needs resending.', 'Corrupted data is detected (checksum) and replaced.', 'A corrupted packet doesn’t break the router.'],
      explanation: 'A confirmation is sent once all arrive, or a resend is requested for a missing or corrupted packet.'
    },
    {
      id: 'u1t3-323-q3', spec: '3.2.3', lesson: 2, type: 'mcq', skill: 'technique',
      question: 'Answering “Explain how a packet is routed”, where do most students lose marks?',
      options: ['Stopping once the packets arrive, without reassembly and confirmation/resend', 'Mentioning packet numbers', 'Mentioning routing tables', 'Mentioning that packets take different routes'],
      answer: 0,
      feedback: ['', 'Packet numbers are where a good answer starts.', 'Routing tables earn credit.', 'Different routes earn credit.'],
      explanation: 'Start with packet numbers and finish with what happens at the destination.'
    }
  ],

  /* ============================================================== EXAM-STYLE */
  exam: [
    {
      id: 'u1t3-311-e1', spec: '3.1.1', lesson: 1, marks: 2,
      context: 'Exit task, Lesson 1.',
      question: 'If parallel transmission is faster, why is USB serial? Use the words skew and clock speed.',
      markPoints: [
        'Parallel suffers from skew (bits on different wires drift out of sync) and crosstalk, so it can’t be clocked faster / used over distance.',
        'Serial has one data wire, so it can be pushed to a much higher clock speed.'
      ]
    },
    {
      id: 'u1t3-311-e2', spec: '3.1.1', lesson: 1, marks: 4,
      question: 'Compare serial and parallel transmission.',
      markPoints: [
        'Serial sends one bit at a time on one channel; parallel sends several bits at the same time on separate wires.',
        'Parallel is faster per clock tick, but serial can be clocked much faster.',
        'Serial is reliable over long distances; parallel works over short distances only because of skew.',
        'Serial is cheaper (fewer wires); parallel is more expensive.',
        'Parallel suffers crosstalk between wires; serial has no crosstalk between data wires.'
      ],
      technique: 'Make every point about both methods.'
    },
    {
      id: 'u1t3-312-e1', spec: '3.1.2', lesson: 1, marks: 6,
      question: 'Describe the three data transmission methods – simplex, half duplex and full duplex – giving a different example for each.',
      markPoints: [
        'Simplex: data can only travel in one direction.',
        'Simplex example, e.g. keyboard to computer / TV broadcast.',
        'Half duplex: data can travel in both directions, but only one direction at a time.',
        'Half duplex example, e.g. walkie-talkie.',
        'Full duplex: data can travel in both directions at the same time.',
        'Full duplex example, e.g. phone call / broadband.'
      ],
      technique: 'A definition plus a separate, correct example for each.'
    },
    {
      id: 'u1t3-313-e1', spec: '3.1.3', lesson: 2, marks: 2,
      question: 'Explain why multiplexing is needed on a network.',
      markPoints: [
        'Several independent data sources are combined to be sent along a single route (and separated again by a demultiplexer).',
        'So one line replaces a cable per user – cheaper to install and maintain, and it makes full use of the line’s bandwidth.'
      ],
      technique: 'Two marks means two separate points: what is combined, and why that helps.'
    },
    {
      id: 'u1t3-313-e2', spec: '3.1.3', lesson: 2, marks: 4,
      question: 'Compare circuit switching and packet switching.',
      markPoints: [
        'Circuit switching sets up a dedicated path for the whole communication; packet switching splits data into packets sent independently by different routes.',
        'Circuit switching: once connected, data arrives fast and in order.',
        'Circuit switching: if any part of the path fails the connection breaks, and the path is reserved even when idle.',
        'Packet switching: if a link fails packets take another route, and links are shared efficiently – but packets can arrive out of order and must be reassembled.'
      ]
    },
    {
      id: 'u1t3-321-e1', spec: '3.2.1', lesson: 2, marks: 4,
      question: 'Describe four fields found in the header of a TCP/IP packet, giving the purpose of each.',
      markPoints: [
        'Source address – identifies the sender, so the receiver can reply or ask for a resend.',
        'Destination address – allows the packet to be routed to the correct device.',
        'Sequence number – allows the packets to be reassembled in the correct order.',
        'Checksum – allows the receiver to check the packet for errors.',
        'Protocol – tells the receiver how to handle the data (TCP or UDP); TTL – limits hops; acknowledgement number – confirms arrival.'
      ],
      technique: 'Field + what it allows. A list of field names earns nothing.'
    },
    {
      id: 'u1t3-322-e1', spec: '3.2.2', lesson: 2, marks: 3,
      question: 'Explain what a network collision is, how it is detected, and how it is dealt with.',
      markPoints: [
        'A collision is when two sets of data are detected on the network simultaneously.',
        'Detection: devices monitor the network while sending; a signal that doesn’t match what they sent means a collision.',
        'Each device waits a short random time, then (listens and) sends again.'
      ],
      technique: 'Three parts, three marks – answer each part.'
    },
    {
      id: 'u1t3-323-e1', spec: '3.2.3', lesson: 2, marks: 5,
      context: 'Exit task, Lesson 2.',
      question: 'Describe a packet’s journey, from leaving the sender to the message being reassembled.',
      markPoints: [
        'Data is split into packets, each with a destination address and a packet number.',
        'Each router checks the destination in its routing table and forwards the packet along the most appropriate path (lowest cost / least traffic).',
        'Packets travel independently and can take different routes (and are rerouted if a router fails).',
        'At the destination, packets are reassembled in order using their numbers.',
        'A confirmation is sent once all arrive, or a resend is requested for a missing or corrupted packet.'
      ],
      technique: 'Start with packet numbers; finish with reassembly and confirmation or resend.'
    }
  ]
});
