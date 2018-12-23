require('dotenv').config();
const request = require('request');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/*mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true
});*/

/*const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));*/

request({
  url:db,
  json: true
}, (error, response, body) => {
  console.log(`Address: ${body.results.providedLocation}`);
  //console.log(`Longitude: ${body.results.latLng.lng}`);
  //console.log(`Latitude: ${body.results.latling.lat}`);
});
