const fs = require('fs');
const chalk = require('chalk');
const getNotes = () => { return "Your notes..."; }

const addNote = (title, body) => {
    const notes = loadNotes();

    debugger

    const duplicateNote = notes.find((note) => note.title === title);

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

}

const removeNote = (title) => {
    const notes = loadNotes();
    const savedNotes = notes.filter((note) => note.title !== title);
    if (savedNotes.length === notes.length) {
        console.log(chalk.inverse.red.bold('No note found!'));
    } else {
        saveNotes(savedNotes);
        console.log(chalk.inverse.green.bold('Note removed!'));
    }
}

const listNotes = () => {
    console.log(chalk.yellow.bold("Your notes :"));
    const notes = loadNotes();

    notes.forEach((note) => {
        console.log(note.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const reqdNote = notes.find((note) => note.title === title);
    if (!reqdNote) {
        console.log(chalk.red.inverse.bold('No such note exists!'));
    } else {
        console.log(chalk.magenta.bold(reqdNote.title));
        console.log(reqdNote.body);
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJsON);
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};