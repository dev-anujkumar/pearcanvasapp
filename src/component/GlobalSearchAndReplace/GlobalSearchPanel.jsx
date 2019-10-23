// IMPORT - Plugins //
import React, { Component } from 'react';
// IMPORT - Dependency //
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();
// IMPORT - Assets //
import '../../styles/GlobalSearchAndReplace/style.css';
import toBeMatchedData from './sampleMatchedList.js';

class SearchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            REPLACE_INPUT: '',
            REPLACE_INDEX: 0
        }
    }

    handleChangeReplaceText = (e) => {
        this.setState({ REPLACE_INPUT: e.target.value })
    }

    handleReplace = () => {
        /**
         * TO DO
         */
    }

    handleReplaceAll = () => {
        /**
         * TO DO
         */
    }

    populateMatchedResults = (query) => {
        let matchedSummary = []
        for (let i = 0; i < toBeMatchedData.length; i++) {
            let formatted = toBeMatchedData[i].replace(/enim/ig, '<span class=\'highlight-match\'>enim</span>')
            let parsedElement = htmlToReactParser.parse(formatted)
            let matchedLi = <li className='panel-match'>
                <p id='match-1' className='panel-match-content'>
                    {parsedElement}
                </p>
                <br />
                <p>Slate:</p>
            </li>
            matchedSummary.push(matchedLi)
        }
        return matchedSummary
    }

    render() {
        return (
            <div className='panel-scrollable'>
                <div className='panel-content'>
                    <div className='panel-header kds-mb-32'>Find and Replace</div>
                    <label className='panel-label'>Find:</label>
                    <br />
                    <input type="text" className="panel-input" id="finder" value="one" disabled />
                    {/*--------------- add match case ---------------*/}
                    <div className="panel-label padding-t-8 margin-b-8">
                        <input type="checkbox" className="display-i-b width-5" value="match" name="matchcase" />
                        <label className="display-i-b width-60 panel-label">Match Case</label>
                        <button className="display-i-b width-35 btn-default-pill">Find</button>
                    </div>
                    {/*--------------- Replace & Replace All ---------------*/}
                    <div className='replace-panel'>
                        <label className="panel-label">Replace:</label>
                        <br />
                        <input type="text" className="panel-input" autoFocus value={this.state.REPLACE_INPUT} onChange={this.handleChangeReplaceText} />
                        <div className="panel-label padding-t-8 margin-b-8">
                            <div className="button-all-wrapper">
                                <button className="display-i-b width-100 btn-default-pill margin-r-10" onClick={this.handleReplaceAll} disabled={false}>Replace All</button>
                                <button className="display-i-b width-100 btn-default-pill margin-l-10" onClick={this.handleReplace} disabled={false}>Replace</button>
                            </div>
                        </div>
                        <div className={`panel-label padding-t-8 margin-b-8 ${this.state.REPLACE_INDEX <= 1 ? 'u-hide' : ''}`}>
                            <span className={this.state.REPLACE_INDEX <= 1 ? 'u-hide' : ''}>For replacing, please select at least select one item.</span>
                        </div>
                    </div>
                    {/*--------------- Navigation through matched results ---------------*/}
                    <div className='result-toggle-panel'>
                        <label className="panel-label display-i-b width-70"><b>Results (1 of 1):</b></label>
                        <div className="button-all-wrapper">
                            <button className="display-i-b width-40 btn-default-pill margin-r-10" disabled={false}>Previous</button>
                            <button className="display-i-b width-40 btn-default-pill margin-l-10" disabled={false}>Next</button>
                        </div>
                    </div>
                    {/*--------------- Populate matched result ---------------*/}
                    <div className='result-panel'>
                        <ul className='panel-matches'>
                            {
                                this.populateMatchedResults()
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
SearchPanel.displayName = "SearchPanel"

export default SearchPanel;