require('dotenv').config();
/*const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const yargs = require('yargs');
const postcode = require('postcode-validator');

const geocode = require('./geocode/geocode.js');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage){
      console.log(errorMessage);
    }else{
      console.log(JSON.stringify(results, undefined, 2));
    }
});*/


const request = require('request');

request({
  url: `https://api.darksky.net/forecast/${process.env.weatherAPI}/39.825622,-84.242664`,
  json: true
}, (error, response, body) => {
  if(error){
    console.log("Unable to get weather iformation");
  }else{
    console.log(`Temperature: ${body.currently.temperature}`);
    console.log(`Longitude: ${body.longitude}`);
    console.log(`Latitude: ${body.latitude}`);
  }
}

)
