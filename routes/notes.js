const notes = require('express').Router();
//const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
  readFromFile('./db/notes.json')
    .then( fileData => {
      res.send(fileData);
    })
    .catch( err => {
      res.send('Error');
    });
});

notes.post('/', (req, res) => {
  console.log(req.body)
  readAndAppend(req.body, './db/notes.json');
  res.send('OK');
});

module.exports = notes;
