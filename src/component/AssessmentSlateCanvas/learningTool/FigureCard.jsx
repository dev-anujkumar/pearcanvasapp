/**
* @discription - FigureCard is a function based component. This component generate a card 
* of a row of the body table 
* for each search result given to it
*/
import React from 'react';

class FigureCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            learningType : {
                "accounting-sims":"Accounting Sims",
                "criminal-justice-sims":"Criminal Justice Sims",
                "digital-interactives":"Video Library",
                "economics-sims":"Economic Sims",
                "helpdesk":"HelpDesk",
                "hospitality-sims":"Hospitality Sims",
                "information-technology-sims":"Information Technology Sims",
                "qual-sims":"Qualitative Business Sims",
                "soundbites":"Sound Bytes",
                "Personal Finance":"Personal Finance",
                "Psychology Sims":"Psychology Sims",
                "video-submission":"Shared Media",
                "video-quiz":"Media Quiz",
                "myvirtual-child":"MyVirtualChild",
                "myvirtual-life":"MyVirtualLife",
                "survey":"Surveys and Inventories",
                "writingsolutions":"Writing Solutions"
            }
        }
        this.figureCardFunction = this.figureCardFunction.bind(this);
    }

    figureCardFunction() {
        this.props.selectedFigure(this.props.apiResultObject)
    }

    render() {

        return (
            <tr className={(this.props.selectedResult && (this.props.selectedResult.learningtemplateUrn == this.props.apiResultObject.learningtemplateUrn)) ? "modalCard highlightSelectedRow" : "modalCard"} >
                <td >
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
                </td>
                <td className="tableRow">
                  {this.state.learningType[this.props.apiResultObject.type]}
                </td>
                <td >
                    <p className="tableRow" htmlFor={this.props.forInputKey}>{this.props.apiResultObject.disciplines.en.join(", ")}</p>
                </td>
                <td >
                    <p className="tableRow" htmlFor={this.props.forInputKey}>{this.props.apiResultObject.label.en}</p>
                </td>
                <td >
                    <p className="tableRow" htmlFor={this.props.forInputKey}>{this.props.apiResultObject.dateModified}</p>
                </td>
                <td >
                    <p className="tableRow" htmlFor={this.props.forInputKey}>{this.props.apiResultObject.keywords && this.props.apiResultObject.keywords.en ? this.props.apiResultObject.keywords.en.join(", ") : "-"}</p>
                </td>
            </tr>
        );
    }
}

export default FigureCard;
