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
            learningType: {
                "accounting-sims": "Accounting Sims",
                "socialexplorer-pathways": "Adaptive Pathways",
                "criminal-justice-sims": "Criminal Justice Sims",
                "video-library": "Video Library",
                "economics-sims": "Economic Sims",
                "socialexplorer-explorations": "Guided Data Explorations",
                "helpdesk": "HelpDesk",
                "hospitality-sims": "Hospitality Sims",
                "information-technology-sims": "Information Technology Sims",
                "qual-sims": "Qualitative Business Sims",
                "soundbytes": "Sound Bytes",
                "personal-finance-experience": "Personal Finance",
                "political-science-sims":"Political Science Sims",
                "Psychology Sims": "Psychology Sims",
                "video-submission": "Shared Media",
                "video-quiz": "Media Quiz",
                "myvirtual-child": "MyVirtualChild",
                "myvirtual-life": "MyVirtualLife",
                "socialexplorer-surveys": "Surveys and Inventories",
                "writingsolutions": "Writing Solutions"
            }
        }
    }

    figureCardFunction =() =>{
        this.props.selectedFigure(this.props.apiResultObject)
    }

    render() {

        return (
            <tr className={(this.props.selectedResult && (this.props.selectedResult.learningtemplateUrn == this.props.apiResultObject.learningtemplateUrn)) ? "modalCard highlightSelectedRow" : "modalCard"} >
                <td className="tableRowData">
                    <input
                        type="radio"
                        value={this.props.apiResultObject.learningtemplateUrn}
                        name="radioElem"
                        className="inputElem learningRadioButton"
                        checked={this.props.selectedResult.learningtemplateUrn === this.props.apiResultObject.learningtemplateUrn}
                        onChange={this.figureCardFunction}
                        id={this.props.forInputKey}
                        key={this.props.apiResultObject.learningtemplateUrn}
                    />
                {/* </td>
                <td className="tableRow"> */}
                    <p className="tableRow">{this.state.learningType[this.props.apiResultObject.type]}</p>
                </td>
                <td className="tableRowData">
                    <p className="tableRow" htmlFor={this.props.forInputKey}>{this.props.apiResultObject.disciplines.en.join(", ")}</p>
                </td>
                <td className="tableRowData">
                    <p className="tableRow" htmlFor={this.props.forInputKey}>{this.props.apiResultObject.label.en}</p>
                </td>
                <td className="tableRowData">
                    <p className="tableRow" htmlFor={this.props.forInputKey}>{this.props.apiResultObject.dateModified}</p>
                </td>
                <td className="tableRowData">
                    <p className="tableRow" htmlFor={this.props.forInputKey}>{this.props.apiResultObject.keywords && this.props.apiResultObject.keywords.en ? this.props.apiResultObject.keywords.en.join(", ") : "-"}</p>
                </td>
                <td className="tableRowData">
                    <p className="tableRow" htmlFor={this.props.forInputKey}>{this.props.apiResultObject.templateid ? this.props.apiResultObject.templateid : "-"}</p>
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
