/*
 * Client-side search across topics, notes, flashcards and questions (no DOM code).
 * Every word in the query must appear somewhere in an item for it to match.
 */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});
  var strip = RS.utils.stripTags;

  var docs = null;

  function build() {
    docs = [];
    RS.content.topics().forEach(function (t) {
      var base = '#/topic/' + t.id;
      docs.push({ kind: 'Topic', topicId: t.id, title: t.title, text: strip(t.summary + ' ' + (t.keywords || []).join(' ')), href: base });
      t.notes.forEach(function (n, i) {
        docs.push({ kind: 'Notes', topicId: t.id, title: n.heading, text: strip((n.points || []).join(' ') + ' ' + (n.html || '')), href: base + '/notes#note-' + i });
      });
      t.flashcards.forEach(function (f) {
        docs.push({ kind: 'Flashcard', topicId: t.id, title: strip(f.front), text: strip(f.back), href: base + '/flashcards' });
      });
      t.questions.forEach(function (q) {
        docs.push({ kind: 'Practice question', topicId: t.id, title: strip(q.question), text: strip((q.code || '') + ' ' + q.explanation + ' ' + (q.options || []).join(' ')), href: '#/question/' + q.id });
      });
      t.exam.forEach(function (e) {
        docs.push({ kind: 'Exam-style question', topicId: t.id, title: strip(e.question), text: strip((e.context || '') + ' ' + e.markPoints.join(' ')), href: base + '/exam#' + e.id });
      });
      t.traces.forEach(function (tr) {
        docs.push({ kind: 'Tracing exercise', topicId: t.id, title: tr.title, text: strip(tr.intro + ' ' + tr.code), href: base + '/tracing#' + tr.id });
      });
    });
    if (RS.course) {
      RS.course.units().forEach(function (u) {
        u.topics.forEach(function (t) {
          var tHref = '#/unit/' + u.number + '/topic/' + t.number;
          docs.push({ kind: 'Course topic', unitLabel: 'Unit ' + u.number, title: t.title, text: t.summary, href: tHref });
          t.lessons.forEach(function (l) {
            var res = l.resources.map(function (r) { return r.title + ' ' + r.file; }).join(' ');
            docs.push({ kind: 'Lesson', unitLabel: 'Unit ' + u.number + ', Topic ' + t.number, title: l.title, text: (l.subtitle || '') + ' ' + (l.spec || '') + ' ' + res, href: tHref + '/lesson/' + l.number });
          });
        });
      });
    }
    docs.forEach(function (d) {
      d.titleLower = d.title.toLowerCase();
      d.all = (d.title + ' ' + d.text).toLowerCase();
    });
    return docs;
  }

  function terms(query) {
    return String(query || '').toLowerCase().split(/\s+/).map(function (w) {
      return w.replace(/^[^\w']+|[^\w']+$/g, '');
    }).filter(function (w) { return w.length > 0; });
  }

  function search(query, limit) {
    var words = terms(query);
    if (!words.length) return [];
    var list = docs || build();
    var results = [];
    list.forEach(function (d) {
      if (!words.every(function (w) { return d.all.indexOf(w) !== -1; })) return;
      var score = 0;
      words.forEach(function (w) { if (d.titleLower.indexOf(w) !== -1) score += 3; });
      if (d.kind === 'Topic' || d.kind === 'Course topic') score += 5;
      if (d.kind === 'Lesson') score += 4;
      if (d.kind === 'Notes') score += 1;
      results.push({ doc: d, score: score });
    });
    results.sort(function (a, b) { return b.score - a.score; });
    return results.slice(0, limit || 60).map(function (r) { return r.doc; });
  }

  RS.search = { search: search, terms: terms, rebuild: build };
})(typeof window !== 'undefined' ? window : globalThis);
