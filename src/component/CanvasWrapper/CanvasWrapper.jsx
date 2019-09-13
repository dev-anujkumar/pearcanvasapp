// IMPORT - Plugins //
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentsPanel from '../CommentsPanel'
// IMPORT - Components //
import CommunicationChannelWrapper from '../HOCs/WrapperChannel';
import SlateWrapper from '../SlateWrapper';
import SlateHeader from '../CanvasSlateHeader';
import Sidebar from '../Sidebar';
import {
    fetchSlateData
} from './CanvasWrapper_Actions';
import {toggleCommentsPanel,fetchComments,fetchCommentByElement} from '../CommentsPanel/CommentsPanel_Action'
import Toolbar from '../Toolbar';
import config from './../../config/config';

// IMPORT - Assets //
import '../../styles/CanvasWrapper/style.css';
import { sendDataToIframe } from '../../constants/utility.js';
import { CanvasIframeLoaded, HideWrapperLoader, ShowHeader } from '../../constants/IFrameMessageTypes.js';

class CanvasWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSlateIndex: 1,
            activeSlate: config.slateList[1],
            activeElement: {}
        }
        this.handleCommentspanel = this.handleCommentspanel.bind(this);
    }

    componentDidMount() {
        // uncomment to run Canvas Stabilization app as stand alone app //
       this.props.fetchSlateData(this.state.activeSlate);
       if(document.getElementById("cypress-0")){
           document.getElementById("cypress-0").focus();
       }
        sendDataToIframe({
            'type': CanvasIframeLoaded,
            'message': {}
        });
        // *********************************************************
        // *************** TO BE PLACED PROPERLY *****************//
        sendDataToIframe({
            'type': HideWrapperLoader,
            'message': { status: true }
        })
        sendDataToIframe({
            'type': ShowHeader,
            'message': true
        })
        // *********************************************************
    }

    componentDidUpdate(){
        // if(document.getElementById("cypress-0")){
        //     document.getElementById("cypress-0").focus();
        // }
    }
    handleCommentspanel(elementId){
        this.props.toggleCommentsPanel(true);
        this.props.fetchCommentByElement(elementId);
    }

    navigate = (nav) => {
        let activeSlateIndex = this.state.activeSlateIndex;
        if(nav === 'next') {
            activeSlateIndex++;
        } else if(nav === 'back') {
            activeSlateIndex--;
        }

        this.setState({
            activeSlateIndex,
            activeSlate:config.slateList[activeSlateIndex]
        });
        this.props.fetchSlateData(config.slateList[activeSlateIndex]);
    }

    render() {
        return (
            <div className='content-composer'>
                <div id="editor-toolbar" className="editor-toolbar">
                    {/* put editor tool */}
                    <Toolbar />
                </div>

                <div className='workspace'>
                    <div className = "sidebar-panel">
                        {/* pull all sidebar panel */}
                        <CommentsPanel />
                    </div>
                    <div id='canvas' className='canvas'>
                        <div id='artboard-containers'>
                            <div id='artboard-container' className='artboard-container'>
                                {/* slate wrapper component combines slate content & slate title */}
                                <SlateWrapper handleCommentspanel= {this.handleCommentspanel} slateData={this.props.slateLevelData} tags={this.props.elementsTag} navigate={this.navigate} />
                            </div>
                        </div>
                    </div>
                    <div id='text-settings-toolbar'>
                        <div className='panel-text-settings'>
                            {/* <span className='--rm-place'>Settings</span> */}
                            <Sidebar slateId={this.state.activeSlate} />
                            {/* put side setting */}
                        </div>
                    </div>
                </div>  
            </div>
        );
    }
    
}
CanvasWrapper.displayName = "CanvasWrapper"

const mapStateToProps = state => {
    return {
        slateLevelData: state.appStore.slateLevelData,
        elementsTag: state.appStore.elementsTag
    };
};


export default connect(
    mapStateToProps,
    {
        fetchSlateData,
        toggleCommentsPanel,
        fetchComments,
        fetchCommentByElement
    }
)(CommunicationChannelWrapper(CanvasWrapper));
