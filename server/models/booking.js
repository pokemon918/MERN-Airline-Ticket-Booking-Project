const mongoose = require("mongoose");

const Booking = mongoose.model(
  "Bookings",
  new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    flightId: { type: String, required: true },
    airlineName: { type: String, required: true },
    flightNumber: { type: String, trim: true, required: true },
    bookedSeats: { type: Number, required: true },
    flightTime: { type: String, required: true },
    flightDate: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    sourceTerminal: { type: String, trim: true, required: true },
    destinationTerminal: { type: String, trim: true, required: true },
    ticketPrice: { type: Number, required: true },
    transactionId: { type: String, required: true },
    created: { type: Date, default: Date.now },
    status: { type: String, default: "booked" },
  })
);

exports.Booking = Booking;
