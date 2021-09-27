const express = require("express");

const app = express();

const respond = (res, data) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Content-Type", "application/json");
  res.send(data);
};

app.get("/search", (req, res, next) => {
  const searchQuery = {
    text: req.query.q,
    stores: req.query.stores,
  };

  const searchResult = search(searchQuery);
  respond(res, searchResult);
});

app.get("/getBook", (req, res, next) => {
  const searchQuery = {
    name: req.query.name,
    stores: req.query.stores,
  };

  const bookResults = getBook(searchQuery);
  respond(res, bookResults);
});

app.get("/out", (req, res) => {
  //TODO: add counter
  res.redirect(req.query.link);
});

module.exports = app;
