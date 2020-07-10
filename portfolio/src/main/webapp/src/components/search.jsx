import React, { Component } from "react";

class Search extends Component {
  constructor() {
    super();
    console.log("Search - Contructor");
  }

  componentDidMount() {
    console.log("Search - Mounted");
  }

  render() {
    return (
      <div className="searchbar-container">
          <input className="searchbar form-control form-control-lg" type="text" placeholder="Search" 
          onChange={event => this.props.onChange(event.target.value)}/>
      </div>
    );
  }
}

export default Search;
