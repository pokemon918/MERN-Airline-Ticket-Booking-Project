import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Paper,
  Button,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  titleHeader: {
    paddingTop: "5px",
  },
  divider: {
    marginTop: "10px",
    marginBottom: "10px",
  },
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
const FlightData = (props) => {
  const classes = useStyles();

  let dollarIndianLocale = Intl.NumberFormat("en-IN");
  return (
    <Box>
      <Box className={classes.titleHeader}>
        <Typography variant="h4">Flight Data</Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
          component={Link}
          to={`/edit-flight-data/new`}
        >
          Add Flight
        </Button>
      </Box>
      <Divider className={classes.divider} />
      <Container maxWidth="lg" className={classes.content}>
        <Box className={classes.demo}>
          <List>
            {props.flights.map((flight) => (
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
                      to={`/edit-flight-data/${flight._id}`}
                    >
                      Edit Flight
                    </Link>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default FlightData;
