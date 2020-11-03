/**
* @discription - ApiResults is a component that generates a list of search results
*/
import React from 'react';
import FigureCard from './FigureCard.jsx';

const ApiResults = (props) => {

    return props.apiResponseData.map((value, index) => {
        return <FigureCard
            forInputKey={index}
            apiResultObject={value}
            {...props}
        />
    });
}

ApiResults.displayName = "ApiResults"

export default ApiResults;