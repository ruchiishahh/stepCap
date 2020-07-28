import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";

class Result extends Component {
  constructor(props) {
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);
    super(props);
    this.state = {
        random: rand,
        provider_firstname: "",
        provider_email: "",
        provider_phone: "",
    };
  }

  componentDidMount() {
    console.log("Mounted: " + this.props.result.service_name);
    console.log(this.props.result);
    let providerInfo = {
        provider_id: this.props.result.provider_id,
    }
    axios.post('http://localhost:8080/provider-info', providerInfo)
        .then((data) => {

            this.setState({
                provider_firstname: data.data.provider_firstname,
                provider_email: data.data.provider_email,
                provider_phone: data.data.provider_phone,
            })
            console.log("post state: " + this.state.provider_firstname);

        })
        .catch(err => console.log(err));
  }
  

  render() {
    let linkToProfile = `/profile/${this.props.result.provider_id}`;
    let linkToService = `/service/${this.props.result.service_id}`;
    let srcPic =
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80";
    if (this.state.random > 80) {
      srcPic = "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80";
    } else if (this.state.random > 60) {
      srcPic = "https://images.unsplash.com/photo-1505798577917-a65157d3320a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80";
    } else if (this.state.randomm > 40) {
        srcPic = "https://images.unsplash.com/photo-1537365587684-f490102e1225?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80";
    }

    console.log(linkToProfile, linkToService);
    return (
    <div id={this.props.result.service_id} className="result-container card card-cascade" onClick={this.passServiceInfo}>

    <div className="result-img-container">
        <img className="result-img" src={srcPic} alt="Card image cap" />
    </div>

    <div className="card-body text-center">

        <h4 className="card-title"><strong>{this.props.result.service_name}</strong></h4>
        <h6 className="font-weight-bold indigo-text py-2">Provider: {this.state.provider_firstname} ({this.state.provider_email})</h6>
        <p className="card-text"> {this.props.result.service_overview} </p>
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