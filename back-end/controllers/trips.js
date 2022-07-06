const express = require("express");
const Trip = require("../models/trip");
const tripRouter = express.Router();
const { body, validationResult } = require("express-validator");

//Departure,
//Return,
//Departure station id,
//Departure station name,
//Return station ,
//Return station name,
//Covered distance (m),
//Duration (sec.)

// departure: Date,
// return: Date,
// depId: Number,
// depNm: String,
// retId: Number,
// retNm: String,
// distance: Number,
// duration: Number,

//"departure": vals[0],
//"return": vals[1],
//"depId": vals[2],
//"depNm": vals[3],
//"retId": vals[4],
//"retNm": vals[5],
//"distance": vals[6],
//"duration": vals[7],

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
