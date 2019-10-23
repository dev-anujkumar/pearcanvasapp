// IMPORT - Plugins //
import React, { Component } from 'react';
// IMPORT - Dependency //
// IMPORT - Assets //
import '../../styles/GlobalSearchAndReplace/style.css';

class SearchPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='panel-scrollable'>
                <div className='panel-content'>
                    <div className='panel-header kds-mb-32'>Find and Replace</div>
                    <label className='panel-label'>Find:</label>
                    <br />
                    <input type="text" className="panel-input" id="finder" value="one" disabled />
                    <div className="panel-label padding-t-8 margin-b-8">
                        <input type="checkbox" className="display-i-b width-5" value="match" name="matchcase" />
                        <label className="display-i-b width-60 panel-label">Match Case</label>
                        <button className="display-i-b width-35 btn-default-pill">Find</button>
                    </div>
                    <div>
                        <label className="panel-label">Replace:</label>
                        <br />
                        <input type="text" className="panel-input" value="" />
                        <div className="panel-label padding-t-8 margin-b-8">
                            <div className="button-all-wrapper">
                                <button className="display-i-b width-100 btn-default-pill margin-r-10" disabled>Replace All</button>
                                <button className="display-i-b width-100 btn-default-pill margin-l-10" disabled>Replace</button>
                            </div>
                        </div>
                        <div className="panel-label padding-t-8 margin-b-8 u-hide">
                            <span className="u-hide">For replacing, please select at least select one item.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
SearchPanel.displayName = "SearchPanel"

export default SearchPanel;