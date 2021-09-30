import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Container, Tab, Tabs, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import UsersData from "./usersData";
import FlightData from "./flightData";
import BookingsData from "./bookingsData";
import { getBookings } from "../services/bookingService";
import { getFlights } from "./../services/flightService";
import { getUsers } from "../services/userService";

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: "5px",
  },
}));

const AdminPage = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(2);
  const [bookings, setBookings] = useState([]);
  const [flights, setFlights] = useState([]);
  const [users, setUsers] = useState([]);

  const getAllBookings = async () => {
    const { data: bookings } = await getBookings();
    setBookings(bookings);
    console.log(bookings);
  };

  const getAllFlights = async () => {
    const { data: flights } = await getFlights();
    setFlights(flights);
  };

  const getAllUsers = async () => {
    const { data: users } = await getUsers();
    setUsers(users);
    console.log(users);
  };

  useEffect(() => {
    getAllBookings();
    getAllFlights();
    getAllUsers();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" className={classes.content}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
        centered
      >
        <Tab label="Users Data" />
        <Tab label="Bookings Data" />
        <Tab label="Flights Data" />
      </Tabs>
      {value === 0 && (
        <TabContainer>
          <UsersData users={users} />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <BookingsData bookings={bookings} />
        </TabContainer>
      )}
      {value === 2 && (
        <TabContainer>
          <FlightData flights={flights} />
        </TabContainer>
      )}
    </Container>
  );
};

export default AdminPage;

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
