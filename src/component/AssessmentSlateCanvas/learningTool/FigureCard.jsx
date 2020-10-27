/**
* @discription - FigureCard is a function based component. This component generate a card 
* of a row of the body table 
* for each search result given to it
*/
import React from 'react';
import PropTypes from 'prop-types'
class FigureCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    figureCardFunction = () => {
        this.props.selectedFigure(this.props.apiResultObject)
    }

    render() {
        const { forInputKey, apiResultObject, selectedResult, capitalizeString } = this.props
        return (
            <tr className={(selectedResult && (selectedResult.learningtemplateUrn == apiResultObject.learningtemplateUrn)) ? "modalCard highlightSelectedRow" : "modalCard"} >
                <td className="tableRowData">
                    <input
                        type="radio"
                        value={apiResultObject.learningtemplateUrn}
                        name="radioElem"
                        className="inputElem learningRadioButton"
                        checked={selectedResult.learningtemplateUrn === apiResultObject.learningtemplateUrn}
                        onChange={this.figureCardFunction}
                        id={forInputKey}
                        key={apiResultObject.learningtemplateUrn}
                    />
                    <p className="tableRow">{capitalizeString(apiResultObject.type)}</p>
                </td>
                <td className="tableRowData">
                    <p className="tableRow" htmlFor={forInputKey}>{apiResultObject.disciplines.en.join(", ")}</p>
                </td>
                <td className="tableRowData">
                    <p className="tableRow" htmlFor={forInputKey}>{apiResultObject.label.en}</p>
                </td>
                <td className="tableRowData">
                    <p className="tableRow" htmlFor={forInputKey}>{apiResultObject.dateModified}</p>
                </td>
                <td className="tableRowData">
                    <p className="tableRow" htmlFor={forInputKey}>{apiResultObject.keywords && apiResultObject.keywords.en ? apiResultObject.keywords.en.join(", ") : "-"}</p>
                </td>
                <td className="tableRowData">
                    <p className="tableRow" htmlFor={forInputKey}>{apiResultObject.templateid ? apiResultObject.templateid : "-"}</p>
                </td>
            </tr>
        );
    }
}
FigureCard.displayName = "FigureCard"

FigureCard.propTypes = {
    /** Unique key for each input field */
    forInputKey: PropTypes.number,
    /** this objects holds the value of all Learning tool to show */
    apiResultObject: PropTypes.object,
    /** this objects holds the value of selected Learning tempelate to show */
    selectedResult: PropTypes.object,
    /**selected entery from table of body */
    selectedFigure: PropTypes.object
}
export default FigureCard;