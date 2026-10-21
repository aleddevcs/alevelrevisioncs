/*
 * Content checks: every topic file must follow the format described in README.md.
 * These catch broken questions (for example an answer index out of range) before
 * students see them.
 */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadSite, ROOT } = require('../helpers/load-site');

const { RS } = loadSite();
const topics = RS.content.topics();
const SKILLS = Object.keys(RS.content.SKILLS);
const COLOURS = ['blue', 'violet', 'teal', 'amber', 'rose', 'green', 'indigo', 'cyan', 'orange', 'slate'];

const nonEmpty = (s) => typeof s === 'string' && s.trim().length > 0;

/** Every string that is inserted into the page as HTML, with a label for error messages. */
function htmlFields() {
  const out = [];
  const add = (where, value) => { if (typeof value === 'string') out.push([where, value]); };
  for (const t of topics) {
    add(`${t.id}.summary`, t.summary);
    t.notes.forEach((n, i) => { (n.points || []).forEach((p, j) => add(`${t.id}.notes[${i}].points[${j}]`, p)); add(`${t.id}.notes[${i}].html`, n.html); });
    (t.misconceptions || []).forEach((m, i) => { add(`${t.id}.misconceptions[${i}]`, m.wrong); add(`${t.id}.misconceptions[${i}]`, m.right); });
    (t.examTips || []).forEach((x, i) => add(`${t.id}.examTips[${i}]`, x));
    t.flashcards.forEach((f) => { add(f.id, f.front); add(f.id, f.back); });
    t.questions.forEach((q) => {
      add(q.id, q.question); add(q.id, q.explanation);
      (q.options || []).forEach((o) => add(q.id, o));
      (q.feedback || []).forEach((o) => add(q.id, o));
    });
    t.exam.forEach((e) => { add(e.id, e.question); add(e.id, e.context); add(e.id, e.technique); e.markPoints.forEach((p) => add(e.id, p)); });
    t.traces.forEach((tr) => { add(tr.id, tr.intro); add(tr.id, tr.explanation); });
  }
  return out;
}

/** Every string a student reads, including code (used for spelling checks). */
function allText() {
  const fields = htmlFields();
  for (const t of topics) {
    t.notes.forEach((n, i) => { if (n.code) fields.push([`${t.id}.notes[${i}].code`, n.code]); });
    t.specRefs.forEach((r, i) => fields.push([`${t.id}.specRefs[${i}]`, r]));
  }
  return fields;
}

test('there are ten topics with unique ids and the required fields', () => {
  assert.equal(topics.length, 10);
  const ids = new Set();
  for (const t of topics) {
    assert.ok(nonEmpty(t.id) && !ids.has(t.id), `duplicate or missing topic id ${t.id}`);
    ids.add(t.id);
    assert.ok(nonEmpty(t.title), `${t.id}: title`);
    assert.ok(nonEmpty(t.summary), `${t.id}: summary`);
    assert.ok(RS.icons.names.includes(t.icon), `${t.id}: unknown icon ${t.icon}`);
    assert.ok(COLOURS.includes(t.colour), `${t.id}: unknown colour ${t.colour}`);
    assert.ok(t.notes.length >= 5, `${t.id}: needs at least 5 note sections`);
    assert.ok(t.flashcards.length >= 10, `${t.id}: needs at least 10 flashcards`);
    assert.ok(t.questions.length >= 12, `${t.id}: needs at least 12 questions`);
    assert.ok(t.exam.length >= 2, `${t.id}: needs at least 2 exam-style questions`);
    assert.ok(t.specRefs.length >= 1, `${t.id}: needs specification references`);
  }
});

test('every item id is unique across the whole site', () => {
  const seen = new Map();
  for (const t of topics) {
    for (const kind of ['flashcards', 'questions', 'exam', 'traces']) {
      for (const item of t[kind]) {
        assert.ok(nonEmpty(item.id), `${t.id}.${kind}: item without id`);
        assert.ok(!seen.has(item.id), `duplicate id ${item.id} (also in ${seen.get(item.id)})`);
        seen.set(item.id, `${t.id}.${kind}`);
      }
    }
  }
});

test('notes have a heading and some content', () => {
  for (const t of topics) {
    t.notes.forEach((n, i) => {
      assert.ok(nonEmpty(n.heading), `${t.id}.notes[${i}] heading`);
      assert.ok((n.points && n.points.length) || nonEmpty(n.html), `${t.id}.notes[${i}] has no content`);
    });
  }
});

test('flashcards have a front and back', () => {
  for (const t of topics) for (const f of t.flashcards) {
    assert.ok(nonEmpty(f.front) && nonEmpty(f.back), `${f.id}: empty side`);
  }
});

test('multiple-choice questions are well formed and unambiguous', () => {
  for (const q of RS.content.allQuestions().filter((x) => x.type === 'mcq')) {
    assert.ok(SKILLS.includes(q.skill), `${q.id}: skill`);
    assert.ok(nonEmpty(q.question), `${q.id}: question`);
    assert.ok(Array.isArray(q.options) && q.options.length >= 3 && q.options.length <= 5, `${q.id}: needs 3–5 options`);
    q.options.forEach((o, i) => assert.ok(nonEmpty(o), `${q.id}: option ${i} empty`));
    const normalised = q.options.map((o) => RS.utils.stripTags(o).toLowerCase());
    assert.equal(new Set(normalised).size, q.options.length, `${q.id}: duplicate options`);
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length, `${q.id}: answer index out of range`);
    assert.ok(Array.isArray(q.feedback) && q.feedback.length === q.options.length, `${q.id}: feedback must match options`);
    q.feedback.forEach((f, i) => {
      if (i !== q.answer) assert.ok(nonEmpty(f), `${q.id}: missing explanation of why option ${i} is wrong`);
    });
    assert.ok(nonEmpty(q.explanation), `${q.id}: explanation`);
    for (const o of normalised) {
      assert.ok(!/\b(all|none) of the above\b/.test(o), `${q.id}: avoid “all/none of the above” because options are shuffled`);
    }
  }
});

test('typed-answer questions accept their own model answers', () => {
  for (const q of RS.content.allQuestions().filter((x) => x.type === 'input')) {
    assert.ok(SKILLS.includes(q.skill), `${q.id}: skill`);
    assert.ok(Array.isArray(q.accept) && q.accept.length > 0, `${q.id}: accept list`);
    for (const a of q.accept) assert.ok(RS.quiz.markQuestion(q, a), `${q.id}: "${a}" is not accepted`);
    assert.ok(!RS.quiz.markQuestion(q, ''), `${q.id}: empty answer must be wrong`);
    assert.ok(nonEmpty(q.explanation), `${q.id}: explanation`);
  }
});

test('every question has a known type', () => {
  for (const q of RS.content.allQuestions()) assert.ok(['mcq', 'input'].includes(q.type), `${q.id}: type ${q.type}`);
});

test('each topic has recall, application and exam-technique questions', () => {
  for (const t of topics) {
    for (const s of SKILLS) assert.ok(t.questions.some((q) => q.skill === s), `${t.id}: no ${s} question`);
  }
});

test('exam-style questions have enough indicative points for their marks', () => {
  for (const t of topics) for (const e of t.exam) {
    assert.ok(Number.isInteger(e.marks) && e.marks > 0, `${e.id}: marks`);
    assert.ok(nonEmpty(e.question), `${e.id}: question`);
    assert.ok(e.markPoints.length >= e.marks, `${e.id}: fewer indicative points (${e.markPoints.length}) than marks (${e.marks})`);
  }
});

test('trace tables are rectangular and their given cells exist', () => {
  for (const t of topics) for (const tr of t.traces) {
    assert.ok(nonEmpty(tr.title) && nonEmpty(tr.intro) && nonEmpty(tr.code) && nonEmpty(tr.explanation), `${tr.id}: missing text`);
    assert.ok(tr.columns.length > 0 && tr.rows.length > 0, `${tr.id}: empty table`);
    tr.rows.forEach((row, r) => assert.equal(row.length, tr.columns.length, `${tr.id}: row ${r} has the wrong number of cells`));
    (tr.given || []).forEach(([r, c]) => assert.ok(r < tr.rows.length && c < tr.columns.length, `${tr.id}: given cell [${r},${c}] out of range`));
    const toFill = tr.rows.length * tr.columns.length - (tr.given || []).length;
    assert.ok(toFill > 0, `${tr.id}: nothing for the student to fill in`);
  }
});

test('HTML in content is well formed', () => {
  const VOID = new Set(['br', 'hr', 'img', 'wbr']);
  for (const [where, html] of htmlFields()) {
    assert.ok(!/<(?![a-zA-Z/!])/.test(html), `${where}: raw “<” – write &lt; instead`);
    assert.ok(!/&(?![a-zA-Z]+;|#\d+;)/.test(html), `${where}: raw “&” – write &amp; instead`);
    const stack = [];
    for (const m of html.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g)) {
      const [, closing, name] = m;
      const tag = name.toLowerCase();
      if (VOID.has(tag)) continue;
      if (!closing) stack.push(tag);
      else assert.equal(stack.pop(), tag, `${where}: mismatched </${tag}>`);
    }
    assert.deepEqual(stack, [], `${where}: unclosed tag(s) ${stack.join(', ')}`);
  }
});

test('content uses British English spellings', () => {
  const AMERICAN = /\b(color|colors|behavior|behaviors|favorite|center|centers|centered|organize|organized|organizing|organization|organizations|analyze|analyzed|analyzing|optimize|optimized|optimization|recognize|recognized|minimize|maximize|prioritize|summarize|normalize|normalized|normalization|catalog|labeled|labeling|modeling|traveled|defense|offense|gray|meter|meters|math|license plate|artifact|fulfill|enrollment|program's|programmed solution)\b/i;
  const ALLOWED_IN_CODE = /color/; // CSS-like identifiers are not used in content, but keep the door open
  for (const [where, text] of allText()) {
    const m = text.match(AMERICAN);
    if (m && !(where.endsWith('.code') && ALLOWED_IN_CODE.test(m[0]))) {
      assert.fail(`${where}: American spelling “${m[0]}”`);
    }
  }
});

test('the site never claims content is official or verified', () => {
  const RISKY = /\b(past[- ]paper question|official mark scheme|verified by (wjec|the exam board)|endorsed by)\b/i;
  for (const [where, text] of allText()) {
    const m = text.match(RISKY);
    if (m) assert.fail(`${where}: wording “${m[0]}” could suggest official status`);
  }
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  assert.match(html, /practice questions/i, 'footer must label questions as practice questions');
  assert.match(html, /not\s+official\s+past-paper\s+questions/i);
});
