const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { read } = require("fs");
//define paths for express config
const pathDir = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and view location
const port = process.env.PORT || 3000;
const app = express();
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(pathDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Samuel Osas",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Samuel Osarieme",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help Page",
    msg: "Getting help about weathe app!",
    name: "Samuel Osarieme",
  });
});
//app.com/weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address for search. Thanks.",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, { temperature } = {}) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: temperature,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// 404
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    errorMsg: "help Article not found",
    name: "Samuel Osarieme",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    errorMsg: "Page not found",
    name: "Samuel Osarieme",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
