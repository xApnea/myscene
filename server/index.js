const express = require('express');
const morgan = require('morgan');
const path = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');
const db = require('../db/index.js');
const User = require('../db/model.js')

const app = express();

const upload = multer({storage: multer.memoryStorage()});

app.use(morgan('dev'));
app.use('/api/user', express.json());
app.use('/api/top5', express.json());
app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/api', (req, res) => {
  res.status(200).send('Request was good');
})

//////////////////////////////////////////////////////////////////////////////////
// USER
//////////////////////////////////////////////////////////////////////////////////

//get user
app.get('/api/user', (req, res) => {
  const username = req.query.username;
  User.find({username: username})
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
})

//create a new user
app.post('/api/user', (req, res) => {
  const data = req.body;
  User.create(data)
    .then((result) => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(error);
    })
})

//update top5
app.put('/api/top5', (req, res) => {
  const username = req.query.username;
  const data = req.body;
  User.update({ username: username }, { top5: data })
    .then((result) => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
})

//////////////////////////////////////////////////////////////////////////////////
// AVATAR
//////////////////////////////////////////////////////////////////////////////////

//Add a new avatar
app.post('/api/avatar', upload.single('avatar'), (req, res) => {
  AWS.config.loadFromPath('./config.json');
  const username = req.query.username;

  console.log(req.file);

  var objectParams = {Bucket: 'myscene', Key: req.file.originalname, Body: req.file.buffer};
  // Create object upload promise
  var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
  uploadPromise
  .then((data) => {
      console.log(data);
      console.log(`Successfully uploaded data to ${objectParams.Bucket}/${objectParams.Key}`);
      // Here we need to send a put request to update the avatar

      User.update({ username: username }, { avatar: `https://myscene.s3.us-east-2.amazonaws.com/${objectParams.Key}` })
        .then((result) => {
          console.log(result);
          res.status(200).send(result);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send(error);
        });
      //res.status(200).send(`Successfully uploaded data to ${objectParams.Bucket}/${objectParams.Key}`);
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
// VIDEO
//////////////////////////////////////////////////////////////////////////////////
//Change youtube video
app.put('/api/video', (req, res) => {
  res.status(200).send('Video request was good');
})

const port = process.env.PORT || 3000;
var server = app.listen(port, () => {console.log(`Listening on port: ${port}`)});

module.exports = server;