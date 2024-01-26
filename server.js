// Server script

// Imports express, our path package, the middleware clog, also sets up our index router
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index');

// Sets up our new port for Heroku
const PORT = process.env.PORT || 3001;

const app = express();

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// View routes
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Express listener
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
)