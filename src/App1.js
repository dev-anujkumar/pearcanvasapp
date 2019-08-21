/*
* This is main App component which provides access
* to Application level state and give it to all its predecesors.
*/
// IMPORT - Plugins //
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';

// IMPORT - Components //
import store from './appstore/store';
import Chunked from './component/MyComponent.jsx';
import asyncComponent from "./component/AsyncComponent.jsx";
import ElementAuthoring from './component/ElementAuthoring/ElementAuthoring.jsx';

// IMPORT - Assets //
import img from './images/logo.png';
import './styles/style.css';

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
            <Provider store={store}>
                <Router>
                    <div>
                        <h1>Expack</h1>
                        <p className="description">Express and Webpack Boilerplate App</p>
                        <div className="awful-selfie"></div>
                        <hr />
                        <React.Fragment>
                            <h2>Your React App Is Running</h2>
                            <hr />
                            <Chunked />
                            <br />
                            <img src={img} />
                        </React.Fragment>

                        {/* <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about/">About</Link>
                            </li>
                            <li>
                                <Link to="/users/">Users</Link>
                            </li>
                        </ul>
                    </nav>

                    <Route path="/" exact component={Index} />
                    <Route path="/about/" component={About} />
                    <Route path="/users/" component={Users} /> */}
                    </div>
                </Router>
            </Provider>

        );
    }
}
export default App;