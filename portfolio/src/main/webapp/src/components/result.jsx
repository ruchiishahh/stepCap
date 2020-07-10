import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


class Result extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Mounted: " + this.props.result.service_name);
  }

  render() {
    return (
      <div className="result-container">
        <div>
          <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Picture of service"/>
          my name is {this.props.result.service_name}
        </div>
      </div>
    );
  }
}

export default Result;
