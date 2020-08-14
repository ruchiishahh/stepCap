import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default class RegisterPage extends Component {
 constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeConfirm = this.onChangeConfirm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        username: "",
        validUsername: true,
        password: "",
        confirmPassword: "",
        validPassword: true,
        email: "",
        validEmail: true,
        firstname: "",
        validFirst: true,
        lastname: "",
        validLast: true,
        phone: "",
        validPhone: true,
        showLogin: true,
        loginPassword: "",
        loginUser: "",
        errorUser: false,
        errorLogin: false,
    };
  }

  handleInputValidation = () => {
    if (this.state.firstname === "") {
      return false;
    }
    if (this.state.lastname === "") {
      return false;
    }
    if (!this.state.validUsername || this.state.username === "") {
      return false;
    }
    if (!this.state.validPassword || this.state.password === "" || (this.state.password !== this.state.confirmPassword)) {
      return false;
    }
    if (!this.state.validEmail || this.state.email === "") {
      return false;
    }
    if (!this.state.validPhone) {
      return false;
    }
    return true;
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    }, () => {
      if (/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(this.state.username)) {
        this.setState({ validUsername: true})
      } else {
        this.setState({ validUsername: false})
      }
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    }, () => {
      if (this.state.phone === "" || /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(this.state.phone)) {
        this.setState({ validPhone: true})
        console.log("valid")
      } else {
        this.setState({ validPhone: false})
        console.log("invalid")
      }
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    }, () => {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
        this.setState({ validEmail: true})
      } else {
        this.setState({ validEmail: false})
      }
    });
  }

onChangePassword(e) {
    this.setState({
      password: e.target.value,
    }, () => {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.state.password)) {
        this.setState({ validPassword: true})
      } else {
        this.setState({ validPassword: false})
      }
    });
  }

  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value,
    }, () => {
      if (this.state.firstname !== "") {
        this.setState({ validFirst: true})
      } else {
        this.setState({ validFirst: false})
      }
    });
  }

  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value,
    }, () => {
      if (this.state.lastname !== "") {
        this.setState({ validLast: true})
      } else {
        this.setState({ validLast: false})
      }
    });
  }

  onChangeConfirm(e) {
    this.setState({
      confirmPassword: e.target.value,
    });
  }

  onLoginUser = (e) => {
    this.setState({
      loginUser: e.target.value,
    })
  }

  onLoginPassword = (e) => {
    this.setState({
      loginPassword: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.handleInputValidation()) {
      console.log("failed");
      return;
    }
    const registerInfo = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone
    };
    console.log(registerInfo);
    axios.post('https://thecommons-1.appspot.com/backend/registered', registerInfo)
       .then(res => {
           console.log(res.data);
           console.log(this.props);
           const registerInfoUpdated = {
               user_id: res.data[1],
               username: this.state.username,
               email: this.state.email,
               phone: this.state.phone,
               firstname: this.state.firstname,
               lastname: this.state.lastname,
           }
           this.props.passRegisterInfo(registerInfoUpdated);
           this.props.history.push('/search');
       })
       .catch((err)=>console.log(err));
  }

  handleLoginResponse = (data) => {
      console.log(data);
      const user = data;
    if (user.logged) {
        const registerInfo = {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone
        };
        console.log(registerInfo);
        this.props.passRegisterInfo(registerInfo);
        this.props.history.push('/search');
    } else {
        this.setState({errorLogin: true})
    }
  }

  onLogin = (e) => {
    e.preventDefault();
    console.log(this.state.loginUser);
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.loginUser)) {
      axios.post("https://thecommons-1.appspot.com/log", {username: "", email: this.state.loginUser, password: this.state.loginPassword}).then(response => {
          console.log(response.data);
        this.handleLoginResponse(response.data);
      })
    } else if (/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(this.state.loginUser)) {
      axios.post("https://thecommons-1.appspot.com/log", {username: this.state.loginUser, email: "", password: this.state.loginPassword}).then(response => {
          console.log(response.data);

            this.handleLoginResponse(response.data);
        })
    } else {
      this.setState({errorUser: true})
    }
  }

  showRegister = () => {
    this.setState(prevState => ({
      showLogin: !prevState.showLogin,
    }))
  }

  render() {
    return (
        <div class="landing-main-container">
            <div class="landing-body-container">
                <div id="landing-title" class="center-title animate__animated animate__fadeIn">THECOMMONS</div>
                <div id="landing-tagline" class="center-text animate__animated animate__fadeIn">Help anyone. Get help on anything.</div>
          <div class="tabs animate__animated animate__fadeInUp">
            <ul class="nav">
              <button onClick={this.showRegister} class={this.state.showLogin ? "tabs-active" : "tabs-inactive"}>Login</button>
              <button onClick={this.showRegister} class={this.state.showLogin ? "tabs-inactive" : "tabs-active"}>Register</button>
            </ul>
          </div>

                {this.state.showLogin ? (
                  <form class="login-form animate__animated animate__fadeInUp animate__delay-1s" onSubmit={this.onLogin}> 
                          <div class="form-div">
                              <label> 
                              Username/Email 
                                {this.state.errorUser ? (<div class="alert alert-danger" role="alert">
                                    No username or email exists by that name.
                                </div>) : null}
                            </label>
                              <input id="user-login" type="text" value={this.state.loginUser} onChange={this.onLoginUser} />
                          </div>
                          <div class="form-div">
                              <label> Password </label>
                              <input id="password-login" type="password" value={this.state.loginPassword} onChange={this.onLoginPassword} />
                          </div>
                            {this.state.errorLogin ? (<div class="alert alert-danger" role="alert">
                                Wrong username or password.
                              </div>) : null}
                          <button class="login-button" onClick={this.onLogin}>Login</button>
                  </form>
                ) : (


                <div class="register-form-container">
                    <form class="register-form animate__animated animate__fadeInUp animate__delay-1s" onSubmit={this.onSubmit}> 
                        <div class="form-names-container">
                            <div class="form-div">
                                <label>
                                  <span style={{color: "red"}}>* </span>
                                  First:
                                  {!this.state.validFirst ? (<div class="alert alert-danger" role="alert">
                                Cannot be empty
                              </div>) : null}
                                </label>
                                <input id="firstname-submit" type="text" value={this.state.firstname} onChange={this.onChangeFirstname} />
                            </div>
                            <div class="form-div">
                                <label>
                                  <span style={{color: "red"}}>*</span>
                                  Last:
                                  {!this.state.validLast ? (<div class="alert alert-danger" role="alert">
                                Cannot be empty
                              </div>) : null}</label>
                                <input id="lastname-submit" type="text" value={this.state.lastname} onChange={this.onChangeLastname} />
                            </div>
                        </div>
                        <div class="form-div">
                            <label>
                              <span style={{color: "red"}}>* </span>
                              Username:
                              {!this.state.validUsername ? (<div class="alert alert-danger" role="alert">
                                8-20 Characters.
                              </div>) : null}
                            </label>
                            <input id="username-submit" type="text" value={this.state.username} onChange={this.onChangeUsername} />
                        </div>
                        <div class="form-div">
                            <label><span style={{color: "red"}}>* </span>Email:</label>
                            <input id="email-submit" type="text" value={this.state.email} onChange={this.onChangeEmail} />
                        </div>

                        <div class="form-div">
                            <label><span style={{color: "red"}}>* </span>Password: 
                            {!this.state.validPassword ? (<div class="alert alert-danger" role="alert">
                                Minimum 8 characters, one upper case letter, one lowercase letter, one number, and one special character.
                              </div>) : null}
                            </label>
                            <input id="password-submit" type="password" value={this.state.password} onChange={this.onChangePassword} />
                        </div>

                        <div class="form-div">
                            <label><span style={{color: "red"}}>* </span>Confirm Password: 
                            {this.state.confirmPassword !== this.state.password ? (<div class="alert alert-danger" role="alert">
                                Passwords must match.
                              </div>) : null}
                            </label>
                            <input id="password-confirm" type="password" value={this.state.confirmPassword} onChange={this.onChangeConfirm} />
                        </div>

                        <div class="form-div">
                            <label>Phone:
                            {!this.state.validPhone ? (<div class="alert alert-danger" role="alert">
                                Any form of (xxx)xxxxxxx | xxxxxxxxxx | xxx-xxx-xxxx
                              </div>) : null}
                            </label>
                            <input id="phone-submit" type="text" value={this.state.phone} onChange={this.onChangePhone} />
                        </div>

                        <div class="form-div-button">
                            <button class="register-button" href="#">Register</button>
                        </div>
                    </form>
                </div>
                )}
            </div>
        </div>
    );
}
}
