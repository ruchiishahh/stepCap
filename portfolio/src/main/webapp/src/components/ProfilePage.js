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
      isOwner: "",
    };
  }

  componentDidMount() {
    const { provider_id } = this.props.match.params;
    this.setState({
        user_id: this.props.userInfo.user_id,
        provider_id: provider_id,
    });

    console.log("the provider is: " + provider_id);
    let providerInfo = {
        user_id: provider_id,
    }
    axios.post('https://thecommons-281818.appspot.com/provider-info', providerInfo)
        .then((data) => {
            this.setState({
                provider_name: data.provider_name,
                provider_email: data.provider_email,
                provider_phone: data.provider_phone,
            }, () => {
                
            })
        })
        .catch(err => console.log(err));

    let userInfo = {
        user_id: this.props.userInfo.user_id,
    }
    if (this.props.userInfo.user_id == provider_id) {
        console.log("this user is looking at their own profile");
        axios.post("https://thecommons-281818.appspot.com/list-user-services", userInfo)
        .then((response) => {
           console.log("inside list user services");
            this.setState({
                servicesReqInfo: response.data,
                isOwner: true,
            }, () => {
                
            });
        });
        axios.post("https://thecommons-281818.appspot.com/list-user-reviews", userInfo).then((res) => {
            console.log("inside list user reviews");
            this.setState({ reviewsReqInfo: res.data });
        });
    } else {
        console.log("this user is not looking at the own profile");

        console.log(providerInfo);
        axios.post("https://thecommons-281818.appspot.com/list-user-services", providerInfo)

        .then((response) => {
           console.log("inside list provider services");
           console.log(response.data);
            this.setState({
                servicesReqInfo: response.data,
                isOwner: false,
            });
        });
        axios.post("https://thecommons-281818.appspot.com/list-user-reviews", providerInfo).then((res) => {
            console.log(res.data);
            console.log("inside list provider reviews");
            this.setState({ reviewsReqInfo: res.data }, () => {console.log(this.state)});
        });
    };
  }


  reviewFormHandler(){

      console.log("inside reviewFormHandler");
      console.log(this.state);
    if (this.state.isOwner) {
        console.log("inside review if");
        let userInfo = {
            user_id: this.state.user_id
        };
        axios.post("https://thecommons-281818.appspot.com/list-user-reviews", userInfo).then((res) => {
            
            this.setState({ reviewsReqInfo: res.data });
        });
    } else {
        console.log("inside review else")
        let providerInfo = {
            user_id: this.state.provider_id
        };
        console.log(providerInfo);
        axios.post("https://thecommons-281818.appspot.com/list-user-reviews", providerInfo).then((res) => {
            console.log(res.data);
            this.setState({ reviewsReqInfo: res.data });
        });
    }
  }

  serviceFormHandler(){
      if (this.state.isOwner) {

          let userInfo = {
            user_id: this.state.user_id
          };
          axios.post("https://thecommons-281818.appspot.com/list-user-services", userInfo)
            .then((response) => {
           
            this.setState({
                servicesReqInfo: response.data,
                isOwner: true,
            });
        });
      } else {
          let providerInfo = {
              user_id: this.state.provider_id,
          };
          axios.post("https://thecommons-281818.appspot.com/list-user-services", providerInfo)
            .then((response) => {
              
                this.setState({
                    servicesReqInfo: response.data,
                    isOwner: false,
                });
            });
      }
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
    console.log(this.state);

    return (
      <div>
        {showForm ? <ServiceForm userInfo={this.state.user_id} closeForm={this.closeForm} serviceFormHandler={this.serviceFormHandler}/> : null}
        {showReviewForm ? (
          <ReviewsForm userInfo={this.state.user_id} providerInfo={this.state.provider_id} closeReviewForm={this.closeReviewForm} reviewFormHandler={this.reviewFormHandler}/>
        ) : null}

        <div class={blur}>
          <Navbar user_id={this.props.userInfo.user_id}/>
          <Grid id="profile-grid-main" container spacing={3} alignItems="stretch" direction="row" justify="space-evenly" r>
            <Grid item xs>
              <Paper class="profile-paper">
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
              <Paper class="profile-paper">
                <div class="profile-title-strong center">Services</div>
                <List id="profile-service-list"style={{ maxHeight: "100%", overflow: "auto" }}>
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
              </Paper>
               {(this.state.isOwner) ? 
                    <div class="profile-review-button">
                        <button onClick={this.openForm} class="profile-service-add-button">Create a Service</button>
                    </div>
                    :
                    <div></div>
                }
            </Grid>
            <Grid id="profile-review-grid" item xs>
              <Paper class="profile-paper">
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
              </Paper>
              {(!this.state.isOwner) ? 
                    <div class="profile-review-button">
                        <button onClick={this.openReviewForm} class="profile-service-add-button">Write a Review</button>
                    </div>
                    :
                    <div></div>
                }
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
