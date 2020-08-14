import React, { Component } from "react";
import Filter from "./Filter";
import Search from "./Search";
import Results from "./Results";
import { debounce } from "lodash";
import axios from "axios";
import Navbar from "./Navbar"


class SearchPage extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            filters: [
            {id:0, text: "Alphabetical", active: true},
            {id:1, text: "Highest-Rated", active: false},
            {id:2, text: "Lowest-Price", active: false},
        ],
        input: "",
        filteredResults: [],
        loadedResults: true,
    };

  };


  componentDidMount() {
    axios.post("https://thecommons-1.appspot.com/search-handler", {input: ""})
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
    axios
      .post("https://thecommons-1.appspot.com/search-handler", { input: this.state.input })
      .then((response) => {
        console.log(response);
        this.setState({
          filteredResults: response.data,
          loadedResults: response.data.length > 0 ? true : false,
        });
      });
  }, 400);

  filterOnClick = (id) => {
      this.setState(prevState => ({
        filters: prevState.filters.map(
          filter => filter.id !== id ? { ...filter, active: false } : { ...filter, active: !filter.active }
        )
      }))
  }

  render() {
    return (
      <div className="searchPage-container">
        <Navbar user_id={this.props.userInfo.user_id} />
        <div>
          {this.state.filters.map(filter => (
            <Filter key={filter.id} filter={filter} onClick={this.filterOnClick} />
          ))}
        </div>
        <Search onChange={this.searchOnChange} loadedResults={this.state.loadedResults}/>
        <Results input={this.state.input} results={this.state.filteredResults}/>
      </div>
    );
  }
}

export default SearchPage;
