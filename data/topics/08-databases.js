/* Topic 8: Databases, SQL, normalisation and organisation of data. */
RS.content.registerTopic({
  id: 'databases',
  order: 8,
  title: 'Databases and SQL',
  icon: 'database',
  colour: 'cyan',
  summary: 'Relational databases, keys and relationships, entity-relationship modelling, normalisation to 3NF, SQL, validation, file organisation and big data.',
  keywords: ['database', 'relational', 'table', 'entity', 'attribute', 'record', 'field', 'primary key', 'foreign key', 'composite key', 'index', 'relationship', 'one-to-many', 'many-to-many', 'entity relationship diagram', 'ERD', 'normalisation', '1NF', '2NF', '3NF', 'redundancy', 'consistency', 'data independence', 'SQL', 'SELECT', 'WHERE', 'ORDER BY', 'GROUP BY', 'INSERT', 'UPDATE', 'CREATE TABLE', 'DBMS', 'data dictionary', 'validation', 'verification', 'big data', 'data mining', 'data warehouse', 'distributed database', 'master file', 'transaction file', 'sequential', 'indexed sequential', 'direct access'],
  specRefs: [
    'AS Unit 1, section 6 (Organisation of data): files, records and fields; master and transaction files; serial, sequential, indexed sequential and direct access; file security and archiving; validation and verification',
    'AS Unit 1, section 7 (Database systems): relational databases; primary and foreign keys, indexes and links; entity relationship modelling; different users’ views',
    'A2 Unit 4, section 5 (Databases and distributed systems): consistency, redundancy and independence; normalisation to 3NF; SQL (see Appendix D of the specification for the commands listed); DBMS and data dictionaries; Big Data; distributed databases'
  ],
  notes: [
    {
      heading: 'Relational database terms',
      points: [
        'A relational database stores data in <strong>tables</strong> (relations), each representing one <strong>entity</strong> (such as Pupil or Course). Each row is a <strong>record</strong> (tuple) and each column is a <strong>field</strong> (attribute).',
        'A <strong>primary key</strong> uniquely identifies each record in a table. A <strong>composite key</strong> is a primary key made from two or more fields.',
        'A <strong>foreign key</strong> is a field in one table that is the primary key of another table; it creates the link (relationship) between them.',
        'An <strong>index</strong> (on a primary or secondary key) speeds up searching and sorting on that field, at the cost of extra storage and slower updates.',
        'Notation: <code>Pupil(<u>PupilID</u>, Name, Year, TutorID*)</code> – the primary key is underlined and a foreign key is often marked with an asterisk.'
      ]
    },
    {
      heading: 'Relationships and entity-relationship diagrams',
      points: [
        'Relationships can be <strong>one-to-one</strong>, <strong>one-to-many</strong> or <strong>many-to-many</strong>. For example, one tutor has many pupils.',
        'In an entity-relationship diagram, entities are drawn as rectangles and the “many” end of a relationship is shown with a crow’s foot.',
        'A many-to-many relationship (for example pupils and courses) cannot be implemented directly. It is resolved with a <strong>link table</strong> (such as Enrolment) holding foreign keys to both tables, creating two one-to-many relationships.',
        'Different users can be given different <strong>views</strong> of the database: they see only the data they need, which improves security and privacy and makes the system simpler to use.'
      ]
    },
    {
      heading: 'Redundancy, consistency and independence',
      points: [
        '<strong>Data redundancy</strong> is the unnecessary repetition of data. It wastes storage and makes updates harder.',
        '<strong>Data inconsistency</strong> happens when copies of the same data disagree, for example a phone number updated in one record but not another.',
        '<strong>Data independence</strong> means the way data is physically stored can change without changing the programs that use it, because the DBMS manages storage.',
        'Normalisation reduces redundancy, which in turn helps keep data consistent.'
      ]
    },
    {
      heading: 'Normalisation',
      points: [
        '<strong>First normal form (1NF)</strong>: every field holds a single (atomic) value, there are no repeating groups of fields, and each record has a primary key.',
        '<strong>Second normal form (2NF)</strong>: in 1NF, and there are no <em>partial dependencies</em> – every non-key field depends on the <em>whole</em> of a composite primary key, not just part of it. (A table with a single-field primary key in 1NF is automatically in 2NF.)',
        '<strong>Third normal form (3NF)</strong>: in 2NF, and there are no <em>transitive (non-key) dependencies</em> – no non-key field depends on another non-key field. A common summary: every non-key field depends on “the key, the whole key and nothing but the key”.',
        'Example: <code>Loan(<u>LoanID</u>, MemberID, MemberName, BookID, Title, DateOut)</code> is not in 3NF because MemberName depends on MemberID and Title depends on BookID. In 3NF: <code>Member(<u>MemberID</u>, MemberName)</code>, <code>Book(<u>BookID</u>, Title)</code>, <code>Loan(<u>LoanID</u>, MemberID*, BookID*, DateOut)</code>.'
      ]
    },
    {
      heading: 'SQL',
      html: '<p>The WJEC specification (Appendix D) lists: CREATE TABLE, PRIMARY KEY, NOT NULL, the types Int, Char(n), Numeric(m,n) and DateTime, INSERT INTO … VALUES, SELECT … FROM … WHERE, SELECT *, IN, AND, OR, ORDER BY, GROUP BY, UPDATE … SET, the comparison operators =, &gt;, &gt;=, &lt;, &lt;=, &lt;&gt;, sub-queries and parentheses.</p>',
      code: "CREATE TABLE Pupil (\n    PupilID  Int NOT NULL,\n    Name     Char(30) NOT NULL,\n    Year     Int,\n    House    Char(10),\n    PRIMARY KEY (PupilID)\n);\n\nINSERT INTO Pupil VALUES (6, 'Owain', 12, 'Tudor');\n\nSELECT Name, Year\nFROM Pupil\nWHERE House = 'Dewi' AND Year >= 12\nORDER BY Name;\n\n-- COUNT(*) is not in the specification's list, but is commonly used with GROUP BY\nSELECT House, COUNT(*)\nFROM Pupil\nGROUP BY House;\n\nUPDATE Pupil\nSET House = 'Dewi'\nWHERE PupilID = 6;\n\n-- Sub-query: pupils in the same house as pupil 3\nSELECT Name FROM Pupil\nWHERE House IN (SELECT House FROM Pupil WHERE PupilID = 3);"
    },
    {
      heading: 'DBMS, data dictionary, validation and verification',
      points: [
        'A <strong>database management system (DBMS)</strong> is software that creates, maintains and controls access to a database: it manages storage, enforces integrity rules, handles concurrent users, controls security and access rights, and supports backup and recovery.',
        'A <strong>data dictionary</strong> holds data about the data (metadata): table and field names, data types, sizes, validation rules, keys and relationships.',
        '<strong>Validation</strong> is an automatic check that data is sensible and follows rules: range, type, length, presence, format, lookup and check-digit checks. It cannot ensure data is <em>correct</em>.',
        '<strong>Verification</strong> checks that data has been entered or copied accurately, for example double entry (typing a password twice) or visual checking against the source document.',
        '<strong>Referential integrity</strong> ensures every foreign key value matches an existing primary key, so there are no links to records that do not exist.'
      ]
    },
    {
      heading: 'File organisation',
      points: [
        'A <strong>master file</strong> holds the main, relatively permanent data (for example customer accounts). A <strong>transaction file</strong> holds changes collected over a period (for example the day’s orders), used to update the master file.',
        '<strong>Serial</strong> files store records in the order they were added; <strong>sequential</strong> files store them in key order. Both must be read from the start to find a record. Updating a sequential master file produces a new master file (giving generations: grandparent, parent, child).',
        '<strong>Indexed sequential</strong> files are in key order with an index, so records can be read in sequence or found quickly via the index. Multi-level indexes help with very large files.',
        '<strong>Direct (random) access</strong> files use a hashing algorithm on the key to calculate where each record is stored, giving fast access to individual records. Overflow areas handle collisions, and the file may need reorganising as it fills.'
      ]
    },
    {
      heading: 'Big data and distributed databases',
      points: [
        '<strong>Big Data</strong> describes data sets too large or complex for traditional databases, often described by volume, velocity (arriving quickly) and variety (structured and unstructured data).',
        'A <strong>data warehouse</strong> is a large store of historical data gathered from many sources, organised for analysis rather than day-to-day transactions.',
        '<strong>Data mining</strong> searches large data sets for patterns and relationships; <strong>predictive analytics</strong> uses those patterns to forecast future behaviour, for example predicting which customers might leave.',
        'In a <strong>distributed</strong> system, data and/or processing are spread across several sites. Distributed databases can keep data near the users who need it (faster access), avoid a single point of failure and share the processing load, but are more complex to keep consistent and secure.'
      ]
    }
  ],
  misconceptions: [
    { wrong: 'Validation checks that data is correct.', right: 'Validation only checks that data is reasonable and follows rules. A valid date of birth can still be the wrong date of birth.' },
    { wrong: 'A foreign key must be unique in its table.', right: 'A foreign key often repeats (for example many pupils share a TutorID). It must match a primary key in the other table.' },
    { wrong: 'Normalisation means deleting data.', right: 'Normalisation reorganises data into more tables to reduce redundancy; no information is lost.' },
    { wrong: 'Many-to-many relationships are stored directly between two tables.', right: 'They are resolved with a link table containing foreign keys to both tables.' }
  ],
  examTips: [
    'When normalising, write each table in the standard notation, underline primary keys and mark foreign keys.',
    'In SQL answers, remember to put text values in quotation marks, use the field and table names exactly as given, and separate field names with commas.',
    'Distinguish validation and verification carefully – they are frequently confused.'
  ],
  flashcards: [
    { id: 'db-fc-1', front: 'What is a primary key?', back: 'A field (or fields) that uniquely identifies each record in a table.' },
    { id: 'db-fc-2', front: 'What is a foreign key?', back: 'A field in one table that is the primary key of another table, used to link the tables.' },
    { id: 'db-fc-3', front: 'What is a composite key?', back: 'A primary key made up of two or more fields.' },
    { id: 'db-fc-4', front: 'How is a many-to-many relationship implemented?', back: 'With a link table containing foreign keys to both tables, giving two one-to-many relationships.' },
    { id: 'db-fc-5', front: 'Rules for 1NF?', back: 'Atomic values, no repeating groups, and a primary key for each record.' },
    { id: 'db-fc-6', front: 'What extra rule gives 2NF?', back: 'No partial dependencies: non-key fields depend on the whole composite key.' },
    { id: 'db-fc-7', front: 'What extra rule gives 3NF?', back: 'No transitive (non-key) dependencies: non-key fields depend only on the primary key.' },
    { id: 'db-fc-8', front: 'What is data redundancy?', back: 'Unnecessary duplication of data.' },
    { id: 'db-fc-9', front: 'What is a data dictionary?', back: 'Metadata about the database: field names, data types, sizes, validation rules, keys and relationships.' },
    { id: 'db-fc-10', front: 'Validation vs verification?', back: 'Validation checks data is reasonable/follows rules. Verification checks data was entered or copied accurately.' },
    { id: 'db-fc-11', front: 'Name four types of validation check.', back: 'Any four of: range, type, length, presence, format, lookup, check digit.' },
    { id: 'db-fc-12', front: 'Master file vs transaction file?', back: 'Master: main, fairly permanent data. Transaction: changes collected over a period, used to update the master file.' },
    { id: 'db-fc-13', front: 'What is data mining?', back: 'Analysing large data sets to find patterns and relationships.' },
    { id: 'db-fc-14', front: 'Which SQL command changes existing records?', back: 'UPDATE … SET … WHERE …' }
  ],
  questions: [
    {
      id: 'db-q1', type: 'mcq', skill: 'recall',
      question: 'What is a foreign key?',
      options: ['A field in one table that is the primary key of another table', 'A field that uniquely identifies each record in its own table', 'A password used to access the database', 'A key that is made up of two fields'],
      answer: 0,
      feedback: ['', 'This describes a primary key.', 'Database keys are fields, not passwords.', 'This describes a composite key.'],
      explanation: 'Foreign keys create links between tables.'
    },
    {
      id: 'db-q2', type: 'mcq', skill: 'application',
      question: 'Each pupil can take many courses, and each course has many pupils. How should this be implemented in a relational database?',
      options: ['Add a link table, such as Enrolment(PupilID, CourseID), with foreign keys to both tables', 'Store a list of course IDs in a single field of the Pupil table', 'Add CourseID as a foreign key in Pupil only', 'Combine Pupil and Course into one table'],
      answer: 0,
      feedback: ['', 'A list in one field is not atomic, so it breaks 1NF.', 'This only allows each pupil one course.', 'One combined table would repeat pupil and course data many times.'],
      explanation: 'The link table turns one many-to-many relationship into two one-to-many relationships.'
    },
    {
      id: 'db-q3', type: 'mcq', skill: 'application',
      question: 'Table: <code>Pupil(<u>PupilID</u>, Name, Subjects)</code> where Subjects holds values such as “Maths, Physics, Computer Science”. Which normal form rule does it break?',
      options: ['1NF: the Subjects field is not atomic', '2NF: there is a partial dependency', '3NF: there is a transitive dependency', 'It breaks no rule'],
      answer: 0,
      feedback: ['', 'Partial dependency needs a composite key; PupilID is a single field.', 'The first problem is that a field holds several values.', 'A field holding a list of values breaks first normal form.'],
      explanation: 'Each field must hold a single value. Subjects should become a separate table linked by PupilID.'
    },
    {
      id: 'db-q4', type: 'mcq', skill: 'application',
      question: '<code>Enrolment(<u>PupilID</u>, <u>CourseID</u>, PupilName, Grade)</code> has the composite key PupilID + CourseID. Why is it not in 2NF?',
      options: ['PupilName depends only on PupilID, which is part of the key', 'Grade depends on both PupilID and CourseID', 'The table has a composite key', 'CourseID is a foreign key'],
      answer: 0,
      feedback: ['', 'Depending on the whole key is exactly what 2NF requires.', 'Composite keys are allowed in 2NF.', 'Foreign keys are allowed and expected.'],
      explanation: 'This is a partial dependency. PupilName should be stored in a Pupil table instead.'
    },
    {
      id: 'db-q5', type: 'mcq', skill: 'application',
      question: '<code>Order(<u>OrderID</u>, OrderDate, CustomerID, CustomerName)</code>. Why is this table not in 3NF?',
      options: ['CustomerName depends on CustomerID, which is not the primary key', 'OrderDate depends on OrderID', 'The table has a single-field primary key', 'CustomerID should be the primary key'],
      answer: 0,
      feedback: ['', 'Depending on the primary key is correct and allowed.', 'A single-field primary key is fine.', 'A customer can place many orders, so CustomerID cannot uniquely identify an order.'],
      explanation: 'This is a transitive dependency: OrderID → CustomerID → CustomerName. CustomerName belongs in a Customer table.'
    },
    {
      id: 'db-q6', type: 'input', skill: 'application',
      question: '<p>The table <code>Pupil</code> holds:</p><table><thead><tr><th>PupilID</th><th>Name</th><th>Year</th><th>House</th></tr></thead><tbody><tr><td>1</td><td>Ffion</td><td>12</td><td>Dewi</td></tr><tr><td>2</td><td>Tom</td><td>13</td><td>Tudor</td></tr><tr><td>3</td><td>Aisha</td><td>12</td><td>Tudor</td></tr><tr><td>4</td><td>Rhys</td><td>13</td><td>Dewi</td></tr><tr><td>5</td><td>Megan</td><td>12</td><td>Dewi</td></tr></tbody></table><p>How many records are returned by the query below?</p>',
      code: "SELECT Name\nFROM Pupil\nWHERE Year = 12 AND House = 'Dewi';",
      accept: ['2'],
      explanation: 'Ffion and Megan are both in Year 12 and Dewi. Aisha is in Year 12 but Tudor; Rhys is in Dewi but Year 13.'
    },
    {
      id: 'db-q7', type: 'input', skill: 'application',
      question: 'Using the same <code>Pupil</code> table (Ffion 12 Dewi, Tom 13 Tudor, Aisha 12 Tudor, Rhys 13 Dewi, Megan 12 Dewi), how many records are returned by this query?',
      code: "SELECT Name\nFROM Pupil\nWHERE Year = 13 OR House = 'Tudor';",
      accept: ['3'],
      explanation: 'Tom (13, Tudor), Aisha (Tudor) and Rhys (13). Tom meets both conditions but is only returned once.'
    },
    {
      id: 'db-q8', type: 'mcq', skill: 'application',
      question: 'Which SQL statement lists the names of Year 13 pupils in alphabetical order?',
      options: [
        "SELECT Name FROM Pupil WHERE Year = 13 ORDER BY Name;",
        "SELECT Name FROM Pupil ORDER BY Name WHERE Year = 13;",
        "SELECT * FROM Pupil WHERE Name = 13 ORDER BY Year;",
        "SELECT Name FROM Pupil WHERE Year = 13 GROUP BY Name;"
      ],
      answer: 0,
      feedback: ['', 'WHERE must come before ORDER BY.', 'This compares Name with 13 and sorts by Year.', 'GROUP BY groups rows; it does not guarantee alphabetical order.'],
      explanation: 'Clause order: SELECT … FROM … WHERE … ORDER BY.'
    },
    {
      id: 'db-q9', type: 'mcq', skill: 'recall',
      question: 'Which SQL statement changes Tom’s house to Dewi?',
      options: [
        "UPDATE Pupil SET House = 'Dewi' WHERE PupilID = 2;",
        "INSERT INTO Pupil VALUES (2, 'Tom', 13, 'Dewi');",
        "UPDATE Pupil SET House = 'Dewi';",
        "SELECT House = 'Dewi' FROM Pupil WHERE PupilID = 2;"
      ],
      answer: 0,
      feedback: ['', 'INSERT adds a new record; it would also clash with the existing primary key 2.', 'Without WHERE, every pupil’s house would be changed.', 'SELECT retrieves data; it does not change it.'],
      explanation: 'UPDATE … SET … WHERE changes only the records that match the condition.'
    },
    {
      id: 'db-q10', type: 'mcq', skill: 'application',
      question: 'Users must type a new email address twice, and the two entries are compared. What is this?',
      options: ['Verification by double entry', 'A range check', 'A presence check', 'A format check'],
      answer: 0,
      feedback: ['', 'A range check tests whether a value lies between limits.', 'A presence check only tests that something was entered.', 'A format check tests the pattern, such as containing “@”, not whether two entries match.'],
      explanation: 'Double entry verifies that data has been typed accurately.'
    },
    {
      id: 'db-q11', type: 'mcq', skill: 'application',
      question: 'A form accepts ages of sixth-form pupils from 16 to 19. Which validation check is most suitable?',
      options: ['Range check', 'Length check', 'Check digit', 'Double entry'],
      answer: 0,
      feedback: ['', 'Every age from 16 to 19 has two digits, so a length check would also accept 10 or 99.', 'Check digits are used with codes such as ISBNs or barcodes.', 'Double entry is verification, not validation.'],
      explanation: 'A range check ensures the value is between 16 and 19 inclusive.'
    },
    {
      id: 'db-q12', type: 'mcq', skill: 'recall',
      question: 'What is held in a data dictionary?',
      options: ['Metadata such as field names, data types and validation rules', 'A translation of field names into other languages', 'The actual records stored in the database', 'A list of users’ passwords'],
      answer: 0,
      feedback: ['', 'It is not a language dictionary.', 'Records are stored in tables; the dictionary describes them.', 'Passwords should be stored securely (hashed), not in the data dictionary.'],
      explanation: 'A data dictionary is “data about the data”.'
    },
    {
      id: 'db-q13', type: 'mcq', skill: 'recall',
      question: 'Which file organisation gives the fastest access to a single record when its key is known?',
      options: ['Direct (random) access using hashing', 'Serial', 'Sequential', 'A transaction file'],
      answer: 0,
      feedback: ['', 'Serial files must be read from the start, in the order records were added.', 'Sequential files must also be read from the start (in key order).', 'A transaction file describes the file’s purpose, not how it is organised.'],
      explanation: 'Hashing the key calculates the record’s address directly.'
    },
    {
      id: 'db-q14', type: 'mcq', skill: 'recall',
      question: 'A supermarket analyses millions of past transactions to find which products are often bought together. What is this called?',
      options: ['Data mining', 'Data verification', 'Normalisation', 'Referential integrity'],
      answer: 0,
      feedback: ['', 'Verification checks accuracy of data entry.', 'Normalisation organises tables to reduce redundancy.', 'Referential integrity ensures foreign keys match existing records.'],
      explanation: 'Data mining finds patterns in large data sets; predictive analytics uses them to forecast.'
    },
    {
      id: 'db-q15', type: 'mcq', skill: 'technique',
      question: 'A question asks you to “Explain one advantage of normalising a database. [2 marks]”. Which answer gains both marks?',
      options: ['It reduces data redundancy, so a change (such as a new phone number) only has to be made in one place, avoiding inconsistent data.', 'It makes the database better.', 'Normalisation has three normal forms.', 'It reduces redundancy.'],
      answer: 0,
      feedback: ['', 'This is too vague to credit.', 'This is a fact about normalisation, not an advantage.', 'This is a correct point but is not explained, so it would gain only one mark.'],
      explanation: 'For 2 marks: one advantage (1) plus an explanation of why it matters (1).'
    }
  ],
  exam: [
    {
      id: 'db-e1', marks: 6,
      context: 'A library stores all loans in one table:<br><code>Loan(<u>LoanID</u>, MemberID, MemberName, MemberPhone, BookID, Title, Author, DateOut)</code>',
      question: 'Normalise this data to third normal form. Show the tables you would create, identifying primary and foreign keys.',
      markPoints: [
        'Member(<u>MemberID</u>, MemberName, MemberPhone) – member details moved to their own table…',
        '…with MemberID as its primary key.',
        'Book(<u>BookID</u>, Title, Author) – book details moved to their own table…',
        '…with BookID as its primary key.',
        'Loan(<u>LoanID</u>, MemberID*, BookID*, DateOut) keeps only details of the loan.',
        'MemberID and BookID are foreign keys in Loan, linking to Member and Book.'
      ],
      technique: 'Write each table in standard notation. Check that every non-key field depends only on its table’s primary key.'
    },
    {
      id: 'db-e2', marks: 4,
      context: 'A table <code>Book(<u>BookID</u>, Title, Author, YearPublished)</code> is stored in a database.',
      question: 'Write an SQL statement to display the title and year of publication of every book by the author “R. Jones” published after 1990, in ascending order of title.',
      markPoints: [
        'SELECT Title, YearPublished',
        'FROM Book',
        "WHERE Author = 'R. Jones' AND YearPublished > 1990",
        'ORDER BY Title (ASC is the default)'
      ],
      technique: 'Each clause is often worth a mark. Use the exact field names given, quote text values, and use &gt; rather than &gt;= because the question says “after”.'
    },
    {
      id: 'db-e3', marks: 4,
      question: 'Explain the difference between validation and verification, giving an example of each.',
      markPoints: [
        'Validation is an automatic check that data is reasonable / follows set rules…',
        '…for example a range check that a month is between 1 and 12 (or presence, format, length, type check).',
        'Verification checks that data has been entered or copied accurately / matches the source…',
        '…for example double entry of a password, or visual checking against the original document.',
        'Validation cannot ensure data is correct, only that it is sensible.'
      ],
      technique: 'Pair each definition with a matching example.'
    }
  ],
  traces: [
    {
      id: 'db-t1',
      title: 'Predicting the result of an SQL query',
      intro: '<p>The table <code>Pupil</code> holds: (1, Ffion, 12, Dewi), (2, Tom, 13, Tudor), (3, Aisha, 12, Tudor), (4, Rhys, 13, Dewi), (5, Megan, 12, Dewi), as (PupilID, Name, Year, House). Complete the table with the rows returned by the query, in the order they are returned.</p>',
      code: "SELECT Name, Year\nFROM Pupil\nWHERE House = 'Dewi'\nORDER BY Name;",
      columns: ['Name', 'Year'],
      rows: [
        ['Ffion', '12'],
        ['Megan', '12'],
        ['Rhys', '13']
      ],
      explanation: 'Ffion, Rhys and Megan are in Dewi. ORDER BY Name sorts them alphabetically: Ffion, Megan, Rhys. Only the Name and Year fields are selected.'
    }
  ]
});
