/*
 * Course catalogue checks: every resource listed in data/course/ exists on disk,
 * and every file in resources/ is listed (so nothing uploaded is forgotten).
 */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadSite, ROOT } = require('../helpers/load-site');

const { RS } = loadSite();
const units = RS.course.units();

function filesUnder(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? filesUnder(p) : [p];
  });
}

function allResources() {
  const out = [];
  for (const u of units) for (const t of u.topics) {
    t.resources.forEach((r) => out.push([`Unit ${u.number} Topic ${t.number}`, r]));
    for (const l of t.lessons) l.resources.forEach((r) => out.push([`Unit ${u.number} Topic ${t.number} Lesson ${l.number}`, r]));
  }
  return out;
}

test('units 1 to 5 are registered with sequentially numbered topics and lessons', () => {
  assert.deepEqual([...units.map((u) => u.number)], [1, 2, 3, 4, 5]);
  for (const u of units) {
    assert.ok(u.title && u.summary && u.assessment && u.level, `Unit ${u.number}: missing details`);
    u.topics.forEach((t, i) => {
      assert.equal(t.number, i + 1, `Unit ${u.number}: topics must be numbered 1, 2, 3…`);
      assert.ok(t.title && t.summary, `Unit ${u.number} Topic ${t.number}: title and summary`);
      t.lessons.forEach((l, j) => {
        assert.equal(l.number, j + 1, `Unit ${u.number} Topic ${t.number}: lessons must be numbered 1, 2, 3…`);
        assert.ok(l.title, `Unit ${u.number} Topic ${t.number} Lesson ${l.number}: title`);
      });
      if (t.plannedLessons) assert.ok(t.plannedLessons >= t.lessons.length, `Unit ${u.number} Topic ${t.number}: plannedLessons is less than the lessons added`);
    });
  }
});

test('every listed resource exists and has a known type', () => {
  for (const [where, r] of allResources()) {
    assert.ok(RS.course.TYPES[r.type], `${where}: unknown type "${r.type}" for ${r.file}`);
    assert.ok(r.title, `${where}: ${r.file} needs a title`);
    assert.ok(fs.existsSync(path.join(ROOT, r.path)), `${where}: file not found: ${r.path}`);
    if (['starter', 'interactive'].includes(r.type)) {
      assert.equal(RS.course.extension(r.file), 'html', `${where}: ${r.file} is an activity, so it must be an .html file`);
    }
  }
});

test('every file in resources/ is listed in the course catalogue', () => {
  const listed = new Set(allResources().map(([, r]) => path.normalize(r.path)));
  const missing = filesUnder(path.join(ROOT, 'resources'))
    .map((f) => path.relative(ROOT, f))
    .filter((f) => !listed.has(path.normalize(f)));
  assert.deepEqual(missing, [], 'add these files to data/course/unitN.js');
});

test('a file is listed only once', () => {
  const seen = new Set();
  for (const [where, r] of allResources()) {
    assert.ok(!seen.has(r.path), `${where}: ${r.path} is listed twice`);
    seen.add(r.path);
  }
});

test('revision links point to existing revision topics', () => {
  for (const u of units) for (const t of u.topics) for (const id of t.revision) {
    assert.ok(RS.content.topic(id), `Unit ${u.number} Topic ${t.number}: unknown revision topic "${id}"`);
  }
});

test('resource URLs encode spaces in file names', () => {
  assert.equal(RS.course.url('resources/unit1/topic2/lesson3/Topic2_Lesson3_Practice_Unit 1.html'),
    'resources/unit1/topic2/lesson3/Topic2_Lesson3_Practice_Unit%201.html');
});

test('lessons are included in search', () => {
  const hits = RS.search.search('floating point');
  assert.ok(hits.some((d) => d.kind === 'Lesson' && d.href === '#/unit/1/topic/4/lesson/3'));
});
