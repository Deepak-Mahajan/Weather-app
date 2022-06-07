const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZGVlcGFrbWFoYWphbiIsImEiOiJjbDNpazBxbzkwcXFvM2lsbnlhaWhiMDllIn0.4loI_StUcpX_rYzEr8fzLQ&limit=1`;
  request({ url, json: true }, (error, response) => {
    //axios.get(url, (error, response) => {
    if (error) {
      callback("Unable to access weather service!", undefined);
    } else {
      callback(undefined, {
        Latitude: response.body.features[0].center[0],
        Longitude: response.body.features[0].center[1],
        PlaceName: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = {
  geoCode: geoCode,
};
