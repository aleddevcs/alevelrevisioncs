/*
 * Content registry. Each file in data/topics/ calls RS.content.registerTopic({...}).
 * See README.md ("Editing content") for the full topic format.
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
    topics.sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
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

  function lookup(kind, id) {
    return (index || buildIndex())[kind][id] || null;
  }

  RS.content = {
    SKILLS: SKILLS,
    registerTopic: registerTopic,
    topics: function () { if (!index) buildIndex(); return topics; },
    topic: function (id) { return lookup('topics', id); },
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
