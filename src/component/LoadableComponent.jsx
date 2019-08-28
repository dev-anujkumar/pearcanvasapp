import React, { Component } from 'react';

class LoadableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <h2>Your Lazy Component Is Loaded ....</h2>
            </React.Fragment>
        );
    }
}
export default LoadableComponent;