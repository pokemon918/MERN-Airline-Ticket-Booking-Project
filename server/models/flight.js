const mongoose = require("mongoose");

const Flight = mongoose.model(
  "Flights",
  new mongoose.Schema({
    airlineName: { type: String, trim: true, required: true },
    flightNumber: { type: String, trim: true, required: true },
    flightTime: { type: Date, required: true },
    flightDate: { type: Date, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    sourceTerminal: { type: String, trim: true, required: true },
    destinationTerminal: { type: String, trim: true, required: true },
    tripType: { type: String, required: true },
    flightClass: { type: String, required: true },
    flightSeats: { type: Number, required: true },
    ticketPrice: { type: Number, required: true },
    cancelledTicket: [],
  })
);

exports.Flight = Flight;
