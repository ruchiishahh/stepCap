import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import SearchBar from "./SearchBar";

export default class BookService extends React.Component {
  constructor() {
    super();
    this.state = {
      booking_name: "Teach Modern Computer Skills to Elderly",
      //booking_date: new Date(),
      booking_date: "",
      booking_duration: "",
      booking_optional_note: "",
      booking_price: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChangeCalendar = this.onChangeCalendar.bind(this);
  }

  componentDidMount() {
    const { service_id } = this.props.match.params;
    const { provider_id } = this.props.location.state;
    serviceInfo = {
        service_id: service_id,
        provider_id: provider_id
    }
    axios.post('http://localhost:8080/service-info', serviceInfo)
      .then((data) => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  onChangeCalendar = (booking_date) => this.setState({ booking_date });

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <main>
        <form action="/book-new-service" method="POST">
          <div class="book-service-all-container">
            <div class="book-service-header-container">
              <div class="logo-container">theCOMMONS</div>
              <div class="searchbar-container">
                <SearchBar />
              </div>
              <div class="options-container">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile"></Link>
                <button>Logout</button>
              </div>
            </div>

            <div class="book-service-body-container">
              <div class="book-service-info-container">
                <div class="book-service-info-title">
                  Teach Modern Computer Skills to Elderly
                </div>
                <div class="book-service-info-provider">
                  <small>&nbsp; By: Bob John</small>
                </div>
                <div class="book-service-info-avg-rating"></div>
              </div>
              <div class="book-service-f6f6f6-theme">
                <div class="book-service-row">
                  <div class="book-service-image-container">
                    <img></img>
                  </div>
                  <div class="book-service-booking-container">
                    <div class="book-service-title">Select a Date</div>

                    <Calendar
                      className="book-service-calendar"
                      //name="booking_date"
                      //type="date"
                      //onChange={this.onChangeCalendar}
                      //value={this.state.booking_date}
                    />

                    <input
                      name="booking_name"
                      placeholder="Teach Modern Computer Skills to Elderly"
                      class="book-service-paragraph"
                      value={this.state.booking_name}
                      onChange={this.handleChange}
                    />

                    <input
                      name="booking_date"
                      placeholder="Booking Date"
                      class="book-service-paragraph"
                      type="date"
                      value={this.state.booking_date}
                      onChange={this.handleChange}
                    />

                    <input
                      name="booking_duration"
                      placeholder="Booking Duration (mins)"
                      class="book-service-paragraph"
                      type="number"
                      value={this.state.booking_duration}
                      onChange={this.handleChange}
                    />
                    <input
                      name="booking_optional_note"
                      class="book-service-paragraph"
                      placeholder="Booking Optional Note"
                      value={this.state.booking_optional_note}
                      onChange={this.handleChange}
                    />
                    <input
                      name="booking_price"
                      class="book-service-paragraph"
                      placeholder="Booking Price ($)"
                      type="number"
                      value={this.state.booking_price}
                      onChange={this.handleChange}
                    />

                    <div class="book-service-center">
                      <Button
                        class="book-service-button"
                        variant="contained"
                        color="secondary"
                        type="submit"
                      >
                         Book Now 
                      </Button>
                    </div>
                    {/* <div class="book-service-options-container">
                                    <div class="book-service-option">
                                        <div class="book-service-column">
                                            <div class="book-service-option-title"></div>
                                            <div class="book-service-price"></div>
                                        </div>
                                        <div></div>
                                    </div>
                                </div> */}
                  </div>
                </div>
                <div class="book-service-row">
                  <div class="book-service-detail-container">
                    <div class="book-service-detail-section">
                      <div
                        id="book-service-detail-title"
                        class="book-service-title"
                      >
                        Overview
                      </div>
                      <div class="book-service-paragraph">
                        I will teach all the fundamental skills on a computer so
                        that your family member can be self sufficient. Package
                        includes walkthrough of how to download software
                        independently, learing Microsoft Word, Powerpoint, and
                        excel, how to create and check your email, and helpful
                        sites to use. I will also install anti-malware software
                        for your prefered browser.
                      </div>
                    </div>
                    <div class="book-service-detail-section">
                      <div
                        id="book-service-detail-title"
                        class="book-service-title"
                      >
                        Highlights
                      </div>
                      <div class="book-service-highlight">
                        Learn Microsoft Word, Powerpoint, Excel
                      </div>
                      <div class="book-service-highlight">
                        Learn how to setup and use an online email account
                      </div>
                      <div class="book-service-highlight">
                        Learn how to install software online
                      </div>
                      <div class="book-service-highlight">
                        Learn how detect and avoid viruses and scams
                      </div>
                    </div>
                  </div>
                  <div class="book-service-factcard">
                    <div
                      id="book-service-fact-title"
                      class="book-service-title"
                    >
                      Key Details
                    </div>
                    <div class="book-service-facts-container">
                      <div class="book-service-fact">
                        <i class="fas fa-location-arrow"></i>I will meet you at
                        your home
                      </div>
                      <div class="book-service-fact">
                        <i class="far fa-clock"></i>1-2 hours
                      </div>
                      <div class="book-service-fact">
                        <i class="fas fa-exclamation-circle"></i>You will need a
                        working computer
                      </div>
                      <div class="book-service-fact">
                        <i class="fas fa-phone"></i>(124) 315-5592
                      </div>
                    </div>
                  </div>
                </div>
                <div class="book-service-row">
                  <div class="book-service-review-container">
                    <div class="book-service-detail-section">
                      <div
                        id="book-service-review-title"
                        class="book-service-title"
                      >
                        Reviews
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <hr />
        <h2> Entered information: </h2>
        <p>Your Booking Name: {this.state.booking_name}</p>

        <p>
          Your Booking Date:
          {this.state.booking_date}
        </p>
        <p>Your Booking Duration: {this.state.booking_duration} (mins)</p>
        <p>Your Booking Optional Note: {this.state.booking_optional_note} </p>
        <p>Your Booking Price: ${this.state.booking_price} </p>
      </main>
    );
  }
}

{
  /* <div class="book-service-info-container"></div>
<div class="book-service-calendar-container">
    <div class="book-service-title">Select a Date</div>
    <Calendar onChange={this.onChangeCalendar} value={this.state.date} />
</div>
<div class="book-service-options-container">
    <div class="book-service-options-number">
        <input ></input>
    </div>
</div> */
}
