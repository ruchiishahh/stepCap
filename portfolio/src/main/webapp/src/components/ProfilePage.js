import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import ServiceForm from "./ServiceForm";
import axios from "axios";

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.setClass = this.setClass.bind(this);


    this.state = {
      loggedIn: '',
      user_id: '',
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      showForm: false,
    }
  }

  componentDidMount() {
    const { provider_id } = this.props.match.params;
    console.log(provider_id);
    axios.post('http://localhost:8080/profile-info', provider_id)
      .then((data) => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  openForm() {
    this.setState({showForm: true})
  }
  closeForm() {
    this.setState({showForm: false})
  }

  setClass() {
    if (this.state.showForm) {
      return "profile-page-all-container blur";
    }
    return "profile-page-all-container";
  }

  render() {
    const showForm = this.state.showForm;
    const blur = this.setClass();
    return (
      <div>
        {showForm ? <ServiceForm closeForm={this.closeForm}/> : null}
        <div class={blur}>
          <div class="profile-page-header-container">
            <div class="logo-container">theCOMMONS PROJECT</div>
            <div class="searchbar-container"><SearchBar /></div>
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
              <div class="profile-description-container">
                <div class="profile-title-strong">{this.state.firstname, this.state.lastname}Owen Zhang</div>
                <div class="profile-paragraph">Hi, it's super nice to meet you! I believe kindness is the most important thing that keeps the world afloat, and each of us have so much we can contribute to our local communites to sustain and better ourselves :-)</div>
                <div class="profile-facts-container">
                  <div id="profile-fact-education" class="profile-fact"><strong>Education:</strong>&nbsp;Washington University in St. Louis</div>
                  <div id="profile-fact-employment" class="profile-fact"><strong>Employment:</strong>&nbsp;STEP Intern @ Google</div>
                  <div id="profile-fact-volunteering" class="profile-fact"><strong>Volunteering:</strong>&nbsp;Ambulance worker @ KVFD</div>
                  <div id="profile-fact-funfact" class="profile-fact"><strong>Fun Fact:</strong>&nbsp;I've had schooling in 4 countries!</div>
                </div>
                <div class="profile-skills-title center">Skills for Offer:</div>
                <div class="profile-skills-container">
                  <div id="skill-1" class="profile-skill">Creating Websites</div>
                  <div id="skill-2" class="profile-skill">Drumming</div>
                  <div id="skill-3" class="profile-skill">Minecraft Canoneer</div>
                  <div id="skill-4" class="profile-skill">Math Tutoring</div>
                  <div id="skill-5" class="profile-skill">Yoga Tutoring</div>
                </div>
              </div>
            </div>
            <div id="profile-services" class="profile-column">
              <div class="profile-title-strong center">Services</div>
              <div class="profile-services-container">
                <div class="profile-service">
                  <div class="profile-service-image-container">
                    <div class="profile-service-RSVP">RSVP</div>
                  </div>
                  <div class="profile-service-info">
                    <div class="profile-service-info-column">
                      <div class="profile-service-title">Math Tutoring</div>
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
                      <div class="profile-service-title">Minecraft Cannons</div>
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
                      <div class="profile-service-title">PC Maintenance</div>
                      <div class="profile-service-rating"></div>
                    </div>
                    <div class="profile-service-price">$19/hr</div>
                  </div>
                </div>
                <button onClick={this.openForm} class="profile-service-add-button">Create a Service</button>
              </div>
            </div>
            <div id="profile-reviews" class="profile-column">
              <div id="profile-title-reviews" class="profile-title-strong">Reviews</div>
              <div class="profile-reviews-container">
                <div class="profile-review">
                  <div class="profile-review-reviewer-name">Owen Z. left a review for <strong>Minecraft Cannons </strong>on July 6th, 2020 (3 days ago)</div>
                  <div class="profile-review-rating"></div>
                  <div class="profile-review-title">Very rewarding</div>
                  <div class="profile-review-body">I had a really good experience learning how to make sophisticated cannons for my faction. We won almost every battle with the cannon we built together!</div>
                </div>
                <div class="profile-review">
                  <div class="profile-review-reviewer-name">Anton S. left a review for <strong>Math Tutoring</strong> on June 14th, 2020 (1 month ago)</div>
                  <div class="profile-review-rating"></div>
                  <div class="profile-review-title">Life Saver</div>
                  <div class="profile-review-body">I had a really good experience learning how to make sophisticated cannons for my faction. We won almost every battle with the cannon we built together!</div>
                </div>
                <div class="profile-review">
                  <div class="profile-review-reviewer-name">Valkyrie C. left a review for <strong>PC Maintenance</strong> on September 21st, 2019 (9 months ago)</div>
                  <div class="profile-review-rating"></div>
                  <div class="profile-review-title">Did not know how much clutter I had</div>
                  <div class="profile-review-body">Owen was very efficient and deleted so many useless things from my laptop I didn't even know existed. I was going to buy a new one so saved me $500!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
