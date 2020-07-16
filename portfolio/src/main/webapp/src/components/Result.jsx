import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

class Result extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Mounted: " + this.props.result.service_name);
    console.log(this.props.result)
  }

  passServiceInfo(e) {
    console.log(e);
    this.props.passServiceInfo("testId");
  }

  

  render() {
    let linkToProfile = `/profile/${this.props.result.provider_id}`;
    let linkToService = `/service/${this.props.result.service_id}`;
    return (
    <div id={this.props.result.service_id} className="result-container card card-cascade" onClick={this.passServiceInfo}>

    <div className="result-img-container">
        <img className="result-img" src="https://mdbootstrap.com/img/Photos/Others/men.jpg" alt="Card image cap" />
    </div>

    <div className="card-body text-center">

        <h4 className="card-title"><strong>{this.props.result.service_name}</strong></h4>
        <h6 className="font-weight-bold indigo-text py-2">{this.props.result.provider_id}</h6>
        <p className="card-text"> {this.props.result.service_description} </p>
        <div>
          <Link to={linkToService}>View Service</Link>
          <Link to={linkToProfile}>View Profile</Link>
        </div>
    </div>

    <div className="card-footer text-muted text-center">
        &#9733; &#9733; &#9733; &#9733; &#9734;
    </div>

    </div>
    );
  }
}

export default Result;
