const request = require("request");

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (lat, log, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=eca8a96bc4d7ccc797cd7981437e99c1&query=" +
    log +
    "," +
    lat +
    "&unit=f";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Can not connect to API", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const temp = body.current.temperature;
      const flTemp = body.current.feelslike;
      callback(undefined, {
        temperature: `It is currently ${temp} degress out, but feel like ${flTemp}`,
      });
    }
  });
};

module.exports = forecast;
