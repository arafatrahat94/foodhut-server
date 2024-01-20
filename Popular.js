const express = require("express");
const { foodHut } = require("./mongodb");
const { app, port } = require("./index");
const PopularCollection = foodHut.collection("Popular");

const PopularRoute = express.Router();

PopularRoute.get("/Popular", async (req, res) => {
  const result = await PopularCollection.find().toArray();
  res.send(result);
});

PopularRoute.get("/PopularPagination", async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit);
  const skip = page * limit;
  const foodCount = await PopularCollection.countDocuments();
  const result = await PopularCollection.find()
    .skip(skip)
    .limit(limit)
    .toArray();
  // console.log(result);
  res.send({ count: foodCount, data: result });
});
module.exports = PopularRoute;
