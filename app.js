const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

//customize yargs version 
yargs.version('1.1.0');

//creating an add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Displaying the contents of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

//creating a remove command
yargs.command({
    command: 'remove',
    describe: 'Removing notes',
    builder: {
        title: {
            describe: 'The title of the note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

//creating a list command
yargs.command({
    command: 'list',
    describe: 'List out the contents',
    handler() { notes.listNotes(); }
});

//creating a read command
yargs.command({
    command: 'read',
    description: 'Read the notes',
    builder: {
        title: {
            describe: 'The title of the note to be read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});

yargs.parse();

//console.log(yargs.argv);