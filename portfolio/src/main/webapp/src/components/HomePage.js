import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import axios from "axios";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    
    this.state = {
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
    };

  };

  logout() {
    console.log("logout ran");
  }

  render() {
    return (
      <div class="homepage-all-container">
          <div class="homepage-header-container">
              <div class="logo-container">theCOMMONS PROJECT</div>
              <div class="searchbar-container"><SearchBar /></div>
              <div class="options-container">
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/profile">Profile</Link>
                  <button onclick={this.logout}>Logout</button>
              </div>
          </div>
          <div class="homepage-body-container">
              <div class="section-container">
                  <div class="section-title">Categories</div>
                  <div id="categories-container" class="row-container"></div>
              </div>
              <div class="section-container">
                  <div class="section-title">In Demand</div>
                  <div id="popular-container" class="row-container"></div>
              </div>
          </div>
      </div>
    );
  }
}
