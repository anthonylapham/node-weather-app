const request = require('request');

 const geocodeAddress = (address, callback) => {

  const encodedAddress = encodeURIComponent(address);


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
      const [results] = body.results;
      console.log(`Address: ${results.providedLocation.location}`);
      console.log(`Longitude: ${results.locations[0].latLng.lng}`);
      console.log(`Latitude: ${results.locations[0].latLng.lat}`);
    }

  });

}

module.exports.geocodeAddress = geocodeAddress;
