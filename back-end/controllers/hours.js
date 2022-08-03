const express = require("express");
const Hour = require("../models/hour");
const hourRouter = express.Router();
const { body, validationResult } = require("express-validator");
const {
  startOfDay,
  startOfHour,
  addHours,
  getSeconds,
  differenceInSeconds,
  format,
  compareDesc,
  subHours,
  parseISO,
} = require("date-fns");

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

hourRouter.post(
  "/trip",
  body("departure").isString(),
  body("ret").isString(),
  body("depId").isNumeric(),
  body("depNm").isString(),
  body("retId").isNumeric(),
  body("retNm").isString(),
  body("distance").isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const dep = parseISO(req.body.departure);
    const ret = parseISO(req.body.ret);
    const duration = differenceInSeconds(ret, dep);
    console.log(dep);
    console.log(ret);
    const trip = {
      departure: dep,
      ret: ret,
      depId: req.body.depId,
      depNm: req.body.depNm,
      retId: req.body.retId,
      retNm: req.body.retNm,
      distance: req.body.distance,
      duration: duration,
    };
    const day = startOfDay(dep);
    const hour = startOfHour(dep);
    const result = await Hour.updateOne(
      { day: day, hour: hour },
      { $push: { trips: trip } }
    );
    console.log(result);
    return res.status(201).json(result);
  }
);
module.exports = hourRouter;
