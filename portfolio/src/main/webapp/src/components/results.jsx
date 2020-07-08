import React, { Component } from "react";
import Result from "./result";

class Results extends Component {
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
