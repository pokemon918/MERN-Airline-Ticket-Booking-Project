import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import { Box, Toolbar } from "@material-ui/core";
import MenuBar from "./components/menubar";
import Home from "./routes/home";
import NotFound from "./routes/not-found";
import Signin from "./routes/signin";
import Signup from "./routes/Signup";
import Signout from "./routes/signout";
import Profile from "./routes/profile";
import AdminPage from "./routes/adminPage";
import EditFlightData from "./routes/EditFlightData";
import TicketBooking from "./routes/ticketBooking";
import { getMe } from "./services/currentUserService";

const App = () => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    const { data: user } = await getMe();
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box>
      <MenuBar user={user} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Box>
          <Switch>
            <Route path="/page-not-found" component={NotFound} />
            <ProtectedRoute
              path="/edit-flight-data/:id"
              component={EditFlightData}
            />
            <ProtectedRoute path="/admin-page" component={AdminPage} />
            <ProtectedRoute
              path="/ticket-booking/:id"
              render={(props) => <TicketBooking {...props} user={user} />}
            />
            <ProtectedRoute
              path="/profile"
              render={(props) => <Profile {...props} user={user} />}
            />
            <Route path="/signout" component={Signout} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/home" component={Home} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/page-not-found" />
          </Switch>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
