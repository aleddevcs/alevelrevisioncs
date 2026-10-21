/* Unit tests for the quiz engine, storage, progress calculations and search. */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadSite } = require('../helpers/load-site');

const plain = (v) => JSON.parse(JSON.stringify(v)); // copy out of the VM context for deepEqual

test('normaliseAnswer ignores case, spacing, curly quotes, minus signs and a trailing full stop', () => {
  const { RS } = loadSite();
  const n = RS.utils.normaliseAnswer;
  assert.equal(n('  Hello   World. '), 'hello world');
  assert.equal(n('1011 0110', { ignoreSpaces: true }), '10110110');
  assert.equal(n('ABC', { caseSensitive: true }), 'ABC');
  assert.equal(n('−' + '10'), '-10');
  assert.equal(n('it’s'), "it's");
  assert.equal(n(null), '');
});

test('shuffle returns a permutation and does not modify its input', () => {
  const { RS } = loadSite();
  const input = [1, 2, 3, 4, 5, 6, 7, 8];
  const out = RS.utils.shuffle(input, RS.utils.seededRandom(42));
  assert.deepEqual(input, [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.deepEqual([...out].sort((a, b) => a - b), input);
  assert.notDeepEqual(plain(out), input, 'a seeded shuffle of 8 items should change the order');
});

test('markQuestion marks multiple-choice and typed answers', () => {
  const { RS } = loadSite();
  const mcq = { type: 'mcq', options: ['a', 'b', 'c'], answer: 1 };
  assert.equal(RS.quiz.markQuestion(mcq, 1), true);
  assert.equal(RS.quiz.markQuestion(mcq, '1'), true);
  assert.equal(RS.quiz.markQuestion(mcq, 0), false);
  assert.equal(RS.quiz.markQuestion(mcq, null), false, 'unanswered is never correct');

  const input = { type: 'input', accept: ['C8', '0xC8'], ignoreSpaces: true };
  assert.equal(RS.quiz.markQuestion(input, ' c8 '), true);
  assert.equal(RS.quiz.markQuestion(input, '0x C8'), true);
  assert.equal(RS.quiz.markQuestion(input, '200'), false);
  assert.equal(RS.quiz.markQuestion(input, '   '), false, 'blank input is never correct');
});

test('buildPool filters by topic and skill, limits the count and has no duplicates', () => {
  const { RS } = loadSite();
  const all = RS.quiz.buildPool({});
  assert.equal(all.length, RS.content.allQuestions().length);
  assert.equal(new Set(all).size, all.length);

  const proc = RS.quiz.buildPool({ topics: ['u1-t1'] });
  assert.ok(proc.length > 0 && proc.every((id) => RS.content.question(id).topicId === 'u1-t1'));

  const technique = RS.quiz.buildPool({ skill: 'technique' });
  assert.ok(technique.length > 0 && technique.every((id) => RS.content.question(id).skill === 'technique'));

  assert.equal(RS.quiz.buildPool({ count: 5 }).length, 5);
  assert.deepEqual(plain(RS.quiz.buildPool({ topics: ['no-such-topic'] })), []);
});

test('a quiz session scores correct, incorrect, skipped and untouched questions', () => {
  const { RS } = loadSite();
  const ids = RS.quiz.buildPool({ topics: ['u1-t1'], count: 4, rng: RS.utils.seededRandom(1) });
  const session = RS.quiz.createSession(ids, { topics: ['u1-t1'] }, RS.utils.seededRandom(2));
  assert.ok(RS.quiz.isValidSession(session));

  const [a, b, c] = ids.map((id) => RS.content.question(id));
  const right = (q) => (q.type === 'mcq' ? q.answer : q.accept[0]);
  const wrong = (q) => (q.type === 'mcq' ? (q.answer + 1) % q.options.length : 'definitely wrong');

  assert.equal(RS.quiz.answer(session, a.id, right(a)), true);
  assert.equal(RS.quiz.answer(session, b.id, wrong(b)), false);
  RS.quiz.skip(session, c.id);
  // the fourth question is never visited

  const s = RS.quiz.summary(session);
  assert.equal(s.total, 4);
  assert.equal(s.correct, 1);
  assert.equal(s.incorrect, 1);
  assert.equal(s.unanswered, 2);
  assert.equal(s.percent, 25);
  assert.deepEqual(plain(s.wrongIds), [b.id]);
  assert.deepEqual(plain(s.unansweredIds), [c.id, ids[3]]);

  // A skipped question can still be answered later.
  RS.quiz.answer(session, c.id, right(c));
  assert.equal(RS.quiz.summary(session).correct, 2);
});

test('MCQ option order is a permutation of the original options', () => {
  const { RS } = loadSite();
  const ids = RS.quiz.buildPool({});
  const session = RS.quiz.createSession(ids, {});
  for (const id of ids) {
    const q = RS.content.question(id);
    if (q.type !== 'mcq') continue;
    assert.deepEqual(plain([...session.optionOrder[id]].sort()), plain(q.options.map((_, i) => i)));
  }
});

test('isValidSession rejects sessions that refer to removed questions or are malformed', () => {
  const { RS } = loadSite();
  assert.equal(RS.quiz.isValidSession(null), false);
  assert.equal(RS.quiz.isValidSession({ ids: [], current: 0, responses: {} }), false);
  assert.equal(RS.quiz.isValidSession({ ids: ['not-a-question'], current: 0, responses: {} }), false);
  assert.equal(RS.quiz.isValidSession({ ids: ['u1t1-111-q1'], current: 5, responses: {} }), false);
  assert.equal(RS.quiz.isValidSession({ ids: ['u1t1-111-q1'], current: 0, responses: {} }), true);
});

test('storage records progress and survives a reload', () => {
  const site = loadSite();
  const { RS } = site;
  assert.equal(RS.store.persistent, true);
  RS.store.recordQuestion('proc-q1', true);
  RS.store.recordQuestion('proc-q1', false);
  RS.store.setFlashcard('proc-fc-1', 'known');
  RS.store.recordExam('proc-e1', 9, 4); // score is capped at the marks available
  RS.store.recordTrace('proc-t1', 10, 15);
  RS.store.addQuizResult({ topics: ['processor'], total: 10, correct: 7, incorrect: 2, unanswered: 1 });

  const saved = site.context.localStorage.getItem(RS.store.KEY);
  const reloaded = loadSite({ storage: { [RS.store.KEY]: saved } }).RS.store.state;
  assert.deepEqual(plain(reloaded.questions['proc-q1']).attempts, 2);
  assert.equal(reloaded.questions['proc-q1'].correct, 1);
  assert.equal(reloaded.questions['proc-q1'].last, 'incorrect');
  assert.equal(reloaded.flashcards['proc-fc-1'], 'known');
  assert.equal(reloaded.exam['proc-e1'].score, 4);
  assert.equal(reloaded.traces['proc-t1'].correct, 10);
  assert.equal(reloaded.quizHistory.length, 1);
});

test('corrupt or hand-edited storage does not break the site', () => {
  const { RS } = loadSite({ storage: { 'alrcs.progress.v1': '{not json' } });
  assert.deepEqual(plain(RS.store.state.questions), {});

  const bad = JSON.stringify({
    questions: { ok: { attempts: 2, correct: 5, last: 'correct', ts: 1 }, bad: { attempts: 'x' } },
    flashcards: { a: 'known', b: 'maybe' },
    exam: { e: { score: 9, marks: 4 } },
    quizHistory: [{ ts: 1, total: 3, correct: 1, incorrect: 1, unanswered: 1, topics: ['x', 5] }, 'junk']
  });
  const s = loadSite({ storage: { 'alrcs.progress.v1': bad } }).RS.store.state;
  assert.equal(s.questions.ok.correct, 2, 'correct is capped at attempts');
  assert.equal(s.questions.bad, undefined);
  assert.deepEqual(plain(s.flashcards), { a: 'known' });
  assert.deepEqual(plain(s.exam), {}, 'a score above the marks is rejected');
  assert.equal(s.quizHistory.length, 1);
  assert.deepEqual(plain(s.quizHistory[0].topics), ['x']);
});

test('the site still works when localStorage is blocked', () => {
  const { RS } = loadSite({ storage: null });
  assert.equal(RS.store.persistent, false);
  RS.store.recordQuestion('proc-q1', true);
  assert.equal(RS.store.state.questions['proc-q1'].correct, 1);
});

test('export and import round-trip, and invalid imports are rejected', () => {
  const a = loadSite().RS;
  a.store.recordQuestion('dr-q1', true);
  a.store.setFlashcard('dr-fc-1', 'learning');
  const exported = a.store.exportData();

  const b = loadSite().RS;
  assert.equal(b.store.importData('nonsense').ok, false);
  assert.equal(b.store.importData('{"app":"something-else","data":{}}').ok, false);
  const res = b.store.importData(exported);
  assert.equal(res.ok, true);
  assert.equal(b.store.state.questions['dr-q1'].correct, 1);
  assert.equal(b.store.state.flashcards['dr-fc-1'], 'learning');

  b.store.reset();
  assert.deepEqual(plain(b.store.state.questions), {});
});

test('progress statistics and mastery are calculated correctly', () => {
  const { RS } = loadSite();
  const topic = RS.content.topic('u1-t1');
  const empty = RS.progress.topicStats(topic, RS.store.state);
  assert.equal(empty.mastery, 0);
  assert.equal(empty.accuracy, null);
  assert.equal(empty.started, false);

  RS.store.recordQuestion(topic.questions[0].id, true);
  RS.store.recordQuestion(topic.questions[1].id, false);
  RS.store.recordQuestion(topic.questions[1].id, true);
  RS.store.setFlashcard(topic.flashcards[0].id, 'known');
  RS.store.setFlashcard(topic.flashcards[1].id, 'learning');
  RS.store.recordExam(topic.exam[0].id, 0, topic.exam[0].marks); // below half marks
  RS.store.recordTrace(topic.traces[0].id, 9, 9);

  const s = RS.progress.topicStats(topic, RS.store.state);
  assert.equal(s.attempted, 2);
  assert.equal(s.attempts, 3);
  assert.equal(s.accuracy, 67); // 2 correct of 3 attempts
  assert.equal(s.lastCorrect, 2);
  assert.equal(s.known, 1);
  assert.equal(s.examGood, 0);
  assert.equal(s.tracesComplete, 1);
  assert.equal(s.masteredItems, 4);
  assert.equal(s.started, true);

  const skills = RS.progress.skillStats(RS.store.state);
  const totalAttempts = Object.values(skills).reduce((n, k) => n + k.attempts, 0);
  assert.equal(totalAttempts, 3);

  const sugg = RS.progress.suggestions(RS.store.state, 3);
  assert.equal(sugg.length, Math.min(3, RS.content.topics().length));
  assert.ok(sugg.every((x) => RS.content.topic(x.id)));
});

test('search finds topics, notes and questions and requires every word', () => {
  const { RS } = loadSite();
  const results = RS.search.search('von neumann');
  assert.ok(results.length > 0);
  assert.ok(results.some((r) => r.topicId === 'u1-t1'));
  assert.ok(RS.search.search('fragmentation head').some((r) => r.kind === 'Flashcard' || r.kind === 'Notes'));
  assert.deepEqual(plain(RS.search.search('   ')), []);
  assert.deepEqual(plain(RS.search.search('zzzz-not-a-word')), []);
  const topicHit = RS.search.search('Hardware and communication')[0];
  assert.ok(['Topic', 'Course topic'].includes(topicHit.kind), 'topic titles rank first');
});

test('buildPool can limit a quiz to one specification entry', () => {
  const { RS } = loadSite();
  const ids = RS.quiz.buildPool({ topics: ['u1-t1'], spec: '1.2.1' });
  assert.ok(ids.length >= 3);
  assert.ok(ids.every((id) => RS.content.question(id).spec === '1.2.1'));
});

test('select returns items in specification order', () => {
  const { RS } = loadSite();
  const t = RS.content.topic('u1-t1');
  const order = RS.course.topic(1, 1).spec.map((e) => e.code);
  const ranks = RS.content.select(t, 'questions', {}).map((q) => order.indexOf(q.spec));
  assert.deepEqual(plain(ranks), plain([...ranks].sort((a, b) => a - b)));
});

test('buildPool can limit a quiz to one lesson', () => {
  const { RS } = loadSite();
  const ids = RS.quiz.buildPool({ topics: ['u1-t1'], lesson: 3 });
  assert.ok(ids.length >= 6);
  assert.ok(ids.every((id) => RS.content.question(id).lesson === 3));
});
