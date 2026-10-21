/*
 * Progress calculations used by the home page and dashboard (no DOM code).
 *
 * "Mastered" items for a topic are:
 *   - question-bank questions whose most recent answer was correct
 *   - flashcards marked "I know this"
 *   - exam-style questions self-assessed at half marks or more
 *   - trace tables completed with every cell correct
 */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});
  var percent = RS.utils.percent;

  function topicStats(topic, state) {
    var s = {
      id: topic.id,
      questions: topic.questions.length, attempted: 0, lastCorrect: 0, attempts: 0, correct: 0,
      flashcards: topic.flashcards.length, known: 0,
      exam: topic.exam.length, examAttempted: 0, examScore: 0, examMarks: 0, examGood: 0,
      traces: topic.traces.length, tracesAttempted: 0, tracesComplete: 0,
      lastActivity: state.lastVisited[topic.id] || 0
    };
    topic.questions.forEach(function (q) {
      var r = state.questions[q.id];
      if (!r) return;
      s.attempted++; s.attempts += r.attempts; s.correct += r.correct;
      if (r.last === 'correct') s.lastCorrect++;
      s.lastActivity = Math.max(s.lastActivity, r.ts);
    });
    var flashcardsSeen = 0;
    topic.flashcards.forEach(function (f) {
      if (state.flashcards[f.id]) flashcardsSeen++;
      if (state.flashcards[f.id] === 'known') s.known++;
    });
    topic.exam.forEach(function (e) {
      var r = state.exam[e.id];
      if (!r) return;
      s.examAttempted++; s.examScore += r.score; s.examMarks += r.marks;
      if (r.score * 2 >= r.marks) s.examGood++;
      s.lastActivity = Math.max(s.lastActivity, r.ts);
    });
    topic.traces.forEach(function (t) {
      var r = state.traces[t.id];
      if (!r) return;
      s.tracesAttempted++;
      if (r.correct === r.total) s.tracesComplete++;
      s.lastActivity = Math.max(s.lastActivity, r.ts);
    });
    s.totalItems = s.questions + s.flashcards + s.exam + s.traces;
    s.masteredItems = s.lastCorrect + s.known + s.examGood + s.tracesComplete;
    s.mastery = percent(s.masteredItems, s.totalItems);
    s.accuracy = s.attempts ? percent(s.correct, s.attempts) : null;
    s.started = s.attempted + flashcardsSeen + s.examAttempted + s.tracesAttempted > 0;
    return s;
  }

  function allTopicStats(state) {
    return RS.content.topics().map(function (t) { return topicStats(t, state); });
  }

  function overall(state) {
    var stats = allTopicStats(state);
    var o = { attempted: 0, attempts: 0, correct: 0, known: 0, flashcards: 0, masteredItems: 0, totalItems: 0,
      examScore: 0, examMarks: 0, quizzes: state.quizHistory.length };
    stats.forEach(function (s) {
      o.attempted += s.attempted; o.attempts += s.attempts; o.correct += s.correct;
      o.known += s.known; o.flashcards += s.flashcards;
      o.masteredItems += s.masteredItems; o.totalItems += s.totalItems;
      o.examScore += s.examScore; o.examMarks += s.examMarks;
    });
    o.accuracy = o.attempts ? percent(o.correct, o.attempts) : null;
    o.mastery = percent(o.masteredItems, o.totalItems);
    return o;
  }

  /** Accuracy split by question skill type (recall, application, exam technique). */
  function skillStats(state) {
    var out = {};
    Object.keys(RS.content.SKILLS).forEach(function (k) { out[k] = { attempts: 0, correct: 0, questions: 0 }; });
    RS.content.allQuestions().forEach(function (q) {
      var bucket = out[q.skill];
      if (!bucket) return;
      bucket.questions++;
      var r = state.questions[q.id];
      if (r) { bucket.attempts += r.attempts; bucket.correct += r.correct; }
    });
    Object.keys(out).forEach(function (k) {
      out[k].accuracy = out[k].attempts ? percent(out[k].correct, out[k].attempts) : null;
    });
    return out;
  }

  /** Up to `limit` topics to focus on next: weakest started topics first, then unstarted ones. */
  function suggestions(state, limit) {
    var stats = allTopicStats(state);
    var weak = stats.filter(function (s) { return s.accuracy !== null && s.accuracy < 70; })
      .sort(function (a, b) { return a.accuracy - b.accuracy; })
      .map(function (s) { return { id: s.id, reason: 'Question accuracy is ' + s.accuracy + '%.' }; });
    var unstarted = stats.filter(function (s) { return !s.started; })
      .map(function (s) { return { id: s.id, reason: 'Not started yet.' }; });
    var lowMastery = stats.filter(function (s) { return s.started && s.accuracy !== null && s.accuracy >= 70 && s.mastery < 60; })
      .sort(function (a, b) { return a.mastery - b.mastery; })
      .map(function (s) { return { id: s.id, reason: 'Good accuracy, but only ' + s.mastery + '% of items mastered so far.' }; });
    return weak.concat(unstarted, lowMastery).slice(0, limit || 3);
  }

  RS.progress = {
    topicStats: topicStats,
    allTopicStats: allTopicStats,
    overall: overall,
    skillStats: skillStats,
    suggestions: suggestions
  };
})(typeof window !== 'undefined' ? window : globalThis);
