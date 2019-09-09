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
        let activeElementId = '';
        let activeElementType = '';
        if(Object.keys(this.state.activeElement).length > 0) {
            activeElementId = this.state.activeElement.id;
            activeElementType = this.state.activeElement.type;
        }

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
                            <Sidebar slateId={this.state.activeSlate} />
                            {/* put side setting */}
                        </div>
                    </div>
                </div>  
            </div>

        );
    }
    
}

const mapStateToProps = state => {console.log('canvas state:::', state);
    return {
        slateLevelData: state.appStore.slateLevelData
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
