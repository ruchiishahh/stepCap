import React, { Component } from "react";
import Result from "./Result";

class Results extends Component {
  componentDidMount() {
    console.log("Mounted: results");
  }

  render() {
    console.log(this.props.results);

    return (
      <div>
        {this.props.results.map((result) => (
          <Result result={result} />
        ))}
      </div>
    );
  }
}

export default Results;
