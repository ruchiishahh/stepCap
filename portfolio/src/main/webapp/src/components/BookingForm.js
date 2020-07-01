import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default class BookingForm extends React.Component {
  constructor() {
    super();
    this.state = {
      bookingName: "",
      bookingDate: "",
      bookingDuration: "",
      bookingDescription: "",
      bookingPrice: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    this.setState({
      name: value,
    });
  }

  handleSubmit(event) {
    //TODO: take this data & send to DataStore
  }

  render() {
    return (
      <main>
        <h1>Want to Book a Service?</h1>
        <form>
          <input
            name="bookingName"
            placeholder="Booking Name"
            value={this.state.bookingName}
            onChange={this.handleChange}
          />

          <br />

          <input
            name="bookingDate"
            placeholder="Booking Date"
            type="date"
            value={this.state.bookingDate}
            onChange={this.handleChange}
          />

          <br />

          <input
            name="bookingDuration"
            placeholder="Booking Duration (mins)"
            type="number"
            value={this.state.bookingDuration}
            onChange={this.handleChange}
          />

          <br />

          <input
            name="bookingDescription"
            placeholder="Booking Description"
            value={this.state.bookingDescription}
            onChange={this.handleChange}
          />

          <br />

          <input
            name="bookingPrice"
            placeholder="Booking Price ($)"
            type="number"
            value={this.state.bookingPrice}
            onChange={this.handleChange}
          />

          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleSubmit}
          >
             Book Now 
          </Button>
        </form>

        <hr />
        <h2> Entered information: </h2>
        <p>Your Booking Name: {this.state.bookingName}</p>
        <p>Your Booking Date: {this.state.bookingDate} </p>
        <p>Your Booking Duration: {this.state.bookingDuration} (mins)</p>
        <p>Your Booking Description: {this.state.bookingDescription} </p>
        <p>Your Booking Price: ${this.state.bookingPrice} </p>
      </main>
    );
  }
}
