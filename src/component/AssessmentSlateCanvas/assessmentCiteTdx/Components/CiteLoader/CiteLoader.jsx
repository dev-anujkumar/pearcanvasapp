import React, { Fragment } from 'react'

class CiteLoader extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const {isLoading, citeErrorFlag} = this.props;
        return (
            <Fragment>
                <p>
                {isLoading ? 'Loading...' : "" }
                {citeErrorFlag ? 'There is an error, please retry later...' : ""}
                </p>
            </Fragment>
        )
    }
}

export default CiteLoader