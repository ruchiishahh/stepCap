import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PendingReqs from "./bookingcomponents/PendingReqs";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default class BookingForm extends React.Component {
  constructor() {
    super();
    this.handleShowInfo = this.handleShowInfo.bind(this);
  }

  state = {
    persons: [],
  };

  handleShowInfo(event) {
    console.log("Inside of showInfo");
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      console.log(res);
      this.setState({ persons: res.data });
    });
  }

  componentdidMount() {}

  render() {
    return (
      <main>
        <h1 className="dashboard-center-title">Dashboard Page</h1>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3}>
                <h2 className="dashboard-requests-center-title">
                  Here are your Pending Requests
                </h2>
              </Paper>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleShowInfo}
                type="submit"
              >
                Show Info
              </Button>
              <ul>
                {this.state.persons.map((person) => (
                  <li> {person.name}</li>
                ))}
              </ul>
              <PendingReqs />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper>
                <h2 className="dashboard-requests-center-title">
                  Here are your Confirmed Requests
                </h2>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </main>
    );
  }
}
