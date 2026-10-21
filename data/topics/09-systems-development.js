/* Topic 9: Systems analysis, software development and testing. */
RS.content.registerTopic({
  id: 'systems',
  order: 9,
  title: 'Systems development and testing',
  icon: 'clipboard',
  colour: 'orange',
  summary: 'Feasibility and investigation, abstraction and design, Waterfall and Agile, testing, changeover, maintenance, documentation, version control and backup.',
  keywords: ['systems analysis', 'feasibility study', 'investigation', 'interview', 'questionnaire', 'observation', 'abstraction', 'decomposition', 'data flow diagram', 'DFD', 'waterfall', 'agile', 'prototyping', 'alpha testing', 'beta testing', 'acceptance testing', 'black box', 'white box', 'test plan', 'changeover', 'direct', 'parallel', 'phased', 'pilot', 'maintenance', 'corrective', 'adaptive', 'perfective', 'documentation', 'user guide', 'version control', 'IDE', 'CASE', 'backup', 'incremental', 'archive', 'design review', 'evaluation'],
  specRefs: [
    'AS Unit 1, section 11 (Systems analysis): feasibility; investigation and analysis (including abstraction and decomposition); design diagrams; changeover; alpha, beta and acceptance testing; maintenance; backup and recovery; documentation',
    'AS Unit 1, section 12 (Software engineering): IDE tools',
    'A2 Unit 3, sections 5–7: Waterfall and Agile; documentation at each stage; design validation (design review) and evaluation criteria; software tools including program version management',
    'AS Unit 1, section 16: disaster planning and contingency planning',
    'A2 Unit 5 (non-exam assessment) follows a similar life cycle: investigation, design, prototype, development, testing and evaluation.'
  ],
  notes: [
    {
      heading: 'Feasibility study',
      points: [
        'Before a project starts, a feasibility study decides whether the proposed system is worth developing and can realistically be built.',
        'It considers whether the solution is <strong>technically</strong> possible, <strong>economically</strong> worthwhile (costs compared with benefits), <strong>legal</strong>, acceptable to the people who will use it (<strong>operational</strong>), and achievable within the <strong>time scale</strong>.',
        'A proposed solution must be cost-effective, delivered to an agreed time scale and within an agreed budget.',
        'The result is a feasibility report recommending whether, and how, to proceed.'
      ]
    },
    {
      heading: 'Investigation and analysis',
      html: '<table><thead><tr><th scope="col">Method</th><th scope="col">Advantages</th><th scope="col">Disadvantages</th></tr></thead><tbody>' +
        '<tr><td>Interviews</td><td>Detailed answers; follow-up questions can be asked.</td><td>Time-consuming; only a few people can be interviewed; answers may be biased.</td></tr>' +
        '<tr><td>Questionnaires</td><td>Reach many people quickly and cheaply, including at different sites; can be anonymous; easy to analyse.</td><td>Low response rates; no follow-up; questions may be misunderstood.</td></tr>' +
        '<tr><td>Observation</td><td>Shows what really happens, not what people say happens.</td><td>Time-consuming; people may behave differently when watched.</td></tr>' +
        '<tr><td>Study of existing documents</td><td>Shows the data currently collected, processed and output.</td><td>Documents may be out of date or incomplete.</td></tr>' +
        '</tbody></table>' +
        '<ul><li><strong>Abstraction</strong>: removing unnecessary detail to focus on what matters for the problem (for example a map of bus routes that ignores the exact shape of roads).</li>' +
        '<li><strong>Decomposition</strong>: breaking a large problem into smaller sub-problems that are easier to understand, solve and test, and that can be shared between developers.</li>' +
        '<li>The analysis produces a requirements specification, often with measurable success criteria.</li></ul>'
    },
    {
      heading: 'Design',
      points: [
        '<strong>Data flow diagrams (DFDs)</strong> show how data moves through a system. The symbols used in the WJEC specification are: external entity (a rectangle drawn with a shadow), process (a rounded rectangle), data store (an open-ended rectangle) and data flow (a labelled arrow).',
        'Other design work: input and output designs (screens and reports), data structures and validation, algorithms (pseudo-code or flowcharts), and the choice of suitable hardware and software.',
        'A <strong>design review</strong> checks that the design matches the specification, that the most appropriate techniques have been used and that the user interface is appropriate, before costly development begins.',
        'Human–computer interaction should suit the range of users (for example experience, age, accessibility needs) and the environment in which the system will be used.'
      ]
    },
    {
      heading: 'Development approaches: Waterfall and Agile',
      points: [
        '<strong>Waterfall</strong>: stages (analysis, design, implementation, testing, installation, maintenance) are completed in order, each signed off before the next begins. It is clear, well documented and easy to manage, and suits projects with fixed, well-understood requirements. However, the user sees little until late on, and changes are difficult and expensive once a stage is complete.',
        '<strong>Agile</strong>: the system is built in short iterations (sprints), each producing working software that the client reviews. Requirements can change during development, and problems are found early through frequent feedback. It needs close, continuous client involvement and produces less formal documentation, so it can be harder to estimate overall time and cost.',
        '<strong>Prototyping</strong> produces an early working model so users can give feedback that refines the design.',
        'Documentation produced at each stage: feasibility report; requirements specification (analysis); design specification, DFDs, data dictionary and test plan (design); annotated code listings (implementation); test results (testing); user and technical guides (installation).'
      ]
    },
    {
      heading: 'Testing',
      points: [
        'A <strong>test plan</strong> lists each test, its purpose, the test data, the expected result and (later) the actual result. Test data should be <strong>normal</strong>, <strong>boundary</strong> (extreme) and <strong>erroneous</strong> (invalid).',
        '<strong>White box</strong> testing uses knowledge of the code to test every path; <strong>black box</strong> testing checks inputs against expected outputs without looking at the code.',
        'Developers test individual modules (unit testing), modules working together (integration testing) and the whole system (system testing).',
        '<strong>Alpha testing</strong>: carried out within the developing organisation, often by in-house testers, before release.',
        '<strong>Beta testing</strong>: a nearly finished version is released to a limited group of real users outside the organisation, who report faults found in real-world use.',
        '<strong>Acceptance testing</strong>: the client tests the finished system against the agreed requirements before accepting it (and paying).'
      ]
    },
    {
      heading: 'Changeover methods',
      html: '<table><thead><tr><th scope="col">Method</th><th scope="col">How</th><th scope="col">Advantages</th><th scope="col">Disadvantages</th></tr></thead><tbody>' +
        '<tr><td>Direct</td><td>The old system stops and the new one starts immediately.</td><td>Quick and cheap; no duplicated work.</td><td>Very risky: if the new system fails there is no fallback.</td></tr>' +
        '<tr><td>Parallel</td><td>Old and new systems run side by side for a period.</td><td>Low risk: outputs can be compared and the old system is a fallback.</td><td>Expensive and time-consuming: work is done twice.</td></tr>' +
        '<tr><td>Phased</td><td>The new system is introduced one part (module) at a time.</td><td>Problems are limited to one part; staff can be trained gradually.</td><td>Slow; old and new parts must work together in the meantime.</td></tr>' +
        '<tr><td>Pilot</td><td>The whole system is introduced at one site, branch or department first, then rolled out.</td><td>Problems affect only the pilot site; staff there can train others.</td><td>Slower overall; the pilot site bears the risk.</td></tr>' +
        '</tbody></table>'
    },
    {
      heading: 'Maintenance',
      points: [
        '<strong>Corrective</strong>: fixing errors (bugs) found after the system is in use.',
        '<strong>Adaptive</strong>: changing the system to cope with a changed environment, such as new legislation, a new tax rate, a new operating system or new hardware.',
        '<strong>Perfective</strong>: improving performance or adding features requested by users, even though the system already works correctly.',
        'Good documentation, meaningful identifiers, modular code and version control all make maintenance easier.'
      ]
    },
    {
      heading: 'Documentation',
      points: [
        '<strong>User documentation</strong> helps people use the system: installation instructions, how to carry out tasks, screenshots, troubleshooting, FAQs and error messages, written in non-technical language.',
        '<strong>Maintenance (technical) documentation</strong> helps developers maintain the system: requirements and design specifications, annotated code listings, variable lists, algorithms (pseudo-code or flowcharts), data dictionaries, DFDs and test plans and results.'
      ]
    },
    {
      heading: 'Software tools and version management',
      points: [
        'An <strong>IDE</strong> combines an editor (syntax highlighting, auto-completion), a translator and debugging tools (breakpoints, stepping, variable watches).',
        '<strong>CASE tools</strong> (computer-aided software engineering) support analysis and design (diagram tools, data dictionaries), project management, automated testing and documentation.',
        '<strong>Version management</strong> (version control) records every change to the code with who made it and when, allows earlier versions to be restored, and lets several developers work on the same code (using branches that are merged), avoiding overwriting each other’s work.'
      ]
    },
    {
      heading: 'Backup, recovery and archiving',
      points: [
        'A <strong>backup</strong> is a copy of data kept so it can be restored if the original is lost or damaged. Backups should be regular, tested, and kept off-site or in the cloud.',
        '<strong>Full</strong> backup copies everything; <strong>incremental</strong> backup copies only data changed since the last backup of any kind (fast, but restoring needs the full backup plus every increment); <strong>differential</strong> copies everything changed since the last full backup.',
        'The <strong>grandfather–father–son</strong> scheme keeps three generations of backups. <strong>Transaction logs</strong> record every change so a database can be rebuilt from the last backup.',
        'An <strong>archive</strong> is different: data no longer in everyday use is moved to long-term storage (often to meet legal requirements), freeing space on the live system.',
        'A disaster recovery (contingency) plan sets out how to restore systems and data after events such as fire, flood, hardware failure or cyber-attack.'
      ]
    }
  ],
  misconceptions: [
    { wrong: 'Beta testing is done by the developers.', right: 'Beta testing is done by real users outside the organisation; alpha testing is in-house.' },
    { wrong: 'Parallel changeover is always the best because it is safest.', right: 'It is safest but also the most expensive. The best method depends on the situation (risk, cost, size of organisation).' },
    { wrong: 'A backup and an archive are the same.', right: 'A backup is a copy for recovery; an archive moves data no longer needed day to day into long-term storage.' },
    { wrong: 'Perfective maintenance fixes bugs.', right: 'Fixing bugs is corrective maintenance. Perfective maintenance improves a working system.' }
  ],
  examTips: [
    'Scenario questions (“Recommend a changeover method for…”) need a justified choice using details from the scenario, often with a reason why other methods are less suitable.',
    'For “discuss” questions worth 6 or more marks, give advantages and disadvantages and reach a supported conclusion.',
    'Learn precise definitions for the three types of maintenance and the three types of testing (alpha, beta, acceptance); they are easily confused.'
  ],
  flashcards: [
    { id: 'sys-fc-1', front: 'What is the purpose of a feasibility study?', back: 'To decide whether a proposed system is worth developing and can be built, considering technical, economic, legal, operational and time factors.' },
    { id: 'sys-fc-2', front: 'Give one advantage each of interviews and questionnaires.', back: 'Interviews: detailed answers and follow-up questions. Questionnaires: many people can be reached quickly and cheaply.' },
    { id: 'sys-fc-3', front: 'Define abstraction.', back: 'Removing unnecessary detail so you can focus on the parts of a problem that matter.' },
    { id: 'sys-fc-4', front: 'Define decomposition.', back: 'Breaking a problem down into smaller sub-problems that are easier to solve.' },
    { id: 'sys-fc-5', front: 'Waterfall vs Agile in one line each?', back: 'Waterfall: sequential stages, each completed before the next. Agile: short iterations with frequent client feedback and changing requirements.' },
    { id: 'sys-fc-6', front: 'Alpha, beta, acceptance testing?', back: 'Alpha: in-house testing. Beta: real users outside the organisation. Acceptance: the client checks the system meets the requirements.' },
    { id: 'sys-fc-7', front: 'Which changeover method has no fallback?', back: 'Direct changeover.' },
    { id: 'sys-fc-8', front: 'What is pilot changeover?', back: 'The new system is introduced in one site or department first, then rolled out to the rest.' },
    { id: 'sys-fc-9', front: 'What is phased changeover?', back: 'The new system is introduced one module or part at a time.' },
    { id: 'sys-fc-10', front: 'Corrective, adaptive, perfective maintenance?', back: 'Corrective fixes bugs; adaptive responds to changes in the environment; perfective improves or adds features.' },
    { id: 'sys-fc-11', front: 'What does version control provide?', back: 'A history of changes, the ability to roll back, and safe collaboration through branches and merging.' },
    { id: 'sys-fc-12', front: 'Incremental backup?', back: 'Copies only the data that has changed since the last backup.' },
    { id: 'sys-fc-13', front: 'What is in maintenance documentation?', back: 'Annotated listings, variable lists, algorithms, data dictionaries, design documents and test plans.' }
  ],
  questions: [
    {
      id: 'sys-q1', type: 'mcq', skill: 'application',
      question: 'A hospital is replacing its patient records system. Any failure could put patients at risk, and cost is a lower priority. Which changeover method is most suitable?',
      options: ['Parallel', 'Direct', 'Phased', 'Pilot'],
      answer: 0,
      feedback: ['', 'Direct changeover leaves no fallback if the new system fails – too risky here.', 'Phased reduces risk, but during each phase the new part has no fallback.', 'A pilot reduces the scale of risk, but the pilot ward still has no fallback.'],
      explanation: 'Running both systems allows results to be compared and the old system to be used if the new one fails.'
    },
    {
      id: 'sys-q2', type: 'mcq', skill: 'recall',
      question: 'A supermarket chain installs a new checkout system in one store, fixes any problems, then installs it in all its other stores. Which changeover method is this?',
      options: ['Pilot', 'Phased', 'Parallel', 'Direct'],
      answer: 0,
      feedback: ['', 'Phased introduces one <em>part</em> of the system at a time, not one location.', 'Parallel would run old and new systems together.', 'Direct would switch every store at once.'],
      explanation: 'Pilot changeover tries the complete system in one location first.'
    },
    {
      id: 'sys-q3', type: 'mcq', skill: 'application',
      question: 'A payroll program is updated because the government changes the rate of income tax. Which type of maintenance is this?',
      options: ['Adaptive', 'Corrective', 'Perfective', 'Preventative'],
      answer: 0,
      feedback: ['', 'Corrective maintenance fixes errors; the program was not wrong before the law changed.', 'Perfective maintenance improves a system or adds requested features.', 'This is not one of the three main types listed in the specification.'],
      explanation: 'Adaptive maintenance responds to a change in the system’s environment, such as new legislation.'
    },
    {
      id: 'sys-q4', type: 'mcq', skill: 'application',
      question: 'Users ask for a new “export to spreadsheet” button in a system that works correctly. Adding it is which type of maintenance?',
      options: ['Perfective', 'Corrective', 'Adaptive', 'Acceptance'],
      answer: 0,
      feedback: ['', 'Nothing is broken, so it is not corrective.', 'Nothing in the environment has changed; users simply want an improvement.', 'Acceptance is a type of testing.'],
      explanation: 'Perfective maintenance improves a working system or adds features.'
    },
    {
      id: 'sys-q5', type: 'mcq', skill: 'recall',
      question: 'What is beta testing?',
      options: ['Testing by a limited group of real users outside the developing organisation', 'Testing by the developers before anyone else sees the software', 'Testing by the client against the original requirements before accepting the system', 'Testing each module separately'],
      answer: 0,
      feedback: ['', 'This describes alpha testing.', 'This describes acceptance testing.', 'This describes unit testing.'],
      explanation: 'Beta testers use the software in real conditions and report faults before full release.'
    },
    {
      id: 'sys-q6', type: 'mcq', skill: 'application',
      question: 'An analyst needs the views of 400 staff spread across eight offices in Wales. Which investigation method is most suitable?',
      options: ['Questionnaires', 'Interviews with every member of staff', 'Observation at every office', 'Studying existing documents only'],
      answer: 0,
      feedback: ['', 'Interviewing 400 people would take far too long.', 'Observing eight sites is slow and does not collect staff opinions.', 'Documents do not show staff views.'],
      explanation: 'Questionnaires can reach many people in different places quickly and cheaply.'
    },
    {
      id: 'sys-q7', type: 'mcq', skill: 'application',
      question: 'A client is unsure exactly what they want and expects requirements to change. Which development approach is most suitable?',
      options: ['Agile', 'Waterfall', 'Direct changeover', 'Beta testing'],
      answer: 0,
      feedback: ['', 'Waterfall fixes requirements early, so later changes are costly.', 'Direct changeover is a way of introducing a system, not developing it.', 'Beta testing is one type of testing, not a development approach.'],
      explanation: 'Agile’s short iterations and regular client feedback cope well with changing requirements.'
    },
    {
      id: 'sys-q8', type: 'mcq', skill: 'recall',
      question: 'In a data flow diagram, what does a data store represent?',
      options: ['A place where data is held, such as a file or database table', 'A person or organisation outside the system', 'An action that transforms data', 'The direction data moves in'],
      answer: 0,
      feedback: ['', 'This is an external entity.', 'This is a process.', 'This is a data flow (arrow).'],
      explanation: 'Data stores are drawn as open-ended rectangles in the symbols used by the WJEC specification.'
    },
    {
      id: 'sys-q9', type: 'mcq', skill: 'recall',
      question: 'What is abstraction?',
      options: ['Removing unnecessary detail to focus on the important parts of a problem', 'Breaking a problem into smaller sub-problems', 'Testing a program without looking at its code', 'Running old and new systems together'],
      answer: 0,
      feedback: ['', 'This is decomposition.', 'This is black box testing.', 'This is parallel changeover.'],
      explanation: 'For example, a London Underground map leaves out real distances because they are not needed to plan a route.'
    },
    {
      id: 'sys-q10', type: 'mcq', skill: 'recall',
      question: 'Which is the best description of an incremental backup?',
      options: ['A copy of only the data that has changed since the last backup', 'A copy of all data every time', 'Moving old data that is no longer needed to long-term storage', 'Two copies of every file kept on the same disk'],
      answer: 0,
      feedback: ['', 'This is a full backup.', 'This is archiving.', 'Copies on the same disk would be lost if the disk failed.'],
      explanation: 'Incremental backups are fast and small, but a restore needs the last full backup plus every increment since.'
    },
    {
      id: 'sys-q11', type: 'mcq', skill: 'recall',
      question: 'Why do development teams use version control software?',
      options: ['To track changes, restore earlier versions and let several developers work on the code safely', 'To translate source code into machine code', 'To prevent anyone else seeing the code', 'To test the software with real users'],
      answer: 0,
      feedback: ['', 'Translation is done by compilers and interpreters.', 'Version control is about managing changes, not secrecy.', 'Testing with real users is beta testing.'],
      explanation: 'Version control records who changed what and when, and supports branching and merging.'
    },
    {
      id: 'sys-q12', type: 'mcq', skill: 'recall',
      question: 'Which item belongs in maintenance (technical) documentation rather than user documentation?',
      options: ['A list of variables with their data types and purposes', 'Step-by-step instructions for printing a report', 'Screenshots showing how to log in', 'A troubleshooting guide for common error messages'],
      answer: 0,
      feedback: ['', 'This helps users carry out a task, so it is user documentation.', 'This helps users, so it is user documentation.', 'This is aimed at users.'],
      explanation: 'Variable lists help programmers understand and modify the code.'
    },
    {
      id: 'sys-q13', type: 'mcq', skill: 'recall',
      question: 'Who carries out acceptance testing?',
      options: ['The client or end users, checking the system meets the agreed requirements', 'The programmer who wrote each module', 'Members of the public who download a test version', 'An automated compiler'],
      answer: 0,
      feedback: ['', 'Programmers carry out unit testing.', 'This describes beta testing.', 'Compilers find syntax errors; they do not accept a system.'],
      explanation: 'Acceptance testing confirms the system does what was agreed before it is handed over.'
    },
    {
      id: 'sys-q14', type: 'mcq', skill: 'technique',
      question: 'A 6-mark question asks you to “Recommend a changeover method for a small café with one till. Justify your answer.” Which approach gains most marks?',
      options: ['Recommend one method, give reasons linked to the café (for example its small size, low cost and simple system), and explain why other methods are less suitable', 'Describe all four changeover methods in detail without choosing', 'State “direct” and nothing else', 'Write about the advantages of computers in cafés'],
      answer: 0,
      feedback: ['', 'Describing methods without a recommendation does not answer the question.', 'A one-word answer has no justification.', 'This does not address changeover.'],
      explanation: 'Recommendation questions reward a clear choice, justified in the context, with comparison to alternatives.'
    }
  ],
  exam: [
    {
      id: 'sys-e1', marks: 6,
      context: 'A chain of 30 garden centres across Wales is replacing its stock control system. Each centre currently uses the same old system. The company wants to keep disruption to a minimum.',
      question: 'Discuss the suitability of the pilot and direct changeover methods for this company, and recommend one.',
      markPoints: [
        'Direct: the old system stops and the new one starts at all 30 centres at once.',
        'Direct is quick and cheap, but if the new system fails, every centre is affected with no fallback.',
        'Pilot: the new system is installed in one (or a few) centres first.',
        'Problems found in the pilot centre can be fixed before roll-out, so disruption is limited to one centre.',
        'Staff at the pilot centre can help train staff at other centres.',
        'Pilot is slower overall and the pilot centre carries the risk.',
        'Recommendation: pilot, because all centres use the same system and the company wants to minimise disruption (or a reasoned alternative).'
      ],
      technique: '“Discuss” needs advantages and disadvantages of each method in this context, and a justified recommendation.'
    },
    {
      id: 'sys-e2', marks: 4,
      question: 'Compare the Waterfall and Agile approaches to software development.',
      markPoints: [
        'Waterfall completes each stage in sequence before moving on; Agile develops the system in short iterations.',
        'In Waterfall, requirements are fixed early and changes are difficult and expensive; Agile accommodates changing requirements.',
        'Agile involves the client throughout and they see working software early; in Waterfall the client sees the product mainly at the end.',
        'Waterfall produces thorough documentation and is easier to plan and cost; Agile has lighter documentation and less predictable time scales.'
      ],
      technique: 'Each mark point compares both approaches on the same feature.'
    },
    {
      id: 'sys-e3', marks: 6,
      question: 'Describe corrective, adaptive and perfective maintenance, giving an example of each.',
      markPoints: [
        'Corrective maintenance fixes errors/bugs found after the system is in use…',
        '…for example fixing a calculation that gives the wrong total.',
        'Adaptive maintenance changes the system to cope with changes in its environment…',
        '…for example updating it for a new operating system, hardware or new legislation (such as a VAT change).',
        'Perfective maintenance improves the system’s performance or adds features even though it works…',
        '…for example making searches faster or adding a feature users have requested.'
      ],
      technique: 'Pair each description with an example; examples should clearly fit only one type.'
    }
  ]
});
