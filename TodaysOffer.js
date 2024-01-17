const express = require("express");
const { foodHut } = require("./mongodb");
const { app, port } = require("./index");
const TodaysOfferRoutes = express.Router();

const TodaysOfferCollection = foodHut.collection("Offer");

TodaysOfferRoutes.get("/Offers", async (req, res) => {
  const result = await TodaysOfferCollection.find().toArray();
  res.send(result);
});
module.exports = TodaysOfferRoutes;
