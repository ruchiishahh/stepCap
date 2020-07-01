import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";
import RegisterForm from "./components/RegisterForm";
import BookingForm from "./components/BookingForm";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Search from "./components/search.jsx";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
            <Route
                exact path="/"
                render={(props) => <LandingPage {...props} />}>
            </Route>

            <Route exact path="/search" component={Search} />
            
            <Route
                exact path="/BookingForm"
                render={(props) => <BookingForm {...props} />}>
            </Route>
        </Router>
      </div>
    );
  }
}
