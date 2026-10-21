/* Home page: introduction, overall progress and topic cards. */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});
  var h = RS.utils.h;

  function render(app) {
    var state = RS.store.state;
    var overall = RS.progress.overall(state);
    var active = RS.store.getActiveQuiz();

    var hero = h('section', { class: 'hero' },
      h('div', { class: 'hero-text' },
        h('h1', null, 'A-level Computer Science revision'),
        h('p', { class: 'lead' }, 'Revise each topic with concise notes and flashcards, then test yourself with shuffled practice quizzes, exam-style questions and algorithm-tracing exercises.'),
        h('div', { class: 'hero-actions' },
          h('a', { class: 'btn btn-primary', href: '#/quiz' }, 'Start a quiz'),
          h('a', { class: 'btn', href: '#/dashboard' }, 'View your dashboard'))),
      h('div', { class: 'hero-stats card' },
        RS.ui.progressRing(overall.mastery, 'Overall mastery'),
        h('div', null,
          h('p', { class: 'stat-label' }, 'Overall mastery'),
          h('p', { class: 'stat-detail' }, overall.masteredItems + ' of ' + overall.totalItems + ' items'),
          h('p', { class: 'stat-detail' }, overall.accuracy === null ? 'No questions answered yet' : 'Question accuracy: ' + overall.accuracy + '%'))));
    app.appendChild(hero);

    if (active && RS.quiz.isValidSession(active) && !active.finished) {
      app.appendChild(h('div', { class: 'banner banner-info' },
        'You have an unfinished quiz. ', h('a', { href: '#/quiz/run' }, 'Resume quiz'), '.'));
    }

    app.appendChild(h('h2', { class: 'section-title' }, 'Your course'));
    app.appendChild(h('p', { class: 'muted' }, 'Lessons, slides and interactive activities, organised by specification unit and topic.'));
    app.appendChild(RS.views.units.unitGrid());

    app.appendChild(h('h2', { class: 'section-title' }, 'Revision by topic'));
    app.appendChild(h('p', { class: 'muted' }, 'Notes, flashcards, practice questions, exam-style questions and tracing exercises.'));
    var grid = h('ul', { class: 'topic-grid', role: 'list' });
    RS.content.topics().forEach(function (t) {
      var s = RS.progress.topicStats(t, state);
      grid.appendChild(h('li', null,
        h('a', { class: 'card topic-card', href: '#/topic/' + t.id },
          h('div', { class: 'topic-card-head' },
            RS.ui.topicIcon(t),
            h('h3', null, t.title)),
          h('p', { class: 'topic-summary' }, t.summary),
          h('div', { class: 'topic-card-foot' },
            h('div', { class: 'topic-progress-label' },
              h('span', null, s.mastery + '% mastered'),
              h('span', { class: 'muted' }, s.accuracy === null ? 'Not started' : s.accuracy + '% accuracy')),
            RS.ui.progressBar(s.mastery, t.title + ' mastery')))));
    });
    app.appendChild(grid);

    app.appendChild(h('section', { class: 'card info-card' },
      h('h2', null, 'How to use this site'),
      h('ol', null,
        h('li', null, 'Read the ', h('strong', null, 'Notes'), ' for a topic, then test recall with the ', h('strong', null, 'Flashcards'), '.'),
        h('li', null, 'Use the ', h('strong', null, 'Question bank'), ' or a ', h('a', { href: '#/quiz' }, 'quiz'), ' for instant feedback and explanations.'),
        h('li', null, 'Write full answers to ', h('strong', null, 'Exam-style'), ' questions, then mark yourself against the indicative points.'),
        h('li', null, 'Check the ', h('a', { href: '#/dashboard' }, 'dashboard'), ' to find your weakest topics.')),
      h('p', { class: 'muted' }, 'Questions are labelled by skill: ',
        RS.ui.skillBadge('recall'), ' ', RS.ui.skillBadge('application'), ' ', RS.ui.skillBadge('technique'))));
  }

  RS.views = RS.views || {};
  RS.views.home = { render: render, title: 'Topics' };
})(typeof window !== 'undefined' ? window : globalThis);
