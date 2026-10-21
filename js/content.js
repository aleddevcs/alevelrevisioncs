/*
 * Revision content registry. Each file in data/revision/ calls RS.content.registerTopic({...})
 * for one course topic (unit + topic number). Every note, flashcard, question, exam-style
 * question and trace has a `lesson` number so revision can be filtered by lesson.
 * See README.md ("Writing revision content") for the full format.
 */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});

  var SKILLS = {
    recall: { label: 'Knowledge recall', short: 'Recall' },
    application: { label: 'Application', short: 'Application' },
    technique: { label: 'Exam technique', short: 'Technique' }
  };

  var topics = [];
  var index = null; // built lazily: id -> item lookups

  function registerTopic(topic) {
    topic.notes = topic.notes || [];
    topic.flashcards = topic.flashcards || [];
    topic.questions = topic.questions || [];
    topic.exam = topic.exam || [];
    topic.traces = topic.traces || [];
    topic.specRefs = topic.specRefs || [];
    topics.push(topic);
    topics.sort(function (a, b) { return (a.unit - b.unit) || (a.topic - b.topic); });
    index = null;
  }

  function buildIndex() {
    index = { topics: {}, questions: {}, flashcards: {}, exam: {}, traces: {} };
    topics.forEach(function (t) {
      index.topics[t.id] = t;
      ['questions', 'flashcards', 'exam', 'traces'].forEach(function (kind) {
        t[kind].forEach(function (item) {
          item.topicId = t.id;
          index[kind][item.id] = item;
        });
      });
    });
    return index;
  }

  /** The revision topic for a course topic (unit and topic numbers), or null. */
  function forCourseTopic(unit, topic) {
    return topics.filter(function (t) { return t.unit === Number(unit) && t.topic === Number(topic); })[0] || null;
  }

  /**
   * Items of one kind ('notes', 'flashcards', 'questions', 'exam', 'traces', 'misconceptions',
   * 'examTips') matching a filter { lesson, spec }, in specification order. An empty filter
   * returns everything.
   */
  function select(topic, kind, filter) {
    var f = filter || {};
    var lesson = Number(f.lesson) || null;
    var courseTopic = RS.course ? RS.course.topic(topic.unit, topic.topic) : null;
    var order = courseTopic ? courseTopic.spec.map(function (e) { return e.code; }) : [];
    var rank = function (item) { var i = order.indexOf(item.spec); return i === -1 ? order.length : i; };
    return (topic[kind] || [])
      .map(function (item, i) { return { item: item, i: i }; })
      .filter(function (x) {
        return (!lesson || x.item.lesson === lesson) && (!f.spec || x.item.spec === f.spec);
      })
      .sort(function (a, b) { return (rank(a.item) - rank(b.item)) || (a.i - b.i); })
      .map(function (x) { return x.item; });
  }

  /** Items of one kind for a lesson (all lessons if none given), in specification order. */
  function forLesson(topic, kind, lesson) {
    return select(topic, kind, { lesson: lesson });
  }

  function lookup(kind, id) {
    return (index || buildIndex())[kind][id] || null;
  }

  RS.content = {
    SKILLS: SKILLS,
    registerTopic: registerTopic,
    topics: function () { if (!index) buildIndex(); return topics; },
    topic: function (id) { return lookup('topics', id); },
    forCourseTopic: forCourseTopic,
    forLesson: forLesson,
    select: select,
    question: function (id) { return lookup('questions', id); },
    flashcard: function (id) { return lookup('flashcards', id); },
    examQuestion: function (id) { return lookup('exam', id); },
    trace: function (id) { return lookup('traces', id); },
    allQuestions: function () {
      if (!index) buildIndex();
      return topics.reduce(function (acc, t) { return acc.concat(t.questions); }, []);
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
