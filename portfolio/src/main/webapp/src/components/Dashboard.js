import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      booking_name: "",
      booking_date: "",
      booking_duration: "",
      booking_description: "",
      booking_price: "",
    };
  }
  
  render() {
    return (
      <main>
        <h1>THIS IS THE DASHBOARD!</h1>
        <h2> Pending Requests: </h2>
        
      </main>
    );
  }
}
