import React, { Component } from "react";
import Filter from "./Filter";
import Search from "./Search";
import Results from "./Results";
import { debounce } from "lodash";
import axios from "axios";
import Navbar from "./Navbar"


class SearchPage extends Component {
  state = {
    filters: [
        {id:0, text: "Alphabetical", active: true},
        {id:1, text: "Highest-Rated", active: true},
        {id:2, text: "Lowest-Price", active: true},
    ],
    input: "",
    filteredResults: [],
    loadedResults: true,
  };

  componentDidMount() {
    axios.post("http://localhost:8080/search-handler", {input: ""})
      .then(response => {
        console.log(response);
        this.setState({
            filteredResults: response.data,
            loadedResults: response.data.length > 0 ? true : false,
        })
      })
  }

  searchOnChange = debounce((input) => {
    this.setState({ input });
    console.log(this.state.input);
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

  filterOnClick = (id) => {
      console.log(id);
      this.setState(prevState => ({
        filters: prevState.filters.map(
          filter => filter.id === id ? { ...filter, active: false } : filter
        )
      }))
      console.log(this.state.filters);
  }

  passServiceInfo(info) {
    console.log("inside searchpage", info);
    this.props.passServiceInfo(info);
  }
  render() {

    return (
      <div className="searchPage-container">
        <Navbar />
        <div>
          {this.state.filters.map(filter => (
            filter.active && (<Filter key={filter.id} filter={filter} onClick={this.filterOnClick} />)
          ))}
        </div>
        <Search onChange={this.searchOnChange} loadedResults={this.state.loadedResults}/>
        <Results input={this.state.input} results={this.state.filteredResults} passServiceInfo={this.passServiceInfo}/>
      </div>
    );
  }
}

export default SearchPage;