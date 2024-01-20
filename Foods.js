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

Foods.get("/FoodsPagination", async (req, res) => {
  const category = req.query.category;
  const query = { category: category };
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit);
  const skip = page * limit;
  const foodCount = await FoodsCollection.countDocuments(query);
  const result = await FoodsCollection.find(query)
    .skip(skip)
    .limit(limit)
    .toArray();
  // console.log(result);
  res.send({ count: foodCount, data: result });
});

Foods.get("/Search", async (req, res) => {
  const search = req.query.search;
  let querys = {};
  if (req.query?.search) {
    querys = { name: { $regex: search, $options: "i" } };
  }
  const result = await FoodsCollection.find(querys).sort({ _id: -1 }).toArray();
  res.send(result);
});
module.exports = Foods;
