/*
 * Revision: Unit 1, Topic 4 – Data representation and data types.
 * Written only from the Topic 4 lesson resources (resources/unit1/topic4), Lessons 1–3: the slides,
 * notes and practice pages. Items are in specification order; every item has `spec` and `lesson`.
 * The A-level preview on shifts is not included (it is not on the AS paper).
 */
RS.content.registerTopic({
  id: 'u1-t4',
  unit: 1,
  topic: 4,
  title: 'Data representation and data types',
  icon: 'binary',
  colour: 'teal',
  summary: 'Bits, bytes and words; binary and hexadecimal conversions; sign and magnitude and two’s complement; binary addition, subtraction and overflow; truncation and rounding errors; floating point form.',
  keywords: ['bit', 'byte', 'word', 'nibble', 'binary', 'denary', 'hexadecimal', 'hex', 'place value', 'sign and magnitude', 'two’s complement', 'negative numbers', 'binary addition', 'carry', 'overflow', 'subtraction', 'binary point', 'truncation', 'rounding', 'absolute error', 'relative error', 'floating point', 'mantissa', 'exponent', 'normalised', 'range', 'precision'],
  specRefs: [
    'Lesson 1 – 4.1.1 bit, byte and word; 4.1.2 binary and hexadecimal; 4.4.2 negative numbers',
    'Lesson 2 – 4.4.1 binary arithmetic and overflow; 4.4.5 truncation and rounding',
    'Lesson 3 – 4.4.3 floating point form; 4.4.4 converting and comparing integer and floating point'
  ],

  /* =================================================================== NOTES */
  notes: [
    /* ---------- 4.1.1 ---------- */
    {
      spec: '4.1.1', lesson: 1,
      heading: 'Bit, byte and word',
      html: '<table><thead><tr><th scope="col">Term</th><th scope="col">Definition</th></tr></thead><tbody>' +
        '<tr><td>Bit</td><td>A single binary digit, 0 or 1 – the smallest unit of data.</td></tr>' +
        '<tr><td>Byte</td><td>8 bits. One byte can hold 256 different values, 0 to 255.</td></tr>' +
        '<tr><td>Word</td><td>The total number of bits that can be manipulated as a single unit by the CPU. Typically 32 or 64 bits – a 32-bit word is 4 bytes.</td></tr>' +
        '</tbody></table>' +
        '<p><strong>Watch out:</strong> “a group of bits” is not enough for a word – the mark is for “manipulated as a single unit by the CPU”.</p>'
    },
    /* ---------- 4.1.2 ---------- */
    {
      spec: '4.1.2', lesson: 1,
      heading: 'Binary ↔ denary',
      html: '<table><thead><tr><th scope="col">128</th><th scope="col">64</th><th scope="col">32</th><th scope="col">16</th><th scope="col">8</th><th scope="col">4</th><th scope="col">2</th><th scope="col">1</th></tr></thead><tbody>' +
        '<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>' +
        '</tbody></table>' +
        '<ul><li><strong>Binary → denary:</strong> add up the place values with a 1 under them. 10011101 = 128 + 16 + 8 + 4 + 1 = 157.</li>' +
        '<li><strong>Denary → binary:</strong> start at 128. If the place value fits into what is left, write 1 and subtract it; if not, write 0. Move right and repeat.</li>' +
        '<li>Always write all 8 bits, including leading 0s: 109 = 01101101.</li></ul>'
    },
    {
      spec: '4.1.2', lesson: 1,
      heading: 'Why hexadecimal?',
      points: [
        'Hex is base 16: digits 0–9 then A (10), B (11), C (12), D (13), E (14), F (15).',
        '<strong>Shorter</strong> – one hex digit stands for four bits, so a byte is two hex digits.',
        '<strong>Fewer mistakes</strong> – people misread and mistype long strings of 0s and 1s far more often than two hex digits.',
        '<strong>Converts instantly</strong> to and from binary, so the computer still works in binary underneath.',
        'Example: the colour orange is written FFA500 in hex – much easier to read than 24 binary digits.'
      ]
    },
    {
      spec: '4.1.2', lesson: 1,
      heading: 'Hex conversions',
      points: [
        '<strong>Binary → hex:</strong> split into nibbles (groups of 4) from the right, pad with 0s on the left if needed, and convert each nibble (8 4 2 1). 11101010 → 1110 1010 → EA.',
        '<strong>Hex → binary:</strong> each hex digit becomes 4 bits. 3C → 0011 1100 → 00111100.',
        '<strong>Denary → hex:</strong> divide by 16 and write down the remainders; read them from the bottom up. 200 ÷ 16 = 12 r 8 → C8.',
        '<strong>Hex → denary:</strong> multiply the left digit by 16 and add the right digit. 7E = 7 × 16 + 14 = 126.',
        'If you get stuck, go via binary.'
      ]
    },
    /* ---------- 4.4.1 ---------- */
    {
      spec: '4.4.1', lesson: 2,
      heading: 'The five rules of binary addition',
      html: '<table><thead><tr><th scope="col">Sum</th><th scope="col">Write</th><th scope="col">Carry</th></tr></thead><tbody>' +
        '<tr><td>0 + 0</td><td>0</td><td>0</td></tr>' +
        '<tr><td>0 + 1</td><td>1</td><td>0</td></tr>' +
        '<tr><td>1 + 0</td><td>1</td><td>0</td></tr>' +
        '<tr><td>1 + 1</td><td>0</td><td>1</td></tr>' +
        '<tr><td>1 + 1 + 1</td><td>1</td><td>1</td></tr>' +
        '</tbody></table>' +
        '<p>Work from <strong>right to left</strong>, and write a <strong>labelled carry row</strong> – a correct answer without the carries shown can lose a mark.</p>'
    },
    {
      spec: '4.4.1', lesson: 2,
      heading: 'Overflow',
      points: [
        'Overflow happens when the answer is too big to fit in the number of bits available.',
        'Unsigned 8 bits hold 0–255. If the answer needs a ninth bit, an overflow has occurred: 200 + 100 = 300, but only 00101100 (44) is stored.',
        'In two’s complement, adding two positive numbers and getting a negative result (sign bit 1) is overflow.',
        'In an exam, say it in full: “an overflow error has occurred”.'
      ]
    },
    {
      spec: '4.4.1', lesson: 2,
      heading: 'Subtracting by adding',
      points: [
        'To work out A − B, add A to the two’s complement of B.',
        'Discard any carry out beyond the word size – for subtraction that carry is normal, not overflow.',
        'Example: 60 − 25. 25 = 00011001 → two’s complement 11100111. 00111100 + 11100111 = 1 00100011. Discard the ninth bit: 00100011 = 35.'
      ]
    },
    /* ---------- 4.4.2 ---------- */
    {
      spec: '4.4.2', lesson: 1,
      heading: 'Sign and magnitude',
      points: [
        'The most significant bit (MSB) is the sign: 0 = positive, 1 = negative. The other 7 bits are the size (magnitude).',
        '−45: 45 = 0101101, so −45 = 10101101.',
        'Range with 8 bits: −127 to +127.',
        'Problems: there are two zeros (00000000 and 10000000), and arithmetic is harder.'
      ]
    },
    {
      spec: '4.4.2', lesson: 1,
      heading: 'Two’s complement',
      points: [
        'The MSB is worth <strong>−128</strong> instead of +128; the other place values are the same.',
        'Only one zero, and subtraction can be done by adding – which is why it is used in almost every modern CPU.',
        'Range with 8 bits: −128 to +127.',
        '<strong>Making a negative number:</strong> write the positive in binary, flip every bit, add 1. −45: 00101101 → 11010010 → 11010011.',
        '<strong>Shortcut:</strong> from the right, copy every bit up to and including the first 1, then flip the rest.',
        '<strong>Reading one:</strong> either use −128 as the first place value (10110110 = −128 + 32 + 16 + 4 + 2 = −74), or flip and add 1 to find the size, then put a minus sign in front.'
      ]
    },
    {
      spec: '4.4.2', lesson: 1,
      heading: 'One pattern, three meanings',
      html: '<table><thead><tr><th scope="col">Bits</th><th scope="col">Unsigned</th><th scope="col">Sign and magnitude</th><th scope="col">Two’s complement</th></tr></thead><tbody>' +
        '<tr><td>10000001</td><td>129</td><td>−1</td><td>−127</td></tr>' +
        '<tr><td>10000011</td><td>131</td><td>−3</td><td>−125</td></tr>' +
        '</tbody></table>' +
        '<p>Ranges for n bits – two’s complement: −2<sup>n−1</sup> to 2<sup>n−1</sup> − 1. Sign and magnitude: −(2<sup>n−1</sup> − 1) to 2<sup>n−1</sup> − 1.</p>'
    },
    /* ---------- 4.4.3 ---------- */
    {
      spec: '4.4.3', lesson: 3,
      heading: 'What is floating point?',
      points: [
        'A number is stored as a <strong>mantissa</strong> × 2<sup><strong>exponent</strong></sup> – just like standard form in maths (3.2 × 10<sup>4</sup>), but in base 2.',
        'The mantissa holds the digits; the exponent says how far to move the binary point.',
        'Only the mantissa and exponent are stored. The base (2) and the binary point (just after the first bit of the mantissa) are not stored.',
        'Both the mantissa and the exponent are in two’s complement.',
        'Sizes vary from question to question – for example an 8-bit mantissa with a 4-bit exponent, 8 + 3, 5 + 3 or 12 + 4. Always check.'
      ]
    },
    {
      spec: '4.4.3', lesson: 3,
      heading: 'Why use floating point?',
      points: [
        'An 8-bit integer can only hold whole numbers from 0 to 255.',
        'Floating point gives a much bigger range, including fractions and very large or very small numbers.',
        'Uses: scientific values, graphics and games, engineering, and very small measurements.'
      ]
    },
    /* ---------- 4.4.4 ---------- */
    {
      spec: '4.4.4', lesson: 3,
      heading: 'Floating point → denary (3 steps)',
      points: [
        '<strong>1. Mantissa:</strong> work out its value using the place values −1 . ½ ¼ ⅛ …',
        '<strong>2. Exponent:</strong> work out its value in two’s complement (for 4 bits: −8 4 2 1).',
        '<strong>3. Move the binary point</strong> right by the exponent (left if it is negative), then read the answer.',
        'Example: mantissa 01010000, exponent 0011. Mantissa = 0.1010000; exponent = 3; move the point 3 places right: 0101.0000 = 5.'
      ]
    },
    {
      spec: '4.4.4', lesson: 3,
      heading: 'Denary → floating point (4 steps)',
      points: [
        '<strong>1.</strong> Write the number in fixed-point binary: 6.25 = 110.01.',
        '<strong>2. Normalise:</strong> move the point so the mantissa starts 0.1 (positive): 0.11001.',
        '<strong>3. Exponent:</strong> count how many places the point moved – 3 places, so exponent 3 = 0011.',
        '<strong>4. Pad</strong> the mantissa to its full size with 0s on the right: 01100100.'
      ]
    },
    {
      spec: '4.4.4', lesson: 3,
      heading: 'Normalisation, range and precision',
      points: [
        '<strong>Normalised:</strong> a positive mantissa starts 0.1; a negative mantissa starts 1.0. This gives the most precision and only one way to store each number.',
        '<strong>Largest value:</strong> fill the mantissa (0.1111111) and use the biggest exponent. With an 8-bit mantissa and 3-bit exponent: 0.1111111 × 2<sup>3</sup> = 7.9375.',
        '<strong>Smallest positive normalised value</strong> (using 0 as the lowest exponent): 0.1000000 × 2<sup>0</sup> = 0.5.',
        'More bits in the <strong>mantissa</strong> → more <strong>precision</strong>. More bits in the <strong>exponent</strong> → more <strong>range</strong>. 5 + 3 bits: largest 7.5. 4 + 4 bits: largest 112.'
      ]
    },
    {
      spec: '4.4.4', lesson: 3,
      heading: 'Integer vs floating point',
      html: '<table><thead><tr><th scope="col">Integer – advantages</th><th scope="col">Floating point – advantages</th></tr></thead><tbody>' +
        '<tr><td>Always stored accurately</td><td>Can store very large and very small numbers</td></tr>' +
        '<tr><td>Less complex processing, so faster</td><td>A much larger range for the same number of bits</td></tr>' +
        '<tr><td>Zero is stored exactly</td><td>Can store fractions</td></tr>' +
        '<tr><td>Uses less storage</td><td></td></tr>' +
        '</tbody></table>'
    },
    /* ---------- 4.4.5 ---------- */
    {
      spec: '4.4.5', lesson: 2,
      heading: 'Binary fractions',
      html: '<table><thead><tr><th scope="col">4</th><th scope="col">2</th><th scope="col">1</th><th scope="col">.</th><th scope="col">½</th><th scope="col">¼</th><th scope="col">⅛</th><th scope="col">1/16</th></tr></thead><tbody>' +
        '<tr><td>1</td><td>1</td><td>0</td><td>.</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>' +
        '</tbody></table>' +
        '<p>After the binary point the place values are 0.5, 0.25, 0.125, 0.0625. 110.1011 = 4 + 2 + 0.5 + 0.125 + 0.0625 = 6.6875. Line up the binary points before adding.</p>'
    },
    {
      spec: '4.4.5', lesson: 2,
      heading: 'Truncation and rounding',
      points: [
        '<strong>Truncation</strong> cuts off the extra digits. The number always moves nearer to zero. 13.6 → 13.',
        '<strong>Rounding</strong> goes to the nearest value that fits: 13.6 → 14. In binary, if the next bit is 1, round up.',
        'Rounding is usually more accurate than truncation.',
        '110.1011 kept to 2 binary places: truncated = 110.10 (6.5); rounded = 110.11 (6.75).'
      ]
    },
    {
      spec: '4.4.5', lesson: 2,
      heading: 'Absolute and relative error',
      points: [
        '<strong>Absolute error</strong> = |true value − approximation|.',
        '<strong>Relative error</strong> = absolute error ÷ true value (as a decimal or a percentage).',
        '6.6875 truncated to 6.5: absolute error 0.1875, relative error ≈ 0.028 (2.8%).',
        '6.6875 rounded to 6.75: absolute error 0.0625, relative error ≈ 0.0093 (0.93%).',
        'Welsh terms: truncation – blaendorri; rounding – talgrynnu; absolute error – gwall absoliwt; relative error – gwall cymharol; binary point – pwynt deuaidd.'
      ]
    },
    {
      spec: '4.4.1', lesson: 2,
      heading: 'Welsh terms: binary arithmetic',
      points: [
        'binary addition – adio deuaidd',
        'carry – cario',
        'overflow – gorlif',
        'subtraction – tynnu'
      ]
    }
  ],

  /* ===================================================== MISCONCEPTIONS (from the lessons) */
  misconceptions: [
    { spec: '4.1.1', lesson: 1, wrong: 'A word is just a group of bits.', right: 'A word is the number of bits the CPU can manipulate as a single unit – typically 32 or 64 bits.' },
    { spec: '4.4.1', lesson: 2, wrong: 'The carry out of the left-hand bit when subtracting by adding means overflow.', right: 'When subtracting with two’s complement, the carry beyond the word size is normal and is discarded.' },
    { spec: '4.4.2', lesson: 1, wrong: 'To make a negative two’s complement number, just flip the bits.', right: 'Flip every bit and then add 1 (or copy up to and including the first 1 from the right, then flip the rest).' },
    { spec: '4.4.5', lesson: 2, wrong: 'Truncation and rounding give the same answer.', right: 'Truncation just cuts digits off, so the number moves towards zero. Rounding goes to the nearest value, so it is usually more accurate.' }
  ],

  /* ===================================================== EXAM TECHNIQUE (from the lessons) */
  examTips: [
    { spec: '4.1.2', lesson: 1, text: 'Always write all 8 bits, including leading 0s, and show your place-value working.' },
    { spec: '4.4.1', lesson: 2, text: 'Show a labelled carry row in every binary addition – a correct answer without it can lose a mark.' },
    { spec: '4.4.1', lesson: 2, text: 'If the answer does not fit, say so in full: “an overflow error has occurred”.' },
    { spec: '4.4.4', lesson: 3, text: 'Check the mantissa and exponent sizes in the question before you start – they change from paper to paper.' },
    { spec: '4.4.5', lesson: 2, text: 'Line up the binary points before adding fractions, and show both the absolute and relative error working.' }
  ],

  /* ============================================================== FLASHCARDS */
  flashcards: [
    /* 4.1.1 */
    { id: 'u1t4-411-fc1', spec: '4.1.1', lesson: 1, front: 'Bit?', back: 'A single binary digit, 0 or 1 – the smallest unit of data.' },
    { id: 'u1t4-411-fc2', spec: '4.1.1', lesson: 1, front: 'Byte?', back: '8 bits – 256 values, 0 to 255.' },
    { id: 'u1t4-411-fc3', spec: '4.1.1', lesson: 1, front: 'Word?', back: 'The total number of bits that can be manipulated as a single unit by the CPU (typically 32 or 64 bits).' },
    /* 4.1.2 */
    { id: 'u1t4-412-fc1', spec: '4.1.2', lesson: 1, front: 'The 8 binary place values?', back: '128 64 32 16 8 4 2 1.' },
    { id: 'u1t4-412-fc2', spec: '4.1.2', lesson: 1, front: 'Three reasons to use hexadecimal?', back: 'Shorter (one digit = four bits), fewer mistakes when reading and writing, and it converts instantly to and from binary.' },
    { id: 'u1t4-412-fc3', spec: '4.1.2', lesson: 1, front: 'Binary → hex method?', back: 'Split into nibbles of 4 from the right (pad with 0s), then convert each nibble using 8 4 2 1.' },
    { id: 'u1t4-412-fc4', spec: '4.1.2', lesson: 1, front: 'Denary → hex method?', back: 'Divide by 16, write down the remainders, and read them from the bottom up.' },
    { id: 'u1t4-412-fc5', spec: '4.1.2', lesson: 1, front: 'Hex digits A–F in denary?', back: 'A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.' },
    /* 4.4.1 */
    { id: 'u1t4-441-fc1', spec: '4.4.1', lesson: 2, front: '1 + 1 and 1 + 1 + 1 in binary?', back: '1 + 1 = 0 carry 1. 1 + 1 + 1 = 1 carry 1.' },
    { id: 'u1t4-441-fc2', spec: '4.4.1', lesson: 2, front: 'What is overflow?', back: 'The result is too big for the bits available – e.g. it needs a ninth bit, or in two’s complement two positives give a negative.' },
    { id: 'u1t4-441-fc3', spec: '4.4.1', lesson: 2, front: 'How do you subtract in binary?', back: 'Add the two’s complement of the number being subtracted, and discard the carry beyond the word size.' },
    { id: 'u1t4-441-fc4', spec: '4.4.1', lesson: 2, front: 'Overflow in Welsh?', back: 'Gorlif.' },
    /* 4.4.2 */
    { id: 'u1t4-442-fc1', spec: '4.4.2', lesson: 1, front: 'Sign and magnitude: how does it work, and what is its 8-bit range?', back: 'MSB is the sign (0 +, 1 −), the other 7 bits are the size. Range −127 to +127.' },
    { id: 'u1t4-442-fc2', spec: '4.4.2', lesson: 1, front: 'Two problems with sign and magnitude?', back: 'Two zeros (00000000 and 10000000), and arithmetic is harder.' },
    { id: 'u1t4-442-fc3', spec: '4.4.2', lesson: 1, front: 'Two’s complement: MSB value and 8-bit range?', back: 'MSB is worth −128. Range −128 to +127.' },
    { id: 'u1t4-442-fc4', spec: '4.4.2', lesson: 1, front: 'How do you make a negative two’s complement number?', back: 'Write the positive, flip every bit, add 1. Shortcut: copy up to and including the first 1 from the right, flip the rest.' },
    { id: 'u1t4-442-fc5', spec: '4.4.2', lesson: 1, front: 'Two’s complement range for n bits?', back: '−2<sup>n−1</sup> to 2<sup>n−1</sup> − 1.' },
    /* 4.4.3 */
    { id: 'u1t4-443-fc1', spec: '4.4.3', lesson: 3, front: 'Floating point form?', back: 'Mantissa × 2<sup>exponent</sup> – like standard form, in base 2.' },
    { id: 'u1t4-443-fc2', spec: '4.4.3', lesson: 3, front: 'What is not stored in floating point?', back: 'The base (2) and the binary point (just after the first bit of the mantissa).' },
    { id: 'u1t4-443-fc3', spec: '4.4.3', lesson: 3, front: 'Uses of floating point?', back: 'Scientific values, graphics and games, engineering, very small measurements.' },
    /* 4.4.4 */
    { id: 'u1t4-444-fc1', spec: '4.4.4', lesson: 3, front: 'What does a normalised mantissa start with?', back: 'Positive: 0.1. Negative: 1.0.' },
    { id: 'u1t4-444-fc2', spec: '4.4.4', lesson: 3, front: 'More mantissa bits give…? More exponent bits give…?', back: 'Mantissa → more precision. Exponent → more range.' },
    { id: 'u1t4-444-fc3', spec: '4.4.4', lesson: 3, front: 'Advantages of integer form?', back: 'Stored accurately, less complex (faster) processing, exact zero, less storage.' },
    { id: 'u1t4-444-fc4', spec: '4.4.4', lesson: 3, front: 'Advantages of floating point form?', back: 'Very large and very small numbers, a larger range, and fractions.' },
    /* 4.4.5 */
    { id: 'u1t4-445-fc1', spec: '4.4.5', lesson: 2, front: 'Truncation vs rounding?', back: 'Truncation cuts digits off (moves towards zero). Rounding goes to the nearest value (next bit 1 → round up).' },
    { id: 'u1t4-445-fc2', spec: '4.4.5', lesson: 2, front: 'Absolute and relative error?', back: 'Absolute = |true − approximation|. Relative = absolute ÷ true value.' },
    { id: 'u1t4-445-fc3', spec: '4.4.5', lesson: 2, front: 'Place values after the binary point?', back: '0.5, 0.25, 0.125, 0.0625 (½, ¼, ⅛, 1/16).' }
  ],

  /* =============================================================== QUESTIONS */
  questions: [
    /* ---------- 4.1.1 ---------- */
    {
      id: 'u1t4-411-q1', spec: '4.1.1', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which is the best definition of a <strong>word</strong>?',
      options: ['The number of bits that can be manipulated as a single unit by the CPU', 'A group of bits', '8 bits', 'Four bytes, always'],
      answer: 0,
      feedback: ['', '“A group of bits” is too vague to earn the mark.', 'That is a byte.', 'A word is often 32 bits (4 bytes), but it depends on the CPU.'],
      explanation: 'A word is the total number of bits that can be manipulated as a single unit by the CPU – typically 32 or 64 bits.'
    },
    {
      id: 'u1t4-411-q2', spec: '4.1.1', lesson: 1, type: 'input', skill: 'recall',
      question: 'How many different values can one byte hold?',
      accept: ['256'],
      explanation: 'A byte is 8 bits, so 2<sup>8</sup> = 256 values (0 to 255).'
    },
    {
      id: 'u1t4-411-q3', spec: '4.1.1', lesson: 1, type: 'input', skill: 'application',
      question: 'How many bytes are there in a 64-bit word?',
      accept: ['8'],
      explanation: '64 ÷ 8 = 8 bytes.'
    },
    /* ---------- 4.1.2 ---------- */
    {
      id: 'u1t4-412-q1', spec: '4.1.2', lesson: 1, type: 'input', skill: 'application',
      question: 'Convert the binary number <code>10011101</code> to denary.',
      accept: ['157'],
      explanation: '128 + 16 + 8 + 4 + 1 = 157.'
    },
    {
      id: 'u1t4-412-q2', spec: '4.1.2', lesson: 1, type: 'input', skill: 'application',
      question: 'Convert 109 to 8-bit binary.',
      accept: ['01101101'],
      ignoreSpaces: true,
      explanation: '109 = 64 + 32 + 8 + 4 + 1 → 01101101. Remember the leading 0.'
    },
    {
      id: 'u1t4-412-q3', spec: '4.1.2', lesson: 1, type: 'input', skill: 'application',
      question: 'Convert the binary number <code>11101010</code> to hexadecimal.',
      accept: ['EA'],
      explanation: '1110 = 14 = E; 1010 = 10 = A. So EA.'
    },
    {
      id: 'u1t4-412-q4', spec: '4.1.2', lesson: 1, type: 'input', skill: 'application',
      question: 'Convert the hexadecimal number <code>3C</code> to 8-bit binary.',
      accept: ['00111100'],
      ignoreSpaces: true,
      explanation: '3 = 0011, C = 12 = 1100. So 00111100.'
    },
    {
      id: 'u1t4-412-q5', spec: '4.1.2', lesson: 1, type: 'input', skill: 'application',
      question: 'Convert 200 to hexadecimal.',
      accept: ['C8'],
      explanation: '200 ÷ 16 = 12 remainder 8. 12 = C, so C8.'
    },
    {
      id: 'u1t4-412-q6', spec: '4.1.2', lesson: 1, type: 'input', skill: 'application',
      question: 'Convert the hexadecimal number <code>9F</code> to denary.',
      accept: ['159'],
      explanation: '9 × 16 = 144; F = 15; 144 + 15 = 159.'
    },
    {
      id: 'u1t4-412-q7', spec: '4.1.2', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Why do programmers often write values in hexadecimal rather than binary?',
      options: ['It is shorter and easier to read, so there are fewer mistakes', 'The computer stores numbers in hexadecimal', 'Hexadecimal uses less memory', 'Hexadecimal can store bigger numbers'],
      answer: 0,
      feedback: ['', 'The computer still stores everything in binary.', 'The value takes the same number of bits either way.', 'The same value is stored whichever way it is written.'],
      explanation: 'One hex digit stands for four bits, so hex is shorter, easier for people to read and convert, and leads to fewer mistakes.'
    },
    /* ---------- 4.4.1 ---------- */
    {
      id: 'u1t4-441-q1', spec: '4.4.1', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'In binary, 1 + 1 + 1 = ?',
      options: ['1 carry 1', '0 carry 1', '1 carry 0', '0 carry 0'],
      answer: 0,
      feedback: ['', 'That is 1 + 1.', '1 + 1 + 1 is 3, which needs a carry.', '1 + 1 + 1 is not zero.'],
      explanation: '1 + 1 + 1 = 3 = 11 in binary: write 1, carry 1.'
    },
    {
      id: 'u1t4-441-q2', spec: '4.4.1', lesson: 2, type: 'input', skill: 'application',
      question: 'Add <code>00110101</code> and <code>01001110</code>. Give the 8-bit result.',
      accept: ['10000011'],
      ignoreSpaces: true,
      explanation: '53 + 78 = 131 = 10000011. It fits in 8 unsigned bits, so there is no overflow.'
    },
    {
      id: 'u1t4-441-q3', spec: '4.4.1', lesson: 2, type: 'mcq', skill: 'application',
      question: 'Two unsigned 8-bit numbers, 200 and 100, are added. What happens?',
      options: ['An overflow error occurs – the answer needs a ninth bit', 'The answer 300 is stored correctly', 'The answer is stored as a negative number', 'The computer rounds the answer to 255'],
      answer: 0,
      feedback: ['', '8 unsigned bits only hold 0 to 255.', 'These are unsigned numbers.', 'The extra bit is lost; nothing is rounded.'],
      explanation: '300 needs 9 bits. Only the lower 8 bits, 00101100 (44), are kept – an overflow error has occurred.'
    },
    {
      id: 'u1t4-441-q4', spec: '4.4.1', lesson: 2, type: 'mcq', skill: 'application',
      question: 'In 8-bit two’s complement, 100 + 50 gives <code>10010110</code>. What does this show?',
      options: ['Overflow – two positives have given a negative result', 'The correct answer, 150', 'A carry that should be discarded', 'A rounding error'],
      answer: 0,
      feedback: ['', '+150 is outside the range −128 to +127.', 'There is no ninth bit here; the sign bit has changed.', 'This is an overflow, not rounding.'],
      explanation: 'The sign bit is 1, so the result reads as −106. Positive + positive = negative means an overflow error has occurred.'
    },
    {
      id: 'u1t4-441-q5', spec: '4.4.1', lesson: 2, type: 'input', skill: 'application',
      question: 'Work out 60 − 25 by adding <code>00111100</code> to the two’s complement of 25 (<code>11100111</code>). Give the 8-bit result.',
      accept: ['00100011'],
      ignoreSpaces: true,
      explanation: '00111100 + 11100111 = 1 00100011. Discard the ninth bit: 00100011 = 35.'
    },
    {
      id: 'u1t4-441-q6', spec: '4.4.1', lesson: 2, type: 'mcq', skill: 'technique',
      question: 'A student gives the correct answer to a binary addition but shows no working. What are they most likely to lose?',
      options: ['A mark for the carry row', 'Nothing – only the answer is marked', 'All the marks', 'A mark for not converting to denary'],
      answer: 0,
      feedback: ['', 'The working is marked as well as the answer.', 'The correct answer still earns credit.', 'Conversion to denary is not needed unless asked.'],
      explanation: 'Always write a labelled carry row – a correct answer without it can lose a mark.'
    },
    {
      id: 'u1t4-441-q7', spec: '4.4.1', lesson: 2, type: 'mcq', skill: 'technique',
      question: 'Which wording gets the mark when an addition does not fit in 8 bits?',
      options: ['“An overflow error has occurred”', '“The number is too big”', '“It doesn’t work”', '“There is a carry”'],
      answer: 0,
      feedback: ['', 'Use the technical term.', 'Too vague – name the error.', 'A carry on its own is normal.'],
      explanation: 'Use the key term and say it in full: “an overflow error has occurred”.'
    },
    /* ---------- 4.4.2 ---------- */
    {
      id: 'u1t4-442-q1', spec: '4.4.2', lesson: 1, type: 'input', skill: 'application',
      question: 'Write −45 in 8-bit sign and magnitude.',
      accept: ['10101101'],
      ignoreSpaces: true,
      explanation: '45 = 0101101 in 7 bits; put a sign bit of 1 in front: 10101101.'
    },
    {
      id: 'u1t4-442-q2', spec: '4.4.2', lesson: 1, type: 'input', skill: 'application',
      question: 'Write −45 in 8-bit two’s complement.',
      accept: ['11010011'],
      ignoreSpaces: true,
      explanation: '45 = 00101101 → flip → 11010010 → add 1 → 11010011.'
    },
    {
      id: 'u1t4-442-q3', spec: '4.4.2', lesson: 1, type: 'input', skill: 'application',
      question: 'Convert the 8-bit two’s complement number <code>10110110</code> to denary.',
      accept: ['-74'],
      explanation: '−128 + 32 + 16 + 4 + 2 = −74.'
    },
    {
      id: 'u1t4-442-q4', spec: '4.4.2', lesson: 1, type: 'input', skill: 'application',
      question: 'Write −20 in 8-bit two’s complement.',
      accept: ['11101100'],
      ignoreSpaces: true,
      explanation: '20 = 00010100. Copy up to and including the first 1 from the right (100), flip the rest (11101): 11101100.'
    },
    {
      id: 'u1t4-442-q5', spec: '4.4.2', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'What is the range of 8-bit two’s complement?',
      options: ['−128 to +127', '−127 to +127', '0 to 255', '−255 to +255'],
      answer: 0,
      feedback: ['', 'That is sign and magnitude.', 'That is unsigned binary.', '8 bits only give 256 different values.'],
      explanation: 'The MSB is worth −128, so the range is −128 (10000000) to +127 (01111111).'
    },
    {
      id: 'u1t4-442-q6', spec: '4.4.2', lesson: 1, type: 'mcq', skill: 'recall',
      question: 'Which is a disadvantage of sign and magnitude compared with two’s complement?',
      options: ['It has two representations of zero', 'It cannot store negative numbers', 'It needs 16 bits', 'Its range is larger'],
      answer: 0,
      feedback: ['', 'The sign bit is there to store negatives.', 'It works in 8 bits.', 'A larger range would be an advantage – and it is actually smaller by one.'],
      explanation: 'Sign and magnitude has two zeros (00000000 and 10000000), and arithmetic with it is harder.'
    },
    {
      id: 'u1t4-442-q7', spec: '4.4.2', lesson: 1, type: 'mcq', skill: 'application',
      question: 'What does <code>10000011</code> represent in 8-bit two’s complement?',
      options: ['−125', '−3', '131', '−131'],
      answer: 0,
      feedback: ['', 'That is the sign and magnitude reading.', 'That is the unsigned reading.', 'Two’s complement cannot go below −128.'],
      explanation: '−128 + 2 + 1 = −125. The same bits are 131 unsigned and −3 in sign and magnitude.'
    },
    /* ---------- 4.4.3 ---------- */
    {
      id: 'u1t4-443-q1', spec: '4.4.3', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'In floating point form, a number is stored as…',
      options: ['mantissa × 2<sup>exponent</sup>', 'exponent × 2<sup>mantissa</sup>', 'mantissa × 10<sup>exponent</sup>', 'sign bit + magnitude'],
      answer: 0,
      feedback: ['', 'The exponent is the power.', 'The base in binary is 2, not 10.', 'That is sign and magnitude for integers.'],
      explanation: 'Floating point is like standard form in base 2: mantissa × 2<sup>exponent</sup>.'
    },
    {
      id: 'u1t4-443-q2', spec: '4.4.3', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'Which of these is <strong>not</strong> stored as part of a floating point number?',
      options: ['The base and the binary point', 'The mantissa', 'The exponent', 'The sign of the mantissa'],
      answer: 0,
      feedback: ['', 'The mantissa is stored.', 'The exponent is stored.', 'The sign is part of the two’s complement mantissa.'],
      explanation: 'Only the mantissa and exponent are stored; the base (2) and the binary point position are understood.'
    },
    {
      id: 'u1t4-443-q3', spec: '4.4.3', lesson: 3, type: 'mcq', skill: 'application',
      question: 'Which value would most need floating point rather than an 8-bit integer?',
      options: ['The mass of an electron in a scientific program', 'The number of students in a class', 'A day of the month', 'A shoe size in whole numbers'],
      answer: 0,
      feedback: ['', 'A whole number under 255 fits an integer.', 'A whole number from 1 to 31.', 'A small whole number.'],
      explanation: 'Very small (or very large) values and fractions need the range of floating point.'
    },
    /* ---------- 4.4.4 ---------- */
    {
      id: 'u1t4-444-q1', spec: '4.4.4', lesson: 3, type: 'input', skill: 'application',
      question: 'A floating point number has mantissa <code>01101000</code> and exponent <code>0010</code>. What is it in denary?',
      accept: ['3.25'],
      explanation: 'Mantissa 0.1101000 = 0.8125. Exponent = 2: move the point 2 places right → 011.01000 = 3.25.'
    },
    {
      id: 'u1t4-444-q2', spec: '4.4.4', lesson: 3, type: 'input', skill: 'application',
      question: 'A floating point number has mantissa <code>01010000</code> and exponent <code>0011</code>. What is it in denary?',
      accept: ['5'],
      explanation: 'Mantissa 0.1010000; exponent 3; move the point 3 places right → 0101.0000 = 5.'
    },
    {
      id: 'u1t4-444-q3', spec: '4.4.4', lesson: 3, type: 'input', skill: 'application',
      question: 'Store 5.5 using an 8-bit normalised mantissa. What is the mantissa?',
      accept: ['01011000'],
      ignoreSpaces: true,
      explanation: '5.5 = 101.1 → normalise to 0.1011 (point moves 3 places, exponent 0011) → pad: 01011000.'
    },
    {
      id: 'u1t4-444-q4', spec: '4.4.4', lesson: 3, type: 'input', skill: 'application',
      question: 'A floating point number has mantissa <code>10100000</code> and exponent <code>0010</code>. What is it in denary?',
      accept: ['-3'],
      explanation: 'Mantissa 1.0100000 = −1 + 0.25 = −0.75. Exponent 2: −0.75 × 4 = −3.'
    },
    {
      id: 'u1t4-444-q5', spec: '4.4.4', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'Which mantissa is normalised?',
      options: ['01100000', '00110000', '11000000', '00011000'],
      answer: 0,
      feedback: ['', 'A positive normalised mantissa starts 0.1.', 'A negative normalised mantissa starts 1.0.', 'A positive normalised mantissa starts 0.1.'],
      explanation: 'Normalised: a positive mantissa starts 0.1 and a negative mantissa starts 1.0. Only 01100000 fits.'
    },
    {
      id: 'u1t4-444-q6', spec: '4.4.4', lesson: 3, type: 'input', skill: 'application',
      question: 'What is the largest value that can be stored with an 8-bit mantissa and a 3-bit exponent?',
      accept: ['7.9375'],
      explanation: 'Largest mantissa 0.1111111 = 0.9921875; largest exponent 011 = 3. 0.9921875 × 8 = 7.9375.'
    },
    {
      id: 'u1t4-444-q7', spec: '4.4.4', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'Keeping the same total number of bits, what happens if you move a bit from the mantissa to the exponent?',
      options: ['Range increases, precision decreases', 'Precision increases, range decreases', 'Both increase', 'Nothing changes'],
      answer: 0,
      feedback: ['', 'That is the effect of a bigger mantissa.', 'There is always a trade-off.', 'The split matters.'],
      explanation: 'More exponent bits → more range; fewer mantissa bits → less precision.'
    },
    {
      id: 'u1t4-444-q8', spec: '4.4.4', lesson: 3, type: 'mcq', skill: 'recall',
      question: 'Which is an advantage of integer form over floating point?',
      options: ['Numbers are stored accurately and processing is less complex', 'It can store fractions', 'It has a larger range', 'It can store very small numbers'],
      answer: 0,
      feedback: ['', 'That is floating point.', 'That is floating point.', 'That is floating point.'],
      explanation: 'Integers are stored exactly, process faster, store zero exactly and use less storage.'
    },
    {
      id: 'u1t4-444-q9', spec: '4.4.4', lesson: 3, type: 'mcq', skill: 'technique',
      question: 'Before converting in a floating point question, what should you check first?',
      options: ['How many bits the mantissa and exponent have', 'Whether the answer is a whole number', 'Whether the number is in hexadecimal', 'Whether to use sign and magnitude'],
      answer: 0,
      feedback: ['', 'You find this out by converting.', 'Floating point questions are given in binary.', 'Both parts are in two’s complement.'],
      explanation: 'Sizes vary (8 + 4, 8 + 3, 5 + 3, 12 + 4…), so check them before you start.'
    },
    /* ---------- 4.4.5 ---------- */
    {
      id: 'u1t4-445-q1', spec: '4.4.5', lesson: 2, type: 'input', skill: 'application',
      question: 'Convert the binary number <code>110.1011</code> to denary.',
      accept: ['6.6875'],
      explanation: '4 + 2 + 0.5 + 0.125 + 0.0625 = 6.6875.'
    },
    {
      id: 'u1t4-445-q2', spec: '4.4.5', lesson: 2, type: 'input', skill: 'application',
      question: 'Truncate <code>110.1011</code> to 2 binary places. Give the binary answer.',
      accept: ['110.10'],
      ignoreSpaces: true,
      explanation: 'Truncation cuts off the extra digits: 110.10 (6.5).'
    },
    {
      id: 'u1t4-445-q3', spec: '4.4.5', lesson: 2, type: 'input', skill: 'application',
      question: 'Round <code>110.1011</code> to 2 binary places. Give the binary answer.',
      accept: ['110.11'],
      ignoreSpaces: true,
      explanation: 'The next bit after the second place is 1, so round up: 110.10 → 110.11 (6.75).'
    },
    {
      id: 'u1t4-445-q4', spec: '4.4.5', lesson: 2, type: 'input', skill: 'application',
      question: 'The true value 6.6875 is stored as 6.5. What is the absolute error?',
      accept: ['0.1875'],
      explanation: '|6.6875 − 6.5| = 0.1875.'
    },
    {
      id: 'u1t4-445-q5', spec: '4.4.5', lesson: 2, type: 'mcq', skill: 'recall',
      question: 'How is relative error calculated?',
      options: ['Absolute error ÷ true value', 'True value − approximation', 'Approximation ÷ true value', 'Absolute error × true value'],
      answer: 0,
      feedback: ['', 'That is the absolute error.', 'That gives a ratio of the values, not the error.', 'Divide, don’t multiply.'],
      explanation: 'Relative error = absolute error ÷ true value, as a decimal or a percentage.'
    },
    {
      id: 'u1t4-445-q6', spec: '4.4.5', lesson: 2, type: 'mcq', skill: 'application',
      question: '13.6 is stored as a whole number. Which is true?',
      options: ['Truncation gives 13 (error 0.6); rounding gives 14 (error 0.4)', 'Both give 14', 'Truncation gives 14; rounding gives 13', 'Both give 13'],
      answer: 0,
      feedback: ['', 'Truncation just cuts off the .6.', 'They are the other way round.', 'Rounding goes to the nearest whole number.'],
      explanation: 'Truncation moves towards zero (13); rounding goes to the nearest (14), which is more accurate here.'
    },
    {
      id: 'u1t4-445-q7', spec: '4.4.5', lesson: 2, type: 'mcq', skill: 'technique',
      question: 'Before adding two binary fractions, what must you do?',
      options: ['Line up the binary points', 'Convert both to hexadecimal', 'Truncate both numbers', 'Round both numbers'],
      answer: 0,
      feedback: ['', 'Hex isn’t needed.', 'That would lose accuracy.', 'That would lose accuracy.'],
      explanation: 'Line up the binary points so each column has the same place value, just like denary decimals.'
    }
  ],

  /* ============================================================== EXAM-STYLE */
  exam: [
    {
      id: 'u1t4-411-e1', spec: '4.1.1', lesson: 1, marks: 3,
      question: 'Explain the terms <strong>bit</strong>, <strong>byte</strong> and <strong>word</strong>.',
      markPoints: [
        'Bit: a single binary digit, 0 or 1.',
        'Byte: a group of 8 bits.',
        'Word: the number of bits that can be manipulated as a single unit by the CPU.'
      ],
      technique: '“A group of bits” is not enough for word – say it is handled as a single unit by the CPU.'
    },
    {
      id: 'u1t4-412-e1', spec: '4.1.2', lesson: 1, marks: 3,
      question: 'Convert 230 into 8-bit binary and into hexadecimal, and give one reason why hexadecimal is used.',
      markPoints: [
        '230 = 11100110.',
        '230 = E6.',
        'Hex is shorter / easier for people to read, so fewer mistakes are made (and it converts easily to binary).'
      ],
      technique: 'Show the place-value or division working for each conversion.'
    },
    {
      id: 'u1t4-441-e1', spec: '4.4.1', lesson: 2, marks: 3,
      question: 'Add the unsigned 8-bit numbers <code>11010010</code> and <code>01011001</code>. Show your working and comment on the result.',
      markPoints: [
        'A labelled carry row is shown.',
        'Result: 1 00101011 – the 8 bits stored are 00101011.',
        'The answer needs a ninth bit (210 + 89 = 299 &gt; 255), so an overflow error has occurred.'
      ],
      technique: 'Work right to left with a carry row; if a ninth bit appears, say “an overflow error has occurred”.'
    },
    {
      id: 'u1t4-441-e2', spec: '4.4.1', lesson: 2, marks: 3,
      question: 'Using 8-bit two’s complement, calculate 45 − 18 by addition. Show your working.',
      markPoints: [
        '18 = 00010010 → two’s complement −18 = 11101110.',
        '00101101 + 11101110 = 1 00011011, with carries shown.',
        'Discard the ninth bit: 00011011 = 27.'
      ],
      technique: 'The carry out beyond 8 bits is discarded – it is not overflow when subtracting.'
    },
    {
      id: 'u1t4-442-e1', spec: '4.4.2', lesson: 1, marks: 4,
      question: 'Represent −37 in 8-bit sign and magnitude and in 8-bit two’s complement, and give one reason why two’s complement is used in most CPUs.',
      markPoints: [
        'Sign and magnitude: 10100101.',
        'Two’s complement: 11011011.',
        'Working shown: 37 = 00100101, flip → 11011010, add 1.',
        'Two’s complement has only one zero / subtraction can be done by adding / arithmetic is simpler.'
      ]
    },
    {
      id: 'u1t4-443-e1', spec: '4.4.3', lesson: 3, marks: 2,
      question: 'Describe floating point form and give one use for it.',
      markPoints: [
        'A number is stored as a mantissa and an exponent: mantissa × 2<sup>exponent</sup> (only these two parts are stored, both in two’s complement).',
        'Use: scientific values / graphics and games / engineering / very small measurements.'
      ]
    },
    {
      id: 'u1t4-444-e1', spec: '4.4.4', lesson: 3, marks: 4,
      question: 'Convert 6.25 into floating point form using an 8-bit mantissa and a 4-bit exponent, both in two’s complement. Show your working.',
      markPoints: [
        'Fixed-point binary: 110.01.',
        'Normalised: 0.11001.',
        'Exponent: point moved 3 places → 0011.',
        'Mantissa padded to 8 bits: 01100100.'
      ],
      technique: 'Four steps: fixed point, normalise, exponent, pad.'
    },
    {
      id: 'u1t4-444-e2', spec: '4.4.4', lesson: 3, marks: 4,
      question: 'State two advantages of integer form and two advantages of floating point form.',
      markPoints: [
        'Integer: stored accurately / exact zero.',
        'Integer: less complex, faster processing / uses less storage.',
        'Floating point: can store very large and very small numbers / larger range.',
        'Floating point: can store fractions.'
      ]
    },
    {
      id: 'u1t4-445-e1', spec: '4.4.5', lesson: 2, marks: 4,
      question: 'The value <code>101.0111</code> must be stored with only 2 binary places. Give the truncated and rounded values in binary, and the absolute error of each.',
      markPoints: [
        'True value: 5.4375.',
        'Truncated: 101.01 (5.25) – absolute error 0.1875.',
        'Rounded: 101.10 (5.5) – absolute error 0.0625.',
        'Rounding is more accurate here.'
      ],
      technique: 'Absolute error = |true − approximation|. Show both values in denary to compare.'
    }
  ],

  /* ================================================================= TRACING */
  traces: [
    {
      id: 'u1t4-412-t1', spec: '4.1.2', lesson: 1,
      title: 'Denary to binary: 150',
      intro: '<p>Convert 150 to binary by subtracting place values. For each place value: does it fit into what is left? Write Yes or No, the amount left, and the bit (1 or 0).</p>',
      code: 'Start with 150. Work from 128 down to 1.',
      columns: ['Place value', 'Fits?', 'Left', 'Bit'],
      rows: [
        ['128', 'Yes', '22', '1'],
        ['64', 'No', '22', '0'],
        ['32', 'No', '22', '0'],
        ['16', 'Yes', '6', '1'],
        ['8', 'No', '6', '0'],
        ['4', 'Yes', '2', '1'],
        ['2', 'Yes', '0', '1'],
        ['1', 'No', '0', '0']
      ],
      given: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]],
      explanation: 'Reading the bit column from top to bottom: 150 = 10010110.'
    },
    {
      id: 'u1t4-412-t2', spec: '4.1.2', lesson: 1,
      title: 'Denary to hexadecimal: 230',
      intro: '<p>Convert 230 to hex by dividing by 16. Fill in the quotient, the remainder and the remainder as a hex digit. Then read the hex digits from the bottom up.</p>',
      code: 'Divide by 16 until the quotient is 0.',
      columns: ['Number', 'Number ÷ 16', 'Remainder', 'Hex digit'],
      rows: [
        ['230', '14', '6', '6'],
        ['14', '0', '14', 'E']
      ],
      given: [[0, 0], [1, 0]],
      explanation: '230 ÷ 16 = 14 remainder 6; 14 ÷ 16 = 0 remainder 14 (E). Reading the remainders from the bottom up: E6.'
    },
    {
      id: 'u1t4-444-t1', spec: '4.4.4', lesson: 3,
      title: 'Denary to floating point: 5.5',
      intro: '<p>Store 5.5 with an 8-bit mantissa and a 4-bit exponent. Fill in the result of each of the four steps.</p>',
      code: 'Step 1: fixed point → Step 2: normalise → Step 3: exponent → Step 4: pad the mantissa',
      columns: ['Step', 'Result'],
      rows: [
        ['1. Fixed-point binary', '101.1'],
        ['2. Normalised', '0.1011'],
        ['3. Exponent (4 bits)', '0011'],
        ['4. Mantissa (8 bits)', '01011000']
      ],
      given: [[0, 0], [1, 0], [2, 0], [3, 0]],
      explanation: '5.5 = 101.1. Moving the point 3 places left gives 0.1011, so the exponent is 3 = 0011. Padding to 8 bits gives the mantissa 01011000.'
    }
  ]
});
