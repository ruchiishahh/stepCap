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

    const passServiceInfo = (info) => {
      console.log("inside results", info);
      this.props.passServiceInfo(info);
    }

    return (

      <div>
      {displayResults(filteredResults)}
        {filteredResults.map((result) => (
          <Result result={result} passServiceInfo={this.passServiceInfo}/>
        ))}
      
      </div>
    );
  }
}

export default Results;
