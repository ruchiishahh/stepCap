import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-calendar/dist/Calendar.css';
import BookingForm from "./components/BookingForm";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import Dashboard from "./components/Dashboard";
import axios from "axios";
import ProfilePage from "./components/ProfilePage";
import BookService from "./components/BookService";
import CreateService from "./components/createService";
import Welcome from "./components/Welcome";
import LoginButton from "./components/LoginButton";


export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.passRegisterInfo = this.passRegisterInfo.bind(this);
    this.state = {
      landingPage: "/",
      loggedIn: false,
      registered: false,
      user_id: "",
      username: "",
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      service_id: "",
      userInfo: {},
      logUrl: "/",
    };
  }

  passRegisterInfo(registerInfoUpdated) {
    console.log(registerInfoUpdated);
    console.log(registerInfoUpdated.firstname);
    console.log(this);
    this.setState(
      {
        loggedIn: false,
        loginUrl: "",
        user_id: registerInfoUpdated.user_id,
        username: registerInfoUpdated.username,
        firstname: registerInfoUpdated.firstname,
        lastname: registerInfoUpdated.lastname,
        email: registerInfoUpdated.email,
        phone: registerInfoUpdated.phone,
      },
      () => {
        console.log("App Container passRegisterInfo ran");
        console.log(this.state);
      }
    );
  }

  componentDidMount() {
      axios.get('http://localhost:8080/log').then(response => {
          console.log(response);
          const user = response.data;
          let userInfo;
          if (user.loggedIn) {
            userInfo = JSON.parse(user.userInfo);
          } else {
            userInfo = {};
          }
          console.log(userInfo);
          this.setState({
            loggedIn: user.loggedIn,
            loginUrl: user.url,
            registered: user.registered != "",
            userInfo: userInfo,
          })
      })
  }

  getUser = () => {
    axios.get('http://localhost:8080/log').then(response => {
          console.log(response);
          const user = response.data;
          let userInfo;
          if (user.loggedIn) {
            userInfo = JSON.parse(user.userInfo);
          } else {
            userInfo = {};
          }
          console.log(userInfo);
          this.setState({
            loggedIn: user.loggedIn,
            loginUrl: user.url,
            registered: user.registered != "",
            userInfo: userInfo,
          })
      })
  }

 
  render() {
    let userInfo = this.state.userInfo;

    return (
      <div>

        {!this.state.loggedIn ? (
            <LoginButton loginUrl={this.state.loginUrl} />
        ) : (
        <div>

            <Router>
        {this.state.registered ? <Welcome userInfo={this.state.userInfo} /> : null}
                <Route
                    exact
                    path="/register"
                    render={(props) => (
                    <RegisterPage {...props} passRegisterInfo={this.passRegisterInfo}/>)}
                ></Route>
                
                <Route
                        exact 
                        path="/login"
                        render={(props) => <LoginPage {...props}/>}>
                    </Route>

                <Route 
                    exact 
                    path="/search" 
                    render={(props) => <SearchPage {...props} userInfo={userInfo} />}
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
                        exact path="/service/:service_id"
                        render={(props) => <BookService {...props} userInfo={userInfo} />}>
                    </Route>

                    <Route
                        exact path="/createService"
                        render={(props) => <CreateService {...props} userInfo={userInfo} />}>
                    </Route>

            </Router>
        </div>
        )}
      </div>
    );
  }
}
