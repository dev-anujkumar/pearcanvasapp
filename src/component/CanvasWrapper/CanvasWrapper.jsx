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
import { CanvasIframeLoaded, HideWrapperLoader, ShowHeader,TocToggle } from '../../constants/IFrameMessageTypes.js';
import { getSlateLockStatus, setSlateLock, releaseSlateLock, setLockPeriodFlag } from './SlateLock_Actions'
import GlossaryFootnoteMenu from '../GlossaryFootnotePopup/GlossaryFootnoteMenu.jsx';
import { showTocBlocker, hideBlocker } from '../../js/toggleLoader'
import PopUp from '../PopUp';
// import { c2MediaModule } from './../../js/c2_media_module';
// const c2AssessmentModule = require('../js/c2_assessment_module.js');

class CanvasWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // navigation: false,
            // activeSlateIndex: 0,
            // activeSlate: config.slateList[0],
            showBlocker : false,
            showReleasePopup : false
        }
        this.handleCommentspanel = this.handleCommentspanel.bind(this);
    }

    componentDidMount() {        
        // uncomment to run Canvas Stabilization app as stand alone app //
        // this.props.fetchSlateData(this.state.activeSlate);
        // if(document.getElementById("cypress-0")){
        //     document.getElementById("cypress-0").focus();
        // }
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
        let { projectUrn } = config,
            // slateId = Object.keys(this.props.slateLevelData)[0]
            slateId = config.slateManifestURN

        this.props.getSlateLockStatus(projectUrn ,slateId) 
    }

    componentDidUpdate(prevProps, prevState){
        // if(this.state.navigation) {
            // if(document.getElementById("cypress-0")){
            //     document.getElementById("cypress-0").focus();
            // }

        //     this.state.navigation = false;
        // } else {
            if(window.tinymce.activeEditor && document.getElementById(window.tinymce.activeEditor.id)) {
                document.getElementById(window.tinymce.activeEditor.id).focus();
            }

        /* let { projectUrn } = config,
            slateId = Object.keys(prevProps.slateLevelData)[0],
            newSlateId = Object.keys(this.props.slateLevelData)[0]

        if(newSlateId && slateId !== newSlateId){
            this.props.getSlateLockStatus(projectUrn, newSlateId)
        } */
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
        // let activeSlateIndex = this.state.activeSlateIndex;
        // if(nav === 'next') {
        //     if(activeSlateIndex < (config.slateList.length -1)) {
        //         activeSlateIndex++;
        //     }
        // } else if(nav === 'back') {
        //     if(activeSlateIndex > 0 ) {
        //         activeSlateIndex--;
        //     }
        // }

        // this.setState({
        //     navigation: true,
        //     activeSlateIndex,
        //     activeSlate:config.slateList[activeSlateIndex]
        // });
        // this.props.fetchSlateData(config.slateList[activeSlateIndex]);
        // sendDataToIframe({
        //     'type': HideWrapperLoader,
        //     'message': { status: true }
        // })
    }

    showCanvasBlocker = (bFlag) =>{
        this.setState({
            showBlocker: bFlag
        });
    }
    releaseSlateLock = (projectUrn, slateId) => {
        this.props.releaseSlateLock(projectUrn, slateId)
    }

    debounceReleaseLock = (callback) => {
        //900000ms - 15mins
        let timer;
        let _context = this
        return function (){ 
            clearTimeout(timer)
            timer = setTimeout(()=>{
                if(_context.props.withinLockPeriod){
                    callback(config.projectUrn, Object.keys(_context.props.slateLevelData)[0])
                    _context.props.setLockPeriodFlag(false)
                    // alert("Lock has been released")
                    _context.setState({
                        showReleasePopup: true
                    })
                }  
            },900000)
        }
    }

    debounceReleaseTimeout = this.debounceReleaseLock(this.releaseSlateLock);

    setSlateLock = (slateId, lockDuration) => {
        if(this.props.withinLockPeriod){
            this.debounceReleaseTimeout()
            // this.debounceReleaseTimeout(this.props.releaseSlateLock)
        }
        else{
            const { projectUrn } = config
            this.props.setLockPeriodFlag(true)
            this.props.setSlateLock(projectUrn, slateId, lockDuration)
            this.debounceReleaseTimeout()  
        }
    }
    toggleLockReleasePopup = (toggleValue, event) => {
        this.setState({
            showReleasePopup: toggleValue
        })
        this.showCanvasBlocker(toggleValue)
        hideBlocker()
        this.prohibitPropagation(event)
    }

    prohibitPropagation = (event) =>{
        if(event){
            event.preventDefault()
            event.stopPropagation()
        }
        return false
    }


    
    openGlossaryFootnotePopUp=()=>{
              if(this.props.glossaryFootnoteValue.type==="Glossary"||this.props.glossaryFootnoteValue.type==="Footnote"){
        return (
        <GlossaryFootnoteMenu glossaryFootnote={this.props.glossaryFootnoteValue.type} activePopUp={this.props.glossaryFootnoteValue.popUpStatus}/>
        )
        
    }
    
    }    

    showLockReleasePopup = () => {
        if(this.state.showReleasePopup){
            // this.showCanvasBlocker(true)
            showTocBlocker();
            const dialogText = `Due to inactivity, this slate has been unlocked, and all your work has been saved`
            return(
                <PopUp  dialogText={dialogText}
                        active={true}
                        togglePopup={this.toggleLockReleasePopup}
                        isLockReleasePopup={true}
                        isInputDisabled={true}
                />
            )
        }
        else{
            return null
        }
    }
    
    render() {
        console.log('this is s ')
        // let navDisabled = '';
        // if(this.state.activeSlateIndex === 0) {
        //     navDisabled = 'back';
        // } else if(this.state.activeSlateIndex === (config.slateList.length -1)) {
        //     navDisabled = 'next';
        // }
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
                                <SlateWrapper handleCommentspanel={this.handleCommentspanel} slateData={this.props.slateLevelData} navigate={this.navigate} showBlocker= {this.showCanvasBlocker} setSlateLock={this.setSlateLock} />
                            </div>
                        </div>
                    </div>
                    <div id='text-settings-toolbar'>
                        <div className='panel-text-settings'>
                            {/* <span className='--rm-place'>Settings</span> */}
                            {this.openGlossaryFootnotePopUp()}
                             <Sidebar showPopUp={this.showPopUp}/>
                            {/*  <GlossaryFootnoteMenu glossaryFootnote="Glossary"/>  */}
                            {/* put side setting */}
                        </div>
                    </div>
                </div>
                {this.showLockReleasePopup()}  
            </div>
        );
    }
    
}

CanvasWrapper.displayName = "CanvasWrapper"
const mapStateToProps = state => {console.log('state:::', state);
    return {
        slateLevelData: state.appStore.slateLevelData,
        glossaryFootnoteValue:state.glossaryFootnoteReducer.glossaryFootnoteValue,
        elementsTag: state.appStore.elementsTag,
        withinLockPeriod: state.slateLockReducer.withinLockPeriod,
        slateLockInfo: state.slateLockReducer.slateLockInfo
    };
};


export default connect(
    mapStateToProps,
    {
        fetchSlateData,
        toggleCommentsPanel,
        fetchComments,
        fetchCommentByElement,
        getSlateLockStatus,
        setSlateLock,
        releaseSlateLock,
        setLockPeriodFlag
    }
)(CommunicationChannelWrapper(CanvasWrapper));
