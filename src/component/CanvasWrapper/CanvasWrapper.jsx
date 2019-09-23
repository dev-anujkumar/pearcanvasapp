// IMPORT - Plugins //
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentsPanel from '../CommentsPanel'
// IMPORT - Components //
import CommunicationChannelWrapper from '../HOCs/WrapperChannel';
import SlateWrapper from '../SlateWrapper';
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
import { CanvasIframeLoaded, HideWrapperLoader, ShowHeader,TocToggle} from '../../constants/IFrameMessageTypes.js';

class CanvasWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navigation: false,
            activeSlateIndex: 1,
            activeSlate: config.slateList[1],
            activeElement: {},
            showBlocker : false
        }
        this.handleCommentspanel = this.handleCommentspanel.bind(this);
    }

    componentDidMount() {
        // uncomment to run Canvas Stabilization app as stand alone app //
     //  this.props.fetchSlateData(this.state.activeSlate);
       if(document.getElementById("cypress-0")){
           document.getElementById("cypress-0").focus();
       }
        sendDataToIframe({
            'type': CanvasIframeLoaded,
            'message': {}
        });
        // *********************************************************
        // *************** TO BE PLACED PROPERLY *****************//
        // sendDataToIframe({
        //     'type': HideWrapperLoader,
        //     'message': { status: true }
        // })
        sendDataToIframe({
            'type': ShowHeader,
            'message': true
        })
        // *********************************************************
    }

    componentDidUpdate(){
        if(this.state.navigation) {
            if(document.getElementById("cypress-0")){
                document.getElementById("cypress-0").focus();
            }

            this.setState({
                navigation: false
            });
        } else {
            if(window.tinymce.activeEditor) {
                document.getElementById(window.tinymce.activeEditor.id).focus();
            }
        }
    }
    
    handleCommentspanel(elementId){
        this.props.toggleCommentsPanel(true);
        this.props.fetchCommentByElement(elementId);
        sendDataToIframe({
            'type': TocToggle,
            'message': {"open":false}
        });
    }

    navigate = (nav) => {
        let activeSlateIndex = this.state.activeSlateIndex;
        if(nav === 'next') {
            if(activeSlateIndex < (config.slateList.length -1)) {
                activeSlateIndex++;
            }
        } else if(nav === 'back') {
            if(activeSlateIndex > 0 ) {
                activeSlateIndex--;
            }
        }

        this.setState({
            navigation: true,
            activeSlateIndex,
            activeSlate:config.slateList[activeSlateIndex]
        });
          this.props.fetchSlateData(config.slateList[activeSlateIndex]);
        sendDataToIframe({
            'type': HideWrapperLoader,
            'message': { status: true }
        })
    }

    showCanvasBlocker = () =>{
        console.log("showCanvasBlocker >>")
        this.setState({
            showBlocker: true
        });
    }

    render() {
        let navDisabled = '';
        if(this.state.activeSlateIndex === 0) {
            navDisabled = 'back';
        } else if(this.state.activeSlateIndex === (config.slateList.length -1)) {
            navDisabled = 'next';
        }

        return (
            <div className='content-composer'>
                {this.state.showBlocker ? <div className="canvas-blocker" ></div> : '' }
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
                                <SlateWrapper disabled={navDisabled} handleCommentspanel={this.handleCommentspanel} slateData={this.props.slateLevelData} tags={this.props.elementsTag} navigate={this.navigate} showBlocker= {this.showCanvasBlocker} />
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
