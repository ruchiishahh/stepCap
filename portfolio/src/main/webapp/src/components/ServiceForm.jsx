import React, { Component } from 'react';
import axios from 'axios';

class ServiceForm extends Component {
    state = { 
        service_name: '',
        service_description: '',
        provider_id: 1234567,
        average_rating: 0,
     }

    handleFormSubmit = () => {
        const data = {
            service_name: this.state.service_name,
            service_description: this.state.service_description,
            provider_id: this.state.provider_id,
            average_rating: this.state.average_rating,
        }
        axios.post("http://localhost:8080/service-handler", data);
        this.props.closeForm();
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

    render() { 
        return ( 
            <div className="service-form-container">
                <div className="service-form">
                    <button className="closeForm" onClick={this.props.closeForm}>&#10005;</button>
                    <div className="form">
                        <h1>Create a Service</h1>
                        <label>Service Name</label>
                        <input required type="text" onChange={e => this.handleChange("name", e)}/>
                        <label>Service Description</label>
                        <textarea name="description" onChange={e => this.handleChange("desc", e)} className="input-desc"></textarea>
                        <input type="submit" className="submitService" onClick={this.handleFormSubmit}/>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default ServiceForm;