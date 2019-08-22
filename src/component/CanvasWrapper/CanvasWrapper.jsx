// IMPORT - Plugins //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// IMPORT - Components //
import SlateWrapper from '../SlateWrapper';
import SlateHeader from '../CanvasSlateHeader';

// IMPORT - Assets //
import '../../styles/CanvasWrapper/style.css';

export class CanvasWrapper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='content-composer'>
                <div id="editor-toolbar" className="editor-toolbar">
                    {/* <span className='--rm-place'>Tool Bar</span> */}
                    {/* put editor tool */}
                    <div className="header" id="tinymceToolbar"></div>
                </div>
                <div className='workspace'>
                    <div id='canvas' className='canvas'>
                        <div id='artboard-containers'>
                            <div id='artboard-container' className='artboard-container'>
                                {/* slate wrapper component combines slate content & slate title */}
                                <SlateWrapper slateData={this.props.slateLevelData} />
                            </div>
                        </div>
                    </div>
                    <div id='text-settings-toolbar'>
                        <div className='panel-text-settings'>
                            <span className='--rm-place'>Settings</span>
                            {/* put side setting */}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        slateLevelData: state.appStore.slateLevelData
    };
};

export default connect(
    mapStateToProps,
    null)(CanvasWrapper);