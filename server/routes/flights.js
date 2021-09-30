const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Flight } = require("../models/flight");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const flights = await Flight.find().sort("name");
  res.send(flights);
});

router.post("/", auth, async (req, res) => {
  let flight = new Flight({
    airlineName: req.body.airlineName,
    flightNumber: req.body.flightNumber,
    flightTime: req.body.flightTime,
    flightDay: req.body.flightDay,
    source: req.body.source,
    destination: req.body.destination,
    sourceTerminal: req.body.sourceTerminal,
    destinationTerminal: req.body.destinationTerminal,
    tripType: req.body.tripType,
    flightClass: req.body.flightClass,
    flightSeats: req.body.flightSeats,
    ticketPrice: req.body.ticketPrice,
  });

  flight = await flight.save();
  res.send(flight);
});

router.put("/:id", auth, async (req, res) => {
  let flight = await Flight.findById(req.params.id);

  flight.airlineName = req.body.airlineName;
  flight.flightNumber = req.body.flightNumber;
  flight.flightTime = req.body.flightTime;
  flight.flightDay = req.body.flightDay;
  flight.source = req.body.source;
  flight.destination = req.body.destination;
  flight.sourceTerminal = req.body.sourceTerminal;
  flight.destinationTerminal = req.body.destinationTerminal;
  flight.tripType = req.body.tripType;
  flight.flightClass = req.body.flightClass;
  flight.flightSeats = req.body.flightSeats;
  flight.ticketPrice = req.body.ticketPrice;

  flight = await flight.save();
  res.send(flight);
});

router.get("/:id", auth, async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  if (!flight) return res.status(404).send("Flight not Found");
  res.send(flight);
});

router.delete("/:id", auth, async (req, res) => {
  const flight = await Flight.findByIdAndRemove(req.params.id);
  if (!flight) return res.status(404).send("Flight not Found");
  res.send(flight);
});

module.exports = router;
