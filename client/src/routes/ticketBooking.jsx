import React, { useState, useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import { getFlight } from "./../services/flightService";
import moment from "moment";
import FlightDetails from "../components/flightDetails";
import { getMe } from "./../services/currentUserService";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import StripeCheckout from "react-stripe-checkout";
import { stripePublicKey } from "../config.json";
import { saveBooking } from "../services/bookingService";

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: "5px",
    marginBottom: "100px",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    textAlign: "center",
  },
  paper: {
    padding: "10px",
  },
  ticketDetails: {
    marginTop: "10px",
  },
}));

const TicketBooking = (props) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [flight, setFlight] = useState({});
  const [values, setValues] = useState({
    id: "",
    name: "",
    email: "",
    seats: 0,
  });

  const getUser = async () => {
    const { data: user } = await getMe();
    setValues({
      ...values,
      id: user._id,
      name: user.name,
      email: user.email,
    });
  };

  const getFlightDetails = async () => {
    const { data: flight } = await getFlight(props.match.params.id);
    setFlight(flight);
  };

  useEffect(() => {
    getFlightDetails();
    getUser();
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  let totalAmount = Math.round(values.seats * flight.ticketPrice);
  let gstAmount = Math.round((totalAmount * 5) / 100);
  let sumAmount = Math.round(totalAmount + gstAmount);
  const publicKey = stripePublicKey;

  const onToken = async (token) => {
    try {
      const data = {
        userId: values.id,
        userName: values.name,
        email: values.email,
        flightId: flight._id,
        airlineName: flight.airlineName,
        flightNumber: flight.flightNumber,
        noOfSeats: values.seats,
        flightTime: flight.flightTime,
        flightDate: selectedDate,
        source: flight.source,
        destination: flight.destination,
        sourceTerminal: flight.sourceTerminal,
        destinationTerminal: flight.destinationTerminal,
        ticketPrice: sumAmount,
        token: token,
      };
      const { data: redirect } = await saveBooking(data);
      setRedirect(redirect);
      // console.log(redirect);
    } catch (ex) {
      console.log("error");
    }
  };

  if (redirect === true) {
    window.location = "/profile";
  }

  return (
    <Container maxWidth="lg" className={classes.content}>
      <Typography variant="h6" className={classes.title}>
        Book Your Tickets
      </Typography>
      <Box component={Paper} className={classes.paper}>
        <FlightDetails flight={flight} />
      </Box>
      <Box className={classes.ticketDetails}>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box component={Paper} className={classes.paper}>
              <Typography variant="h6" className={classes.title}>
                Ticket Details
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                type="name"
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange("name")}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange("email")}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="seats"
                type="number"
                label="No Of Seats"
                name="seats"
                InputProps={{ inputProps: { min: 1, max: 4 } }}
                value={values.seats}
                onChange={handleChange("seats")}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {" "}
                <KeyboardDatePicker
                  variant="dialog"
                  format="dd/MM/yyyy"
                  fullWidth
                  disablePast
                  id="date-picker-dialog"
                  label="Departure"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box component={Paper} className={classes.paper}>
              <Typography variant="h6" className={classes.title}>
                Check Out
              </Typography>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom>
                    No Of Seats :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom>
                    <b>{values.seats}</b>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom>
                    Sum Amount :
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom>
                    <b>₹{totalAmount}</b>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom>
                    GST Amount (5%):
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom>
                    <b>₹{gstAmount}</b>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom>
                    Total Amount:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom>
                    <b>₹{sumAmount}</b>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <StripeCheckout
                    token={onToken}
                    amount={sumAmount * 100}
                    currency="INR"
                    stripeKey={publicKey}
                  >
                    <Button variant="contained" color="primary" fullWidth>
                      Pay Now
                    </Button>
                  </StripeCheckout>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TicketBooking;
