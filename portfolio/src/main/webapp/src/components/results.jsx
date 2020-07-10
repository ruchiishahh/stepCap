import React, { Component } from "react";
import Result from "./Result";

class Results extends Component {

  render() {
    console.log("rendered");

    return (
      <div>
        {/* {this.props.results.map((result) => (
          <Result result={result} />
        ))} */}
        <Result result={{service_name: "Tutor"}}/>
      </div>
    );
  }
}

export default Results;
