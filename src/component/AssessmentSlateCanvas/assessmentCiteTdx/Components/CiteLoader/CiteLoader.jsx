import React, { Fragment } from 'react'
import {PUF} from '../../../AssessmentSlateConstants'
class CiteLoader extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const {isLoading, citeErrorFlag} = this.props;
        console.log("loader")
        return (
            <Fragment>
                {isLoading ? <div className ={`no-result ${this.props.openedFrom== PUF? 'elm-loading' : ''}`}>Loading...</div> : "" }                
                {(isLoading == false) && citeErrorFlag ? <div className ="no-result">There is an error, please retry later...</div> : ""}
            </Fragment>
        )
    }
}

export default CiteLoader