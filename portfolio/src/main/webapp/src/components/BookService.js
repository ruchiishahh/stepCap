import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Calendar from 'react-calendar';

export default class BookService extends React.Component {
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
    }
  
    onChangeCalendar = date => this.setState({date})
  
    render() {
      return (
        <div class="book-service-all-container">
            <div class="book-service-main-container">
                <div class="book-service-info-container"></div>
                <div class="book-service-calendar-container">
                    <div class="book-service-title">Select a Date</div>
                    <Calendar onChange={this.onChangeCalendar} value={this.state.date}/>
                </div>
                <div class=""></div>
            </div>
        </div>
      );
    }
  }
  