const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const app = express();
const PORT = process.env.PORT || 3000;

// making path of public folder into a const for easier linking of files
const main = path.join(__dirname, 'public');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json);

// link html pages
app.get('/', (req, res) => res.sendFile(path.join(main, 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(main, 'notes.html')));

app.get('Develop/public/assets/js/index.js', (req, res) => res.sendFile(path.join('Develop/public/assets/js/index.js')));
app.get('Develop/public/assets/css/styles.css', (req, res) => res.sendFile(path.join('Develop/public/assets/css/styles.css')));


app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

app.get('/api/notes/:id', (req, res) => {
    let saved = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(saved[Number(req.params.id)]);
});

app.post('/api/notes', (req, res) => {
    let saved = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let newNote = req.body;

    newNote.id = uniqid();
    saved.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(saved));
    res.json(saved);
});

app.listen(PORT, () => console.log('listening on port ${PORT}'));
