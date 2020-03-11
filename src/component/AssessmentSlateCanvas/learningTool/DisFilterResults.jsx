/**
* @discription - DisFilterResults is a class based component. This component generate a list 
* of each result and then render that list ☻
* this is the dynamically rendering of dropdown of discipline
*/
import React from 'react';
import ErrorComp from './ErrorComp.jsx';
import PropTypes from 'prop-types'

class DisFilterResults extends React.Component {
    constructor(props) {
        super(props);
    }
    /**
    * @discription - dynamically generate enteries of each result of discipline filter dropdown
    * @param {Array} apiResponseForDis - Array of response from api of discipline
    * @return {String} jsx of one entery in discipline dropdown
    */
    disApiResultsJsx = (apiResponseForDis) => {
        if (apiResponseForDis.length >= 1) {
            let cardForDisApiResults = apiResponseForDis.map((value, index) => {
                return <option key={index} value={value.disciplineName}>{value.disciplineName}</option>
            });
            return cardForDisApiResults;
        } else {
            let errorMsg = "No result found";
            let cardForDisApiResults = <ErrorComp errorMsg={errorMsg} />
            return cardForDisApiResults;
        }
    }

    render() {
        return (
            <div>
                {this.disApiResultsJsx(this.props.apiResponseForDis)}
            </div>
        )
    }
}

DisFilterResults.displayName = "DisFilterResults"

DisFilterResults.propTypes = {
    /** this array holds the add the descpline value */
    apiResponseForDis: PropTypes.object,
}
export default DisFilterResults;