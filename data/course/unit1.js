/* Unit 1: Fundamentals of Computer Science (AS). Lesson files are in resources/unit1/. */
RS.course.registerUnit({
  number: 1,
  level: 'AS',
  title: 'Fundamentals of Computer Science',
  assessment: 'Written examination: 2 hours · 25% of A level (62.5% of AS)',
  summary: 'Computer architecture, communication, data representation, data structures, software applications, programs, algorithms, logic, programming methodologies and the impact of computer science on society.',
  topics: [
    {
      number: 1,
      title: 'Hardware and communication',
      summary: 'Computer architecture and Von Neumann, memory and caching, parallel processing, the fetch-execute cycle, input and output, secondary storage, fragmentation, networking, protocols, handshaking and the internet.',
      spec: [
        { code: '1.1.1', lessons: [1], text: 'Identify and describe the hardware and communication elements of contemporary computer systems and how they are connected.' },
        { code: '1.2.1', lessons: [1], text: 'Identify and describe the main components of contemporary computer architecture, including Von Neumann architectures.' },
        { code: '1.2.2', lessons: [1], text: 'Describe different types of memory and caching.' },
        { code: '1.2.3', lessons: [2], text: 'Describe and explain parallel processing.' },
        { code: '1.3.1', lessons: [2], text: 'Describe the fetch-execute cycle, showing how data can be read from RAM into registers.' },
        { code: '1.4.1', lessons: [2], text: 'Describe the use of contemporary methods and their associated devices for input and output.' },
        { code: '1.4.2', lessons: [2], text: 'Explain the use of these methods and devices in contemporary computer systems and their suitability in different situations.' },
        { code: '1.5.1', lessons: [3], text: 'Compare the functional characteristics of contemporary secondary storage devices.' },
        { code: '1.6.1', lessons: [3], text: 'Explain fragmentation and its consequences, and describe the need for defragmentation.' },
        { code: '1.7.1', lessons: [3, 4], text: 'Describe networks and how they communicate.' },
        { code: '1.7.2', lessons: [4], text: 'Explain the importance of networking standards.' },
        { code: '1.7.3', lessons: [4], text: 'Describe the importance and the use of a range of contemporary protocols, including HTTP, FTP, SMTP, TCP/IP, IMAP, DHCP, UDP and wireless communication protocols.' },
        { code: '1.7.4', lessons: [4], text: 'Explain the role of handshaking.' },
        { code: '1.8.1', lessons: [4], text: 'Describe the internet in terms of a world-wide communications infrastructure.' }
      ],
      lessons: [
        {
          number: 1,
          title: 'Inside the box',
          subtitle: 'Hardware and communication elements · Computer architecture and Von Neumann · Memory and caching',
          spec: '1.1.1 · 1.2.1 · 1.2.2',
          resources: [
            { file: 'Lesson 01 - Inside the Box.pptx', title: 'Inside the box', type: 'slides' }
          ]
        },
        {
          number: 2,
          title: 'Many hands, one cycle',
          subtitle: 'Parallel processing · The fetch-execute cycle · Input and output devices',
          spec: '1.2.3 · 1.3.1 · 1.4.1 · 1.4.2',
          resources: [
            { file: 'Lesson 02 - Many Hands, One Cycle.pptx', title: 'Many hands, one cycle', type: 'slides' }
          ]
        },
        {
          number: 3,
          title: 'Storage, fragmentation and networks',
          subtitle: 'Secondary storage devices · Fragmentation and defragmentation · How networks communicate',
          spec: '1.5.1 · 1.6.1 · 1.7.1',
          resources: [
            { file: 'lesson-03-starter.html', title: 'Starter: quick retrieval of last lesson', type: 'starter' },
            { file: 'pick-the-right-storage.html', title: 'Pick the right storage', type: 'interactive' },
            { file: 'disk-fragmentation-visualiser.html', title: 'Disk fragmentation visualiser', type: 'interactive' },
            { file: 'Lesson 03 - Storage, Fragmentation and Networks.pptx', title: 'Storage, fragmentation and networks', type: 'slides' }
          ]
        },
        {
          number: 4,
          title: 'Standards, protocols, handshaking and the internet',
          subtitle: 'Network devices · Why networks need agreed rules · The protocols that run the internet · Establishing a connection · The internet as world-wide infrastructure',
          spec: '1.7.1 · 1.7.2 · 1.7.3 · 1.7.4 · 1.8.1',
          resources: [
            { file: 'lesson-04-starterT1U1.html', title: 'Starter: quick retrieval of last lesson', type: 'starter' },
            { file: 'pick-the-right-device.html', title: 'Pick the right network device', type: 'interactive' },
            { file: 'handshake-sequence-builder.html', title: 'Handshake sequence builder', type: 'interactive' },
            { file: 'Lesson 04 - Standards.pptx', title: 'Standards, protocols, handshaking and the internet', type: 'slides' }
          ]
        }
      ]
    },
    {
      number: 2,
      title: 'Logical operations',
      summary: 'Truth tables for AND, OR, NOT and XOR; logical operations in programming, including clearing registers and masking; simplifying Boolean expressions using identities and rules.',
      resources: [
        { file: 'Topic2_Logical_Operations_Cheat_Sheet.docx', title: 'Logical operations cheat sheet', type: 'cheat-sheet' }
      ],
      lessons: [
        {
          number: 1,
          title: 'Truth tables and notation',
          subtitle: 'From AND, OR, NOT and XOR to building your own truth tables from scratch',
          resources: [
            { file: 'Topic2_Lesson1_Starter_Switches.html', title: 'Starter: two switches, one bulb', type: 'starter' },
            { file: 'Topic2_Lesson1_Truth_Table_Practice.html', title: 'Truth table practice', type: 'interactive' },
            { file: 'Topic2_Lesson1_Truth_Tables.pptx', title: 'Truth tables and notation', type: 'slides' },
            { file: 'Topic2_Lesson1_Quiz.docx', title: 'Lesson 1 quiz', type: 'quiz' }
          ]
        },
        {
          number: 2,
          title: 'Masking, registers and Boolean laws',
          subtitle: 'From masking a single bit to proving the Boolean identity laws',
          resources: [
            { file: 'Topic2_Lesson2_Starter_Unit1.html', title: 'Starter: Lesson 1 recap', type: 'starter' },
            { file: 'Topic2_Lesson2_Practice.html', title: 'Lesson 2 practice', type: 'interactive' },
            { file: 'Topic2_Lesson2_Masking_Laws.pptx', title: 'Masking, registers and Boolean laws', type: 'slides' },
            { file: 'Topic2_Lesson2_Forms_Quiz.docx', title: 'Lesson 2 Forms quiz', type: 'forms-quiz' },
            { file: 'Topic2_Lesson2_Gimkit.csv', title: 'Lesson 2 Gimkit', type: 'gimkit' }
          ]
        },
        {
          number: 3,
          title: 'Distribution, factoring and absorption',
          subtitle: 'From expanding brackets to proving absorption step by step',
          resources: [
            { file: 'Topic2_Lesson3_Starter_Unit 1.html', title: 'Starter: Lesson 2 recap', type: 'starter' },
            { file: 'Topic2_Lesson3_Practice_Unit 1.html', title: 'Lesson 3 practice', type: 'interactive' },
            { file: 'Topic2_Lesson3_Distribution_Absorption.pptx', title: 'Distribution, factoring and absorption', type: 'slides' },
            { file: 'Topic2_Lesson3_Forms_Quiz.docx', title: 'Lesson 3 Forms quiz', type: 'forms-quiz' },
            { file: 'Topic2_Lesson3_Gimkit.csv', title: 'Lesson 3 Gimkit', type: 'gimkit' }
          ]
        },
        {
          number: 4,
          title: 'Bringing it all together',
          subtitle: 'The full toolkit, modelled past-paper questions, and getting exam-ready',
          resources: [
            { file: 'Topic2_Lesson4_Starter.html', title: 'Starter: Lesson 3 recap', type: 'starter' },
            { file: 'Topic2_Lesson4_Practice_Unit1.html', title: 'Lesson 4 practice', type: 'interactive' },
            { file: 'Topic2_Lesson4_Consolidation.pptx', title: 'Bringing it all together', type: 'slides' },
            { file: 'Topic2_Lesson4_Assessment_Student.docx', title: 'Topic 2 assessment', type: 'assessment' },
            { file: 'Topic2_Lesson4_Assessment_MarkScheme.docx', title: 'Topic 2 assessment mark scheme', type: 'mark-scheme' }
          ]
        }
      ]
    },
    {
      number: 3,
      title: 'Data transmission',
      summary: 'Serial and parallel transmission; simplex, half duplex and full duplex; multiplexing and switching; packet contents; network collisions; routing.',
      plannedLessons: 3,
      lessons: [
        {
          number: 1,
          title: 'How data travels',
          subtitle: 'Serial and parallel · Simplex, half duplex and full duplex',
          spec: '3.1.1 · 3.1.2',
          resources: [
            { file: 'starter-which-way.html', title: 'Starter: which way does it travel?', type: 'starter' },
            { file: 'bit-race-serial-vs-parallel.html', title: 'Bit race: serial vs parallel', type: 'interactive' },
            { file: 'duplex-detective.html', title: 'Duplex detective', type: 'interactive' },
            { file: 'Topic3_L1_How_data_travels.pptx', title: 'How data travels', type: 'slides' },
            { file: 'Topic3_L1_Exam_Practice.docx', title: 'Exam practice', type: 'worksheet' },
            { file: 'Topic3_L1_Exam_Practice_Mark_Scheme.docx', title: 'Exam practice mark scheme', type: 'mark-scheme' },
            { file: 'Topic3_L1_Lesson_Plan.docx', title: 'Lesson plan', type: 'lesson-plan' }
          ]
        },
        {
          number: 2,
          title: 'The journey of a packet',
          subtitle: 'Multiplexing and switching · Packets · Routing · Collisions',
          spec: '3.1.3 · 3.2.1 · 3.2.2 · 3.2.3',
          resources: [
            { file: 'starter-lesson1-recall_unit1_t3.html', title: 'Starter: Lesson 1 recall', type: 'starter' },
            { file: 'journey-of-a-packetunit1_t3.html', title: 'The journey of a packet', type: 'interactive' },
            { file: 'Topic3_L2_Journey_of_a_packet.pptx', title: 'The journey of a packet', type: 'slides' },
            { file: 'Quiz_Topic3_Lesson2_Journey_of_a_packet.docx', title: 'Journey of a packet quiz', type: 'quiz' },
            { file: 'Topic3_L2_Exam_Practice.docx', title: 'Exam practice', type: 'worksheet' },
            { file: 'Topic3_L2_Exam_Practice_Mark_Scheme.docx', title: 'Exam practice mark scheme', type: 'mark-scheme' }
          ]
        }
      ]
    },
    {
      number: 4,
      title: 'Data representation and data types',
      summary: 'Bits, bytes and words; binary and hexadecimal; character sets; primitive data types; binary arithmetic; two’s complement and sign and magnitude; floating point; truncation and rounding.',
      plannedLessons: 4,
      lessons: [
        {
          number: 1,
          title: 'Bits, bases and negative numbers',
          subtitle: 'Bit, byte and word · Binary, denary and hexadecimal · Two’s complement and sign and magnitude',
          spec: '4.1.1 · 4.1.2 · 4.4.2',
          resources: [
            { file: 'T4L1_Starter_Topic3_Recall_U1.html', title: 'Starter: Topic 3 recall', type: 'starter' },
            { file: 'T4L1_Bits_and_Bases_Interactive.html', title: 'Bits, bases and negative numbers', type: 'interactive' },
            { file: 'T4L1_Bits_Bases_Negative_Numbers.pptx', title: 'Bits, bases and negative numbers', type: 'slides' },
            { file: 'T4L1_Exam_Practice_Sheet.docx', title: 'Exam practice sheet', type: 'worksheet' },
            { file: 'T4L1_Exam_Practice_Mark_Scheme.docx', title: 'Exam practice mark scheme', type: 'mark-scheme' },
            { file: 'T4L1_Forms_Quiz.docx', title: 'Lesson 1 Forms quiz', type: 'forms-quiz' }
          ]
        },
        {
          number: 2,
          title: 'Binary arithmetic, overflow, truncation and rounding',
          subtitle: 'Adding in binary · Overflow · Subtracting with two’s complement · Truncation and rounding',
          spec: '4.4.1 · 4.4.5',
          resources: [
            { file: 'T4L2_Starter_Lesson1_Recall_unit1.html', title: 'Starter: Lesson 1 recall', type: 'starter' },
            { file: 'T4L2_Binary_Arithmetic_Interactive_uni1.html', title: 'Binary arithmetic, truncation and rounding', type: 'interactive' },
            { file: 'T4L2_Binary_Arithmetic_Truncation_Rounding.pptx', title: 'Binary arithmetic, overflow, truncation and rounding', type: 'slides' },
            { file: 'T4L2_Exam_Practice_Sheet.docx', title: 'Exam practice sheet', type: 'worksheet' },
            { file: 'T4L2_Exam_Practice_Mark_Scheme.docx', title: 'Exam practice mark scheme', type: 'mark-scheme' },
            { file: 'T4L2_Forms_Quiz.docx', title: 'Lesson 2 Forms quiz', type: 'forms-quiz' }
          ]
        },
        {
          number: 3,
          title: 'Floating point',
          subtitle: 'What floating point is and why it is used · Converting to and from normalised floating point',
          spec: '4.4.3 · 4.4.4',
          resources: [
            { file: 'T4L3_Starter_Lesson2_Recall_uni1_topic4_lesson3.html', title: 'Starter: Lesson 2 recall', type: 'starter' },
            { file: 'T4L3_Floating_Point_Interactive_u1_topic4_lesson3.html', title: 'Floating point', type: 'interactive' },
            { file: 'T4L3_Floating_Point.pptx', title: 'Floating point', type: 'slides' },
            { file: 'T4L3_Exam_Practice_Sheet.docx', title: 'Exam practice sheet', type: 'worksheet' },
            { file: 'T4L3_Exam_Practice_Mark_Scheme.docx', title: 'Exam practice mark scheme', type: 'mark-scheme' },
            { file: 'T4L3_Forms_Quiz.docx', title: 'Lesson 3 Forms quiz', type: 'forms-quiz' }
          ]
        }
      ]
    },
    { number: 5, title: 'Data structures', summary: 'Arrays (up to two dimensions) and records; selecting and justifying data structures.' },
    { number: 6, title: 'Organisation of data', summary: 'Files, records and fields; master and transaction files; serial, sequential, indexed sequential and direct access; file security and archiving; validation and verification.' },
    { number: 7, title: 'Database systems', summary: 'Relational databases; primary and foreign keys, indexes and links; entity relationship modelling; different users’ views of data.' },
    { number: 8, title: 'The operating system', summary: 'Managing resources; providing an interface; managing backing store; utility software; modes of operation; human–computer interaction.' },
    { number: 9, title: 'Algorithms and programs', summary: 'Defining algorithms; variables, constants and identifiers; scope; parameters; DIV and MOD; bubble and insertion sort; linear and binary search; programming constructs; modular programming; compression; testing.' },
    { number: 10, title: 'Principles of programming', summary: 'Programming paradigms; the object-oriented approach; high-level and low-level languages.' },
    { number: 11, title: 'Systems analysis', summary: 'Feasibility; investigation and analysis; design; changeover; alpha, beta and acceptance testing; maintenance; backup and recovery; documentation.' },
    { number: 12, title: 'Software engineering', summary: 'The role of integrated development environment (IDE) tools in developing and debugging programs.' },
    { number: 13, title: 'Program construction', summary: 'The stages of compilation: lexical analysis, symbol table construction, syntax analysis, semantic analysis, code generation and optimisation.' },
    { number: 14, title: 'The need for different types of software systems and their attributes', summary: 'Open source, bespoke and off-the-shelf software; computers in weather forecasting, CAD, robotics and graphics; expert systems.' },
    { number: 15, title: 'Practical programming', summary: 'Designing data structures and routines, developing programs from a design and evaluating them. Assessed in Unit 2.' },
    { number: 16, title: 'Data security and integrity processes', summary: 'Dangers of managing personal data; security and integrity processes; disaster and contingency planning; malicious and accidental damage.' },
    { number: 17, title: 'Economic, moral, legal, ethical and cultural issues relating to computer science', summary: 'Social and economic change; effects on employment; legislation on security, privacy, data protection and freedom of information.' }
  ]
});
