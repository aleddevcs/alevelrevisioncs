/* Search results page (#/search?q=...) and the single-question page (#/question/:id). */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});
  var h = RS.utils.h;

  function render(app, params) {
    var q = params.query.q || '';
    var input = document.getElementById('search-input');
    if (input && input.value !== q) input.value = q;

    var form = h('form', { class: 'search-page-form', role: 'search' });
    var box = h('input', { type: 'search', id: 'search-page-input', value: q, placeholder: 'For example: two\'s complement, quicksort, 3NF' });
    form.appendChild(h('label', { for: 'search-page-input', class: 'visually-hidden' }, 'Search'));
    form.appendChild(box);
    form.appendChild(h('button', { class: 'btn btn-primary', type: 'submit' }, 'Search'));
    form.addEventListener('submit', function (e) { e.preventDefault(); RS.app.go('#/search?q=' + encodeURIComponent(box.value.trim())); });

    app.appendChild(h('h1', null, 'Search'));
    app.appendChild(form);

    if (!q.trim()) {
      app.appendChild(h('p', { class: 'muted' }, 'Search notes, flashcards, practice questions and exam-style questions across every topic.'));
      return;
    }
    var results = RS.search.search(q);
    app.appendChild(h('p', { class: 'muted', role: 'status' }, results.length ? RS.utils.plural(results.length, 'result') + ' for “' + q + '”' : 'No results for “' + q + '”. Try fewer or different words.'));
    var list = h('ul', { class: 'search-results' });
    results.forEach(function (d) {
      var t = RS.content.topic(d.topicId);
      list.appendChild(h('li', { class: 'card search-result' },
        h('div', { class: 'question-meta' }, h('span', { class: 'badge' }, d.kind), h('span', { class: 'muted small' }, t.title)),
        h('a', { href: d.href }, d.title.length > 160 ? d.title.slice(0, 157) + '…' : d.title)));
    });
    app.appendChild(list);
  }

  function renderQuestion(app, params) {
    var q = RS.content.question(params.id);
    if (!q) { RS.views.notFound.render(app); return; }
    var t = RS.content.topic(q.topicId);
    app.appendChild(h('nav', { class: 'breadcrumbs', 'aria-label': 'Breadcrumb' },
      h('a', { href: '#/' }, 'Topics'), ' / ', h('a', { href: '#/topic/' + t.id + '/questions' }, t.title), ' / ', h('span', { 'aria-current': 'page' }, 'Practice question')));
    app.appendChild(h('h1', null, 'Practice question'));
    app.appendChild(RS.ui.questionCard(q, {
      optionOrder: q.type === 'mcq' ? RS.utils.shuffle(q.options.map(function (_, i) { return i; })) : null,
      onAnswer: function (response, correct) { RS.store.recordQuestion(q.id, correct); },
      after: h('a', { class: 'btn', href: '#/topic/' + t.id + '/questions' }, 'More ' + t.title + ' questions')
    }));
  }

  RS.views = RS.views || {};
  RS.views.search = { render: render };
  RS.views.question = { render: renderQuestion };
})(typeof window !== 'undefined' ? window : globalThis);
