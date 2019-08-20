import React, { Component } from 'react';
import Chunked from './component/MyComponent.jsx';
import asyncComponent from "./component/AsyncComponent.jsx";
import './styles/style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import img from './images/logo.png';
import ElementAuthoring from './component/ElementAuthoring/ElementAuthoring.jsx'

// Route Based 
import RouteComponent from './component/RouteComponent.jsx';
const AsyncHome = asyncComponent(() => import("./component/RouteComponent.jsx"));


function Index() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Router>
                <div>
                </div>
            </Router>
        );
    }
}
export default App;