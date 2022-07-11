const express = require("express");
const Trip = require("../models/trip");
const tripRouter = express.Router();
const { body, validationResult } = require("express-validator");

tripRouter.get("/trips", async (req, res) => {
  const result = await Trip.find({}).sort({ date: 1 }).skip(0).limit(1000);
});
tripRouter.get(
  "/trips/:currentpg/:direction/:filter/:sor",
  async (req, res) => {
    const currentpg = req.params.currentpg * 1000;
    const direction = req.params.direction;
    const filter = req.params.filter;
    const sor = req.params.sor;
    const skipVal =
      direction === "next"
        ? currentpg + 1000
        : direction === "prev"
        ? currentpg - 1000
        : currentpg;
    let sortObj;
    switch (filter) {
      case "dep":
        sortObj = { departure: sor };
        break;
      case "ret":
        sortObj = { return: sor };
        break;
      case "dis":
        sortObj = { distance: sor };
        break;
      case "dur":
        sortObj = { duration: sor };
        break;
      default:
        sortObj = { departure: sor };
        break;
    }
    const result = await Trip.find({})
      .sort(sortObj)
      .skip(skipVal)
      .limit(1000)
      .lean();
    return res.status(200).json(result);
  }
);

//tripRouter.get("/trips/find/:")

tripRouter.post(
  "/trip",
  body("departure").isDate(),
  body("return").isDate(),
  body("depId").isNumeric(),
  body("depNm").isString(),
  body("retId").isNumeric(),
  body("retNm").isString(),
  body("distance").isNumeric(),
  body("duration").isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const trip = new Trip({
      departure: req.body.departure,
      return: req.body.return,
      depId: req.body.depId,
      depNm: req.body.depNm,
      retId: req.body.retId,
      retNm: req.body.retNm,
      distance: req.body.distance,
      duration: req.body.duration,
    });

    const result = await trip.save();
    return res.status(201).json(result);
  }
);
module.exports = [tripRouter];
