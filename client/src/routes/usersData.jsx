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

const UsersData = (props) => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">Users Data</Typography>
      {props.users.map((user) => (
        <Card className={classes.root} variant="outlined" key={user._id}>
          <CardContent>
            <Typography component="p">
              User Name : <b>{user.name}</b>
            </Typography>
            <Typography component="p">
              User Email : <b>{user.email}</b>
            </Typography>
            <Typography component="p">
              Admin Status : <b>{user.isAdmin === true ? "True" : "False"}</b>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default UsersData;
