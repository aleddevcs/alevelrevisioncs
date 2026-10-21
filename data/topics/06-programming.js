/* Topic 6: Programming concepts. */
RS.content.registerTopic({
  id: 'programming',
  order: 6,
  title: 'Programming concepts',
  icon: 'code',
  colour: 'green',
  summary: 'Variables and constants, selection and iteration, subroutines and parameters, scope, recursion, object-oriented programming, paradigms, syntax definitions and translators.',
  keywords: ['variable', 'constant', 'identifier', 'selection', 'IF', 'CASE', 'iteration', 'FOR', 'WHILE', 'REPEAT', 'rogue value', 'sentinel', 'DIV', 'MOD', 'procedure', 'function', 'parameter', 'by value', 'by reference', 'scope', 'local', 'global', 'recursion', 'base case', 'object', 'class', 'method', 'attribute', 'inheritance', 'encapsulation', 'polymorphism', 'paradigm', 'event-driven', 'BNF', 'Backus-Naur', 'syntax diagram', 'compiler', 'interpreter', 'assembler', 'lexical analysis', 'IDE'],
  specRefs: [
    'AS Unit 1, section 9 (Algorithms and programs): variables and constants; identifiers, annotation and layout; scope and lifetime; parameters (by value and by reference); DIV and MOD; programming constructs; counts and rogue values; modular programming',
    'AS Unit 1, section 10 (Principles of programming): paradigms; object-oriented approach; high-level and low-level languages',
    'AS Unit 1, sections 12–13: IDE tools; compilation stages',
    'A2 Unit 3, section 3: Recursion. Section 4 (Principles of programming): paradigms, object-oriented programming, standardisation, syntax diagrams and Backus-Naur form. Section 8: compilers, interpreters and assemblers; translation and execution errors',
    'AS Unit 2 (on-screen practical) uses Visual Basic.NET, Python or Java; practise in your centre’s chosen language.'
  ],
  notes: [
    {
      heading: 'Variables, constants and identifiers',
      points: [
        'A <strong>variable</strong> is a named memory location whose value can change while the program runs. A <strong>constant</strong> is a named value that cannot change while the program runs.',
        'Constants (for example <code>VAT_RATE ← 0.2</code>) make code easier to read, and if the value ever needs to change it is changed in one place only, avoiding errors.',
        '<strong>Self-documenting identifiers</strong> (such as <code>totalPrice</code> rather than <code>tp</code>), comments (annotation) and consistent layout and indentation make programs easier to understand, debug and maintain.'
      ]
    },
    {
      heading: 'Sequence, selection and iteration',
      points: [
        '<strong>Sequence</strong>: instructions run one after another in order.',
        '<strong>Selection</strong>: a condition decides which path to take (<code>IF … ELSEIF … ELSE</code>, or <code>CASE</code>/<code>SELECT</code> for many alternatives).',
        '<strong>Iteration</strong>: repeating instructions. <em>Count-controlled</em> loops (<code>FOR</code>) run a set number of times. <em>Condition-controlled</em> loops repeat until a condition changes: <code>WHILE</code> tests the condition first, so it may run zero times; <code>REPEAT … UNTIL</code> tests at the end, so it always runs at least once.',
        'A <strong>rogue value</strong> (sentinel) is a special value, outside the range of real data, that signals the end of input, for example −1 when entering ages.',
        'A <strong>count</strong> is a variable incremented each time something happens (for example the number of values entered); a <strong>total</strong> accumulates values.'
      ]
    },
    {
      heading: 'Mathematical operators: DIV and MOD',
      points: [
        '<code>DIV</code> gives the whole-number part of a division: 17 DIV 5 = 3.',
        '<code>MOD</code> gives the remainder: 17 MOD 5 = 2.',
        'Uses: testing whether a number is even (<code>n MOD 2 = 0</code>), converting between units (minutes to hours and minutes), wrapping a circular queue pointer, hashing and extracting digits (<code>n MOD 10</code> is the last digit).'
      ]
    },
    {
      heading: 'Subroutines and parameters',
      points: [
        'A <strong>subroutine</strong> is a named block of code that performs a task and can be called from elsewhere. A <strong>function</strong> returns a value; a <strong>procedure</strong> does not (though it may change values passed by reference).',
        'Benefits of modular programming: code can be reused, tested independently, written by different programmers in parallel and maintained more easily; the main program is shorter and easier to follow.',
        'Standard (built-in) functions and library modules are pre-written and tested, saving development time.',
        '<strong>By value</strong>: a copy of the argument is passed; changes inside the subroutine do not affect the original variable.',
        '<strong>By reference</strong>: the address of the original variable is passed; changes inside the subroutine change the original.'
      ],
      code: 'PROCEDURE addTen(n)      // n is passed by value\n    n ← n + 10\nENDPROCEDURE\n\nscore ← 5\naddTen(score)\nOUTPUT score             // outputs 5; by reference it would output 15'
    },
    {
      heading: 'Scope and lifetime',
      points: [
        'A <strong>local variable</strong> is declared inside a subroutine. It can only be used there (its scope) and exists only while the subroutine runs (its lifetime).',
        'A <strong>global variable</strong> is declared in the main program and can be used anywhere; it exists for the whole run of the program.',
        'Local variables are preferred: they avoid accidental changes from other parts of the program, the same name can be reused in different subroutines, memory is freed when the subroutine ends, and subroutines are self-contained, so easier to test and reuse.'
      ]
    },
    {
      heading: 'Recursion',
      points: [
        'A recursive subroutine calls itself. It must have a <strong>base case</strong> that stops the recursion, and each call must move closer to that base case.',
        'Each call is placed on the call stack with its own parameters, local variables and return address. Without a base case (or with very deep recursion) the stack runs out of space: a <strong>stack overflow</strong>.',
        'Recursion can be elegant and closely match problems that are naturally recursive (tree traversal, quicksort, factorial), but it usually uses more memory and can be slower than an equivalent iterative solution.'
      ],
      code: 'FUNCTION sumTo(n)\n    IF n = 0 THEN\n        RETURN 0                 // base case\n    ELSE\n        RETURN n + sumTo(n - 1)  // recursive call\n    ENDIF\nENDFUNCTION\n\n// sumTo(4) = 4 + 3 + 2 + 1 + 0 = 10'
    },
    {
      heading: 'Object-oriented programming',
      points: [
        'A <strong>class</strong> is a template (blueprint) defining the attributes (data) and methods (subroutines) shared by a type of object. An <strong>object</strong> is an instance of a class with its own attribute values.',
        '<strong>Encapsulation</strong>: an object’s attributes are kept private and can only be accessed or changed through its methods (for example getters and setters), protecting the data from invalid changes.',
        '<strong>Inheritance</strong>: a subclass takes on the attributes and methods of its superclass and can add its own, so common code is written once (for example <code>SavingsAccount</code> inherits from <code>Account</code>).',
        '<strong>Polymorphism</strong>: objects of different classes can respond to the same method call in their own way, for example by overriding an inherited method.',
        'Benefits: reusable, modular code that models real-world entities and is easier to maintain and extend.'
      ]
    },
    {
      heading: 'Programming paradigms and language levels',
      points: [
        '<strong>Procedural</strong>: a sequence of instructions organised into procedures and functions (for example a data-processing script).',
        '<strong>Object-oriented</strong>: programs built from interacting objects.',
        '<strong>Event-driven</strong>: code runs in response to events such as clicks, key presses or sensor signals; typical of graphical user interfaces.',
        '<strong>Visual</strong>: programs are created by arranging graphical blocks or components (for example block-based languages for learning).',
        '<strong>Mark-up</strong> languages (such as HTML) describe the structure and presentation of content rather than giving instructions to process it.',
        '<strong>Low-level</strong> languages (machine code and assembly) are processor-specific and give direct control of hardware and memory, producing fast, compact code (for example device drivers and embedded systems). <strong>High-level</strong> languages are closer to English, portable between processors and quicker to write and debug.'
      ]
    },
    {
      heading: 'Defining syntax: BNF and syntax diagrams',
      points: [
        'Natural languages are ambiguous, so programming languages need a precisely defined syntax. Standardised languages also let programs work with different compilers and platforms, although agreeing and implementing standards can be slow and difficult.',
        '<strong>Backus–Naur form (BNF)</strong> defines syntax with rules. <code>::=</code> means “is defined as”, <code>|</code> means “or”, and terms in angle brackets are defined elsewhere. Rules can be recursive.',
        '<strong>Syntax diagrams</strong> show the same rules graphically: follow the arrows; rectangles are defined elsewhere and rounded boxes are literal symbols.'
      ],
      code: '<digit>   ::= 0|1|2|3|4|5|6|7|8|9\n<integer> ::= <digit> | <digit><integer>\n\n// "7", "42" and "007" are valid <integer>s; "-5" and "3.5" are not.'
    },
    {
      heading: 'Translators and development tools',
      points: [
        'An <strong>assembler</strong> translates assembly language into machine code.',
        'A <strong>compiler</strong> translates the whole high-level program into machine code (object code) before it runs. The executable runs quickly without the compiler and the source code is not distributed, but errors are reported only after the whole program is compiled.',
        'An <strong>interpreter</strong> translates and runs the program one statement at a time. It stops at the first error, which helps debugging, but the program runs more slowly and the interpreter is needed every time it runs.',
        'Stages of compilation (as listed in the WJEC specification): lexical analysis (remove whitespace and comments, split into tokens), symbol table construction, syntax analysis (check the tokens follow the grammar), semantic analysis (for example type checking), code generation and optimisation.',
        '<strong>Translation errors</strong> (such as syntax errors) are found during translation. <strong>Execution errors</strong> (run-time errors, such as division by zero) occur when the program runs. Logic errors give wrong results without crashing.',
        'An <strong>IDE</strong> provides an editor (with syntax highlighting and auto-completion), a translator, and debugging tools such as breakpoints, stepping through code and watching variables.'
      ]
    }
  ],
  misconceptions: [
    { wrong: 'A WHILE loop always runs at least once.', right: 'WHILE tests its condition first, so it may run zero times. REPEAT … UNTIL always runs at least once.' },
    { wrong: 'Passing by value lets a procedure change the caller’s variable.', right: 'By value passes a copy; only passing by reference changes the original.' },
    { wrong: 'A class and an object are the same thing.', right: 'A class is the template; an object is a particular instance created from it.' },
    { wrong: 'Recursion is always better than iteration.', right: 'Recursion can be elegant but uses stack space for each call and can be slower; very deep recursion can cause stack overflow.' }
  ],
  examTips: [
    'When writing algorithms, use clear indentation and meaningful identifiers; examiners need to follow your logic.',
    'When predicting output, trace the code carefully rather than guessing: write down each variable change.',
    'When asked for an OOP term, give a definition and a short example from the question’s context.'
  ],
  flashcards: [
    { id: 'prog-fc-1', front: 'What is the difference between a variable and a constant?', back: 'A variable’s value can change while the program runs; a constant’s value cannot.' },
    { id: 'prog-fc-2', front: '17 DIV 5 and 17 MOD 5?', back: '17 DIV 5 = 3; 17 MOD 5 = 2.' },
    { id: 'prog-fc-3', front: 'Which loop always runs at least once?', back: 'A post-condition loop: REPEAT … UNTIL (or DO … WHILE).' },
    { id: 'prog-fc-4', front: 'What is a rogue value?', back: 'A special value, outside the range of valid data, used to mark the end of input (for example −1).' },
    { id: 'prog-fc-5', front: 'Function or procedure: which returns a value?', back: 'A function.' },
    { id: 'prog-fc-6', front: 'Passing by value vs by reference?', back: 'By value passes a copy (the original is unchanged); by reference passes the address, so changes affect the original.' },
    { id: 'prog-fc-7', front: 'Why are local variables preferred to global variables?', back: 'They cannot be changed accidentally elsewhere, names can be reused, memory is freed after use, and subroutines are self-contained.' },
    { id: 'prog-fc-8', front: 'What two features must a recursive subroutine have?', back: 'A base case that stops the recursion, and recursive calls that move towards the base case.' },
    { id: 'prog-fc-9', front: 'Define encapsulation.', back: 'Keeping an object’s attributes private, so they can only be accessed or changed through its methods.' },
    { id: 'prog-fc-10', front: 'Define inheritance.', back: 'A subclass takes on the attributes and methods of its superclass, and can add or override its own.' },
    { id: 'prog-fc-11', front: 'What is event-driven programming?', back: 'Code that runs in response to events such as mouse clicks, key presses or messages.' },
    { id: 'prog-fc-12', front: 'In BNF, what do ::= and | mean?', back: '::= means “is defined as”; | means “or”.' },
    { id: 'prog-fc-13', front: 'Compiler vs interpreter: which produces a stand-alone executable?', back: 'A compiler.' },
    { id: 'prog-fc-14', front: 'What happens in lexical analysis?', back: 'Whitespace and comments are removed and the source code is split into tokens; identifiers are added to the symbol table.' }
  ],
  questions: [
    {
      id: 'prog-q1', type: 'input', skill: 'application',
      question: 'What is the value of <code>17 MOD 5</code>?',
      accept: ['2'],
      explanation: '17 = 3 × 5 + 2, so the remainder is 2. (17 DIV 5 = 3.)'
    },
    {
      id: 'prog-q2', type: 'input', skill: 'application',
      question: 'What is output by this pseudo-code?',
      code: 'total ← 0\nFOR i ← 1 TO 4\n    total ← total + i * 2\nENDFOR\nOUTPUT total',
      accept: ['20'],
      explanation: 'total = 2 + 4 + 6 + 8 = 20.'
    },
    {
      id: 'prog-q3', type: 'mcq', skill: 'recall',
      question: 'Which kind of loop is guaranteed to execute its body at least once?',
      options: ['REPEAT … UNTIL', 'WHILE … ENDWHILE', 'FOR … ENDFOR', 'None: every loop can run zero times'],
      answer: 0,
      feedback: ['', 'WHILE tests the condition first, so if it is false initially the body never runs.', 'A FOR loop such as FOR i ← 1 TO 0 runs zero times.', 'REPEAT … UNTIL tests at the end, so it always runs once.'],
      explanation: 'A post-condition loop checks its condition after running the body.'
    },
    {
      id: 'prog-q4', type: 'input', skill: 'application',
      question: 'In the code below, <code>n</code> is passed <strong>by value</strong>. What is output?',
      code: 'PROCEDURE addTen(n)\n    n ← n + 10\nENDPROCEDURE\n\nscore ← 5\naddTen(score)\nOUTPUT score',
      accept: ['5'],
      explanation: 'A copy of <code>score</code> is passed, so changing <code>n</code> does not change <code>score</code>. By reference, the output would be 15.'
    },
    {
      id: 'prog-q5', type: 'mcq', skill: 'application',
      question: 'If <code>n</code> in the procedure <code>addTen</code> (which adds 10 to <code>n</code>) were passed <strong>by reference</strong>, and <code>score</code> was 5 before the call, what would <code>OUTPUT score</code> display after the call?',
      options: ['15', '5', '10', 'An error, because procedures cannot change variables'],
      answer: 0,
      feedback: ['', 'This would be the result when passing by value.', '10 is the amount added, not the final value.', 'Procedures can change variables passed by reference.'],
      explanation: 'By reference passes the address of <code>score</code>, so the procedure changes the original variable.'
    },
    {
      id: 'prog-q6', type: 'mcq', skill: 'recall',
      question: 'What is the scope of a local variable?',
      options: ['Only the subroutine in which it is declared', 'The whole program', 'Every subroutine with the same name', 'Only the main program, not subroutines'],
      answer: 0,
      feedback: ['', 'That describes a global variable.', 'Scope depends on where a variable is declared, not on subroutine names.', 'This is not how local scope works.'],
      explanation: 'A local variable can only be accessed inside its subroutine and exists only while it runs.'
    },
    {
      id: 'prog-q7', type: 'input', skill: 'application',
      question: 'What value is returned by <code>sumTo(4)</code>?',
      code: 'FUNCTION sumTo(n)\n    IF n = 0 THEN\n        RETURN 0\n    ELSE\n        RETURN n + sumTo(n - 1)\n    ENDIF\nENDFUNCTION',
      accept: ['10'],
      explanation: 'sumTo(4) = 4 + sumTo(3) = 4 + 3 + sumTo(2) = … = 4 + 3 + 2 + 1 + 0 = 10.'
    },
    {
      id: 'prog-q8', type: 'mcq', skill: 'application',
      question: 'The line <code>IF n = 0 THEN RETURN 0</code> is removed from <code>sumTo</code>. What happens when <code>sumTo(4)</code> is called?',
      options: ['It keeps calling itself until the call stack runs out of memory (stack overflow)', 'It returns 0', 'It returns 10 more slowly', 'It returns 4'],
      answer: 0,
      feedback: ['', 'With no base case, nothing ever returns 0.', 'Without a base case it never reaches an answer.', 'Every call makes another call, so nothing is returned.'],
      explanation: 'Without a base case, n becomes −1, −2, … and each call adds a frame to the stack until it overflows.'
    },
    {
      id: 'prog-q9', type: 'mcq', skill: 'recall',
      question: 'Which statement best describes the relationship between a class and an object?',
      options: ['An object is an instance of a class', 'A class is an instance of an object', 'A class is a method belonging to an object', 'They are two names for the same thing'],
      answer: 0,
      feedback: ['', 'This is reversed: the class is the template.', 'Methods belong to classes; a class is not a method.', 'A class is the blueprint; many objects can be created from it.'],
      explanation: 'For example, <code>Car</code> is a class; <code>myCar</code> with colour “red” is an object of that class.'
    },
    {
      id: 'prog-q10', type: 'mcq', skill: 'application',
      question: 'Classes <code>Car</code> and <code>Lorry</code> both need the attributes <code>registration</code> and <code>mileage</code>. Which OOP feature avoids writing these twice?',
      options: ['Inheritance from a common superclass such as Vehicle', 'Encapsulation', 'Using global variables', 'Polymorphism alone'],
      answer: 0,
      feedback: ['', 'Encapsulation hides data behind methods; it does not share code between classes.', 'Global variables are not part of a class and break encapsulation.', 'Polymorphism lets methods behave differently; the shared attributes still need to come from somewhere.'],
      explanation: 'Car and Lorry inherit the shared attributes and methods from Vehicle and add their own.'
    },
    {
      id: 'prog-q11', type: 'mcq', skill: 'recall',
      question: 'An attribute <code>balance</code> is private and can only be changed by the methods <code>deposit()</code> and <code>withdraw()</code>, which check the amount is valid. Which principle is this?',
      options: ['Encapsulation', 'Inheritance', 'Recursion', 'Iteration'],
      answer: 0,
      feedback: ['', 'Inheritance is about a subclass acquiring a superclass’s members.', 'Recursion is a subroutine calling itself.', 'Iteration is repetition using loops.'],
      explanation: 'Encapsulation protects data by controlling access through methods.'
    },
    {
      id: 'prog-q12', type: 'mcq', skill: 'application',
      question: 'Using the rules <code>&lt;digit&gt; ::= 0|1|2|3|4|5|6|7|8|9</code> and <code>&lt;integer&gt; ::= &lt;digit&gt; | &lt;digit&gt;&lt;integer&gt;</code>, which is a valid <code>&lt;integer&gt;</code>?',
      options: ['007', '-5', '3.5', 'An empty string'],
      answer: 0,
      feedback: ['', 'The rules contain no minus sign.', 'The rules contain no decimal point.', 'An integer must contain at least one digit.'],
      explanation: '007 is a digit (0) followed by an integer (07), which is a digit followed by an integer (7).'
    },
    {
      id: 'prog-q13', type: 'mcq', skill: 'recall',
      question: 'Which stage of compilation removes comments and whitespace and splits the source code into tokens?',
      options: ['Lexical analysis', 'Syntax analysis', 'Code generation', 'Optimisation'],
      answer: 0,
      feedback: ['', 'Syntax analysis checks that the tokens follow the grammar rules; it works on tokens already produced.', 'Code generation produces the machine code at the end.', 'Optimisation improves the generated code.'],
      explanation: 'Lexical analysis comes first and produces a stream of tokens.'
    },
    {
      id: 'prog-q14', type: 'mcq', skill: 'application',
      question: 'A developer is still writing and testing a program and wants to find errors one at a time while it runs. Which translator is most helpful?',
      options: ['An interpreter', 'A compiler', 'An assembler', 'A linker'],
      answer: 0,
      feedback: ['', 'A compiler reports errors only after translating the whole program, and does not run code line by line.', 'An assembler translates assembly language, not high-level code.', 'A linker combines compiled modules; it does not translate source code.'],
      explanation: 'An interpreter runs code statement by statement and stops at the first error.'
    },
    {
      id: 'prog-q15', type: 'input', skill: 'application',
      question: 'What does this Python program print?',
      code: 'def mystery(word):\n    result = ""\n    for ch in word:\n        result = ch + result\n    return result\n\nprint(mystery("data"))',
      accept: ['atad'],
      explanation: 'Each character is added to the <em>front</em> of <code>result</code>: d, ad, tad, atad. The function reverses the string.'
    },
    {
      id: 'prog-q16', type: 'mcq', skill: 'recall',
      question: 'Which is the best example of event-driven programming?',
      options: ['A program where a subroutine runs when the user clicks a button', 'A script that processes every line of a file from top to bottom', 'An HTML page describing headings and paragraphs', 'A program written entirely in assembly language'],
      answer: 0,
      feedback: ['', 'Running through a file in order is procedural.', 'HTML is a mark-up language.', 'Assembly language is a low-level language; it says nothing about events.'],
      explanation: 'In event-driven programs, event handlers run in response to events such as clicks.'
    },
    {
      id: 'prog-q17', type: 'mcq', skill: 'technique',
      question: 'You are asked to write an algorithm in an exam. Which practice is most likely to help an examiner award marks?',
      options: ['Meaningful identifiers, consistent indentation and clear structure', 'Writing in a single line to save space', 'Using single-letter names for every variable', 'Leaving out ENDIF and ENDWHILE to save time'],
      answer: 0,
      feedback: ['', 'Cramming code onto one line makes the logic hard to follow.', 'Single letters make it hard to see what each variable is for.', 'Without clear ends of blocks, the structure can be ambiguous.'],
      explanation: 'Examiners can only credit logic they can follow. Exact syntax rarely matters in pseudo-code, but clarity does.'
    }
  ],
  exam: [
    {
      id: 'prog-e1', marks: 4,
      question: 'Explain the difference between local and global variables, and why programmers are encouraged to use local variables.',
      markPoints: [
        'A local variable is declared within a subroutine and can only be accessed there.',
        'A global variable is declared in the main program and can be accessed anywhere.',
        'Local variables only exist (use memory) while the subroutine runs.',
        'Using local variables prevents accidental changes from other parts of the program, making errors less likely.',
        'Subroutines with local variables are self-contained, so they are easier to test, reuse and maintain; the same identifier can be reused in different subroutines.'
      ],
      technique: 'Define both terms first, then give reasons. “Explain why” needs reasons, not just facts.'
    },
    {
      id: 'prog-e2', marks: 4,
      question: 'Describe what is meant by recursion and discuss one advantage and one disadvantage of a recursive solution compared with an iterative one.',
      markPoints: [
        'Recursion is when a subroutine calls itself.',
        'It needs a base case (stopping condition), and each call must move towards it.',
        'Advantage: the code can be shorter and more elegant, closely matching naturally recursive problems (for example tree traversal).',
        'Disadvantage: each call uses stack memory for parameters, local variables and the return address…',
        '…so it uses more memory, may be slower, and very deep recursion can cause a stack overflow.'
      ],
      technique: 'Structure: definition → base case → one advantage → one disadvantage with a reason.'
    },
    {
      id: 'prog-e3', marks: 4,
      context: 'A library system has a class <code>Item</code> with attributes <code>title</code> and <code>loanPeriod</code>. Classes <code>Book</code> and <code>DVD</code> are based on <code>Item</code>.',
      question: 'Explain how inheritance and encapsulation could be used in this system.',
      markPoints: [
        'Inheritance: Book and DVD are subclasses that inherit title and loanPeriod (and methods) from Item…',
        '…so common code is written once; each subclass adds its own attributes, for example author for Book or runningTime for DVD.',
        'Encapsulation: attributes such as loanPeriod are private…',
        '…and can only be read or changed through methods (for example setLoanPeriod), which can validate values and protect the data.'
      ],
      technique: 'Apply the terms to the scenario. Generic definitions alone usually gain only half the marks.'
    },
    {
      id: 'prog-e4', marks: 4,
      question: 'Describe the differences between a compiler and an interpreter.',
      markPoints: [
        'A compiler translates the whole program before it is run; an interpreter translates and executes one statement at a time.',
        'A compiler produces an executable (object code) file; an interpreter does not.',
        'Compiled programs run faster because translation is already done; interpreted programs are translated every time they run.',
        'The compiler is not needed to run the executable, whereas the interpreter is needed every time.',
        'A compiler lists errors after compiling the whole program; an interpreter stops at the first error it meets, which can help debugging.'
      ],
      technique: 'Write each difference as a pair: “A compiler … whereas an interpreter …”.'
    }
  ],
  traces: [
    {
      id: 'prog-t1',
      title: 'Nested loops',
      intro: '<p>Complete one row for each value that is output, showing <code>i</code>, <code>j</code> and the output at that moment.</p>',
      code: 'FOR i ← 1 TO 3\n    FOR j ← 1 TO i\n        OUTPUT i * j\n    ENDFOR\nENDFOR',
      columns: ['i', 'j', 'Output'],
      rows: [
        ['1', '1', '1'],
        ['2', '1', '2'],
        ['2', '2', '4'],
        ['3', '1', '3'],
        ['3', '2', '6'],
        ['3', '3', '9']
      ],
      explanation: 'The inner loop runs from 1 up to the current value of <code>i</code>, so it runs once, then twice, then three times: 6 outputs in total.'
    },
    {
      id: 'prog-t2',
      title: 'Average with a rogue value',
      intro: '<p>The user enters 12, 7, 20 and then −1. Complete one row for each pass through the loop, showing values at the end of the pass. The last row shows the values after the loop has finished. Leave the output cell empty when nothing is output.</p>',
      code: 'total ← 0\ncount ← 0\nnum ← INPUT\nWHILE num <> -1\n    total ← total + num\n    count ← count + 1\n    num ← INPUT\nENDWHILE\nOUTPUT total / count',
      columns: ['total', 'count', 'num', 'Output'],
      rows: [
        ['12', '1', '7', ''],
        ['19', '2', '20', ''],
        ['39', '3', '-1', ''],
        ['39', '3', '-1', '13']
      ],
      given: [[3, 0], [3, 1], [3, 2]],
      explanation: 'The first number is read before the loop. Each pass adds the current number and then reads the next. When −1 (the rogue value) is read, the loop condition fails, so −1 is never added. 39 ÷ 3 = 13.'
    },
    {
      id: 'prog-t3',
      title: 'Tracing recursive calls',
      intro: '<p>Using the <code>sumTo</code> function, complete one row for each call made when <code>sumTo(3)</code> is called, in the order the calls are made. Show the value of <code>n</code> and the value that call eventually returns.</p>',
      code: 'FUNCTION sumTo(n)\n    IF n = 0 THEN\n        RETURN 0\n    ELSE\n        RETURN n + sumTo(n - 1)\n    ENDIF\nENDFUNCTION',
      columns: ['Call', 'n', 'Returns'],
      rows: [
        ['sumTo(3)', '3', '6'],
        ['sumTo(2)', '2', '3'],
        ['sumTo(1)', '1', '1'],
        ['sumTo(0)', '0', '0']
      ],
      given: [[0, 0], [1, 0], [2, 0], [3, 0]],
      explanation: 'The calls are made in the order 3, 2, 1, 0, but they return in reverse order: sumTo(0) returns 0 (base case), so sumTo(1) returns 1 + 0 = 1, sumTo(2) returns 2 + 1 = 3 and sumTo(3) returns 3 + 3 = 6.'
    }
  ]
});
