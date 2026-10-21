/* Quiz: setup (#/quiz), runner (#/quiz/run) and results (#/quiz/results). */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});
  var h = RS.utils.h;
  var ui = RS.ui;

  /* ---------- Setup ---------- */
  function renderSetup(app, params) {
    var store = RS.store;
    var active = store.getActiveQuiz();
    var preselect = params.query.topic ? [params.query.topic] : null;

    app.appendChild(h('h1', null, 'Practice quiz'));
    app.appendChild(h('p', { class: 'lead' }, 'Choose topics and a question type. Questions and answer options are shuffled every time, and you get feedback after each answer.'));

    if (active && RS.quiz.isValidSession(active) && !active.finished) {
      var s = RS.quiz.summary(active);
      app.appendChild(h('div', { class: 'banner banner-info' },
        h('span', null, 'You have an unfinished quiz (' + (s.total - s.unanswered) + ' of ' + s.total + ' answered). '),
        h('a', { class: 'btn btn-primary btn-small', href: '#/quiz/run' }, 'Resume'), ' ',
        h('button', { type: 'button', class: 'btn btn-small', onclick: function () { store.clearActiveQuiz(); RS.app.refresh(); } }, 'Discard it')));
    }

    var form = h('form', { class: 'card quiz-setup', novalidate: true });
    var topicBoxes = [];
    var topicFs = h('fieldset', null, h('legend', null, 'Topics'));
    var grid = h('div', { class: 'check-grid' });
    RS.content.topics().forEach(function (t) {
      var id = 'qt-' + t.id;
      var cb = h('input', { type: 'checkbox', id: id, value: t.id, checked: !preselect || preselect.indexOf(t.id) !== -1 });
      topicBoxes.push(cb);
      grid.appendChild(h('div', { class: 'check' }, cb, h('label', { for: id }, t.title + ' (' + t.questions.length + ')')));
    });
    topicFs.appendChild(h('div', { class: 'toolbar' },
      h('button', { type: 'button', class: 'btn btn-small', onclick: function () { setAll(true); } }, 'Select all'),
      h('button', { type: 'button', class: 'btn btn-small', onclick: function () { setAll(false); } }, 'Clear all')));
    topicFs.appendChild(grid);
    form.appendChild(topicFs);

    var skillFs = h('fieldset', null, h('legend', null, 'Question type'));
    var skills = [['all', 'All types']].concat(Object.keys(RS.content.SKILLS).map(function (k) { return [k, RS.content.SKILLS[k].label]; }));
    skills.forEach(function (pair, i) {
      var id = 'qs-' + pair[0];
      skillFs.appendChild(h('div', { class: 'check' },
        h('input', { type: 'radio', name: 'skill', id: id, value: pair[0], checked: i === 0 }),
        h('label', { for: id }, pair[1])));
    });
    form.appendChild(skillFs);

    var countSel = h('select', { id: 'q-count' },
      h('option', { value: '5' }, '5 questions'),
      h('option', { value: '10', selected: true }, '10 questions'),
      h('option', { value: '20' }, '20 questions'),
      h('option', { value: '0' }, 'All matching questions'));
    form.appendChild(h('div', { class: 'field field-inline' }, h('label', { for: 'q-count' }, 'Length'), countSel));

    var available = h('p', { class: 'muted', 'aria-live': 'polite' });
    var error = h('p', { class: 'form-error', role: 'alert' });
    form.appendChild(available);
    form.appendChild(error);
    form.appendChild(h('button', { type: 'submit', class: 'btn btn-primary' }, 'Start quiz'));
    app.appendChild(form);

    function chosen() {
      return {
        topics: topicBoxes.filter(function (b) { return b.checked; }).map(function (b) { return b.value; }),
        skill: form.querySelector('input[name=skill]:checked').value,
        count: Number(countSel.value)
      };
    }
    function update() {
      var c = chosen();
      var n = c.topics.length ? RS.quiz.buildPool({ topics: c.topics, skill: c.skill }).length : 0;
      available.textContent = RS.utils.plural(n, 'question') + ' available with these settings.';
      error.textContent = '';
    }
    function setAll(v) { topicBoxes.forEach(function (b) { b.checked = v; }); update(); }
    form.addEventListener('change', update);
    update();

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var c = chosen();
      if (!c.topics.length) { error.textContent = 'Choose at least one topic.'; return; }
      var ids = RS.quiz.buildPool(c);
      if (!ids.length) { error.textContent = 'No questions match these settings. Try a different question type or more topics.'; return; }
      store.setActiveQuiz(RS.quiz.createSession(ids, { topics: c.topics, skill: c.skill }));
      RS.app.go('#/quiz/run');
    });
  }

  /* ---------- Runner ---------- */
  function renderRun(app) {
    var store = RS.store;
    var session = store.getActiveQuiz();
    if (!RS.quiz.isValidSession(session)) {
      app.appendChild(h('h1', null, 'Practice quiz'));
      app.appendChild(ui.emptyState('There is no quiz in progress.', h('a', { class: 'btn btn-primary', href: '#/quiz' }, 'Set up a quiz')));
      return;
    }
    if (session.finished) { RS.app.go('#/quiz/results', true); return; }
    if (session.current >= session.ids.length) session.current = session.ids.length - 1;

    var total = session.ids.length;
    var id = session.ids[session.current];
    var q = RS.content.question(id);
    var topic = RS.content.topic(q.topicId);

    var status = h('p', { class: 'muted', 'aria-live': 'polite' });
    function updateStatus() {
      var sum = RS.quiz.summary(session);
      status.textContent = (total - sum.unanswered) + ' of ' + total + ' answered · ' + sum.correct + ' correct so far';
    }
    updateStatus();
    app.appendChild(h('div', { class: 'quiz-head' }, h('h1', null, 'Practice quiz'), status));
    app.appendChild(ui.progressBar(((session.current + 1) / total) * 100, 'Quiz position'));

    // Question navigator: jump to any question and see its status.
    var navList = h('ol', { class: 'quiz-nav', 'aria-label': 'Questions' });
    session.ids.forEach(function (qid, i) {
      var r = session.responses[qid];
      var st = !r || r.skipped ? (r && r.skipped ? 'skipped' : 'open') : (r.correct ? 'correct' : 'incorrect');
      var label = 'Question ' + (i + 1) + ': ' + { open: 'not answered', skipped: 'skipped', correct: 'correct', incorrect: 'incorrect' }[st];
      navList.appendChild(h('li', null, h('button', {
        type: 'button', class: 'qnav qnav-' + st + (i === session.current ? ' is-current' : ''), 'aria-label': label,
        'aria-current': i === session.current ? 'step' : null, onclick: function () { goTo(i); }
      }, String(i + 1))));
    });
    app.appendChild(navList);

    var next = h('button', { type: 'button', class: 'btn btn-primary' }, session.current === total - 1 ? 'Finish quiz' : 'Next question →');
    next.addEventListener('click', advance);

    var card = ui.questionCard(q, {
      heading: 'Question ' + (session.current + 1) + ' of ' + total + ' · ' + topic.title,
      optionOrder: session.optionOrder[id],
      previous: session.responses[id],
      onAnswer: function (response) {
        var correct = RS.quiz.answer(session, id, response);
        store.recordQuestion(id, correct);
        store.setActiveQuiz(session);
        updateStatus();
        var dot = navList.querySelector('.is-current');
        dot.classList.remove('qnav-open', 'qnav-skipped');
        dot.classList.add(correct ? 'qnav-correct' : 'qnav-incorrect');
        dot.setAttribute('aria-label', 'Question ' + (session.current + 1) + ': ' + (correct ? 'correct' : 'incorrect'));
        controls.replaceChild(next, skipBtn);
        next.focus();
      }
    });
    card.querySelector('.question-text').setAttribute('data-autofocus', '');
    app.appendChild(card);

    var skipBtn = h('button', { type: 'button', class: 'btn' }, session.current === total - 1 ? 'Skip and finish' : 'Skip for now');
    skipBtn.addEventListener('click', function () { RS.quiz.skip(session, id); store.setActiveQuiz(session); advance(); });
    var answered = RS.quiz.isAnswered(session, id);
    var controls = h('div', { class: 'quiz-controls' },
      h('button', { type: 'button', class: 'btn', disabled: session.current === 0, onclick: function () { goTo(session.current - 1); } }, '← Previous'),
      answered ? next : skipBtn,
      h('button', { type: 'button', class: 'btn btn-ghost', onclick: function () { confirmFinish(); } }, 'End quiz now'));
    app.appendChild(controls);

    var confirmBox = h('div', { class: 'card confirm', hidden: true, role: 'alertdialog', 'aria-labelledby': 'confirm-text' });
    app.appendChild(confirmBox);

    function goTo(i) { session.current = i; store.setActiveQuiz(session); RS.app.refresh(); }

    function advance() {
      // Move to the next unanswered question after this one, otherwise finish.
      for (var i = session.current + 1; i < total; i++) {
        if (!RS.quiz.isAnswered(session, session.ids[i])) { goTo(i); return; }
      }
      confirmFinish();
    }

    function confirmFinish() {
      var sum = RS.quiz.summary(session);
      if (sum.unanswered === 0) { finish(); return; }
      confirmBox.innerHTML = '';
      confirmBox.appendChild(h('p', { id: 'confirm-text' }, 'You have ' + RS.utils.plural(sum.unanswered, 'unanswered question') + '. Unanswered questions count as not scored. Finish anyway?'));
      var firstOpen = session.ids.findIndex(function (qid) { return !RS.quiz.isAnswered(session, qid); });
      var back = h('button', { type: 'button', class: 'btn', onclick: function () { goTo(firstOpen); } }, 'Go to first unanswered');
      confirmBox.appendChild(h('div', { class: 'question-actions' },
        h('button', { type: 'button', class: 'btn btn-primary', onclick: finish }, 'Finish and see results'), back));
      confirmBox.hidden = false;
      back.focus();
    }

    function finish() {
      session.finished = true;
      var sum = RS.quiz.summary(session);
      store.addQuizResult({ topics: session.topics, total: sum.total, correct: sum.correct, incorrect: sum.incorrect, unanswered: sum.unanswered });
      store.setActiveQuiz(session);
      RS.app.go('#/quiz/results');
    }
  }

  /* ---------- Results ---------- */
  function answerText(q, r) {
    if (!r || r.skipped) return 'Not answered';
    if (q.type === 'mcq') return q.options[r.response];
    return RS.utils.escapeHtml(r.response);
  }

  function renderResults(app) {
    var session = RS.store.getActiveQuiz();
    if (!RS.quiz.isValidSession(session) || !session.finished) {
      app.appendChild(h('h1', null, 'Quiz results'));
      app.appendChild(ui.emptyState('There are no quiz results to show.', h('a', { class: 'btn btn-primary', href: '#/quiz' }, 'Start a quiz')));
      return;
    }
    var s = RS.quiz.summary(session);
    var verdict = s.percent >= 80 ? 'Excellent work.' : s.percent >= 60 ? 'Good progress – review the questions below.' : 'Keep going – revisit the notes for the topics below, then try again.';

    app.appendChild(h('h1', null, 'Quiz results'));
    app.appendChild(h('section', { class: 'card results-summary' },
      ui.progressRing(s.percent, 'Score'),
      h('div', null,
        h('p', { class: 'score' }, 'You scored ' + s.correct + ' out of ' + s.total),
        h('p', null, verdict),
        h('ul', { class: 'result-counts' },
          h('li', { class: 'count-correct' }, s.correct + ' correct'),
          h('li', { class: 'count-incorrect' }, s.incorrect + ' incorrect'),
          h('li', { class: 'count-unanswered' }, s.unanswered + ' unanswered')))));

    // Per-topic breakdown for this quiz.
    var byTopic = {};
    session.ids.forEach(function (id) {
      var q = RS.content.question(id);
      var b = byTopic[q.topicId] || (byTopic[q.topicId] = { total: 0, correct: 0 });
      b.total++;
      var r = session.responses[id];
      if (r && r.correct) b.correct++;
    });
    var tbl = h('table', { class: 'data-table' },
      h('caption', null, 'Score by topic'),
      h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Topic'), h('th', { scope: 'col' }, 'Score'))));
    var tb = h('tbody');
    Object.keys(byTopic).forEach(function (tid) {
      var t = RS.content.topic(tid);
      tb.appendChild(h('tr', null, h('th', { scope: 'row' }, h('a', { href: '#/topic/' + tid + '/notes' }, t.title)),
        h('td', null, byTopic[tid].correct + ' / ' + byTopic[tid].total)));
    });
    tbl.appendChild(tb);
    app.appendChild(h('div', { class: 'card table-scroll' }, tbl));

    var review = s.wrongIds.concat(s.unansweredIds);
    var actions = h('div', { class: 'hero-actions' });
    if (review.length) {
      actions.appendChild(h('button', { type: 'button', class: 'btn btn-primary', onclick: function () {
        RS.store.setActiveQuiz(RS.quiz.createSession(RS.utils.shuffle(review), { topics: session.topics, skill: session.skill }));
        RS.app.go('#/quiz/run');
      } }, 'Retry incorrect and unanswered (' + review.length + ')'));
    }
    actions.appendChild(h('a', { class: 'btn', href: '#/quiz' }, 'New quiz'));
    actions.appendChild(h('a', { class: 'btn', href: '#/dashboard' }, 'Dashboard'));
    app.appendChild(actions);

    if (!review.length) {
      app.appendChild(h('p', { class: 'card' }, 'Every question was answered correctly – there is nothing to review.'));
      return;
    }
    app.appendChild(h('h2', { class: 'section-title' }, 'Questions to review'));
    review.forEach(function (id) {
      var q = RS.content.question(id);
      var r = session.responses[id];
      var skipped = !r || r.skipped;
      var item = h('article', { class: 'card review-item ' + (skipped ? 'is-unanswered' : 'is-incorrect') },
        h('div', { class: 'question-meta' },
          h('span', { class: 'badge ' + (skipped ? 'badge-unanswered' : 'badge-incorrect') }, skipped ? 'Unanswered' : 'Incorrect'),
          ui.skillBadge(q.skill),
          h('span', { class: 'muted small' }, RS.content.topic(q.topicId).title)),
        h('div', { class: 'question-text', html: q.question }),
        q.code ? ui.codeBlock(q.code) : null,
        h('p', { html: '<strong>Your answer:</strong> ' + answerText(q, r) }),
        !skipped && q.type === 'mcq' && q.feedback[r.response] ? h('p', { html: '<strong>Why it is wrong:</strong> ' + q.feedback[r.response] }) : null,
        h('p', { html: '<strong>Correct answer:</strong> ' + (q.type === 'mcq' ? q.options[q.answer] : RS.utils.escapeHtml(q.accept[0])) }),
        h('p', { class: 'explanation', html: '<strong>Explanation:</strong> ' + q.explanation }));
      app.appendChild(item);
    });
  }

  RS.views = RS.views || {};
  RS.views.quizSetup = { render: renderSetup };
  RS.views.quizRun = { render: renderRun };
  RS.views.quizResults = { render: renderResults };
})(typeof window !== 'undefined' ? window : globalThis);
