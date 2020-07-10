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
<div className="result-container card card-cascade">

  <div className="result-img-container">
    <img className="result-img" src="https://mdbootstrap.com/img/Photos/Others/men.jpg" alt="Card image cap" />
  </div>

  <div className="card-body text-center">

    <h4 className="card-title"><strong>{this.props.result.service_name}</strong></h4>
    <h6 className="font-weight-bold indigo-text py-2">Erin Limbo</h6>
    <p className="card-text"> I am a tutor for CS61B.
    </p>
  </div>

  <div className="card-footer text-muted text-center">
    &#9733; &#9733; &#9733; &#9733; &#9734;
  </div>

</div>
    );
  }
}

export default Result;
