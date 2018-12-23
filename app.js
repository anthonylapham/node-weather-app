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
  const [results] = body.results;
  console.log(`Address: ${results.providedLocation.location}`);
  console.log(`Longitude: ${results.locations[0].latLng.lng}`);
  console.log(`Latitude: ${results.locations[0].latLng.lat}`);
});
