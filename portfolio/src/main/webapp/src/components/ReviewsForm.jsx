import React, { Component } from 'react';
import axios from 'axios';
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class ReviewsForm extends Component {
    state = { 
        review_name: '',
        validName: true,
        review_description: '',
        validDesc: true,
        service_name: '',
        validService: true,
        review_rating: 0,
    }

    handleInputValidation = () => {
        if (!this.state.validName || this.state.review_name === "") {
            return false;
        }
        if (!this.state.validDesc || this.state.review_description === "") {
            return false;
        }
        if (!this.state.validService || this.state.service_name === "") {
            return false;
        }
        if (this.state.review_rating === 0) {
            return false;
        }
        return true;
    }

    handleFormSubmit = () => {
        if (!this.handleInputValidation()) {
            console.log("failed");
            return;
        }
        const data = {
            review_name: this.state.review_name,
            review_description: this.state.review_description,
            //service_id: this.state.service_id,
            service_name: this.state.service_name,
            review_rating: this.state.review_rating,
        }
        console.log("Information inputted: " + data.review_name);
        axios.post("http://localhost:8080/reviews-handler", data).then(resp => {
            this.props.reviewFormHandler();
        });
        this.props.closeReviewForm();
    }

    
    handleChange = (inputName, e) => {
        switch (inputName) {
            case "name":
                this.setState({review_name: e.target.value}, () => {
                    if (this.state.review_name !== "") {
                        this.setState({ validName: true})
                    } else {
                      this.setState({ validName: false })
                    }
                });
                break;
            case "desc":
                this.setState({review_description: e.target.value}, () => {
                    if (/^(?=.{30,200}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+$/.test(this.state.review_description)) {
                        this.setState({ validDesc: true})
                      } else {
                        this.setState({ validDesc: false})
                      }
                });
                break;
            case "service":
                this.setState({service_name: e.target.value}, () => {
                    if (this.state.service_name !== "") {
                        this.setState({ validService: true})
                    } else {
                      this.setState({ validService: false })
                    }
                });
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
                        <label>Review Name
                        {!this.state.validName ? (<div class="alert alert-danger" role="alert">
                               Insert a review title.
                              </div>) : null}
                        </label>
                        <input required type="text" onChange={e => this.handleChange("name", e)}/>
                        <label>Review Description
                        {!this.state.validDesc ? (<div class="alert alert-danger" role="alert">
                                30-200 characters.
                              </div>) : null}
                        </label>
                        <textarea name="description" onChange={e => this.handleChange("desc", e)} className="input-desc"></textarea>
                        <label>Service Name

                        {!this.state.validService ? (<div class="alert alert-danger" role="alert">
                               Insert the service title.
                              </div>) : null}
                        </label>
                        <input required type="text" onChange={e => this.handleChange("service", e)}/>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Review Rating</Typography>
                            <Rating
                            name="simple-controlled"
                            value={this.state.review_rating}
                            onChange={(event, newValue) => {
                                this.setState({ review_rating: newValue });
                            }}
                            />
                        </Box>
                        <input type="submit" className="submitService" onClick={this.handleFormSubmit}/>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default ReviewsForm;