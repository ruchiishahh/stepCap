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
import Navbar from "./Navbar";

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.openReviewForm = this.openReviewForm.bind(this);
    this.closeReviewForm = this.closeReviewForm.bind(this);
    this.setClass = this.setClass.bind(this);
    this.reviewFormHandler = this.reviewFormHandler.bind(this);
    this.serviceFormHandler = this.serviceFormHandler.bind(this);
    //this.handleShowInfo = this.handleShowInfo.bind(this);
    this.state = {
      loggedIn: "",
      user_id: "",
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      provider_id: "",
      provider_name: "",
      provider_email: "",
      provider_phone: "",
      showForm: false,
      showReviewForm: false,
      reviewsReqInfo: [],
      servicesReqInfo: [],
    };
  }

  componentDidMount() {
    const { provider_id } = this.props.match.params;
    // TODO: This needs to be changed later with the locationState Link property to differentiate the loggedin user and browsing someone else's profile
    this.setState({
        user_id: this.props.userInfo.user_id,
        provider_id: provider_id,
    });
    console.log(provider_id);
    let providerInfo = {
        provider_id: provider_id,
    }
    axios.post('http://localhost:8080/provider-info', providerInfo)
        .then((data) => {
            console.log(data);
            this.setState({
                provider_name: data.provider_name,
                provider_email: data.provider_email,
                provider_phone: data.provider_phone,
            }, () => {
                console.log(this.state);
            })
        })
        .catch(err => console.log(err));
    
    axios.get("http://localhost:8080/reviews-displayer").then((res) => {
      console.log(res);
      console.log(res.data);
      this.setState({ reviewsReqInfo: res.data });
    });
    let userInfo = {
        user_id: this.props.userInfo.user_id,
    }
    axios.post("http://localhost:8080/list-user-services", userInfo)
      .then((response) => {
        console.log(response);
        this.setState({
          servicesReqInfo: response.data,
        });
      });
    }

  reviewFormHandler(){
      axios.get("http://localhost:8080/reviews-displayer").then((res) => {
          console.log(res);
          console.log(res.data);
          this.setState({ reviewsReqInfo: res.data });
        });
  }

  serviceFormHandler(){
      axios.post("http://localhost:8080/search-handler", { input: "" }).then((response) => {
        console.log(response);
        this.setState({
          servicesReqInfo: response.data,
        });
      });

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
      <div>
        {showForm ? <ServiceForm userInfo={this.state.user_id} closeForm={this.closeForm} serviceFormHandler={this.serviceFormHandler}/> : null}
        {showReviewForm ? (
          <ReviewsForm closeReviewForm={this.closeReviewForm} reviewFormHandler={this.reviewFormHandler}/>
        ) : null}

        <div class={blur}>
          <Navbar user_id={this.props.userInfo.user_id}/>
          <Grid container spacing={3} alignItems="stretch" direction="row" justify="space-evenly" r>
            <Grid item xs>
              <Paper>
                <div class="profile-image-container">
                  <img src=""></img>
                </div>
                <div class="profile-description-container">
                  <div class="profile-title-strong">
                    {(this.state.firstname, this.state.lastname)}Owen Zhang
                  </div>

                  <div class="profile-paragraph">
                    Hi, it's super nice to meet you! I believe kindness is the
                    most important thing that keeps the world afloat, and each
                    of us have so much we can contribute to our local communites
                    to sustain and better ourselves :-)
                  </div>
                  <div class="profile-facts-container">
                    <div id="profile-fact-education" class="profile-fact">
                      <strong>Education:</strong>&nbsp;Washington University in
                      St. Louis
                    </div>
                    <div id="profile-fact-employment" class="profile-fact">
                      <strong>Employment:</strong>&nbsp;STEP Intern @ Google
                    </div>
                    <div id="profile-fact-volunteering" class="profile-fact">
                      <strong>Volunteering:</strong>&nbsp;Ambulance worker @
                      KVFD
                    </div>
                    <div id="profile-fact-funfact" class="profile-fact">
                      <strong>Fun Fact:</strong>&nbsp;I've had schooling in 4
                      countries!
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
            <Grid item xs>
              <Paper>
                <div class="profile-title-strong center">Services</div>
                <List style={{ maxHeight: "100%", overflow: "auto" }}>
                  {this.state.servicesReqInfo.map((info) => (
                    <ServicesCreated
                      name={info.service_name}
                      description={info.service_overview}
                      provider={info.provider_id}
                      rating={info.average_rating}
                      service_id={info.service_id}
                    />                  
                  ))}
                </List>
                {(this.props.userInfo.user_id == this.state.provider_id) ? 
                    <button onClick={this.openForm} class="profile-service-add-button">Create a Service</button>
                    :
                    <div></div>
                }
                
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper>
                <div class="profile-title-strong center">Reviews</div>
                <List style={{ maxHeight: "100%", overflow: "auto" }}>
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
                {(this.props.userInfo.user_id != this.state.provider_id) ? 
                    <button onClick={this.openReviewForm} class="profile-service-add-button">Create a Review</button>
                    :
                    <div></div>
                }
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
