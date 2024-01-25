// Server script
/*
TODO LIST
1. Set up routes
2. GET /notes should return you with notes.html
3. GET * should return you to index.html
4. GET /api/notes should read the db.json file and return all saved notes as JSON
5. POST /api/notes should receive a new note to save on the request body, add to the json, and then
   return a new note to the client
6. Each note should have a unique id (probably check out that uuidv4 thing bryan and chris used)
7. Try to use the DELETE route if possible
8. DELETE /api/notes/:id should receive a query parameter that contains the id of a note
   to delete. Make it read all the notes from the json, remove the note with said id, and rewrite
   it to the same json.
9. When you are completely finished, upload to Heroku
*/

const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog')
const api = require('./routes/index');
const notes = require('./db/db.json');

const PORT = process.env.port || 3001;

const app = express();

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) =>
    res.json(notes)
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
)