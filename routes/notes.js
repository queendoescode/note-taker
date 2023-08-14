const notes = require('express').Router();
const fs = require('fs');

const uniqid = require('uniqid'); 

const databaseFile = './db/db.json'; // path to the notes "database" file

notes.get('/', (req, res) => {
  fs.readFile(
    databaseFile, 
    {}, // options
    (err, fileData) => {
      if (err) {
        res.sendStatus(500); // "internal server error"
      } else {
        // success - we have data
        const json = JSON.parse(fileData);
        res.send(json);
      }
    });
});

notes.post('/', (req, res) => {
  const newNote = {
    id: uniqid(),
    title: req.body.title,
    text: req.body.text
  };

  fs.readFile(
    databaseFile,
    (err, fileData) => {
      if (err) {
        console.error(err);
        res.status(500).send('Could not read the notes database file');
      } else {
        const notes = JSON.parse(fileData);

        notes.push(newNote);

        const updatedJson = JSON.stringify(notes, null, 2);

        fs.writeFile(databaseFile, updatedJson, (err) => {
            if (err) {
              res.status(500).send('Could not update the notes database file');
            } else {
              res.status(201).json(newNote);
            }
          }
        );
      }
    }
  )
});

notes.delete('/:id', (req, res) => {
  fs.readFile(
    databaseFile,
    (err, fileData) => {
      if (err) {
        console.error(err);
        res.status(500).send('Could not read the notes database file');
      } else {
        const notes = JSON.parse(fileData);

        // The ID passed in the route is available in req.params:

        const idToDelete = req.params.id;
        const filteredNotes = notes.filter(note => note.id !== idToDelete);

        const updatedJson = JSON.stringify(filteredNotes, null, 2);

        fs.writeFile(databaseFile, updatedJson, (err) => {
            if (err) {
              res.status(500).send('Could not update the notes database file');
            } else {
              res.status(201).json([]);
            }
          }
        );
      }
    }
  );
});

module.exports = notes;
