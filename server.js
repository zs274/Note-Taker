const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// making path of public folder into a const for easier linking of html files
const main = path.join(__dirname, 'public');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json);

// link html pages
app.get('/', (req, res) => res.sendFile(path.join(main, 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(main, 'notes.html')));


app.listen(PORT, () => console.log('listening on port ${PORT}'))