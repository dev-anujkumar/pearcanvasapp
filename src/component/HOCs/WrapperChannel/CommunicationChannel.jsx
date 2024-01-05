/**
 * Module - CommunicationChannel
 * Description - HOC to inherit channel communication functionalities with wrapper
 */

// IMPORT - Plugins //
import React, { Component } from 'react';
// IMPORT - Components/Dependencies //
import config from '../../../config/config.js';
import PopUp from '../../PopUp';
import { sendDataToIframe, showNotificationOnCanvas} from '../../../constants/utility.js';
import { showHeaderBlocker, hideBlocker, showTocBlocker, disableHeader } from '../../../js/toggleLoader';
import { TocToggle, TOGGLE_ELM_SPA, PROJECT_SHARING_ROLE, IS_SLATE_SUBSCRIBED } from '../../../constants/IFrameMessageTypes';
import { releaseSlateLockWithCallback, getSlateLockStatusWithCallback } from '../../CanvasWrapper/SlateLock_Actions';
import { loadTrackChanges } from '../../CanvasWrapper/TCM_Integration_Actions';
import { ALREADY_USED_SLATE_TOC, PROJECT_PREVIEW_ACTION, SLATE_REFRESH_ACTION,
        CHANGE_SLATE_ACTION } from '../../SlateWrapper/SlateWrapperConstants'
import { IMG_HTML } from '../../../constants/Element_Constants.js';
import { getContainerEntityUrn } from '../../FigureHeader/AutoNumber_helperFunctions';
import { triggerSlateLevelSave } from '../../../js/slateLevelSave.js';
import {
    setCurrentSlate, updatePageLink, handleProjectDetails, sendingPermissions,
    handleElmPickerTransactions, handleSelectedAlfrescoData, getAssessmentForWillowAlignment,
    handleRefreshSlate, handleSlateTag, handleExtLOData
} from './CommunicationActions.js';
function CommunicationChannel(WrappedComponent) {
    class CommunicationWrapper extends Component {
        constructor(props) {
            super(props);
            this.state = {
                project_urn: "",
                isTableLaunched: false,
                showBlocker: false,
                tocDeleteMessage: null,
                showLockPopup: false,
                lockOwner: "",
            };
        }

        componentDidMount() {
            this.initTocCommunictionChannel();
        }

        /**
         * initTocCommunictionChannel | To register message event
         */
        initTocCommunictionChannel = () => {
            if (window.addEventListener) {
                // For standards-compliant web browsers
                window.addEventListener("message", this.handleIncommingMessages, false);
            }
            else {
                window.attachEvent("onmessage", this.handleIncommingMessages);
            }
        }

        /**
         * handleIncommingMessages | Listen for any incomming message from wrapper application
         * @param {object} e | received message event from wrapper application
         */
        handleIncommingMessages = (e) => {
            let messageType = e.data.type;
            let message = e.data.message;
            switch (messageType) {
                case 'tocContainersLabelUpdate':
                    showNotificationOnCanvas(message);
                    break;
                case 'getPermissions':
                    sendingPermissions(this.props);
                    break;
                case 'selectedSlate':
                case 'titleChanging':
                    message['parentId'] = this.state.project_urn;
                    setCurrentSlate(message,this.props,this.showCanvasBlocker);
                    break;
                case 'deleteTocItem':
                case 'deleteTocMultipleItem':
                case 'deleteTocMultipleItemWithPendingTrack':
                    this.onDeleteTocItem(message);
                    break;
                case 'unlinkTocContainer':
                    this.UnlinkSubscribers(message);
                    break;
                case 'deleteTocItemWithPendingTrack':
                    this.onDeleteTocItem(message, 'withPendingTrack');
                    break;
                case 'showSingleContainerDelete':
                    this.onSingleContainerDelete(message);
                    break;
                case 'newSplitedSlate':
                    setTimeout(() => { this.hanndleSplitSlate(message) }, 1000)
                    // Making condition true for triggering slate level save api
                    localStorage.setItem('isChangeInSlate', 'true');
                    break;
                case 'hideCommentsPanel':
                    this.props.toggleCommentsPanel(false);
                    break;
                case 'toggleCommentsPanel':
                    this.props.toggleCommentsPanel(true);
                    sendDataToIframe({
                        'type': TocToggle,
                        'message': { "open": false }
                    });
                    break;
                case 'enablePrev':
                    config.disablePrev = false;
                    break;
                case 'enableNext':
                    config.disableNext = false;
                    break;
                case 'disablePrev':
                    config.disablePrev = true;
                    break;
                case 'disableNext':
                    config.disableNext = true;
                    break;
                case 'refreshElementWithTable':
                    {
                        this.setTableData(message.elementId, message.updatedData);

                    }
                    break;
                case 'canvasBlocker':
                    {
                        if (message.status) {
                            this.showCanvasBlocker(true);
                            showHeaderBlocker();
                        } else {
                            this.showCanvasBlocker(false);
                            hideBlocker();
                        }

                    }
                    break;
                case 'projectDetails':
                    handleProjectDetails(message,this.props)
                    break;
                case 'permissionsDetails':
                    this.handlePermissioning(message);
                    break;
                case 'getSlateLOResponse':
                    if (message?.LOList?.length) {
                        const regex = /<math.*?data-src=\'(.*?)\'.*?<\/math>/g;
                        message.LOList.map(loData => {
                            loData.label.en = loData.label.en.replace(regex, IMG_HTML);
                        });
                        this.props.currentSlateLOMath(message.LOList);
                    } else {
                        this.props.currentSlateLOMath("");
                    }
                    this.props.currentSlateLO(message.LOList);
                    this.props.isLOExist(message);
                    this.props.currentSlateLOType(message.currentSlateLF);
                    break;
                case 'getLOlistResponse':
                    this.props.currentSlateLO(message);
                    break;
                case 'getAssessmentLOResponse':
                    let newMessage = { assessmentResponseMsg: message.assessmentResponseMsg };
                    this.props.isLOExist(newMessage);
                    this.props.currentSlateLO(newMessage);
                    break;
                case 'elementLabelCombineData':
                    this.props.updateFigureDropdownValues(message)
                    break;
                case 'refreshSlate':
                    handleRefreshSlate(this.props);
                    triggerSlateLevelSave(config.slateEntityURN, SLATE_REFRESH_ACTION);
                    break;
                case 'closeUndoTimer' :
                    this.setState({
                        closeUndoTimer: message.status
                    })
                    break;
                case 'fetchRequiredSlateData':
                    // Fetches any slate details with help of slate ManifestUrn and slateEntityUrn
                    let isFetchAnySlate = true;
                    let slateManifestUrn = message && message.slateManifestUrn;
                    let slateEntityUrn = message && message.slateEntityUrn;
                    this.props.fetchSlateData(slateManifestUrn, slateEntityUrn, config.page, '', "", false, isFetchAnySlate);
                    break;
                case 'cancelCEPopup':
                    if (this.props.currentSlateLOData?.length > 0) {
                        const regex = /<math.*?data-src=\'(.*?)\'.*?<\/math>/g;
                        this.props.currentSlateLOData.map(loData => {
                            if (loData?.label?.en) {
                                loData.label.en = loData.label.en.replace(regex, IMG_HTML)
                            }
                        })
                        this.props.currentSlateLO(this.props.currentSlateLOData);
                    }
                    this.setState({
                        showBlocker: false
                    });
                    // handles Element Update API call with loAssociation key from TOC and RC
                    handleSlateTag(message,this.props)
                    break;
                case 'brokerPreview':
                case 'slatePreview':
                case 'projectPreview':
                    if (messageType === 'slatePreview') {
                        triggerSlateLevelSave(config.slateEntityURN, CHANGE_SLATE_ACTION);
                    } else {
                        triggerSlateLevelSave(config.slateEntityURN, PROJECT_PREVIEW_ACTION);
                    }
                    if (!config.savingInProgress) {
                        this.props.publishContent(messageType);
                    }
                    break;
                case 'getSlateLockStatus':
                    if (!config.savingInProgress) {
                        this.releaseLockAndRedirect()
                    }
                    break;
                case 'logout':
                    this.releaseLockAndLogout()
                    break;
                case 'onTOCHamburgerClick':
                    {
                        /** To close list drop popup */
                        let _listWrapperDiv = document.querySelector('#listDropWrapper')
                        if (_listWrapperDiv)
                            _listWrapperDiv.querySelector('.fr-popup').classList.remove('fr-active')
                        break
                    }
                case 'trackChanges': {
                    loadTrackChanges();
                    break;
                }
                case 'fetchAllSlateDataFromWrapper':
                    {
                        this.props.getAllSlatesData(message)
                        this.props.approvedSlatePopupStatus(false)
                        break;
                    }
                case 'customDimensions':
                    if (window && window.dataLayer) {
                        window.dataLayer.push(message);
                    }
                    break;
                case 'pageLink':
                    if(message && message.link === 'unlink'){
                        this.deleteTocItem(message)

                    } else {
                        updatePageLink(message,this.props);
                    }
                    break;
                case 'slateLengthChanged':
                    this.changeSlateLength(message);
                    break;
                case 'parentChanging':
                    this.props.fetchSlateAncestorData(message || {});
                    break;
                case 'elementBorder':
                    this.props.toggleElemBordersAction(message)
                    break;
                case 'pageNumber':
                    this.props.togglePageNumberAction()
                    break;
                case 'GetActiveSlate':
                    sendDataToIframe({ 'type': 'GetActiveSlate', 'message': { slateEntityURN: config.slateEntityURN, slateManifestURN: config.slateManifestURN } });
                    break;
                case 'importpopupmessage':
                    this.props.setImportMessageForWordImport()
                    break;
                case 'statusForExtLOSave':
                    handleExtLOData(message,this.props);
                    break;
                    break;
                case 'selectedAlfrescoAssetData':
                    handleSelectedAlfrescoData(message,this.props)
                    break;
                case 'saveAlfrescoDataToConfig':
                    config.alfrescoMetaData = message
                    break;
                case TOGGLE_ELM_SPA:
                    handleElmPickerTransactions(message,this.props,this.showCanvasBlocker);
                    break;
                case 'openInlineAlsfrescoPopup' :
                    this.props.alfrescoPopup(message);
                    break;
                case 'spellCheckStatus':
                    this.props.toggleSpellCheckAction();
                    // refreshing the slate once spell check toggle is changed
                    handleRefreshSlate(this.props);
                    break;
                case PROJECT_SHARING_ROLE:
                    if (message?.sharingContextRole) {
                        this.props.setProjectSharingRole(message.sharingContextRole);
                    }
                    break;
                case 'releaseLockPopup':
                    this.setState({
                        showBlocker: false
                    });
                    this.showCanvasBlocker(false);
                    hideBlocker()
                    break;
                case IS_SLATE_SUBSCRIBED:
                    if (message && Object.keys(message).length && 'isSubscribed' in message) {
                        const projectSubscriptionDetails = {
                            isSubscribed: message.isSubscribed,
                            owner: {}
                        }
                        this.props.setProjectSubscriptionDetails(projectSubscriptionDetails);
                    }
                    break;
                case 'editPageAudioMessage':
                case 'deletePageAudioMessage' :
                    let slateData = {
                        currentProjectId: config.projectUrn,
                        slateEntityUrn: config.slateEntityURN
                    }
                    this.props.fetchAudioNarrationForContainer(slateData)
                    break;
                case 'ResetAutoNumberSequence':
                    this.props.setTocContainersAutoNumberList(message.autoNumberingDetails)
                    const slateAncestors = this.props?.currentSlateAncestorData
                    const currentParentUrn = getContainerEntityUrn(slateAncestors)
                    if (currentParentUrn === message.currentTocParentContainer) {
                        this.props.setTocContainersAutoNumberList(message.autoNumberingDetails);
                        config.figureDataToBeFetched = true;
                    }
                    break;

                case 'commentAdded' : {
                    this.props.addNewComment(message)
                    break
                }

                case 'commentDeleted' : {
                    this.props.deleteComment(message)
                    break
                }
                case 'refreshCanvasOnPdfMerge': { // Refresh Toc & Canvas on PDF Merge operation in Cypress Plus
                    //sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                    sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
                    break;
                }
                case 'newCustomCanvasLabels': {
                    this.props.updateFigureDropdownValues(message)
                    break;
                }
                case "getAssessmentData":
                    getAssessmentForWillowAlignment(message,this.props);
                    break;
                case "preflightElementFocus":
                    config.currentElementUrn = message
                    break;
                case "pendingTcmStatus":
                    config.pendingTcmStatus = message.status
                    break;
                case 'bannerIsVisible':
                    if (message && message.hasOwnProperty('status')) {
                        this.props.setCautionBannerStatus(message.status)
                    }
                    break;
                case 'refreshSlateOnAssessmentUpdate':
                    const assessmentSlateData = this.props?.slateLevelData[config.slateManifestURN]?.contents?.bodymatter[0];
                    const assessmentSlateCheck = assessmentSlateData?.type === 'element-assessment' && assessmentSlateData?.elementdata?.assessmentid === message?.assessmentUrn
                    if (message && message.action === "approve" && message.source === "elm" && message.type === "assessment" && assessmentSlateCheck) {
                        handleRefreshSlate(this.props);
                    }
                    break;
                case 'sendSlatesLabel':
                    if(message?.labels)
                    this.props.setTocSlateLabel(message.labels)
                    break;
                case 'tocHeirarchy':
                    this.props.currentNodeAncestorData(message.item, message.matterType);
                case 'lockUserDetailsFromCount' :
                    this.props.saveLockDetails(message.lockInfo)
                    break;
            }
        }

        /**
         * Updates the element count and refreshes slate
         * @param {String} message element count in a slate
         */
        changeSlateLength = (message) => {
            this.props.setSlateLength(message)
            handleRefreshSlate(this.props)
        }

        /**
         * Releases slate lock and logs user out.
         */
        releaseLockAndLogout = () => {
            const { projectUrn, slateManifestURN } = config;
            releaseSlateLockWithCallback(projectUrn, slateManifestURN, (res) => {
                setTimeout(this.props.logout, 500)
            })
        }

        releaseLockAndRedirect = () => {
            let projectUrn = config.projectUrn
            let slateId = config.slateManifestURN
            if (projectUrn && slateId) {
                releaseSlateLockWithCallback(projectUrn, slateId, (response) => {
                    this.redirectDashboard();
                });
            }
        }

        redirectDashboard() {
            sendDataToIframe({
                'type': 'redirectTODashboard',
                'message': {}
            })
        }

        handlePermissioning = (message) => {
            if (message && message.permissions) {
                this.props.handleUserRole(message.permissions, message.roleId)
            }
        }

        hanndleSplitSlate = (newSlateObj) => {
            this.props.handleSplitSlate(newSlateObj);
        }

        slateLockAlert = (userInfo) => {
            this.setState({
                showBlocker: true,
                showLockPopup: true,
                lockOwner: userInfo
            })
        }

        deleteTocItem = (message) => {
            hideBlocker();
            showTocBlocker();
            disableHeader(true);

            sendDataToIframe({type : 'showTOCDeletePopup', message : message})
        }

        deleteTocItemWithPendingTrack = (message) => {
            let newMessage = {
                ...message,
                messageType: 'withPendingTrack'
            }
            this.deleteTocItem(newMessage)
        }
        checkSlateLockAndDeleteSlate = (message, type) => {
            let that = this;
            let projectUrn = message.changedValue.projectUrn;
            let deleteSlateId = message.changedValue.containerUrn;
            let userName = config.userId
            /**
             * Delete element details for logging
             */
            getSlateLockStatusWithCallback(projectUrn, deleteSlateId, (response) => {
                if (response == "error") {
                    if (type === 'withPendingTrack') {
                        that.deleteTocItemWithPendingTrack(message);
                    }
                    else {
                        that.deleteTocItem(message);
                    }
                    return false;
                }
                try {
                    let status = {
                        slateLocked: response.isLocked,
                        userInfo: response.userId.replace(/.*\(|\)/gi, '')
                    }
                    if (userName.toLowerCase() === status.userInfo.toLowerCase()) {
                        status.slateLocked = false;
                    }

                    if (status.slateLocked) {
                        that.slateLockAlert(status.userInfo);
                    }
                    else {
                        if (type === 'withPendingTrack') {
                            that.deleteTocItemWithPendingTrack(message);
                        }
                        else {
                            that.deleteTocItem(message);
                        }
                    }
                }
                catch (err) {
                    if (type === 'withPendingTrack') {
                        that.deleteTocItemWithPendingTrack(message);
                    }
                    else {
                        that.deleteTocItem(message);
                    }
                }
            });
        }
        UnlinkSubscribers = (message) => {
            hideBlocker();
            showTocBlocker();
            disableHeader(true);

            sendDataToIframe({type : 'showTOCUnlinkPopup', message : message})
        }
        onDeleteTocItem = (message, type) => {
            this.checkSlateLockAndDeleteSlate(message, type)
        }

        onSingleContainerDelete = (message) => {
            let newMessage = {
                ...message,
                messageType: 'singleContainerDelete'
            }
            /**
             * TO BE IMPLEMENTED
             *  */
            hideBlocker();
            showTocBlocker();
            disableHeader(true);

            sendDataToIframe({type : 'showTOCDeletePopup', message : newMessage})
        }
        /**
         * Function used to show Blocker on canvas
         * @param {Boolean} status 
        */
        showCanvasBlocker = (bFlag) => {
            this.setState({
                showBlocker: bFlag
            });
        }

        prohibitPropagation = (event) => {
            if (event) {
                event.preventDefault()
                event.stopPropagation()
            }
            return false
        }

        toggleLockPopup = (toggleValue, event) => {
            this.setState({
                showLockPopup: toggleValue,
                showBlocker: toggleValue
            })
            hideBlocker()
            this.prohibitPropagation(event)
        }

        showLockPopup = () => {
            if (this.state.showLockPopup) {
                const { lockOwner } = this.state
                showTocBlocker();
                return (
                    <PopUp dialogText={ALREADY_USED_SLATE_TOC}
                        rows="1"
                        cols="1"
                        active={true}
                        togglePopup={this.toggleLockPopup}
                        inputValue={lockOwner}
                        isLockPopup={true}
                        isInputDisabled={true}
                        slateLockClass="lock-message"
                        withInputBox={true}
                        lockForTOC={true}
                    />
                )
            }
            else {
                return null
            }
        }

        setTableData = (elementId, updatedData) => {
            this.props.getTableEditorData(elementId, updatedData);
        }


        render() {
            return (
                <React.Fragment>
                    <WrappedComponent {...this.props} showBlocker={this.state.showBlocker} showCanvasBlocker={this.showCanvasBlocker}
                    tocDeleteMessage={this.state.tocDeleteMessage}  closeUndoTimer = {this.state.closeUndoTimer}/>
                    {this.showLockPopup()}
                </React.Fragment>
            )
        }

    }

    return CommunicationWrapper;
}

export default CommunicationChannel;
