import React, { Fragment } from 'react'

class CiteComponentError extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            errorOccurred : false
        }
    }

    componentDidCatch(error, info) {
        this.setState({ errorOccurred: true })
    }

    render(){
        const {errorOccurred} = this.state;
        if(errorOccurred) {
            return (
                <Fragment>
                    <p>
                    Error has occured in Assessment component...
                    </p>
                </Fragment>
            )
        }
        return this.props.children;
    }
}

export default CiteComponentError