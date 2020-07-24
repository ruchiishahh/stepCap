import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import SearchBar from "./SearchBar";
import axios from "axios";

export default class BookService extends React.Component {
  constructor() {
    super();
    this.state = {
        service_id: "",
        user_id: "",
        user_name: "",
        user_email: "",
        user_phone: "",
        provider_id: "",
        provider_name: "",
        provider_email: "",
        provider_phone: "",
        booking_id: "",
        booking_name: "",
        //booking_date: new Date(),
        booking_date: "", 
        booking_duration: "",
        booking_description_duration: "",
        booking_optional_note: "",
        booking_price: "",
        booking_description_price: "",
        booking_description_overview: "",
        booking_description_highlights: "",
        booking_description_needs_traveling: "",
        booking_description_requirements: "",
        booking_average_rating: "",
        isLoading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChangeCalendar = this.onChangeCalendar.bind(this);
    this.bookNow = this.bookNow.bind(this);

  }

  componentWillMount() {
    const { service_id } = this.props.match.params;
    let serviceInfo = {
        service_id: service_id,
    }
    axios.post('http://localhost:8080/service-info', serviceInfo)
        .then((res) => {
            console.log(res);
            let travelQuote = "";
            switch(res.data.service_travel_options) {
                case 1:
                    travelQuote = "I will travel to your desired location";
                    break;
                case 2:
                    travelQuote = "This service will require you to travel";
                    break;
                case 3:
                    travelQuote = "You can decide where to meet";
                    break;
                default:
                    travelQuote = "You can decide where to meet";
            };
            this.setState({
                service_id: service_id,
                provider_id: res.data.provider_id,
                booking_id: res.data.service_id,
                booking_name: res.data.service_name,
                booking_average_rating: res.data.average_rating,
                booking_description_duration: res.data.service_duration,
                booking_description_price: res.data.service_price,
                booking_description_overview: res.data.service_overview,
                booking_description_highlights: res.data.service_highlights,
                booking_description_needs_traveling: travelQuote,
                booking_description_requirements: res.data.service_requirements,
            }, () => {
                console.log(this.state);
                let providerInfo = {
                    provider_id: this.state.provider_id
                }
                console.log(providerInfo);
                axios.post('http://localhost:8080/provider-info', providerInfo)
                    .then((res) => {
                        console.log(res);
                        this.setState({
                            provider_name: res.data.provider_firstname + " " + res.data.provider_lastname,
                            provider_email: res.data.provider_email,
                            provider_phone: res.data.provider_phone,
                        }, () => {
                            let userInfo = {
                                user_id: this.props.userInfo.user_id,
                            }
                            console.log(userInfo);
                            // TODO: Discuss whether to create new servlet with same functionality but for user instead of provider
                            axios.post('http://localhost:8080/user-info', userInfo)
                                .then((res) => {
                                    console.log(res.data);
                                    this.setState({
                                        user_name: res.data.user_firstname + " " + res.data.user_lastname,
                                        user_email: res.data.user_email,
                                        user_phone: res.data.user_phone,
                                        user_id: userInfo.user_id,
                                    }, () => {
                                        this.setState({isLoading: false}, () => {
                                            console.log(this.state);
                                            console.log('Axios requests finished');
                                        })
                                    })
                                })
                                .catch(err => console.log(err));
                        })
                    })
                    .catch(err => console.log(err));
                })
        })
        .catch(err => console.log(err));
  }

  onChangeCalendar = (booking_date) => this.setState({ booking_date });

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: value,
    });
  };

bookNow(e) {
     e.preventDefault();
      console.log("bookNow initiated");
      console.log(this.state);
      
      const bookingObj = {
          customer_id: this.props.userInfo.user_id,
          provider_id: this.state.provider_id,
          service_id: this.state.service_id,
          booking_name: this.state.booking_name,
          booking_date: this.state.booking_date.toISOString(),
          booking_duration: this.state.booking_duration,
          booking_optional_note: this.state.booking_optional_note,
          booking_price: this.state.booking_price,
          booking_is_confirmed_customer: true,
          booking_is_confirmed_provider: false,
      };
      console.log(bookingObj);
      axios.post("http://localhost:8080/backend/book-new-service", bookingObj)
        .then((res) => {
            console.log("inside bookService .then()");
            console.log(res.data);
            const gapi = window.gapi;
            const CLIENT_ID = '778442330423-c8o8u3mmmtun0phpr1381isl452c8cus.apps.googleusercontent.com';
            const API_KEY = 'AIzaSyDnIFqZ8EqTAOJXorggZ_fEo_vQ4L_aYFA';
            const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
            const SCOPES = "https://www.googleapis.com/auth/calendar.events";

            gapi.load('client:auth2', () => {
                console.log('loaded client');

                gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES
                })
                gapi.client.load('calendar', 'v3', () => console.log('Yeet!'));
                console.log(this.state);
                console.log(bookingObj);
                gapi.auth2.getAuthInstance().signIn().then(() => {
                var event = {
                    'summary': bookingObj.booking_name,
                    'location': this.state.travel_options,
                    'description': this.state.overview,
                    'start': {
                        'dateTime': '2020-07-24T09:00:00-07:00',
                        'timeZone': 'America/Los_Angeles'
                    },
                    'end': {
                        'dateTime': '2020-07-25T17:00:00-07:00',
                        'timeZone': 'America/Los_Angeles'
                    },
                    'recurrence': [
                        'RRULE:FREQ=DAILY;COUNT=2'
                    ],
                    'attendees': [
                        {'email': this.state.provider_email},
                        {'email': 'owenzhang@google.com'},
                        {'email': this.state.user_email}
                    ],
                    'reminders': {
                        'useDefault': false,
                        'overrides': [
                            {'method': 'email', 'minutes': 24 * 60},
                            {'method': 'popup', 'minutes': 10}
                        ]
                    }
                };
                console.log(event);
                

                var request = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event,
                });

                request.execute(event => {
                    console.log(event);
                    this.props.history.push('/dashboard');
                });
            })
            .catch(err => console.log(err))
            })
        })
       
    };

  render() {
    
        console.log("finished loading");
        console.log(this.state);
        return (
            <main>
            {this.state.isLoading ? 
                <div>
                    <i className="fa fa-spinner fa-spin"></i>
                </div>

                :

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
                        {this.state.booking_name}
                        </div>
                        <div class="book-service-info-provider">
                        <small>&nbsp; By: {this.state.provider_name}</small>
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
                            name="booking_date"
                            type="date"
                            onChange={this.onChangeCalendar}
                            value={this.state.booking_date}
                            />

                            <input
                            name="booking_name"
                            placeholder="Teach Modern Computer Skills to Elderly"
                            class="book-service-paragraph"
                            value={this.state.booking_name}
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
                            <button class="book-service-button" onClick={this.bookNow}> Book Now </button>
                            </div>
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
                                {this.state.booking_description_overview}
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
                                {this.state.booking_description_highlights}
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
                                <i class="fas fa-location-arrow"></i>
                                {this.state.booking_description_needs_traveling}
                            </div>
                            <div class="book-service-fact">
                                <i class="far fa-clock"></i>
                                {this.state.booking_description_duration}
                            </div>
                            <div class="book-service-fact">
                                <i class="fas fa-exclamation-circle"></i>
                                {this.state.booking_description_requirements}
                            </div>
                            <div class="book-service-fact">
                                <i class="fas fa-phone"></i>{this.state.provider_phone}
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
                }
            </main>
            );
        }
    
  }
