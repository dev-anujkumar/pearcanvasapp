// IMPORT - Plugins //
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentsPanel from '../CommentsPanel'
// IMPORT - Components //
import CommunicationChannelWrapper from '../HOCs/WrapperChannel';
import SlateWrapper from '../SlateWrapper';
import Sidebar from '../Sidebar';
import AssetPopoverSearch from '../AssetPopover/AssetPopoverSearch.jsx';
import {
    fetchSlateData,fetchAuthUser
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

// IMPORT - Actions //
import { convertToListElement } from '../ListElement/ListElement_Action.js';
import {publishContent,logout} from '../../js/header'

import { handleSplitSlate,setUpdatedSlateTitle } from '../SlateWrapper/SlateWrapper_Actions'
import { currentSlateLO } from '../ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
import { handleUserRole } from './UserRole_Actions'
import RootContext from './CanvasContexts.js';
import { handleSlateRefresh } from '../CanvasWrapper/SlateRefresh_Actions'
import { fetchAudioNarrationForContainer , deleteAudioNarrationForContainer,showAudioRemovePopup } from '../AudioNarration/AudioNarration_Actions'
export class CanvasWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorToolbarRef: null,
            showReleasePopup : false,
            toggleApo : false,
            isPageNumberEnabled : false,
            openDropDown : false,
            addDropDown : false

        }
        this.handleCommentspanel = this.handleCommentspanel.bind(this);

        
    }

    static getDerivedStateFromProps(nextProps, prevState){
            if(prevState.slateRefreshStatus !== nextProps.slateRefreshStatus) {
                sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': {slateRefreshStatus:nextProps.slateRefreshStatus} }); 
            }
            return null;    
     }

    componentDidMount() {        
        // uncomment to run Canvas Stabilization app as stand alone app //
        // this.props.fetchSlateData(this.state.activeSlate);
        sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': {slateRefreshStatus :'Refreshed a moment ago'} });
        sendDataToIframe({
            'type': CanvasIframeLoaded,
            'message': {}
        });
        // *********************************************************
        // *************** TO BE PLACED PROPERLY *****************//
        sendDataToIframe({
            'type': ShowHeader,
            'message': true
        })
        // *********************************************************
        let { projectUrn } = config,
            // slateId = Object.keys(this.props.slateLevelData)[0]
            slateId = config.slateManifestURN

        // *************************************************
        // commenting below setState() to test alternative
        // *************************************************
        this.props.getSlateLockStatus(projectUrn ,slateId)
        }

    componentDidUpdate(prevProps, prevState){
        this.countTimer =  Date.now();
        // if(this.state.navigation) {
            // if(document.getElementById("cypress-0")){
            //     document.getElementById("cypress-0").focus();
            // }

        //     this.state.navigation = false;
        // } else {
        const { slateLockInfo: { isLocked, userId } } = this.props
        // if (window.tinymce.activeEditor && document.getElementById(window.tinymce.activeEditor.id) && true) {
        //     document.getElementById(window.tinymce.activeEditor.id).focus();
        // } else if (tinymce.$('.cypress-editable').length && true) {
        //     tinymce.$('.cypress-editable').eq(0).trigger('focus');
        // }     

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

    timeSince() {
        let count;
        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 0 }
        ];
        let seconds = Math.floor((new Date().getTime() - this.countTimer) / 1000);
        let interval = intervals.find(i => i.seconds <= seconds);
        if (interval && interval.label != 'second') {
            count = Math.floor(seconds / interval.seconds);
            sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': {slateRefreshStatus : `Refreshed ${count} ${interval.label == 'second' ? '' : interval.label} ago`} });
        }
        
     
    }


    updateTimer = () => {
        setInterval(() => {
            this.timeSince("'")
        }, 60000)
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
                 this.debounceReleaseHandler(callback, _context)
            },900000)
        }
    }
    debounceReleaseHandler = (callback, context) => {
        if (context.props.withinLockPeriod) {
            callback(config.projectUrn, Object.keys(context.props.slateLevelData)[0])
            context.props.setLockPeriodFlag(false)
            // alert("Lock has been released")
            context.setState({
                showReleasePopup: true
            })
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
        this.props.showCanvasBlocker(toggleValue)
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


    
 /*    openGlossaryFootnotePopUp=()=>{
       if(this.props.glossaryFootnoteValue.type==="Glossary"||this.props.glossaryFootnoteValue.type==="Footnote"){
        return (
        <GlossaryFootnoteMenu  activePopUp={this.props.glossaryFootnoteValue.popUpStatus}/>
        )
        
    }
    
    }     */

    showLockReleasePopup = () => {
        if(this.state.showReleasePopup){
            // this.props.showCanvasBlocker(true)
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

    closeAudioBookDialog = (e) => {
        this.setState({ openDropDown: !this.state.openDropDown })
        return true;
    }

    closeAddAudioBook = (e) => {
        this.setState({ addDropDown: !this.state.addDropDown })
        return true;
    }


    processRemoveConfirmation = () => {
        this.closeAudioBookDialog();
        this.props.showAudioRemovePopup(false)
        this.props.deleteAudioNarrationForContainer();
    }
    toggleAudioPopup = () => {
        this.props.showAudioRemovePopup(false)
        //  hideBlocker()
    }
    showAudioRemoveConfirmationPopup = () => {
        if (this.props.openRemovePopUp) {
            // showTocBlocker();
            return (
                <PopUp
                    dialogText={"Do you want to remove the linked Audio Book with the slate?"}
                    active={true}
                    removeConfirmation={true}
                    audioRemoveClass='audioRemoveClass'
                    saveButtonText='OK'
                    saveContent={this.processRemoveConfirmation}
                    togglePopup={this.toggleAudioPopup}
                />
            )
        }
        else {
            return null
        }
    }
    
    render() {
        return (
            <div className='content-composer'>
                {this.props.showBlocker ? <div className="canvas-blocker" ></div> : '' }
                <div id="editor-toolbar" className="editor-toolbar" ref="editorToolbarRef">
                    {/* editor tool goes here */}
                    <Toolbar togglePageNumbering={this.togglePageNumbering} closeAudioBookDialog={this.closeAudioBookDialog} closeAddAudioBook={this.closeAddAudioBook}/>
                    {/* custom list editor component */}
                </div>

                <div className='workspace'>
                    <div className = "sidebar-panel">
                        {/* pull all sidebar panel */}
                        <CommentsPanel />
                    </div>
                    <div id='canvas' className='canvas'>
                        <div id='artboard-containers'>
                            <div id='artboard-container' className='artboard-container'>
                                {this.props.showApoSearch ? <AssetPopoverSearch /> : ''}
                                {/* slate wrapper component combines slate content & slate title */}
                                <RootContext.Provider value={{ isPageNumberEnabled: this.state.isPageNumberEnabled }}>
                                    <SlateWrapper handleCommentspanel={this.handleCommentspanel} slateData={this.props.slateLevelData} navigate={this.navigate} showBlocker= {this.props.showCanvasBlocker} setSlateLock={this.setSlateLock} refToToolBar={this.state.editorToolbarRef} convertToListElement={this.props.convertToListElement} toggleTocDelete = {this.props.toggleTocDelete} tocDeleteMessage = {this.props.tocDeleteMessage} modifyState = {this.props.modifyState}  updateTimer = {this.updateTimer} isBlockerActive = {this.props.showBlocker} />
                                </RootContext.Provider>                                
                            </div>
                        </div>
                    </div>
                    <div id='text-settings-toolbar'>
                        <div className='panel-text-settings'>
                            <RootContext.Consumer>
                            {
                                    () => {
                                        if (this.props.glossaryFootnoteValue.popUpStatus) {
                                            return (<GlossaryFootnoteMenu activePopUp={this.props.glossaryFootnoteValue.popUpStatus} />)
                                        }
                                        else {
                                            return (<Sidebar showPopUp={this.showPopUp} />)
                                        }
                                    }
                                }
                            </RootContext.Consumer>
                        </div>
                    </div>
                </div>
                {this.showLockReleasePopup()}  
                {this.showAudioRemoveConfirmationPopup()}
            </div>
        );
    }
    
    togglePageNumbering = () => {
        this.setState((state) => ({
            isPageNumberEnabled: !state.isPageNumberEnabled
        }));
    }
}

CanvasWrapper.displayName = "CanvasWrapper"
const mapStateToProps = state => {
    console.log("state.audioReducer.openRemovePopUp,",state.audioReducer.openRemovePopUp)
    return {
        slateLevelData: state.appStore.slateLevelData,
        glossaryFootnoteValue:state.glossaryFootnoteReducer.glossaryFootnoteValue,
        withinLockPeriod: state.slateLockReducer.withinLockPeriod,
        slateLockInfo: state.slateLockReducer.slateLockInfo,
        showApoSearch : state.assetPopOverSearch.showApoSearch,
        addAudio: state.audioReducer.addAudio,
        openAudio: state.audioReducer.openAudio,
        openRemovePopUp: state.audioReducer.openRemovePopUp,
    };
};


export default connect(
    mapStateToProps,
    {
        fetchSlateData,
        toggleCommentsPanel,
        fetchComments,
        fetchCommentByElement,
        convertToListElement,
        getSlateLockStatus,
        setSlateLock,
        releaseSlateLock,
        setLockPeriodFlag,
        handleSplitSlate,
        currentSlateLO,
        setUpdatedSlateTitle,
        publishContent,
        fetchAuthUser,
        handleSlateRefresh,
        logout,
        handleUserRole,
        fetchAudioNarrationForContainer,
        deleteAudioNarrationForContainer,
        showAudioRemovePopup
    }
)(CommunicationChannelWrapper(CanvasWrapper));
