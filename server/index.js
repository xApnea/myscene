const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/api', (req, res) => {
  res.status(200).send('Request was good');
})

//////////////////////////////////////////////////////////////////////////////////
// USER
//////////////////////////////////////////////////////////////////////////////////

//get user
app.get('/api/user', (req, res) => {
  res.status(200).send('Request was good');
})

//create a new user
app.post('/api/user', (req, res) => {
  res.status(200).send('Request was good');
})

//////////////////////////////////////////////////////////////////////////////////
// PROFILE PICTURE
//////////////////////////////////////////////////////////////////////////////////

//Add a new profile picture
app.put('/api/profile', (req, res) => {
  res.status(200).send('Request was good');
})

//////////////////////////////////////////////////////////////////////////////////
// AUDIO
//////////////////////////////////////////////////////////////////////////////////

//Add a new audio track
app.post('/api/audio', (req, res) => {
  res.status(200).send('Request was good');
})

//Add a new audio track
app.delete('/api/audio', (req, res) => {
  res.status(200).send('Request was good');
})


const port = process.env.PORT || 3000;
var server = app.listen(port, () => {console.log(`Listening on port: ${port}`)});

module.exports = server;