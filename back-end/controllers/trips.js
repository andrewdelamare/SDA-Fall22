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

//"departure": vals[0],
//"return": vals[1],
//"depId": vals[2],
//"depNm": vals[3],
//"retId": vals[4],
//"retNm": vals[5],
//"distance": vals[6],
//"duration": vals[7],

//tripRouter.post("/trip",
//  body.("Departure").isDate(),
//  body.("Return").isDate(),
//  body.apply("Departure station id")
//  async (req, res) => {
//
//})
