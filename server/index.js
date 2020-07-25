const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/api', (req, res) => {
  res.status(200).send('Request was good');
})

const port = process.env.PORT || 3000;
var server = app.listen(port, () => {console.log(`Listening at http://localhost:${port}`)});

module.exports = server;