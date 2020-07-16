import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="navbar-main-container">
        <div class="navbar-logo-container">
          <div class="navbar-logo">TheCommons</div>
        </div>
        <div class="navbar-options-container">
          <Link to="/">
            <li>Register</li>
          </Link>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/search">
            <li>Search</li>
          </Link>
          <Link to="/bookService">
            <li>Service</li>
          </Link>
          <Link to="/dashboard">
            <li>Dashboard</li>
          </Link>
          <Link to="/temp">
            <li>temp</li>
          </Link>
        </div>
      </div>
    );
  }
}
