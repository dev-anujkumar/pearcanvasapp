// IMPORT - Plugins //
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentsPanel from '../CommentsPanel'
// IMPORT - Components //
import CommunicationChannelWrapper from '../HOCs/WrapperChannel';
import SlateWrapper from '../SlateWrapper';
import Sidebar from '../Sidebar';
import AssetPopoverSearch from '../AssetPopover/AssetPopoverSearch.jsx';
import Toolbar from '../Toolbar';
import PopUp from '../PopUp';
import config from './../../config/config';
// IMPORT - Assets //
import '../../styles/CanvasWrapper/style.css';
import { sendDataToIframe , hasReviewerRole} from '../../constants/utility.js';
import { CanvasIframeLoaded, ShowHeader,TocToggle } from '../../constants/IFrameMessageTypes.js';
import { getSlateLockStatus, releaseSlateLock } from './SlateLock_Actions'
import GlossaryFootnoteMenu from '../GlossaryFootnotePopup/GlossaryFootnoteMenu.jsx';
import {updateElement, getTableEditorData, clearElementStatus}from '../../component/ElementContainer/ElementContainer_Actions'
// IMPORT - Actions //
import { fetchSlateData, fetchAuthUser, openPopupSlate } from './CanvasWrapper_Actions';
import {toggleCommentsPanel,fetchComments,fetchCommentByElement} from '../CommentsPanel/CommentsPanel_Action'
import { convertToListElement } from '../ListElement/ListElement_Action.js';
import { handleSplitSlate,setUpdatedSlateTitle, setSlateType, setSlateEntity, setSlateParent } from '../SlateWrapper/SlateWrapper_Actions'
import { currentSlateLO,isLOExist, currentSlateLOMath } from '../ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
import { handleUserRole } from './UserRole_Actions'
import { handleSlateRefresh } from '../CanvasWrapper/SlateRefresh_Actions'
import { fetchAudioNarrationForContainer } from '../AudioNarration/AudioNarration_Actions'
import { glossaaryFootnotePopup } from '../GlossaryFootnotePopup/GlossaryFootnote_Actions';
import RootContext from './PageNumberContext.js';
import {publishContent,logout} from '../../js/header'
import store from './../../appstore/store'
import { hideBlocker } from '../../js/toggleLoader';
import {getAllSlatesData} from '../../js/getAllSlatesData'
import { fetchUsageTypeData } from '../AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
export class CanvasWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReleasePopup : false,
            toggleApo : false,
            isPageNumberEnabled : false,
            isConfigLoaded : true
        }  
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.isConfigLoaded && prevState.isConfigLoaded){
            nextProps.fetchSlateData(config.slateManifestURN,config.slateEntityURN,config.page,'',"");
            return {
                isConfigLoaded : false
            };
        }
        if(prevState.slateRefreshStatus !== nextProps.slateRefreshStatus) {
            sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': {slateRefreshStatus:nextProps.slateRefreshStatus} }); 
        }
        return null;    
     }


    componentDidMount() {  
        // To run Canvas Stabilization app as stand alone app //
        // if (config.slateManifestURN) {
        //     this.props.fetchSlateData(config.slateManifestURN,config.slateEntityURN,config.page,'');
        // }
        sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': {slateRefreshStatus :'Refreshed a moment ago'} });
        
        sendDataToIframe({
            'type': CanvasIframeLoaded,
            'message': {}
        });
        sendDataToIframe({
            'type': ShowHeader,
            'message': true
        })
        this.props.getSlateLockStatus(config.projectUrn ,config.slateManifestURN) 
        localStorage.removeItem('newElement');
        window.onbeforeunload = () => {
            let slateId = config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN
            this.props.releaseSlateLock(config.projectUrn, slateId)
        }
    }


    componentDidUpdate(prevProps, prevState){
        this.countTimer =  Date.now();

        var targetNode = document.querySelector('body');
        // Options for the observer (which mutations to observe)		
        var config = { attributes: true };
        // Callback function to execute when mutations are observed		
        var callbackOb = function (mutationsList, observercb) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes') {
                    let wirisNodes = document.getElementsByClassName('wrs_modal_dialogContainer');
                    let wirisNodeLength = wirisNodes.length;
                    if (wirisNodeLength > 1) {
                        for (let i = 0; i < wirisNodeLength - 1; i++) {
                            wirisNodes[i].remove();
                            document.getElementsByClassName('wrs_modal_overlay').remove();
                        }
                    }
                }
            }
        };
        // Create an observer instance linked to the callback function		
        var observer = new MutationObserver(callbackOb);
        // Start observing the target node for configured mutations	
        if (targetNode)
            observer.observe(targetNode, config);
    }
    
    handleCommentspanel = (event,elementId,index) => {
         event.stopPropagation();
        this.props.toggleCommentsPanel(true);
        this.props.fetchCommentByElement(elementId,index);
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

    loadMorePages = () => {
        config.page++;
        if(config.totalPageCount <= config.page) return false;
        this.props.fetchSlateData(config.slateManifestURN,config.slateEntityURN, config.page, '',"");
    }
    
    ReleaseErrorPopup = () => {
        hideBlocker()
        store.dispatch({type:'ERROR_POPUP', payload:{show:false}})
        return true;
    }

    render() {
        let slateData = this.props.slateLevelData
        let isReviewerRoleClass = hasReviewerRole() ? " reviewer-role" : ""
        return (
            <div className='content-composer'>
                {this.props.showBlocker ? <div className="canvas-blocker" ></div> : '' }
                {/** Custom Error Popup on Canvas wrapper in API Failure */}
                {this.props.ErrorPopup && this.props.ErrorPopup.show &&
                    <div className="canvas-blocker" ></div>}
                {this.props.ErrorPopup && this.props.ErrorPopup.show && <PopUp dialogText={this.props.ErrorPopup.message}
                    active={true}
                    togglePopup={this.ReleaseErrorPopup}
                    isLockReleasePopup={true}
                    isInputDisabled={true}
                />}
                {/** Ends of custom error popup */}
                <div id="editor-toolbar" className="editor-toolbar">
                    {/* editor tool goes here */}
                    <Toolbar togglePageNumbering={this.togglePageNumbering} />
                    {/* custom list editor component */}
                </div>

                <div className='workspace'>
                   
                    <div id='canvas' className={'canvas'+ isReviewerRoleClass}>
                        <div id='artboard-containers'>
                            <div id='artboard-container' className='artboard-container'>
                                {this.props.showApoSearch ? <AssetPopoverSearch /> : ''}
                                {/* slate wrapper component combines slate content & slate title */}
                                <RootContext.Provider value={{ isPageNumberEnabled: this.state.isPageNumberEnabled }}>
                                    <SlateWrapper loadMorePages={this.loadMorePages}  handleCommentspanel={this.handleCommentspanel} slateData={slateData} navigate={this.navigate} showBlocker= {this.props.showCanvasBlocker} convertToListElement={this.props.convertToListElement} toggleTocDelete = {this.props.toggleTocDelete} tocDeleteMessage = {this.props.tocDeleteMessage} modifyState = {this.props.modifyState}  updateTimer = {this.updateTimer} isBlockerActive = {this.props.showBlocker} isLOExist={this.props.isLOExist}/>
                                </RootContext.Provider>                                
                            </div>
                        </div>
                    </div>
                    <div className = "sidebar-panel">
                        {/* pull all sidebar panel */}
                        <CommentsPanel />
                    </div>
                    <div id='text-settings-toolbar'>
                        <div className='panel-text-settings'>
                            <RootContext.Consumer>
                                {
                                    () => {
                                        if (this.props.glossaryFootnoteValue.popUpStatus) {
                                            return (<GlossaryFootnoteMenu permissions={this.props.permissions} glossaryFootnoteValue={this.props.glossaryFootnoteValue} showGlossaaryFootnote={this.props.glossaaryFootnotePopup} glossaryFootNoteCurrentValue = {this.props.glossaryFootNoteCurrentValue}/>)
                                        }
                                        else {
                                            return (<Sidebar showCanvasBlocker= {this.props.showCanvasBlocker} showPopUp={this.showPopUp} />)
                                        }
                                    }
                                }
                            </RootContext.Consumer>
                        </div>
                    </div>
                </div>
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
    return {
        slateLevelData: state.appStore.slateLevelData,
        glossaryFootnoteValue:state.glossaryFootnoteReducer.glossaryFootnoteValue,
        slateLockInfo: state.slateLockReducer.slateLockInfo,
        showApoSearch : state.assetPopOverSearch.showApoSearch,
        openRemovePopUp: state.audioReducer.openRemovePopUp,
        openSplitPopUp: state.audioReducer.openSplitPopUp,
        glossaryFootNoteCurrentValue : state.glossaryFootnoteReducer.glossaryFootNoteCurrentValue,
        currentSlateLOData: state.metadataReducer.currentSlateLOData,
        permissions: state.appStore.permissions,
        logout,
        withinLockPeriod: state.slateLockReducer.withinLockPeriod,
        ErrorPopup: state.errorPopup,
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
        handleSplitSlate,
        currentSlateLO,
        currentSlateLOMath,
        isLOExist,
        setUpdatedSlateTitle,
        setSlateType,
        setSlateEntity,
        publishContent,
        fetchAuthUser,
        handleSlateRefresh,
        logout,
        handleUserRole,
        fetchAudioNarrationForContainer,
        glossaaryFootnotePopup,
        releaseSlateLock,
        updateElement,
        setSlateParent,
        openPopupSlate,
        getTableEditorData,
        getAllSlatesData,
        clearElementStatus,
        fetchUsageTypeData
    }
)(CommunicationChannelWrapper(CanvasWrapper));
