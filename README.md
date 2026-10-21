# CS Revision Hub – A-level Computer Science revision website

An interactive, static revision website for A-level Computer Science students. It runs entirely in the
browser with plain HTML, CSS and JavaScript. There is **no build step, no database, no API keys and no
paid services**, so it can be hosted free on GitHub Pages or opened straight from disk.

## What is included

| Feature | Where |
| --- | --- |
| Homepage with topic cards and progress bars | `#/` |
| Notes, common misconceptions and exam technique for each topic | Topic → **Notes** |
| Flashcards with reveal, “I know this” / “Still learning”, shuffle and filters | Topic → **Flashcards** |
| Shuffled question bank with instant feedback and explanations | Topic → **Question bank** |
| Exam-style questions with indicative points and self-assessment | Topic → **Exam-style** |
| Trace-table exercises (algorithms, registers, SQL results, truth tables) | Topic → **Tracing** |
| Configurable quiz (topics, skill type, length) with final score, per-topic breakdown and a review of incorrect and unanswered questions | `#/quiz` |
| Revision dashboard: mastery and accuracy by topic and by skill, suggestions, quiz history, export/import/reset | `#/dashboard` |
| Search across notes, flashcards and questions | Header search box |
| Light and dark themes, responsive layout, keyboard and screen-reader support | Everywhere |

**Content in this first version:** 10 topics, 152 auto-marked practice questions (108 multiple choice, 44 typed
answers), 132 flashcards, 30 exam-style questions and 13 tracing exercises. Every question is labelled as
**Knowledge recall**, **Application** or **Exam technique**.

### Topics

1. Processor architecture
2. Memory and storage
3. Data representation
4. Data structures
5. Algorithms
6. Programming concepts
7. Networks and security
8. Databases and SQL
9. Systems development and testing
10. Boolean logic

Topics 1–9 follow the requested initial structure. **Boolean logic** was added because logical operations,
De Morgan’s laws and masking appear in the WJEC specification that was supplied (AS Unit 1 section 2, A2 Unit 3
section 2, and Appendix C).

## Important notes on the content

- **All questions are practice questions** written for this site. None is an official past-paper question,
  and indicative answers are not official mark schemes. The site says this in its footer, on the exam-style tab
  and on the About page.
- **Specification mapping is unverified.** Each topic page lists links to the *WJEC GCE AS/A Level Computer
  Science* specification (Wales, version 2, March 2019). I made this mapping by reading that document. It has
  **not** been checked or endorsed by WJEC, and it has not been compared with the current version on WJEC’s
  website. Other boards (AQA, OCR, Eduqas and so on) structure content differently.
- Pseudo-code on the site uses a general, readable style. It is not any exam board’s official pseudo-code.
- The content is written in British English; an automated test checks for common American spellings.
- A subject specialist should review the content before it is relied on (see “Still to be tested” below).

## Running it locally

Option 1 – just open it: double-click `index.html`. Everything works from `file://`, including saving progress.

Option 2 – local web server (closest to GitHub Pages). With Node.js 20 or later installed:

```bash
npm start            # serves the site at http://localhost:8000
```

Any static server also works, for example `python3 -m http.server 8000`.

## Testing

The site itself has no dependencies. The tests use Node’s built-in test runner, plus Playwright for browser
tests and ESLint for linting.

```bash
npm install                      # installs eslint and playwright (dev only)
npx playwright install chromium  # one-off browser download for the end-to-end tests

npm test             # unit and content tests (no browser needed)
npm run test:e2e     # end-to-end tests in headless Chromium
npm run lint         # ESLint
npm run check        # all of the above
```

If you already have Chromium installed elsewhere, set `CHROMIUM_PATH=/path/to/chromium` instead of running
`playwright install`.

### What the tests cover

- **Content tests** (`tests/unit/content.test.js`): every topic, question, flashcard, exam question and trace
  table follows the required format; IDs are unique; each multiple-choice question has exactly one valid
  answer index and an explanation of why each wrong option is wrong; typed-answer questions accept their own
  model answers; exam questions have at least as many indicative points as marks; HTML in content is well
  formed; British spellings; no wording that implies official status.
- **Logic tests** (`tests/unit/logic.test.js`): answer marking and normalisation, shuffling, quiz scoring of
  correct/incorrect/skipped/untouched questions, storage save and reload, corrupt or hand-edited storage,
  blocked storage, export/import, progress and mastery calculations, and search.
- **End-to-end tests** (`tests/e2e/site.test.js`): every page and tab renders without JavaScript errors;
  navigation, breadcrumbs and the not-found page; flashcards (including keyboard use) persisting after refresh;
  empty-answer handling; a full quiz with correct, incorrect and skipped answers, **a page refresh part-way
  through**, early finishing with unanswered questions, results, retrying, and dashboard history; exam
  self-assessment and saved drafts; trace-table marking; search (including escaping of HTML in search terms);
  export, reset and import of progress; theme persistence; no horizontal scrolling at phone width and the
  mobile menu; and loading from `file://`.

## Editing content

Each topic is one file in `data/topics/`. Open the file, edit the text, and refresh the browser.
Content strings may contain simple HTML such as `<code>`, `<strong>`, `<em>`, `<sup>` and tables. Write
`&lt;` for a literal `<` and `&amp;` for `&`. The content tests will tell you if something is malformed.
Content files are trusted: only edit them yourself or review contributions, as their HTML is inserted
into the page.

To write NOT as a bar over a term, use `<span class="ovl">A</span>`. Screen readers will read it as “NOT (A)”.

### Topic format (summary)

```js
RS.content.registerTopic({
  id: 'unique-topic-id', order: 11, title: 'Topic title',
  icon: 'cpu',      // cpu, memory, binary, tree, sort, code, network, database, clipboard, logic
  colour: 'blue',   // blue, violet, teal, amber, rose, green, indigo, cyan, orange, slate
  summary: 'One-sentence summary for the topic card.',
  keywords: ['extra', 'search', 'terms'],
  specRefs: ['Where this appears in your specification'],
  notes: [{ heading: 'Heading', points: ['Bullet', 'Bullet'] /* or html: '...' */, code: 'optional code' }],
  misconceptions: [{ wrong: 'What students often think', right: 'What is actually true' }],
  examTips: ['Advice on answering questions'],
  flashcards: [{ id: 'unique-id', front: 'Prompt', back: 'Answer' }],
  questions: [
    { id: 'unique-id', type: 'mcq', skill: 'recall',   // recall | application | technique
      question: 'Question text', code: 'optional code',
      options: ['Correct option', 'Wrong 1', 'Wrong 2', 'Wrong 3'],
      answer: 0,                                       // index of the correct option
      feedback: ['', 'Why wrong 1 is wrong', 'Why wrong 2 is wrong', 'Why wrong 3 is wrong'],
      explanation: 'Shown after answering' },
    { id: 'unique-id', type: 'input', skill: 'application',
      question: 'Question text', accept: ['182'], ignoreSpaces: true, caseSensitive: false,
      hint: 'optional', explanation: 'Shown after answering' }
  ],
  exam: [{ id: 'unique-id', marks: 4, context: 'optional', question: '...', markPoints: ['...'], technique: 'optional' }],
  traces: [{ id: 'unique-id', title: '...', intro: '...', code: '...', columns: ['i', 'total'],
             rows: [['1', '5'], ['2', '9']], given: [[0, 0]] /* optional pre-filled cells [row, column] */,
             explanation: '...' }]
});
```

Multiple-choice options are shuffled every time they are shown, so it is fine to always write the correct
option first. Avoid “all of the above”/“none of the above” (a test enforces this).

To **add a new topic**, create a file in `data/topics/`, add a `<script>` tag for it in `index.html` (with the
other topic files) and update the expected topic count in `tests/unit/content.test.js`.

**Changing IDs** of existing questions or flashcards resets students’ saved progress for those items, so keep
IDs stable once the site is in use.

## Publishing on GitHub Pages

1. Merge this branch into your default branch (for example `main`).
2. On GitHub, open the repository’s **Settings → Pages**.
3. Under **Build and deployment**, choose **Source: Deploy from a branch**, then select the default branch and
   the **/ (root)** folder, and save.
4. After a minute or two the site will be live at `https://<your-user-name>.github.io/<repository-name>/`.

The empty `.nojekyll` file tells GitHub Pages to serve the files exactly as they are. No secrets or
configuration are needed. If you would like the tests to run automatically on every push, a GitHub Actions
workflow that runs `npm ci && npm run check` can be added later.

## Progress and privacy

- Progress (answers, flashcard status, self-assessed marks, quiz history, an unfinished quiz and exam answer
  drafts) is saved in the browser’s `localStorage` on that device only.
- It **does not synchronise between devices or browsers**, and clearing browsing data deletes it. Students can
  use **Export progress** and **Import progress** on the dashboard to move it between devices.
- Nothing is sent to a server. There are no accounts, cookies, analytics or external requests (no web fonts or
  CDNs), so the site also works offline once loaded.
- If a browser blocks local storage (some private browsing modes), the site still works and shows a warning that
  progress will be lost when the page closes.

## File structure

```
index.html                  Page shell, header, footer and script tags
css/styles.css              All styles, including light/dark themes
assets/favicon.svg          Site icon
js/utils.js                 Helpers (DOM builder, shuffle, answer normalisation)
js/icons.js                 Topic icons (inline SVG)
js/content.js               Content registry used by the topic files
js/storage.js               Progress storage (localStorage), export/import
js/quiz-engine.js           Quiz building and marking (no DOM code)
js/progress.js              Mastery, accuracy and suggestions (no DOM code)
js/search.js                Search index (no DOM code)
js/components.js            Shared UI: question cards, progress bars, badges
js/views/*.js               Pages: home, topic, quiz, dashboard, search, about
js/app.js                   Hash router, theme toggle, mobile menu
data/topics/*.js            Content: one file per topic
scripts/serve.js            Tiny local web server (used by npm start and tests)
tests/                      Unit, content and end-to-end tests
```

## Known limitations

- Exam-style answers are **self-assessed** against indicative points; the site cannot mark extended writing.
- Typed answers are marked by exact match after normalisation (ignoring case, extra spaces and a trailing full
  stop). A correct answer written in an unexpected form (for example a different notation) may be marked
  wrong, so explanations always show the accepted answer.
- Progress is per device and per browser (see above).
- Some WJEC content is not yet covered, including input/output devices (including voice input), operating
  system types and utility software, human–computer interaction in depth, types of software and expert systems,
  safety-critical and control systems, biometrics, legislation and ethical issues, and the Unit 2 and Unit 5
  practical components.
- Virtual memory and paging are included as background; the WJEC specification does not name them explicitly.

## Still to be tested

- **Subject-specialist review** of every explanation, question and indicative answer, and verification of
  the specification mapping against the current WJEC specification.
- Testing with students, including real screen-reader users (automated accessibility checks with axe-core
  found no issues, but that is not a substitute for testing with users).
- Testing on real phones and tablets and in Safari and Firefox (automated tests ran in Chromium only, at
  desktop and phone sizes).
- Behaviour on GitHub Pages itself (expected to match local testing, as the site is fully static).
