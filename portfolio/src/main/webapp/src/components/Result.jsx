import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class Result extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Mounted: " + this.props.result.service_name);
    console.log(this.props.result)
  }
  

  render() {
    let linkToProfile = `/profile/${this.props.result.provider_id}`;
    let linkToService = `/service/${this.props.result.service_id}`;
    console.log(linkToProfile, linkToService);
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
          <Button variant="contained"><Link to={linkToService}>View Service</Link> </Button>
          <Button variant="contained"><Link to={linkToProfile}>View Profile</Link></Button>
        </div>
    </div>

    <div className="card-footer text-muted text-center">
        &#9733; &#9733; &#9733; &#9733; &#9734;
    </div>

    </div>
    );
  }
}

// <Link to={{
//             pathName: `/service/${this.props.result.service_id}`,
//             serviceProps: {
//               provider_id: this.props.result.provider_id,
//             }
//             }}>View Service</Link>

export default Result;
