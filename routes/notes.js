const notes = require('express').Router();
const fs = require('fs');

const uniqid = require('uniqid'); 

notes.get('/', (req, res) => {
  // TODO: Implement using fs module
  fs.readFile(
    'db/db.json', // path to the notes "database" file
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
  // TODO: Implement using fs module
});

module.exports = notes;
