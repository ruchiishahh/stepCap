import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AnonymousProfile from "../images/anonymous.png"

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      logoutUrl: "",
    }
  }

  dropdown = () => {
    this.setState(prevState => ({
      showDropdown: !prevState.showDropdown,
    }))
  }

    componentDidMount() {
      axios.get('http://localhost:8080/log').then(response => {
          console.log(response);
          const user = response.data;
          const userInfo = JSON.parse(user.userInfo);
          console.log(userInfo);
          this.setState({
            logoutUrl: user.url,
          }, () => {
              console.log(this.state.logoutUrl)
          })
      })
  }

  render() {
    console.log("RENDER: " + this.state.logoutUrl)
    const linkToProfile = `/profile/${this.props.user_id}`;
    return (
      <div class="navbar-main-container">
        <Link to="/">
          <div class="navbar-logo-container">
            theCOMMONS
          </div>
        </Link>
        <div class="navbar-options-container">
          <Link to="/search">
            <div class="navbar-link">Search</div>
          </Link>
          <Link to="/dashboard">
            <div class="navbar-link">Dashboard</div>
          </Link>
          <div class="dropdown">
            <img onClick={() => {this.dropdown()}} class="navbar-profile" src={AnonymousProfile} />
            {this.state.showDropdown ? 
            (
              <div class="dropdown-content"> 
                <Link to={linkToProfile}> 
                  <div class="navbar-link">Profile</div>
                </Link>
                <div class="navbar-link"><a href={this.state.logoutUrl}>Logout </a></div>

              </div>
            ) : null
            }
          </div>
        </div>
      </div>
    );
  }
}
