import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from '@material-ui/core/Button';
import RegisterForm from "./components/RegisterForm.component";

// class AppContainer extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Hello from Create React App</h1>
//         <p>This is a React Component!</p>
//         <Button variant="contained" color="primary">
//             Material Button
//         </Button>
//       </div>
//     )
//   }
// }
// export default AppContainer

export default class AppContainer extends Component {
    constructor(props) {
        super(props);
    };
    
    render() {
        return (
            <div>
                <Router>
                    <Route path='/' component={RegisterForm}> </Route>
                
                </Router>
            </div>
        );
    };
};