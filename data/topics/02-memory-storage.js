/* Topic 2: Memory, cache, virtual memory and secondary storage. */
RS.content.registerTopic({
  id: 'memory',
  order: 2,
  title: 'Memory and storage',
  icon: 'memory',
  colour: 'violet',
  summary: 'RAM and ROM, cache and locality, virtual memory and paging, buffering, secondary storage and fragmentation.',
  keywords: ['RAM', 'ROM', 'SRAM', 'DRAM', 'cache', 'hit', 'miss', 'locality', 'virtual memory', 'paging', 'page table', 'thrashing', 'buffer', 'double buffering', 'HDD', 'SSD', 'optical', 'flash', 'fragmentation', 'defragmentation'],
  specRefs: [
    'AS Unit 1, section 1 (Hardware and communication): different types of memory and caching; Secondary storage; Data storage on disc (fragmentation and defragmentation)',
    'AS Unit 1, section 8 (The operating system): managing resources, including memory protection and backing store',
    'A2 Unit 4, section 6 (The operating system): Memory management and buffering, including partitioning of main memory and double buffering',
    'Virtual memory and paging are included as background to memory management; the WJEC specification does not name them explicitly, so check whether your course requires them.'
  ],
  notes: [
    {
      heading: 'The memory hierarchy',
      points: [
        'From fastest, smallest and most expensive per byte to slowest, largest and cheapest: <strong>registers → cache → main memory (RAM) → secondary storage</strong>.',
        'The processor can only work directly on data in registers and main memory (via cache). Programs and data are loaded from secondary storage into RAM before they run.',
        'Designers combine small amounts of fast memory with large amounts of slower, cheaper storage to get good performance at a sensible cost.'
      ]
    },
    {
      heading: 'RAM and ROM',
      points: [
        '<strong>RAM</strong> (random access memory) is <strong>volatile</strong>: its contents are lost when the power is turned off. It can be read from and written to, and holds the operating system, programs and data currently in use.',
        '<strong>ROM</strong> (read-only memory) is <strong>non-volatile</strong>. It holds firmware such as the bootstrap loader (part of the BIOS or UEFI) that starts the computer and loads the operating system from secondary storage.',
        '<strong>DRAM</strong> (dynamic RAM) stores each bit as charge in a capacitor, which leaks, so it must be refreshed thousands of times a second. It is dense and cheap, so it is used for main memory.',
        '<strong>SRAM</strong> (static RAM) stores each bit in a flip-flop circuit that does not need refreshing. It is faster but larger and more expensive per bit, so it is used for cache.'
      ]
    },
    {
      heading: 'Cache memory',
      points: [
        'Cache is a small amount of very fast memory between the processor and main memory. It holds copies of recently or frequently used instructions and data.',
        'A <strong>cache hit</strong> is when the required item is found in cache; a <strong>cache miss</strong> means it must be fetched from slower main memory (and is then usually copied into cache).',
        'Cache works because of <strong>locality of reference</strong>: <em>temporal locality</em> (an item used recently is likely to be used again soon, for example instructions inside a loop) and <em>spatial locality</em> (items near a recently used item are likely to be used soon, for example the next elements of an array).',
        'Modern processors have several levels: <strong>L1</strong> is the smallest and fastest, usually one per core; <strong>L2</strong> is larger and slightly slower; <strong>L3</strong> is larger still and usually shared between cores.',
        'Hit rate = hits ÷ total memory requests. A higher hit rate means fewer slow accesses to main memory.'
      ]
    },
    {
      heading: 'Memory management',
      points: [
        'The operating system allocates memory to processes and keeps track of which parts are free.',
        '<strong>Memory protection</strong> prevents one process from reading or overwriting memory that belongs to another process or to the operating system.',
        '<strong>Partitioning</strong> divides main memory into areas for different processes. Fixed partitions waste space when a process is smaller than its partition (internal fragmentation); variable partitions can leave small unusable gaps between processes (external fragmentation).',
        '<strong>Paging</strong> splits memory into equal-sized blocks called pages (in logical memory) and frames (in physical memory). A <strong>page table</strong> maps each page of a process to the frame that holds it, so a process does not need one continuous block of memory.',
        '<strong>Segmentation</strong> splits a program into variable-sized logical units (such as a module or a data area).'
      ]
    },
    {
      heading: 'Virtual memory',
      points: [
        'When RAM is full, the operating system can use an area of secondary storage as <strong>virtual memory</strong>, an extension of RAM.',
        'Pages that are not currently needed are moved out of RAM to secondary storage, and moved back in when they are needed (<em>paging</em> or <em>swapping</em>).',
        'This lets more programs, or larger programs, run than would otherwise fit in RAM.',
        'Secondary storage is far slower than RAM, so heavy use of virtual memory reduces performance. <strong>Disk thrashing</strong> is when the computer spends more time moving pages in and out than doing useful work.',
        'Adding more RAM reduces the need for virtual memory and so reduces thrashing.'
      ]
    },
    {
      heading: 'Buffers and double buffering',
      points: [
        'A <strong>buffer</strong> is an area of memory that holds data temporarily while it is transferred between devices or processes that work at different speeds (for example from the processor to a printer, or from a network to a video player).',
        'Buffering lets the faster device carry on with other work instead of waiting for the slower one.',
        '<strong>Double buffering</strong> uses two buffers: while one buffer is being filled, the other is being emptied or processed. Then they swap roles. This keeps data flowing continuously, for example preventing flicker in graphics or pauses in audio and video.'
      ]
    },
    {
      heading: 'Secondary storage',
      html: '<table><thead><tr><th scope="col">Type</th><th scope="col">How it works</th><th scope="col">Strengths</th><th scope="col">Weaknesses</th></tr></thead><tbody>' +
        '<tr><td>Magnetic (hard disk drive)</td><td>Spinning platters with magnetised regions, read and written by moving heads. Data is arranged in tracks and sectors.</td><td>Very high capacity at low cost per gigabyte.</td><td>Moving parts can be damaged if dropped; slower access because heads must move and wait for the platter to rotate.</td></tr>' +
        '<tr><td>Optical (CD, DVD, Blu-ray)</td><td>A laser reads pits and lands on a reflective surface.</td><td>Cheap, light and portable media; good for distributing software, films or archive copies.</td><td>Low capacity; slow; easily scratched; many discs can only be written once.</td></tr>' +
        '<tr><td>Solid state (SSD, USB flash drive, memory card)</td><td>Flash memory stores charge in transistor cells; no moving parts.</td><td>Very fast access; robust and silent; low power; small and light.</td><td>Higher cost per gigabyte than magnetic; each cell supports a limited number of write cycles.</td></tr>' +
        '</tbody></table>' +
        '<p>When comparing devices, consider capacity, speed (access time and transfer rate), cost, portability, durability and reliability, and relate them to the scenario.</p>'
    },
    {
      heading: 'Fragmentation and defragmentation',
      points: [
        'As files are created, deleted and grow, the free space on a disk becomes split into small gaps. A new or growing file may then be stored in pieces (fragments) in non-contiguous blocks. This is <strong>fragmentation</strong>.',
        'On a hard disk drive, reading a fragmented file needs extra head movement and rotational delay, so access becomes slower.',
        '<strong>Defragmentation</strong> utility software rearranges the blocks so each file is stored contiguously and free space is grouped together, reducing access times.',
        'Solid-state drives have no moving heads, so fragmentation has little effect on speed. Defragmenting them is unnecessary and adds extra write cycles, which wears the flash memory.'
      ]
    }
  ],
  misconceptions: [
    { wrong: 'Virtual memory makes a computer faster.', right: 'Virtual memory lets more programs run, but it is much slower than RAM. Relying on it heavily slows the computer down.' },
    { wrong: 'The operating system is stored in ROM.', right: 'On most general-purpose computers, ROM holds the bootstrap loader. The operating system is stored on secondary storage and loaded into RAM.' },
    { wrong: 'All memory is lost when the power is switched off.', right: 'Only volatile memory (RAM, cache, registers) loses its contents. ROM and secondary storage are non-volatile.' },
    { wrong: 'You should regularly defragment a solid-state drive.', right: 'SSDs have no moving parts, so defragmentation gives little benefit and causes unnecessary wear.' }
  ],
  examTips: [
    'In “compare” questions, make points about <em>both</em> items, using comparative words such as “faster than” or “cheaper per gigabyte than”.',
    'When recommending storage for a scenario, justify each choice using the scenario’s needs (for example portability, capacity, robustness). Generic lists of features gain fewer marks.',
    'Be precise with units: in storage questions, check whether the question uses 1 GB = 1000 MB or 1 GiB = 1024 MiB.'
  ],
  flashcards: [
    { id: 'mem-fc-1', front: 'What does “volatile” mean?', back: 'The memory loses its contents when the power is switched off. RAM is volatile.' },
    { id: 'mem-fc-2', front: 'What is typically stored in ROM?', back: 'Firmware such as the bootstrap loader (BIOS/UEFI) that starts the computer and loads the operating system.' },
    { id: 'mem-fc-3', front: 'SRAM or DRAM: which is used for cache, and why?', back: 'SRAM: it is faster and needs no refreshing. It is more expensive per bit, which is acceptable for small cache sizes.' },
    { id: 'mem-fc-4', front: 'What is a cache hit?', back: 'When the data or instruction the processor needs is found in cache, so it does not have to be fetched from main memory.' },
    { id: 'mem-fc-5', front: 'Define temporal locality.', back: 'An item that has been accessed recently is likely to be accessed again soon (for example instructions in a loop).' },
    { id: 'mem-fc-6', front: 'Define spatial locality.', back: 'Items stored near a recently accessed item are likely to be accessed soon (for example the next elements of an array).' },
    { id: 'mem-fc-7', front: 'What is virtual memory?', back: 'An area of secondary storage used as an extension of RAM when RAM is full. Pages are swapped between RAM and secondary storage.' },
    { id: 'mem-fc-8', front: 'What is disk thrashing?', back: 'When so much time is spent swapping pages between RAM and secondary storage that little useful processing happens.' },
    { id: 'mem-fc-9', front: 'What does a page table do?', back: 'Maps each logical page of a process to the physical frame in memory where it is stored.' },
    { id: 'mem-fc-10', front: 'What is a buffer?', back: 'A temporary storage area that compensates for the difference in speed between devices or processes transferring data.' },
    { id: 'mem-fc-11', front: 'Why is double buffering used?', back: 'One buffer can be filled while the other is processed, so data flows continuously without waiting (for example no flicker or stutter).' },
    { id: 'mem-fc-12', front: 'Why does fragmentation slow down a hard disk drive?', back: 'The parts of a file are scattered, so the read/write heads must move more and wait for more rotations to read the whole file.' },
    { id: 'mem-fc-13', front: 'Give two advantages of SSDs over HDDs.', back: 'Any two of: faster access, no moving parts so more robust, silent, lower power use, smaller and lighter.' }
  ],
  questions: [
    {
      id: 'mem-q1', type: 'mcq', skill: 'recall',
      question: 'Which type of memory is volatile?',
      options: ['RAM', 'ROM', 'Flash memory in an SSD', 'Optical disc'],
      answer: 0,
      feedback: ['', 'ROM keeps its contents without power, so it is non-volatile.', 'Flash memory keeps its contents without power, which is why it is used for storage.', 'Optical discs store data physically as pits and lands, which remain without power.'],
      explanation: 'RAM loses its contents when the power is switched off.'
    },
    {
      id: 'mem-q2', type: 'mcq', skill: 'recall',
      question: 'Why is SRAM rather than DRAM used for cache memory?',
      options: ['It is faster and does not need refreshing', 'It is cheaper per bit', 'It can store more bits in the same space', 'It is non-volatile'],
      answer: 0,
      feedback: ['', 'SRAM is more expensive per bit than DRAM; that is why it is only used in small amounts.', 'DRAM is denser. SRAM uses several transistors per bit, so it stores fewer bits in the same area.', 'SRAM is volatile; it loses its contents without power.'],
      explanation: 'Speed matters most for cache, and cache is small, so SRAM’s higher cost is acceptable.'
    },
    {
      id: 'mem-q3', type: 'mcq', skill: 'application',
      question: 'A loop runs the same ten instructions 5,000 times. Which principle explains why these instructions are likely to stay in cache?',
      options: ['Temporal locality', 'Spatial locality', 'Virtual memory', 'Double buffering'],
      answer: 0,
      feedback: ['', 'Spatial locality is about accessing items <em>near</em> a recently used item. The key point here is reusing the <em>same</em> items repeatedly.', 'Virtual memory extends RAM onto secondary storage; it does not keep items in cache.', 'Double buffering smooths data transfer between devices; it is not about cache.'],
      explanation: 'Temporal locality: items used recently are likely to be used again soon.'
    },
    {
      id: 'mem-q4', type: 'input', skill: 'application',
      question: 'A program makes 2,000 memory requests. 1,800 of them are found in cache. What is the cache hit rate, as a percentage? (Give the number only.)',
      accept: ['90', '90%'],
      ignoreSpaces: true,
      explanation: 'Hit rate = hits ÷ requests = 1,800 ÷ 2,000 = 0.9 = 90%.'
    },
    {
      id: 'mem-q5', type: 'mcq', skill: 'application',
      question: 'A computer has become very slow and its hard disk light is almost constantly on while several large programs are open. What is the most effective hardware upgrade?',
      options: ['Install more RAM', 'Install a larger hard disk drive', 'Install a faster optical drive', 'Increase the size of the virtual memory file'],
      answer: 0,
      feedback: ['', 'Storage capacity is not the problem; the computer is short of main memory.', 'The optical drive is not involved in swapping pages.', 'This is not a hardware upgrade, and more virtual memory would not stop the slow swapping to disk.'],
      explanation: 'The symptoms suggest disk thrashing. More RAM means fewer pages need to be swapped to secondary storage.'
    },
    {
      id: 'mem-q6', type: 'mcq', skill: 'recall',
      question: 'What is the main purpose of a page table?',
      options: ['To map a process’s logical pages to physical frames in memory', 'To list the files stored on the hard disk', 'To record which pages of a website have been visited', 'To store the bootstrap program'],
      answer: 0,
      feedback: ['', 'File locations are held by the file system (for example a file allocation table), not the page table.', 'This is browser history, which is unrelated to memory management.', 'The bootstrap program is held in ROM.'],
      explanation: 'The page table lets a process’s pages be stored in any free frames, and records where each one is.'
    },
    {
      id: 'mem-q7', type: 'mcq', skill: 'application',
      question: 'Why is it not recommended to defragment a solid-state drive?',
      options: ['It gives little speed benefit and causes unnecessary write wear', 'It would erase all the data on the drive', 'Solid-state drives cannot store files in fragments', 'Defragmentation software only works on optical discs'],
      answer: 0,
      feedback: ['', 'Defragmenting does not erase data on any drive type.', 'Files on an SSD can be fragmented; it just does not slow access much, because there are no moving heads.', 'Defragmentation is designed for hard disk drives.'],
      explanation: 'SSD access time does not depend on physical position, and flash cells allow a limited number of writes.'
    },
    {
      id: 'mem-q8', type: 'mcq', skill: 'application',
      question: 'A wildlife photographer needs storage to take on long field trips. It must survive being dropped and must transfer large files quickly. Which is most suitable?',
      options: ['A portable solid-state drive', 'A portable hard disk drive', 'A set of recordable DVDs', 'Additional RAM'],
      answer: 0,
      feedback: ['', 'A hard disk drive has moving parts, so it is more easily damaged if dropped.', 'DVDs have low capacity, are slow to write and are easily scratched.', 'RAM is volatile and is not used for storing files.'],
      explanation: 'Solid-state storage has no moving parts, so it is robust, and it has fast transfer rates.'
    },
    {
      id: 'mem-q9', type: 'input', skill: 'application',
      question: 'A memory card holds 32 GB. Each photo is 4 MB. Using 1 GB = 1000 MB, how many photos can the card hold? (Give a whole number.)',
      accept: ['8000', '8,000'],
      ignoreSpaces: true,
      explanation: '32 GB = 32 × 1000 = 32,000 MB. 32,000 ÷ 4 = 8,000 photos.'
    },
    {
      id: 'mem-q10', type: 'mcq', skill: 'recall',
      question: 'What is the main purpose of double buffering?',
      options: ['One buffer is filled while the other is processed, so the flow of data is continuous', 'It stores two copies of every file as a backup', 'It doubles the size of main memory', 'It allows two users to log in at once'],
      answer: 0,
      feedback: ['', 'Backups are copies made for recovery, not buffers.', 'Buffers are small areas of memory; they do not increase RAM.', 'Multi-user access is managed by the operating system, not by buffers.'],
      explanation: 'Swapping between two buffers avoids pauses, for example screen flicker or stuttering audio.'
    },
    {
      id: 'mem-q11', type: 'mcq', skill: 'recall',
      question: 'Which statement about cache levels is correct?',
      options: ['L1 cache is smaller and faster than L3 cache', 'L3 cache is usually inside each core and is the fastest', 'L2 cache is part of secondary storage', 'All cache levels are the same size'],
      answer: 0,
      feedback: ['', 'L3 is usually shared between cores and is the slowest (but largest) cache level.', 'All cache levels are part of the processor’s memory system, not secondary storage.', 'Each level is larger and slower than the one before.'],
      explanation: 'L1 is the smallest and fastest; L2 and L3 are progressively larger and slower.'
    },
    {
      id: 'mem-q12', type: 'mcq', skill: 'recall',
      question: 'What is the purpose of memory protection?',
      options: ['To stop one process accessing memory allocated to another process or the operating system', 'To stop RAM losing its contents when the power fails', 'To encrypt the contents of RAM', 'To prevent data being written to ROM'],
      answer: 0,
      feedback: ['', 'RAM is volatile; memory protection does not change this.', 'Memory protection controls access; it does not encrypt data.', 'ROM is read-only by design; memory protection is about processes in RAM.'],
      explanation: 'Memory protection stops a faulty or malicious program corrupting other programs or the operating system.'
    },
    {
      id: 'mem-q13', type: 'mcq', skill: 'technique',
      question: 'A question asks you to “<em>Compare</em> hard disk drives and solid-state drives. [4 marks]”. Which answer style is best?',
      options: ['Make points about both, for example “SSDs have faster access times than HDDs because they have no moving parts”', 'Describe how a hard disk works in detail, then stop', 'List four facts about SSDs only', 'State which one you prefer'],
      answer: 0,
      feedback: ['', 'Describing only one device does not compare them.', 'Facts about one item only cannot show a comparison.', 'A preference without comparative points gains no marks.'],
      explanation: '“Compare” means identify similarities and differences between both items. Comparative words help: “faster than”, “cheaper per gigabyte than”.'
    }
  ],
  exam: [
    {
      id: 'mem-e1', marks: 4,
      question: 'Explain what is meant by virtual memory and why using it can reduce the performance of a computer.',
      markPoints: [
        'Virtual memory is an area of secondary storage used as if it were extra main memory (RAM).',
        'It is used when RAM is full / when there is not enough RAM for all the running programs.',
        'Pages (or sections) of programs or data not currently needed are moved from RAM to secondary storage, and moved back when needed.',
        'Secondary storage is much slower to access than RAM, so swapping pages takes time.',
        'If too much swapping happens, disk thrashing occurs and very little useful processing gets done.'
      ],
      technique: 'Split your answer into “what it is” and “why it is slower”. The second half needs a reason (“because secondary storage is slower than RAM”), not just “it is slow”.'
    },
    {
      id: 'mem-e2', marks: 4,
      question: 'Describe how files on a hard disk drive become fragmented, and how defragmentation improves performance.',
      markPoints: [
        'When files are deleted, gaps of free space are left between other files.',
        'New or growing files are split into parts and stored in whatever gaps are available, which are not next to each other (non-contiguous).',
        'Reading a fragmented file requires more movement of the read/write heads (and waiting for the disk to rotate), so it is slower.',
        'Defragmentation moves the parts of each file so they are stored contiguously.',
        'It also groups free space together, so new files are less likely to become fragmented.'
      ],
      technique: 'The question has two parts: “how they become fragmented” and “how defragmentation improves performance”. Make sure you answer both.'
    },
    {
      id: 'mem-e3', marks: 6,
      context: 'A small video production company edits large 4K video files in its studio. It needs fast storage for editing, plenty of capacity for finished projects and a weekly backup that is kept off-site.',
      question: 'Recommend suitable secondary storage for the company. Justify each of your recommendations.',
      markPoints: [
        'Solid-state drive for current editing projects…',
        '…because fast access and transfer speeds make editing large files smoother.',
        'Hard disk drives (or a network storage device using them) for finished projects…',
        '…because they provide very high capacity at a low cost per gigabyte.',
        'Portable hard disk drives (or cloud storage) for the weekly off-site backup…',
        '…because they are high capacity, can be taken off-site, and keep a copy safe if the studio is damaged.',
        'Optical discs are not suitable because their capacity is too low for many large video files.'
      ],
      technique: 'Six-mark recommendation questions usually reward a choice <em>plus</em> a justification tied to the scenario. Use the company’s needs (“fast storage for editing”) in your reasons.'
    }
  ]
});
