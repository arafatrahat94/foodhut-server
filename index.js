const express = require("express");
const app = express();
const cors = require(`cors`);
const { foodHut, connectToDatabase } = require("./mongodb");
const port = process.env.PORT || 7000;
const userRoutes = require("./user");
const TodaysOfferRoutes = require("./TodaysOffer");
const Foods = require("./Foods");

const Cart = require("./Cart");
// middleware
app.use(cors());
app.use(express.json());

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("FoodHUt");
});

app.listen(port, () => {
  console.log("food are hot");
});

app.use(userRoutes);
app.use(TodaysOfferRoutes);
app.use(Cart);
app.use(Foods);
module.exports = { app, port, express, cors };
