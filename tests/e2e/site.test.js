/*
 * End-to-end tests in a real browser (Playwright + Chromium).
 * Run with: npm run test:e2e   (see README.md for setup)
 */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { chromium } = require('playwright');
const { createServer } = require('../../scripts/serve');

const PORT = 8765;
const BASE = `http://localhost:${PORT}/`;
let server;
let browser;

test.before(async () => {
  server = createServer().listen(PORT);
  const launch = {};
  if (process.env.CHROMIUM_PATH) launch.executablePath = process.env.CHROMIUM_PATH;
  browser = await chromium.launch(launch);
});

test.after(async () => {
  if (browser) await browser.close();
  if (server) server.close();
});

/** New page in a fresh context; collects any JavaScript errors. */
async function openPage(options = {}) {
  const context = await browser.newContext({ acceptDownloads: true, ...options });
  const page = await context.newPage();
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') page.errors.push(m.text()); });
  return page;
}

async function go(page, hash) {
  await page.goto(BASE + hash);
  await page.waitForSelector('#app h1');
}

/** Answer the quiz question currently on screen, correctly or not. */
async function answerCurrent(page, correctly) {
  const q = await page.evaluate(() => {
    const s = window.RS.store.getActiveQuiz();
    const question = window.RS.content.question(s.ids[s.current]);
    return { type: question.type, answer: question.answer, options: (question.options || []).length, accept: question.accept };
  });
  if (q.type === 'mcq') {
    const idx = correctly ? q.answer : (q.answer + 1) % q.options;
    await page.locator(`.option[data-index="${idx}"] label`).click();
  } else {
    await page.fill('.question-card .text-input', correctly ? q.accept[0] : 'definitely wrong');
  }
  await page.click('.question-card button[type=submit]');
  await page.waitForSelector('.feedback-title');
}

test('every page and topic tab renders without JavaScript errors', async () => {
  const page = await openPage();
  await go(page, '#/');
  const topics = await page.evaluate(() => window.RS.content.topics().map((t) => ({ id: t.id, traces: t.traces.length })));
  assert.equal(topics.length, 10);
  assert.equal(await page.locator('.topic-grid:not(.unit-grid) .topic-card').count(), 10);

  const hashes = ['#/quiz', '#/dashboard', '#/about', '#/search?q=cache', '#/question/proc-q1'];
  for (const t of topics) {
    for (const tab of ['notes', 'flashcards', 'questions', 'exam']) hashes.push(`#/topic/${t.id}/${tab}`);
    if (t.traces) hashes.push(`#/topic/${t.id}/tracing`);
  }
  for (const h of hashes) {
    await go(page, h);
    assert.ok((await page.locator('#app h1').textContent()).trim().length > 0, `${h} has a heading`);
  }
  assert.deepEqual(page.errors, []);
  await page.context().close();
});

test('navigation links, breadcrumbs and the not-found page work', async () => {
  const page = await openPage();
  await go(page, '#/');
  await page.click('.site-nav a[data-nav="dashboard"]');
  await page.waitForSelector('h1:has-text("Revision dashboard")');
  assert.equal(await page.getAttribute('.site-nav a[data-nav="dashboard"]', 'aria-current'), 'page');

  await go(page, '#/');
  await page.click('.topic-grid:not(.unit-grid) .topic-card >> nth=2');
  await page.waitForSelector('.topic-header h1');
  await page.click('.tab:has-text("Flashcards")');
  await page.waitForSelector('.flashcard');
  await page.click('.breadcrumbs a');
  await page.waitForSelector('.topic-grid');

  await go(page, '#/this/does/not/exist');
  assert.equal(await page.textContent('#app h1'), 'Page not found');
  assert.deepEqual(page.errors, []);
  await page.context().close();
});

test('flashcards reveal and their status persists after a refresh', async () => {
  const page = await openPage();
  await go(page, '#/topic/processor/flashcards');
  const card = page.locator('.flashcard');
  assert.equal(await card.getAttribute('aria-expanded'), 'false');
  await card.press('Enter'); // keyboard operable
  assert.equal(await page.locator('.flashcard').getAttribute('aria-expanded'), 'true');
  assert.ok(await page.locator('.fc-back').isVisible());
  await page.click('button:has-text("I know this")');
  assert.match(await page.textContent('.fc-counter'), /Card 2 of/);
  await page.reload();
  await page.waitForSelector('.flashcard');
  assert.match(await page.textContent('.tab-panel > p.muted'), /^1 known/);
  await page.context().close();
});

test('question bank gives instant feedback, rejects empty answers and can be retried', async () => {
  const page = await openPage();
  await go(page, '#/question/dr-q1'); // typed-answer question: 10110110 → 182
  await page.click('button:has-text("Check answer")');
  assert.match(await page.textContent('.feedback'), /Type an answer first/);
  assert.equal(await page.evaluate(() => Object.keys(window.RS.store.state.questions).length), 0, 'empty answer is not recorded');

  await page.fill('.text-input', '181');
  await page.click('button:has-text("Check answer")');
  assert.match(await page.textContent('.feedback-title'), /Not quite/);
  assert.match(await page.textContent('.feedback'), /Accepted answer:\s*182/);

  await go(page, '#/topic/processor/questions');
  const first = page.locator('.bank-item:has(.option)').first(); // the bank is shuffled
  await first.locator('.option label').first().click();
  await first.locator('button[type=submit]').click();
  await first.locator('.feedback-title').waitFor();
  await first.locator('button:has-text("Try again")').click();
  assert.equal(await first.locator('.feedback-title').count(), 0, 'Try again resets the card');
  assert.deepEqual(page.errors, []);
  await page.context().close();
});

test('a quiz survives a refresh, handles unanswered questions and shows a summary', async () => {
  const page = await openPage();
  await go(page, '#/quiz');

  // Edge case: no topics selected.
  await page.click('button:has-text("Clear all")');
  await page.click('button:has-text("Start quiz")');
  assert.match(await page.textContent('.form-error'), /Choose at least one topic/);

  await page.check('#qt-algorithms');
  await page.selectOption('#q-count', '5');
  await page.click('button:has-text("Start quiz")');
  await page.waitForSelector('.question-card');
  assert.match(page.url(), /#\/quiz\/run$/);

  await answerCurrent(page, true);
  assert.match(await page.textContent('.quiz-head'), /1 of 5 answered · 1 correct/, 'status updates immediately');
  assert.equal(await page.locator('.qnav-correct').count(), 1);
  await page.click('button:has-text("Next question")');
  await answerCurrent(page, false);
  await page.click('button:has-text("Next question")');
  await page.click('button:has-text("Skip for now")'); // question 3 skipped
  await page.waitForSelector('.qnav.is-current:has-text("4")');

  // Refresh mid-quiz: the same question and previous answers are restored.
  await page.reload();
  await page.waitForSelector('.qnav.is-current:has-text("4")');
  assert.match(await page.textContent('.quiz-head'), /2 of 5 answered · 1 correct/);
  await page.click('.qnav >> nth=0');
  await page.waitForSelector('.question-card.is-correct');

  // Ending early asks for confirmation because 3 questions are unanswered.
  await page.click('button:has-text("End quiz now")');
  assert.match(await page.textContent('.confirm'), /3 unanswered questions/);
  await page.click('button:has-text("Finish and see results")');
  await page.waitForSelector('h1:has-text("Quiz results")');
  assert.match(await page.textContent('.score'), /You scored 1 out of 5/);
  assert.match(await page.textContent('.result-counts'), /1 correct\s*1 incorrect\s*3 unanswered/);
  assert.equal(await page.locator('.review-item').count(), 4);
  assert.equal(await page.locator('.review-item.is-unanswered').count(), 3);

  // Results also survive a refresh, and the retry button builds a new quiz.
  await page.reload();
  await page.waitForSelector('.results-summary');
  await page.click('button:has-text("Retry incorrect and unanswered (4)")');
  await page.waitForSelector('.question-card');
  assert.equal(await page.locator('.qnav').count(), 4);

  await go(page, '#/dashboard');
  assert.match(await page.textContent('.stat-grid'), /Quizzes completed/);
  assert.match(await page.textContent('.history'), /1\/5/);
  assert.deepEqual(page.errors, []);
  await page.context().close();
});

test('exam-style self-assessment and drafts are saved', async () => {
  const page = await openPage();
  await go(page, '#/topic/processor/exam');
  const card = page.locator('.exam-card').first();
  await card.locator('textarea').fill('The PC is copied to the MAR...');
  await card.locator('button:has-text("Show indicative answer")').click();
  await card.locator('.mark-points input').nth(0).check();
  await card.locator('.mark-points input').nth(1).check();
  await card.locator('button:has-text("Save my mark")').click();
  assert.match(await card.locator('.mark-result').textContent(), /Saved: 2 out of 4/);
  await page.reload();
  await page.waitForSelector('.exam-card');
  assert.match(await page.locator('.exam-card').first().textContent(), /Last self-assessment: 2\/4/);
  assert.equal(await page.locator('.exam-card textarea').first().inputValue(), 'The PC is copied to the MAR...');
  await page.context().close();
});

test('trace tables mark each cell', async () => {
  const page = await openPage();
  await go(page, '#/topic/programming/tracing');
  const card = page.locator('.trace-card').first();
  await card.locator('button:has-text("Show answers")').click();
  await card.locator('button:has-text("Check table")').click();
  assert.match(await card.locator('.mark-result').textContent(), /18 of 18 cells correct/);
  await card.locator('button:has-text("Clear")').click();
  await card.locator('.cell-input').first().fill('99');
  await card.locator('button:has-text("Check table")').click();
  assert.match(await card.locator('.mark-result').textContent(), /0 of 18 cells correct/);
  assert.equal(await card.locator('.cell-bad').count(), 18);
  await page.context().close();
});

test('search from the header finds and links to content', async () => {
  const page = await openPage();
  await go(page, '#/');
  await page.fill('#search-input', 'binary search');
  await page.press('#search-input', 'Enter');
  await page.waitForSelector('.search-result');
  assert.ok((await page.locator('.search-result').count()) > 3);
  await page.click('.search-result a >> nth=0');
  await page.waitForFunction(() => !location.hash.startsWith('#/search'));
  await go(page, '#/search?q=%3Cscript%3Ealert(1)%3C%2Fscript%3E');
  assert.equal(await page.locator('#app script').count(), 0, 'search terms are escaped');
  assert.deepEqual(page.errors, []);
  await page.context().close();
});

test('dashboard export downloads progress and reset clears it', async () => {
  const page = await openPage();
  await go(page, '#/question/proc-q4');
  await page.fill('.text-input', '65536');
  await page.click('button:has-text("Check answer")');
  await go(page, '#/dashboard');
  const [download] = await Promise.all([page.waitForEvent('download'), page.click('button:has-text("Export progress")')]);
  assert.match(download.suggestedFilename(), /^cs-revision-progress-\d{4}-\d{2}-\d{2}\.json$/);
  const exportedFile = await download.path();
  await page.click('button:has-text("Reset progress")');
  await page.click('button:has-text("Yes, delete my progress")');
  await page.waitForSelector('h1:has-text("Revision dashboard")');
  assert.equal(await page.evaluate(() => Object.keys(window.RS.store.state.questions).length), 0);

  // Importing a file that is not an export is rejected with a message.
  await page.setInputFiles('#import-file', { name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from('{"hello":1}') });
  await page.waitForSelector('.mark-result:has-text("not a progress export")');
  // Importing the exported file restores the progress.
  await page.setInputFiles('#import-file', exportedFile);
  await page.waitForFunction(() => window.RS.store.state.questions['proc-q4'] && window.RS.store.state.questions['proc-q4'].correct === 1);
  await page.context().close();
});

test('theme toggle switches to dark mode and is remembered', async () => {
  const page = await openPage({ colorScheme: 'light' });
  await go(page, '#/');
  await page.click('#theme-toggle');
  assert.equal(await page.getAttribute('html', 'data-theme'), 'dark');
  await page.reload();
  await page.waitForSelector('.topic-grid');
  assert.equal(await page.getAttribute('html', 'data-theme'), 'dark');
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  assert.equal(bg, 'rgb(15, 20, 32)');
  await page.context().close();
});

test('layout fits a phone screen and the mobile menu works', async () => {
  const page = await openPage({ viewport: { width: 375, height: 740 }, isMobile: true, hasTouch: true });
  for (const h of ['#/', '#/topic/databases/notes', '#/topic/boolean-logic/tracing', '#/quiz', '#/dashboard', '#/unit/1', '#/unit/1/topic/4', '#/unit/1/topic/3/lesson/1']) {
    await go(page, h);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.ok(overflow <= 0, `${h} scrolls horizontally by ${overflow}px`);
  }
  assert.equal(await page.isVisible('.site-nav'), false);
  await page.click('#nav-toggle');
  assert.equal(await page.isVisible('.site-nav'), true);
  await page.click('.site-nav a[data-nav="about"]');
  await page.waitForSelector('h1:has-text("About this site")');
  assert.equal(await page.isVisible('.site-nav'), false, 'menu closes after navigating');
  await page.context().close();
});

test('course units, topics and lessons link to working resources', async () => {
  const page = await openPage();
  await go(page, '#/');
  assert.equal(await page.locator('.unit-grid .unit-card').count(), 5);
  await page.click('.site-nav a[data-nav="units"]');
  await page.waitForSelector('h1:has-text("Course units")');
  await page.click('.unit-card >> nth=0');
  await page.waitForSelector('.course-header h1');
  assert.equal(await page.locator('.course-row').count(), 17, 'Unit 1 has 17 topics');

  await go(page, '#/unit/1/topic/4');
  assert.equal(await page.locator('a.course-row').count(), 3);
  assert.equal(await page.locator('.course-row.is-planned').count(), 1, 'lesson 4 shows as coming soon');
  await go(page, '#/unit/3/topic/1');
  assert.match(await page.textContent('.empty-state'), /coming soon/);

  // Every lesson page renders, and every resource link on it returns the file.
  const lessons = await page.evaluate(() => window.RS.course.allLessons().map((l) => `#/unit/${l.unit}/topic/${l.topic}/lesson/${l.number}`));
  assert.ok(lessons.length >= 13);
  for (const hash of lessons) {
    await go(page, hash);
    const hrefs = await page.$$eval('.activity-card a[target=_blank], .resource-list a[download]', (as) => as.map((a) => a.href));
    assert.ok(hrefs.length > 0, `${hash} has resources`);
    for (const href of hrefs) {
      const res = await page.request.get(href);
      assert.equal(res.status(), 200, `${hash}: ${href}`);
    }
  }

  // An activity can be shown inside the page.
  await go(page, '#/unit/1/topic/2/lesson/3');
  await page.click('.activity-card button:has-text("Show on this page") >> nth=0');
  const frame = page.frameLocator('.activity-frame iframe').first();
  await frame.locator('body').waitFor();
  assert.ok((await frame.locator('body').textContent()).length > 20);

  // Topic resources and links to revision content.
  await go(page, '#/unit/1/topic/2');
  assert.match(await page.textContent('.resource-list'), /cheat sheet/i);
  await page.click('.revision-links a.chip');
  await page.waitForSelector('.topic-header h1:has-text("Boolean logic")');
  assert.match(await page.textContent('.course-links'), /Unit 1, Topic 2/);

  await go(page, '#/unit/9');
  assert.equal(await page.textContent('#app h1'), 'Page not found');
  assert.deepEqual(page.errors, []);
  await page.context().close();
});

test('the site works when opened directly from disk (file://)', async () => {
  const page = await openPage();
  await page.goto('file://' + path.resolve(__dirname, '..', '..', 'index.html'));
  await page.waitForSelector('.topic-card');
  assert.equal(await page.locator('.topic-grid:not(.unit-grid) .topic-card').count(), 10);
  assert.deepEqual(page.errors, []);
  await page.context().close();
});
