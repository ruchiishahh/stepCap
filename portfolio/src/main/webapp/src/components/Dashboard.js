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
    data: "",
  };

  handleShowInfo(event) {
    console.log("Inside of showInfo");
    axios.get("http://localhost:8080/list-services")
        .then((res) => {
            console.log(res);
            console.log(res.data);
            //this.setState({ persons: res.data });
        });

    /*fetch('/list-services', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    
    }).then(response => response.json()).then((bookings) => {
        console.log("Inside of fetching");
        console.log("Bookings: " + bookings);
        console.log("Bookings Data: " + bookings.booking_name);
        console.log("Single Booking: " + bookings[0]);
        //bookings.forEach(booking => {
            //this.setState({data: booking.booking_name});
            //console.log("Booking: " + booking);
        //})
    });
    */
    //fetch('/list-services').then(response => console.log("Response" + response.type));
    //fetch('/list-services').then(response => response.json()).then(data => console.log(data));

    //fetch('/list-services').then(response => response.json()).then(data => console.log(data));
    //axios.get("http://localhost:8080/list-services").then((res) => {
    //  console.log(res);
    //  this.setState({ persons: res.data });
    //});
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
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleShowInfo}
                type="submit"
              >
                Show Info
              </Button>
              <ul>
                <li> {this.state.data} </li>
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
