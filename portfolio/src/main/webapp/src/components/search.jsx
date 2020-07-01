import React, { Component } from "react";
import Results from "./results";
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
    filteredResults: [],
    results: [
      { id: 1, name: "Erin", desc: "hello World" },

      { id: 2, name: "Ruchi", desc: "hello World" },
      { id: 3, name: "Owen", desc: "hello World" },
      { id: 1, name: "everest", desc: "hello World" },
    ],
  };

  searchOnChange = (event) => {
    console.log(event.target.value);
    console.log("onChange called: ", event.target.value);
    this.setState({
      input: event.target.value,
    });
  };

  render() {
    const filteredResults = this.state.results.filter((result) => {
      return result.name.toLowerCase().includes(this.state.input.toLowerCase());
    });

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
        <Results results={filteredResults} input={this.state.input} />
      </div>
    );
  }
}

export default Search;
