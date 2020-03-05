import React, { Fragment } from 'react'

class CiteLoader extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const {isLoading, citeErrorFlag} = this.props;
        return (
            <Fragment>
                {isLoading ? <div className ="no-result">Loading...</div> : "" }
                {(isLoading == false) && citeErrorFlag ? <div className ="no-result">There is an error, please retry later...</div> : ""}
            </Fragment>
        )
    }
}

export default CiteLoader