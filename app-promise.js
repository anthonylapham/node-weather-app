require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const yargs = require('yargs');
const postcode = require('postcode-validator');
const axios = require('axios');

// const geocode = require('./geocode/geocode.js');
// const weather = require('./weather/weather.js');

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
const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.KEY}&location=${encodedAddress}`

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find address.');
  } else {
    const lat = response.data.results[0].locations[0].latLng.lat;
    const lng = response.data.results[0].locations[0].latLng.lng;
    const weatherUrl = `https://api.darksky.net/forecast/${process.env.weatherAPI}/${lat},${lng}`
    console.log(response.data.results[0].providedLocation.location);
    return axios.get(weatherUrl).then((response) => {
      const temperature = response.data.currently.temperature;
      const apparentTemperature = response.data.currently.apparentTemperature;
      console.log(`It is currently ${temperature} degrees. It feels like ${apparentTemperature}`);
    });;
  }

}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.')
  } else {
    console.log(error);
  }

});

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(results.address);
//     weather.weatherAddress(results.latitude, results.longitude, (errorMessage, weatherResults) => {
//       if (errorMessage) {
//         console.log(errorMessage);
//       } else {
//         console.log(`It's currently ${weatherResults.temperature} degrees outside. It feels more like ${weatherResults.apparentTemperature}.`);
//       }
//     });
//   }
//
// });
