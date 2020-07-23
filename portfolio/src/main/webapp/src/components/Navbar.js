import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AnonymousProfile from "../images/anonymous.png"

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
    }
  }

  dropdown = () => {
    this.setState(prevState => ({
      showDropdown: !prevState.showDropdown,
    }))
  }

  render() {
    return (
      <div class="navbar-main-container">
        <Link to="/">
          <div class="navbar-logo-container">
            theCOMMONS
          </div>
        </Link>
        <div class="navbar-options-container">
          <Link to="/">
            <div class="navbar-link">Register</div>
          </Link>

          <Link to="/search">
            <div class="navbar-link">Search</div>
          </Link>
          <Link to="/bookService">
            <div class="navbar-link">Service</div>
          </Link>
          <Link to="/dashboard">
            <div class="navbar-link">Dashboard</div>
          </Link>
          <div class="dropdown">
            <img onClick={() => {this.dropdown()}} class="navbar-profile" src={AnonymousProfile} />
            {this.state.showDropdown ? 
            (
              <div class="dropdown-content"> 
                <Link to="/profile"> 
                  <div class="navbar-link">Profile</div>
                </Link>
                <Link to="/LOGOUTURL"> 
                  <div class="navbar-link">Logout</div>
                </Link>

              </div>
            ) : null
            }
          </div>
        </div>
      </div>
    );
  }
}
