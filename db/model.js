const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  username: String,
  avatar: String,
  top5: [String],
  audio : [
    { src: String, title: String, artist: String }
  ],
  video: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;