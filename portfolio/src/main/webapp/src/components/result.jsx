import React, { Component } from "react";

class Result extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="result-container">
        <div>
          {this.props.result.id} my name is {this.props.result.name}
        </div>
      </div>
    );
  }
}

export default Result;
