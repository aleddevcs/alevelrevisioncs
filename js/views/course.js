/* Course pages: units (#/units), a unit (#/unit/1), a topic (#/unit/1/topic/4) and a lesson (#/unit/1/topic/4/lesson/2). */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});
  var h = RS.utils.h;
  var course = RS.course;

  function unitHref(u) { return '#/unit/' + u; }
  function topicHref(u, t) { return '#/unit/' + u + '/topic/' + t; }
  function lessonHref(l) { return topicHref(l.unit, l.topic) + '/lesson/' + l.number; }

  function crumbs(items) {
    var nav = h('nav', { class: 'breadcrumbs', 'aria-label': 'Breadcrumb' });
    items.forEach(function (it, i) {
      if (i) nav.appendChild(h('span', { 'aria-hidden': 'true' }, ' / '));
      nav.appendChild(it.href ? h('a', { href: it.href }, it.label) : h('span', { 'aria-current': 'page' }, it.label));
    });
    return nav;
  }

  function lessonSummary(l) {
    var counts = {};
    l.resources.forEach(function (r) { var g = course.TYPES[r.type].group; counts[g] = (counts[g] || 0) + 1; });
    var parts = [];
    if (counts.activities) parts.push(RS.utils.plural(counts.activities, 'activity', 'activities'));
    if (counts.materials) parts.push('slides');
    if (counts.practice) parts.push('practice');
    return parts.join(' · ');
  }

  /**
   * Links into the revision content for a course topic, optionally filtered to one lesson.
   * Shows "coming soon" when no revision content has been written for the topic yet.
   */
  function revisionPanel(t, l) {
    var rev = course.revisionFor(t);
    var scope = l ? 'this lesson' : 'this topic';
    var panel = h('section', { class: 'card revision-panel' }, h('h2', null, 'Revise ' + scope));
    if (!rev) {
      panel.appendChild(h('p', { class: 'muted' }, 'Revision notes, flashcards and practice questions for this topic are coming soon.'));
      return panel;
    }
    var lesson = l ? l.number : null;
    var q = lesson ? '?lesson=' + lesson : '';
    var base = '#/topic/' + rev.id + '/';
    var count = function (kind) { return RS.content.forLesson(rev, kind, lesson).length; };
    if (!count('notes') && !count('flashcards') && !count('questions')) {
      panel.appendChild(h('p', { class: 'muted' }, 'Revision for this lesson is coming soon. You can still revise the whole topic.'));
      panel.appendChild(h('a', { class: 'btn', href: base + 'notes' }, 'Revise the whole topic'));
      return panel;
    }
    var links = [
      ['notes', 'Notes', count('notes')],
      ['flashcards', 'Flashcards', count('flashcards')],
      ['questions', 'Question bank', count('questions')],
      ['exam', 'Exam-style', count('exam')],
      ['tracing', 'Tracing', count('traces')]
    ].filter(function (x) { return x[2] > 0; });
    var codes = t.spec.filter(function (e) { return !l || e.lessons.indexOf(l.number) !== -1; }).map(function (e) { return e.code; });
    panel.appendChild(h('p', { class: 'muted' }, (l
      ? 'Notes, flashcards and practice questions based on this lesson.'
      : 'Notes, flashcards and practice questions based on the lessons in this topic, in specification order.') +
      (codes.length ? ' Specification entries: ' + codes.join(' · ') + '.' : '')));
    panel.appendChild(h('ul', { class: 'revise-links', role: 'list' }, links.map(function (x) {
      return h('li', null, h('a', { class: 'btn', href: base + x[0] + q }, x[1], h('span', { class: 'revise-count' }, String(x[2]))));
    })));
    if (count('questions')) {
      panel.appendChild(h('a', { class: 'btn btn-primary', href: '#/quiz?topic=' + rev.id + (lesson ? '&lesson=' + lesson : '') }, l ? 'Quiz this lesson' : 'Quiz the whole topic'));
    }
    return panel;
  }

  /* ---------- All units ---------- */
  function renderUnits(app) {
    app.appendChild(h('h1', null, 'Course units'));
    app.appendChild(h('p', { class: 'lead' }, 'Lessons and resources organised by the units and topics of the WJEC GCE AS/A Level Computer Science specification. New lessons are added as they are written.'));
    app.appendChild(unitGrid());
  }

  function unitGrid() {
    var grid = h('ul', { class: 'topic-grid unit-grid', role: 'list' });
    course.units().forEach(function (u) {
      var n = course.countLessons(u);
      grid.appendChild(h('li', null, h('a', { class: 'card topic-card unit-card', href: unitHref(u.number) },
        h('div', { class: 'topic-card-head' },
          h('span', { class: 'unit-number', 'aria-hidden': 'true' }, String(u.number)),
          h('div', null, h('p', { class: 'unit-kicker' }, u.level + ' · Unit ' + u.number), h('h3', null, u.title))),
        h('p', { class: 'topic-summary' }, u.assessment),
        h('p', { class: 'unit-status' + (n ? '' : ' muted') }, n ? RS.utils.plural(n, 'lesson') + ' available' : 'Lessons coming soon'))));
    });
    return grid;
  }

  /* ---------- One unit ---------- */
  function renderUnit(app, params) {
    var u = course.unit(params.unit);
    if (!u) { RS.views.notFound.render(app); return; }
    RS.app.setTitle('Unit ' + u.number + ': ' + u.title);
    app.appendChild(crumbs([{ label: 'Units', href: '#/units' }, { label: 'Unit ' + u.number }]));
    app.appendChild(h('header', { class: 'course-header' },
      h('p', { class: 'unit-kicker' }, u.level + ' · Unit ' + u.number),
      h('h1', null, u.title),
      h('p', { class: 'lead' }, u.summary),
      h('p', { class: 'muted small' }, u.assessment)));

    var list = h('ol', { class: 'course-list', role: 'list' });
    u.topics.forEach(function (t) {
      var n = t.lessons.length;
      list.appendChild(h('li', null, h('a', { class: 'card course-row', href: topicHref(u.number, t.number) },
        h('span', { class: 'row-number', 'aria-hidden': 'true' }, String(t.number)),
        h('div', { class: 'row-body' },
          h('h2', null, h('span', { class: 'visually-hidden' }, 'Topic ' + t.number + ': '), t.title),
          h('p', { class: 'muted small' }, t.summary)),
        h('span', { class: 'row-status' + (n ? ' has-lessons' : '') }, n ? RS.utils.plural(n, 'lesson') : 'Coming soon'))));
    });
    app.appendChild(list);
  }

  /* ---------- One topic ---------- */
  function renderTopic(app, params) {
    var u = course.unit(params.unit);
    var t = course.topic(params.unit, params.topic);
    if (!u || !t) { RS.views.notFound.render(app); return; }
    RS.app.setTitle(t.title + ' – Unit ' + u.number);
    app.appendChild(crumbs([{ label: 'Units', href: '#/units' }, { label: 'Unit ' + u.number, href: unitHref(u.number) }, { label: 'Topic ' + t.number }]));
    app.appendChild(h('header', { class: 'course-header' },
      h('p', { class: 'unit-kicker' }, 'Unit ' + u.number + ' · Topic ' + t.number),
      h('h1', null, t.title),
      h('p', { class: 'lead' }, t.summary)));

    if (t.lessons.length) {
      app.appendChild(h('h2', { class: 'section-title' }, 'Lessons'));
      var list = h('ol', { class: 'course-list', role: 'list' });
      t.lessons.forEach(function (l) {
        list.appendChild(h('li', null, h('a', { class: 'card course-row', href: lessonHref(l) },
          h('span', { class: 'row-number', 'aria-hidden': 'true' }, String(l.number)),
          h('div', { class: 'row-body' },
            h('h3', null, h('span', { class: 'visually-hidden' }, 'Lesson ' + l.number + ': '), l.title),
            l.subtitle ? h('p', { class: 'muted small' }, l.subtitle) : null),
          h('span', { class: 'row-status has-lessons' }, lessonSummary(l)))));
      });
      var planned = t.plannedLessons || 0;
      for (var n = t.lessons.length + 1; n <= planned; n++) {
        list.appendChild(h('li', null, h('div', { class: 'card course-row is-planned' },
          h('span', { class: 'row-number', 'aria-hidden': 'true' }, String(n)),
          h('div', { class: 'row-body' }, h('h3', null, 'Lesson ' + n)),
          h('span', { class: 'row-status' }, 'Coming soon'))));
      }
      app.appendChild(list);
    } else {
      app.appendChild(h('div', { class: 'card empty-state' }, h('p', null, 'Lessons for this topic are coming soon.')));
    }

    if (t.resources.length) {
      app.appendChild(h('h2', { class: 'section-title' }, 'Topic resources'));
      app.appendChild(downloadList(t.resources));
    }
    app.appendChild(revisionPanel(t));
  }

  /* ---------- One lesson ---------- */
  function renderLesson(app, params) {
    var u = course.unit(params.unit);
    var t = course.topic(params.unit, params.topic);
    var l = course.lesson(params.unit, params.topic, params.lesson);
    if (!u || !t || !l) { RS.views.notFound.render(app); return; }
    RS.app.setTitle(l.title + ' – Unit ' + u.number + ' Topic ' + t.number);
    app.appendChild(crumbs([{ label: 'Units', href: '#/units' }, { label: 'Unit ' + u.number, href: unitHref(u.number) },
      { label: 'Topic ' + t.number, href: topicHref(u.number, t.number) }, { label: 'Lesson ' + l.number }]));
    app.appendChild(h('header', { class: 'course-header' },
      h('p', { class: 'unit-kicker' }, 'Unit ' + u.number + ' · ' + t.title + ' · Lesson ' + l.number),
      h('h1', null, l.title),
      l.subtitle ? h('p', { class: 'lead' }, l.subtitle) : null,
      l.spec ? h('p', { class: 'muted small' }, 'Specification references: ' + l.spec) : null));

    course.GROUPS.forEach(function (g) {
      var items = l.resources.filter(function (r) { return course.TYPES[r.type].group === g.id; });
      if (!items.length) return;
      app.appendChild(h('h2', { class: 'section-title' }, g.title));
      if (g.id === 'activities') items.forEach(function (r) { app.appendChild(activityCard(r)); });
      else app.appendChild(downloadList(items));
    });
    if (!l.resources.length) app.appendChild(h('div', { class: 'card empty-state' }, h('p', null, 'Resources for this lesson are coming soon.')));

    app.appendChild(revisionPanel(t, l));

    var all = course.allLessons();
    var i = all.indexOf(l);
    app.appendChild(h('nav', { class: 'pager', 'aria-label': 'Lessons' },
      i > 0 ? h('a', { class: 'btn', href: lessonHref(all[i - 1]) }, '← ' + all[i - 1].title) : h('span'),
      i < all.length - 1 ? h('a', { class: 'btn', href: lessonHref(all[i + 1]) }, all[i + 1].title + ' →') : h('span')));
  }

  function activityCard(r) {
    var href = course.url(r.path);
    var holder = h('div', { class: 'activity-frame', hidden: true });
    var toggle = h('button', { type: 'button', class: 'btn', 'aria-expanded': 'false' }, 'Show on this page');
    toggle.addEventListener('click', function () {
      var open = holder.hidden;
      if (open && !holder.firstChild) holder.appendChild(h('iframe', { src: href, title: r.title, loading: 'lazy' }));
      holder.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Hide' : 'Show on this page';
    });
    return h('article', { class: 'card activity-card' },
      h('div', { class: 'activity-head' },
        h('div', null,
          h('span', { class: 'badge badge-' + r.type }, course.TYPES[r.type].label),
          h('h3', null, r.title)),
        h('div', { class: 'question-actions' },
          h('a', { class: 'btn btn-primary', href: href, target: '_blank', rel: 'noopener' }, 'Open full screen', h('span', { class: 'visually-hidden' }, ' (opens in a new tab)')),
          toggle)),
      holder);
  }

  function downloadList(items) {
    return h('ul', { class: 'card resource-list', role: 'list' }, items.map(function (r) {
      var ext = course.extension(r.file);
      return h('li', null,
        h('span', { class: 'file-badge file-' + ext, 'aria-hidden': 'true' }, ext.toUpperCase()),
        h('div', { class: 'row-body' },
          h('span', { class: 'resource-title' }, r.title),
          h('span', { class: 'muted small' }, course.TYPES[r.type].label + ' · ' + course.format(r.file))),
        h('a', { class: 'btn btn-small', href: course.url(r.path), download: r.file }, 'Download', h('span', { class: 'visually-hidden' }, ' ' + r.title)));
    }));
  }

  RS.views = RS.views || {};
  RS.views.units = { render: renderUnits, unitGrid: unitGrid };
  RS.views.unit = { render: renderUnit };
  RS.views.courseTopic = { render: renderTopic };
  RS.views.lesson = { render: renderLesson };
})(typeof window !== 'undefined' ? window : globalThis);
