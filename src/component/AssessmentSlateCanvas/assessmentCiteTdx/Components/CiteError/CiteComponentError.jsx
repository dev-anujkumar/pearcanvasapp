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
        console.error("Error, Assessment picker : ", error , " info: ", info)
        console.log("Render componentDidCatch CiteComponentError")
    }

    render(){
        console.log("render CiteComponentError")
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