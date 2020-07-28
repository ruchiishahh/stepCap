import React, { Component } from 'react';
import Navbar from "./Navbar";


function Welcome(props) {
    console.log(props.userInfo);
    return (
        <div class="welcome-page-container">
            <Navbar />
            <div> Welcome {props.userInfo.user_firstname}</div>
        </div>
    )
}
 
export default Welcome;