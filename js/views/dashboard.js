/* Revision dashboard: performance by topic and skill, history, and progress export/import. */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});
  var h = RS.utils.h;
  var ui = RS.ui;

  function stat(label, value, detail) {
    return h('div', { class: 'card stat' }, h('p', { class: 'stat-value' }, value), h('p', { class: 'stat-label' }, label), detail ? h('p', { class: 'stat-detail' }, detail) : null);
  }

  function render(app) {
    var state = RS.store.state;
    var o = RS.progress.overall(state);

    app.appendChild(h('h1', null, 'Revision dashboard'));
    app.appendChild(h('p', { class: 'lead' }, 'Your performance on this device. Use it to decide what to revise next.'));

    app.appendChild(h('div', { class: 'stat-grid' },
      stat('Overall mastery', o.mastery + '%', o.masteredItems + ' of ' + o.totalItems + ' items'),
      stat('Question accuracy', o.accuracy === null ? '—' : o.accuracy + '%', o.correct + ' correct from ' + RS.utils.plural(o.attempts, 'attempt')),
      stat('Flashcards known', o.known + ' / ' + o.flashcards),
      stat('Exam-style marks', o.examMarks ? o.examScore + ' / ' + o.examMarks : '—', 'self-assessed'),
      stat('Quizzes completed', String(o.quizzes))));

    // Focus suggestions
    var sugg = RS.progress.suggestions(state, 3);
    if (sugg.length) {
      app.appendChild(h('section', { class: 'card' },
        h('h2', null, 'Suggested next steps'),
        h('ul', { class: 'suggestions' }, sugg.map(function (s) {
          var t = RS.content.topic(s.id);
          return h('li', null, ui.topicIcon(t), h('div', null, h('a', { href: '#/topic/' + t.id }, t.title), h('p', { class: 'muted small' }, s.reason)));
        }))));
    }

    // Per-topic table
    var table = h('table', { class: 'data-table dash-table' },
      h('caption', null, 'Performance by topic'),
      h('thead', null, h('tr', null,
        h('th', { scope: 'col' }, 'Topic'), h('th', { scope: 'col' }, 'Mastery'), h('th', { scope: 'col' }, 'Question accuracy'),
        h('th', { scope: 'col' }, 'Questions tried'), h('th', { scope: 'col' }, 'Flashcards known'), h('th', { scope: 'col' }, 'Exam-style marks'),
        h('th', { scope: 'col' }, 'Traces complete'), h('th', { scope: 'col' }, 'Last activity'))));
    var tb = h('tbody');
    RS.progress.allTopicStats(state).forEach(function (s) {
      var t = RS.content.topic(s.id);
      var acc = s.accuracy === null ? h('span', { class: 'muted' }, '—') :
        h('span', { class: 'acc acc-' + (s.accuracy >= 70 ? 'good' : s.accuracy >= 40 ? 'mid' : 'low') }, s.accuracy + '%');
      tb.appendChild(h('tr', null,
        h('th', { scope: 'row' }, h('a', { href: '#/topic/' + t.id }, t.title)),
        h('td', { 'data-label': 'Mastery' }, h('div', { class: 'cell-bar' }, ui.progressBar(s.mastery, t.title + ' mastery'), h('span', null, s.mastery + '%'))),
        h('td', { 'data-label': 'Question accuracy' }, acc),
        h('td', { 'data-label': 'Questions tried' }, s.attempted + ' / ' + s.questions),
        h('td', { 'data-label': 'Flashcards known' }, s.known + ' / ' + s.flashcards),
        h('td', { 'data-label': 'Exam-style marks' }, s.examMarks ? s.examScore + ' / ' + s.examMarks : '—'),
        h('td', { 'data-label': 'Traces complete' }, s.traces ? s.tracesComplete + ' / ' + s.traces : 'n/a'),
        h('td', { 'data-label': 'Last activity' }, s.lastActivity ? RS.utils.formatDate(s.lastActivity) : '—')));
    });
    table.appendChild(tb);
    app.appendChild(h('div', { class: 'card table-scroll' }, table));

    // Skill-type breakdown
    var sk = RS.progress.skillStats(state);
    app.appendChild(h('section', { class: 'card' },
      h('h2', null, 'Accuracy by skill'),
      h('p', { class: 'muted small' }, 'Recall questions test what you know; application questions ask you to use it in a new situation; exam-technique questions focus on how to answer well.'),
      h('div', { class: 'skill-bars' }, Object.keys(sk).map(function (k) {
        var v = sk[k];
        return h('div', { class: 'skill-row' },
          h('span', { class: 'skill-name' }, RS.content.SKILLS[k].label),
          ui.progressBar(v.accuracy || 0, RS.content.SKILLS[k].label + ' accuracy'),
          h('span', { class: 'skill-value' }, v.accuracy === null ? 'not tried' : v.accuracy + '% (' + v.attempts + ')'));
      }))));

    // Quiz history
    var hist = state.quizHistory.slice(0, 10);
    var histSec = h('section', { class: 'card' }, h('h2', null, 'Recent quizzes'));
    if (!hist.length) histSec.appendChild(h('p', { class: 'muted' }, 'No quizzes completed yet. ', h('a', { href: '#/quiz' }, 'Start one now'), '.'));
    else {
      histSec.appendChild(h('ul', { class: 'history' }, hist.map(function (r) {
        var names = r.topics.length === RS.content.topics().length ? 'All topics' :
          r.topics.map(function (id) { var t = RS.content.topic(id); return t ? t.title : id; }).join(', ');
        return h('li', null,
          h('span', { class: 'history-score' }, r.correct + '/' + r.total),
          h('span', null, names || 'Selected questions'),
          h('span', { class: 'muted small' }, RS.utils.formatDate(r.ts) + (r.unanswered ? ' · ' + r.unanswered + ' unanswered' : '')));
      })));
    }
    app.appendChild(histSec);

    app.appendChild(h('p', { class: 'muted small' }, 'How mastery is calculated: an item counts as mastered when your latest answer to a question was correct, you marked a flashcard as known, you self-assessed an exam-style answer at half marks or more, or you completed a trace table with every cell correct.'));

    // Data management
    var msg = h('p', { class: 'mark-result', role: 'status' });
    var fileInput = h('input', { type: 'file', accept: 'application/json,.json', id: 'import-file', class: 'visually-hidden', tabindex: '-1', 'aria-hidden': 'true' });
    fileInput.addEventListener('change', function () {
      var f = fileInput.files && fileInput.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        var res = RS.store.importData(String(reader.result));
        if (res.ok) RS.app.refresh(); else msg.textContent = res.message;
      };
      reader.readAsText(f);
    });
    var confirmReset = h('div', { class: 'confirm', hidden: true },
      h('p', null, 'This permanently deletes all progress saved on this device. Export a copy first if you might want it back.'),
      h('div', { class: 'question-actions' },
        h('button', { type: 'button', class: 'btn btn-danger', onclick: function () { RS.store.reset(); RS.app.refresh(); } }, 'Yes, delete my progress'),
        h('button', { type: 'button', class: 'btn', onclick: function () { confirmReset.hidden = true; } }, 'Cancel')));

    app.appendChild(h('section', { class: 'card' },
      h('h2', null, 'Your data'),
      h('p', null, RS.store.persistent ?
        'Progress is stored in this browser on this device only. It does not sync between devices or browsers, and clearing your browsing data will remove it. To move progress to another device, export it here and import the file there.' :
        'Your browser is blocking local storage, so progress will be lost when you close this page.'),
      h('div', { class: 'question-actions' },
        h('button', { type: 'button', class: 'btn', onclick: exportProgress }, 'Export progress'),
        h('button', { type: 'button', class: 'btn', onclick: function () { fileInput.click(); } }, 'Import progress'),
        fileInput,
        h('button', { type: 'button', class: 'btn btn-danger', onclick: function () { confirmReset.hidden = false; } }, 'Reset progress')),
      confirmReset,
      msg));

    function exportProgress() {
      var blob = new Blob([RS.store.exportData()], { type: 'application/json' });
      var a = h('a', { href: URL.createObjectURL(blob), download: 'cs-revision-progress-' + new Date().toISOString().slice(0, 10) + '.json' });
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
      msg.textContent = 'Progress exported.';
    }
  }

  RS.views = RS.views || {};
  RS.views.dashboard = { render: render };
})(typeof window !== 'undefined' ? window : globalThis);
