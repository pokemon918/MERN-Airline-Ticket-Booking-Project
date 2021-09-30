const auth = require("../middleware/auth");
const { Booking } = require("../models/booking");
const { Flight } = require("../models/flight");
const express = require("express");
const router = express.Router();
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const admin = require("../middleware/admin");

router.get("/", auth, async (req, res) => {
  const bookings = await Booking.find().sort("name");
  res.send(bookings);
});

router.get("/:id", auth, async (req, res) => {
  const userId = req.params.id;
  const booking = await Booking.find({ userId: userId });
  if (!booking) return res.status(404).send("Bookings not Found");
  res.send(booking);
});

router.post("/", auth, async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.token.email,
      source: req.body.token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.ticketPrice * 100,
        customer: customer.id,
        currency: "inr",
        receipt_email: req.body.token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      let booking = new Booking({
        userId: req.body.userId,
        userName: req.body.userName,
        email: req.body.email,
        flightId: req.body.flightId,
        airlineName: req.body.airlineName,
        flightNumber: req.body.flightNumber,
        bookedSeats: req.body.noOfSeats,
        flightTime: moment(req.body.flightTime).format("HH:MM A"),
        flightDate: moment(req.body.flightDate).format("DD-MM-YYYY"),
        source: req.body.source,
        destination: req.body.destination,
        sourceTerminal: req.body.sourceTerminal,
        destinationTerminal: req.body.destinationTerminal,
        ticketPrice: req.body.ticketPrice,
        transactionId: uuidv4(),
      });

      booking = await booking.save();

      let flight = await Flight.findByIdAndUpdate(
        req.body.flightId,
        { $inc: { flightSeats: -req.body.noOfSeats } },
        { new: true }
      );
    }

    res.send(true);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
