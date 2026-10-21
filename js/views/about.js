/* About page and the not-found page. */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});
  var h = RS.utils.h;

  function render(app) {
    app.appendChild(h('h1', null, 'About this site'));
    app.appendChild(h('section', { class: 'card prose' },
      h('h2', null, 'What this site is'),
      h('p', null, 'An independent, free revision tool for A-level Computer Science. It contains revision notes, flashcards, auto-marked practice questions, exam-style questions with indicative answers and algorithm-tracing exercises.'),
      h('h2', null, 'About the questions'),
      h('ul', null,
        h('li', null, 'Every question is a ', h('strong', null, 'practice question'), ' written for this site. None is an official past-paper question.'),
        h('li', null, 'Indicative answers show the kind of points a good answer would make. They are not official mark schemes, and real exams may credit other valid points.'),
        h('li', null, 'Questions are labelled ', RS.ui.skillBadge('recall'), ', ', RS.ui.skillBadge('application'), ' or ', RS.ui.skillBadge('technique'), ' so you can practise each kind of skill.')),
      h('h2', null, 'Specification coverage'),
      h('p', null, 'The topics are a general A-level structure. Each topic page lists links to the WJEC GCE AS/A Level Computer Science specification (Wales, version 2, March 2019), made by reading that document. This mapping has not been checked or endorsed by WJEC or any other exam board. Other boards (for example AQA, OCR or Eduqas) organise content differently, so check your own specification.'),
      h('p', null, 'Some WJEC content is not yet covered here, including: input/output devices, operating-system types and utilities, file organisation and hashing for files, translators and compilation stages in depth, human–computer interaction, types of software and expert systems, legislation and ethical issues, and the Unit 2 and Unit 5 practical components.'),
      h('h2', null, 'Your progress and privacy'),
      h('p', null, 'Progress is saved with your browser’s local storage on this device only. Nothing is sent to a server, there are no accounts and no tracking. Progress does not synchronise between devices or browsers; use Export and Import on the dashboard to move it.'),
      h('h2', null, 'Accessibility'),
      h('p', null, 'The site is designed to work with a keyboard and screen reader, supports light and dark themes, respects your reduced-motion setting and adapts to phones, tablets and desktops. Please report anything that does not work for you.')));
  }

  function notFound(app) {
    app.appendChild(h('h1', null, 'Page not found'));
    app.appendChild(RS.ui.emptyState('That page does not exist. It may have been moved or renamed.', h('a', { class: 'btn btn-primary', href: '#/' }, 'Go to topics')));
  }

  RS.views = RS.views || {};
  RS.views.about = { render: render };
  RS.views.notFound = { render: notFound };
})(typeof window !== 'undefined' ? window : globalThis);
