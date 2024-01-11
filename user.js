const express = require("express");
const { foodHut } = require("./mongodb");
const { app, port } = require("./index");
const userCollection = foodHut.collection("user");

const userRoutes = express.Router();
userRoutes.get("/User", async (req, res) => {
  const query = await req.query.email;
  const filter = { email: query };
  const result = await userCollection.findOne(filter);
  res.send(result);
});
userRoutes.post("/User", async (req, res) => {
  const body = await req.body;
  const query = { email: body.email };
  const find = await userCollection.findOne(query);
  if (find) {
    return res.send({ message: "user already exist" });
  }
  const result = await userCollection.insertOne(body);
  res.send(result);
});

module.exports = userRoutes;
