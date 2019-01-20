const request = require('request');

const geocodeAddress = (address, callback) => {

  const encodedAddress = encodeURIComponent(address);

  console.log('this is muy key in geocode', process.env.KEY)
  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.KEY}&location=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    const [results] = body.results;
    if (error) {
      callback("Unable to connect to Google servers");
    } else if (results.locations[0].street === "") {
      callback("Unable to find location");
    } else {
      callback(undefined, {
        address: results.providedLocation.location,
        latitude: results.locations[0].latLng.lat,
        longitude: results.locations[0].latLng.lng
      });
    }
    });

}

module.exports.geocodeAddress = geocodeAddress;
