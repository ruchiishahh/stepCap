import React, { Component } from "react";
import Result from "./Result";

class Results extends Component {
  render() {
    const filteredResults = this.props.results.filter((result) => {
      return result.service_name.toLowerCase().includes(this.props.input.toLowerCase());
    });

    const displayResults = (array) => {
      {if (array.length === 0) {
          return <h2> No results matched your search. </h2>
        }
      }
    }

    return (

      <div>
      {displayResults(filteredResults)}
        {filteredResults.map((result) => (
          <Result result={result} />
        ))}
      
      </div>
    );
  }
}

export default Results;
