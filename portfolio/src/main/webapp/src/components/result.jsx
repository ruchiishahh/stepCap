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
<div className="card card-cascade">

  <div className="view view-cascade overlay">
    <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/men.jpg" alt="Card image cap" />
    <a>
      <div className="mask rgba-white-slight"></div>
    </a>
  </div>

  <div className="card-body card-body-cascade text-center">

    <h4 className="card-title"><strong>{this.props.result.service_name}</strong></h4>
    <h6 className="font-weight-bold indigo-text py-2">FirstName LastName</h6>
    <p className="card-text">{this.props.result.service_description}
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
