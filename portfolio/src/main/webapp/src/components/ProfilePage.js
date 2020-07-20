import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import ServiceForm from "./ServiceForm";
import ReviewsForm from "./ReviewsForm";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Button } from "@material-ui/core";
import ReviewsGiven from "./ReviewsGiven";
import ServicesCreated from "./ServicesCreated";

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.openReviewForm = this.openReviewForm.bind(this);
    this.closeReviewForm = this.closeReviewForm.bind(this);
    this.setClass = this.setClass.bind(this);
    //this.handleShowInfo = this.handleShowInfo.bind(this);
    this.state = {
      loggedIn: "",
      user_id: "",
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      showForm: false,
      showReviewForm: false,
      reviewsReqInfo: [],
      servicesReqInfo: [],
    };
  }

  /*componentDidMount() {
    const { provider_id } = this.props.match.params;
    console.log(provider_id);
    axios.post('http://localhost:8080/profile-info', provider_id)
      .then((data) => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }*/

  componentDidMount() {
    console.log("Inside of showInfo");
    axios.get("http://localhost:8080/reviews-displayer").then((res) => {
      console.log(res);
      console.log(res.data);
      this.setState({ reviewsReqInfo: res.data });
    });

    axios.post("http://localhost:8080/search-handler", {input: ""})
      .then(response => {
        console.log(response);
        this.setState({
            servicesReqInfo: response.data,
        })
      })
  }

  openForm() {
    this.setState({ showForm: true });
  }
  closeForm() {
    this.setState({ showForm: false });
  }

  openReviewForm() {
    this.setState({ showReviewForm: true });
  }
  closeReviewForm() {
    this.setState({ showReviewForm: false });
  }

  /*
  handleShowInfo(event) {
    console.log("Inside of showInfo");
    axios.get("http://localhost:8080/reviews-displayer").then((res) => {
      console.log(res);
      console.log(res.data);
      this.setState({ reviewsReqInfo: res.data });
    });
  } */

  setClass() {
    if (this.state.showForm || this.state.showReviewForm) {
      return "profile-page-all-container blur";
    }
    return "profile-page-all-container";
  }

  render() {
    const showForm = this.state.showForm;
    const showReviewForm = this.state.showReviewForm;
    const blur = this.setClass();

    return (
      <Grid container spacing={3}>
        <div>
          {showForm ? <ServiceForm closeForm={this.closeForm} /> : null}
          {showReviewForm ? (
            <ReviewsForm closeReviewForm={this.closeReviewForm} />
          ) : null}
          <div class={blur}>
            <div class="profile-page-header-container">
              <div class="logo-container">theCOMMONS PROJECT</div>
              <div class="searchbar-container">
                <SearchBar />
              </div>
              <div class="options-container">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile"></Link>
                <button>Logout</button>
              </div>
            </div>
            <div class="profile-page-body-container">
              <div id="profile-about" class="profile-column">
                <div class="profile-image-container">
                  <img src=""></img>
                </div>
                <Grid item xs={4} sm={8}>
                  <Paper elevation={3}>
                    <div class="profile-description-container">
                      <div class="profile-title-strong">
                        {(this.state.firstname, this.state.lastname)}Owen Zhang
                      </div>
                      <div class="profile-paragraph">
                        Hi, it's super nice to meet you! I believe kindness is
                        the most important thing that keeps the world afloat,
                        and each of us have so much we can contribute to our
                        local communites to sustain and better ourselves :-)
                      </div>
                      <div class="profile-facts-container">
                        <div id="profile-fact-education" class="profile-fact">
                          <strong>Education:</strong>&nbsp;Washington University
                          in St. Louis
                        </div>
                        <div id="profile-fact-employment" class="profile-fact">
                          <strong>Employment:</strong>&nbsp;STEP Intern @ Google
                        </div>
                        <div
                          id="profile-fact-volunteering"
                          class="profile-fact"
                        >
                          <strong>Volunteering:</strong>&nbsp;Ambulance worker @
                          KVFD
                        </div>
                        <div id="profile-fact-funfact" class="profile-fact">
                          <strong>Fun Fact:</strong>&nbsp;I've had schooling in
                          4 countries!
                        </div>
                      </div>
                      <div class="profile-skills-title center">
                        Skills for Offer:
                      </div>
                      <div class="profile-skills-container">
                        <div id="skill-1" class="profile-skill">
                          Creating Websites
                        </div>
                        <div id="skill-2" class="profile-skill">
                          Drumming
                        </div>
                        <div id="skill-3" class="profile-skill">
                          Minecraft Canoneer
                        </div>
                        <div id="skill-4" class="profile-skill">
                          Math Tutoring
                        </div>
                        <div id="skill-5" class="profile-skill">
                          Yoga Tutoring
                        </div>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              </div>

              <div id="profile-services" class="profile-column">
                <div class="profile-title-strong center">Services</div>
                <Grid item xs={4} sm={8}>
                  <Paper elevation={3}>
                    <div class="profile-services-container">
                        <List style={{maxHeight: '100%', overflow: 'auto'}}>
                                {this.state.servicesReqInfo.map((info) => (
                                <ServicesCreated
                                name={info.service_name}
                                description={info.service_description}
                                provider={info.provider_id}
                                rating={info.average_rating}
                                />
                            ))}    
                        </List>  
                      {/*<div class="profile-service">
                        <div class="profile-service-image-container">
                          <div class="profile-service-RSVP">RSVP</div>
                        </div>
                        <div class="profile-service-info">
                          <div class="profile-service-info-column">
                            <div class="profile-service-title">
                              Math Tutoring
                            </div>
                            <div class="profile-service-rating"></div>
                          </div>
                          <div class="profile-service-price">$24/hr</div>
                        </div>
                      </div>
                      <div class="profile-service">
                        <div class="profile-service-image-container">
                          <div class="profile-service-RSVP">RSVP</div>
                        </div>
                        <div class="profile-service-info">
                          <div class="profile-service-info-column">
                            <div class="profile-service-title">
                              Minecraft Cannons
                            </div>
                            <div class="profile-service-rating"></div>
                          </div>
                          <div class="profile-service-price">$15/hr</div>
                        </div>
                      </div>
                      <div class="profile-service">
                        <div class="profile-service-image-container">
                          <div class="profile-service-RSVP">RSVP</div>
                        </div>
                        <div class="profile-service-info">
                          <div class="profile-service-info-column">
                            <div class="profile-service-title">
                              PC Maintenance
                            </div>
                            <div class="profile-service-rating"></div>
                          </div>
                          <div class="profile-service-price">$19/hr</div>
                        </div>
                      </div> */ }
                    </div>
                  </Paper>
                </Grid>
                <button
                  onClick={this.openForm}
                  class="profile-service-add-button"
                >
                  Create a Service
                </button>
              </div>
              <div id="profile-reviews" class="profile-column">
                <div id="profile-title-reviews" class="profile-title-strong">Reviews</div>
                <Grid item xs={4} sm={8}>
                  <Paper elevation={3}>
                    <div class="profile-reviews-container">
                        <List style={{maxHeight: '100%', overflow: 'auto'}}>
                                {this.state.reviewsReqInfo.map((info) => (
                                <ReviewsGiven
                                name={info.review_name}
                                description={info.review_description}
                                //service_id={info.service_id}
                                service_name={info.service_name}
                                rating={info.review_rating}
                                date={info.review_date}
                                />
                            ))}    
                        </List>                 
                    </div>
                  </Paper>
                </Grid>
                <button
                  onClick={this.openReviewForm}
                  class="profile-service-add-button"
                >
                  Create a Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    );
  }
}
