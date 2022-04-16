const request = require("request");

const forecast = (lat, log, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=eca8a96bc4d7ccc797cd7981437e99c1&query=" +
    log +
    "," +
    lat +
    "&unit=f";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Msg: Sorry Can not connect to API", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const temp = body.current.temperature;
      const flTemp = body.current.feelslike;
      const hum = body.current.humidity;
      callback(undefined, {
        temperature: `It is currently ${temp} degress out, but the weather feel like ${flTemp} and humidity is ${hum}`,
      });
    }
  });
};

module.exports = forecast;
