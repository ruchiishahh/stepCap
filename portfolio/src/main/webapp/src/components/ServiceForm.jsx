import React, { Component } from 'react';
import axios from 'axios';

class ServiceForm extends Component {
    state = { 
        provider_id: 1234567,
        service_name: '',
        service_overview: '',
        service_price: '',
        service_highlights: '',
        service_needs_traveling: 3,
        service_requirements: '',

     }

    handleFormSubmit = () => {
        const data = {
            provider_id: this.state.provider_id,
            service_name: this.state.service_name,
            service_overview: this.state.service_description,
            service_price: this.state.service_price,
            service_highlights: this.service_highlights,
            service_needs_traveling: this.state.service_needs_traveling,
            service_requirements: this.state.service_requirements,
        }
        axios.post("http://localhost:8080/service-handler", data)
            .then((res) => {
                console.log(res.data);
                this.props.closeForm();
            })
    }

    handleChange = (inputName, e) => {
        switch (inputName) {
            case "name":
                this.setState({service_name: e.target.value});
                break;
            case "desc":
                this.setState({service_description: e.target.value});
                console.log(this.state.service_description);
                break;
            default:
                return null;
        }
    }

    setTraveling = (e) => {
        console.log(e);
        console.log(e.value.target);
        this.setState({
            service_needs_traveling: e.target.value,
        });
    }

    render() { 
        return ( 
            <div className="service-form-container">
                <div className="service-form">
                    <button className="closeForm" onClick={this.props.closeForm}>&#10005;</button>
                    <div className="form">
                        <h1>Create a Service</h1>

                        <label>Service Name</label>
                        <input required type="text" onChange={e => this.handleChange("name", e)}/>

                        <label>Overview:</label>
                        <textarea name="description" onChange={e => this.handleChange("desc", e)} className="input-desc"></textarea>

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