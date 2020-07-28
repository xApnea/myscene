const express = require('express');
const morgan = require('morgan');
const path = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');

const app = express();

const upload = multer({storage: multer.memoryStorage()});

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
  res.status(200).send('User successfully retreived');
})

//create a new user
app.post('/api/user', (req, res) => {
  res.status(200).send('User was successfully created');
})

//////////////////////////////////////////////////////////////////////////////////
// PROFILE PICTURE
//////////////////////////////////////////////////////////////////////////////////

//Add a new profile picture
app.post('/api/profile', upload.single('avatar'), (req, res) => {
  AWS.config.loadFromPath('./config.json');
  // var key = new Date();
  // key = JSON.stringify(key);

  console.log(req.headers);
  console.log(req.file);
  console.log(req.body);

  var objectParams = {Bucket: 'myscene', Key: req.file.originalname, Body: req.file.buffer};
  // Create object upload promise
  var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
  uploadPromise
  .then((data) => {
      console.log(data);
      console.log(`Successfully uploaded data to ${objectParams.Bucket}/${objectParams.Key}`);;
      res.status(200).send(`Successfully uploaded data to ${objectParams.Bucket}/${objectParams.Key}`);
    })
  .catch((error) => {
    console.log(`This is the failing field: ${error.field}`);
    console.error(error);
    res.status(500).send(error);
  });
})

//////////////////////////////////////////////////////////////////////////////////
// AUDIO
//////////////////////////////////////////////////////////////////////////////////

//Add a new audio track
app.post('/api/audio', (req, res) => {
  res.status(200).send('Audio request was good');
})

//Delete an audio track
app.delete('/api/audio', (req, res) => {
  res.status(200).send('Audio request was good');
})


//////////////////////////////////////////////////////////////////////////////////
// AUDIO
//////////////////////////////////////////////////////////////////////////////////
//Change youtube video
app.put('/api/video', (req, res) => {
  res.status(200).send('Video request was good');
})

const port = process.env.PORT || 3000;
var server = app.listen(port, () => {console.log(`Listening on port: ${port}`)});

module.exports = server;