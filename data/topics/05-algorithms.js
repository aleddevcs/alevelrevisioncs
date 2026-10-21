/* Topic 5: Algorithms – searching, sorting, complexity, shortest path and tracing. */
RS.content.registerTopic({
  id: 'algorithms',
  order: 5,
  title: 'Algorithms',
  icon: 'sort',
  colour: 'rose',
  summary: 'Linear and binary search, bubble, insertion and quicksort, Big O notation, shortest-path algorithms and tracing.',
  keywords: ['algorithm', 'linear search', 'binary search', 'bubble sort', 'insertion sort', 'quicksort', 'merge sort', 'pivot', 'Big O', 'complexity', 'time complexity', 'space complexity', 'logarithmic', 'quadratic', 'Dijkstra', 'shortest path', 'trace table', 'dry run', 'test data', 'boundary'],
  specRefs: [
    'AS Unit 1, section 9 (Algorithms and programs): defining algorithms; bubble sort and insertion sort; linear and binary search; following and altering algorithms; testing with dry runs',
    'A2 Unit 3, section 3 (Algorithms and programs): recursive and non-recursive sorts including quicksort; efficiency of sorting; Big O for sorting and searching; shortest-path algorithm; comparing algorithms; testing',
    'A2 Unit 4, section 2 (Data transmission): calculate lowest cost routes on a network'
  ],
  notes: [
    {
      heading: 'Representing algorithms',
      points: [
        'An <strong>algorithm</strong> is a finite sequence of unambiguous steps that solves a problem.',
        'Algorithms can be written as <strong>pseudo-code</strong>, drawn as <strong>flowcharts</strong> or described in <strong>structured English</strong>.',
        'The pseudo-code on this site is a general style for practice. Exam papers use their own conventions; the logic is what matters.'
      ]
    },
    {
      heading: 'Linear search and binary search',
      points: [
        '<strong>Linear search</strong> checks each item in turn from the start until the target is found or the end is reached. It works on unsorted data. Worst case: <var>n</var> comparisons, so O(<var>n</var>).',
        '<strong>Binary search</strong> requires <em>sorted</em> data. It compares the target with the middle item; if not equal, it discards the half that cannot contain the target and repeats. Worst case: about log<sub>2</sub> <var>n</var> comparisons, so O(log <var>n</var>).',
        'For 1,000 items, linear search may need 1,000 comparisons; binary search needs at most 10 (2<sup>10</sup> = 1,024).',
        'Use linear search for small or unsorted lists (or when the list changes often and keeping it sorted is costly). Use binary search for large sorted lists that are searched often.'
      ],
      code: 'low ← 0\nhigh ← length - 1\nfound ← False\nWHILE found = False AND low <= high\n    mid ← (low + high) DIV 2\n    IF items[mid] = target THEN\n        found ← True\n    ELSEIF items[mid] < target THEN\n        low ← mid + 1\n    ELSE\n        high ← mid - 1\n    ENDIF\nENDWHILE'
    },
    {
      heading: 'Bubble sort',
      points: [
        'Repeatedly passes through the list comparing adjacent pairs and swapping them if they are in the wrong order. After each pass, the largest remaining item has “bubbled” to its correct position at the end.',
        'Improvements: stop when a pass makes no swaps (the list is sorted), and reduce the number of comparisons by one each pass.',
        'Time complexity O(<var>n</var><sup>2</sup>) in the worst and average case; O(<var>n</var>) best case (already sorted, with the no-swaps check). It sorts in place, so extra space is O(1).',
        'Simple to write, but slow for large lists.'
      ]
    },
    {
      heading: 'Insertion sort',
      points: [
        'Builds a sorted section at the start of the list. Each pass takes the next unsorted item and moves it left past larger items until it is in the right place in the sorted section.',
        'Time complexity O(<var>n</var><sup>2</sup>) in the worst and average case; O(<var>n</var>) if the list is already sorted. Sorts in place (O(1) extra space).',
        'Usually faster than bubble sort in practice, and efficient for small or nearly sorted lists.'
      ],
      code: 'FOR i ← 1 TO length - 1\n    current ← items[i]\n    j ← i - 1\n    WHILE j >= 0 AND items[j] > current\n        items[j + 1] ← items[j]\n        j ← j - 1\n    ENDWHILE\n    items[j + 1] ← current\nENDFOR'
    },
    {
      heading: 'Quicksort (and merge sort)',
      points: [
        '<strong>Quicksort</strong> is a recursive “divide and conquer” algorithm. Choose a <strong>pivot</strong>; partition the list so items smaller than the pivot are on one side and larger items on the other; the pivot is now in its final place. Then quicksort each part recursively until parts have 0 or 1 items.',
        'Average time complexity O(<var>n</var> log <var>n</var>). Worst case O(<var>n</var><sup>2</sup>), for example when the pivot is always the smallest or largest item (such as the first item of an already sorted list).',
        'It sorts in place, but recursion uses stack space (O(log <var>n</var>) on average).',
        '<strong>Merge sort</strong> (for comparison) splits the list in half repeatedly, then merges sorted halves. It is always O(<var>n</var> log <var>n</var>) but needs O(<var>n</var>) extra memory for merging.',
        'Efficiency of a sort can be compared by the number of comparisons, the number of exchanges (swaps), the number of passes through the data and the storage space needed.'
      ]
    },
    {
      heading: 'Big O notation',
      html: '<p>Big O describes how the time (or memory) an algorithm needs grows as the input size <var>n</var> grows. It keeps only the fastest-growing term and ignores constants: 3<var>n</var><sup>2</sup> + 5<var>n</var> + 2 is O(<var>n</var><sup>2</sup>). It usually describes the worst case.</p>' +
        '<table><thead><tr><th scope="col">Complexity</th><th scope="col">Name</th><th scope="col">Example</th></tr></thead><tbody>' +
        '<tr><td>O(1)</td><td>Constant</td><td>Accessing an array element by index; hash table lookup (no collisions)</td></tr>' +
        '<tr><td>O(log <var>n</var>)</td><td>Logarithmic</td><td>Binary search</td></tr>' +
        '<tr><td>O(<var>n</var>)</td><td>Linear</td><td>Linear search; one loop over the data</td></tr>' +
        '<tr><td>O(<var>n</var> log <var>n</var>)</td><td>Linearithmic</td><td>Merge sort; quicksort (average)</td></tr>' +
        '<tr><td>O(<var>n</var><sup>2</sup>)</td><td>Polynomial (quadratic)</td><td>Bubble sort and insertion sort; two nested loops over the data</td></tr>' +
        '<tr><td>O(2<sup><var>n</var></sup>)</td><td>Exponential</td><td>Checking every subset of a set</td></tr>' +
        '</tbody></table>' +
        '<p>Scaling: if an O(<var>n</var><sup>2</sup>) algorithm takes 4 s for 1,000 items, doubling <var>n</var> multiplies the time by about 2<sup>2</sup> = 4, so about 16 s for 2,000 items.</p>'
    },
    {
      heading: 'Shortest path: Dijkstra’s algorithm',
      points: [
        'Finds the lowest-cost path from a start node to every other node in a weighted graph (for example routing data across a network, or sat-nav routes).',
        'Set the start node’s distance to 0 and every other node to infinity. Repeatedly choose the unvisited node with the smallest known distance, mark it visited, and for each neighbour, if (distance to current + edge weight) is smaller than the neighbour’s recorded distance, update it and record the current node as its previous node.',
        'When finished, follow the “previous node” records back from the destination to find the route.',
        'It requires edge weights that are not negative.'
      ]
    },
    {
      heading: 'Tracing and testing algorithms',
      points: [
        'A <strong>dry run</strong> works through an algorithm by hand, recording variable values in a <strong>trace table</strong>. It is used to find logic errors and to work out what an algorithm does.',
        'Choose test data that includes <strong>normal</strong> data (typical valid values), <strong>boundary</strong> (extreme) data at the edges of the valid range, and <strong>erroneous</strong> (invalid) data that should be rejected.',
        'For a valid range of 1 to 100: normal 50; boundary 1 and 100 (and just outside: 0 and 101); erroneous −7, 250 or “abc”.'
      ]
    }
  ],
  misconceptions: [
    { wrong: 'Binary search works on any list.', right: 'Binary search only works on sorted data.' },
    { wrong: 'O(n²) means the algorithm takes exactly n² seconds.', right: 'Big O describes how the time <em>grows</em> as n grows; constants and smaller terms are ignored.' },
    { wrong: 'Quicksort is always O(n log n).', right: 'Quicksort is O(n log n) on average but O(n²) in the worst case, for example with a poor pivot on sorted data.' },
    { wrong: 'A faster algorithm is always better.', right: 'For small data, a simple O(n²) algorithm may be fine. Memory use, simplicity and the nature of the data also matter.' }
  ],
  examTips: [
    'When tracing, use one row per change or per loop pass as the question asks, and only fill in values that change if that is the convention given.',
    'When asked about efficiency, use Big O <em>and</em> explain what it means for the scenario (for example “doubling the data roughly quadruples the time”).',
    'For “describe how quicksort works”, mention the pivot, partitioning and recursion on each part.'
  ],
  flashcards: [
    { id: 'alg-fc-1', front: 'What precondition does binary search have?', back: 'The data must be sorted.' },
    { id: 'alg-fc-2', front: 'Big O of linear search and binary search?', back: 'Linear search O(n); binary search O(log n).' },
    { id: 'alg-fc-3', front: 'Maximum comparisons for binary search of 1,000 items?', back: '10 (because 2<sup>10</sup> = 1,024 ≥ 1,000).' },
    { id: 'alg-fc-4', front: 'How can bubble sort be made to stop early?', back: 'Use a flag to record whether any swaps were made in a pass; if none, the list is sorted.' },
    { id: 'alg-fc-5', front: 'Describe insertion sort in one sentence.', back: 'Take each item in turn and insert it into the correct position within the already-sorted part of the list.' },
    { id: 'alg-fc-6', front: 'What is a pivot in quicksort?', back: 'The item used to partition the list: smaller items go to one side and larger items to the other.' },
    { id: 'alg-fc-7', front: 'Average and worst-case complexity of quicksort?', back: 'Average O(n log n); worst case O(n²).' },
    { id: 'alg-fc-8', front: 'What is the time complexity of two nested loops that each run n times?', back: 'O(n²).' },
    { id: 'alg-fc-9', front: 'What does Dijkstra’s algorithm find?', back: 'The shortest (lowest-cost) path from a start node to every other node in a weighted graph with non-negative weights.' },
    { id: 'alg-fc-10', front: 'What is a dry run?', back: 'Working through an algorithm by hand, step by step, recording variable values (usually in a trace table).' },
    { id: 'alg-fc-11', front: 'Valid range 1–100: give boundary test data.', back: '1 and 100 (and the invalid values just outside: 0 and 101).' },
    { id: 'alg-fc-12', front: 'Which needs more memory: merge sort or insertion sort?', back: 'Merge sort, which needs O(n) extra space; insertion sort sorts in place.' }
  ],
  questions: [
    {
      id: 'alg-q1', type: 'mcq', skill: 'recall',
      question: 'What must be true of a list before a binary search can be used?',
      options: ['It must be sorted', 'It must contain fewer than 1,000 items', 'It must contain only integers', 'It must have no duplicate values'],
      answer: 0,
      feedback: ['', 'Binary search works well on very large lists; that is when it is most useful.', 'Any data that can be ordered (for example strings) can be binary searched.', 'Duplicates do not stop binary search finding <em>a</em> matching item.'],
      explanation: 'Binary search discards half of the list based on whether the target is larger or smaller than the middle item, which only works if the list is in order.'
    },
    {
      id: 'alg-q2', type: 'input', skill: 'application',
      question: 'A binary search uses <code>mid ← (low + high) DIV 2</code> on the list <code>[3, 8, 12, 19, 23, 31, 40, 47, 52]</code> (indexes 0 to 8) to find 40. How many items are compared with 40?',
      accept: ['2'],
      explanation: 'mid = (0 + 8) DIV 2 = 4: 23 &lt; 40, so low = 5. mid = (5 + 8) DIV 2 = 6: items[6] = 40, found. Two comparisons.'
    },
    {
      id: 'alg-q3', type: 'input', skill: 'application',
      question: 'What is the maximum number of comparisons a binary search needs to search a sorted list of 1,000 items?',
      accept: ['10'],
      explanation: 'Each comparison halves the remaining items. 2<sup>9</sup> = 512 is too few; 2<sup>10</sup> = 1,024 ≥ 1,000, so at most 10 comparisons.'
    },
    {
      id: 'alg-q4', type: 'input', skill: 'application',
      question: 'Show the list <code>[5, 1, 4, 2, 8]</code> after the <em>first pass</em> of a bubble sort into ascending order. Separate values with commas.',
      accept: ['1,4,2,5,8', '1 4 2 5 8'],
      ignoreSpaces: true,
      explanation: 'Compare 5,1 → swap; 5,4 → swap; 5,2 → swap; 5,8 → no swap. Result: 1, 4, 2, 5, 8. The largest value (8) is in place.'
    },
    {
      id: 'alg-q5', type: 'input', skill: 'application',
      question: 'An insertion sort (ascending) is applied to <code>[7, 3, 5, 1]</code>. Show the list after the first <em>two</em> items have been inserted (that is, after 3 and then 5 have been placed). Separate values with commas.',
      accept: ['3,5,7,1', '3 5 7 1'],
      ignoreSpaces: true,
      explanation: 'Insert 3: [3, 7, 5, 1]. Insert 5 (moves left past 7): [3, 5, 7, 1]. The 1 has not been processed yet.'
    },
    {
      id: 'alg-q6', type: 'mcq', skill: 'recall',
      question: 'Which statement about quicksort is correct?',
      options: ['It is O(n log n) on average but can be O(n²) in the worst case', 'It is always O(n²)', 'It always needs O(n) extra memory to merge lists', 'It only works on lists with an even number of items'],
      answer: 0,
      feedback: ['', 'Quicksort’s average case is much better than O(n²).', 'Needing O(n) extra memory for merging describes merge sort.', 'Quicksort works on lists of any length.'],
      explanation: 'With a good pivot, each partition roughly halves the list, giving about log n levels of n work each.'
    },
    {
      id: 'alg-q7', type: 'mcq', skill: 'application',
      question: 'What is the time complexity of this algorithm, where <code>n</code> is the length of <code>list</code>?',
      code: 'count ← 0\nFOR i ← 0 TO n - 1\n    FOR j ← 0 TO n - 1\n        IF list[i] = list[j] THEN\n            count ← count + 1\n        ENDIF\n    ENDFOR\nENDFOR',
      options: ['O(n²)', 'O(n)', 'O(log n)', 'O(2ⁿ)'],
      answer: 0,
      feedback: ['', 'A single loop would be O(n), but the inner loop runs n times for <em>each</em> of the n outer iterations.', 'Logarithmic algorithms halve the problem each step; this one does not.', 'Exponential growth would come from, for example, examining every subset.'],
      explanation: 'The comparison runs n × n = n² times.'
    },
    {
      id: 'alg-q8', type: 'input', skill: 'application',
      question: 'An O(n²) sorting algorithm takes 4 seconds to sort 1,000 items. Approximately how many seconds would it take to sort 2,000 items?',
      accept: ['16', '16s', '16 seconds'],
      ignoreSpaces: true,
      explanation: 'Doubling n multiplies n² by 4, so about 4 × 4 = 16 seconds.'
    },
    {
      id: 'alg-q9', type: 'input', skill: 'application',
      question: 'A network has these links and costs: A–B 4, A–C 2, C–B 1, B–D 5, C–D 8, D–E 3, B–E 9. Links can be used in either direction. What is the lowest total cost from A to E?',
      accept: ['11'],
      explanation: 'A→C (2) → B (3) → D (8) → E (11). Alternatives: A→C→B→E = 12; A→C→D→E = 13; A→B→D→E = 12.'
    },
    {
      id: 'alg-q10', type: 'mcq', skill: 'application',
      question: 'What is the purpose of this algorithm?',
      code: 'result ← items[0]\nFOR i ← 1 TO length - 1\n    IF items[i] > result THEN\n        result ← items[i]\n    ENDIF\nENDFOR\nOUTPUT result',
      options: ['It outputs the largest value in the list', 'It outputs the smallest value in the list', 'It sorts the list into ascending order', 'It outputs the last value in the list'],
      answer: 0,
      feedback: ['', 'It replaces <code>result</code> when an item is <em>greater</em>, so it keeps the largest.', 'No items are moved, so nothing is sorted.', '<code>result</code> only changes when a larger item is found, so it is not necessarily the last item.'],
      explanation: 'Dry run it with test data such as [4, 9, 2]: result becomes 4, then 9, and stays 9.'
    },
    {
      id: 'alg-q11', type: 'mcq', skill: 'application',
      question: 'A program accepts whole-number ages from 11 to 18 inclusive. Which set of test data is boundary data?',
      options: ['11 and 18', '14 and 15', '−3 and “twelve”', '0 and 100'],
      answer: 0,
      feedback: ['', 'These are normal data from the middle of the range.', 'These are erroneous data (invalid type or far outside the range).', 'These are invalid, but not at the edges of the range.'],
      explanation: 'Boundary data tests the edges of the valid range; 10 and 19 would test just outside it.'
    },
    {
      id: 'alg-q12', type: 'mcq', skill: 'recall',
      question: 'Which algorithm is most suitable for searching an <em>unsorted</em> list of 20 names once?',
      options: ['Linear search', 'Binary search', 'Quicksort', 'Dijkstra’s algorithm'],
      answer: 0,
      feedback: ['', 'Binary search needs sorted data; sorting first would take longer than one linear search.', 'Quicksort sorts data; it does not search for an item.', 'Dijkstra’s algorithm finds shortest paths in graphs.'],
      explanation: 'For a small, unsorted list searched once, linear search is simplest and fast enough.'
    },
    {
      id: 'alg-q13', type: 'mcq', skill: 'recall',
      question: 'Which sorting algorithm needs extra memory proportional to the size of the list?',
      options: ['Merge sort', 'Bubble sort', 'Insertion sort', 'All of these sort in place'],
      answer: 0,
      feedback: ['', 'Bubble sort swaps items within the list, using only a temporary variable.', 'Insertion sort shifts items within the list, using only a temporary variable.', 'Merge sort does not sort in place: it needs extra space to merge.'],
      explanation: 'Merge sort has space complexity O(n) because merging needs a separate list.'
    },
    {
      id: 'alg-q14', type: 'mcq', skill: 'technique',
      question: 'An exam question gives an algorithm and a trace table with columns for each variable. What is the best way to complete it?',
      options: ['Work through one line at a time, recording each new value in a new row as instructed, checking loop conditions each time', 'Work out the final output in your head and write it in the last row', 'Fill every cell in every row, even when the question says to record only changes', 'Write a description of the algorithm instead'],
      answer: 0,
      feedback: ['', 'Marks are usually given for intermediate values, so only giving the output loses marks.', 'Follow the convention the question gives; extra or repeated values can make the table wrong.', 'A description does not complete the trace table.'],
      explanation: 'Careful, methodical tracing earns marks for each correct row and helps avoid mistakes with loop conditions.'
    }
  ],
  exam: [
    {
      id: 'alg-e1', marks: 4,
      question: 'Compare linear search and binary search.',
      markPoints: [
        'Linear search checks each item in turn from the start; binary search repeatedly checks the middle item and discards half of the list.',
        'Binary search requires the data to be sorted; linear search works on unsorted data.',
        'Linear search is O(n); binary search is O(log n)…',
        '…so binary search is much faster for large lists (for example at most 10 comparisons for 1,000 items, compared with 1,000).',
        'Linear search is simpler to program and may be better for small lists or lists that change often.'
      ],
      technique: 'Every point should mention both algorithms. Including Big O and a numerical example shows depth.'
    },
    {
      id: 'alg-e2', marks: 4,
      question: 'Describe how quicksort sorts a list of numbers into ascending order.',
      markPoints: [
        'An item is chosen as the pivot (for example the first item).',
        'The list is partitioned: items smaller than the pivot are placed before it and larger items after it.',
        'The pivot is now in its correct final position.',
        'Quicksort is then applied recursively to the sub-list before the pivot and to the sub-list after it.',
        'This continues until each sub-list has zero or one items (the base case).'
      ],
      technique: 'Use the key terms: pivot, partition, recursion and base case.'
    },
    {
      id: 'alg-e3', marks: 3,
      context: 'A company currently sorts 10,000 records with bubble sort. The number of records is expected to grow to 1,000,000.',
      question: 'Using Big O notation, explain why the company should consider a different sorting algorithm.',
      markPoints: [
        'Bubble sort has time complexity O(n²).',
        'Increasing n by a factor of 100 increases the time by roughly 100² = 10,000 times.',
        'An O(n log n) algorithm such as merge sort or quicksort (average) grows much more slowly, so would be far quicker for 1,000,000 records.'
      ],
      technique: 'Quantify the growth using the scenario’s numbers rather than just saying “it will be slow”.'
    }
  ],
  traces: [
    {
      id: 'alg-t1',
      title: 'Binary search',
      intro: '<p>The array <code>A</code> holds <code>[3, 8, 12, 19, 23, 31, 40, 47, 52]</code> (indexes 0 to 8) and <code>target</code> is 19. Complete one row for each pass through the loop, showing the values <strong>at the end of the pass</strong>.</p>',
      code: 'low ← 0\nhigh ← 8\nfound ← False\nWHILE found = False AND low <= high\n    mid ← (low + high) DIV 2\n    IF A[mid] = target THEN\n        found ← True\n    ELSEIF A[mid] < target THEN\n        low ← mid + 1\n    ELSE\n        high ← mid - 1\n    ENDIF\nENDWHILE',
      columns: ['low', 'high', 'mid', 'A[mid]', 'found'],
      rows: [
        ['0', '3', '4', '23', 'False'],
        ['2', '3', '1', '8', 'False'],
        ['3', '3', '2', '12', 'False'],
        ['3', '3', '3', '19', 'True']
      ],
      explanation: '23 &gt; 19 so high = 3. mid = 1: 8 &lt; 19 so low = 2. mid = (2 + 3) DIV 2 = 2: 12 &lt; 19 so low = 3. mid = 3: A[3] = 19, so found becomes True and the loop ends.'
    },
    {
      id: 'alg-t2',
      title: 'Bubble sort with a swapped flag',
      intro: '<p>The list is <code>[4, 2, 5, 1]</code>. Complete one row for each pass of the REPEAT loop, showing the list at the end of the pass (values separated by commas), the number of swaps in that pass and the value of <code>swapped</code>.</p>',
      code: 'REPEAT\n    swapped ← False\n    swaps ← 0\n    FOR i ← 0 TO 2\n        IF list[i] > list[i + 1] THEN\n            temp ← list[i]\n            list[i] ← list[i + 1]\n            list[i + 1] ← temp\n            swapped ← True\n            swaps ← swaps + 1\n        ENDIF\n    ENDFOR\nUNTIL swapped = False',
      columns: ['list', 'swaps', 'swapped'],
      rows: [
        ['2,4,1,5', '2', 'True'],
        ['2,1,4,5', '1', 'True'],
        ['1,2,4,5', '1', 'True'],
        ['1,2,4,5', '0', 'False']
      ],
      explanation: 'Pass 1 swaps (4,2) and (5,1). Pass 2 swaps (4,1). Pass 3 swaps (2,1). The list is now sorted, but the algorithm only knows this after a full pass with no swaps, so a fourth pass is needed.'
    }
  ]
});
