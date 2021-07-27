/**
* @discription - FigureCard is a function based component. This component generate a card 
* of a row of the body table 
* for each search result given to it
*/
import React from 'react';
import PropTypes from 'prop-types';
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
        const { forInputKey, apiResultObject, selectedResult, learningSystems } = this.props
        const appTypeValue = learningSystems.find(value => value.type == apiResultObject.type).label;
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
                    <p className="tableRow">{appTypeValue}</p>
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
    forInputKey: PropTypes.number,
    apiResultObject: PropTypes.object,
    selectedResult: PropTypes.object
}
export default FigureCard;