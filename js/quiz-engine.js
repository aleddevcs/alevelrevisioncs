/*
 * Quiz logic with no DOM code, so it can be unit-tested in Node.
 * A session is a plain object that is saved to localStorage after every
 * change, which is what lets a quiz survive a page refresh.
 */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});
  var utils = RS.utils;

  /** Is a response correct for this question? Unanswered/empty responses are never correct. */
  function markQuestion(question, response) {
    if (response == null || response === '') return false;
    if (question.type === 'mcq') return Number(response) === question.answer;
    if (question.type === 'input') {
      var opts = { caseSensitive: !!question.caseSensitive, ignoreSpaces: !!question.ignoreSpaces };
      var given = utils.normaliseAnswer(response, opts);
      if (given === '') return false;
      return question.accept.some(function (a) { return utils.normaliseAnswer(a, opts) === given; });
    }
    return false;
  }

  /** Choose and shuffle question ids for a quiz. */
  function buildPool(options) {
    var opts = options || {};
    var wanted = opts.topics && opts.topics.length ? opts.topics : null;
    var skill = opts.skill && opts.skill !== 'all' ? opts.skill : null;
    var lesson = Number(opts.lesson) || null; // only used with a single topic
    var onlyIds = opts.ids || null;
    var pool = RS.content.allQuestions().filter(function (q) {
      if (onlyIds) return onlyIds.indexOf(q.id) !== -1;
      if (wanted && wanted.indexOf(q.topicId) === -1) return false;
      if (skill && q.skill !== skill) return false;
      if (lesson && q.lesson !== lesson) return false;
      return true;
    }).map(function (q) { return q.id; });
    var shuffled = utils.shuffle(pool, opts.rng);
    var count = opts.count && opts.count > 0 ? opts.count : shuffled.length;
    return shuffled.slice(0, count);
  }

  function createSession(ids, meta, rng) {
    var optionOrder = {};
    ids.forEach(function (id) {
      var q = RS.content.question(id);
      if (q && q.type === 'mcq') {
        optionOrder[id] = utils.shuffle(q.options.map(function (_, i) { return i; }), rng);
      }
    });
    return {
      id: 'quiz-' + Date.now(),
      created: Date.now(),
      topics: (meta && meta.topics) || [],
      skill: (meta && meta.skill) || 'all',
      ids: ids,
      optionOrder: optionOrder,
      current: 0,
      responses: {}, // id -> { response, correct } or { skipped: true }
      finished: false
    };
  }

  function answer(session, id, response) {
    var q = RS.content.question(id);
    var correct = !!q && markQuestion(q, response);
    session.responses[id] = { response: response, correct: correct };
    return correct;
  }

  function skip(session, id) {
    if (!session.responses[id]) session.responses[id] = { skipped: true };
  }

  function isAnswered(session, id) {
    var r = session.responses[id];
    return !!r && !r.skipped;
  }

  function summary(session) {
    var s = { total: session.ids.length, correct: 0, incorrect: 0, unanswered: 0, wrongIds: [], unansweredIds: [] };
    session.ids.forEach(function (id) {
      var r = session.responses[id];
      if (!r || r.skipped) { s.unanswered++; s.unansweredIds.push(id); }
      else if (r.correct) s.correct++;
      else { s.incorrect++; s.wrongIds.push(id); }
    });
    s.percent = utils.percent(s.correct, s.total);
    return s;
  }

  /** Check a stored session still refers to questions that exist (content may have changed). */
  function isValidSession(session) {
    return !!session && Array.isArray(session.ids) && session.ids.length > 0 &&
      session.ids.every(function (id) { return !!RS.content.question(id); }) &&
      typeof session.current === 'number' && session.current >= 0 && session.current <= session.ids.length;
  }

  RS.quiz = {
    markQuestion: markQuestion,
    buildPool: buildPool,
    createSession: createSession,
    answer: answer,
    skip: skip,
    isAnswered: isAnswered,
    summary: summary,
    isValidSession: isValidSession
  };
})(typeof window !== 'undefined' ? window : globalThis);
