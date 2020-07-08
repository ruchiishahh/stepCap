import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import RegisterForm from "./RegisterForm";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div class="landing-main-container">
            <div class="landing-body-container">
                <div id="landing-title" class="center-title animate__animated animate__fadeIn">THECOMMONS</div>
                <div id="landing-tagline" class="center-text animate__animated animate__fadeIn">Help anyone. Get help on anything.</div>
                <div class="register-form-container">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}
}
