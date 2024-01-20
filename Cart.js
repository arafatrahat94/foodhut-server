const express = require("express");
const { foodHut } = require("./mongodb");
const Orders = foodHut.collection("orders");
const Cart = express.Router();

Cart.post("/OrderComplete", async (req, res) => {
  const body = req.body;
  const result = await Orders.insertOne(body);
  res.send(result);
});
Cart.get("/Orders", async (req, res) => {
  console.log(req.query);
  const email = req.query.email;
  const query = { userEmail: email };
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit);
  const skip = page * limit;
  const foodCount = await Orders.countDocuments(query);
  const result = await Orders.find(query).skip(skip).limit(limit).toArray();
  // console.log(result);
  if (!result) {
    res.send([]);
    return;
  }
  res.send({ count: foodCount, data: result });
});
module.exports = Cart;
