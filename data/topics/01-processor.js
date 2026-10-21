/* Topic 1: Processor architecture. See README.md for the content format. */
RS.content.registerTopic({
  id: 'processor',
  order: 1,
  title: 'Processor architecture',
  icon: 'cpu',
  colour: 'blue',
  summary: 'Von Neumann architecture, the fetch–decode–execute cycle, registers, buses, interrupts and parallel processing.',
  keywords: ['CPU', 'ALU', 'control unit', 'program counter', 'MAR', 'MDR', 'CIR', 'accumulator', 'FDE', 'fetch-execute', 'bus', 'interrupt', 'multi-core', 'pipelining', 'assembly'],
  specRefs: [
    'AS Unit 1, section 1 (Hardware and communication): Architecture; Fetch-execute cycle; parallel processing',
    'A2 Unit 4, section 1 (Hardware and communication): Architecture; limiting factors to parallelisation and runtime calculations; Assembly language programming',
    'A2 Unit 4, section 6 (The operating system): Interrupts'
  ],
  notes: [
    {
      heading: 'Von Neumann architecture',
      points: [
        'The <strong>stored program concept</strong>: program instructions and the data they use are held together in the same main memory, in the same binary form.',
        'Instructions are fetched from memory and executed one at a time, in sequence, unless an instruction changes the order (for example a branch).',
        'A single set of buses is shared for instructions and data, so the processor cannot fetch an instruction and transfer data at the same moment. This limit is called the <strong>Von Neumann bottleneck</strong>.',
        'Harvard architecture uses separate memories and buses for instructions and data, so both can be accessed at once. It is common in embedded systems and digital signal processors.'
      ]
    },
    {
      heading: 'Components of the processor',
      points: [
        '<strong>Arithmetic logic unit (ALU)</strong>: performs arithmetic (such as addition and subtraction) and logical operations (such as AND, OR, comparisons and shifts).',
        '<strong>Control unit (CU)</strong>: decodes instructions and sends control signals to coordinate the other components and the movement of data.',
        '<strong>Registers</strong>: very small, very fast storage locations inside the processor.',
        '<strong>Clock</strong>: generates regular pulses that synchronise the processor’s operations. Clock speed is measured in hertz (for example 3.2 GHz).',
        '<strong>Cache</strong>: small, fast memory close to the processor that holds recently or frequently used instructions and data.'
      ]
    },
    {
      heading: 'Key registers',
      html: '<table><thead><tr><th scope="col">Register</th><th scope="col">Purpose</th></tr></thead><tbody>' +
        '<tr><td>Program counter (PC)</td><td>Holds the <em>address</em> of the next instruction to be fetched.</td></tr>' +
        '<tr><td>Memory address register (MAR)</td><td>Holds the address of the memory location about to be read from or written to.</td></tr>' +
        '<tr><td>Memory data register (MDR)</td><td>Holds the data or instruction just read from memory, or about to be written to memory. Also called the memory buffer register (MBR).</td></tr>' +
        '<tr><td>Current instruction register (CIR)</td><td>Holds the instruction currently being decoded and executed.</td></tr>' +
        '<tr><td>Accumulator (ACC)</td><td>Holds the results of calculations carried out by the ALU.</td></tr>' +
        '<tr><td>Status register</td><td>Holds flags that record conditions such as carry, overflow, zero or negative results, and whether interrupts are enabled.</td></tr>' +
        '</tbody></table>'
    },
    {
      heading: 'Buses',
      points: [
        '<strong>Address bus</strong>: carries memory addresses from the processor to memory. It is <em>one-directional</em>. With an <var>n</var>-bit address bus, 2<sup><var>n</var></sup> different locations can be addressed.',
        '<strong>Data bus</strong>: carries data and instructions between the processor, memory and input/output controllers. It is <em>two-directional</em>. A wider data bus moves more bits per transfer.',
        '<strong>Control bus</strong>: carries control and timing signals such as memory read, memory write, clock, interrupt request and bus request. Individual lines carry signals in one direction, but the bus as a whole carries signals both to and from the processor.'
      ]
    },
    {
      heading: 'The fetch–decode–execute cycle',
      html: '<p>The WJEC specification calls this the <em>fetch-execute cycle</em>. The register transfers are usually described like this:</p>' +
        '<ol>' +
        '<li><strong>Fetch</strong>: the address in the PC is copied to the MAR. The address is sent along the address bus and a read signal is sent along the control bus. The instruction at that address is sent along the data bus into the MDR. The PC is incremented so it points to the next instruction. The instruction is copied from the MDR to the CIR.</li>' +
        '<li><strong>Decode</strong>: the control unit decodes the instruction in the CIR, splitting it into the <em>opcode</em> (what to do) and the <em>operand</em> (what to do it to, often an address).</li>' +
        '<li><strong>Execute</strong>: the instruction is carried out. For example, to load a value, the operand address is copied to the MAR, the data is read into the MDR and then copied into the accumulator. A branch instruction changes the PC.</li>' +
        '<li>At the end of each cycle the processor checks for interrupts.</li>' +
        '</ol>' +
        '<p>Notation such as <code>MAR ← [PC]</code> means “copy the contents of the PC into the MAR”.</p>'
    },
    {
      heading: 'Factors affecting processor performance',
      points: [
        '<strong>Clock speed</strong>: more cycles per second means more instructions can be processed per second, but higher speeds generate more heat.',
        '<strong>Number of cores</strong>: each core can process instructions independently, but only if the software can be split into tasks that run at the same time.',
        '<strong>Cache size and levels</strong>: more cache means more data is found in fast memory instead of slower main memory (fewer cache misses).',
        '<strong>Word length and bus width</strong>: a wider data bus moves more data per transfer; a wider address bus allows more memory to be addressed.',
        '<strong>Pipelining</strong>: the fetch of one instruction overlaps with the decode and execute of earlier ones, so more instructions complete per unit of time. A branch can force the pipeline to be flushed.'
      ]
    },
    {
      heading: 'Parallel processing and its limits',
      points: [
        'Parallel processing uses two or more processors or cores to work on different parts of a task at the same time.',
        'Only the parallelisable part of a task speeds up. If a task takes time <var>T</var> on one processor, a fraction <var>s</var> must run sequentially and the rest is shared perfectly between <var>n</var> processors: <code>new time = s × T + (1 − s) × T ÷ n</code> (this idea is known as Amdahl’s law).',
        'Worked example: a task takes 100 s on one core and 20% is sequential. On 4 cores: 20 + 80 ÷ 4 = <strong>40 s</strong>. Even with infinitely many cores it cannot drop below 20 s.',
        'Other limiting factors: dependencies between steps (one result is needed before the next can start), the overhead of dividing work and combining results, communication and synchronisation between cores, and contention for shared memory and buses.'
      ]
    },
    {
      heading: 'Interrupts',
      points: [
        'An interrupt is a signal to the processor that a device or program needs attention.',
        'Sources include hardware (a key press, a printer out of paper, an input/output transfer completing), software (division by zero, an invalid instruction), a timer (end of a time slice) and hardware failure (such as loss of power).',
        'The processor checks for interrupts at the end of each fetch–decode–execute cycle. If an interrupt has a higher priority than the current task, the contents of the registers (including the PC) are saved, usually on a stack.',
        'The address of the appropriate <strong>interrupt service routine (ISR)</strong> is loaded into the PC and the ISR runs. Afterwards the saved values are restored and the original task continues where it left off.',
        'Priorities decide which interrupt is handled first; for example, a power failure is more urgent than a key press. A higher-priority interrupt can interrupt a lower-priority ISR.'
      ]
    },
    {
      heading: 'Assembly language',
      points: [
        'Assembly language uses <strong>mnemonics</strong> (such as <code>LDA</code>, <code>ADD</code>, <code>STA</code>) that usually correspond one-to-one with machine-code instructions. An <strong>assembler</strong> translates it into machine code.',
        'Each instruction has an <strong>opcode</strong> and usually an <strong>operand</strong>.',
        'Addressing modes describe how the operand is used: <em>immediate</em> (the operand is the value itself), <em>direct</em> (the operand is the address of the value), <em>indirect</em> (the operand is the address of a location holding the address of the value) and <em>indexed</em> (the address is the operand plus the contents of an index register).',
        'The instruction set used in an exam is always given in the question; learn the ideas rather than one particular set of mnemonics.'
      ]
    }
  ],
  misconceptions: [
    { wrong: 'The program counter holds the current instruction.', right: 'The PC holds the <em>address</em> of the <em>next</em> instruction. The current instruction itself is in the CIR.' },
    { wrong: 'The MAR and MDR hold the same kind of value.', right: 'The MAR only ever holds an address. The MDR holds the data or instruction being transferred.' },
    { wrong: 'Doubling the number of cores halves the time for any program.', right: 'Only the parallelisable part speeds up, and dividing the work adds overheads.' },
    { wrong: 'The address bus carries data in both directions.', right: 'The address bus is one-directional: addresses travel from the processor to memory.' }
  ],
  examTips: [
    'When describing the fetch stage, name each register <em>and</em> say what moves where, in the right order. Vague answers such as “the instruction is fetched from memory” gain little credit.',
    'For “explain” questions on performance, give a reason as well as a fact: “more cache <em>so</em> fewer slower accesses to main memory are needed”.',
    'In parallel-processing calculations, show the sequential and parallel parts separately so that method marks can be awarded even if the final answer is wrong.'
  ],
  flashcards: [
    { id: 'proc-fc-1', front: 'What does the program counter (PC) hold?', back: 'The address of the next instruction to be fetched.' },
    { id: 'proc-fc-2', front: 'What does the memory address register (MAR) hold?', back: 'The address of the memory location that is about to be read from or written to.' },
    { id: 'proc-fc-3', front: 'What does the memory data register (MDR) hold?', back: 'The data or instruction that has just been read from memory, or is about to be written to memory.' },
    { id: 'proc-fc-4', front: 'What does the current instruction register (CIR) hold?', back: 'The instruction currently being decoded and executed.' },
    { id: 'proc-fc-5', front: 'What is the stored program concept?', back: 'Instructions and data are stored together in the same main memory, and instructions are fetched and executed one after another.' },
    { id: 'proc-fc-6', front: 'What is the Von Neumann bottleneck?', back: 'Instructions and data share the same memory and buses, so they cannot be transferred at the same time. This limits performance.' },
    { id: 'proc-fc-7', front: 'Which bus is one-directional, and why?', back: 'The address bus: addresses are only ever sent from the processor to memory (or to input/output controllers).' },
    { id: 'proc-fc-8', front: 'How many locations can a 24-bit address bus address?', back: '2<sup>24</sup> = 16,777,216 locations.' },
    { id: 'proc-fc-9', front: 'What does the control unit do?', back: 'Decodes instructions and sends control signals to coordinate the processor’s components and the flow of data.' },
    { id: 'proc-fc-10', front: 'What is an interrupt service routine (ISR)?', back: 'The code that runs to deal with a particular interrupt. The processor saves its state, runs the ISR, then restores its state.' },
    { id: 'proc-fc-11', front: 'When does the processor check for interrupts?', back: 'At the end of each fetch–decode–execute cycle.' },
    { id: 'proc-fc-12', front: 'Give two factors that limit the speed-up from parallel processing.', back: 'Any two of: parts of the task must run sequentially; dependencies between steps; overhead of dividing and combining work; communication and synchronisation between cores; contention for shared memory.' },
    { id: 'proc-fc-13', front: 'What is pipelining?', back: 'Overlapping the stages of different instructions: while one instruction executes, the next is decoded and the one after that is fetched.' }
  ],
  questions: [
    {
      id: 'proc-q1', type: 'mcq', skill: 'recall',
      question: 'Which register holds the address of the next instruction to be fetched?',
      options: ['Program counter (PC)', 'Current instruction register (CIR)', 'Memory data register (MDR)', 'Accumulator (ACC)'],
      answer: 0,
      feedback: ['', 'The CIR holds the instruction currently being decoded and executed, not the address of the next one.', 'The MDR holds the data or instruction that has just been transferred to or from memory.', 'The accumulator holds results from the ALU.'],
      explanation: 'The PC holds the address of the next instruction. It is copied to the MAR at the start of the fetch stage and then incremented.'
    },
    {
      id: 'proc-q2', type: 'mcq', skill: 'recall',
      question: 'During the fetch stage, which happens immediately after the contents of the PC are copied to the MAR?',
      options: ['The address is sent along the address bus and a memory read signal is sent along the control bus', 'The instruction is copied from the MDR to the CIR', 'The control unit decodes the instruction', 'The result is stored in the accumulator'],
      answer: 0,
      feedback: ['', 'This happens later, once the instruction has arrived in the MDR.', 'Decoding is the next stage of the cycle, after the fetch is complete.', 'Storing a result happens during the execute stage, if at all.'],
      explanation: 'MAR ← [PC]; the address goes out on the address bus with a read signal on the control bus; the instruction returns on the data bus into the MDR; the PC is incremented; CIR ← [MDR].'
    },
    {
      id: 'proc-q3', type: 'mcq', skill: 'recall',
      question: 'Which bus is one-directional?',
      options: ['Address bus', 'Data bus', 'Control bus', 'All three buses are two-directional'],
      answer: 0,
      feedback: ['', 'Data travels both to and from the processor (reads and writes), so the data bus is two-directional.', 'The control bus carries signals both from the processor (such as memory read) and to it (such as interrupt requests).', 'The address bus only carries addresses from the processor to memory.'],
      explanation: 'Only the processor places addresses on the address bus, so it is one-directional.'
    },
    {
      id: 'proc-q4', type: 'input', skill: 'application',
      question: 'A processor has a 16-bit address bus. How many different memory locations can it address? Give your answer as a whole number.',
      accept: ['65536', '65,536', '2^16'],
      ignoreSpaces: true,
      hint: 'Each extra address line doubles the number of possible addresses.',
      explanation: 'With 16 address lines there are 2<sup>16</sup> = 65,536 different bit patterns, so 65,536 addressable locations.'
    },
    {
      id: 'proc-q5', type: 'input', skill: 'application',
      question: 'A task takes 120 seconds on a single core. 25% of the task must run sequentially; the rest can be shared perfectly across cores. Ignoring overheads, how many seconds will it take on 6 cores?',
      accept: ['45', '45s', '45 s', '45 seconds'],
      hint: 'Work out the sequential time and the parallel time separately.',
      explanation: 'Sequential part: 25% of 120 = 30 s. Parallel part: 90 s ÷ 6 = 15 s. Total = 30 + 15 = 45 s.'
    },
    {
      id: 'proc-q6', type: 'mcq', skill: 'application',
      question: 'A program’s run time is 80 s on one core, of which 40 s can only run sequentially. What is the shortest time it could possibly take, however many cores are used (ignoring overheads)?',
      options: ['40 s', '0 s', '20 s', '10 s'],
      answer: 0,
      feedback: ['', 'The sequential part can never be shared between cores, so the time cannot fall to zero.', '20 s would only be possible if half of the sequential part could also be parallelised.', '10 s would be the result of dividing the whole task between 8 cores, ignoring that half of it is sequential.'],
      explanation: 'However many cores are used, the parallel part tends towards 0 s but the 40 s sequential part remains.'
    },
    {
      id: 'proc-q7', type: 'mcq', skill: 'recall',
      question: 'What is the Von Neumann bottleneck?',
      options: ['Instructions and data share the same memory and buses, so they cannot be fetched at the same time', 'The processor overheats when the clock speed is too high', 'Cache memory is too small to hold a whole program', 'The control unit can only decode one opcode format'],
      answer: 0,
      feedback: ['', 'Heat is a limit on clock speed, but it is not what the term describes.', 'Cache size affects performance, but the bottleneck refers to the shared path between processor and memory.', 'This is not a recognised limitation of the Von Neumann design.'],
      explanation: 'Because one bus system is shared, instruction fetches and data transfers must take turns, which limits throughput.'
    },
    {
      id: 'proc-q8', type: 'mcq', skill: 'application',
      question: 'The instruction <code>STA 50</code> stores the contents of the accumulator at address 50. During its execute stage, which value is placed in the MAR?',
      options: ['50', 'The contents of the accumulator', 'The address held in the PC', 'The opcode for STA'],
      answer: 0,
      feedback: ['', 'The accumulator’s contents go into the MDR, ready to be written to memory. The MAR holds the destination address.', 'The PC was used during the fetch stage; it now points to the following instruction.', 'The opcode is decoded by the control unit; it is not an address.'],
      explanation: 'MAR ← 50 (the operand), MDR ← [ACC], then a write signal stores the MDR’s contents at address 50.'
    },
    {
      id: 'proc-q9', type: 'mcq', skill: 'recall',
      question: 'What happens when the processor accepts an interrupt?',
      options: ['The current register contents are saved, then the address of the interrupt service routine is loaded into the PC', 'The current program is closed and restarted after the interrupt', 'The interrupt is placed at the end of the program and runs when the program finishes', 'The processor switches off the clock until the device is ready'],
      answer: 0,
      feedback: ['', 'The program is not closed: its state is saved so that it can continue from exactly where it stopped.', 'Interrupts are handled as soon as possible according to priority, not after the program ends.', 'The clock keeps running; the processor runs the interrupt service routine instead.'],
      explanation: 'Saving the registers (often onto a stack) lets the interrupted task resume afterwards. The PC is loaded with the ISR’s address.'
    },
    {
      id: 'proc-q10', type: 'mcq', skill: 'recall',
      question: 'Which of these is most likely to be given the highest interrupt priority?',
      options: ['Imminent power failure', 'A key being pressed', 'A printer reporting that it has finished printing', 'A timer signalling the end of a time slice'],
      answer: 0,
      feedback: ['', 'A key press can wait a few milliseconds without data loss.', 'Completing a print job is not urgent.', 'Time slices matter for scheduling, but data could be lost if a power failure is not dealt with first.'],
      explanation: 'Interrupts that risk data loss or damage, such as power failure, are given the highest priority.'
    },
    {
      id: 'proc-q11', type: 'mcq', skill: 'application',
      question: 'A computer’s clock speed is doubled, but most of its programs spend their time waiting for data from main memory. What is the most likely effect?',
      options: ['A smaller improvement than double the speed, because memory access is the limiting factor', 'Programs will run exactly twice as fast', 'Programs will run more slowly', 'There will be no change in speed at all'],
      answer: 0,
      feedback: ['', 'Doubling the clock only doubles speed if the processor is the only limiting factor.', 'A faster clock does not slow down instructions, though it can increase heat.', 'Instructions that do not wait for memory will still complete faster, so there is some gain.'],
      explanation: 'Performance depends on the slowest part of the system. Larger cache would help more if programs are memory-bound.'
    },
    {
      id: 'proc-q12', type: 'mcq', skill: 'technique',
      question: 'A question says: “<em>Explain</em> how increasing the size of cache memory can improve performance. [2 marks]”. Which answer would gain both marks?',
      options: ['More data and instructions can be held in cache, so fewer slower accesses to main memory are needed.', 'Cache is a type of fast memory found in the processor.', 'It makes the computer faster.', 'Cache memory is bigger, so it is better.'],
      answer: 0,
      feedback: ['', 'This describes what cache is but does not explain <em>why</em> more of it improves performance.', 'This only repeats the question and gives no reason.', 'This gives no reason connected to memory access times.'],
      explanation: '“Explain” needs a point <em>and</em> a reason linked to it. Linking words such as “so” or “because” help to show the reasoning.'
    },
    {
      id: 'proc-q13', type: 'mcq', skill: 'recall',
      question: 'In immediate addressing, the operand of an instruction is…',
      options: ['the actual value to be used', 'the address of the value to be used', 'the address of a location that holds the address of the value', 'added to an index register to give an address'],
      answer: 0,
      feedback: ['', 'This describes direct addressing.', 'This describes indirect addressing.', 'This describes indexed addressing.'],
      explanation: 'For example, <code>ADD #5</code> in immediate mode adds the number 5 itself.'
    },
    {
      id: 'proc-q14', type: 'mcq', skill: 'technique',
      question: 'You are asked to “Describe the fetch stage of the fetch–decode–execute cycle. [4 marks]”. What is the best approach?',
      options: ['Give four separate steps in order, naming the registers and buses involved in each', 'Write one sentence saying that instructions are fetched from memory', 'Describe all three stages of the cycle briefly', 'Draw a labelled diagram of the processor with no text'],
      answer: 0,
      feedback: ['', 'One general sentence would gain at most one mark.', 'Only the fetch stage is asked for; decode and execute steps would not gain credit.', 'A diagram alone rarely shows the sequence of transfers clearly enough.'],
      explanation: 'Match the number of distinct, precise points to the marks available, and answer only what is asked.'
    }
  ],
  exam: [
    {
      id: 'proc-e1', marks: 4,
      question: 'Describe how an instruction is fetched from main memory into the processor during the fetch stage of the fetch–decode–execute cycle.',
      markPoints: [
        'The address in the program counter (PC) is copied to the memory address register (MAR).',
        'The address is sent along the address bus and a memory read signal is sent along the control bus.',
        'The instruction at that address is transferred along the data bus into the memory data register (MDR).',
        'The program counter is incremented (to point to the next instruction).',
        'The instruction is copied from the MDR into the current instruction register (CIR).'
      ],
      technique: 'Each mark needs a specific register or bus and the direction of the transfer. Keep the steps in the correct order; incrementing the PC can happen at any point after its value has been copied to the MAR.'
    },
    {
      id: 'proc-e2', marks: 3,
      context: 'A school replaces its dual-core computers with eight-core computers, expecting all software to run four times faster.',
      question: 'Explain why the software may not run four times faster.',
      markPoints: [
        'Some parts of a program must run sequentially and cannot be shared between cores.',
        'There may be dependencies, where one step needs the result of another before it can start.',
        'Dividing the work, and combining the results, adds overhead.',
        'Cores must communicate and synchronise, and may compete for shared memory, cache or buses.',
        'The software may not have been written to use multiple cores (it may be single-threaded).'
      ],
      technique: 'This is an “explain” question about a given context, so link each reason to why the speed-up is reduced. Three well-explained reasons are better than a list of six words.'
    },
    {
      id: 'proc-e3', marks: 4,
      question: 'Describe how a processor handles an interrupt.',
      markPoints: [
        'The processor checks for interrupts at the end of each fetch–decode–execute cycle.',
        'It compares the priority of the interrupt with the current task, and only handles it if it is of higher priority.',
        'The contents of the registers, including the PC, are saved (for example on a stack).',
        'The address of the interrupt service routine (ISR) is loaded into the program counter and the ISR is executed.',
        'Afterwards the saved register contents are restored and the original task continues from where it stopped.'
      ],
      technique: 'Describe the sequence in order. “Saves the registers” is creditworthy; “stops the program” is not, because the program is suspended, not ended.'
    }
  ],
  traces: [
    {
      id: 'proc-t1',
      title: 'Registers during a short program',
      intro: '<p>A simple processor uses the instructions <code>LDA</code> (load accumulator from address), <code>ADD</code> (add contents of address to accumulator), <code>SUB</code> (subtract contents of address from accumulator), <code>STA</code> (store accumulator at address) and <code>HLT</code> (halt).</p>' +
        '<p>The program starts at address 0, so the PC is initially 0. Memory addresses 10, 11 and 12 hold 25, 17 and 8. Address 13 holds 0. Complete one row for each instruction, showing values <strong>after the instruction has been executed</strong>. The MAR changes only when memory is accessed, and the PC is incremented during each fetch.</p>',
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
      explanation: 'Each fetch copies the PC to the MAR and then increments the PC. Executing <code>LDA</code>, <code>ADD</code>, <code>SUB</code> and <code>STA</code> places the operand address in the MAR. <code>HLT</code> does not access memory during execution, so the MAR still holds 4, the address used to fetch <code>HLT</code>. 25 + 17 = 42, then 42 − 8 = 34, which <code>STA 13</code> stores at address 13.'
    }
  ]
});
