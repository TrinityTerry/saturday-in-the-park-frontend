import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { DataManager } from "../modules";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const history = useHistory();
  const classes = useStyles();
  const [registerForm, setRegisterForm] = useState({
    username: "OliviaTerry",
    email: "oliviaterry@gmail.com",
    password: "iamgood",
    firstName: "Olivia",
    lastName: "Terry",
    familyMembers: 6,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setRegisterForm((prevState) => {
      let newObj = { ...prevState };
      newObj[name] = value;
      return newObj;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
      first_name: registerForm.firstName,
      last_name: registerForm.lastName,
      family_members: Number(registerForm.familyMembers),
    };

    DataManager.registerUser(newUser).then((resp) => {
      //
      if (resp.error) {
        setErrorMessage(
          `${Object.values(resp)[0].split(".")[1]} already taken`
        );
      } else {
        history.push("/login");
      }
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <Link to="/">
        <h1>Go back home</h1>
      </Link>
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {errorMessage && (
          <Typography component="h3" variant="h5">
            {errorMessage}
          </Typography>
        )}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={registerForm.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={registerForm.lastName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={registerForm.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={registerForm.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                required
                type="number"
                fullWidth
                id="familyMembers"
                label="Family Members"
                name="familyMembers"
                autoComplete="familyMembers"
                min={0}
                value={registerForm.familyMembers}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={registerForm.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
