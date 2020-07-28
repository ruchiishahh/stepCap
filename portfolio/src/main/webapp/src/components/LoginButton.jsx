import React, { Component } from 'react';

function Welcome(props) {
    console.log(props);
    return (
        <div class="btn btn-success"><a href={props.loginUrl}> login </a></div>
    )
}
 
export default Welcome;