/*
 * Course catalogue: units → topics (specification sections) → lessons → resources.
 * Each file in data/course/ calls RS.course.registerUnit({...}). See README.md
 * ("Adding your lesson resources") for the format.
 *
 * Files live in resources/unit<U>/topic<T>/lesson<L>/ (lesson files) or
 * resources/unit<U>/topic<T>/ (files for the whole topic).
 */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});

  /* How each kind of resource is labelled and grouped on a lesson page. */
  var TYPES = {
    slides: { label: 'Lesson slides', group: 'materials' },
    notes: { label: 'Notes', group: 'materials' },
    'cheat-sheet': { label: 'Cheat sheet', group: 'materials' },
    starter: { label: 'Starter', group: 'activities' },
    interactive: { label: 'Interactive activity', group: 'activities' },
    worksheet: { label: 'Practice sheet', group: 'practice' },
    quiz: { label: 'Quiz', group: 'practice' },
    assessment: { label: 'Assessment', group: 'practice' },
    'mark-scheme': { label: 'Mark scheme', group: 'teacher' },
    'lesson-plan': { label: 'Lesson plan', group: 'teacher' },
    'forms-quiz': { label: 'Microsoft Forms quiz (questions)', group: 'teacher' },
    gimkit: { label: 'Gimkit question set', group: 'teacher' }
  };

  var GROUPS = [
    { id: 'activities', title: 'Interactive activities' },
    { id: 'materials', title: 'Lesson materials' },
    { id: 'practice', title: 'Practice and assessment' },
    { id: 'teacher', title: 'Teacher resources' }
  ];

  var FORMATS = {
    html: 'Interactive web page', pptx: 'PowerPoint', ppt: 'PowerPoint', docx: 'Word document', doc: 'Word document',
    pdf: 'PDF', csv: 'CSV spreadsheet', xlsx: 'Excel spreadsheet', png: 'Image', jpg: 'Image', mp4: 'Video'
  };

  var units = [];

  function registerUnit(unit) {
    unit.topics = unit.topics || [];
    unit.topics.forEach(function (t) {
      t.unit = unit.number;
      t.lessons = t.lessons || [];
      t.resources = t.resources || [];
      t.spec = t.spec || []; // specification entries in order: { code, text, lessons: [n] }
      t.folder = 'resources/unit' + unit.number + '/topic' + t.number + '/';
      t.resources.forEach(function (r) { r.path = t.folder + r.file; });
      t.lessons.forEach(function (l) {
        l.unit = unit.number;
        l.topic = t.number;
        l.resources = l.resources || [];
        l.folder = t.folder + 'lesson' + l.number + '/';
        l.resources.forEach(function (r) { r.path = l.folder + r.file; });
      });
    });
    units.push(unit);
    units.sort(function (a, b) { return a.number - b.number; });
  }

  function unit(n) {
    return units.filter(function (u) { return u.number === Number(n); })[0] || null;
  }

  function topic(u, t) {
    var un = unit(u);
    return un ? un.topics.filter(function (x) { return x.number === Number(t); })[0] || null : null;
  }

  function lesson(u, t, l) {
    var tp = topic(u, t);
    return tp ? tp.lessons.filter(function (x) { return x.number === Number(l); })[0] || null : null;
  }

  function extension(file) {
    var m = /\.([a-z0-9]+)$/i.exec(file);
    return m ? m[1].toLowerCase() : '';
  }

  function format(file) { return FORMATS[extension(file)] || 'File'; }

  /** URL for a resource path; encodes spaces and other characters in file names. */
  function url(path) { return path.split('/').map(encodeURIComponent).join('/'); }

  /** Every lesson in course order, for previous/next links and search. */
  function allLessons() {
    var out = [];
    units.forEach(function (u) { u.topics.forEach(function (t) { t.lessons.forEach(function (l) { out.push(l); }); }); });
    return out;
  }

  function countLessons(u) {
    return u.topics.reduce(function (n, t) { return n + t.lessons.length; }, 0);
  }

  /** A specification entry of a course topic by its code (for example '1.2.1'), or null. */
  function specEntry(t, code) {
    return (t && t.spec.filter(function (e) { return e.code === code; })[0]) || null;
  }

  /** The revision content written for a course topic, or null if there is none yet. */
  function revisionFor(t) {
    return RS.content ? RS.content.forCourseTopic(t.unit, t.number) : null;
  }

  RS.course = {
    TYPES: TYPES,
    GROUPS: GROUPS,
    registerUnit: registerUnit,
    units: function () { return units; },
    unit: unit,
    topic: topic,
    lesson: lesson,
    extension: extension,
    format: format,
    url: url,
    allLessons: allLessons,
    countLessons: countLessons,
    revisionFor: revisionFor,
    specEntry: specEntry
  };
})(typeof window !== 'undefined' ? window : globalThis);
