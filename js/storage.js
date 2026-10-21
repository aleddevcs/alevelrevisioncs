/*
 * Progress storage using localStorage. Everything is kept under one key so it
 * is easy to export, import and reset. If localStorage is unavailable (for
 * example, some private browsing modes) the site keeps working in memory.
 */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});

  var KEY = 'alrcs.progress.v1';
  var VERSION = 1;
  var HISTORY_LIMIT = 50;

  function defaults() {
    return {
      version: VERSION,
      questions: {},   // id -> { attempts, correct, last: 'correct'|'incorrect', ts }
      flashcards: {},  // id -> 'known' | 'learning'
      exam: {},        // id -> { score, marks, ts }
      traces: {},      // id -> { correct, total, ts }
      quizHistory: [], // newest first: { ts, topics, total, correct, incorrect, unanswered }
      activeQuiz: null,
      lastVisited: {}  // topicId -> ts
    };
  }

  function getStorage() {
    try {
      var s = root.localStorage;
      var probe = '__alrcs_probe__';
      s.setItem(probe, '1');
      s.removeItem(probe);
      return s;
    } catch (e) {
      return null;
    }
  }

  var storage = getStorage();
  var state = load();

  function isObject(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }
  function isNum(v) { return typeof v === 'number' && isFinite(v) && v >= 0; }

  /** Keep only well-formed fields so corrupt or hand-edited data cannot break the site. */
  function sanitise(raw) {
    var clean = defaults();
    if (!isObject(raw)) return clean;

    if (isObject(raw.questions)) {
      Object.keys(raw.questions).forEach(function (id) {
        var q = raw.questions[id];
        if (isObject(q) && isNum(q.attempts) && isNum(q.correct) && (q.last === 'correct' || q.last === 'incorrect')) {
          clean.questions[id] = { attempts: q.attempts, correct: Math.min(q.correct, q.attempts), last: q.last, ts: isNum(q.ts) ? q.ts : 0 };
        }
      });
    }
    if (isObject(raw.flashcards)) {
      Object.keys(raw.flashcards).forEach(function (id) {
        var v = raw.flashcards[id];
        if (v === 'known' || v === 'learning') clean.flashcards[id] = v;
      });
    }
    if (isObject(raw.exam)) {
      Object.keys(raw.exam).forEach(function (id) {
        var e = raw.exam[id];
        if (isObject(e) && isNum(e.score) && isNum(e.marks) && e.score <= e.marks) {
          clean.exam[id] = { score: e.score, marks: e.marks, ts: isNum(e.ts) ? e.ts : 0 };
        }
      });
    }
    if (isObject(raw.traces)) {
      Object.keys(raw.traces).forEach(function (id) {
        var t = raw.traces[id];
        if (isObject(t) && isNum(t.correct) && isNum(t.total) && t.correct <= t.total) {
          clean.traces[id] = { correct: t.correct, total: t.total, ts: isNum(t.ts) ? t.ts : 0 };
        }
      });
    }
    if (Array.isArray(raw.quizHistory)) {
      clean.quizHistory = raw.quizHistory.filter(function (r) {
        return isObject(r) && isNum(r.ts) && isNum(r.total) && isNum(r.correct) && isNum(r.incorrect) && isNum(r.unanswered);
      }).map(function (r) {
        return {
          ts: r.ts, total: r.total, correct: r.correct, incorrect: r.incorrect, unanswered: r.unanswered,
          topics: Array.isArray(r.topics) ? r.topics.filter(function (t) { return typeof t === 'string'; }) : []
        };
      }).slice(0, HISTORY_LIMIT);
    }
    if (isObject(raw.activeQuiz) && Array.isArray(raw.activeQuiz.ids) && isObject(raw.activeQuiz.responses)) {
      clean.activeQuiz = raw.activeQuiz;
    }
    if (isObject(raw.lastVisited)) {
      Object.keys(raw.lastVisited).forEach(function (id) {
        if (isNum(raw.lastVisited[id])) clean.lastVisited[id] = raw.lastVisited[id];
      });
    }
    return clean;
  }

  function load() {
    if (!storage) return defaults();
    try {
      var text = storage.getItem(KEY);
      return text ? sanitise(JSON.parse(text)) : defaults();
    } catch (e) {
      return defaults(); // corrupt JSON: start again rather than crash
    }
  }

  function save() {
    if (!storage) return false;
    try {
      storage.setItem(KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      return false; // quota exceeded or storage disabled mid-session
    }
  }

  function now() { return Date.now(); }

  var store = {
    KEY: KEY,
    get persistent() { return !!storage; },
    get state() { return state; },

    reload: function () { state = load(); return state; },

    recordQuestion: function (id, isCorrect) {
      var q = state.questions[id] || { attempts: 0, correct: 0, last: 'incorrect', ts: 0 };
      q.attempts += 1;
      if (isCorrect) q.correct += 1;
      q.last = isCorrect ? 'correct' : 'incorrect';
      q.ts = now();
      state.questions[id] = q;
      save();
    },

    setFlashcard: function (id, status) {
      if (status === 'known' || status === 'learning') state.flashcards[id] = status;
      else delete state.flashcards[id];
      save();
    },

    recordExam: function (id, score, marks) {
      state.exam[id] = { score: Math.max(0, Math.min(score, marks)), marks: marks, ts: now() };
      save();
    },

    recordTrace: function (id, correct, total) {
      state.traces[id] = { correct: correct, total: total, ts: now() };
      save();
    },

    addQuizResult: function (result) {
      state.quizHistory.unshift({
        ts: now(), topics: result.topics || [], total: result.total,
        correct: result.correct, incorrect: result.incorrect, unanswered: result.unanswered
      });
      state.quizHistory = state.quizHistory.slice(0, HISTORY_LIMIT);
      save();
    },

    getActiveQuiz: function () { return state.activeQuiz; },
    setActiveQuiz: function (session) { state.activeQuiz = session; save(); },
    clearActiveQuiz: function () { state.activeQuiz = null; save(); },

    touchTopic: function (id) { state.lastVisited[id] = now(); save(); },

    exportData: function () {
      return JSON.stringify({ app: 'alevel-cs-revision', exported: new Date().toISOString(), data: state }, null, 2);
    },

    /** Import exported JSON. Returns { ok, message }. Existing progress is replaced. */
    importData: function (text) {
      var parsed;
      try { parsed = JSON.parse(text); } catch (e) { return { ok: false, message: 'That file is not valid JSON.' }; }
      if (!isObject(parsed) || parsed.app !== 'alevel-cs-revision' || !isObject(parsed.data)) {
        return { ok: false, message: 'That file is not a progress export from this site.' };
      }
      state = sanitise(parsed.data);
      save();
      return { ok: true, message: 'Progress imported.' };
    },

    reset: function () {
      state = defaults();
      if (storage) { try { storage.removeItem(KEY); } catch (e) { /* ignore */ } }
    },

    _sanitise: sanitise
  };

  RS.store = store;
})(typeof window !== 'undefined' ? window : globalThis);
