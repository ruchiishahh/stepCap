import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class BookingForm extends React.Component{
    state = {
        bookingName: '',
        bookingDate: '',
        bookingDuration: '',
        bookingDescription: '',
        bookingPrice: '',
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })    
    };

    onSubmit = () => {
        console.log(this.state);
    };

    render() {
        return (
            <form>
            <input
                name="bookingName"
                placeholder="Booking Name"
                value={this.state.bookingName}
                onChange={e => this.change(e)} 
            />
            
            <br /> 

            <input
                name="bookingDate"
                placeholder="Booking Date"
                value={this.state.bookingDate}
                onChange={e => this.change(e)} 
            />
            
            <br /> 

            <input
                name="bookingDuration"
                placeholder="Booking Duration"
                value={this.state.bookingDuration}
                onChange={e => this.change(e)} 
            />
            
            <br /> 

            <input
                name="bookingDescription"
                placeholder="Booking Description"
                value={this.state.bookingDescription}
                onChange={e => this.change(e)} 
            />
            
            <br /> 

            <input
                name="bookingPrice"
                placeholder="Booking Price"
                value={this.state.bookingPrice}
                onChange={e => this.change(e)} 
            />
            
            <br /> 
                
           <Button variant="contained" color="secondary" onClick={() => this.onSubmit()}> Book Now </Button>
            </form>
        )   
    }
}