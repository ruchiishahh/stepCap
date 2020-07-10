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
      <div>
          <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" 
          onChange={event => this.props.onChange(event.target.value)}/>
      </div>
    );
  }
}

export default Search;
