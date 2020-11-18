"use strict";

var fs = require('fs');

var chalk = require('chalk');

var getNotes = function getNotes() {
  return "Your notes...";
};

var addNote = function addNote(title, body) {
  var notes = loadNotes();
  debugger;
  var duplicateNote = notes.find(function (note) {
    return note.title === title;
  });

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New notes are added'));
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
};

var removeNote = function removeNote(title) {
  var notes = loadNotes();
  var savedNotes = notes.filter(function (note) {
    return note.title !== title;
  });

  if (savedNotes.length === notes.length) {
    console.log(chalk.inverse.red.bold('No note found!'));
  } else {
    saveNotes(savedNotes);
    console.log(chalk.inverse.green.bold('Note removed!'));
  }
};

var listNotes = function listNotes() {
  console.log(chalk.yellow.bold("Your notes :"));
  var notes = loadNotes();
  notes.forEach(function (note) {
    console.log(note.title);
  });
};

var readNote = function readNote(title) {
  var notes = loadNotes();
  var reqdNote = notes.find(function (note) {
    return note.title === title;
  });

  if (!reqdNote) {
    console.log(chalk.red.inverse.bold('No such note exists!'));
  } else {
    console.log(chalk.magenta.bold(reqdNote.title));
    console.log(reqdNote.body);
  }
};

var loadNotes = function loadNotes() {
  try {
    var dataBuffer = fs.readFileSync('notes.json');
    var dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

var saveNotes = function saveNotes(notes) {
  var dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJsON);
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};