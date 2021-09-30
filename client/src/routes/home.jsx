import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import Header from "../components/header";
import { getFlights } from "./../services/flightService";
import moment from "moment";
import { Link } from "react-router-dom";
import { filterByTripType } from "../utils/tripType";
import { filterByClassType } from "../utils/classFilter";
import { filterByRoutes } from "./../utils/routeFilter";

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: "5px",
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  listCard: {
    marginTop: "5px",
    padding: "10px",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [flights, setFlights] = useState([]);
  const [dense, setDense] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [values, setValues] = useState({
    source: "All",
    destination: "All",
    journeyType: "All",
    class: "All",
  });
  const getAllFlights = async () => {
    const { data: flights } = await getFlights();
    setFlights(flights);
  };

  useEffect(() => {
    getAllFlights();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  let dollarIndianLocale = Intl.NumberFormat("en-IN");

  let flightsByRoutes = filterByRoutes(
    flights,
    values.source,
    values.destination
  );
  let flightsByClass = filterByClassType(flightsByRoutes, values.class);
  let flightsByTrip = filterByTripType(flightsByClass, values.journeyType);
  let allFlights = flightsByTrip;

  return (
    <React.Fragment>
      <Header
        handleDateChange={handleDateChange}
        handleChange={handleChange}
        selectedDate={selectedDate}
        source={values.source}
        destination={values.destination}
        journeyType={values.journeyType}
        class={values.class}
      />
      <Container maxWidth="lg" className={classes.content}>
        {values.source && values.destination === "All" ? (
          <h2>All Flights</h2>
        ) : (
          <h2>
            Flights from {values.source} to {values.destination}
          </h2>
        )}
        {allFlights.length === 0 ? (
          <p>no flights found</p>
        ) : (
          <Box className={classes.demo}>
            <List>
              {allFlights.map((flight) => (
                <ListItem
                  key={flight._id}
                  component={Paper}
                  className={classes.listCard}
                >
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                  >
                    <Grid item xs={12} sm={2}>
                      <Typography variant="h6">{flight.airlineName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="button" display="block" gutterBottom>
                        From{"     "}
                        <b>{flight.source}</b>
                        {"     "}To{"     "}
                        <b>{flight.destination}</b>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                      <Typography variant="button" display="block" gutterBottom>
                        Departure :{" "}
                        <b>{moment(flight.flightTime).format("h:mm a")}</b>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                      <Typography variant="button" display="block" gutterBottom>
                        Ticket Price : ₹
                        <b>{dollarIndianLocale.format(flight.ticketPrice)}</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Link
                        component={Button}
                        variant="contained"
                        color="secondary"
                        to={`/ticket-booking/${flight._id}`}
                      >
                        Book Ticket
                      </Link>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Container>
    </React.Fragment>
  );
};

export default Home;
