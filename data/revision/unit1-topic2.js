/*
 * Revision: Unit 1, Topic 2 – Logical operations.
 * Written only from the Topic 2 lesson resources (resources/unit1/topic2): the slides, the
 * cheat sheet, starters and practice pages. Items are in specification order; every item has
 * `spec` and `lesson`. NOT is written as <span class="ovl">A</span> (a bar over the letter).
 */
RS.content.registerTopic({
  id: 'u1-t2',
  unit: 1,
  topic: 2,
  title: 'Logical operations',
  icon: 'logic',
  colour: 'slate',
  summary: 'Boolean notation, truth tables for AND, OR, NOT and XOR, “find the 1s”, masking and clearing registers, and simplifying with the nine Boolean laws, one law per line.',
  keywords: ['Boolean', 'truth table', 'AND', 'OR', 'NOT', 'XOR', 'notation', 'order of operations', '2^n', 'find the 1s', 'mask', 'masking', 'clearing', 'register', 'identity', 'annulment', 'idempotent', 'complement', 'commutative', 'associative', 'involution', 'distributive', 'absorption', 'factorise', 'force factorise', 'simplify'],
  specRefs: [
    'Lesson 1 – 2.1.1 truth tables',
    'Lesson 2 – 2.1.2 masking and clearing registers; 2.1.3 the seven identity laws',
    'Lesson 3 – 2.1.3 distribution, factoring and absorption',
    'Lesson 4 – 2.1.3 the full toolkit and exam practice'
  ],

  /* =================================================================== NOTES */
  notes: [
    /* ---------- 2.1.1 ---------- */
    {
      spec: '2.1.1', lesson: 1,
      heading: 'Boolean notation you need to know',
      html: '<table><thead><tr><th scope="col">Symbol</th><th scope="col">Operator</th><th scope="col">Meaning</th></tr></thead><tbody>' +
        '<tr><td>A . B (or AB)</td><td>AND</td><td>True only when both A and B are true</td></tr>' +
        '<tr><td>A + B</td><td>OR</td><td>True when at least one of A or B is true</td></tr>' +
        '<tr><td><span class="ovl">A</span> (or ¬A)</td><td>NOT</td><td>Reverses the value of A</td></tr>' +
        '<tr><td>A ⊕ B</td><td>XOR</td><td>True when A and B are different</td></tr>' +
        '</tbody></table>' +
        '<p><strong>Order of operations:</strong> Brackets → NOT → AND → OR. Just like BIDMAS: AND behaves like ×, OR behaves like +.</p>'
    },
    {
      spec: '2.1.1', lesson: 1,
      heading: 'Series and parallel → AND and OR',
      points: [
        '<strong>Series circuit</strong> – both switches must be ON for current to flow: <strong>AND</strong>, A . B, true only when A = 1 AND B = 1.',
        '<strong>Parallel circuit</strong> – either switch being ON is enough for current to flow: <strong>OR</strong>, A + B, true when A = 1 OR B = 1 (or both).'
      ]
    },
    {
      spec: '2.1.1', lesson: 1,
      heading: 'The four core operators',
      html: '<table><thead><tr><th scope="col">A</th><th scope="col">B</th><th scope="col">A.B</th><th scope="col">A+B</th><th scope="col">A⊕B</th></tr></thead><tbody>' +
        '<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>' +
        '<tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>' +
        '<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>' +
        '<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>' +
        '</tbody></table>' +
        '<p>NOT only takes one input, so its table has 2 rows: A = 0 → <span class="ovl">A</span> = 1; A = 1 → <span class="ovl">A</span> = 0. XOR (“exclusive or”): are A and B <em>different</em>?</p>'
    },
    {
      spec: '2.1.1', lesson: 1,
      heading: 'Always start at 00, end at 11 – and the 2ⁿ rule',
      points: [
        'Before filling in any values, list every combination of inputs in order. It’s the same pattern as counting in binary: 00, 01, 10, 11 – so you never miss a row or repeat one.',
        'The number of rows depends on the number of inputs: <strong>2<sup>n</sup></strong>. 1 input → 2 rows; 2 → 4; 3 → 8; 4 → 16.',
        'With 3 inputs, count from 000 to 111: 000, 001, 010, 011, 100, 101, 110, 111.',
        'For a longer expression, work left to right one column at a time, deciding the working order with the precedence rules – for example A.B first, then (A.B) + C.'
      ]
    },
    {
      spec: '2.1.1', lesson: 1,
      heading: 'The reverse skill: table → expression (“find the 1s”)',
      html: '<ol>' +
        '<li><strong>Find the 1s</strong> – look only at the rows where the output is 1; ignore every row where it’s 0.</li>' +
        '<li><strong>Write a term per row</strong> – for each of those rows, AND the inputs together: use the letter if it’s 1, NOT the letter if it’s 0.</li>' +
        '<li><strong>OR the terms together</strong> – that’s your expression.</li>' +
        '</ol>' +
        '<p>Example: output = 1 when A = 0, B = 1 and when A = 1, B = 0 → <span class="ovl">A</span>.B + A.<span class="ovl">B</span>. This is the same pattern as XOR.</p>'
    },

    /* ---------- 2.1.2 ---------- */
    {
      spec: '2.1.2', lesson: 2,
      heading: 'What is masking?',
      points: [
        'A <strong>mask</strong> is a pattern of bits used with AND to check or change specific bits in a register, without disturbing the rest.',
        'Where a bit in the mask is 1, the original bit is preserved (checked). Where it’s 0, the result is forced to 0.',
        '<strong>The three-part skill</strong> – three separate marks: <strong>1. State the mask</strong> (the bit pattern you’ll AND with); <strong>2. Name the operation</strong> (it’s AND); <strong>3. Give the result</strong> (work it out, bit by bit).',
        'AND behaves just like × for single bits: multiply each register bit by the mask bit in that position.'
      ]
    },
    {
      spec: '2.1.2', lesson: 2,
      heading: 'Worked example: is the most significant bit set to 1?',
      html: '<table><thead><tr><th scope="col"></th><th scope="col">Bits</th></tr></thead><tbody>' +
        '<tr><td>Register</td><td><code>10110101</code></td></tr>' +
        '<tr><td>Mask</td><td><code>10000000</code></td></tr>' +
        '<tr><td>Result (AND)</td><td><code>10000000</code></td></tr>' +
        '</tbody></table>' +
        '<p>1. Mask: 10000000 · 2. Operation: AND · 3. Result: 10000000. The result is not all zero, so the MSB is 1.</p>'
    },
    {
      spec: '2.1.2', lesson: 2,
      heading: 'Clearing bits in a register',
      points: [
        '<strong>Clearing</strong> means forcing specific bits to 0 while leaving every other bit exactly as it was.',
        '<strong>The rule</strong> – still AND, the same operation as masking. Put a <strong>1</strong> in the mask for every bit you want to <strong>keep</strong>, and a <strong>0</strong> for every bit you want to <strong>clear</strong>.',
        'Masking asks a question (is this bit 1?). Clearing changes the register (force these bits to 0) – same tool, different purpose.',
        'Example – clear the rightmost 4 bits: register <code>11011010</code> AND mask <code>11110000</code> = <code>11010000</code>. The left 4 bits (1101) are unchanged; the right 4 are forced to 0000.'
      ]
    },

    /* ---------- 2.1.3 ---------- */
    {
      spec: '2.1.3', lesson: 2,
      heading: 'Seven laws you’ll use constantly',
      html: '<table><thead><tr><th scope="col">Law</th><th scope="col">AND form</th><th scope="col">OR form</th></tr></thead><tbody>' +
        '<tr><td>Identity</td><td>A . 1 = A</td><td>A + 0 = A</td></tr>' +
        '<tr><td>Annulment</td><td>A . 0 = 0</td><td>A + 1 = 1</td></tr>' +
        '<tr><td>Idempotent</td><td>A . A = A</td><td>A + A = A</td></tr>' +
        '<tr><td>Complement</td><td>A . <span class="ovl">A</span> = 0</td><td>A + <span class="ovl">A</span> = 1</td></tr>' +
        '<tr><td>Commutative</td><td>A . B = B . A</td><td>A + B = B + A</td></tr>' +
        '<tr><td>Associative</td><td>(A.B).C = A.(B.C)</td><td>(A+B)+C = A+(B+C)</td></tr>' +
        '<tr><td>Involution</td><td>¬(¬A) = A</td><td>—</td></tr>' +
        '</tbody></table>' +
        '<p>Each law can be <em>proved</em> with a truth table: two expressions are equivalent if they produce identical output columns for every combination of inputs.</p>'
    },
    {
      spec: '2.1.3', lesson: 2,
      heading: 'What each law means',
      points: [
        '<strong>Identity</strong> – combining with 1 (AND) or 0 (OR) never changes the value.',
        '<strong>Annulment</strong> – ANDing with 0 always gives 0; ORing with 1 always gives 1. The value of A doesn’t matter.',
        '<strong>Idempotent</strong> – combining A with itself, either way, just gives A back.',
        '<strong>Complement</strong> – A and NOT A can never both be true, and between them cover every case.',
        '<strong>Commutative</strong> – the order of the inputs doesn’t matter.',
        '<strong>Associative</strong> – it doesn’t matter how you group three or more terms with the same operator; the brackets can move.',
        '<strong>Involution</strong> – two NOTs cancel out. Spot a double negation and remove both bars in one step.'
      ]
    },
    {
      spec: '2.1.3', lesson: 2,
      heading: 'From now on: one law per line',
      points: [
        'Every simplification question is marked <strong>one point per correct line</strong> – not one point for the final answer. Skipping steps loses marks, even if your final answer is right.',
        '<strong>Truth tables are NOT accepted as a simplification method.</strong> They’re brilliant for proving a law holds, but a simplification question needs algebraic steps, one law at a time.',
        'Write the name of the law next to every line, even for the simple ones.'
      ],
      html: '<p><strong>Worked example:</strong> simplify B . (A + <span class="ovl">A</span>)<br>' +
        '= B . 1 &nbsp;&nbsp;(Complement: A + <span class="ovl">A</span> = 1)<br>' +
        '= B &nbsp;&nbsp;(Identity: B . 1 = B)</p>'
    },
    {
      spec: '2.1.3', lesson: 3,
      heading: 'The distributive law – two forms',
      points: [
        '<strong>AND over OR</strong>: A.(B + C) = A.B + A.C – the familiar one, just like multiplying out a bracket in normal algebra.',
        '<strong>OR over AND</strong>: A + (B.C) = (A+B).(A+C) – this one only exists in Boolean algebra; there’s no arithmetic equivalent.',
        '<strong>How to spot which form to use</strong>: look at the operator OUTSIDE the bracket. AND outside → AND over OR. OR outside → OR over AND.'
      ],
      html: '<p>Examples: A.(B + <span class="ovl">A</span>) = A.B + A.<span class="ovl">A</span> (AND over OR) · B + (A.C) = (B+A).(B+C) (OR over AND)</p>'
    },
    {
      spec: '2.1.3', lesson: 3,
      heading: 'Factoring – the reverse skill',
      points: [
        'The same law, used backwards: spot a term that appears in both parts, and pull it outside a bracket.',
        'A.B + A.C = A.(B + C) – common factor: A appears in both terms.',
        '(A+B).(A+C) = A + (B.C) – common term: A appears in both brackets.',
        'Not sure you’ve factored correctly? Expand your answer back out – if you get back to where you started, it’s right.'
      ]
    },
    {
      spec: '2.1.3', lesson: 3,
      heading: 'The absorption law and “force factorise”',
      html: '<p><strong>A + A.B = A</strong> – adding A.B on top of A adds nothing new; A already covers it. <strong>A.(A + B) = A</strong> – ANDing with something that already contains A changes nothing.</p>' +
        '<p><strong>Proving it algebraically: force factorise</strong> – rewrite the lone term using Identity so there’s something to factorise with, then Annulment clears the extra bracket.</p>' +
        '<table><thead><tr><th scope="col">A + A.B</th><th scope="col">Law</th><th scope="col">A.(A + B)</th><th scope="col">Law</th></tr></thead><tbody>' +
        '<tr><td>= A.1 + A.B</td><td>Identity</td><td>= (A+0).(A+B)</td><td>Identity</td></tr>' +
        '<tr><td>= A.(1 + B)</td><td>Factorise</td><td>= A + (0.B)</td><td>Factorise (OR over AND)</td></tr>' +
        '<tr><td>= A.1</td><td>Annulment</td><td>= A + 0</td><td>Annulment</td></tr>' +
        '<tr><td>= A</td><td>Identity</td><td>= A</td><td>Identity</td></tr>' +
        '</tbody></table>'
    },
    {
      spec: '2.1.3', lesson: 3,
      heading: 'Extended absorption – four NOT A patterns',
      html: '<table><thead><tr><th scope="col">Expression</th><th scope="col">Simplifies to</th><th scope="col">How</th></tr></thead><tbody>' +
        '<tr><td><span class="ovl">A</span>.(A.B)</td><td>0</td><td>Associative, then Complement (<span class="ovl">A</span>.A = 0), then Annulment</td></tr>' +
        '<tr><td><span class="ovl">A</span>.(A+B)</td><td><span class="ovl">A</span>.B</td><td>AND over OR, Complement (<span class="ovl">A</span>.A = 0), Identity</td></tr>' +
        '<tr><td><span class="ovl">A</span>+(A.B)</td><td><span class="ovl">A</span>+B</td><td>OR over AND, Complement (<span class="ovl">A</span>+A = 1), Identity</td></tr>' +
        '<tr><td><span class="ovl">A</span>+(A+B)</td><td>1</td><td>Associative, Complement (<span class="ovl">A</span>+A = 1), Annulment</td></tr>' +
        '</tbody></table>' +
        '<p>Not separate laws – just the laws above, applied when one term is negated. Whenever <span class="ovl">A</span> meets A in the same term they cancel: to 0 with AND, to 1 with OR.</p>'
    },
    {
      spec: '2.1.3', lesson: 4,
      heading: 'The full toolkit – nine laws',
      html: '<p>Every simplification question – however long – is just these nine laws, applied one at a time: the seven from Lesson 2 plus:</p>' +
        '<table><thead><tr><th scope="col">Law</th><th scope="col">Form 1</th><th scope="col">Form 2</th></tr></thead><tbody>' +
        '<tr><td>Distributive</td><td>A.(B+C) = A.B + A.C</td><td>A+(B.C) = (A+B).(A+C)</td></tr>' +
        '<tr><td>Absorption</td><td>A.(A+B) = A</td><td>A + A.B = A</td></tr>' +
        '</tbody></table>' +
        '<p>Brackets → NOT → AND → OR · <span class="ovl">A</span> means NOT A · no truth tables for simplification marks.</p>'
    },
    {
      spec: '2.1.3', lesson: 4,
      heading: 'What costs marks?',
      points: [
        'Jumping straight to the answer, skipping lines.',
        'Applying a law correctly but not naming it.',
        'Reaching for a truth table instead of an algebraic step.',
        'Stopping one step too early – check it’s fully simplified.',
        'Not spotting a common factor already staring back at you.',
        'Strategy for long questions: expand first, then absorb one term at a time.'
      ]
    }
  ],

  /* ===================================================== MISCONCEPTIONS (from the lessons) */
  misconceptions: [
    { spec: '2.1.1', lesson: 1, wrong: 'OR is worked out before AND.', right: 'The order is Brackets → NOT → AND → OR, so A + B . C means A + (B . C).' },
    { spec: '2.1.2', lesson: 2, wrong: 'A 0 in the mask keeps the bit unchanged.', right: 'With AND, a 0 in the mask forces the result to 0. A 1 keeps the original bit.' },
    { spec: '2.1.3', lesson: 2, wrong: 'A truth table is a valid way to answer a simplification question.', right: 'Truth tables prove a law holds, but simplification needs algebraic steps – one law per line, each law named.' }
  ],

  /* ===================================================== EXAM TECHNIQUE (from the lessons) */
  examTips: [
    { spec: '2.1.1', lesson: 1, text: 'List every input combination in binary order (000 → 111) before filling in any values, so you never miss or repeat a row.' },
    { spec: '2.1.2', lesson: 2, text: 'Masking questions are three separate marks: state the mask, name the operation (AND), give the result.' },
    { spec: '2.1.3', lesson: 2, text: 'One law per line, and name the law on every line – marks are given per correct line, not for the final answer.' },
    { spec: '2.1.3', lesson: 4, text: 'Check the answer is fully simplified – stopping one step too early is a common way to lose a mark.' }
  ],

  /* ============================================================== FLASHCARDS */
  flashcards: [
    /* 2.1.1 */
    { id: 'u1t2-211-fc1', spec: '2.1.1', lesson: 1, front: 'A . B, A + B, <span class="ovl">A</span>, A ⊕ B?', back: 'AND, OR, NOT, XOR.' },
    { id: 'u1t2-211-fc2', spec: '2.1.1', lesson: 1, front: 'Order of operations in a Boolean expression?', back: 'Brackets → NOT → AND → OR (AND behaves like ×, OR like +).' },
    { id: 'u1t2-211-fc3', spec: '2.1.1', lesson: 1, front: 'When is A ⊕ B equal to 1?', back: 'When A and B are different.' },
    { id: 'u1t2-211-fc4', spec: '2.1.1', lesson: 1, front: 'How many rows for a truth table with n inputs?', back: '2<sup>n</sup> – 2 inputs: 4 rows; 3 inputs: 8 rows; 4 inputs: 16 rows.' },
    { id: 'u1t2-211-fc5', spec: '2.1.1', lesson: 1, front: 'Which circuit models AND, and which models OR?', back: 'Series (both switches must be on) = AND. Parallel (either switch is enough) = OR.' },
    { id: 'u1t2-211-fc6', spec: '2.1.1', lesson: 1, front: 'The three steps of “find the 1s”?', back: 'Find the rows where the output is 1; write a term per row (letter if 1, NOT letter if 0, ANDed); OR the terms together.' },
    /* 2.1.2 */
    { id: 'u1t2-212-fc1', spec: '2.1.2', lesson: 2, front: 'What is a mask?', back: 'A pattern of bits used with AND to check or change specific bits in a register, without disturbing the rest.' },
    { id: 'u1t2-212-fc2', spec: '2.1.2', lesson: 2, front: 'The three-part masking answer?', back: 'State the mask, name the operation (AND), give the result.' },
    { id: 'u1t2-212-fc3', spec: '2.1.2', lesson: 2, front: 'Clearing bits: what goes in the mask?', back: '1 for every bit to keep, 0 for every bit to clear. The operation is still AND.' },
    { id: 'u1t2-212-fc4', spec: '2.1.2', lesson: 2, front: 'Masking vs clearing?', back: 'Masking asks a question (is this bit 1?). Clearing changes the register (forces chosen bits to 0). Same tool, different purpose.' },
    /* 2.1.3 */
    { id: 'u1t2-213-fc1', spec: '2.1.3', lesson: 2, front: 'Identity law?', back: 'A . 1 = A and A + 0 = A.' },
    { id: 'u1t2-213-fc2', spec: '2.1.3', lesson: 2, front: 'Annulment law?', back: 'A . 0 = 0 and A + 1 = 1.' },
    { id: 'u1t2-213-fc3', spec: '2.1.3', lesson: 2, front: 'Idempotent law?', back: 'A . A = A and A + A = A.' },
    { id: 'u1t2-213-fc4', spec: '2.1.3', lesson: 2, front: 'Complement law?', back: 'A . <span class="ovl">A</span> = 0 and A + <span class="ovl">A</span> = 1.' },
    { id: 'u1t2-213-fc5', spec: '2.1.3', lesson: 2, front: 'Commutative, associative and involution laws?', back: 'Commutative: A.B = B.A, A+B = B+A. Associative: (A.B).C = A.(B.C), (A+B)+C = A+(B+C). Involution: ¬(¬A) = A.' },
    { id: 'u1t2-213-fc6', spec: '2.1.3', lesson: 3, front: 'The two distributive forms?', back: 'AND over OR: A.(B+C) = A.B + A.C. OR over AND: A+(B.C) = (A+B).(A+C).' },
    { id: 'u1t2-213-fc7', spec: '2.1.3', lesson: 3, front: 'Absorption law?', back: 'A + A.B = A and A.(A+B) = A.' },
    { id: 'u1t2-213-fc8', spec: '2.1.3', lesson: 3, front: 'What is “force factorise”?', back: 'Rewrite the lone term using Identity (A = A.1 or A = A+0) so there is something to factorise with; then Annulment clears the extra bracket.' },
    { id: 'u1t2-213-fc9', spec: '2.1.3', lesson: 3, front: '<span class="ovl">A</span>.(A.B) and <span class="ovl">A</span>.(A+B)?', back: '<span class="ovl">A</span>.(A.B) = 0. <span class="ovl">A</span>.(A+B) = <span class="ovl">A</span>.B.' },
    { id: 'u1t2-213-fc10', spec: '2.1.3', lesson: 3, front: '<span class="ovl">A</span>+(A.B) and <span class="ovl">A</span>+(A+B)?', back: '<span class="ovl">A</span>+(A.B) = <span class="ovl">A</span>+B. <span class="ovl">A</span>+(A+B) = 1.' },
    { id: 'u1t2-213-fc11', spec: '2.1.3', lesson: 4, front: 'How are simplification questions marked?', back: 'One mark per correct line of working, with the law named – not one mark for the final answer. Truth tables don’t count.' },
    { id: 'u1t2-213-fc12', spec: '2.1.3', lesson: 4, front: 'How many laws are in the full toolkit, and what are they?', back: 'Nine: Identity, Annulment, Idempotent, Complement, Commutative, Associative, Involution, Distributive, Absorption.' },
    { id: 'u1t2-213-fc13', spec: '2.1.3', lesson: 4, front: 'Strategy for a long simplification question?', back: 'Expand the brackets first (AND over OR), then absorb one term at a time.' },
    { id: 'u1t2-213-fc14', spec: '2.1.3', lesson: 4, front: 'Simplify A.(A + C) + C.(A + B).', back: 'A + C.B – Absorption, AND over OR, then Absorption (A + C.A = A).' },
    { id: 'u1t2-213-fc15', spec: '2.1.3', lesson: 4, front: 'Five habits that cost marks?', back: 'Skipping lines; not naming the law; using a truth table; stopping one step too early; missing a common factor.' }
  ],

  /* =============================================================== QUESTIONS */
  questions: [
    /* ---------- 2.1.1 ---------- */
    {
      id: 'u1t2-211-q1', spec: '2.1.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'What order do you evaluate a Boolean expression in?',
      options: ['Brackets → NOT → AND → OR', 'Brackets → AND → OR → NOT', 'Left to right', 'Brackets → OR → AND → NOT'],
      answer: 0,
      feedback: ['', 'NOT is applied before AND and OR.', 'Precedence matters – AND is worked out before OR, like × before +.', 'AND comes before OR.'],
      explanation: 'Just like BIDMAS: AND behaves like ×, OR behaves like +.'
    },
    {
      id: 'u1t2-211-q2', spec: '2.1.1', lesson: 1, type: 'input', skill: 'recall',
      question: 'How many rows does a truth table need for 3 inputs?',
      accept: ['8', 'eight'],
      explanation: '2<sup>3</sup> = 8 rows: 000 to 111.'
    },
    {
      id: 'u1t2-211-q3', spec: '2.1.1', lesson: 1, type: 'input', skill: 'application',
      question: 'A = 1 and B = 0. What is A ⊕ B? Give 0 or 1.',
      accept: ['1'],
      explanation: 'XOR is true when the inputs are different. 1 and 0 are different, so A ⊕ B = 1.'
    },
    {
      id: 'u1t2-211-q4', spec: '2.1.1', lesson: 1, type: 'input', skill: 'application',
      question: 'A = 1, B = 0 and C = 0. What is the value of A + B . C? Give 0 or 1.',
      accept: ['1'],
      explanation: 'AND is worked out before OR: A + (B . C) = 1 + (0 . 0) = 1 + 0 = 1.'
    },
    {
      id: 'u1t2-211-q5', spec: '2.1.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Counting in binary, which row comes after 011 in a 3-input truth table?',
      options: ['100', '111', '110', '010'],
      answer: 0,
      feedback: ['', '111 is the last row.', '110 comes after 101.', '010 comes before 011.'],
      explanation: 'Keep counting in binary: 011 is followed by 100. Listing rows systematically means you never miss or repeat one.'
    },
    {
      id: 'u1t2-211-q6', spec: '2.1.1', lesson: 1, type: 'mcq', skill: 'application',
      question: 'A truth table’s output is 1 only when A = 0 and B = 1. Using “find the 1s”, what is the expression?',
      options: ['<span class="ovl">A</span>.B', 'A.<span class="ovl">B</span>', 'A.B', '<span class="ovl">A</span> + B'],
      answer: 0,
      feedback: ['', 'This is the row A = 1, B = 0.', 'This is the row A = 1, B = 1.', 'Each row’s term ANDs the inputs together; this ORs them.'],
      explanation: 'Use the letter if the input is 1, and NOT the letter if it’s 0: A = 0 → <span class="ovl">A</span>, B = 1 → B, ANDed: <span class="ovl">A</span>.B.'
    },
    {
      id: 'u1t2-211-q7', spec: '2.1.1', lesson: 1, type: 'mcq', skill: 'application',
      question: 'A table’s output is 1 for the rows A = 0, B = 1 and A = 1, B = 0, and 0 otherwise. Which operator is this?',
      options: ['XOR', 'OR', 'AND', 'NOT'],
      answer: 0,
      feedback: ['', 'OR would also give 1 when A = 1, B = 1.', 'AND gives 1 only when A = 1, B = 1.', 'NOT has only one input.'],
      explanation: '“Find the 1s” gives <span class="ovl">A</span>.B + A.<span class="ovl">B</span> – the same pattern as XOR: true when the inputs are different.'
    },
    {
      id: 'u1t2-211-q8', spec: '2.1.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which circuit behaves like AND?',
      options: ['Two switches in series – both must be on', 'Two switches in parallel – either can be on', 'One switch that reverses the signal', 'Two switches where exactly one must be on'],
      answer: 0,
      feedback: ['', 'A parallel circuit behaves like OR.', 'That behaves like NOT.', 'That behaves like XOR.'],
      explanation: 'Series: current only flows when A = 1 AND B = 1.'
    },

    /* ---------- 2.1.2 ---------- */
    {
      id: 'u1t2-212-q1', spec: '2.1.2', lesson: 2, type: 'mcq', skill: 'technique',
      question: 'What three things do you need to state to get full marks on a masking question?',
      options: ['The mask, the operation, and the result', 'The register, the mask, and a truth table', 'The mask, the bit position, and the register size', 'The operation, the truth table, and the answer'],
      answer: 0,
      feedback: ['', 'A truth table isn’t needed; the operation (AND) and result are.', 'You need the operation and the result.', 'A truth table isn’t asked for; the mask is.'],
      explanation: 'Three separate marks: state the mask, name the operation (AND), and give the result.'
    },
    {
      id: 'u1t2-212-q2', spec: '2.1.2', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'In a mask, what does a 0 do to the matching bit when you AND them together?',
      options: ['Clears it to 0', 'Keeps it unchanged', 'Flips it to the opposite value', 'Sets it to 1'],
      answer: 0,
      feedback: ['', 'A 1 in the mask keeps the bit unchanged.', 'AND doesn’t flip bits.', 'AND with 0 can never give 1.'],
      explanation: 'A 0 in the mask always forces the result to 0, whatever the register bit was.'
    },
    {
      id: 'u1t2-212-q3', spec: '2.1.2', lesson: 2, type: 'input', skill: 'application',
      question: 'You want to check bit 0 (the LSB) of the register <code>11001011</code>. What mask do you AND it with? Give 8 bits.',
      accept: ['00000001'],
      ignoreSpaces: true,
      explanation: 'Put a 1 in the mask where you want to look, and 0 everywhere else: 00000001. The result, 00000001, is not zero, so bit 0 is 1.'
    },
    {
      id: 'u1t2-212-q4', spec: '2.1.2', lesson: 2, type: 'input', skill: 'application',
      question: 'Register <code>01101001</code> is ANDed with the mask <code>00001000</code> to check bit 3. What is the result? Give 8 bits.',
      accept: ['00001000'],
      ignoreSpaces: true,
      explanation: 'Only bit 3 is kept; everything else is forced to 0. The result 00001000 is not zero, so bit 3 is 1.'
    },
    {
      id: 'u1t2-212-q5', spec: '2.1.2', lesson: 2, type: 'input', skill: 'application',
      question: 'Clear the leftmost 3 bits of <code>10110011</code> and keep the rest. What is the result? Give 8 bits.',
      accept: ['00010011'],
      ignoreSpaces: true,
      explanation: 'Mask 00011111 (0 to clear, 1 to keep), operation AND: 10110011 AND 00011111 = 00010011.'
    },
    {
      id: 'u1t2-212-q6', spec: '2.1.2', lesson: 2, type: 'input', skill: 'application',
      question: 'Which mask clears bits 2 and 5 (counting from the right, starting at 0) and keeps every other bit? Give 8 bits.',
      accept: ['11011011'],
      ignoreSpaces: true,
      explanation: '0 in positions 5 and 2, 1 everywhere else: 11011011. For example, 01101101 AND 11011011 = 01001001.'
    },

    /* ---------- 2.1.3 ---------- */
    {
      id: 'u1t2-213-q1', spec: '2.1.3', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'Which law is shown by A . A = A?',
      options: ['Idempotent', 'Identity', 'Complement', 'Absorption'],
      answer: 0,
      feedback: ['', 'Identity is A . 1 = A and A + 0 = A.', 'Complement is A . <span class="ovl">A</span> = 0 and A + <span class="ovl">A</span> = 1.', 'Absorption is A + A.B = A and A.(A+B) = A.'],
      explanation: 'Idempotent: combining A with itself, either way, gives A back.'
    },
    {
      id: 'u1t2-213-q2', spec: '2.1.3', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'Which law is shown by A + 1 = 1?',
      options: ['Annulment', 'Identity', 'Idempotent', 'Involution'],
      answer: 0,
      feedback: ['', 'Identity is A + 0 = A.', 'Idempotent is A + A = A.', 'Involution is ¬(¬A) = A.'],
      explanation: 'Annulment: ORing with 1 always gives 1; ANDing with 0 always gives 0.'
    },
    {
      id: 'u1t2-213-q3', spec: '2.1.3', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'Which law is shown by A + <span class="ovl">A</span> = 1?',
      options: ['Complement', 'Annulment', 'Involution', 'Commutative'],
      answer: 0,
      feedback: ['', 'Annulment is A + 1 = 1 and A . 0 = 0.', 'Involution is about a double NOT.', 'Commutative is about the order of the inputs.'],
      explanation: 'Complement: A and NOT A between them cover every case.'
    },
    {
      id: 'u1t2-213-q4', spec: '2.1.3', lesson: 2, type: 'input', skill: 'recall',
      question: 'How many rows would a truth table need to prove the associative law for A, B and C?',
      accept: ['8', 'eight'],
      explanation: 'Three inputs: 2<sup>3</sup> = 8 rows.'
    },
    {
      id: 'u1t2-213-q5', spec: '2.1.3', lesson: 2, type: 'input', skill: 'application',
      question: 'Simplify <code>A . 1 + B . 0</code>, one law per line. Give the final answer.',
      accept: ['A'],
      explanation: '= A + B . 0 (Identity) · = A + 0 (Annulment) · = A (Identity).'
    },
    {
      id: 'u1t2-213-q6', spec: '2.1.3', lesson: 2, type: 'mcq', skill: 'technique',
      question: 'Which answer to “Simplify C . (B + <span class="ovl">B</span>)” would get full marks?',
      options: ['= C . 1 (Complement) then = C (Identity)', '= C, shown with a truth table', '= C', '= C . 1 = C'],
      answer: 0,
      feedback: ['', 'Truth tables are not accepted as a simplification method.', 'Jumping straight to the answer skips the lines that earn the marks.', 'The laws aren’t named on each line.'],
      explanation: 'One law per line, with the law named every time.'
    },
    {
      id: 'u1t2-213-q7', spec: '2.1.3', lesson: 3, type: 'mcq', skill: 'application',
      question: 'A + (B.C) expands to…',
      options: ['(A+B).(A+C)', 'A.B + A.C', 'A + B + C', 'A.B.C'],
      answer: 0,
      feedback: ['', 'That expands A.(B+C) – AND over OR.', 'The bracket contains B AND C, not B OR C.', 'The outside operator is OR, not AND.'],
      explanation: 'OR outside the bracket → OR over AND: A + (B.C) = (A+B).(A+C).'
    },
    {
      id: 'u1t2-213-q8', spec: '2.1.3', lesson: 3, type: 'mcq', skill: 'application',
      question: 'A.B + A.C factorises to…',
      options: ['A.(B + C)', 'A + (B.C)', '(A+B).(A+C)', 'A.B.C'],
      answer: 0,
      feedback: ['', 'That would come from (A+B).(A+C).', 'That is the expanded OR-over-AND form, not a factorisation of A.B + A.C.', 'The terms are ORed, so they can’t become one AND term.'],
      explanation: 'A is the common factor in both terms.'
    },
    {
      id: 'u1t2-213-q9', spec: '2.1.3', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'A.(A + B) simplifies to…',
      options: ['A', 'A.B', 'A + B', '1'],
      answer: 0,
      feedback: ['', 'Expanding gives A + A.B, which absorbs to A.', 'A is already one of the things being ORed.', 'The value depends on A.'],
      explanation: 'Absorption: A.(A+B) = A.'
    },
    {
      id: 'u1t2-213-q10', spec: '2.1.3', lesson: 3, type: 'input', skill: 'application',
      question: 'Simplify <code>B + B.C</code>. Give the final answer.',
      accept: ['B'],
      explanation: 'Force factorise: = B.1 + B.C (Identity) · = B.(1 + C) (Factorise) · = B.1 (Annulment) · = B (Identity). This is the absorption law.'
    },
    {
      id: 'u1t2-213-q11', spec: '2.1.3', lesson: 3, type: 'mcq', skill: 'application',
      question: '<span class="ovl">A</span> . (A + B) simplifies to…',
      options: ['<span class="ovl">A</span>.B', '0', '<span class="ovl">A</span> + B', '1'],
      answer: 0,
      feedback: ['', '0 is the result for <span class="ovl">A</span>.(A.B).', 'That is the result for <span class="ovl">A</span> + (A.B).', '1 is the result for <span class="ovl">A</span> + (A + B).'],
      explanation: '= <span class="ovl">A</span>.A + <span class="ovl">A</span>.B (AND over OR) · = 0 + <span class="ovl">A</span>.B (Complement) · = <span class="ovl">A</span>.B (Identity).'
    },
    {
      id: 'u1t2-213-q12', spec: '2.1.3', lesson: 3, type: 'input', skill: 'application',
      question: 'Simplify <code>B . (B̄ . C)</code>. Give the final answer.',
      accept: ['0'],
      explanation: '= (B.B̄).C (Associative) · = 0.C (Complement) · = 0 (Annulment).'
    },
    {
      id: 'u1t2-213-q13', spec: '2.1.3', lesson: 3, type: 'input', skill: 'application',
      question: 'Simplify <code>Ā + (A + D)</code>. Give the final answer.',
      accept: ['1'],
      explanation: '= (Ā + A) + D (Associative) · = 1 + D (Complement) · = 1 (Annulment).'
    },
    {
      id: 'u1t2-213-q14', spec: '2.1.3', lesson: 4, type: 'input', skill: 'application',
      question: 'Simplify <code>D + D.E + F̄.D</code>. Give the final answer.',
      accept: ['D'],
      explanation: '= D + F̄.D (Absorption: D + D.E = D) · = D (Absorption: D + D.F̄ = D). D already covers both terms.'
    },
    {
      id: 'u1t2-213-q15', spec: '2.1.3', lesson: 4, type: 'mcq', skill: 'technique',
      question: 'A correct 5-line simplification, each line valid and each law named, is usually worth…',
      options: ['One mark per correct line', 'One mark for the final answer only', 'It depends on the final answer', 'Half marks, rounded down'],
      answer: 0,
      feedback: ['', 'Marks are given per correct line, not just for the answer.', 'Each correct line earns its mark.', 'Each valid, named line earns a mark.'],
      explanation: 'Every simplification question is marked one point per correct line of working.'
    },
    {
      id: 'u1t2-213-q16', spec: '2.1.3', lesson: 4, type: 'mcq', skill: 'recall',
      question: 'Which law takes <code>A + C.(A + B)</code> to <code>A + C.A + C.B</code>?',
      options: ['AND over OR (distributive)', 'Absorption', 'Complement', 'Idempotent'],
      answer: 0,
      feedback: ['', 'Absorption removes a term; here the bracket is expanded.', 'There is no A and NOT A pair.', 'Nothing is repeated with itself.'],
      explanation: 'C.(A + B) = C.A + C.B is AND distributed over OR.'
    },
    {
      id: 'u1t2-213-q17', spec: '2.1.3', lesson: 4, type: 'mcq', skill: 'application',
      question: 'Simplify <code>A.(A + C) + C.(A + B)</code>.',
      options: ['A + C.B', 'A + C', 'A', 'A.C + B'],
      answer: 0,
      feedback: ['', 'C on its own is not absorbed – only C.A is.', 'C.B is not absorbed by A.', 'Check the first step: A.(A + C) = A.'],
      explanation: '= A + C.(A + B) (Absorption) · = A + C.A + C.B (AND over OR) · = A + C.B (Absorption: A + C.A = A).'
    },
    {
      id: 'u1t2-213-q18', spec: '2.1.3', lesson: 4, type: 'mcq', skill: 'application',
      question: 'Simplify <code>A.(B + C) + C.(A + C) + B.(B + A)</code>.',
      options: ['B + C', 'A + B + C', 'A.B + C', 'B'],
      answer: 0,
      feedback: ['', 'A.B and A.C are both absorbed, so A does not survive on its own.', 'A.B is absorbed by B.', 'C survives – nothing absorbs it.'],
      explanation: 'Absorb C.(A + C) = C and B.(B + A) = B, expand A.(B + C) = A.B + A.C, then absorb A.B into B and A.C into C: B + C.'
    },
    {
      id: 'u1t2-213-q19', spec: '2.1.3', lesson: 4, type: 'mcq', skill: 'technique',
      question: 'A student writes <code>= A + C.B</code> on one line with no law next to it. The step is correct. What happens?',
      options: ['They can lose the mark – every line needs the law named', 'Full marks – the step is correct', 'They get the mark only if a truth table is drawn', 'The whole answer scores zero'],
      answer: 0,
      feedback: ['', 'Naming the law is how the examiner knows what you did.', 'Truth tables don’t count for simplification.', 'Other correct, named lines still earn their marks.'],
      explanation: 'Applying a law correctly but not naming it is one of the habits that costs marks.'
    }
  ],

  /* ============================================================== EXAM-STYLE */
  exam: [
    {
      id: 'u1t2-211-e1', spec: '2.1.1', lesson: 1, marks: 3,
      question: 'Draw a truth table for <code>Z = Ā . (B + C)</code>.',
      markPoints: [
        'All 8 input rows listed in order, 000 to 111.',
        'Correct Ā column (1, 1, 1, 1, 0, 0, 0, 0) and B + C column (0, 1, 1, 1, 0, 1, 1, 1).',
        'Correct Z column: 0, 1, 1, 1, 0, 0, 0, 0.'
      ],
      technique: 'Decide your own working order with the precedence rules: brackets first, then NOT, then AND.'
    },
    {
      id: 'u1t2-211-e2', spec: '2.1.1', lesson: 1, marks: 2,
      context: 'A truth table has output 1 only when A = 1 and B = 1, and when A = 0 and B = 0.',
      question: 'Write the Boolean expression this table represents.',
      markPoints: [
        'One term per row where the output is 1: A.B and Ā.B̄.',
        'Terms ORed together: A.B + Ā.B̄.'
      ],
      technique: 'Find the 1s, write a term per row, OR them together.'
    },
    {
      id: 'u1t2-212-e1', spec: '2.1.2', lesson: 2, marks: 3,
      question: 'An 8-bit register holds <code>01101001</code>. Using masking, find whether bit 3 (counting from the right, starting at 0) is set to 1.',
      markPoints: [
        'Mask: 00001000.',
        'Operation: AND.',
        'Result: 00001000 – not zero, so bit 3 is 1.'
      ],
      technique: 'Three marks: mask, operation, result.'
    },
    {
      id: 'u1t2-212-e2', spec: '2.1.2', lesson: 2, marks: 2,
      question: 'Explain how to clear bits 2 and 5 of the register <code>01101101</code> while keeping every other bit, and give the result.',
      markPoints: [
        'AND with the mask 11011011 (0 to clear, 1 to keep).',
        'Result: 01001001.'
      ]
    },
    {
      id: 'u1t2-213-e1', spec: '2.1.3', lesson: 3, marks: 4,
      question: 'Clearly showing each step, prove that <code>A + A.B = A</code>.',
      markPoints: [
        '= A.1 + A.B (Identity).',
        '= A.(1 + B) (Factorise).',
        '= A.1 (Annulment).',
        '= A (Identity).'
      ],
      technique: 'Force factorise: rewrite A as A.1 so there is something to factorise with.'
    },
    {
      id: 'u1t2-213-e2', spec: '2.1.3', lesson: 4, marks: 4,
      question: 'Clearly showing each step, simplify <code>A.B + A.B̄ + A.C</code>.',
      markPoints: [
        '= A.(B + B̄) + A.C (Factorise / distributive).',
        '= A.1 + A.C (Complement).',
        '= A + A.C (Identity).',
        '= A (Absorption).'
      ],
      technique: 'Two terms share A and have B and NOT B – factorise A out of just those two.'
    },
    {
      id: 'u1t2-213-e3', spec: '2.1.3', lesson: 4, marks: 5,
      question: 'Clearly showing each step, simplify <code>B.(B + C) + C̄.(B + C)</code>.',
      markPoints: [
        '= B + C̄.(B + C) (Absorption: B.(B+C) = B).',
        '= B + C̄.B + C̄.C (AND over OR).',
        '= B + C̄.B + 0 (Complement).',
        '= B + C̄.B (Identity).',
        '= B (Absorption).'
      ],
      technique: 'One law per line, every law named; check the answer is fully simplified.'
    },
    {
      id: 'u1t2-213-e4', spec: '2.1.3', lesson: 4, marks: 4,
      question: 'Clearly showing each step, simplify <code>A.(A + B) + Ā.B + A.C</code>.',
      markPoints: [
        '= A + Ā.B + A.C (Absorption: A.(A+B) = A).',
        '= (A + Ā).(A + B) + A.C (OR over AND) – the NOT A pattern.',
        '= 1.(A + B) + A.C, then = A + B + A.C (Complement, Identity).',
        '= A + B (Absorption: A + A.C = A).'
      ]
    }
  ],

  /* ================================================================= TRACING */
  traces: [
    {
      id: 'u1t2-211-t1', spec: '2.1.1', lesson: 1,
      title: 'Truth table: (A . B) + C',
      intro: '<p>Complete the 3-input table, working left to right one column at a time: A . B, then (A . B) + C. Use 0 and 1.</p>',
      code: 'X = (A . B) + C',
      columns: ['A', 'B', 'C', 'A.B', '(A.B)+C'],
      rows: [
        ['0', '0', '0', '0', '0'],
        ['0', '0', '1', '0', '1'],
        ['0', '1', '0', '0', '0'],
        ['0', '1', '1', '0', '1'],
        ['1', '0', '0', '0', '0'],
        ['1', '0', '1', '0', '1'],
        ['1', '1', '0', '1', '1'],
        ['1', '1', '1', '1', '1']
      ],
      given: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2], [3, 0], [3, 1], [3, 2], [4, 0], [4, 1], [4, 2], [5, 0], [5, 1], [5, 2], [6, 0], [6, 1], [6, 2], [7, 0], [7, 1], [7, 2]],
      explanation: 'A.B is 1 only when A and B are both 1 (the last two rows). The output is 1 whenever A.B is 1 or C is 1.'
    },
    {
      id: 'u1t2-211-t2', spec: '2.1.1', lesson: 1,
      title: 'Truth table: Y = (A + C) . (B ⊕ C)',
      intro: '<p>Build the table for Y. Work out each bracket first, then AND them. Use 0 and 1.</p>',
      code: 'Y = (A + C) . (B ⊕ C)',
      columns: ['A', 'B', 'C', 'A+C', 'B⊕C', 'Y'],
      rows: [
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '1', '1', '1', '1'],
        ['0', '1', '0', '0', '1', '0'],
        ['0', '1', '1', '1', '0', '0'],
        ['1', '0', '0', '1', '0', '0'],
        ['1', '0', '1', '1', '1', '1'],
        ['1', '1', '0', '1', '1', '1'],
        ['1', '1', '1', '1', '0', '0']
      ],
      given: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2], [3, 0], [3, 1], [3, 2], [4, 0], [4, 1], [4, 2], [5, 0], [5, 1], [5, 2], [6, 0], [6, 1], [6, 2], [7, 0], [7, 1], [7, 2]],
      explanation: 'B ⊕ C is 1 when B and C are different. Y is 1 only where both A + C and B ⊕ C are 1: rows 001, 101 and 110.'
    }
  ]
});
