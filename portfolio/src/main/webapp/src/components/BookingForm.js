import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Calendar from 'react-calendar';

export default class BookingForm extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      booking_name: "",
      booking_date: "",
      booking_duration: "",
      booking_description: "",
      booking_price: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeCalendar = date => this.setState({date})

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    //TODO: take this data & send to DataStore
    console.log(this.state);
  }

  render() {
    return (
      <main>
        <h1>Want to Book a Service?</h1>
        <Calendar onChange={this.onChangeCalendar} value={this.state.date}/>
        <form action="/book-new-service" method="POST">
          <input
            name="booking_name"
            placeholder="Booking Name"
            value={this.state.booking_name}
            onChange={this.handleChange}
          />

          <br />

          <input
            name="booking_date"
            placeholder="Booking Date"
            type="date"
            value={this.state.booking_date}
            onChange={this.handleChange}
          />

          <br />

          <input
            name="booking_duration"
            placeholder="Booking Duration (mins)"
            type="number"
            value={this.state.booking_duration}
            onChange={this.handleChange}
          />

          <br />

          <input
            name="booking_description"
            placeholder="Booking Description"
            value={this.state.booking_description}
            onChange={this.handleChange}
          />

          <br />

          <input
            name="booking_price"
            placeholder="Booking Price ($)"
            type="number"
            value={this.state.booking_price}
            onChange={this.handleChange}
          />

          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleSubmit}
            type="submit"
          >
             Book Now 
          </Button>
        </form>
        <Button variant="contained" color="primary">
            <Link to="/Dashboard">
                <li>Dashboard</li>
            </Link>
        </Button>

        <hr />
        <h2> Entered information: </h2>
        <p>Your Booking Name: {this.state.booking_name}</p>
        <p>Your Booking Date: {this.state.booking_date} </p>
        <p>Your Booking Duration: {this.state.booking_duration} (mins)</p>
        <p>Your Booking Description: {this.state.booking_description} </p>
        <p>Your Booking Price: ${this.state.booking_price} </p>
      </main>
    );
  }
}
