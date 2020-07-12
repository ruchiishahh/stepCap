import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Calendar from 'react-calendar';
import SearchBar from "./SearchBar";

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

    onChangeCalendar = date => this.setState({ date })

    render() {
        return (
            <div class="book-service-all-container">
                <div class="book-service-header-container">
                    <div class="logo-container">theCOMMONS PROJECT</div>
                    <div class="searchbar-container"><SearchBar /></div>
                    <div class="options-container">
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/profile"></Link>
                        <button>Logout</button>
                    </div>
                </div>
                <div class="book-service-body-container">
                    <div class="book-service-info-container">
                        <div class="book-service-info-title">Teach Modern Computer Skills to Elderly</div>
                        <div class="book-service-info-provider"><small>&nbsp; By: Owen Zhang</small></div>
                        <div class="book-service-info-avg-rating"></div>
                    </div>
                    <div class="book-service-f6f6f6-theme">
                        <div class="book-service-row">
                            <div class="book-service-image-container">
                                <img></img>
                            </div>
                            <div class="book-service-booking-container">
                                <div class="book-service-title">Select a Date and Number of People</div>
                                <Calendar className="book-service-calendar" onChange={this.onChangeCalendar} value={this.state.date} />
                                <div class="book-service-center">
                                    <button class="book-service-button">Book Now</button>
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
                            <div class="book-service-detail"></div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}




{/* <div class="book-service-info-container"></div>
<div class="book-service-calendar-container">
    <div class="book-service-title">Select a Date</div>
    <Calendar onChange={this.onChangeCalendar} value={this.state.date} />
</div>
<div class="book-service-options-container">
    <div class="book-service-options-number">
        <input ></input>
    </div>
</div> */}