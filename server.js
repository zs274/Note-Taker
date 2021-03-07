const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const app = express();
const database = require('./db/db');

const dataPath = path.join(__dirname, './db/db.json');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// link html pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('./public/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, './public/assets/js/index.js')));
app.get('./public/assets/css/styles.css', (req, res) => res.sendFile(path.join(__dirname, './public/assets/css/styles.css')));

app.get('/api/notes', (req, res) => res.json(database));

app.post('/api/notes', (req, res) => {
    let newNote = req.body;

    newNote.id = uniqid();
    database.push(newNote);
    fs.writeFile(dataPath, JSON.stringify(database), err =>
    err ? console.log(err) : console.log('Note saved'));
    res.json(newNote);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));