require('dotenv').config();
const mongoose = require('mongoose');
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
});
