require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const yargs = require('yargs');
const postcode = require('postcode-validator');
const axios = require('axios');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
  console.log('Running on Port', PORT);
})
