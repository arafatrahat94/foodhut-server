const express = require("express");
const { foodHut } = require("./mongodb");
const { app, port } = require("./index");
const TodaysOfferRoutes = express.Router();

const TodaysOfferCollection = foodHut.collection("Offer");

TodaysOfferRoutes.get("/Offers", async (req, res) => {
  const result = await TodaysOfferCollection.find().toArray();
  res.send(result);
});
TodaysOfferRoutes.get("/OfferedProducts", async (req, res) => {
  console.log(req.query);
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit);
  const skip = page * limit;
  const foodCount = await TodaysOfferCollection.countDocuments();
  const result = await TodaysOfferCollection.find()
    .skip(skip)
    .limit(limit)
    .toArray();
  // console.log(result);
  res.send({ count: foodCount, data: result });
});
module.exports = TodaysOfferRoutes;
