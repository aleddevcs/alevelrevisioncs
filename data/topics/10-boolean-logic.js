/* Topic 10: Boolean logic – truth tables, Boolean algebra, De Morgan's laws and masking.
 * Added to the initial nine topics because logical operations appear in AS Unit 1 and
 * A2 Unit 3 of the WJEC specification, and Boolean algebra is listed in its Appendix C. */
RS.content.registerTopic({
  id: 'boolean-logic',
  order: 10,
  title: 'Boolean logic',
  icon: 'logic',
  colour: 'slate',
  summary: 'AND, OR, NOT, XOR, NAND and NOR, truth tables, Boolean identities, De Morgan’s laws, simplification, masking and XOR encryption.',
  keywords: ['Boolean', 'logic gate', 'AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR', 'truth table', 'identity', 'De Morgan', 'simplify', 'simplification', 'absorption', 'distributive', 'mask', 'masking', 'clear', 'set', 'toggle', 'register', 'encryption'],
  specRefs: [
    'AS Unit 1, section 2 (Logical operations): truth tables for AND, OR, NOT and XOR; logical operations in programming including clearing registers and masking; simplifying with Boolean identities',
    'A2 Unit 3, section 2 (Logical operations): NAND and NOR; masking and encryption; De Morgan’s laws',
    'AS Unit 1, section 9 and A2 Unit 3, section 3: logical operators in algorithms and programs',
    'Appendix C (Mathematical skills): Boolean algebra'
  ],
  notes: [
    {
      heading: 'Logical operations and notation',
      html: '<p>A common notation is: A AND B written <code>A.B</code>; A OR B written <code>A + B</code>; NOT A written with a bar over the letter, <code><span class="ovl">A</span></code> (or ¬A); A XOR B written <code>A ⊕ B</code>. Notation varies between textbooks and exam boards, so use the notation given in the question.</p>' +
        '<table><thead><tr><th scope="col">A</th><th scope="col">B</th><th scope="col">A AND B</th><th scope="col">A OR B</th><th scope="col">A XOR B</th><th scope="col">A NAND B</th><th scope="col">A NOR B</th></tr></thead><tbody>' +
        '<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>' +
        '<tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>' +
        '<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>' +
        '<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>' +
        '</tbody></table>' +
        '<ul><li>NOT inverts its single input: NOT 0 = 1, NOT 1 = 0.</li>' +
        '<li>XOR is 1 when the inputs are <em>different</em>. NAND is NOT(AND); NOR is NOT(OR).</li>' +
        '<li>A truth table for <var>n</var> inputs has 2<sup><var>n</var></sup> rows. List the inputs in binary counting order (000, 001, 010, …) so no combination is missed.</li></ul>'
    },
    {
      heading: 'Boolean identities',
      html: '<table><thead><tr><th scope="col">Rule</th><th scope="col">AND form</th><th scope="col">OR form</th></tr></thead><tbody>' +
        '<tr><td>Identity</td><td>A.1 = A</td><td>A + 0 = A</td></tr>' +
        '<tr><td>Null (annulment)</td><td>A.0 = 0</td><td>A + 1 = 1</td></tr>' +
        '<tr><td>Idempotent</td><td>A.A = A</td><td>A + A = A</td></tr>' +
        '<tr><td>Complement (inverse)</td><td>A.<span class="ovl">A</span> = 0</td><td>A + <span class="ovl">A</span> = 1</td></tr>' +
        '<tr><td>Commutative</td><td>A.B = B.A</td><td>A + B = B + A</td></tr>' +
        '<tr><td>Associative</td><td>(A.B).C = A.(B.C)</td><td>(A + B) + C = A + (B + C)</td></tr>' +
        '<tr><td>Distributive</td><td>A.(B + C) = A.B + A.C</td><td>A + B.C = (A + B).(A + C)</td></tr>' +
        '<tr><td>Absorption</td><td>A.(A + B) = A</td><td>A + A.B = A</td></tr>' +
        '<tr><td>Double negation</td><td colspan="2">NOT(NOT A) = A</td></tr>' +
        '</tbody></table>'
    },
    {
      heading: 'De Morgan’s laws',
      points: [
        'NOT(A AND B) = (NOT A) OR (NOT B), that is <code><span class="ovl">A.B</span> = <span class="ovl">A</span> + <span class="ovl">B</span></code>.',
        'NOT(A OR B) = (NOT A) AND (NOT B), that is <code><span class="ovl">A + B</span> = <span class="ovl">A</span>.<span class="ovl">B</span></code>.',
        'A memory aid: “break the bar and change the sign” – split the long bar over each term and swap AND with OR.',
        'They are useful in programming too: <code>NOT (x = 0 OR y = 0)</code> is the same as <code>x &lt;&gt; 0 AND y &lt;&gt; 0</code>.'
      ]
    },
    {
      heading: 'Simplifying expressions: worked examples',
      html: '<p><strong>Example 1</strong>: A.B + A.<span class="ovl">B</span></p>' +
        '<ol><li>= A.(B + <span class="ovl">B</span>) (distributive law, factorising A)</li><li>= A.1 (complement: B + <span class="ovl">B</span> = 1)</li><li>= A (identity)</li></ol>' +
        '<p><strong>Example 2</strong>: <span class="ovl"><span class="ovl">A</span> + B</span> + A.B</p>' +
        '<ol><li>= A.<span class="ovl">B</span> + A.B (De Morgan, then double negation: NOT(NOT A) = A)</li><li>= A.(<span class="ovl">B</span> + B) (distributive)</li><li>= A.1 = A (complement, then identity)</li></ol>' +
        '<p>Check a simplification by drawing truth tables for the original and simplified expressions: every row must match.</p>'
    },
    {
      heading: 'Masking and clearing registers',
      points: [
        'A <strong>mask</strong> is a bit pattern combined with data using a logical operation to change or test particular bits.',
        '<strong>AND</strong> with a mask <strong>clears</strong> bits: a 0 in the mask forces the bit to 0; a 1 leaves it unchanged. <code>10110110 AND 00001111 = 00000110</code> (upper nibble cleared). ANDing with 00000000 clears the whole register.',
        '<strong>OR</strong> with a mask <strong>sets</strong> bits: a 1 in the mask forces the bit to 1. <code>10100000 OR 00000101 = 10100101</code>.',
        '<strong>XOR</strong> with a mask <strong>toggles</strong> (flips) bits: a 1 in the mask inverts the bit. <code>11001010 XOR 11111111 = 00110101</code>. XORing a register with itself clears it.',
        'To <strong>test</strong> a bit, AND with a mask that has a 1 only in that position: the result is non-zero if and only if the bit is 1.'
      ]
    },
    {
      heading: 'XOR in encryption',
      points: [
        'Plaintext XOR key = ciphertext. Ciphertext XOR the same key = plaintext, because (P ⊕ K) ⊕ K = P.',
        'Example: 1010 XOR 0110 = 1100; then 1100 XOR 0110 = 1010.',
        'This is the basis of the Vernam cipher (one-time pad), which is secure only if the key is truly random, at least as long as the message, kept secret and never reused.'
      ]
    },
    {
      heading: 'Logic in programs',
      points: [
        'Conditions combine comparisons with AND, OR and NOT: <code>IF age &gt;= 13 AND age &lt;= 19 THEN</code> tests for a teenager.',
        'A common mistake is <code>age &gt;= 13 OR age &lt;= 19</code>, which is true for every age.',
        'Many languages use short-circuit evaluation: in <code>A AND B</code>, B is not evaluated if A is false.'
      ]
    }
  ],
  misconceptions: [
    { wrong: 'XOR is the same as OR.', right: 'OR is 1 when either or both inputs are 1. XOR is 1 only when the inputs are different, so 1 XOR 1 = 0.' },
    { wrong: 'NOT(A AND B) equals NOT A AND NOT B.', right: 'By De Morgan’s law, NOT(A AND B) = NOT A <em>OR</em> NOT B.' },
    { wrong: 'To set bits you AND with 1s.', right: 'ANDing with 1 leaves a bit unchanged. To set bits, OR with 1s.' },
    { wrong: 'A + 1 = A (as in ordinary algebra with 0).', right: 'In Boolean algebra A + 1 = 1, because anything OR 1 is 1.' }
  ],
  examTips: [
    'When simplifying, write one step per line and name the rule used. Method marks are often available even if the final answer is wrong.',
    'Always check your simplified expression with a truth table if you have time.',
    'For masking questions, state the operation and the mask, and show the result in binary.'
  ],
  flashcards: [
    { id: 'bool-fc-1', front: 'When is A XOR B equal to 1?', back: 'When A and B are different.' },
    { id: 'bool-fc-2', front: 'When is A NAND B equal to 0?', back: 'Only when both A and B are 1.' },
    { id: 'bool-fc-3', front: 'When is A NOR B equal to 1?', back: 'Only when both A and B are 0.' },
    { id: 'bool-fc-4', front: 'State De Morgan’s laws.', back: 'NOT(A AND B) = NOT A OR NOT B; NOT(A OR B) = NOT A AND NOT B.' },
    { id: 'bool-fc-5', front: 'Simplify A + A.B', back: 'A (absorption).' },
    { id: 'bool-fc-6', front: 'Simplify A.(NOT A)', back: '0 (complement law).' },
    { id: 'bool-fc-7', front: 'Simplify A + 1', back: '1 (null/annulment law).' },
    { id: 'bool-fc-8', front: 'Which operation and mask clear the lower nibble of an 8-bit value?', back: 'AND with 11110000.' },
    { id: 'bool-fc-9', front: 'Which operation sets particular bits to 1?', back: 'OR with a mask containing 1s in those positions.' },
    { id: 'bool-fc-10', front: 'Which operation toggles particular bits?', back: 'XOR with a mask containing 1s in those positions.' },
    { id: 'bool-fc-11', front: 'How many rows in a truth table with 3 inputs?', back: '2<sup>3</sup> = 8.' },
    { id: 'bool-fc-12', front: 'Why can XOR be used for encryption?', back: 'XORing with a key scrambles the data, and XORing again with the same key restores it: (P ⊕ K) ⊕ K = P.' }
  ],
  questions: [
    {
      id: 'bool-q1', type: 'input', skill: 'application',
      question: 'If A = 1 and B = 0, what is the value of A NAND B?',
      accept: ['1'],
      explanation: 'A AND B = 0, so NAND (NOT AND) gives 1.'
    },
    {
      id: 'bool-q2', type: 'mcq', skill: 'recall',
      question: 'When does an XOR operation output 1?',
      options: ['When its two inputs are different', 'When both inputs are 1', 'When at least one input is 1', 'When both inputs are 0'],
      answer: 0,
      feedback: ['', '1 XOR 1 = 0. Both inputs being 1 gives 1 for AND, not XOR.', 'This describes OR, which also gives 1 when both inputs are 1.', 'This describes NOR.'],
      explanation: 'XOR is “exclusive OR”: one or the other, but not both.'
    },
    {
      id: 'bool-q3', type: 'mcq', skill: 'recall',
      question: 'For which inputs does A NOR B output 1?',
      options: ['A = 0 and B = 0 only', 'A = 1 and B = 1 only', 'Whenever A and B are different', 'Whenever at least one input is 1'],
      answer: 0,
      feedback: ['', 'This gives 1 for AND; NOR gives 0 here.', 'This describes XOR.', 'This describes OR; NOR is the opposite.'],
      explanation: 'NOR = NOT(A OR B). A OR B is 0 only when both are 0.'
    },
    {
      id: 'bool-q4', type: 'mcq', skill: 'application',
      question: 'Simplify <code>A + A.B</code>.',
      options: ['A', 'B', 'A.B', '1'],
      answer: 0,
      feedback: ['', 'If A = 0 and B = 1, the expression is 0 but B is 1.', 'If A = 1 and B = 0, the expression is 1 but A.B is 0.', 'If A = 0, the expression is 0, not 1.'],
      explanation: 'Absorption: A + A.B = A.(1 + B) = A.1 = A.'
    },
    {
      id: 'bool-q5', type: 'mcq', skill: 'application',
      question: 'Simplify <code>A.B + A.<span class="ovl">B</span></code>.',
      options: ['A', 'B', '0', 'A + B'],
      answer: 0,
      feedback: ['', 'B appears in both forms, so it cancels out; the result does not depend on B.', 'When A = 1 the expression is 1.', 'When A = 0 and B = 1 the expression is 0, but A + B is 1.'],
      explanation: 'A.(B + <span class="ovl">B</span>) = A.1 = A.'
    },
    {
      id: 'bool-q6', type: 'mcq', skill: 'recall',
      question: 'Using De Morgan’s laws, <code>NOT (A AND B)</code> is equivalent to…',
      options: ['(NOT A) OR (NOT B)', '(NOT A) AND (NOT B)', 'A OR B', 'NOT A AND B'],
      answer: 0,
      feedback: ['', 'This equals NOT(A OR B). You must also change AND to OR.', 'This is not equivalent: try A = 1, B = 0.', 'This is not equivalent: try A = 0, B = 0.'],
      explanation: '“Break the bar and change the sign”: NOT(A.B) = NOT A + NOT B.'
    },
    {
      id: 'bool-q7', type: 'input', skill: 'application',
      question: 'What is the result of <code>10110110 AND 00001111</code>? Give 8 bits.',
      accept: ['00000110'],
      ignoreSpaces: true,
      explanation: 'The 0s in the mask clear the upper four bits; the 1s keep the lower four (0110).'
    },
    {
      id: 'bool-q8', type: 'input', skill: 'application',
      question: 'What is the result of <code>10100000 OR 00000101</code>? Give 8 bits.',
      accept: ['10100101'],
      ignoreSpaces: true,
      explanation: 'OR sets the bits where the mask has 1s (bits 0 and 2) and leaves the rest unchanged.'
    },
    {
      id: 'bool-q9', type: 'input', skill: 'application',
      question: 'What is the result of <code>11001010 XOR 11111111</code>? Give 8 bits.',
      accept: ['00110101'],
      ignoreSpaces: true,
      explanation: 'XOR with 1 flips each bit, so every bit is inverted.'
    },
    {
      id: 'bool-q10', type: 'mcq', skill: 'application',
      question: 'Which operation clears the most significant bit of an 8-bit register and leaves all other bits unchanged?',
      options: ['AND with 01111111', 'OR with 01111111', 'AND with 10000000', 'XOR with 10000000'],
      answer: 0,
      feedback: ['', 'OR with 1s would set the lower seven bits to 1.', 'This keeps only the MSB and clears all the others.', 'XOR would <em>toggle</em> the MSB: if it were 0 it would become 1.'],
      explanation: 'The 0 clears the MSB and the 1s leave the other bits as they are.'
    },
    {
      id: 'bool-q11', type: 'input', skill: 'application',
      question: 'The 4-bit plaintext <code>1010</code> is encrypted by XORing it with the key <code>0110</code>. What is the ciphertext?',
      accept: ['1100'],
      ignoreSpaces: true,
      explanation: '1⊕0 = 1, 0⊕1 = 1, 1⊕1 = 0, 0⊕0 = 0, giving 1100. XORing 1100 with 0110 gives back 1010.'
    },
    {
      id: 'bool-q12', type: 'input', skill: 'application',
      question: 'Evaluate <code>(A OR B) AND NOT C</code> when A = 0, B = 1 and C = 1. Give 0 or 1.',
      accept: ['0'],
      explanation: 'A OR B = 1; NOT C = 0; 1 AND 0 = 0.'
    },
    {
      id: 'bool-q13', type: 'input', skill: 'recall',
      question: 'How many rows (excluding the heading) does a truth table with four inputs have?',
      accept: ['16'],
      explanation: '2<sup>4</sup> = 16 combinations of inputs.'
    },
    {
      id: 'bool-q14', type: 'mcq', skill: 'application',
      question: 'Which condition is true only for ages 13 to 19 inclusive?',
      options: ['age &gt;= 13 AND age &lt;= 19', 'age &gt;= 13 OR age &lt;= 19', 'age &gt; 13 AND age &lt; 19', 'NOT (age &gt;= 13) AND age &lt;= 19'],
      answer: 0,
      feedback: ['', 'With OR, every age satisfies at least one part, so it is always true.', 'This excludes 13 and 19 themselves.', 'This is true for ages below 13.'],
      explanation: 'Both comparisons must be true, and both are inclusive.'
    },
    {
      id: 'bool-q15', type: 'mcq', skill: 'technique',
      question: 'A question says “Simplify the expression, showing your working. [3 marks]”. What is the best approach?',
      options: ['Write one step per line, naming the law used at each step, then the final expression', 'Write only the final simplified expression', 'Draw the circuit diagram instead', 'Write the truth table only'],
      answer: 0,
      feedback: ['', 'Without working, method marks cannot be awarded and a wrong answer scores nothing.', 'A circuit does not show the algebraic working asked for.', 'A truth table can check an answer, but the question asks for algebraic simplification.'],
      explanation: 'Showing each step (and the rule) earns method marks and makes errors easier to spot.'
    }
  ],
  exam: [
    {
      id: 'bool-e1', marks: 4,
      question: 'Simplify the expression <code><span class="ovl"><span class="ovl">A</span> + B</span> + A.B</code>, showing each step and naming the rules used.',
      markPoints: [
        'Apply De Morgan’s law: NOT(NOT A + B) = NOT(NOT A) . NOT B.',
        'Double negation: NOT(NOT A) = A, giving A.<span class="ovl">B</span> + A.B.',
        'Distributive law: A.(<span class="ovl">B</span> + B).',
        'Complement law then identity: A.1 = A. Final answer: A.'
      ],
      technique: 'One mark per correct step is typical. Naming the rule shows the examiner you are applying it deliberately.'
    },
    {
      id: 'bool-e2', marks: 3,
      question: 'An 8-bit status register is stored in the variable <code>status</code>. Explain how masking could be used to find out whether bit 3 (worth 8) is set to 1.',
      markPoints: [
        'Use the AND operation…',
        '…with the mask 00001000 (1 only in bit 3).',
        'If the result is non-zero (00001000), bit 3 is set; if the result is 0, bit 3 is not set.',
        'The original value of status is not changed if the result is stored in a separate variable.'
      ],
      technique: 'Name the operation, give the exact mask in binary, and explain how to interpret the result.'
    }
  ],
  traces: [
    {
      id: 'bool-t1',
      title: 'Truth table for Q = (A AND B) OR NOT C',
      intro: '<p>Complete the truth table. Use 0 and 1.</p>',
      code: 'Q = (A AND B) OR (NOT C)',
      columns: ['A', 'B', 'C', 'A AND B', 'NOT C', 'Q'],
      rows: [
        ['0', '0', '0', '0', '1', '1'],
        ['0', '0', '1', '0', '0', '0'],
        ['0', '1', '0', '0', '1', '1'],
        ['0', '1', '1', '0', '0', '0'],
        ['1', '0', '0', '0', '1', '1'],
        ['1', '0', '1', '0', '0', '0'],
        ['1', '1', '0', '1', '1', '1'],
        ['1', '1', '1', '1', '0', '1']
      ],
      given: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2], [3, 0], [3, 1], [3, 2], [4, 0], [4, 1], [4, 2], [5, 0], [5, 1], [5, 2], [6, 0], [6, 1], [6, 2], [7, 0], [7, 1], [7, 2]],
      explanation: 'Work out the intermediate columns first. Q is 1 whenever C is 0 (so NOT C is 1), and also in the row where A and B are both 1.'
    },
    {
      id: 'bool-t2',
      title: 'Checking De Morgan’s law with a truth table',
      intro: '<p>Complete the table to show that NOT(A OR B) gives the same result as (NOT A) AND (NOT B).</p>',
      code: 'X = NOT (A OR B)\nY = (NOT A) AND (NOT B)',
      columns: ['A', 'B', 'A OR B', 'X', 'NOT A', 'NOT B', 'Y'],
      rows: [
        ['0', '0', '0', '1', '1', '1', '1'],
        ['0', '1', '1', '0', '1', '0', '0'],
        ['1', '0', '1', '0', '0', '1', '0'],
        ['1', '1', '1', '0', '0', '0', '0']
      ],
      given: [[0, 0], [0, 1], [1, 0], [1, 1], [2, 0], [2, 1], [3, 0], [3, 1]],
      explanation: 'The X and Y columns are identical in every row, so the two expressions are equivalent – this is De Morgan’s law.'
    }
  ]
});
