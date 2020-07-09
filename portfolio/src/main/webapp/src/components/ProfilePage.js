import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="profile-page-all-container">
        <div class="homepage-header-container">
            <div class="logo-container">theCOMMONS PROJECT</div>
            <div class="searchbar-container"><SearchBar /></div>
            <div class="options-container">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile">{this.state.firstname}</Link>
                <button onclick={this.logout}>Logout</button>
            </div>
        </div>
        <div class="profile-page-body-container">
            <div id="profile-about" class="column">
                <div class="profile-image-container">
                    <img src=""></img>
                </div>
                <div class="profile-description-container">
                    <div class="title-strong"></div>
                </div>
            </div>
            <div id="profile-services" class="column"></div>
            <div id="profile-misc" class="column"></div>
        </div>
      </div>
    );
  }
}
