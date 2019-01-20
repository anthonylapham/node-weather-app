const request = require('request');

const weatherAddress = (lat, lng, callback) => {

  request({
      url: `https://api.darksky.net/forecast/${process.env.weatherAPI}/${lat},${lng}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        callback("Unable to get weather information");
      } else {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }
    }

  )
}

module.exports.weatherAddress = weatherAddress;
