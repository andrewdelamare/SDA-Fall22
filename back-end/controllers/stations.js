const express = require("express");
const Station = require("../models/station");
const stationRouter = express.Router();

stationRouter.get("/stations", async (req, res) => {
  const result = await Hour.find({}).limit(100).lean();
  return res.status(200).json(result);
});
stationRouter.get("/stations/:page", async (req, res) => {
  const page = req.params.page * 100;

  const result = await Hour.find({}).skip(page).limit(100).lean();
  return res.status(200).json(result);
});
