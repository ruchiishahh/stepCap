import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
       searchInput: '',
    };
  }

  onChangeSearchInput(e) {
    this.setState({
      searchInput: e.target.value,
    });
  }

  render() {
    return (
      <div class="searchbar-container">
          <div class="form-div long-input">
              <input id="homepage-search" type="text" value={this.state.searchInput} onChange={this.onChangeSearchInput} />
          </div>
      </div>
    );
  }
}
