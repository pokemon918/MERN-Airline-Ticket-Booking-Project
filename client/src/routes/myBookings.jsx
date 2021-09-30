import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  Paper,
  Chip,
  Typography,
  Button,
} from "@material-ui/core";

import moment from "moment";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 8,
  },
});

const MyBookings = (props) => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      {props.bookings.map((booking) => (
        <Card className={classes.root} variant="outlined" key={booking._id}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Booked By : {booking.userName}
              <br />
              Transaction Id : {booking.transactionId}
            </Typography>
            <Typography variant="h5" component="h2">
              From <b>{booking.source}</b> To <b>{booking.destination}</b>
            </Typography>
            <Box className={classes.pos} className={classes.pos}>
              {" "}
              <Typography color="textSecondary">
                {booking.source} : {booking.sourceTerminal}
              </Typography>
              <Typography color="textSecondary">
                {booking.destination} : {booking.destinationTerminal}
              </Typography>
            </Box>
            <Typography variant="body2" component="p">
              Flight Date: <b>{booking.flightDate}</b>
            </Typography>
            <Typography variant="body2" component="p">
              Flight Timing: <b>{booking.flightTime}</b>
            </Typography>
            <Typography variant="body2" component="p">
              Booked on:{" "}
              <b>{moment(booking.created).format("MMMM Do YYYY, h:mm A")}</b>
            </Typography>
            <Typography variant="body2" component="p">
              No Of Seats: <b>{booking.bookedSeats}</b>
            </Typography>
            <Typography variant="body2" component="p">
              Booking Status
              {booking.status === "booked" ? (
                <Chip
                  color="primary"
                  label={booking.status}
                  style={{ marginLeft: "5px" }}
                />
              ) : (
                <Chip
                  color="secondary"
                  label={booking.status}
                  style={{ marginLeft: "5px" }}
                />
              )}
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      ))}
    </Container>
  );
};

export default MyBookings;
