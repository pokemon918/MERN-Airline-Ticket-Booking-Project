import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Container,
  Grid,
  TextField,
  Button,
  CssBaseline,
  Typography,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import FlightOutlinedIcon from "@material-ui/icons/FlightOutlined";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { editFlight } from "../services/flightService";
import { getFlight } from "./../services/flightService";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    maxWidth: "600px", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditFlightData = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [values, setValues] = useState({
    airlineName: "",
    flightNumber: "",
    source: "",
    destination: "",
    sourceTerminal: "",
    destinationTerminal: "",
    tripType: "",
    flightClass: "",
    flightSeats: "",
    ticketPrice: "",
    error: "",
  });

  const getFlightByFlightId = async () => {
    const { data: flight } = await getFlight(props.match.params.id);
    setValues({
      ...values,
      airlineName: flight.airlineName,
      flightNumber: flight.flightNumber,
      source: flight.source,
      destination: flight.destination,
      sourceTerminal: flight.sourceTerminal,
      destinationTerminal: flight.destinationTerminal,
      tripType: flight.tripType,
      flightClass: flight.flightClass,
      flightSeats: flight.flightSeats,
      ticketPrice: flight.ticketPrice,
    });
    console.log(flight);
  };

  useEffect(() => {
    getFlightByFlightId();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (date) => {
    setSelectedTime(date);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async (e) => {
    e.preventDefault();
    try {
      const flightData = {
        id: props.match.params.id,
        airlineName: values.airlineName,
        flightNumber: values.flightNumber,
        flightTime: selectedTime,
        flightDay: selectedDate,
        source: values.source,
        destination: values.destination,
        sourceTerminal: values.sourceTerminal,
        destinationTerminal: values.destinationTerminal,
        tripType: values.tripType,
        flightClass: values.flightClass,
        flightSeats: values.flightSeats,
        ticketPrice: values.ticketPrice,
      };
      const response = await editFlight(flightData);
      props.history.push("/admin-page");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setValues({ ...values, error: ex.response.data });
      }
    }
  };

  return (
    <Container component="main" maxWidth="md" style={{ marginBottom: "100px" }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FlightOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          {props.match.params.id === "new"
            ? "ADD NEW FLIGHT"
            : "EDIT FLIGHT DATA"}
        </Typography>
        <form className={classes.form} onSubmit={clickSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="text"
                id="airlineName"
                label="Airline Name"
                name="airlineName"
                value={values.airlineName}
                onChange={handleChange("airlineName")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="text"
                id="flightNumber"
                label="Flight Number"
                name="flightNumber"
                value={values.flightNumber}
                onChange={handleChange("flightNumber")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="text"
                id="sourceTerminal"
                label="Source Terminal"
                name="sourceTerminal"
                value={values.sourceTerminal}
                onChange={handleChange("sourceTerminal")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="text"
                id="destinationTerminal"
                label="Destination Terminal"
                name="destinationTerminal"
                value={values.destinationTerminal}
                onChange={handleChange("destinationTerminal")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                id="flightSeats"
                label="Flight Seats"
                name="flightSeats"
                value={values.flightSeats}
                onChange={handleChange("flightSeats")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                id="ticketPrice"
                label="Ticket Price"
                name="ticketPrice"
                value={values.ticketPrice}
                onChange={handleChange("ticketPrice")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="JourneyType" color="secondary">
                  Journey Type
                </InputLabel>
                <Select
                  labelId="tripType"
                  color="secondary"
                  id="tripType"
                  value={values.tripType}
                  label="Tip Type"
                  onChange={handleChange("tripType")}
                >
                  <MenuItem value={"OneWay"}>One Way</MenuItem>
                  <MenuItem value={"RoundTrip"}>Round Trip</MenuItem>
                  <MenuItem value={"MultiCity"}>Multi City</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="flightClass" color="secondary">
                  Flight Class
                </InputLabel>
                <Select
                  labelId="flightClass"
                  color="secondary"
                  id="flightClass"
                  value={values.flightClass}
                  label="flightClass"
                  onChange={handleChange("flightClass")}
                >
                  <MenuItem value={"Economy"}>Economy</MenuItem>
                  <MenuItem value={"Business"}>Business</MenuItem>
                  <MenuItem value={"Premium"}>Premium</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="source" color="secondary">
                  Source
                </InputLabel>
                <Select
                  labelId="source"
                  color="secondary"
                  id="source"
                  value={values.source}
                  label="Source"
                  onChange={handleChange("source")}
                >
                  <MenuItem value="Chennai">Chennai</MenuItem>
                  <MenuItem value="Coimbatore">Coimbatore</MenuItem>
                  <MenuItem value="Madurai">Madurai</MenuItem>
                  <MenuItem value="Tiruchirapalli">Tiruchirapalli</MenuItem>
                  <MenuItem value="Tuticorin">Tuticorin</MenuItem>
                  <MenuItem value="Salem">Salem</MenuItem>
                  <MenuItem value="Puducherry">Puducherry</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="destination" color="secondary">
                  Destination
                </InputLabel>
                <Select
                  labelId="destination"
                  color="secondary"
                  id="destination"
                  value={values.destination}
                  label="destination"
                  onChange={handleChange("destination")}
                >
                  <MenuItem value="Chennai">Chennai</MenuItem>
                  <MenuItem value="Coimbatore">Coimbatore</MenuItem>
                  <MenuItem value="Madurai">Madurai</MenuItem>
                  <MenuItem value="Tiruchirapalli">Tiruchirapalli</MenuItem>
                  <MenuItem value="Tuticorin">Tuticorin</MenuItem>
                  <MenuItem value="Salem">Salem</MenuItem>
                  <MenuItem value="Puducherry">Puducherry</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item sm={12}>
                <KeyboardDatePicker
                  variant="dialog"
                  format="dd/MM/yyyy"
                  fullWidth
                  id="date-picker-dialog"
                  label="Departure"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item sm={12}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Flight Time"
                  fullWidth
                  value={selectedTime}
                  onChange={handleTimeChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Submit Flight Details
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default EditFlightData;
