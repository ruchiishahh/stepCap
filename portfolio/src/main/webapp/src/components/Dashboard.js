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
        confirmedReqInfo: [], 
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
            this.setState({
                pendingReqInfo: res.data
            });        
        });
    axios.post("http://localhost:8080/list-confirmed", userInfo)
        .then((res) => {
            console.log(res.data);
            this.setState({
                confirmedReqInfo: res.data
            });        
        });
  }

  render() {
    return (
      <div class="dashboard-page-container">
        <Navbar user_id={this.props.userInfo.user_id} />
        <h1 className="dashboard-center-title">Dashboard Page</h1>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3}>
                <h2 className="dashboard-requests-center-title">
                  Here are your Pending Requests:
                </h2>
              </Paper>
              { 
                (this.state.pendingReqInfo.length>0) ? 
                    this.state.pendingReqInfo.map((pair) => (
                        <PendingReqs user_id={this.props.userInfo.user_id} name={pair.booking.booking_name} date={pair.booking.booking_date} duration={pair.booking.booking_duration} note={pair.booking_optional_note} price={pair.booking.booking_price} status={pair.status}/>
                    ))
                    :
                    <div>This list is empty, start browsing now!</div>
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper>
                <h2 className="dashboard-requests-center-title">
                  Here are your Confirmed Requests:
                </h2>
              </Paper>
                { 
                    (this.state.confirmedReqInfo.length>0) ? 
                        this.state.confirmedReqInfo.map((pair) => (
                            <ConfirmedReqs user_id={this.props.userInfo.user_id} name={pair.booking.booking_name} date={pair.booking.booking_date} duration={pair.booking.booking_duration} note={pair.booking.booking_optional_note} price={pair.booking.booking_price} status={pair.status}/>
                        ))
                        :
                        <div>Confirmed bookings will show up here.</div>
                }
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
