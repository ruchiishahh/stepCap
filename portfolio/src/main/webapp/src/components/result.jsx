import React, { Component } from "react";

class Result extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  componentDidMount() {
    console.log("Mounted: " + this.props.result.name);
  }

  state = {
    id: this.props.result.id,
    name: this.props.result.name,
    desc: this.props.result.desc,
  };

  render() {
    return (
      <div className="result-container">
        <div>
          {this.state.id} my name is {this.state.name}
        </div>
      </div>
    );
  }
}

export default Result;
