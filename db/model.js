const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  name: String,
  profilePicture: String,
  top5: [String],
  audio : [String],
  video: String,
})

const User = mongoose.model('User', userSchema);

module.exports = User;