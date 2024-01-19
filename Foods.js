const express = require("express");
const { foodHut } = require("./mongodb");
const { app, port } = require("./index");
const FoodsCollection = foodHut.collection("Foods");

const Foods = express.Router();

Foods.get("/Foods", async (req, res) => {
  const category = req.query.category;
  const query = { category: category };
  const check = await FoodsCollection.find(query).toArray();

  res.send(check);
});

module.exports = Foods;
