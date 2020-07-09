import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import axios from "axios";

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: '',
      user_id: '',
      username: '',
      email: '',
      firstname: '',
      lastname: '',
    }
  }

  render() {
    return (
      <div class="profile-page-all-container">
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
            </div>
            <div id="profile-misc" class="profile-column"></div>
        </div>
      </div>
    );
  }
}
