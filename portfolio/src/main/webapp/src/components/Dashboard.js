import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PendingReqs from "./bookingcomponents/PendingReqs";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Navbar from "./Navbar"

export default class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user_id: "",
        pendingReqInfo: [],  
    }
  }

  componentDidMount() {
    console.log(this.props);
    let userInfo = {
        user_id: this.props.userInfo.user_id,
    };
    console.log(userInfo);
    axios.post("http://localhost:8080/list-pending", userInfo)
        .then((res) => {
            console.log(res.data);
            // this.setState({ pendingReqInfo: res.data });        
        });
  }

  render() {
    return (
      <div class="dashboard-page-container">
        <Navbar />
        <h1 className="dashboard-center-title">Dashboard Page</h1>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3}>
                <h2 className="dashboard-requests-center-title">
                  Here are your Pending Requests
                </h2>
              </Paper>
                {this.state.pendingReqInfo.map((info) => (
                  <PendingReqs name={info.booking_name} date={info.booking_date} duration={info.booking_duration} note={info.booking_optional_note} price={info.booking_price}/>
                ))}
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
      </div>
    );
  }
}
