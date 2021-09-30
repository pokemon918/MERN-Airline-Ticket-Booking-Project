import React from "react";
import { Grid, Typography } from "@material-ui/core";
import moment from "moment";

const FlightDetails = (props) => {
  let dollarIndianLocale = Intl.NumberFormat("en-IN");
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={3}>
        <Typography variant="body1" gutterBottom>
          AirLine :{"  "}
          <b>{props.flight.airlineName}</b>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="body1" gutterBottom>
          Flight Id :{"  "}
          <b>{props.flight.flightNumber}</b>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="body1" gutterBottom>
          Source :{"  "}
          <b>{props.flight.source}</b>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="body1" gutterBottom>
          Destination :{"  "}
          <b>{props.flight.destination}</b>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="body1" gutterBottom>
          Flight Time :{"  "}
          <b>{moment(props.flight.flightTime).format("h:mm a")}</b>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="body1" gutterBottom>
          Ticket Price :{"  "}₹
          <b>{dollarIndianLocale.format(props.flight.ticketPrice)}</b>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="body1" gutterBottom>
          Source Terminal :{"  "}
          <b>{props.flight.sourceTerminal}</b>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="body1" gutterBottom>
          Destination Terminal :{"  "}
          <b>{props.flight.destinationTerminal}</b>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FlightDetails;
