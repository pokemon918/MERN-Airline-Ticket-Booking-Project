import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: "10px",
    paddingTop: "20px",
    paddingBottom: "30px",
    paddingLeft: "30px",
    paddingRight: "10px",
  },
  content: {
    paddingTop: "5px",
  },
  filterButton: {
    width: "100%",
    marginTop: "10px",
  },
  headerTitle: {
    textAlign: "center",
    marginBottom: "10px",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.header}>
      <Typography variant="h4" className={classes.headerTitle}>
        BOOK YOUR AIR TICKET
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="source" color="secondary">
              Source
            </InputLabel>
            <Select
              color="secondary"
              labelId="source"
              id="source"
              value={props.source}
              label="source"
              onChange={props.handleChange("source")}
            >
              <MenuItem value="All">All</MenuItem>
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
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="destination" color="secondary">
              Destination
            </InputLabel>
            <Select
              labelId="destination"
              color="secondary"
              id="destination"
              value={props.destination}
              label="destination"
              onChange={props.handleChange("destination")}
            >
              <MenuItem value="All">All</MenuItem>
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
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid item xs={12} sm={2}>
            <KeyboardDatePicker
              variant="dialog"
              format="dd/MM/yyyy"
              fullWidth
              id="date-picker-dialog"
              label="Departure"
              value={props.selectedDate}
              onChange={props.handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel id="class" color="secondary">
              Class Type
            </InputLabel>
            <Select
              labelId="class"
              color="secondary"
              id="class"
              value={props.class}
              label="class"
              onChange={props.handleChange("class")}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Economy"}>Economy</MenuItem>
              <MenuItem value={"Business"}>Business</MenuItem>
              <MenuItem value={"Premium"}>Premium</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel id="JourneyType" color="secondary">
              Journey Type
            </InputLabel>
            <Select
              labelId="JourneyType"
              color="secondary"
              id="JourneyType"
              value={props.journeyType}
              label="JourneyType"
              onChange={props.handleChange("journeyType")}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"OneWay"}>One Way</MenuItem>
              <MenuItem value={"RoundTrip"}>Round Trip</MenuItem>
              <MenuItem value={"MultiCity"}>Multi City</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
