import React, { Component } from "react";
import Results from "./Results";
import Result from "./Result";
import axios from "axios";
import { debounce } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";

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

    axios
      .post("http://localhost:8080/search-handler", { input: this.state.input })
      .then((response) => {
        console.log(response);
        this.setState({
          filteredResults: response.data,
          loadedResults: response.data.length > 0 ? true : false,
        });
      });
  }, 400);

  render() {
    return (
      <div>
        <div>
          <input
            class="form-control form-control-sm ml-3 w-75"
            type="text"
            placeholder="Search"
            onChange={(event) => this.searchOnChange(event.target.value)}
          />
        </div>
        {this.state.loadedResults ? (
          <Results
            results={this.state.filteredResults}
            input={this.state.input}
          />
        ) : (
          "No Results for your search."
        )}
      </div>
    );
  }
}

export default Search;
