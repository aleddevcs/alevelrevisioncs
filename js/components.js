/*
 * Reusable interface pieces shared by several views.
 */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});
  var h = RS.utils.h;

  function skillBadge(skill) {
    var info = RS.content.SKILLS[skill];
    if (!info) return null;
    return h('span', { class: 'badge badge-' + skill, title: info.label }, info.label);
  }

  function practiceBadge() {
    return h('span', { class: 'badge badge-practice' }, 'Practice question');
  }

  function progressBar(pct, label) {
    var value = Math.max(0, Math.min(100, Math.round(pct || 0)));
    return h('div', { class: 'progress', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(value), 'aria-label': label || 'Progress' },
      h('div', { class: 'progress-fill', style: 'width:' + value + '%' }));
  }

  function progressRing(pct, label) {
    var value = Math.max(0, Math.min(100, Math.round(pct || 0)));
    var r = 18, c = 2 * Math.PI * r;
    var wrap = h('div', { class: 'ring', role: 'img', 'aria-label': (label || 'Progress') + ': ' + value + '%' });
    wrap.innerHTML = '<svg viewBox="0 0 44 44" aria-hidden="true"><circle class="ring-track" cx="22" cy="22" r="' + r + '"/>' +
      '<circle class="ring-fill" cx="22" cy="22" r="' + r + '" stroke-dasharray="' + c.toFixed(2) + '" stroke-dashoffset="' +
      (c * (1 - value / 100)).toFixed(2) + '"/></svg><span class="ring-text">' + value + '%</span>';
    return wrap;
  }

  function codeBlock(code, label) {
    var pre = h('pre', { class: 'code', tabindex: '0', 'aria-label': label || 'Code' });
    pre.appendChild(h('code', { text: code }));
    return pre;
  }

  function topicIcon(topic) {
    return h('span', { class: 'topic-icon topic-' + topic.colour, html: RS.icons.icon(topic.icon) });
  }

  var qCounter = 0;

  /**
   * An answerable question card.
   * opts.optionOrder  display order of MCQ options (array of original indices)
   * opts.previous     a saved { response, correct } to show already-answered state
   * opts.onAnswer     callback(response, correct) after the student submits
   * opts.heading      text shown above the question (for example "Question 3 of 10")
   */
  function questionCard(q, opts) {
    var o = opts || {};
    var uid = 'q' + (++qCounter);
    var order = o.optionOrder || (q.options ? q.options.map(function (_, i) { return i; }) : []);
    var card = h('article', { class: 'card question-card', id: o.anchor ? q.id : null, 'aria-labelledby': uid + '-text' });

    var meta = h('div', { class: 'question-meta' }, practiceBadge(), skillBadge(q.skill));
    if (o.heading) meta.insertBefore(h('span', { class: 'question-count' }, o.heading), meta.firstChild);
    card.appendChild(meta);
    card.appendChild(h('div', { class: 'question-text', id: uid + '-text', html: q.question }));
    if (q.code) card.appendChild(codeBlock(q.code, 'Code for this question'));

    var form = h('form', { class: 'question-form', novalidate: true });
    var feedback = h('div', { class: 'feedback', role: 'status', 'aria-live': 'polite' });
    var submit = h('button', { class: 'btn btn-primary', type: 'submit' }, 'Check answer');
    var input;

    if (q.type === 'mcq') {
      var fs = h('fieldset', { class: 'options' }, h('legend', { class: 'visually-hidden' }, 'Choose one answer'));
      order.forEach(function (orig, pos) {
        var id = uid + '-opt' + pos;
        fs.appendChild(h('div', { class: 'option', 'data-index': String(orig) },
          h('input', { type: 'radio', name: uid, id: id, value: String(orig) }),
          h('label', { for: id, html: '<span class="option-letter">' + 'ABCDEF'[pos] + '</span><span>' + q.options[orig] + '</span>' })));
      });
      form.appendChild(fs);
    } else {
      var inputId = uid + '-input';
      input = h('input', { type: 'text', id: inputId, class: 'text-input', autocomplete: 'off', spellcheck: 'false', autocapitalize: 'off' });
      form.appendChild(h('div', { class: 'field' },
        h('label', { for: inputId }, 'Your answer'), input,
        q.hint ? h('p', { class: 'hint' }, q.hint) : null));
    }

    var actions = h('div', { class: 'question-actions' }, submit);
    form.appendChild(actions);
    form.appendChild(feedback);
    card.appendChild(form);

    function getResponse() {
      if (q.type === 'mcq') {
        var checked = form.querySelector('input[type=radio]:checked');
        return checked ? Number(checked.value) : null;
      }
      return input.value;
    }

    function lock(response, correct) {
      Array.prototype.forEach.call(form.querySelectorAll('input'), function (el) { el.disabled = true; });
      submit.hidden = true;
      card.classList.add(correct ? 'is-correct' : 'is-incorrect');
      feedback.innerHTML = '';

      var title = h('p', { class: 'feedback-title' }, correct ? '✓ Correct' : '✗ Not quite');
      feedback.appendChild(title);
      feedback.className = 'feedback ' + (correct ? 'feedback-correct' : 'feedback-incorrect');

      if (q.type === 'mcq') {
        Array.prototype.forEach.call(form.querySelectorAll('.option'), function (el) {
          var idx = Number(el.getAttribute('data-index'));
          if (idx === q.answer) el.classList.add('option-correct');
          if (idx === response && !correct) el.classList.add('option-wrong');
          if (idx === response) el.querySelector('input').checked = true;
        });
        if (!correct && response != null && q.feedback[response]) {
          feedback.appendChild(h('p', { html: '<strong>Why your answer is wrong:</strong> ' + q.feedback[response] }));
        }
        if (!correct) {
          feedback.appendChild(h('p', { html: '<strong>Correct answer:</strong> ' + q.options[q.answer] }));
        }
      } else {
        if (response != null) input.value = response;
        if (!correct) feedback.appendChild(h('p', { html: '<strong>Accepted answer:</strong> ' + RS.utils.escapeHtml(q.accept[0]) }));
      }
      feedback.appendChild(h('p', { class: 'explanation', html: '<strong>Explanation:</strong> ' + q.explanation }));
      if (o.after) actions.appendChild(o.after);
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var response = getResponse();
      if (response === null || (typeof response === 'string' && response.trim() === '')) {
        feedback.className = 'feedback feedback-warn';
        feedback.textContent = q.type === 'mcq' ? 'Choose an answer first, or use “Skip” to come back to it later.' : 'Type an answer first, or use “Skip” to move on.';
        return;
      }
      var correct = RS.quiz.markQuestion(q, response);
      lock(response, correct);
      if (o.onAnswer) o.onAnswer(response, correct);
    });

    if (o.previous && !o.previous.skipped) lock(o.previous.response, o.previous.correct);

    card.focusFirst = function () {
      var first = form.querySelector('input:not([disabled])');
      if (first) first.focus();
    };
    card.extraActions = actions;
    return card;
  }

  function emptyState(text, link) {
    return h('div', { class: 'card empty-state' }, h('p', null, text), link || null);
  }

  RS.ui = {
    skillBadge: skillBadge,
    practiceBadge: practiceBadge,
    progressBar: progressBar,
    progressRing: progressRing,
    codeBlock: codeBlock,
    topicIcon: topicIcon,
    questionCard: questionCard,
    emptyState: emptyState
  };
})(typeof window !== 'undefined' ? window : globalThis);
