const path = require("path");
const express = require("express");
const hbs = require("hbs");

const { foreCast } = require("./utils/forecast.js");
const { geoCode } = require("./utils/geocode.js");

const app = express();
const port = 5000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

//setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);
//setting static directory to server
app.use(express.static(path.join(publicDirectoryPath)));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    author: "Deepak Mahajan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    author: "Deepak Mahajan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is help page!",
    title: "Help",
    author: "Deepak Mahajan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide address location!",
    });
  }
  const address = req.query.address;
  geoCode(address, (error, { Latitude, Longitude, PlaceName }) => {
    if (error) {
    }
    foreCast(
      Longitude,
      Latitude,
      (error, { weather_descriptions, temperature, feelslike }) => {
        if (error) {
          return res.send(error);
        }
        return res.send({
          placeName: PlaceName,
          weather_descriptions: weather_descriptions,
          feelslike: `It is currently ${temperature} degress out. It feels like ${feelslike} outside.`,
        });
      }
    );
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    author: "Deepak Mahajan",
    errorMessage: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    author: "Deepak Mahajan",
    errorMessage: "404 page not found!",
  });
});

app.listen(port, () => {
  console.log(`server listening on http://127.0.0.1:${port}`);
});
