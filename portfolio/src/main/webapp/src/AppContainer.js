import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";
import RegisterForm from "./components/RegisterForm.component";

import Navbar from "./components/Navbar.component";
import LandingPage from "./components/LandingPage.component";
import Search from "./components/Search";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
          <Route
            exact
            path="/"
            render={(props) => <LandingPage {...props} />}
          ></Route>
          <Route exact path="/search" component={Search} />
        </Router>
      </div>
    );
  }
}
