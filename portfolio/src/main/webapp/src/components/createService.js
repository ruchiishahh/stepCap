import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class CreateService extends Component {
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
      <div>yeet</div>
    );
  }
}
