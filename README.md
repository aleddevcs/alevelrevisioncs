# CS Revision Hub – A-level Computer Science revision website

An interactive, static revision website for A-level Computer Science students. It runs entirely in the
browser with plain HTML, CSS and JavaScript. There is **no build step, no database, no API keys and no
paid services**, so it can be hosted free on GitHub Pages or opened straight from disk.

## What is included

| Feature | Where |
| --- | --- |
| Course pages by specification unit → topic → lesson, with your slides, worksheets and interactive activities | `#/units` |
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

**Revision content is written only from the lessons** (slides, starters, interactive activities and exit
tickets), one course topic at a time, and is **ordered by specification entry**. So far: **Unit 1, Topic 1
(Hardware and communication)**, built from Lessons 1–4 and covering entries 1.1.1 to 1.8.1: 35 note sections,
57 flashcards (including the Welsh key terms from the slides), 59 auto-marked practice questions, 15 exam-style
questions (the lessons' exit tickets plus one per specification statement) and a register-tracker exercise.
Students can revise the whole topic, one lesson, or one specification entry, and quiz on any of them.

Other topics show their lessons and resources, with revision marked “coming soon” until it is written.

## Course units and lesson resources

The **Units** section follows the WJEC specification: Unit → topic (specification section) → lesson. Each
lesson page shows its resources in four groups:

- **Interactive activities** (`.html` starters and activities): open full screen or shown inside the page.
- **Lesson materials** (slides, notes, cheat sheets): downloads.
- **Practice and assessment** (practice sheets, quizzes, assessments): downloads.
- **Teacher resources** (mark schemes, lesson plans, Forms quiz questions, Gimkit sets): downloads.

Every topic page links to the matching revision content (notes, flashcards and questions), and every
revision topic links back to the course topics it supports. Topics without lessons yet show “coming soon”;
a topic can declare how many lessons are planned so the remaining ones appear as placeholders.

PowerPoint and Word files cannot be displayed by a browser, so they are offered as downloads. Note that
everything in this repository, including mark schemes, is publicly accessible once the site is published.

### Adding your lesson resources

Files live in `resources/unit<U>/topic<T>/lesson<L>/` (or `resources/unit<U>/topic<T>/` for files that
belong to the whole topic), and each unit's lessons are listed in `data/course/unit<U>.js`:

```js
{
  number: 4,                                   // lesson number within the topic
  title: 'Character sets and data types',
  subtitle: 'ASCII and Unicode · Primitive data types',   // optional
  spec: '4.2.1 · 4.3.1',                        // optional
  resources: [
    { file: 'T4L4_Starter.html', title: 'Starter: Lesson 3 recall', type: 'starter' },
    { file: 'T4L4_Slides.pptx', title: 'Character sets and data types', type: 'slides' }
  ]
}
```

Resource types: `starter`, `interactive` (both must be `.html`), `slides`, `notes`, `cheat-sheet`,
`worksheet`, `quiz`, `assessment`, `mark-scheme`, `lesson-plan`, `forms-quiz`, `gimkit`.

The easiest route is to upload a lesson's files to the `uploads/` folder on GitHub and ask Claude to add them
(see `uploads/README.md`). The tests check that every listed file exists **and** that every file in
`resources/` is listed, so nothing is broken or forgotten.

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
- **Course tests** (`tests/unit/course.test.js`): every listed lesson file exists, every file in `resources/`
  is listed, types are valid, lessons are numbered in order, and lessons appear in search.
- **Logic tests** (`tests/unit/logic.test.js`): answer marking and normalisation, shuffling, quiz scoring of
  correct/incorrect/skipped/untouched questions, storage save and reload, corrupt or hand-edited storage,
  blocked storage, export/import, progress and mastery calculations, and search.
- **End-to-end tests** (`tests/e2e/site.test.js`): every page and tab renders without JavaScript errors;
  navigation, breadcrumbs and the not-found page; flashcards (including keyboard use) persisting after refresh;
  empty-answer handling; a full quiz with correct, incorrect and skipped answers, **a page refresh part-way
  through**, early finishing with unanswered questions, results, retrying, and dashboard history; exam
  self-assessment and saved drafts; trace-table marking; search (including escaping of HTML in search terms);
  export, reset and import of progress; theme persistence; no horizontal scrolling at phone width and the
  mobile menu; loading from `file://`; and the course pages, including a check that every resource link on every lesson
  page returns its file and that activities can be shown inside the page.

## Writing revision content

Revision for each course topic is one file in `data/revision/`, named `unit<U>-topic<T>.js`, for example
`data/revision/unit1-topic1.js`. It is written from that topic's lesson resources. Content strings may contain
simple HTML such as `<code>`, `<strong>`, `<em>`, `<sup>` and tables. Write `&lt;` for a literal `<` and `&amp;`
for `&`. The content tests will tell you if something is malformed. Content files are trusted: their HTML is
inserted into the page.

To write NOT as a bar over a term, use `<span class="ovl">A</span>`. Screen readers will read it as “NOT (A)”.

### Revision file format (summary)

```js
RS.content.registerTopic({
  id: 'u1-t1', unit: 1, topic: 1,            // must match a topic in data/course/unit1.js
  title: 'Hardware and communication',
  icon: 'cpu',      // cpu, memory, binary, tree, sort, code, network, database, clipboard, logic
  colour: 'blue',   // blue, violet, teal, amber, rose, green, indigo, cyan, orange, slate
  summary: 'One-sentence summary.',
  keywords: ['extra', 'search', 'terms'],
  specRefs: ['Lesson 1 – 1.1.1 …'],
  // Every item has `spec` (an entry listed for the topic in data/course/unitN.js) and `lesson`.
  notes: [{ spec: '1.2.1', lesson: 1, heading: 'Heading', points: ['Bullet'] /* or html: '...' */, code: 'optional' }],
  misconceptions: [{ spec: '1.2.2', lesson: 1, wrong: 'What students often think', right: 'What is actually true' }],
  examTips: [{ spec: '1.2.1', lesson: 1, text: 'Advice on answering questions' }],
  flashcards: [{ id: 'u1t1-121-fc1', spec: '1.2.1', lesson: 1, front: 'Prompt', back: 'Answer' }],
  questions: [
    { id: 'u1t1-121-q1', spec: '1.2.1', lesson: 1, type: 'mcq', skill: 'recall',   // recall | application | technique
      question: 'Question text', code: 'optional code',
      options: ['Correct option', 'Wrong 1', 'Wrong 2', 'Wrong 3'],
      answer: 0,                                       // index of the correct option
      feedback: ['', 'Why wrong 1 is wrong', 'Why wrong 2 is wrong', 'Why wrong 3 is wrong'],
      explanation: 'Shown after answering' },
    { id: 'u1t1-123-q1', spec: '1.2.3', lesson: 2, type: 'input', skill: 'application',
      question: 'Question text', accept: ['10', '10 s'], ignoreSpaces: false, caseSensitive: false,
      hint: 'optional', explanation: 'Shown after answering' }
  ],
  exam: [{ id: 'u1t1-121-e1', spec: '1.2.1', lesson: 1, marks: 4, context: 'optional', question: '...', markPoints: ['...'], technique: 'optional' }],
  traces: [{ id: 'u1t1-131-t1', spec: '1.3.1', lesson: 2, title: '...', intro: '...', code: '...', columns: ['PC', 'ACC'],
             rows: [['1', '25']], given: [[0, 0]] /* optional pre-filled cells [row, column] */,
             explanation: '...' }]
});
```

The course topic in `data/course/unitN.js` lists its specification entries in order, each with its statement
and the lesson(s) that teach it (`spec: [{ code: '1.2.1', lessons: [1], text: '…' }]`). Revision pages, the
question bank and flashcards follow that order. The tests check that every item names a real entry taught in
its lesson, that every entry has notes and questions, and that each lesson has at least 2 note sections,
5 flashcards, 6 questions and 1 exam-style question.
Multiple-choice options are shuffled every time they are shown, so it is fine to always write the correct
option first. Avoid “all of the above”/“none of the above” (a test enforces this).

To **add revision for another topic**, create `data/revision/unit<U>-topic<T>.js`, add a `<script>` tag for it
in `index.html` (next to the existing revision file, with the same `?v=` number) and increase the `?v=` number.

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
- Nothing is sent to a server. There are no accounts, cookies or analytics. The site itself makes no external
  requests; some of the interactive lesson activities load Google Fonts, and fall back to standard fonts if
  they cannot.
- If a browser blocks local storage (some private browsing modes), the site still works and shows a warning that
  progress will be lost when the page closes.

## File structure

```
index.html                  Page shell, header, footer and script tags
css/styles.css              All styles, including light/dark themes
assets/favicon.svg          Site icon
js/utils.js                 Helpers (DOM builder, shuffle, answer normalisation)
js/icons.js                 Topic icons (inline SVG)
js/content.js               Revision content registry (per course topic, tagged by lesson)
js/course.js                Course catalogue registry (units, topics, lessons, resources)
js/storage.js               Progress storage (localStorage), export/import
js/quiz-engine.js           Quiz building and marking (no DOM code)
js/progress.js              Mastery, accuracy and suggestions (no DOM code)
js/search.js                Search index (no DOM code)
js/components.js            Shared UI: question cards, progress bars, badges
js/views/*.js               Pages: home, revision topic, course (units/topics/lessons), quiz, dashboard, search, about
js/app.js                   Hash router, theme toggle, mobile menu
data/revision/*.js          Revision content: one file per course topic, written from its lessons
data/course/unit*.js        Course catalogue: one file per specification unit
resources/unit*/topic*/…    Your lesson files (slides, worksheets, interactive activities)
uploads/                    Drop new lesson files here before they are added to the site
scripts/serve.js            Tiny local web server (used by npm start and tests)
tests/                      Unit, content and end-to-end tests
```

## Browser caching after an update

GitHub Pages lets browsers keep files for about 10 minutes. To make sure visitors get matching new files
after an update, every script and stylesheet link in `index.html` ends in a version number such as
`?v=3`. **Increase it everywhere in `index.html` whenever the site changes** (a test checks they all match).
If a page still looks out of date, a hard refresh (Ctrl + Shift + R, or Cmd + Shift + R on a Mac) fixes it.

## Known limitations

- Exam-style answers are **self-assessed** against indicative points; the site cannot mark extended writing.
- Typed answers are marked by exact match after normalisation (ignoring case, extra spaces and a trailing full
  stop). A correct answer written in an unexpected form (for example a different notation) may be marked
  wrong, so explanations always show the accepted answer.
- Progress is per device and per browser (see above).
- Revision content has only been written for Unit 1, Topic 1 so far. Other topics show their lessons and
  resources, with revision “coming soon”. The Unit 2 and Unit 5 practical components have no content yet.

## Still to be tested

- **Subject-specialist review** of every explanation, question and indicative answer, and verification of
  the specification mapping against the current WJEC specification.
- Testing with students, including real screen-reader users (automated accessibility checks with axe-core
  found no issues, but that is not a substitute for testing with users).
- Testing on real phones and tablets and in Safari and Firefox (automated tests ran in Chromium only, at
  desktop and phone sizes).
- Behaviour on GitHub Pages itself (expected to match local testing, as the site is fully static).
