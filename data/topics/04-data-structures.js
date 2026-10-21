/* Topic 4: Data structures. */
RS.content.registerTopic({
  id: 'data-structures',
  order: 4,
  title: 'Data structures',
  icon: 'tree',
  colour: 'amber',
  summary: 'Arrays and records, stacks, queues (including circular queues), linked lists, hash tables and binary trees with traversals.',
  keywords: ['array', 'two-dimensional', 'three-dimensional', 'record', 'field', 'stack', 'push', 'pop', 'LIFO', 'queue', 'enqueue', 'dequeue', 'FIFO', 'circular queue', 'pointer', 'linked list', 'null', 'hash table', 'hashing', 'collision', 'binary tree', 'binary search tree', 'traversal', 'pre-order', 'in-order', 'post-order', 'static', 'dynamic'],
  specRefs: [
    'AS Unit 1, section 5 (Data structures): arrays (up to two dimensions) and records; selecting and justifying data structures',
    'A2 Unit 3, section 1 (Data structures): arrays up to three dimensions, stacks, queues, trees, linked lists and hash tables, represented using pointers and arrays',
    'A2 Unit 3, section 3: Traversal of data structures',
    'A2 Unit 4, section 4 (Organisation and structure of data): hashing algorithms and overflow'
  ],
  notes: [
    {
      heading: 'Arrays and records',
      points: [
        'An <strong>array</strong> is a fixed-size collection of elements of the <em>same data type</em>, accessed by index. Elements are stored contiguously, so any element can be accessed directly.',
        'A two-dimensional array can be pictured as a table (for example <code>board[row, column]</code>); a three-dimensional array adds another index (for example <code>temps[site, day, hour]</code>).',
        'The number of elements is the product of the dimensions: a 3 × 4 × 5 array has 60 elements.',
        'A <strong>record</strong> groups related fields that can be of <em>different</em> data types, for example a student record with a name (string), year group (integer) and whether they have paid for a trip (Boolean).',
        'An array of records is a common way to hold a table of data in memory.'
      ]
    },
    {
      heading: 'Static and dynamic data structures',
      points: [
        'A <strong>static</strong> structure (such as an array) has a fixed size set when it is created. Memory may be wasted if it is not full, and it cannot grow if more space is needed.',
        'A <strong>dynamic</strong> structure (such as a linked list) can grow and shrink while the program runs, using memory only as needed, but it needs extra memory for pointers and items cannot be accessed directly by index.',
        'Abstract data types such as stacks and queues can be implemented with either: an array (static) or linked nodes (dynamic).'
      ]
    },
    {
      heading: 'Stacks',
      points: [
        'A stack is a <strong>last in, first out (LIFO)</strong> structure. Items are added (<em>pushed</em>) and removed (<em>popped</em>) at the top only.',
        'In an array implementation, a <strong>top pointer</strong> holds the index of the top item. Push: check the stack is not full, increment the pointer, store the item. Pop: check the stack is not empty, read the item, decrement the pointer.',
        'Pushing onto a full stack causes <strong>stack overflow</strong>; popping from an empty stack causes <strong>stack underflow</strong>.',
        'Uses: storing return addresses and local variables when subroutines are called (the call stack), undo features, reversing data, evaluating expressions and backtracking.'
      ]
    },
    {
      heading: 'Queues',
      points: [
        'A queue is a <strong>first in, first out (FIFO)</strong> structure. Items are added (<em>enqueued</em>) at the rear and removed (<em>dequeued</em>) from the front.',
        'A <strong>linear queue</strong> in an array uses front and rear pointers. As items are removed, space at the start of the array cannot be reused unless all items are shuffled forward, which is slow.',
        'A <strong>circular queue</strong> lets the pointers wrap round to the start of the array: <code>rear ← (rear + 1) MOD capacity</code>. This reuses freed space without moving items. A counter of items (or a comparison of pointers) shows whether it is full or empty.',
        'A <strong>priority queue</strong> removes items in order of priority rather than arrival.',
        'Uses: print queues, keyboard buffers, processes waiting for the processor, and breadth-first search.'
      ]
    },
    {
      heading: 'Linked lists',
      points: [
        'A linked list is a sequence of <strong>nodes</strong>. Each node holds data and a <strong>pointer</strong> to the next node. A start (head) pointer gives the first node; the last node’s pointer is null (often shown as −1 or 0 in an array implementation).',
        'Items can be inserted or deleted by changing pointers only, so no other items need to be moved. The list can be kept in order even though the nodes are stored anywhere in memory.',
        'Finding an item requires following the pointers from the start (sequential access); there is no direct access by position.',
        'A linked list can be implemented with arrays: one array for the data and a parallel array for the next pointers, plus a free-space list holding unused nodes.'
      ]
    },
    {
      heading: 'Hash tables',
      points: [
        'A hash table stores items in an array at a position calculated from the key by a <strong>hashing algorithm</strong>, for example <code>address ← key MOD 11</code>. This gives (close to) direct access without searching.',
        'A <strong>collision</strong> happens when two different keys hash to the same address.',
        'Collision handling: <em>open addressing</em>/<em>linear probing</em> stores the item in the next free slot (searching continues from the hashed address), or <em>chaining</em> stores a linked list of items at each address. Separate overflow areas can also be used.',
        'A good hashing algorithm is quick to calculate and spreads keys evenly, minimising collisions. As the table fills, collisions increase, so it may need to be enlarged and reorganised (rehashed).',
        'To retrieve an item, the key is hashed again and that address checked; if the item there has a different key, the same collision strategy is followed until it is found or an empty slot is reached.'
      ]
    },
    {
      heading: 'Binary trees and binary search trees',
      points: [
        'A tree is a hierarchical structure of nodes. The top node is the <strong>root</strong>; nodes with no children are <strong>leaves</strong>. In a <strong>binary tree</strong> each node has at most two children (left and right).',
        'In a <strong>binary search tree (BST)</strong>, every value in a node’s left subtree is less than the node, and every value in its right subtree is greater. Inserting follows the comparisons from the root to an empty position.',
        'Searching a balanced BST is efficient (O(log n)), because each comparison discards about half of the remaining tree. An unbalanced tree (for example, built from sorted data) can degrade to O(n).',
        'Trees can be implemented with three arrays (data, left pointer, right pointer) or with node objects.'
      ]
    },
    {
      heading: 'Tree traversals',
      html: '<p>For the BST built by inserting 50, 30, 70, 20, 40, 60, 80:</p>' +
        '<ul>' +
        '<li><strong>Pre-order</strong> (node, left, right): 50, 30, 20, 40, 70, 60, 80. Useful for copying a tree.</li>' +
        '<li><strong>In-order</strong> (left, node, right): 20, 30, 40, 50, 60, 70, 80. On a BST this outputs the values in ascending order.</li>' +
        '<li><strong>Post-order</strong> (left, right, node): 20, 40, 30, 60, 80, 70, 50. Useful for deleting a tree or evaluating expression trees.</li>' +
        '</ul>',
      code: 'PROCEDURE inOrder(node)\n    IF node <> null THEN\n        inOrder(node.left)\n        OUTPUT node.data\n        inOrder(node.right)\n    ENDIF\nENDPROCEDURE'
    }
  ],
  misconceptions: [
    { wrong: 'Popping an item from a stack deletes it from memory.', right: 'In an array implementation the item usually stays in the array; only the top pointer changes, so the slot will be overwritten later.' },
    { wrong: 'A linked list is faster than an array for everything.', right: 'Linked lists are better for frequent insertions and deletions, but arrays allow direct access by index and use no memory for pointers.' },
    { wrong: 'A hash function always produces a unique address for every key.', right: 'Different keys can produce the same address (a collision), so a collision strategy is always needed.' },
    { wrong: 'Any binary tree can be searched in O(log n) time.', right: 'Only a balanced binary <em>search</em> tree gives O(log n). An unbalanced BST may need O(n) comparisons.' }
  ],
  examTips: [
    'When asked to describe an algorithm for a stack or queue, include the checks for full and empty before changing pointers.',
    'When justifying a choice of data structure, link a feature of the structure to the needs of the scenario (for example “a queue, because print jobs must be printed in the order they arrive”).',
    'For traversal questions, write the values separated by commas and check the count matches the number of nodes.'
  ],
  flashcards: [
    { id: 'ds-fc-1', front: 'What does LIFO stand for, and which structure uses it?', back: 'Last in, first out: a stack.' },
    { id: 'ds-fc-2', front: 'What does FIFO stand for, and which structure uses it?', back: 'First in, first out: a queue.' },
    { id: 'ds-fc-3', front: 'What is stack underflow?', back: 'Trying to pop an item from an empty stack.' },
    { id: 'ds-fc-4', front: 'Why use a circular queue rather than a linear queue in an array?', back: 'The pointers wrap round, so space freed at the front can be reused without shuffling items forward.' },
    { id: 'ds-fc-5', front: 'How is the rear pointer updated in a circular queue of capacity n?', back: 'rear ← (rear + 1) MOD n' },
    { id: 'ds-fc-6', front: 'What does each node of a linked list contain?', back: 'The data and a pointer to the next node (null for the last node).' },
    { id: 'ds-fc-7', front: 'Give one advantage and one disadvantage of a linked list compared with an array.', back: 'Advantage: easy insertion/deletion without moving other items, and it can grow. Disadvantage: no direct access by index, and pointers use extra memory.' },
    { id: 'ds-fc-8', front: 'What is a collision in a hash table?', back: 'When two different keys produce the same hash address.' },
    { id: 'ds-fc-9', front: 'Name two ways of handling collisions.', back: 'Open addressing / linear probing (next free slot) and chaining (a linked list at each address). An overflow area is another option.' },
    { id: 'ds-fc-10', front: 'What property defines a binary search tree?', back: 'For every node, values in the left subtree are smaller and values in the right subtree are larger.' },
    { id: 'ds-fc-11', front: 'Which traversal of a BST outputs the values in order?', back: 'In-order traversal (left, node, right).' },
    { id: 'ds-fc-12', front: 'What is the order of a post-order traversal?', back: 'Left subtree, right subtree, then the node.' },
    { id: 'ds-fc-13', front: 'What is the difference between an array and a record?', back: 'An array holds elements of the same type accessed by index; a record holds named fields that can be of different types.' }
  ],
  questions: [
    {
      id: 'ds-q1', type: 'input', skill: 'application',
      question: 'An empty stack has these operations applied in order: push 5, push 8, pop, push 3, push 7, pop. Which value is now at the top of the stack?',
      accept: ['3'],
      explanation: '[5] → [5, 8] → pop 8 → [5] → [5, 3] → [5, 3, 7] → pop 7 → [5, 3]. The top is 3.'
    },
    {
      id: 'ds-q2', type: 'input', skill: 'application',
      question: 'An empty queue has these operations applied: enqueue A, enqueue B, enqueue C, dequeue, enqueue D, dequeue. Which item does the <em>second</em> dequeue return?',
      accept: ['B'],
      explanation: 'The first dequeue returns A (first in). The second returns B. The queue now holds C, D.'
    },
    {
      id: 'ds-q3', type: 'input', skill: 'application',
      question: 'A circular queue is stored in an array with indexes 0 to 4. The rear pointer is 4 and the queue is not full. An item is enqueued. What is the new value of the rear pointer?',
      accept: ['0'],
      explanation: 'rear ← (4 + 1) MOD 5 = 0. The pointer wraps round to the start of the array.'
    },
    {
      id: 'ds-q4', type: 'mcq', skill: 'recall',
      question: 'Which data structure is most suitable for holding print jobs so that they are printed in the order they were sent?',
      options: ['Queue', 'Stack', 'Binary search tree', 'Hash table'],
      answer: 0,
      feedback: ['', 'A stack would print the most recent job first (LIFO).', 'A BST orders items by value, not by arrival time.', 'A hash table gives fast access by key but does not keep arrival order.'],
      explanation: 'A queue is FIFO, so jobs leave in the order they arrived.'
    },
    {
      id: 'ds-q5', type: 'mcq', skill: 'recall',
      question: 'Which of these is a typical use of a stack?',
      options: ['Storing return addresses when subroutines are called', 'Holding processes waiting for a printer in arrival order', 'Storing data in key order for fast searching', 'Buffering keystrokes so they are processed in the order typed'],
      answer: 0,
      feedback: ['', 'Arrival order requires a queue.', 'Ordered storage for searching suits a binary search tree.', 'Keystrokes must be processed in order, so a queue is used.'],
      explanation: 'The most recently called subroutine must return first, which is LIFO behaviour.'
    },
    {
      id: 'ds-q6', type: 'mcq', skill: 'recall',
      question: 'What is the main advantage of a linked list over an array for a list that changes frequently?',
      options: ['Items can be inserted or deleted by changing pointers, without moving other items', 'Any item can be accessed directly using its index', 'It uses less memory per item', 'It can only store items of one data type'],
      answer: 0,
      feedback: ['', 'Direct access by index is an advantage of arrays; a linked list must be followed from the start.', 'Each node also stores a pointer, so a linked list uses more memory per item.', 'This is not an advantage, and is not true of all linked lists.'],
      explanation: 'Only the pointers around the insertion or deletion point change.'
    },
    {
      id: 'ds-q7', type: 'input', skill: 'application',
      question: 'A hash table uses the hashing algorithm <code>address ← key MOD 11</code>. At which address is the record with key 1234 stored (assuming no collision)?',
      accept: ['2'],
      explanation: '1234 ÷ 11 = 112 remainder 2 (11 × 112 = 1232), so the address is 2.'
    },
    {
      id: 'ds-q8', type: 'mcq', skill: 'application',
      question: 'A hash table uses linear probing. Key 45 hashes to address 3, but address 3 already holds another record. Address 4 is empty. Where is the record with key 45 stored?',
      options: ['Address 4', 'Address 3, overwriting the existing record', 'It cannot be stored', 'Address 0'],
      answer: 0,
      feedback: ['', 'Overwriting would lose the existing record; collisions must be resolved instead.', 'Linear probing finds the next free slot, so it can be stored.', 'Linear probing checks the next addresses in order (4, then 5…), not the start of the table.'],
      explanation: 'Linear probing places the item in the next available slot after the hashed address.'
    },
    {
      id: 'ds-q9', type: 'input', skill: 'application',
      question: 'The values 50, 30, 70, 20, 40, 60, 80 are inserted in that order into an empty binary search tree. Give the in-order traversal, separated by commas.',
      accept: ['20,30,40,50,60,70,80', '20 30 40 50 60 70 80'],
      ignoreSpaces: true,
      explanation: 'An in-order traversal of a BST visits the values in ascending order.'
    },
    {
      id: 'ds-q10', type: 'mcq', skill: 'application',
      question: 'For the same tree (50, 30, 70, 20, 40, 60, 80 inserted in order), what is the post-order traversal?',
      options: ['20, 40, 30, 60, 80, 70, 50', '50, 30, 20, 40, 70, 60, 80', '20, 30, 40, 50, 60, 70, 80', '80, 70, 60, 50, 40, 30, 20'],
      answer: 0,
      feedback: ['', 'This is pre-order (node first).', 'This is in-order (ascending).', 'This is a reverse in-order traversal (descending).'],
      explanation: 'Post-order visits left subtree, right subtree, then the node, so the root (50) is last.'
    },
    {
      id: 'ds-q11', type: 'input', skill: 'application',
      question: 'Using the same tree, how many nodes are compared to find the value 60, starting at the root?',
      accept: ['3'],
      explanation: 'Compare with 50 (go right), 70 (go left), then 60 (found): 3 comparisons.'
    },
    {
      id: 'ds-q12', type: 'input', skill: 'application',
      question: 'A three-dimensional array of integers has dimensions 3 × 4 × 5. Each integer uses 4 bytes. How many bytes does the array use?',
      accept: ['240', '240 bytes'],
      explanation: '3 × 4 × 5 = 60 elements; 60 × 4 bytes = 240 bytes.'
    },
    {
      id: 'ds-q13', type: 'mcq', skill: 'recall',
      question: 'What happens if a program tries to push an item onto a full stack implemented in a fixed-size array?',
      options: ['Stack overflow: the push should be rejected with an error', 'Stack underflow: the bottom item is removed', 'The array automatically doubles in size', 'The item replaces the top item'],
      answer: 0,
      feedback: ['', 'Underflow is popping from an <em>empty</em> stack.', 'A static array has a fixed size and cannot grow automatically.', 'A correct implementation never silently overwrites data.'],
      explanation: 'A push routine should check whether the top pointer is already at the last index before adding an item.'
    },
    {
      id: 'ds-q14', type: 'mcq', skill: 'recall',
      question: 'Which statement about records is correct?',
      options: ['A record can hold fields of different data types', 'A record can only hold fields of a single data type', 'A record is accessed by a numeric index only', 'A record is a dynamic data structure that grows automatically'],
      answer: 0,
      feedback: ['', 'This describes an array, not a record.', 'Record fields are accessed by name, for example student.surname.', 'A record has a fixed set of fields.'],
      explanation: 'For example, a book record might have title (string), price (real) and inStock (Boolean).'
    },
    {
      id: 'ds-q15', type: 'mcq', skill: 'technique',
      question: 'A question asks you to “Justify the use of a stack for an ‘undo’ feature. [2 marks]”. Which answer gains both marks?',
      options: ['Each action is pushed onto the stack as it happens; undo pops the most recent action first, because a stack is LIFO.', 'A stack is a data structure.', 'Stacks are fast.', 'A stack is FIFO, so the first action is undone first.'],
      answer: 0,
      feedback: ['', 'This is a definition, not a justification for this use.', 'This is vague and does not link to undo.', 'Stacks are LIFO, and undo must reverse the most recent action first.'],
      explanation: 'A justification links a property of the structure (LIFO) to the requirement (the most recent action is undone first).'
    }
  ],
  exam: [
    {
      id: 'ds-e1', marks: 4,
      question: 'A circular queue is implemented using an array of size <code>max</code>, a <code>rear</code> pointer and a variable <code>size</code> holding the number of items. Describe the steps needed to add an item to the queue.',
      markPoints: [
        'Check whether the queue is full (size = max).',
        'If full, report an error / do not add the item.',
        'Otherwise, move the rear pointer on by one, wrapping round: rear ← (rear + 1) MOD max.',
        'Store the new item at the position given by the rear pointer.',
        'Increase size by 1.'
      ],
      technique: 'Algorithm description questions reward each step in a sensible order. The “check if full” step is frequently forgotten.'
    },
    {
      id: 'ds-e2', marks: 5,
      question: 'Explain how a hash table is used to store and retrieve records, including how collisions can be dealt with.',
      markPoints: [
        'A hashing algorithm is applied to the key field to calculate an address/index.',
        'The record is stored at that address in the table.',
        'To retrieve a record, the same algorithm is applied to the key to find the address directly, without searching the whole table.',
        'A collision occurs when two keys hash to the same address.',
        'Linear probing/open addressing: the record is stored in the next free location, and searched for in the same way.',
        'Chaining: each address points to a linked list of records with that hash value.'
      ],
      technique: 'Cover all three parts: storing, retrieving and collisions. Naming one collision method and explaining it clearly is better than listing several names.'
    },
    {
      id: 'ds-e3', marks: 4,
      context: 'A music app stores a user’s playlist in order. Users frequently insert songs in the middle of the playlist and delete songs.',
      question: 'Discuss whether a static array or a linked list would be the better structure for the playlist.',
      markPoints: [
        'Linked list: inserting or deleting only requires pointers to be changed…',
        '…whereas in an array the later items must be shifted, which is slower for long playlists.',
        'A linked list is dynamic, so the playlist can grow without a fixed maximum size; an array may waste space or run out.',
        'However, an array allows direct access to any position (for example, jump to song 50), while a linked list must be followed from the start.',
        'Conclusion: a linked list is better because insertion and deletion are frequent.'
      ],
      technique: '“Discuss” needs points on both sides and a justified conclusion that refers to the scenario.'
    }
  ],
  traces: [
    {
      id: 'ds-t1',
      title: 'A stack stored in an array',
      intro: '<p>A stack is stored in an array <code>stack[0..4]</code> with a pointer <code>top</code>, initially −1. Complete one row for each operation, showing <code>top</code> after the operation and anything output. Leave the output cell empty if nothing is output.</p>',
      code: 'PROCEDURE push(x)\n    IF top = 4 THEN\n        OUTPUT "Overflow"\n    ELSE\n        top ← top + 1\n        stack[top] ← x\n    ENDIF\nENDPROCEDURE\n\nPROCEDURE pop()\n    IF top = -1 THEN\n        OUTPUT "Underflow"\n    ELSE\n        OUTPUT stack[top]\n        top ← top - 1\n    ENDIF\nENDPROCEDURE\n\nOperations: push(12), push(7), pop(), push(9), pop(), pop(), pop()',
      columns: ['Operation', 'top', 'Output'],
      rows: [
        ['push(12)', '0', ''],
        ['push(7)', '1', ''],
        ['pop()', '0', '7'],
        ['push(9)', '1', ''],
        ['pop()', '0', '9'],
        ['pop()', '-1', '12'],
        ['pop()', '-1', 'Underflow']
      ],
      given: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]],
      explanation: 'Each push increments <code>top</code> before storing. Pop outputs the item at <code>top</code> then decrements. The 9 overwrites the slot that held 7 (index 1). The final pop finds <code>top = -1</code>, so it reports underflow and <code>top</code> is unchanged.'
    },
    {
      id: 'ds-t2',
      title: 'Traversing a linked list stored in arrays',
      intro: '<p>A linked list is stored in two arrays. <code>start</code> = 3 and −1 means null.</p>' +
        '<table><thead><tr><th scope="col">Index</th><th scope="col">data</th><th scope="col">next</th></tr></thead><tbody>' +
        '<tr><td>0</td><td>Eagle</td><td>−1</td></tr><tr><td>1</td><td>Buzzard</td><td>4</td></tr><tr><td>2</td><td>Dunlin</td><td>0</td></tr>' +
        '<tr><td>3</td><td>Avocet</td><td>1</td></tr><tr><td>4</td><td>Curlew</td><td>2</td></tr></tbody></table>' +
        '<p>Complete one row for each pass through the loop, showing what is output and the value of <code>ptr</code> at the end of that pass.</p>',
      code: 'ptr ← start\nWHILE ptr <> -1\n    OUTPUT data[ptr]\n    ptr ← next[ptr]\nENDWHILE',
      columns: ['Output', 'ptr'],
      rows: [
        ['Avocet', '1'],
        ['Buzzard', '4'],
        ['Curlew', '2'],
        ['Dunlin', '0'],
        ['Eagle', '-1']
      ],
      explanation: 'The traversal starts at index 3 and follows each <code>next</code> pointer, outputting the birds in alphabetical order even though they are stored in a different order. It stops when <code>ptr</code> becomes −1 (null).'
    }
  ]
});
