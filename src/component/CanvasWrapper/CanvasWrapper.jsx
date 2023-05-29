// IMPORT - Plugins //
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import CommentsPanel from '../CommentsPanel'
// IMPORT - Components //
import CommunicationChannelWrapper from '../HOCs/WrapperChannel';
import SlateWrapper from '../SlateWrapper';
const Sidebar = React.lazy(() => import('../Sidebar'));
const AssetPopoverSearch = React.lazy(() => import('../AssetPopover/AssetPopoverSearch.jsx'));
const Toolbar = React.lazy(() => import('../Toolbar'));
const PopUp = React.lazy(() => import('../PopUp'));
const MarkIndexPopup = React.lazy(() => import('../MarkIndexPopup/MarkIndexPopup'));
import config from './../../config/config';
// IMPORT - Assets //
import '../../styles/CanvasWrapper/style.css';
import { timeSince, removeWirisOverlay } from '../../js/appUtils.js'
import { sendDataToIframe, hasReviewerRole, isOwnerRole, isSubscriberRole } from '../../constants/utility.js';
import { CanvasIframeLoaded, ShowHeader,TocToggle,NextSlate, PreviousSlate, ShowLoader } from '../../constants/IFrameMessageTypes.js';
import { getSlateLockStatus, releaseSlateLock } from './SlateLock_Actions'
const GlossaryFootnoteMenu = React.lazy(() => import('../GlossaryFootnotePopup/GlossaryFootnoteMenu.jsx'));
import {updateElement, getTableEditorData, clearElementStatus, approvedSlatePopupStatus}from '../../component/ElementContainer/ElementContainer_Actions'
// IMPORT - Actions //
import { fetchSlateData,getProjectDetails, fetchSlateAncestorData, fetchAuthUser, openPopupSlate, setSlateLength, tcmCosConversionSnapshot, fetchLearnosityContent, fetchProjectLFs, setProjectSharingRole, setProjectSubscriptionDetails, fetchFigureDropdownOptions, isOwnersSubscribedSlate, updateFigureDropdownValues, fetchLOBList, setCautionBannerStatus, isSubscribersSubscribedSlate } from './CanvasWrapper_Actions';
import {toggleCommentsPanel, addNewComment, deleteComment, fetchComments,fetchCommentByElement} from '../CommentsPanel/CommentsPanel_Action'
import { convertToListElement } from '../ListElement/ListElement_Action.js';
import { handleSplitSlate,setUpdatedSlateTitle, setSlateType, setSlateEntity, setSlateParent, setSlateMatterType, cypressPlusEnabled } from '../SlateWrapper/SlateWrapper_Actions'
import { currentSlateLO,isLOExist, currentSlateLOMath, currentSlateLOType,updateLastAlignedLO, fetchDefaultLF } from '../ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
import { handleUserRole } from './UserRole_Actions'
import { handleSlateRefresh } from '../CanvasWrapper/SlateRefresh_Actions'
import { fetchAudioNarrationForContainer ,audioGlossaryPopup, saveDataFromAlfresco, showWrongAudioPopup} from '../AudioNarration/AudioNarration_Actions'
import { glossaaryFootnotePopup, saveImageDataFromAlfresco, showWrongImagePopup } from '../GlossaryFootnotePopup/GlossaryFootnote_Actions';
import RootContext from './PageNumberContext.js';
import {publishContent,logout} from '../../js/header'
import store from './../../appstore/store'
import { hideBlocker } from '../../js/toggleLoader';
import {getAllSlatesData} from '../../js/getAllSlatesData'
import { fetchUsageTypeData, setElmPickerData } from '../AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
import { toggleElemBordersAction, togglePageNumberAction, toggleSpellCheckAction, setGrammarlyFlag } from '../Toolbar/Toolbar_Actions.js';
import { prevIcon, nextIcon } from '../../../src/images/ElementButtons/ElementButtons.jsx';
import { assetIdForSnapshot } from '../../component/AssetPopover/AssetPopover_Actions.js';
import {saveSelectedAssetData, saveInlineImageData, alfrescoPopup} from '../AlfrescoPopup/Alfresco_Action.js';
import {markedIndexPopup} from '../MarkIndexPopup/MarkIndex_Action';
import { fetchProjectFigures, setTocContainersAutoNumberList } from '../FigureHeader/AutoNumberActions';
import { savePopupParentSlateData } from '../FigureHeader/AutoNumberCreate_helper';
export class CanvasWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReleasePopup : false,
            toggleApo : false,
            isConfigLoaded : true,
            toastMessage : false
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
        sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': {slateRefreshStatus :'Refreshed, a moment ago'} });
        
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

    showingToastMessage = (status, toastMsgText) => {
        this.setState({
            toastMessage: status,
            toastMsgText: toastMsgText
        })
        setTimeout(() => {
            this.setState({
                toastMessage: false
            })  
        }, 2000);
    }


    componentDidUpdate(prevProps, prevState){
        this.countTimer =  Date.now();
        removeWirisOverlay()
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

    

    updateTimer = () => {
        setInterval(() => {
            timeSince(this.countTimer)
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
    handleNavClick=(nav)=> {
        if(config.savingInProgress || config.popupCreationCallInProgress || config.isSavingElement){
            return false
        }
        sendDataToIframe({'type': ShowLoader,'message': { status: true }});
        if(nav === "back"){
            sendDataToIframe({'type': PreviousSlate,'message': {}})
        }else{
            sendDataToIframe({'type': NextSlate,'message': {}})
        }
        
    }

    render() {
        let slateData = this.props.slateLevelData
        let isReviewerRoleClass = hasReviewerRole() ? " reviewer-role" : "";
        // Filter search icon for popup
        let popupFilter = '';
        let isToolBarBlocked = isSubscriberRole(this.props.projectSubscriptionDetails.projectSharingRole, this.props.projectSubscriptionDetails.projectSubscriptionDetails.isSubscribed) || this.props.projectSubscriptionDetails.isOwnersSubscribedSlateChecked && isOwnerRole(this.props.projectSubscriptionDetails.projectSharingRole, this.props.projectSubscriptionDetails.projectSubscriptionDetails.isSubscribed) ? 'hideToolbar' : ''
        if(config.isPopupSlate) {
            popupFilter = 'popup';
        }
        
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
                    isElmApiError={this.props.ErrorPopup.isElmApiError}
                />}
                {/** Ends of custom error popup */}
                <div id="editor-toolbar" className={`editor-toolbar ${popupFilter}`}>
                    {/* editor tool goes here */}
                    <Toolbar showCanvasBlocker= {this.props.showCanvasBlocker} isToolBarBlocked={isToolBarBlocked} projectSubscriptionDetails= {this.props.projectSubscriptionDetails}/>
                    {/* custom list editor component */}
                </div>

                <div className='workspace'>               
                    <div id='canvas' className={'canvas'+ isReviewerRoleClass}>
                        <div id='artboard-containers'>
                            <div className="artboard-parent">
                                {/*Prev Button */}
                                {slateData[config.slateManifestURN] && slateData[config.slateManifestURN].type !== 'popup' && <div className={`navigation-container prev-btn ${config.disablePrev ? 'disabled':""}`}>
                                    <div className='navigation-content' id = "previous-slate-button">
                                        <div className='navigation-button back' onClick={() => this.handleNavClick("back")}>
                                            <div className='navigation-icon'>{prevIcon}</div>
                                        </div>
                                        <div className = "tooltip-text back">Previous</div>
                                    </div>
                                </div>
                                }
                                <div id='artboard-container' className='artboard-container'>
                                    {this.props.showApoSearch ? <Suspense fallback={<div></div>}><AssetPopoverSearch showBlocker={this.props.showCanvasBlocker}/></Suspense> : ''}
                                    {/* slate wrapper component combines slate content & slate title */}
                                    <RootContext.Provider value={{ isPageNumberEnabled: this.props.pageNumberToggle }}>
                                        <SlateWrapper loadMorePages={this.loadMorePages} handleCommentspanel={this.handleCommentspanel} slateData={slateData} navigate={this.navigate} showBlocker={this.props.showCanvasBlocker} convertToListElement={this.props.convertToListElement} tocDeleteMessage={this.props.tocDeleteMessage} updateTimer={this.updateTimer} isBlockerActive={this.props.showBlocker} isLOExist={this.props.isLOExist} updatePageLink={this.props.updatePageLink} hideElementSeperator={isToolBarBlocked} closeUndoTimer = {this.props.closeUndoTimer}/>
                                    </RootContext.Provider>
                                </div>
                                 {/*Next Button */}
                                {
                                    this.state.toastMessage &&
                                    <div className="toastMsg">
                                        <p>{this.state.toastMsgText}</p>
                                    </div>
                                }
                                 {slateData[config.slateManifestURN] && slateData[config.slateManifestURN].type !== 'popup' && <div className={`navigation-container next-btn ${config.disableNext ? 'disabled':""}`}>
                                    <div className='navigation-content' id = "next-slate-button" >
                                        <div className='navigation-button next' onClick={() => this.handleNavClick("next")}>
                                            <div className='navigation-icon'>{nextIcon}</div>
                                        </div>
                                        <div className = "tooltip-text next">Next</div>
                                    </div>
                                </div>
                                }
                                <div className='clr'></div>
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
                                        const markIndexpopUpStatus =  this.props.markedIndexValue?.popUpStatus || this.props.markedIndexGlossary?.popUpStatus;
                                        if (this.props.glossaryFootnoteValue.popUpStatus && !markIndexpopUpStatus) {
                                            return (<GlossaryFootnoteMenu permissions={this.props.permissions} glossaryFootnoteValue={this.props.glossaryFootnoteValue} showGlossaaryFootnote={this.props.glossaaryFootnotePopup} glossaryFootNoteCurrentValue = {this.props.glossaryFootNoteCurrentValue} audioGlossaryData={this.props.audioGlossaryData} figureGlossaryData={this.props.figureGlossaryData} markedIndexGlossaryData={this.props.markedIndexGlossary}/>)
                                        }
                                        if(markIndexpopUpStatus){
                                            return <MarkIndexPopup permissions={this.props.permissions} showMarkedIndexPopup = {this.props.markedIndexPopup} markedIndexCurrentValue={this.props.markedIndexCurrentValue} markedIndexValue={this.props.markedIndexValue} isInGlossary={this.props.markedIndexGlossary?.popUpStatus} showingToastMessage = {this.showingToastMessage} showBlocker = {this.props.showCanvasBlocker}/>

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
        pageNumberToggle: state.toolbarReducer.pageNumberToggle,
        audioGlossaryData:state.audioReducer.audioGlossaryData,
        currentSlateLF: state.metadataReducer.currentSlateLF,
        activeElement: state.appStore.activeElement,
        figureGlossaryData:state.appStore.figureGlossaryData,
        alfrescoEditor: state.alfrescoReducer.editor,
        imageArgs: state.alfrescoReducer.imageArgs,
        projectSubscriptionDetails:state?.projectInfo,
        markedIndexCurrentValue: state.markedIndexReducer.markedIndexCurrentValue,
        markedIndexValue: state.markedIndexReducer.markedIndexValue,
        markedIndexGlossary: state.markedIndexReducer.markedIndexGlossary,
        alfrescoReducer: state.alfrescoReducer,
        currentSlateAncestorData: state.appStore.currentSlateAncestorData,
        projectLearningFrameworks: state.metadataReducer.projectLearningFrameworks,
        defaultLF: state.metadataReducer.defaultLF,
        isSlateTagEnable: state.metadataReducer.slateTagEnable,
        getRequiredSlateData: state.appStore.getRequiredSlateData,
        assessmentReducer: state.assessmentReducer,
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
        updateLastAlignedLO,
        currentSlateLOMath,
        isLOExist,
        setUpdatedSlateTitle,
        setSlateType,
        setSlateEntity,
        setGrammarlyFlag,
        publishContent,
        fetchAuthUser,
        handleSlateRefresh,
        logout,
        getProjectDetails,
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
        fetchUsageTypeData,
        fetchSlateAncestorData,
        setSlateLength,
        toggleElemBordersAction,
        togglePageNumberAction,
        tcmCosConversionSnapshot,
        assetIdForSnapshot,
        audioGlossaryPopup,
        fetchLearnosityContent,
        fetchProjectLFs,
        currentSlateLOType,
        setElmPickerData,
        saveSelectedAssetData,
        saveInlineImageData,
        alfrescoPopup,
        saveDataFromAlfresco,
        showWrongAudioPopup,
        saveImageDataFromAlfresco,
        showWrongImagePopup,
        setProjectSharingRole,
        setProjectSubscriptionDetails,
        fetchFigureDropdownOptions,
        isOwnersSubscribedSlate,
        markedIndexPopup,
        fetchProjectFigures,
        setTocContainersAutoNumberList,
        toggleSpellCheckAction,
        addNewComment, 
        deleteComment,
        cypressPlusEnabled,
        setSlateMatterType,
        updateFigureDropdownValues,
        savePopupParentSlateData,
        fetchLOBList,
        fetchDefaultLF,
        setCautionBannerStatus,
        approvedSlatePopupStatus,
        isSubscribersSubscribedSlate
    }
)(CommunicationChannelWrapper(CanvasWrapper));
