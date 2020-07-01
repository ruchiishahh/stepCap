import React, { Component } from "react";
import Result from "./result";

class Search extends Component {
  constructor() {
    super();
    console.log("Search - Contructor");
  }

  componentDidMount() {
    console.log("Search - Mounted");
  }

  state = {
    input: "",
    results: [
      { id: 1, name: "Erin", desc: "hello World" },
      { id: 2, name: "Ruchi", desc: "hello World" },
      { id: 3, name: "Owen", desc: "hello World" },
    ],
  };

  searchOnChange = (event) => {
    console.log("onChange called: ", event.target.value);
    this.setState({
      input: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <h1>Search Page</h1>
        <div>
          <label htmlFor="search"> Enter Search</label>
          <input
            type="text"
            value={this.state.input}
            onChange={this.searchOnChange}
          />
        </div>
        <div>
          {this.state.results.map((result) => (
            <Result result={result} />
          ))}
          ;
        </div>
      </div>
    );
  }
}

export default Search;
