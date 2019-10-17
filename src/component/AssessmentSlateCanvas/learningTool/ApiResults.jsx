/**
* @discription - ApiResults is a class based component. This component generate a list of 
* each result and then render that list ☻
* on body part of the serachbar component
* to make a skelten of the Learning Tool UI
*/

import React from 'react';
import FigureCard from './FigureCard.jsx';
import ErrorComp from './ErrorComp.jsx';
import PropTypes from 'prop-types'

class ApiResults extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
    * @discription - dynamically generate cards of each result so call FigureCard
    * @param {Array} apiResponseForBody - Array of response from api got as a props from learningTool component
    * @param {String} selectedFigure - selected entery from table of body
    * @param {String} selectedResult 
    * @return {String} jsx of the card or row entery in table
    */
    apiResultsJsx = (apiResponseForBody, selectedFigure, selectedResult) => {
        if (apiResponseForBody.length >= 1) {
            let cardForApiResults = apiResponseForBody.map((value, index) => {
                return <FigureCard 
                forInputKey={index} 
                key={index} 
                apiResultObject={value} 
                selectedResult={selectedResult} 
                selectedFigure={selectedFigure}/>
            });
            return cardForApiResults;
        } else {

            let errorMsg = "No result found";
            let cardForApiResults = <ErrorComp errorMsg={errorMsg} />
            return cardForApiResults;
        }
    }

    render() {
        return (
            <div className="learning-tool-margin-left">
                {this.apiResultsJsx(this.props.apiResponseData, this.props.selectedFigure, this.props.selectedResult)}
            </div>
        )
    }
}

ApiResults.displayName = "ApiResults"

ApiResults.propTypes = {
    /** this objects holds the value of all Learning tool to show */
    apiResponseData: PropTypes.array,
    /** this objects holds the value of selected Learning tempelate to show */
    selectedResult: PropTypes.object,
    /**selected entery from table of body */
    selectedFigure: PropTypes.object
}
export default ApiResults;