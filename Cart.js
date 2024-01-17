const express = require("express");
const { foodHut } = require("./mongodb");
const Orders = foodHut.collection("orders");
const Cart = express.Router();

Cart.post("/OrderComplete", async (req, res) => {
  const body = req.body;
  const result = await Orders.insertOne(body);
  res.send(result);
});
module.exports = Cart;
