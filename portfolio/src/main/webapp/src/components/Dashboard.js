import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PendingReqs from "./bookingcomponents/PendingReqs";

export default class BookingForm extends React.Component {
  constructor() {
    super();
  }
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