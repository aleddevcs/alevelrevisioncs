/* Topic 3: Data representation. */
RS.content.registerTopic({
  id: 'data-representation',
  order: 3,
  title: 'Data representation',
  icon: 'binary',
  colour: 'teal',
  summary: 'Binary and hexadecimal, binary arithmetic, two’s complement, floating point, shifts, character sets, data types and compression.',
  keywords: ['binary', 'denary', 'hexadecimal', 'hex', 'bit', 'byte', 'nibble', 'word', 'two\'s complement', 'sign and magnitude', 'overflow', 'underflow', 'floating point', 'mantissa', 'exponent', 'normalisation', 'shift', 'ASCII', 'Unicode', 'UTF-8', 'data types', 'compression', 'RLE', 'lossy', 'lossless'],
  specRefs: [
    'AS Unit 1, section 4 (Data representation and data types): bit, byte and word; binary and hexadecimal; storage of characters and standardised character sets; primitive data types and their storage requirements; binary arithmetic; two’s complement and sign and magnitude; floating point; truncation and rounding',
    'A2 Unit 4, section 3 (Data representation and data types): the AS content at a more demanding level, plus logical and arithmetic shifts, overflow and underflow',
    'AS Unit 1, section 9 and A2 Unit 3, section 3: Compression (including compression ratio and saving percentage at A2)'
  ],
  notes: [
    {
      heading: 'Bits, bytes and words',
      points: [
        'A <strong>bit</strong> is a single binary digit (0 or 1). A <strong>nibble</strong> is 4 bits. A <strong>byte</strong> is 8 bits.',
        'A <strong>word</strong> is the number of bits a processor handles as a single unit, for example 32 or 64 bits. It is often the width of the data bus and registers.',
        '<var>n</var> bits can represent 2<sup><var>n</var></sup> different values. For example, 8 bits give 256 values: 0 to 255 if unsigned.',
        'Decimal prefixes: 1 kilobyte (kB) = 1000 bytes. Binary prefixes: 1 kibibyte (KiB) = 1024 bytes, 1 mebibyte (MiB) = 1024 KiB. Exam questions state which to use.'
      ]
    },
    {
      heading: 'Binary and hexadecimal',
      points: [
        'Binary place values (8 bits): 128, 64, 32, 16, 8, 4, 2, 1. Example: <code>10110110</code> = 128 + 32 + 16 + 4 + 2 = <strong>182</strong>.',
        'Hexadecimal is base 16, using 0–9 and A–F (A = 10 … F = 15). Each hex digit represents exactly one nibble.',
        'To convert binary to hex, split into nibbles from the right: <code>1011 0110</code> = B6. To convert hex to denary: B6 = 11 × 16 + 6 = 182.',
        'Hex is used as shorthand for binary because it is shorter, easier for people to read and remember, and less error-prone, while converting directly to and from binary. Examples: colour codes, MAC addresses, memory addresses and error codes.',
        'Hex is a way of <em>writing</em> values for people; the computer still stores binary.'
      ]
    },
    {
      heading: 'Binary addition and overflow',
      points: [
        'Rules: 0 + 0 = 0; 0 + 1 = 1; 1 + 1 = 0 carry 1; 1 + 1 + 1 = 1 carry 1.',
        '<strong>Overflow</strong> occurs when the result of a calculation is too large to be stored in the available number of bits. For unsigned numbers this shows as a carry out of the most significant bit.',
        'In two’s complement, overflow has occurred if adding two positive numbers gives a negative result, or adding two negative numbers gives a positive result.',
        '<strong>Underflow</strong> occurs when a number is too small (too close to zero) to be represented, for example a floating-point result whose exponent would be smaller than the smallest allowed exponent.'
      ]
    },
    {
      heading: 'Negative numbers',
      points: [
        '<strong>Sign and magnitude</strong>: the most significant bit (MSB) is the sign (0 = positive, 1 = negative) and the other bits are the size. <code>10000101</code> = −5. Range for 8 bits: −127 to +127. It has two representations of zero (00000000 and 10000000), and ordinary binary addition does not work directly.',
        '<strong>Two’s complement</strong>: the MSB has a negative place value. For 8 bits: −128, 64, 32, 16, 8, 4, 2, 1. Range: −128 to +127.',
        'To negate a number in two’s complement, invert all the bits and add 1. Example: +45 = <code>00101101</code> → invert <code>11010010</code> → add 1 → <code>11010011</code> = −45.',
        'Two’s complement has one zero and allows subtraction to be done by adding the negative: A − B = A + (−B), so the same adding circuit can be used.'
      ]
    },
    {
      heading: 'Floating point',
      html: '<p>A floating-point number is stored as a <strong>mantissa</strong> and an <strong>exponent</strong>, usually both in two’s complement. The value is mantissa × 2<sup>exponent</sup>. In exam questions the binary point is normally just after the first bit of the mantissa.</p>' +
        '<p><strong>Example</strong> (8-bit mantissa, 4-bit exponent): mantissa <code>0.1010000</code>, exponent <code>0010</code> (= 2). Move the binary point 2 places right: <code>010.10000</code> = 2.5.</p>' +
        '<p><strong>Negative example</strong>: mantissa <code>1.0100000</code> = −1 + 0.25 = −0.75; exponent <code>0001</code> (= 1). Value = −0.75 × 2 = −1.5.</p>' +
        '<ul>' +
        '<li>A positive number is <strong>normalised</strong> when its mantissa starts <code>0.1</code>; a negative number when it starts <code>1.0</code>. Normalisation gives the maximum precision for the number of mantissa bits, and gives each value one unique representation.</li>' +
        '<li>For a fixed total number of bits: more mantissa bits give greater <strong>precision</strong>; more exponent bits give a greater <strong>range</strong>.</li>' +
        '<li>Compared with integers, floating point can represent fractions and a much larger range, but values may be approximations and arithmetic is slower and more complex.</li>' +
        '</ul>'
    },
    {
      heading: 'Truncation, rounding and accuracy',
      points: [
        'Some values cannot be stored exactly in a fixed number of bits. For example, 0.1 in denary has no exact binary fraction.',
        '<strong>Truncation</strong> simply discards the bits that do not fit. <strong>Rounding</strong> adjusts the last kept bit according to the first discarded bit, so on average it is more accurate.',
        'Both introduce errors. Absolute error = |actual value − stored value|. Relative error = absolute error ÷ actual value.',
        'Small errors can accumulate over many calculations, which matters in fields such as finance and science.'
      ]
    },
    {
      heading: 'Logical and arithmetic shifts',
      points: [
        'A <strong>logical shift</strong> moves all bits left or right, filling empty positions with 0. Bits shifted off the end are lost (often into the carry flag).',
        'A logical shift left by <var>n</var> places multiplies an unsigned number by 2<sup><var>n</var></sup> (if no 1s are lost). A logical shift right by <var>n</var> divides an unsigned number by 2<sup><var>n</var></sup>, discarding any remainder.',
        'An <strong>arithmetic shift right</strong> copies the sign bit into the empty positions, so it divides a two’s complement number by 2 while keeping its sign. Example: <code>11101000</code> (−24) → <code>11110100</code> (−12).',
        'An arithmetic shift left is the same as a logical shift left; overflow occurs if the sign bit changes.'
      ]
    },
    {
      heading: 'Characters and character sets',
      points: [
        'A character set is a defined list of characters, each with a unique binary code.',
        '<strong>ASCII</strong> uses 7 bits (128 characters): English letters, digits, punctuation and control codes. Extended ASCII uses 8 bits (256 characters). Codes are ordered, for example “A” = 65, “B” = 66, “a” = 97.',
        '<strong>Unicode</strong> can represent well over a million code points, covering the world’s writing systems and symbols such as emoji. Its first 128 code points match ASCII.',
        'Unicode encodings include UTF-8 (1 to 4 bytes per character, so plain English text is no larger than ASCII), UTF-16 and UTF-32.',
        'Unicode is needed for characters outside ASCII, for example Welsh <em>ŵ</em> and <em>ŷ</em>, or scripts such as Arabic and Chinese.'
      ]
    },
    {
      heading: 'Primitive data types',
      html: '<table><thead><tr><th scope="col">Type</th><th scope="col">Holds</th><th scope="col">Typical storage</th></tr></thead><tbody>' +
        '<tr><td>Boolean</td><td>True or False</td><td>1 bit in theory; often 1 byte in practice</td></tr>' +
        '<tr><td>Character</td><td>A single character</td><td>1 byte (ASCII) or 2–4 bytes (Unicode)</td></tr>' +
        '<tr><td>String</td><td>A sequence of characters</td><td>1 byte or more per character, plus a length or terminator</td></tr>' +
        '<tr><td>Integer</td><td>Whole numbers</td><td>Commonly 2, 4 or 8 bytes</td></tr>' +
        '<tr><td>Real (floating point)</td><td>Numbers with a fractional part</td><td>Commonly 4 or 8 bytes</td></tr>' +
        '</tbody></table><p>Exact sizes depend on the language and system. Choose types by thinking about what operations are needed: for example, a telephone number should be a string because it can start with 0 and is never used in arithmetic.</p>'
    },
    {
      heading: 'Compression',
      points: [
        '<strong>Lossless</strong> compression lets the original data be reconstructed exactly. It is essential for text, program files and databases. Examples: run-length encoding (RLE), dictionary-based methods and Huffman coding.',
        '<strong>Lossy</strong> compression permanently removes data that is judged less important (for example detail people are unlikely to notice). It gives much smaller files and is used for photos, audio and video (for example JPEG, MP3).',
        '<strong>Run-length encoding</strong> replaces a run of the same value with a count and the value: <code>AAAABBBCCD</code> → <code>4A3B2C1D</code>. It works well only when there are long runs.',
        '<strong>Compression ratio</strong> = original size ÷ compressed size (5 MB → 2 MB gives 2.5 : 1). <strong>Saving percentage</strong> = (original − compressed) ÷ original × 100 (here 60%).',
        'Algorithms can also be compared by compression time and decompression time; for example, a video may be compressed slowly once but must decompress quickly every time it is played.'
      ]
    }
  ],
  misconceptions: [
    { wrong: 'Hexadecimal saves memory because it is shorter.', right: 'Hex is just a shorter way for <em>people</em> to write binary. The computer still stores the same number of bits.' },
    { wrong: 'In two’s complement, 1 followed by the number is the negative (like sign and magnitude).', right: 'In two’s complement the MSB has a negative place value. 10000101 is −123, not −5.' },
    { wrong: 'Shifting right always halves a number correctly.', right: 'A logical shift right is wrong for negative two’s complement numbers; use an arithmetic shift. Any remainder is also lost.' },
    { wrong: 'Lossless compression always makes files much smaller.', right: 'Lossless methods depend on patterns in the data. Data with few patterns (such as already-compressed files) may hardly shrink at all, or may even grow.' }
  ],
  examTips: [
    'Always show your working for conversions and arithmetic, for example the place values you used. Method marks are often available.',
    'State the number of bits when giving a two’s complement or floating-point answer, and include leading zeros.',
    'For floating-point questions, write the mantissa with its binary point and the exponent in denary before moving the point.'
  ],
  flashcards: [
    { id: 'dr-fc-1', front: 'How many values can be represented with 8 bits?', back: '2<sup>8</sup> = 256 values.' },
    { id: 'dr-fc-2', front: 'Convert 1011 0110 to hexadecimal.', back: 'B6 (1011 = B, 0110 = 6).' },
    { id: 'dr-fc-3', front: 'Why is hexadecimal used?', back: 'It is a shorter, more readable way for people to represent binary, with fewer errors, and it converts directly (1 hex digit = 4 bits).' },
    { id: 'dr-fc-4', front: 'What is the range of an 8-bit two’s complement integer?', back: '−128 to +127.' },
    { id: 'dr-fc-5', front: 'How do you negate a two’s complement number?', back: 'Invert every bit, then add 1.' },
    { id: 'dr-fc-6', front: 'Give two disadvantages of sign and magnitude.', back: 'It has two representations of zero, and ordinary binary addition does not work correctly with negative numbers.' },
    { id: 'dr-fc-7', front: 'When is a positive floating-point number normalised?', back: 'When its mantissa starts 0.1 (a negative one starts 1.0).' },
    { id: 'dr-fc-8', front: 'Fixed total bits: what is gained by giving more bits to the mantissa?', back: 'Greater precision (but a smaller range, because the exponent has fewer bits).' },
    { id: 'dr-fc-9', front: 'What is overflow?', back: 'When the result of a calculation is too large to be represented in the available bits.' },
    { id: 'dr-fc-10', front: 'What is underflow?', back: 'When a value is too small (too close to zero) to be represented, for example the exponent needed is below the smallest allowed.' },
    { id: 'dr-fc-11', front: 'What does an arithmetic shift right do differently from a logical shift right?', back: 'It fills the empty left-hand bits with copies of the sign bit, so negative numbers stay negative.' },
    { id: 'dr-fc-12', front: 'Why is Unicode needed?', back: 'ASCII only covers 128 (or 256) characters. Unicode represents characters from all the world’s writing systems, including Welsh ŵ and ŷ.' },
    { id: 'dr-fc-13', front: 'Lossy or lossless for a program file?', back: 'Lossless: every bit must be restored exactly or the program will not work.' },
    { id: 'dr-fc-14', front: 'Formula for saving percentage in compression?', back: '(original size − compressed size) ÷ original size × 100.' }
  ],
  questions: [
    {
      id: 'dr-q1', type: 'input', skill: 'application',
      question: 'Convert the unsigned binary number <code>10110110</code> to denary.',
      accept: ['182'],
      explanation: '128 + 32 + 16 + 4 + 2 = 182.'
    },
    {
      id: 'dr-q2', type: 'input', skill: 'application',
      question: 'Convert the denary number 200 to hexadecimal.',
      accept: ['C8', '0xC8', 'C8h'],
      ignoreSpaces: true,
      explanation: '200 ÷ 16 = 12 remainder 8. 12 = C, so 200 = C8.'
    },
    {
      id: 'dr-q3', type: 'input', skill: 'application',
      question: 'Convert the hexadecimal number <code>3C</code> to 8-bit binary.',
      accept: ['00111100'],
      ignoreSpaces: true,
      explanation: '3 = 0011 and C (12) = 1100, so 3C = 0011 1100.'
    },
    {
      id: 'dr-q4', type: 'input', skill: 'application',
      question: 'What denary value does the 8-bit two’s complement number <code>11110110</code> represent?',
      accept: ['-10', '−10'],
      ignoreSpaces: true,
      explanation: 'Using place values: −128 + 64 + 32 + 16 + 4 + 2 = −10. Or invert and add 1: 00001001 + 1 = 00001010 = 10, so the value is −10.'
    },
    {
      id: 'dr-q5', type: 'input', skill: 'application',
      question: 'Write −45 as an 8-bit two’s complement binary number.',
      accept: ['11010011'],
      ignoreSpaces: true,
      explanation: '+45 = 00101101. Invert: 11010010. Add 1: 11010011.'
    },
    {
      id: 'dr-q6', type: 'mcq', skill: 'recall',
      question: 'What is the range of values that can be represented by an 8-bit two’s complement integer?',
      options: ['−128 to +127', '−127 to +127', '0 to 255', '−256 to +255'],
      answer: 0,
      feedback: ['', 'This is the range for 8-bit sign and magnitude, which wastes a pattern on “negative zero”.', 'This is the range for an 8-bit <em>unsigned</em> integer.', 'Eight bits only give 256 patterns, so this range (512 values) is impossible.'],
      explanation: 'The MSB is worth −128 and the remaining bits add up to at most 127.'
    },
    {
      id: 'dr-q7', type: 'mcq', skill: 'application',
      question: '<code>01101100</code> and <code>01010101</code> are added as 8-bit two’s complement numbers. What happens?',
      options: ['Overflow: the result, 11000001, appears negative even though both numbers are positive', 'The correct answer, 193, is stored', 'Underflow occurs because the result is too small', 'The result is 00000001 because the carry is discarded'],
      answer: 0,
      feedback: ['', '193 is outside the 8-bit two’s complement range (maximum +127), so it cannot be stored correctly.', 'Underflow refers to values too close to zero, not values too large.', 'Adding these numbers does not produce a carry out of the MSB; the sum is 11000001.'],
      explanation: '108 + 85 = 193, which is greater than 127. Two positives giving a negative result shows overflow.'
    },
    {
      id: 'dr-q8', type: 'input', skill: 'application',
      question: 'A floating-point number has an 8-bit two’s complement mantissa (binary point after the first bit) and a 4-bit two’s complement exponent. Mantissa = <code>01010000</code>, exponent = <code>0010</code>. What is the denary value?',
      accept: ['2.5', '2½'],
      ignoreSpaces: true,
      explanation: 'Mantissa 0.1010000; exponent 2, so move the point 2 places right: 010.10000 = 2 + 0.5 = 2.5.'
    },
    {
      id: 'dr-q9', type: 'mcq', skill: 'application',
      question: 'Using an 8-bit two’s complement mantissa with the binary point after the first bit, which mantissa is normalised?',
      options: ['01011000', '00110000', '11100000', '00011000'],
      answer: 0,
      feedback: ['', 'It starts 00, so precision is wasted: it is not normalised.', 'It starts 11, so it is not normalised. A normalised negative mantissa starts 10.', 'It starts 000, so it is not normalised.'],
      explanation: 'A normalised mantissa starts with 01 (positive) or 10 (negative), so the two leading bits differ.'
    },
    {
      id: 'dr-q10', type: 'input', skill: 'application',
      question: 'Perform a logical shift left by 2 places on the 8-bit number <code>00010110</code>. Give the 8-bit result.',
      accept: ['01011000'],
      ignoreSpaces: true,
      explanation: 'Each bit moves two places left and zeros fill from the right: 01011000. 22 × 4 = 88.'
    },
    {
      id: 'dr-q11', type: 'mcq', skill: 'application',
      question: 'An arithmetic shift right by 1 place is applied to the two’s complement number <code>11101000</code> (−24). What is the result?',
      options: ['11110100 (−12)', '01110100 (+116)', '11010000 (−48)', '11110000 (−16)'],
      answer: 0,
      feedback: ['', 'This is a <em>logical</em> shift right, which fills with 0 and changes the sign.', 'This is a shift <em>left</em>, which doubles the number.', 'Shifting right by one place moves every bit exactly one position, giving 11110100, not 11110000.'],
      explanation: 'An arithmetic shift right copies the sign bit (1) into the empty position, halving the number and keeping it negative.'
    },
    {
      id: 'dr-q12', type: 'mcq', skill: 'recall',
      question: 'A Welsh language app must display the letters ŵ and ŷ. Why should it use Unicode rather than 7-bit ASCII?',
      options: ['ASCII does not include these characters; Unicode does', 'Unicode always uses less memory than ASCII', 'ASCII cannot represent lower-case letters', 'Unicode is only used for Welsh'],
      answer: 0,
      feedback: ['', 'Unicode characters can need more bytes than ASCII, not fewer (though UTF-8 uses one byte for ASCII characters).', 'ASCII does include lower-case letters a–z.', 'Unicode covers almost all the world’s writing systems.'],
      explanation: '7-bit ASCII has only 128 codes, covering English letters, digits and symbols.'
    },
    {
      id: 'dr-q13', type: 'input', skill: 'application',
      question: 'Using 8-bit ASCII, how many bytes are needed to store the string <code>Caerdydd</code>? Ignore any length byte or terminator.',
      accept: ['8', '8 bytes'],
      explanation: '“Caerdydd” has 8 characters, and each needs 1 byte.'
    },
    {
      id: 'dr-q14', type: 'input', skill: 'application',
      question: 'Use run-length encoding in the form count then character to compress <code>AAAABBBCCD</code>.',
      accept: ['4A3B2C1D'],
      ignoreSpaces: true,
      explanation: 'Four A, three B, two C and one D: 4A3B2C1D.'
    },
    {
      id: 'dr-q15', type: 'input', skill: 'application',
      question: 'A 5 MB file is compressed to 2 MB. What is the saving percentage? (Give the number only.)',
      accept: ['60', '60%'],
      ignoreSpaces: true,
      explanation: '(5 − 2) ÷ 5 × 100 = 60%. The compression ratio is 5 ÷ 2 = 2.5 : 1.'
    },
    {
      id: 'dr-q16', type: 'mcq', skill: 'application',
      question: 'Which data type is most appropriate for storing a UK telephone number such as 02920 123456?',
      options: ['String', 'Integer', 'Real', 'Boolean'],
      answer: 0,
      feedback: ['', 'An integer would lose the leading 0, and you never do arithmetic on a phone number.', 'A real number is for values with fractional parts.', 'A Boolean can only store True or False.'],
      explanation: 'Data that contains digits but is not used in calculations (and may have leading zeros or spaces) should be stored as a string.'
    },
    {
      id: 'dr-q17', type: 'mcq', skill: 'recall',
      question: 'Which type of compression would be unsuitable for a spreadsheet of exam results?',
      options: ['Lossy', 'Lossless', 'Run-length encoding', 'Dictionary-based compression'],
      answer: 0,
      feedback: ['', 'Lossless compression restores the data exactly, so it is suitable.', 'RLE is a lossless method, so it would restore the data exactly.', 'Dictionary-based methods are lossless, so they are suitable.'],
      explanation: 'Lossy compression permanently removes data, which would corrupt the results.'
    },
    {
      id: 'dr-q18', type: 'mcq', skill: 'technique',
      question: 'A question asks: “Convert 157 to 8-bit binary. Show your working. [2 marks]”. Which response is best?',
      options: ['A place-value table (128, 64, …, 1) with the bits marked, then the answer 10011101', 'Just the answer 10011101', 'Just the answer 1001 1101 in hexadecimal', 'An explanation of what binary is'],
      answer: 0,
      feedback: ['', 'The question explicitly asks for working, so a bare answer may lose a mark.', 'The answer must be in binary, and this is not hexadecimal anyway.', 'This does not answer the question.'],
      explanation: '157 = 128 + 16 + 8 + 4 + 1 = 10011101. When asked to show working, method marks depend on it being visible.'
    }
  ],
  exam: [
    {
      id: 'dr-e1', marks: 3,
      question: 'Explain two advantages of using two’s complement instead of sign and magnitude to represent negative integers.',
      markPoints: [
        'Two’s complement has only one representation of zero…',
        '…so no bit pattern is wasted and the range is one larger (for example −128 to +127 for 8 bits).',
        'Ordinary binary addition works for both positive and negative numbers…',
        '…so subtraction can be done by adding the negative, and the same adder circuit is used (simpler hardware).'
      ],
      technique: 'Two advantages each with an explanation: aim to state the advantage, then say why it matters.'
    },
    {
      id: 'dr-e2', marks: 4,
      context: 'A system uses 16 bits for floating-point numbers. The designer is deciding how many of the 16 bits to use for the mantissa and how many for the exponent.',
      question: 'Explain the effect of increasing the number of bits used for the mantissa.',
      markPoints: [
        'The precision (accuracy) of numbers increases…',
        '…because more significant bits can be stored, so smaller differences between values can be represented / less rounding or truncation error.',
        'The number of bits for the exponent decreases (as the total is fixed)…',
        '…so the range of numbers that can be represented decreases.'
      ],
      technique: 'Recognise the trade-off: in a fixed number of bits, a gain in one place is a loss elsewhere. Mention both precision and range.'
    },
    {
      id: 'dr-e3', marks: 4,
      question: 'Describe the difference between lossy and lossless compression, and give a suitable use for each.',
      markPoints: [
        'Lossless compression allows the original file to be reconstructed exactly.',
        'Lossy compression permanently removes some data, so the original cannot be reconstructed exactly.',
        'Lossy compression usually gives much smaller files.',
        'Suitable lossless use: text documents, program files, databases or spreadsheets (where every bit matters).',
        'Suitable lossy use: photos, music or video for streaming (where small losses are not noticeable).'
      ],
      technique: 'Uses must be justified implicitly by suitability; “text files” for lossless and “music streaming” for lossy are safe choices.'
    }
  ],
  traces: [
    {
      id: 'dr-t1',
      title: 'Denary to binary using DIV and MOD',
      intro: '<p>This algorithm converts a denary number to a binary string. Complete one row for each pass through the loop, showing values <strong>at the end of that pass</strong>. Write strings without quotation marks.</p>',
      code: 'num ← 13\nresult ← ""\nWHILE num > 0\n    r ← num MOD 2\n    result ← STR(r) + result\n    num ← num DIV 2\nENDWHILE\nOUTPUT result',
      columns: ['r', 'result', 'num'],
      rows: [
        ['1', '1', '6'],
        ['0', '01', '3'],
        ['1', '101', '1'],
        ['1', '1101', '0']
      ],
      explanation: '13 MOD 2 = 1, 13 DIV 2 = 6; 6 MOD 2 = 0, 6 DIV 2 = 3; 3 MOD 2 = 1, 3 DIV 2 = 1; 1 MOD 2 = 1, 1 DIV 2 = 0, so the loop ends. Each remainder is added to the <em>front</em> of the string, giving 1101 (= 8 + 4 + 1 = 13).'
    }
  ]
});
