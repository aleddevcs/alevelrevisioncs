/* Topic page with tabs: notes, flashcards, question bank, exam-style questions and tracing. */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});
  var h = RS.utils.h;
  var ui = RS.ui;

  var DRAFT_KEY = 'alrcs.drafts.v1';

  var TABS = [
    { id: 'notes', label: 'Notes' },
    { id: 'flashcards', label: 'Flashcards', count: 'flashcards' },
    { id: 'questions', label: 'Question bank', count: 'questions' },
    { id: 'exam', label: 'Exam-style', count: 'exam' },
    { id: 'tracing', label: 'Tracing', count: 'traces' }
  ];

  function render(app, params) {
    var topic = RS.content.topic(params.id);
    if (!topic) { RS.views.notFound.render(app); return; }
    var tab = TABS.some(function (t) { return t.id === params.tab; }) ? params.tab : 'notes';
    if (tab === 'tracing' && !topic.traces.length) tab = 'notes';
    RS.store.touchTopic(topic.id);
    RS.app.setTitle(topic.title);

    var stats = RS.progress.topicStats(topic, RS.store.state);
    app.appendChild(h('nav', { class: 'breadcrumbs', 'aria-label': 'Breadcrumb' },
      h('a', { href: '#/' }, 'Topics'), h('span', { 'aria-hidden': 'true' }, ' / '), h('span', { 'aria-current': 'page' }, topic.title)));

    app.appendChild(h('header', { class: 'topic-header' },
      ui.topicIcon(topic),
      h('div', { class: 'topic-header-text' },
        h('h1', null, topic.title),
        h('p', { class: 'lead' }, topic.summary)),
      h('div', { class: 'topic-header-progress' },
        ui.progressRing(stats.mastery, topic.title + ' mastery'),
        h('a', { class: 'btn btn-primary', href: '#/quiz?topic=' + topic.id }, 'Quiz this topic'))));

    if (topic.specRefs.length) {
      app.appendChild(h('details', { class: 'spec-refs' },
        h('summary', null, 'Specification links (WJEC GCE Computer Science, Wales)'),
        h('ul', null, topic.specRefs.map(function (r) { return h('li', null, r); })),
        h('p', { class: 'muted small' }, 'This mapping was made by reading the WJEC specification (version 2, March 2019). It has not been verified by WJEC. Always check the current specification for your course.')));
    }

    var inCourse = RS.course.topicsUsingRevision(topic.id);
    if (inCourse.length) {
      app.appendChild(h('p', { class: 'muted small course-links' }, 'Lessons for this topic: ',
        inCourse.map(function (t, i) {
          return [i ? ' · ' : '', h('a', { href: '#/unit/' + t.unit + '/topic/' + t.number }, 'Unit ' + t.unit + ', Topic ' + t.number + ' (' + t.title + ')')];
        })));
    }

    var tablist = h('nav', { class: 'tabs', 'aria-label': topic.title + ' sections' });
    TABS.forEach(function (t) {
      if (t.id === 'tracing' && !topic.traces.length) return;
      var label = t.label + (t.count ? ' (' + topic[t.count].length + ')' : '');
      tablist.appendChild(h('a', { href: '#/topic/' + topic.id + '/' + t.id, class: 'tab' + (t.id === tab ? ' is-active' : ''), 'aria-current': t.id === tab ? 'page' : null }, label));
    });
    app.appendChild(tablist);

    var panel = h('section', { class: 'tab-panel', 'aria-label': tab });
    app.appendChild(panel);
    ({ notes: renderNotes, flashcards: renderFlashcards, questions: renderQuestions, exam: renderExam, tracing: renderTracing })[tab](panel, topic);
  }

  /* ---------- Notes ---------- */
  function renderNotes(panel, topic) {
    topic.notes.forEach(function (n, i) {
      var sec = h('section', { class: 'card note', id: 'note-' + i }, h('h2', null, n.heading));
      if (n.points) sec.appendChild(h('ul', null, n.points.map(function (p) { return h('li', { html: p }); })));
      if (n.html) sec.appendChild(h('div', { class: 'note-html', html: n.html }));
      if (n.code) sec.appendChild(ui.codeBlock(n.code, n.heading + ' example'));
      panel.appendChild(sec);
    });
    if (topic.misconceptions && topic.misconceptions.length) {
      panel.appendChild(h('section', { class: 'card note note-misconceptions' },
        h('h2', null, 'Common misconceptions'),
        h('ul', null, topic.misconceptions.map(function (m) {
          return h('li', null, h('p', { class: 'wrong', html: '<strong>Misconception:</strong> ' + m.wrong }), h('p', { class: 'right', html: '<strong>In fact:</strong> ' + m.right }));
        }))));
    }
    if (topic.examTips && topic.examTips.length) {
      panel.appendChild(h('section', { class: 'card note note-tips' },
        h('h2', null, 'Exam technique'),
        h('ul', null, topic.examTips.map(function (t) { return h('li', { html: t }); }))));
    }
    panel.appendChild(h('div', { class: 'next-steps' },
      h('a', { class: 'btn', href: '#/topic/' + topic.id + '/flashcards' }, 'Next: flashcards →')));
  }

  /* ---------- Flashcards ---------- */
  function renderFlashcards(panel, topic) {
    var store = RS.store;
    var filter = 'all';
    var deck = [];
    var pos = 0;
    var revealed = false;

    var filterSel = h('select', { id: 'fc-filter' },
      h('option', { value: 'all' }, 'All cards'),
      h('option', { value: 'learning' }, 'Still learning'),
      h('option', { value: 'unmarked' }, 'Not yet marked'));
    var counter = h('p', { class: 'fc-counter', 'aria-live': 'polite' });
    var stage = h('div', { class: 'fc-stage' });
    var summary = h('p', { class: 'muted' });

    panel.appendChild(h('div', { class: 'toolbar' },
      h('label', { for: 'fc-filter' }, 'Show '), filterSel,
      h('button', { class: 'btn', type: 'button', onclick: function () { buildDeck(true); } }, 'Shuffle'),
      counter));
    panel.appendChild(stage);
    panel.appendChild(summary);

    filterSel.addEventListener('change', function () { filter = filterSel.value; buildDeck(false); });

    function buildDeck(shuffle) {
      deck = topic.flashcards.filter(function (f) {
        var s = store.state.flashcards[f.id];
        if (filter === 'learning') return s === 'learning';
        if (filter === 'unmarked') return !s;
        return true;
      });
      if (shuffle) deck = RS.utils.shuffle(deck);
      pos = 0; revealed = false;
      draw();
    }

    function updateSummary() {
      var known = topic.flashcards.filter(function (f) { return store.state.flashcards[f.id] === 'known'; }).length;
      var learning = topic.flashcards.filter(function (f) { return store.state.flashcards[f.id] === 'learning'; }).length;
      summary.textContent = known + ' known · ' + learning + ' still learning · ' + (topic.flashcards.length - known - learning) + ' not yet marked';
    }

    function draw() {
      stage.innerHTML = '';
      updateSummary();
      if (!deck.length) {
        counter.textContent = '';
        stage.appendChild(ui.emptyState(filter === 'all' ? 'No flashcards for this topic yet.' : 'No cards match this filter. Well done!'));
        return;
      }
      if (pos >= deck.length) pos = deck.length - 1;
      var card = deck[pos];
      var status = store.state.flashcards[card.id];
      counter.textContent = 'Card ' + (pos + 1) + ' of ' + deck.length;

      var flip = h('button', { type: 'button', class: 'flashcard' + (revealed ? ' is-revealed' : ''), 'aria-expanded': revealed ? 'true' : 'false' },
        h('span', { class: 'fc-side-label' }, revealed ? 'Answer' : 'Prompt'),
        h('span', { class: 'fc-front', html: card.front }),
        revealed ? h('span', { class: 'fc-back', html: card.back }) : h('span', { class: 'fc-hint' }, 'Select to reveal the answer'),
        status ? h('span', { class: 'fc-status fc-status-' + status }, status === 'known' ? 'Marked as known' : 'Still learning') : null);
      flip.addEventListener('click', function () { revealed = !revealed; draw(); stage.querySelector('.flashcard').focus(); });
      stage.appendChild(flip);

      var rate = h('div', { class: 'fc-actions' },
        h('button', { type: 'button', class: 'btn', onclick: function () { move(-1); }, disabled: pos === 0 }, '← Previous'),
        revealed ? h('button', { type: 'button', class: 'btn btn-warn', onclick: function () { mark('learning'); } }, 'Still learning') : null,
        revealed ? h('button', { type: 'button', class: 'btn btn-success', onclick: function () { mark('known'); } }, 'I know this') : null,
        h('button', { type: 'button', class: 'btn', onclick: function () { move(1); }, disabled: pos >= deck.length - 1 }, 'Next →'));
      stage.appendChild(rate);
    }

    function move(d) { pos = Math.max(0, Math.min(deck.length - 1, pos + d)); revealed = false; draw(); }

    function mark(status) {
      var card = deck[pos];
      store.setFlashcard(card.id, status);
      // Under a filter, a re-marked card may no longer belong in the deck.
      var stillMatches = filter === 'all' || (filter === 'learning' && status === 'learning');
      if (!stillMatches) { deck.splice(pos, 1); revealed = false; draw(); return; }
      if (pos < deck.length - 1) move(1); else draw();
    }

    buildDeck(false);
  }

  /* ---------- Question bank ---------- */
  function renderQuestions(panel, topic) {
    var skill = 'all';
    var sel = h('select', { id: 'qb-skill' }, h('option', { value: 'all' }, 'All skills'),
      Object.keys(RS.content.SKILLS).map(function (k) { return h('option', { value: k }, RS.content.SKILLS[k].label); }));
    var list = h('div', { class: 'question-list' });
    panel.appendChild(h('p', { class: 'muted' }, 'All questions for this topic, shuffled. Every answer you check is saved to your progress.'));
    panel.appendChild(h('div', { class: 'toolbar' },
      h('label', { for: 'qb-skill' }, 'Skill '), sel,
      h('button', { type: 'button', class: 'btn', onclick: draw }, 'Reshuffle'),
      h('a', { class: 'btn btn-primary', href: '#/quiz?topic=' + topic.id }, 'Quiz this topic')));
    panel.appendChild(list);
    sel.addEventListener('change', function () { skill = sel.value; draw(); });

    function draw() {
      list.innerHTML = '';
      var qs = RS.utils.shuffle(topic.questions.filter(function (q) { return skill === 'all' || q.skill === skill; }));
      if (!qs.length) { list.appendChild(ui.emptyState('No questions match this filter.')); return; }
      qs.forEach(function (q, i) { list.appendChild(bankCard(q, i + 1, qs.length)); });
    }

    function bankCard(q, n, total) {
      var holder = h('div', { class: 'bank-item' });
      function mount() {
        holder.innerHTML = '';
        var retry = h('button', { type: 'button', class: 'btn' }, 'Try again');
        var card = ui.questionCard(q, {
          heading: 'Question ' + n + ' of ' + total,
          optionOrder: q.type === 'mcq' ? RS.utils.shuffle(q.options.map(function (_, i) { return i; })) : null,
          onAnswer: function (response, correct) { RS.store.recordQuestion(q.id, correct); },
          after: retry
        });
        retry.addEventListener('click', function () { mount(); holder.querySelector('.question-card').focusFirst(); });
        holder.appendChild(card);
      }
      mount();
      return holder;
    }

    draw();
  }

  /* ---------- Exam-style questions ---------- */
  function loadDrafts() {
    try { return JSON.parse(localStorage.getItem(DRAFT_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveDraft(id, text) {
    try {
      var d = loadDrafts();
      if (text) d[id] = text; else delete d[id];
      localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    } catch (e) { /* storage unavailable: drafts are not kept */ }
  }

  function renderExam(panel, topic) {
    panel.appendChild(h('div', { class: 'card info-card' },
      h('p', null, h('strong', null, 'How to use: '), 'write your answer in full, as you would in an exam. Then reveal the indicative points and tick each one your answer clearly makes. Your self-assessed mark is saved to the dashboard.'),
      h('p', { class: 'muted small' }, 'These are practice questions written for this site. The indicative points are a guide to a good answer, not an official mark scheme.')));
    if (!topic.exam.length) { panel.appendChild(ui.emptyState('No exam-style questions for this topic yet.')); return; }
    var drafts = loadDrafts();
    topic.exam.forEach(function (e, i) { panel.appendChild(examCard(e, i + 1, drafts[e.id] || '')); });
  }

  function examCard(e, n, draft) {
    var prev = RS.store.state.exam[e.id];
    var taId = 'ans-' + e.id;
    var card = h('article', { class: 'card exam-card', id: e.id },
      h('div', { class: 'question-meta' },
        h('span', { class: 'question-count' }, 'Question ' + n),
        ui.practiceBadge(),
        h('span', { class: 'badge badge-marks' }, RS.utils.plural(e.marks, 'mark')),
        prev ? h('span', { class: 'badge badge-done' }, 'Last self-assessment: ' + prev.score + '/' + prev.marks) : null),
      e.context ? h('div', { class: 'exam-context', html: e.context }) : null,
      h('div', { class: 'question-text', html: e.question }),
      e.code ? ui.codeBlock(e.code) : null);

    var ta = h('textarea', { id: taId, rows: String(Math.min(12, 3 + e.marks)), class: 'text-input' });
    ta.value = draft;
    ta.addEventListener('input', function () { saveDraft(e.id, ta.value); });
    card.appendChild(h('div', { class: 'field' }, h('label', { for: taId }, 'Your answer (saved as you type on this device)'), ta));

    var reveal = h('button', { type: 'button', class: 'btn btn-primary', 'aria-expanded': 'false' }, 'Show indicative answer');
    var markArea = h('div', { class: 'mark-area', hidden: true });
    card.appendChild(h('div', { class: 'question-actions' }, reveal));
    card.appendChild(markArea);

    reveal.addEventListener('click', function () {
      var open = markArea.hidden;
      markArea.hidden = !open;
      reveal.setAttribute('aria-expanded', open ? 'true' : 'false');
      reveal.textContent = open ? 'Hide indicative answer' : 'Show indicative answer';
    });

    var boxes = [];
    var fs = h('fieldset', { class: 'mark-points' }, h('legend', null, 'Indicative points – tick each point your answer makes clearly'));
    e.markPoints.forEach(function (p, i) {
      var id = e.id + '-mp' + i;
      var cb = h('input', { type: 'checkbox', id: id });
      boxes.push(cb);
      fs.appendChild(h('div', { class: 'check' }, cb, h('label', { for: id, html: p })));
    });
    markArea.appendChild(fs);
    if (e.markPoints.length > e.marks) {
      markArea.appendChild(h('p', { class: 'muted small' }, 'There are more points than marks: award yourself a maximum of ' + RS.utils.plural(e.marks, 'mark') + '.'));
    }
    if (e.technique) markArea.appendChild(h('div', { class: 'technique', html: '<strong>Exam technique:</strong> ' + e.technique }));

    var result = h('p', { class: 'mark-result', role: 'status' });
    var save = h('button', { type: 'button', class: 'btn btn-success' }, 'Save my mark');
    save.addEventListener('click', function () {
      var ticked = boxes.filter(function (b) { return b.checked; }).length;
      var score = Math.min(ticked, e.marks);
      RS.store.recordExam(e.id, score, e.marks);
      result.textContent = 'Saved: ' + score + ' out of ' + e.marks + '.' + (ta.value.trim() === '' ? ' (Tip: writing your answer first gives a fairer self-assessment.)' : '');
    });
    markArea.appendChild(h('div', { class: 'question-actions' }, save));
    markArea.appendChild(result);
    return card;
  }

  /* ---------- Tracing ---------- */
  function renderTracing(panel, topic) {
    panel.appendChild(h('div', { class: 'card info-card' },
      h('p', null, 'Complete each trace table by following the algorithm one step at a time. Leave a cell empty where the table says nothing is recorded. Select “Check table” to mark your answers.')));
    topic.traces.forEach(function (t) { panel.appendChild(traceCard(t)); });
  }

  function traceCard(t) {
    var prev = RS.store.state.traces[t.id];
    var card = h('article', { class: 'card trace-card', id: t.id },
      h('div', { class: 'question-meta' }, ui.practiceBadge(), ui.skillBadge('application'),
        prev ? h('span', { class: 'badge badge-done' }, 'Last attempt: ' + prev.correct + '/' + prev.total + ' cells') : null),
      h('h2', null, t.title),
      h('div', { class: 'question-text', html: t.intro }),
      ui.codeBlock(t.code, t.title + ' code'));

    var inputs = [];
    var table = h('table', { class: 'trace-table' });
    table.appendChild(h('caption', { class: 'visually-hidden' }, 'Trace table for ' + t.title));
    table.appendChild(h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Row'), t.columns.map(function (c) { return h('th', { scope: 'col' }, c); }))));
    var body = h('tbody');
    t.rows.forEach(function (row, r) {
      var tr = h('tr', null, h('th', { scope: 'row' }, String(r + 1)));
      row.forEach(function (cell, c) {
        var given = t.given && t.given.some(function (g) { return g[0] === r && g[1] === c; });
        var inp = h('input', { type: 'text', class: 'cell-input', 'aria-label': t.columns[c] + ', row ' + (r + 1), autocomplete: 'off', spellcheck: 'false' });
        if (given) { inp.value = cell; inp.readOnly = true; inp.classList.add('cell-given'); }
        inputs.push({ el: inp, answer: cell, given: given });
        tr.appendChild(h('td', null, inp));
      });
      body.appendChild(tr);
    });
    table.appendChild(body);
    card.appendChild(h('div', { class: 'table-scroll' }, table));

    var status = h('p', { class: 'mark-result', role: 'status' });
    var explanation = h('div', { class: 'explanation', hidden: true, html: '<strong>Explanation:</strong> ' + t.explanation });
    var check = h('button', { type: 'button', class: 'btn btn-primary' }, 'Check table');
    var show = h('button', { type: 'button', class: 'btn' }, 'Show answers');
    var clear = h('button', { type: 'button', class: 'btn' }, 'Clear');

    check.addEventListener('click', function () {
      var marked = inputs.filter(function (i) { return !i.given; });
      var correct = 0;
      marked.forEach(function (i) {
        var ok = RS.utils.normaliseAnswer(i.el.value, { ignoreSpaces: true }) === RS.utils.normaliseAnswer(i.answer, { ignoreSpaces: true });
        i.el.classList.toggle('cell-ok', ok);
        i.el.classList.toggle('cell-bad', !ok);
        i.el.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (ok) correct++;
      });
      RS.store.recordTrace(t.id, correct, marked.length);
      status.textContent = correct + ' of ' + marked.length + ' cells correct.' + (correct === marked.length ? ' Excellent – the whole table is right.' : ' Incorrect cells are outlined in red.');
      explanation.hidden = false;
    });
    show.addEventListener('click', function () {
      inputs.forEach(function (i) { i.el.value = i.answer; i.el.classList.remove('cell-bad'); i.el.removeAttribute('aria-invalid'); });
      status.textContent = 'Answers shown. Clear the table and try it again from memory later.';
      explanation.hidden = false;
    });
    clear.addEventListener('click', function () {
      inputs.forEach(function (i) {
        if (!i.given) i.el.value = '';
        i.el.classList.remove('cell-ok', 'cell-bad'); i.el.removeAttribute('aria-invalid');
      });
      status.textContent = '';
      explanation.hidden = true;
    });

    card.appendChild(h('div', { class: 'question-actions' }, check, show, clear));
    card.appendChild(status);
    card.appendChild(explanation);
    return card;
  }

  RS.views = RS.views || {};
  RS.views.topic = { render: render };
})(typeof window !== 'undefined' ? window : globalThis);
