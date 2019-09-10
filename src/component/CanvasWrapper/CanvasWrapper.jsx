// IMPORT - Plugins //
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentsPanel from '../CommentsPanel'
// IMPORT - Components //
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

export class CanvasWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSlateIndex: 0,
            activeSlate: config.slateList[0]
        }
        this.handleCommentspanel = this.handleCommentspanel.bind(this);
    }

    componentDidMount() {
        // uncomment to run Canvas Stabilization app as stand alone app //
       this.props.fetchSlateData(this.state.activeSlate);
       if(document.getElementById("cypress-0")){
           document.getElementById("cypress-0").focus();
       }
    }

    componentDidUpdate(){
        if(document.getElementById("cypress-0")){
            document.getElementById("cypress-0").focus();
        }
    }
    handleCommentspanel(elementId){
        console.log("elementId",elementId);
        this.props.toggleCommentsPanel(true);
        this.props.fetchCommentByElement(elementId);
    }

    navigate = (nav) => {
        let activeSlateIndex = this.state.activeSlateIndex;
        if(nav === 'next') {
            activeSlateIndex++;
        } else if(nex === 'back') {
            activeSlateIndex--;
        }

        this.setState({
            activeSlateIndex,
            activeSlate:config.slateList[activeSlateIndex]
        });
    }

    render() {
        console.log("in render >>", this.props.slateLevelData)
        return (
            <div className='content-composer'>
                <div className="overlay-container">
                    {/* Header Section goes here */}
                    <h1>Header Section</h1>
                </div>
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
                                <SlateWrapper handleCommentspanel= {this.handleCommentspanel} slateData={this.props.slateLevelData} navigate={this.navigate} />
                            </div>
                        </div>
                    </div>
                    <div id='text-settings-toolbar'>
                        <div className='panel-text-settings'>
                            {/* <span className='--rm-place'>Settings</span> */}
                            <Sidebar />
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
        slateLevelData: state.appStore.slateLevelData,
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
)(CanvasWrapper);
