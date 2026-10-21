/* Topic 7: Networks, protocols, security and data transmission. */
RS.content.registerTopic({
  id: 'networks',
  order: 7,
  title: 'Networks and security',
  icon: 'network',
  colour: 'indigo',
  summary: 'Protocols and standards, TCP/IP, packets and switching, collisions, data transmission, transfer rates, cryptography and network security.',
  keywords: ['network', 'LAN', 'WAN', 'protocol', 'standard', 'HTTP', 'HTTPS', 'FTP', 'SMTP', 'IMAP', 'DHCP', 'TCP', 'IP', 'UDP', 'Wi-Fi', 'Bluetooth', 'handshaking', 'packet', 'header', 'packet switching', 'circuit switching', 'router', 'routing', 'collision', 'CSMA/CD', 'CSMA/CA', 'serial', 'parallel', 'simplex', 'duplex', 'multiplexing', 'bandwidth', 'transfer rate', 'encryption', 'cryptography', 'Caesar', 'public key', 'symmetric', 'asymmetric', 'malware', 'virus', 'worm', 'trojan', 'firewall', 'penetration testing', 'parity'],
  specRefs: [
    'AS Unit 1, section 1 (Hardware and communication): Networking (standards; HTTP, FTP, SMTP, TCP/IP, IMAP, DHCP, UDP and wireless protocols; handshaking); the internet',
    'AS Unit 1, section 3 (Data transmission): serial and parallel; simplex, half duplex and full duplex; multiplexing and switching; packet contents; collisions; routing',
    'A2 Unit 4, sections 1–2: wireless networking hardware; calculating data transfer rates and lowest cost routes; the internet',
    'AS Unit 1, section 16 and A2 Unit 4, section 8 (Data security and integrity): threats, cryptography, malicious software, black hat and white hat hacking, penetration testing'
  ],
  notes: [
    {
      heading: 'Networks and standards',
      points: [
        'A network connects devices so they can share resources (files, printers, internet access) and communicate. A <strong>LAN</strong> covers a small area such as a school; a <strong>WAN</strong> covers a large geographical area, often using third-party telecommunications links. The internet is the largest WAN.',
        'Hardware includes network interface cards (wired or wireless), switches (which forward data to the correct device on a LAN), routers (which forward packets between networks), wireless access points and cabling (copper or fibre optic).',
        'A <strong>protocol</strong> is a set of rules for communication, covering things such as data format, addressing, error checking and timing.',
        '<strong>Standards</strong> (for example the IEEE 802.11 Wi-Fi standards) mean hardware and software from different manufacturers can work together, giving buyers choice and encouraging competition.'
      ]
    },
    {
      heading: 'Common protocols',
      html: '<table><thead><tr><th scope="col">Protocol</th><th scope="col">Purpose</th></tr></thead><tbody>' +
        '<tr><td>HTTP / HTTPS</td><td>Requesting and transferring web pages between browser and web server. HTTPS encrypts the data.</td></tr>' +
        '<tr><td>FTP</td><td>Transferring files between computers, for example uploading files to a web server.</td></tr>' +
        '<tr><td>SMTP</td><td>Sending email from a client to a mail server, and between mail servers.</td></tr>' +
        '<tr><td>IMAP</td><td>Retrieving email; messages stay on the server, so they are synchronised across several devices.</td></tr>' +
        '<tr><td>DHCP</td><td>Automatically assigning an IP address (and settings such as the default gateway) to a device when it joins a network.</td></tr>' +
        '<tr><td>TCP</td><td>Reliable transport: splits data into numbered segments, checks for errors, acknowledges receipt, resends lost data and reassembles in order. Connection-oriented.</td></tr>' +
        '<tr><td>IP</td><td>Addressing and routing packets from source to destination across networks.</td></tr>' +
        '<tr><td>UDP</td><td>Fast, connectionless transport with no acknowledgements or resending. Used where speed matters more than every packet, such as live streaming, online games and voice calls.</td></tr>' +
        '<tr><td>Wireless (Wi-Fi 802.11, Bluetooth)</td><td>Rules for transmitting data by radio; Wi-Fi for wireless LANs, Bluetooth for short-range personal area networks.</td></tr>' +
        '</tbody></table>'
    },
    {
      heading: 'TCP/IP and handshaking',
      points: [
        'TCP/IP is a layered protocol stack. A common four-layer model is: <strong>application</strong> (HTTP, SMTP, FTP…), <strong>transport</strong> (TCP or UDP), <strong>internet</strong> (IP addressing and routing) and <strong>link</strong> (physical transmission on the local network).',
        'Each layer only needs to communicate with the layers directly above and below it, so a layer can be changed (for example from wired to Wi-Fi) without affecting the others.',
        '<strong>Handshaking</strong> is the exchange of signals to establish a connection and agree the rules (such as speed and protocol) before data is transferred. TCP uses a three-way handshake (SYN, SYN-ACK, ACK).'
      ]
    },
    {
      heading: 'Packets, switching and routing',
      points: [
        'Data is split into <strong>packets</strong>. A packet <strong>header</strong> typically contains the source and destination IP addresses, a sequence number, the protocol and a time to live (hop limit). The <strong>payload</strong> is the data. A checksum lets errors be detected.',
        '<strong>Packet switching</strong>: packets travel independently, possibly by different routes, and are reassembled in order at the destination. Links are shared efficiently and traffic can be routed around failures.',
        '<strong>Circuit switching</strong>: a dedicated path is set up for the whole communication (as in traditional telephone calls). Data arrives in order with consistent timing, but the link is reserved even when unused.',
        '<strong>Routers</strong> use routing tables to forward each packet towards its destination, choosing routes based on factors such as cost, number of hops and congestion. Shortest-path algorithms can be used to find the lowest-cost route.'
      ]
    },
    {
      heading: 'Collisions',
      points: [
        'A collision occurs when two devices transmit on a shared medium at the same time, corrupting both transmissions.',
        '<strong>CSMA/CD</strong> (carrier sense multiple access with collision detection), used on shared wired Ethernet: listen until the medium is free, transmit, and if a collision is detected, send a jam signal, stop, wait a random time, then try again.',
        '<strong>CSMA/CA</strong> (collision avoidance), used in Wi-Fi: devices listen and wait a random back-off time before transmitting, and may use request to send / clear to send (RTS/CTS) signals, because a wireless device cannot easily detect collisions while transmitting.',
        'Switched, full-duplex Ethernet sends each connection on its own link, so collisions are largely eliminated.'
      ]
    },
    {
      heading: 'Data transmission',
      points: [
        '<strong>Serial</strong>: bits are sent one after another along a single channel. Reliable over long distances and cheaper cabling.',
        '<strong>Parallel</strong>: several bits are sent at once along multiple channels. Fast over very short distances, but bits can arrive at slightly different times (skew) and wires can interfere (crosstalk), so it is unsuitable for long distances.',
        '<strong>Simplex</strong>: one direction only (for example a broadcast). <strong>Half duplex</strong>: both directions, but only one at a time (for example a walkie-talkie). <strong>Full duplex</strong>: both directions simultaneously (for example a telephone call).',
        '<strong>Multiplexing</strong> combines several signals so they can share one communication channel (for example time-division or frequency-division), making efficient use of expensive links.',
        '<strong>Data transfer rate</strong> (bandwidth) is measured in bits per second. Time = file size in bits ÷ rate. Example: 20 MB at 40 Mbps = (20 × 8) Mb ÷ 40 Mbps = <strong>4 s</strong>.',
        '<strong>Parity</strong>: an extra bit makes the number of 1s even (even parity) or odd (odd parity), so a single-bit error can be detected (but not located).'
      ]
    },
    {
      heading: 'The internet and wireless connections',
      points: [
        'The internet is a worldwide network of networks, linked by routers and high-capacity backbone connections (including undersea fibre-optic cables), with Internet Service Providers connecting homes and organisations.',
        'The Domain Name System (DNS) translates domain names such as <code>example.com</code> into IP addresses.',
        'To connect wirelessly, a device needs a wireless network interface card (or built-in adapter) and a wireless access point or router. Mobile devices can also use cellular networks (4G/5G) or Bluetooth.',
        'Wireless allows mobility and avoids cabling, but is usually slower and less secure than wired connections, suffers interference, and range is limited by distance and walls.'
      ]
    },
    {
      heading: 'Cryptography',
      points: [
        '<strong>Encryption</strong> turns plaintext into ciphertext using an algorithm and a key, so intercepted data cannot be understood without the key. It protects confidentiality but does not stop interception.',
        'A <strong>Caesar cipher</strong> shifts each letter a fixed number of places (shift 3: A → D, Z → C). It is very weak: there are only 25 useful keys and it can be broken by trying them all or by frequency analysis.',
        'The <strong>Vernam cipher</strong> (one-time pad) XORs each bit of the message with a truly random key of the same length, used only once. Used correctly, it is theoretically unbreakable.',
        '<strong>Symmetric</strong> encryption uses the same key to encrypt and decrypt; it is fast, but the key must be shared securely.',
        '<strong>Asymmetric</strong> (public-key) encryption uses a key pair. Data encrypted with someone’s <em>public</em> key can only be decrypted with their <em>private</em> key, so no secret needs to be shared in advance. It is slower, so it is often used to exchange a symmetric key.',
        'Strength depends on the algorithm and the key length: each extra bit doubles the number of possible keys for a brute-force attack.'
      ]
    },
    {
      heading: 'Threats and defences',
      points: [
        '<strong>Virus</strong>: attaches to a file or program and spreads when it is run or shared. <strong>Worm</strong>: self-replicates and spreads across networks without needing a host file or user action. <strong>Trojan</strong>: disguised as legitimate software. <strong>Ransomware</strong>: encrypts files and demands payment. <strong>Spyware</strong>: secretly gathers information such as keystrokes.',
        'Attack vectors include email attachments, malicious links (phishing), infected downloads and removable media, unpatched software vulnerabilities and weak passwords. Other attacks: denial of service (overwhelming a server with requests) and SQL injection.',
        'Defences: firewalls (filtering traffic by rules), anti-malware software, encryption, strong authentication (including two-factor), access levels, regular patching, backups, and user training.',
        '<strong>Black hat</strong> hackers break into systems illegally for malicious or personal gain. <strong>White hat</strong> (ethical) hackers are authorised to test systems. <strong>Penetration testing</strong> is an authorised, simulated attack to find vulnerabilities so they can be fixed.'
      ]
    }
  ],
  misconceptions: [
    { wrong: 'Encryption stops data from being intercepted.', right: 'Encrypted data can still be intercepted, but it cannot be understood without the key.' },
    { wrong: 'Parallel transmission is always faster.', right: 'Over long distances, skew and crosstalk make parallel transmission unreliable, so serial is used.' },
    { wrong: 'UDP is useless because it does not guarantee delivery.', right: 'UDP’s low delay makes it better for live audio, video and games, where a late packet is worse than a lost one.' },
    { wrong: 'A firewall removes viruses.', right: 'A firewall filters network traffic. Anti-malware software detects and removes malicious software.' }
  ],
  examTips: [
    'In data-rate calculations, convert bytes to bits (× 8) and keep units consistent. State the units of your answer.',
    'When naming a protocol, add its purpose in context (for example “SMTP is used to send the email to the mail server”).',
    'Do not confuse IMAP (retrieving email) with SMTP (sending email).'
  ],
  flashcards: [
    { id: 'net-fc-1', front: 'What is a protocol?', back: 'A set of rules that govern how data is transmitted between devices.' },
    { id: 'net-fc-2', front: 'Why are networking standards important?', back: 'They let hardware and software from different manufacturers work together.' },
    { id: 'net-fc-3', front: 'SMTP vs IMAP?', back: 'SMTP sends email; IMAP retrieves email while keeping it on the server so devices stay in sync.' },
    { id: 'net-fc-4', front: 'What does DHCP do?', back: 'Automatically assigns an IP address and network settings to a device joining a network.' },
    { id: 'net-fc-5', front: 'TCP vs UDP?', back: 'TCP is reliable and connection-oriented (acknowledgements, resending, ordering). UDP is faster and connectionless with no guarantee of delivery.' },
    { id: 'net-fc-6', front: 'What is handshaking?', back: 'An exchange of signals to set up a connection and agree the rules before data is transferred.' },
    { id: 'net-fc-7', front: 'What does a packet header contain?', back: 'Typically source and destination addresses, sequence number, protocol and time to live (hop limit).' },
    { id: 'net-fc-8', front: 'Packet switching vs circuit switching?', back: 'Packet: packets take independent routes and are reassembled. Circuit: a dedicated path is reserved for the whole communication.' },
    { id: 'net-fc-9', front: 'Describe CSMA/CD in brief.', back: 'Listen until the line is free, transmit, and if a collision is detected, stop, wait a random time and retransmit.' },
    { id: 'net-fc-10', front: 'Simplex, half duplex, full duplex?', back: 'One direction only; both directions but one at a time; both directions at the same time.' },
    { id: 'net-fc-11', front: 'What is multiplexing?', back: 'Combining several signals to share a single communication channel.' },
    { id: 'net-fc-12', front: 'Symmetric vs asymmetric encryption?', back: 'Symmetric uses one shared key. Asymmetric uses a public key to encrypt and a matching private key to decrypt.' },
    { id: 'net-fc-13', front: 'Worm vs virus?', back: 'A virus needs a host file and is spread by users; a worm self-replicates across networks on its own.' },
    { id: 'net-fc-14', front: 'What is penetration testing?', back: 'An authorised, simulated attack on a system to find vulnerabilities before criminals do.' }
  ],
  questions: [
    {
      id: 'net-q1', type: 'mcq', skill: 'recall',
      question: 'Which protocol is used to send an email from a mail client to a mail server?',
      options: ['SMTP', 'IMAP', 'FTP', 'DHCP'],
      answer: 0,
      feedback: ['', 'IMAP is used to retrieve email from a server, not to send it.', 'FTP transfers files, not email.', 'DHCP assigns IP addresses.'],
      explanation: 'SMTP (Simple Mail Transfer Protocol) sends email.'
    },
    {
      id: 'net-q2', type: 'mcq', skill: 'application',
      question: 'A user reads email on a phone, a laptop and a tablet and wants each device to show the same folders and read messages. Which protocol should be used to retrieve email?',
      options: ['IMAP', 'SMTP', 'HTTP', 'UDP'],
      answer: 0,
      feedback: ['', 'SMTP is for sending, not retrieving.', 'HTTP transfers web pages (webmail uses it, but the protocol for synchronised mailbox retrieval is IMAP).', 'UDP is a transport protocol, not an email protocol.'],
      explanation: 'IMAP keeps messages on the server, so every device sees the same mailbox.'
    },
    {
      id: 'net-q3', type: 'mcq', skill: 'recall',
      question: 'What is the purpose of DHCP?',
      options: ['To assign IP addresses to devices automatically', 'To translate domain names into IP addresses', 'To encrypt web traffic', 'To transfer files to a web server'],
      answer: 0,
      feedback: ['', 'This is the role of DNS.', 'This is the role of HTTPS (using TLS).', 'This is the role of FTP.'],
      explanation: 'DHCP gives a joining device an IP address and settings such as the default gateway.'
    },
    {
      id: 'net-q4', type: 'mcq', skill: 'application',
      question: 'Which transport protocol is most suitable for a live video call?',
      options: ['UDP, because low delay matters more than resending occasional lost packets', 'TCP, because every packet must arrive even if it is late', 'FTP, because video is a file', 'SMTP, because it is a message'],
      answer: 0,
      feedback: ['', 'Resending late packets would cause delays and stuttering in a live call.', 'FTP transfers whole files; it is not used for live streams.', 'SMTP is for email.'],
      explanation: 'In live communication a late packet is useless, so UDP’s speed is preferred.'
    },
    {
      id: 'net-q5', type: 'mcq', skill: 'recall',
      question: 'Which item is normally found in a packet header?',
      options: ['The destination IP address', 'The full contents of the file being sent', 'The user’s password', 'The router’s routing table'],
      answer: 0,
      feedback: ['', 'The file’s data is split across the payloads of many packets.', 'Passwords are not part of the header.', 'Routing tables are held by routers, not carried in packets.'],
      explanation: 'Headers contain addressing and control information: source and destination addresses, sequence number, protocol and time to live.'
    },
    {
      id: 'net-q6', type: 'mcq', skill: 'application',
      question: 'Which is an example of full-duplex communication?',
      options: ['A telephone call where both people can speak at the same time', 'A walkie-talkie where users take turns', 'A television broadcast', 'A keyboard sending key presses to a computer'],
      answer: 0,
      feedback: ['', 'Taking turns is half duplex.', 'A broadcast is one direction only: simplex.', 'Key presses travel one way, which is simplex.'],
      explanation: 'Full duplex: both directions at the same time.'
    },
    {
      id: 'net-q7', type: 'mcq', skill: 'recall',
      question: 'Why is serial transmission used for long-distance communication rather than parallel?',
      options: ['Parallel bits can arrive at different times (skew) and wires interfere with each other (crosstalk)', 'Serial transmission sends more bits at once', 'Parallel cables cannot carry binary data', 'Serial transmission does not need any protocol'],
      answer: 0,
      feedback: ['', 'Serial sends one bit at a time along one channel.', 'Parallel cables carry binary data over short distances, such as inside a computer.', 'All transmission needs protocols.'],
      explanation: 'Skew and crosstalk get worse with distance, so serial is more reliable and needs cheaper cabling.'
    },
    {
      id: 'net-q8', type: 'input', skill: 'application',
      question: 'How many seconds does it take to transfer a 20 MB file over a 40 Mbps connection? Assume 1 MB = 1,000,000 bytes, 1 Mbps = 1,000,000 bits per second and ignore overheads.',
      accept: ['4', '4s', '4 seconds'],
      ignoreSpaces: true,
      explanation: '20 MB × 8 = 160 megabits. 160 ÷ 40 = 4 seconds.'
    },
    {
      id: 'net-q9', type: 'mcq', skill: 'recall',
      question: 'In CSMA/CD, what does a device do after detecting a collision?',
      options: ['Stops transmitting, waits a random time, then tries again', 'Keeps transmitting until the other device stops', 'Waits a fixed time agreed with the other device', 'Switches to a different protocol'],
      answer: 0,
      feedback: ['', 'Continuing would keep corrupting both transmissions.', 'If both waited the same fixed time, they would collide again.', 'The protocol does not change; it retries.'],
      explanation: 'A random back-off makes it unlikely that both devices retransmit at the same moment again.'
    },
    {
      id: 'net-q10', type: 'input', skill: 'application',
      question: 'Encrypt <code>CAT</code> using a Caesar cipher with a shift of 3.',
      accept: ['FDW'],
      explanation: 'C → F, A → D, T → W.'
    },
    {
      id: 'net-q11', type: 'mcq', skill: 'application',
      question: 'Ali wants to send Bethan a confidential message using asymmetric encryption. Which key should Ali use to encrypt it?',
      options: ['Bethan’s public key', 'Bethan’s private key', 'Ali’s private key', 'Ali’s public key'],
      answer: 0,
      feedback: ['', 'Only Bethan has her private key; it is never shared.', 'Encrypting with Ali’s private key proves the message came from Ali (a digital signature) but anyone with Ali’s public key could read it.', 'Only Ali could decrypt this, using his private key, so Bethan could not read it.'],
      explanation: 'Anything encrypted with Bethan’s public key can only be decrypted with Bethan’s private key.'
    },
    {
      id: 'net-q12', type: 'mcq', skill: 'recall',
      question: 'Which type of malware spreads across a network by itself, without needing to attach to a file?',
      options: ['Worm', 'Virus', 'Trojan', 'Spyware'],
      answer: 0,
      feedback: ['', 'A virus attaches to a host file and spreads when that file is run or shared.', 'A trojan is disguised as useful software; it does not self-replicate.', 'Spyware gathers information; self-replication is not its defining feature.'],
      explanation: 'Worms exploit network vulnerabilities to copy themselves from computer to computer.'
    },
    {
      id: 'net-q13', type: 'mcq', skill: 'recall',
      question: 'What is the main function of a firewall?',
      options: ['To monitor and filter network traffic according to a set of rules', 'To remove viruses from infected files', 'To back up data to another site', 'To speed up the internet connection'],
      answer: 0,
      feedback: ['', 'Removing viruses is the job of anti-malware software.', 'Backups are made by backup software or procedures.', 'Firewalls do not increase speed.'],
      explanation: 'A firewall blocks or allows traffic based on rules such as port, address and protocol.'
    },
    {
      id: 'net-q14', type: 'input', skill: 'application',
      question: 'Even parity is used. What parity bit should be added to the 7-bit data <code>1101011</code>?',
      accept: ['1'],
      explanation: 'The data contains five 1s. Adding a parity bit of 1 makes six, an even number.'
    },
    {
      id: 'net-q15', type: 'mcq', skill: 'recall',
      question: 'Which is an advantage of packet switching over circuit switching?',
      options: ['Network links are shared efficiently and packets can be routed around faulty links', 'Packets always arrive in the order they were sent', 'A dedicated path is reserved for the whole communication', 'No addressing information is needed'],
      answer: 0,
      feedback: ['', 'Packets can take different routes and arrive out of order; they are reassembled using sequence numbers.', 'This describes circuit switching.', 'Each packet needs a destination address to be routed.'],
      explanation: 'No link is reserved for one conversation, and routers can choose alternative routes.'
    },
    {
      id: 'net-q16', type: 'mcq', skill: 'recall',
      question: 'A company pays a security consultant to try to break into its network so weaknesses can be fixed. What is this called?',
      options: ['Penetration testing', 'Black hat hacking', 'Phishing', 'Denial of service'],
      answer: 0,
      feedback: ['', 'Black hat hacking is unauthorised and malicious.', 'Phishing tricks users into revealing information.', 'Denial of service tries to make a service unavailable.'],
      explanation: 'Penetration testing is authorised, white hat activity.'
    },
    {
      id: 'net-q17', type: 'mcq', skill: 'technique',
      question: 'A question says “State the purpose of FTP. [1 mark]”. Which answer is most appropriate?',
      options: ['To transfer files between computers over a network', 'A long paragraph describing the history of FTP, its port numbers and security problems', 'File Transfer Protocol', 'It is a protocol'],
      answer: 0,
      feedback: ['', 'Extra detail takes time and gains no more than 1 mark.', 'Expanding the acronym does not state its purpose.', 'This is too vague to show its purpose.'],
      explanation: '“State” needs a short, precise answer. Match the length of your answer to the marks.'
    }
  ],
  exam: [
    {
      id: 'net-e1', marks: 5,
      question: 'Describe how a large file is sent from one computer to another across the internet using packet switching.',
      markPoints: [
        'The file is split into packets.',
        'Each packet is given a header containing the source and destination addresses and a sequence number.',
        'Packets are sent independently and may take different routes.',
        'Routers read the destination address and forward each packet towards its destination using routing tables.',
        'At the destination, packets are reassembled in order using the sequence numbers.',
        'Missing or corrupted packets are detected (for example by checksum or missing acknowledgement) and resent (by TCP).'
      ],
      technique: 'A sequence of clear steps from “split” to “reassembled” is the clearest structure.'
    },
    {
      id: 'net-e2', marks: 4,
      question: 'Compare symmetric and asymmetric encryption.',
      markPoints: [
        'Symmetric encryption uses the same key to encrypt and decrypt; asymmetric uses a pair of keys (public and private).',
        'In asymmetric encryption, data encrypted with the recipient’s public key can only be decrypted with their private key.',
        'Symmetric encryption needs the key to be shared securely in advance, which is a risk; with asymmetric encryption the public key can be shared openly.',
        'Symmetric encryption is faster, so it is better for large amounts of data; asymmetric is slower.',
        'Asymmetric encryption is often used to exchange a symmetric key securely, then symmetric encryption is used for the data.'
      ],
      technique: 'Make each point comparative, covering both methods.'
    },
    {
      id: 'net-e3', marks: 4,
      question: 'Explain how CSMA/CD reduces the effect of collisions on a shared network.',
      markPoints: [
        'A device listens to check whether the medium is in use (carrier sense) before transmitting.',
        'It only transmits when the medium is free.',
        'While transmitting it checks for collisions; if one is detected it stops and sends a jam signal.',
        'Each device waits a random amount of time before retransmitting…',
        '…which makes another collision between the same devices unlikely.'
      ],
      technique: 'Explain why the random wait matters – this is the step most often left out.'
    }
  ],
  traces: [
    {
      id: 'net-t1',
      title: 'A Caesar cipher algorithm',
      intro: '<p><code>ASC</code> returns a character’s ASCII code (“A” = 65) and <code>CHR</code> does the reverse. The plaintext is <code>ZOO</code>. Complete one row for each pass of the loop, showing values at the end of the pass. Write strings without quotation marks.</p>',
      code: 'plain ← "ZOO"\ncipher ← ""\nFOR i ← 0 TO LEN(plain) - 1\n    code ← ASC(plain[i]) - 65\n    code ← (code + 3) MOD 26\n    cipher ← cipher + CHR(code + 65)\nENDFOR\nOUTPUT cipher',
      columns: ['i', 'code', 'cipher'],
      rows: [
        ['0', '2', 'C'],
        ['1', '17', 'CR'],
        ['2', '17', 'CRR']
      ],
      explanation: 'Z is 90 − 65 = 25; (25 + 3) MOD 26 = 2, which is C. MOD makes the shift wrap round from Z to the start of the alphabet. O is 14; (14 + 3) MOD 26 = 17, which is R.'
    }
  ]
});
