const express = require("express");
const Hour = require("../models/hour");
const hourRouter = express.Router();
const { body, validationResult } = require("express-validator");
const { startOfDay, startOfHour, addHours } = require("date-fns");

hourRouter.get("/hour", async (req, res) => {
  const result = await Hour.find({}).limit(1).lean();
  return res.status(200).json(result);
});
hourRouter.get("/hours/:day/:hour", async (req, res) => {
  const day = req.params.day;
  const hour = req.params.hour;

  const dayDate = new Date(parseFloat(day));
  const toIso = dayDate.toISOString();
  const hourdate = addHours(dayDate, hour);
  const hourdateiso = hourdate.toISOString();

  const result = await Hour.find({ day: toIso, hour: hourdateiso }).lean();
  return res.status(200).json(result);
});

//tripRouter.get("/trips/find/:")

hourRouter.post(
  "/trip",
  body("departure").isDate(),
  body("ret").isDate(),
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
    const trip = {
      departure: req.body.departure,
      ret: req.body.return,
      depId: req.body.depId,
      depNm: req.body.depNm,
      retId: req.body.retId,
      retNm: req.body.retNm,
      distance: req.body.distance,
      duration: req.body.duration,
    };
    const d = parseISO(trip.departure);
    const day = startOfDay(d);
    const hour = startOfHour(d);
    const result = await Hour.find({ day: day, hour: hour });
    result.trips.push(trip);
    await result.save();
    return res.status(201).json(result);
  }
);
module.exports = hourRouter;
