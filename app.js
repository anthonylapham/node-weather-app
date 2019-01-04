require('dotenv').config();
const request = require('request');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const yargs = require('yargs');
const postcode = require('postcode-validator');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }

  })
  .help().alias('help', 'h').argv;

const encodedAddress = encodeURIComponent(argv.address);

/*mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true
});*/

/*const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));*/

request({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.KEY}&location=${encodedAddress}`,
  json: true
}, (error, response, body) => {
  const [results] = body.results;
  if (error) {
    console.log("Unable to connect to Google servers");
  } else if (results.locations[0].street === "") {
    console.log("Unable to find location");
  } else {
    const [results] = body.results;
    console.log(`Address: ${results.providedLocation.location}`);
    console.log(`Longitude: ${results.locations[0].latLng.lng}`);
    console.log(`Latitude: ${results.locations[0].latLng.lat}`);
  }

});