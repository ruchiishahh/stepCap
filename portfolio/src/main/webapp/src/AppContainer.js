import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-calendar/dist/Calendar.css';
import BookingForm from "./components/BookingForm";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";
import BookService from "./components/BookService";
import CreateService from "./components/createService";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.passRegisterInfo = this.passRegisterInfo.bind(this);
   

    this.state = {
      loggedIn: false,
      user_id: "",
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      service_id: "",
    };
  }
  passRegisterInfo(registerInfoUpdated) {
    console.log(registerInfoUpdated);
    console.log(registerInfoUpdated.firstname);
    console.log(this);
    this.setState(
      {
        loggedIn: true,
        user_id: registerInfoUpdated.user_id,
        username: registerInfoUpdated.username,
        firstname: registerInfoUpdated.firstname,
        lastname: registerInfoUpdated.lastname,
        email: registerInfoUpdated.email,
      },
      () => {
        console.log("App Container passRegisterInfo ran");
        console.log(this.state);
      }
    );
  }

 
  render() {
    let userInfo = {
      loggedIn: this.state.loggedIn,
      user_id: this.state.id,
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
    };

    return (
      <div>
        <Router>
          <Route
            exact
            path="/"
            render={(props) => (
              <RegisterPage
                {...props}
                passRegisterInfo={this.passRegisterInfo}
              />
            )}
          ></Route>
          
          <Route
            exact
            path="/home"
            render={(props) => <HomePage {...props} userInfo={userInfo} />}
          ></Route>

          <Route 
            exact 
            path="/search" 
            render={(props) => <SearchPage {...props}/>}
          ></Route>

          <Route
            exact
            path="/BookingForm"
            render={(props) => <BookingForm {...props} />}
          ></Route>

            <Route
                exact path="/dashboard"
                render={(props) => <Dashboard {...props} />}>
            </Route>

            <Route
                exact path="/profile"
                render={(props) => <ProfilePage {...props} userInfo={userInfo} />}>
            </Route>

            <Route
                exact path="/profile/:provider_id"
                render={(props) => <ProfilePage {...props} userInfo={userInfo} />}>
            </Route>

            <Route
                exact path="/bookService"
                render={(props) => <BookService {...props} userInfo={userInfo} />}>
            </Route>

            <Route
                exact path="/createService"
                render={(props) => <CreateService {...props} userInfo={userInfo} />}>
            </Route>

        </Router>
      </div>
    );
  }
}
