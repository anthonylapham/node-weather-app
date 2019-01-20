if (!process.env.NODE_ENV) {
  require('dotenv').config();
}
const request = require('request');

const geocodeAddress = (address) =>{



  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);
    console.log('this is our key', process.env.KEY)

    request({
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.KEY}&location=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      console.log('this is body in promise-2', body)
      const [results] = body.results;
      if (error) {
        reject("Unable to connect to Google servers");
      } else if (results.locations[0].street === "") {
        reject("Unable to find location");
      } else {
        resolve({
          address: results.providedLocation.location,
          latitude: results.locations[0].latLng.lat,
          longitude: results.locations[0].latLng.lng
        });
      }
      });
  });


};

geocodeAddress('45415').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
