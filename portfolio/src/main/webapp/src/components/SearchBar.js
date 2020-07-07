import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
    };
    
  }

  render() {
    return (
      <div class="searchbar-all-container">
          <div class="homepage-main-container">
              <div class="searchbar-container">
                  <SearchBar />
              </div>

          </div>
      </div>
    );
  }
}
