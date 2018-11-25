require('dotenv').config();
const request = require('request');
const mongoose = require('mongoose');
const body-parser = require('body-parser');

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

request({
  url: db,
  json: true
}, (error, response, body) => {
  console.log(JSON.stringify(body, undefined, 2));
});
