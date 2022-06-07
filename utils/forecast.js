const request = require("request");

const foreCast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3172ee3eee7bab97dd1b7a09e7b06b18&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to access weather service!", undefined);
    } else {
      callback(undefined, {
        weather_descriptions: response.body.current.weather_descriptions[0],
        temperature: response.body.current.temperature,
        feelslike: response.body.current.feelslike,
      });
    }
  });
};

module.exports = {
  foreCast: foreCast,
};
