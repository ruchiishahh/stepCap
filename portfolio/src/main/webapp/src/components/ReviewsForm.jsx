import React, { Component } from 'react';
import axios from 'axios';

class ReviewsForm extends Component {
    state = { 
        review_name: '',
        review_description: '',
        service_id: 1234567,
        review_rating: 0,
    }

    handleFormSubmit = () => {
        const data = {
            review_name: this.state.review_name,
            review_description: this.state.review_description,
            service_id: this.state.service_id,
            review_rating: this.state.review_rating,
        }
        console.log("Information inputted: " + data.review_name);
        axios.post("http://localhost:8080/reviews-handler", data);
        this.props.closeReviewForm();
    }

    handleChange = (inputName, e) => {
        switch (inputName) {
            case "name":
                this.setState({review_name: e.target.value});
                break;
            case "desc":
                this.setState({review_description: e.target.value});
                console.log(this.state.review_description);
                break;
            default:
                return null;
        }
    }

    render() { 
        return ( 
            <div className="service-form-container">
                <div className="service-form">
                    <button className="closeForm" onClick={this.props.closeReviewForm}>&#10005;</button>
                    <div className="form">
                        <h1>Create a Review</h1>
                        <label>Review Name</label>
                        <input required type="text" onChange={e => this.handleChange("name", e)}/>
                        <label>Review Description</label>
                        <textarea name="description" onChange={e => this.handleChange("desc", e)} className="input-desc"></textarea>
                        <input type="submit" className="submitService" onClick={this.handleFormSubmit}/>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default ReviewsForm;