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
                            <div class="book-service-detail-container">
                                <div class="book-service-detail-section">
                                    <div id="book-service-detail-title" class="book-service-title">Overview</div>
                                    <div class="book-service-paragraph">I will teach all the fundamental skills on a computer so that your family member can be self sufficient. Package includes walkthrough of how to download software independently, learing Microsoft Word, Powerpoint, and excel, how to create and check your email, and helpful sites to use. I will also install anti-malware software for your prefered browser.</div>
                                </div>
                                <div class="book-service-detail-section">
                                    <div id="book-service-detail-title" class="book-service-title">Highlights</div>
                                    <div class="book-service-highlight">Learn Microsoft Word, Powerpoint, Excel</div>
                                    <div class="book-service-highlight">Learn how to setup and use an online email account</div>
                                    <div class="book-service-highlight">Learn how to install software online</div>
                                    <div class="book-service-highlight">Learn how detect and avoid viruses and scams</div>
                                </div>
                            </div>
                            <div class="book-service-factcard">
                                <div id="book-service-fact-title" class="book-service-title">Key Details</div>
                                <div class="book-service-facts-container">
                                    <div class="book-service-fact"><i class="fas fa-location-arrow"></i>I will meet you at your home</div>
                                    <div class="book-service-fact"><i class="far fa-clock"></i>1-2 hours</div>
                                    <div class="book-service-fact"><i class="fas fa-exclamation-circle"></i>You will need a working computer</div>
                                    <div class="book-service-fact"><i class="fas fa-phone"></i>(124) 315-5592</div>
                                </div>
                            </div>
                        </div>
                        <div class="book-service-row">
                            <div class="book-service-review-container">
                                <div class="book-service-detail-section">
                                    <div id="book-service-review-title" class="book-service-title">Reviews</div>
                                </div>
                            </div>
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