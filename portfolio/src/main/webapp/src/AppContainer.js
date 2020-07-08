import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BookingForm from "./components/BookingForm";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import Search from "./components/search.jsx";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";

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
                render={(props) => <RegisterPage {...props} />}>
            </Route>

            <Route
                exact path="/home"
                render={(props) => <HomePage {...props} />}>
            </Route>
            
            <Route exact path="/search" component={Search} />
            
            <Route
                exact path="/BookingForm"
                render={(props) => <BookingForm {...props} />}>
            </Route>

            <Route
                exact path="/Dashboard"
                render={(props) => <Dashboard {...props} />}>
            </Route>

            <Route
                exact path="/"
                render={(props) => <ProfilePage {...props} />}>
            </Route>
        </Router>
      </div>
    );
  }
}
