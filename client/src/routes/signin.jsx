import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link, Redirect } from "react-router-dom";
import auth from "../services/authService";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Signin = (props) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  const clickSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.login(values.email, values.password);
      const { state } = props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setValues({ ...values, error: ex.response.data });
      }
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  if (auth.getCurrentUser()) return <Redirect to="/" />;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={clickSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            value={values.email}
            onChange={handleChange("email")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange("password")}
          />

          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Typography
            component={Link}
            to="/signup"
            className={classes.link}
            color="secondary"
          >
            Don't have an account? Sign Up
          </Typography>
        </form>
      </div>
    </Container>
  );
};

export default Signin;
