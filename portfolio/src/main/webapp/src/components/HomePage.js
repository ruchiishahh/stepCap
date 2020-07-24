import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import axios from "axios";
import MapContainer from "./MapContainer";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    
    this.state = {
        user_id: "",
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
    };

  };

  componentDidMount() {
      console.log(this.props);
      this.setState({
          user_id: this.props.userInfo.user_id,
          firstname: this.props.userInfo.firstname,
          lastname: this.props.userInfo.lastname,
          email: this.props.userInfo.email,
      }, () => {
        console.log("HomePage – Mount");
        console.log(this.state);
      });
      
  }

  logout() {
    console.log("logout ran");
  }

  render() {
      const linkToProfile = `/profile/${this.state.user_id}`;
      console.log(linkToProfile);
    return (
      <div class="homepage-all-container">
          <div class="homepage-header-container">
              <div class="logo-container">theCOMMONS PROJECT</div>
              <div class="searchbar-container"><SearchBar /></div>
              <div class="options-container">
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to={linkToProfile}>{this.state.firstname}</Link>
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
          <MapContainer />
      </div>
    );
  }
}
