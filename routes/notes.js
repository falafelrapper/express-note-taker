// Notes Router
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

// GET route that allows all the notes to be shown
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET route that allows you to get the specific note using it's ID
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

// DELETE route that allows you to delete a note by specifying it's ID and then rewriting the JSON
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);
            writeToFile('./db/db.json', result);
            res.json('Note has been deleted');
        });
});

// POST route that allows you to post a new note when you you have written a new one
notes.post('/', (req, res)=>{
    const { title, text } = req.body;

    if(req.body){
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json('Note has been added');
    } else{
        res.error('Note could not be added');
    }
});


module.exports = notes;