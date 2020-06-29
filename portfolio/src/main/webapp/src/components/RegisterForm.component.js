import React, { Component } from 'react';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            email: '',
            firstname: '',
            lastname: '',
        }
    };

    componentDidMount() {
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    };

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    };
    
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    };

    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value
        })
    };

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        })
    };

    onSubmit(e) {
        e.preventDefault();
        const registerInfo = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname
        }
        console.log(registerInfo);
        this.props.passRegisterInfo(registerInfo);
    }

    render() {
        return (
            <form class="register-form animate__animated animate__fadeInUp animate__delay-3s" onSubmit={this.onSubmit}> 
                <div class="form-names-container">
                    <div class="form-div long-input">
                        <label>First:</label>
                        <input id="firstname-submit" type="text" value={this.state.firstname} onChange={this.onChangeFirstname} />
                    </div>
                    <div class="form-div long-input">
                        <label>Last:</label>
                        <input id="lastname-submit" type="text" value={this.state.lastname} onChange={this.onChangeLastname} />
                    </div>
                </div>
                <div class="form-div">
                        <label>Username:</label>
                        <input id="username-submit" type="text" value={this.state.username} onChange={this.onChangeUsername} />
                </div>
                <div class="form-div">
                        <label>Email:</label>
                        <input id="email-submit" type="text" value={this.state.email} onChange={this.onChangeEmail} />
                </div>
                <div class="form-div">
                    <label>Password:</label>
                    <input id="password-submit" type="text" value={this.state.password} onChange={this.onChangePassword} />
                </div>
                <div class="form-div-button">
                    <button class="register-button" href="#">Register</button>
                </div>
            </form>
        );
    }
}