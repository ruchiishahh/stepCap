import React, { Component } from 'react';
import axios from 'axios';

class ServiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            provider_id: 0,
            service_name: '',
            valid_name: true,
            service_overview: '',
            valid_overview: true,
            service_price: '',
            service_highlights: '',
            service_needs_traveling: 0,
            valid_needs_traveling: false,
            service_requirements: '',
            service_duration: '60',
        }
    }

    componentDidMount() {
        console.log(this.props.userInfo);
        this.setState({
            provider_id: this.props.userInfo,
        }, () => {
            console.log("form mounted, ", this.state);
        });
    }

    handleInputValidation = () => {
        if (this.state.service_name === "" || !this.state.valid_name) {
          return false;
        }
        if (this.state.service_overview === "" || !this.state.valid_overview) {
          return false;
        }
        if (!this.state.valid_needs_traveling) {
            return false;
        }
        return true;
      }

    handleFormSubmit = () => {
        if (!this.handleInputValidation()) {
            return;
        }
        const data = {
            provider_id: this.state.provider_id,
            service_name: this.state.service_name,
            service_overview: this.state.service_overview,
            service_price: this.state.service_price,
            service_highlights: this.state.service_highlights,
            service_needs_traveling: this.state.service_needs_traveling,
            service_duration: this.state.service_duration,
            service_requirements: this.state.service_requirements,
        }
        console.log(data);
        axios.post("http://localhost:8080/service-handler", data)
            .then((res) => {
                //console.log(res.data);
                //console.log(this);
                //this.props.closeForm();
                this.props.serviceFormHandler();
            });
        this.props.closeForm();
    }

    handleChange = (inputName, e) => {
        switch (inputName) {
            case "name":
                this.setState({service_name: e.target.value}, () => {
                    if (/^(?=.{5,100}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._\s]+$/.test(this.state.service_name)) {
                        this.setState({ valid_name: true});
                    } else {
                        this.setState({ valid_name: false});
                    }
                });
                break;
            case "overview":
                this.setState({service_overview: e.target.value}, () => {
                    if (/^(?=.{20,300}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._\s]+$/.test(this.state.service_overview)) {
                        this.setState({ valid_overview: true});
                    } else {
                        this.setState({ valid_overview: false});
                    }
                });
                console.log(this.state.service_overview);
                break;
            case "highlights":
                this.setState({service_highlights: e.target.value});
                break;
            case "price":
                this.setState({service_price: e.target.value});
                break;
            case "duration":
                this.setState({service_duration: e.target.value});
                break;
            case "requirements":
                this.setState({service_requirements: e.target.value});
                break;
            default:
                return null;
        }
    }

    setTraveling = (e) => {
        this.setState({
            service_needs_traveling: e.target.value,
        }, () => {
            this.setState({valid_needs_traveling: this.state.service_needs_traveling !== 0})
        });
    }

    render() { 
        return ( 
            <div className="service-form-container">
                <div className="service-form">
                    <button className="closeForm" onClick={this.props.closeForm}>&#10005;</button>
                    <div className="form">
                        <h1>Create a Service</h1>

                        <label>
                            <span style={{color: "red"}}>* </span>
                                Service Name
                                {!this.state.valid_name ? (<div class="alert alert-danger" role="alert">
                                Nonempty and 5-100 characters
                              </div>) : null}
                        </label>
                        <input required type="text" onChange={e => this.handleChange("name", e)}/>

                        <label>                     
                            <span style={{color: "red"}}>* </span>
                                Description
                                {!this.state.valid_overview ? (<div class="alert alert-danger" role="alert">
                                Please describe this service in 20-300 characters.
                              </div>) : null}
                        </label>
                        <textarea name="description" onChange={e => this.handleChange("overview", e)} className="input-desc"></textarea>

                        <label>Highlights:</label>
                        <textarea name="description" onChange={e => this.handleChange("highlights", e)} className="input-desc"></textarea>

                        <label>Duration:</label>
                        <textarea name="description" onChange={e => this.handleChange("duration", e)} className="input-desc"></textarea>

                        <label>Price:</label>
                        <textarea name="description" onChange={e => this.handleChange("price", e)} className="input-desc"></textarea>

                        <label>Requirements:</label>
                        <textarea name="description" onChange={e => this.handleChange("requirements", e)} className="input-desc"></textarea>

                        <label>Who would need traveling?</label>
                        <div onChange={event => {this.setTraveling(event)}}>
                            <input type="radio" value="1" name="willTravel"/> Provider
                            <input type="radio" value="2" name="willTravel"/> Customer
                            <input type="radio" value="3" name="willTravel"/> Optional
                        </div>
                       


                        <input type="submit" className="submitService" onClick={this.handleFormSubmit}/>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default ServiceForm;