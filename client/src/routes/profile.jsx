import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Container, Tab, Tabs, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import About from "./about";
import MyBookings from "./myBookings";
import { getBookingByUserId } from "../services/bookingService";

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: "5px",
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const [bookings, setBookings] = useState([]);

  const getMyBookings = async () => {
    const { data: bookings } = await getBookingByUserId(props.user._id);
    setBookings(bookings);
  };

  useEffect(() => {
    getMyBookings();
  });

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
        <Tab label="About" />
        <Tab label="My Bookings" />
      </Tabs>
      {value === 0 && (
        <TabContainer>
          <About user={props.user} />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <MyBookings user={props.user} bookings={bookings} />
        </TabContainer>
      )}
    </Container>
  );
};

export default Profile;

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
