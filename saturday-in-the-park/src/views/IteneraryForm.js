import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import { DataManager } from "../modules";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";

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

const IteneraryForm = ({ user, itineraryData = {} }) => {
  const history = useHistory();
  const classes = useStyles();
  const [itineraryForm, setItineraryForm] = useState({
    startTime: itineraryData.startTime || "12:00",
    attraction_id: itineraryData.attraction_id || "0",
    park_id: "0",
  });
  const [attractions, setAttractions] = useState([]);
  const [parks, setParks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // console.log(name, value);

    setItineraryForm((prevState) => {
      let newObj = { ...prevState };
      newObj[name] = value;
      return newObj;
    });
  };

  const getParks = () => {
    DataManager.getParkAreas().then(setParks);
  };

  useEffect(() => {
    getParks();
  }, []);

  useEffect(() => {
    console.log(itineraryForm.park_id);
    if (itineraryForm.park_id !== "0") {
      DataManager.getAttractionByArea(itineraryForm.park_id).then(
        setAttractions
      );
    } else {
      setAttractions([]);
      setItineraryForm((prevState) => {
        let newObj = { ...prevState };
        newObj.attraction_id = 0;
        return newObj;
      });
    }
  }, [itineraryForm.park_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itineraryForm.time == "00:00") {
      setErrorMessage("Please Provide a Time");
    } else if (itineraryForm.attraction_id == 0) {
      setErrorMessage("Please Provide an Attraction");
    } else {
      setErrorMessage("");
      DataManager.postItineraryItem({
        start_time: itineraryForm.startTime,
        attraction_id: itineraryForm.attraction_id,
        customer_id: user.id,
      }).then((resp) => {
        console.log(resp);
        history.push("/myitinerary");
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Attraction to Itinerary
        </Typography>
        {errorMessage && (
          <Typography component="h3" variant="h5">
            {errorMessage}
          </Typography>
        )}

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="time"
                label="Start Time"
                type="time"
                fullWidth
                name="startTime"
                onChange={handleChange}
                value={itineraryForm.startTime}
                defaultValue="07:30"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="park-select">Park</InputLabel>
              <Select
                labelId="park-select"
                fullWidth
                value={itineraryForm.park_id}
                onChange={handleChange}
                name="park_id"
                native
              >
                <option aria-label="None" value={"0"} />
                {parks.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="attraction-select">Attraction</InputLabel>
              <Select
                native
                disabled={itineraryForm.park_id == 0 ? true : false}
                labelId="attraction-select"
                fullWidth
                value={itineraryForm.attraction_id}
                onChange={handleChange}
                name="attraction_id"
              >
                <option aria-label="None" value={"0"} />
                {attractions.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add to Itinerary
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default IteneraryForm;
