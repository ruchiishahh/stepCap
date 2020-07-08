import React, { Component } from "react";
import Results from "./results";
import Result from "./result";
import axios from "axios";
import { debounce } from "lodash";

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
    loadedResults: true,
  };



  searchOnChange = debounce((input) => {
    this.setState({ input });

    axios.post('http://localhost:8080/search-handler', {input: this.state.input})
      .then(response => {
          this.setState({
              filteredResults: (response.data.length > 0) ? response.data : ["No Results"],
              loadedResults: (response.data.length > 0) ? true : false,
          })
      })
  }, 400);

  render() {
    return (
      <div>
        <h1>Search Page</h1>
        <div>
          <label htmlFor="search"> Enter Search</label>
          <input
            type="text"
            id="input"
            onChange={event => this.searchOnChange(event.target.value)}
          />
        </div>
        {this.state.loadedResults ? (<Results results={this.state.filteredResults} input={this.state.input} />) : "No Results for your search."}  
      </div>
    );
  }
}

export default Search;
