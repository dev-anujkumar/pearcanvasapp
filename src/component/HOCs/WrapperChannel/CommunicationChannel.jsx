/**
 * Module - CommunicationChannel
 * Description - HOC to inherit channel communication functionalities with wrapper
 */

// IMPORT - Plugins //
import React, { Component } from 'react';
// IMPORT - Components/Dependencies //
import config from '../../../config/config.js';
import PopUp from '../../PopUp';
import { sendDataToIframe, defaultMathImagePath, isOwnerRole, isSubscriberRole, showNotificationOnCanvas} from '../../../constants/utility.js';
import { showHeaderBlocker, hideBlocker, showTocBlocker, disableHeader } from '../../../js/toggleLoader';
import { TocToggle, TOGGLE_ELM_SPA, ELM_CREATE_IN_PLACE, SAVE_ELM_DATA, CLOSE_ELM_PICKER, PROJECT_SHARING_ROLE, IS_SLATE_SUBSCRIBED,
        CHECK_SUBSCRIBED_SLATE_STATUS, OpenLOPopup, AddToExternalFrameworkAS } from '../../../constants/IFrameMessageTypes';
import { releaseSlateLockWithCallback, getSlateLockStatusWithCallback } from '../../CanvasWrapper/SlateLock_Actions';
import { loadTrackChanges } from '../../CanvasWrapper/TCM_Integration_Actions';
import { ALREADY_USED_SLATE_TOC, ELEMENT_ASSESSMENT, PROJECT_PREVIEW_ACTION, SLATE_REFRESH_ACTION, RELEASE_SLATE_LOCK_ACTION,
        CHANGE_SLATE_ACTION } from '../../SlateWrapper/SlateWrapperConstants'
import { prepareLODataForUpdate, setCurrentSlateLOs, getSlateMetadataAnchorElem, prepareLO_WIP_Data } from '../../ElementMetaDataAnchor/ExternalLO_helpers.js';
import { CYPRESS_LF, EXTERNAL_LF, SLATE_ASSESSMENT, ASSESSMENT_ITEM, ASSESSMENT_ITEM_TDX, FETCH_LO_FOR_SLATES, IMG_HTML, FRONT_MATTER, BACK_MATTER, CM_DESCRIPTION, ELEMENT_LEARNING_OBJECTIVE_MAPPING } from '../../../constants/Element_Constants.js';
import { LEARNOSITY, LEARNING_TEMPLATE, PUF, CITE, TDX  } from '../../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import { fetchAlfrescoSiteDropdownList, sendSelectedSiteData } from '../../AlfrescoPopup/Alfresco_Action';
import { getContainerEntityUrn } from '../../FigureHeader/AutoNumber_helperFunctions';
import { triggerSlateLevelSave } from '../../../js/slateLevelSave.js';
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
                case 'tableContentModified':
                    // Making condition true for triggering slate level save api
                    localStorage.setItem('isChangeInSlate', 'true');
                    break;
                case 'tocContainersLabelUpdate':
                    showNotificationOnCanvas(message);
                    break;
                case 'getPermissions':
                    this.sendingPermissions();
                    break;
                case 'selectedSlate':
                case 'titleChanging':
                    message['parentId'] = this.state.project_urn;
                    this.setCurrentSlate(message);
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
                    config.tcmStatus = (message.tcm && message.tcm.activated == true ? true : undefined);
                    config.userId = message['x-prsn-user-id'].toLowerCase();
                    config.userName = message['x-prsn-user-id'].toLowerCase();
                    config.ssoToken = message.ssoToken;
                    config.PearsonExtSSOSession = message.PearsonExtSSOSession;
                    config.projectUrn = message.id;
                    config.citeUrn = message.citeUrn;
                    config.isCypressPlusEnabled = message.isCypressPlusEnabled;
                    config.projectEntityUrn = message.entityUrn;
                    config.alfrescoMetaData = message;
                    if (message?.alfresco?.repositoryFolder) {
                        let alfrescoRepository = message.alfresco.repositoryFolder?.split('/')?.[0] || message.alfresco.repositoryFolder
                        config.alfrescoMetaData.alfresco.repositoryFolder = alfrescoRepository
                        if (message?.alfresco?.siteId) config.alfrescoMetaData.alfresco.siteId = alfrescoRepository
                        fetchAlfrescoSiteDropdownList('projectAlfrescoSettings')
                    }
                    this.props.cypressPlusEnabled( message.isCypressPlusEnabled, config.SHOW_CYPRESS_PLUS,)
                    config.book_title = message.name;
                    this.props.fetchAuthUser()
                    this.props.fetchLearnosityContent()

                    // call get project api here
                    this.props.getProjectDetails()
                    this.props.fetchProjectLFs()
                    this.props.fetchDefaultLF(message.defaultLearningFramework)
                    break;
                case 'permissionsDetails':
                    this.handlePermissioning(message);
                    break;
                case 'statusForSave':
                    this.handleLOData(message);
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
                    this.handleRefreshSlate();
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
                    if(message.hasOwnProperty('slateTagEnabled')){
                        let dataToSend = message.assessmentSlateData ? this.props?.getRequiredSlateData?.getRequiredSlateData[message.slateManifestUrn]?.contents?.bodymatter[0] :
                                        this.props?.slateLevelData[config.slateManifestURN]?.contents?.bodymatter[0];
                        let messageData = {assessmentResponseMsg:message.slateTagEnabled};
                        let slateManifestUrn = message.slateManifestUrn ?? config.slateManifestURN;
                        let isFromRC = message.assessmentSlateData ? true : false;
                        this.props.isLOExist(messageData);
                        const { assessmenId } = this.props.assessmentReducer
                        const slateVersionStatus = this.props.slateLevelData[config.slateManifestURN]?.status
                        const approvedAssessmentCheck = slateVersionStatus === "approved" && dataToSend.type === "element-assessment"
                        if (config.parentEntityUrn !== (FRONT_MATTER || BACK_MATTER)) {
                            let assessmentUrn = message?.assessmentUrn ?? document.getElementsByClassName("slate_assessment_data_id_lo")[0].innerText;
                            sendDataToIframe({ 'type': 'AssessmentSlateTagStatus', 'message': { assessmentId:  assessmentUrn ? assessmentUrn :
                                             config.assessmentId, AssessmentSlateTagStatus : message.slateTagEnabled, containerUrn: slateManifestUrn } });
                            if(dataToSend?.elementdata){
                                dataToSend.inputType = ELEMENT_ASSESSMENT
                                dataToSend.inputSubType = "NA"
                                dataToSend.index = "0"
                                dataToSend.elementParentEntityUrn = message.slateEntityUrn ?? config.slateEntityURN
                                dataToSend.elementdata.loAssociation = message.slateTagEnabled
                                dataToSend.slateVersionUrn = slateManifestUrn
                                dataToSend.html = {title : `<p>${dataToSend.elementdata.assessmenttitle}</p>`}
                                if(approvedAssessmentCheck && assessmenId){    // this is to update id and versionUrn if assessment slate status is approved
                                    dataToSend.id = assessmenId
                                    dataToSend.versionUrn = assessmenId
                                }
                                // fromTOCWrapper is used for aligning slate tag and LO indicator in TOC
                                if(assessmenId || message?.fromCE || message?.fromTOCWrapper){
                                    this.props.updateElement(dataToSend, 0, null, null, null, null, null, isFromRC, this.props?.getRequiredSlateData?.getRequiredSlateData);
                                }
                                if(message.assessmentSlateData)
                                    this.handleRefreshSlate();
                            }
                        }
                }
                    break;
                case 'brokerPreview':
                case 'slatePreview':
                case 'projectPreview':
                    let slateEntityURN = this.props?.popupParentSlateData?.isPopupSlate ? this.props?.popupParentSlateData?.parentSlateEntityUrn : config.slateEntityURN;
                    if (messageType === 'slatePreview') {
                        triggerSlateLevelSave(slateEntityURN, CHANGE_SLATE_ACTION);
                    } else {
                        triggerSlateLevelSave(slateEntityURN, PROJECT_PREVIEW_ACTION);
                    }
                    if (!config.savingInProgress) {
                        this.props.publishContent(messageType,message);
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
                        this.updatePageLink(message);
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
                    this.handleExtLOData(message);
                    break;
                    break;
                case 'selectedCatToolData' :
                    //Check if message.asset is array
                    if (message.asset && Array.isArray(message.asset) && message.asset?.length > 0) {
                        message.asset = message.asset[0]
                    }
                    else if (message.assets && Array.isArray(message.assets) && message.assets?.length > 0) {
                        message.asset = message.assets[0]
                    }
                    if (this.props?.alfrescoReducer?.savedElement) {
                        message = {
                            ...message,
                            ...this.props.alfrescoReducer?.savedElement,
                            isEditor: this.props.alfrescoReducer.savedElement?.editor ?? undefined
                        }
                        let changedSiteUrl = false, changedAlfrescoData = {}
                        if (message.site && Object.keys(message.site)?.length > 0) {
                            const projectAlfrescoNodeRef = this.props.alfrescoReducer?.savedElement?.citeNodeRef ?? ""
                            if (message.site?.rootNodeId !== projectAlfrescoNodeRef) {
                                changedSiteUrl = true
                                changedAlfrescoData = {
                                    guid: message.site?.rootNodeId,
                                    title: message.site?.title,
                                    id: message.site?.rootNodeName,
                                    visibility: message.site?.visibility
                                }
                            }
                            message = {
                                ...message,
                                changedSiteUrl,
                                changedAlfrescoData
                            }
                        }
                    }
                    message.launchAlfrescoPopup = false
                    console.log('Message from Alfresco', message)
                    if (message.isEditor) {
                        this.handleEditorSave(message)
                    }
                    if (message.calledFrom === "NarrativeAudio" || message.calledFromGlossaryFootnote) {
                        this.handleAudioData(message)
                    }
                    if (message.calledFrom === "GlossaryImage" || message.calledFromImageGlossaryFootnote) {
                        this.handleImageData(message)
                    }
                    // Making condition true for triggering slate level save api
                    localStorage.setItem('isChangeInSlate', 'true');
                    this.props.saveSelectedAssetData(message)
                    break;
                case 'selectedSite':
                    sendSelectedSiteData(this.props,message)
                    break;
                case 'saveAlfrescoDataToConfig':
                    config.alfrescoMetaData = message
                    break;
                case TOGGLE_ELM_SPA:
                    this.handleElmPickerTransactions(message);
                    break;
                case 'openInlineAlsfrescoPopup' :
                    this.props.alfrescoPopup(message);
                    break;
                case 'spellCheckStatus':
                    this.props.toggleSpellCheckAction();
                    // refreshing the slate once spell check toggle is changed
                    this.handleRefreshSlate();
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
                    this.getAssessmentForWillowAlignment(message);
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
                        this.handleRefreshSlate();
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
            This Function is used to get AssessmentData For Aligned Willow Framework
         */
        getAssessmentForWillowAlignment = (message) => {
            const {currentSlateLOData, projectLearningFrameworks, currentSlateLF, defaultLF } = this.props
            let slateManifestURN = config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN
            let apiKeys_LO = {
                'loApiUrl': config.LEARNING_OBJECTIVES_ENDPOINT,
                'strApiKey': config.STRUCTURE_APIKEY,
                'productApiUrl': config.PRODUCTAPI_ENDPOINT,
                'manifestApiUrl': config.ASSET_POPOVER_ENDPOINT,
                'assessmentApiUrl': config.ASSESSMENT_ENDPOINT,
                
                'manifestReadonlyApi': config.MANIFEST_READONLY_ENDPOINT,
                'structureApiEndpoint':config.AUDIO_NARRATION_URL
            };
            let externalLFUrn = [];
            if (projectLearningFrameworks?.externalLF?.length) {
                projectLearningFrameworks.externalLF.map(lf => externalLFUrn.push(lf.urn));
            }
            let assessmentuRN = "";
            let assessmentType = "";
            let assessmentTypeLO = "";
            if (config.slateType === 'assessment' && document.getElementsByClassName("slate_assessment_data_id_lo").length) {
                assessmentuRN = document.getElementsByClassName("slate_assessment_data_id_lo")[0].innerText;
                assessmentType = document.getElementsByClassName("slate_assessment_data_format_lo")[0].innerText;
            }
            switch (assessmentType) {
                case TDX:
                    assessmentTypeLO = ASSESSMENT_ITEM_TDX
                    break;
                case CITE:
                case LEARNING_TEMPLATE:
                case PUF:
                case LEARNOSITY:
                default:
                    assessmentTypeLO = ASSESSMENT_ITEM
                    break;
            }
            let previewData = {
                previewUrl: config.PREVIEW_ASSESSMENT_LO_ENDPOINT,
                bookId: config.citeUrn,
                assessmentUrn: assessmentuRN,
                assessmentType: assessmentTypeLO,
                projectEntityUrn:config.projectEntityUrn
            }
            sendDataToIframe({ 'type': 'tocToggle', 'message': { open: false } })
            sendDataToIframe({ 'type': 'canvasBlocker', 'message': { open: true } });
            sendDataToIframe({
                'type': OpenLOPopup,
                'message': {
                    'text': AddToExternalFrameworkAS,
                    'data': currentSlateLOData,
                    'isLOExist': true,
                    'editAction': '',
                    'selectedLOs': currentSlateLOData,
                    'apiConstants': message.apiKeys_LO ?? apiKeys_LO,
                    'externalLFUrn': externalLFUrn,
                    'currentSlateId': slateManifestURN,
                    'chapterContainerUrn': '',
                    'currentSlateLF': currentSlateLF,
                    'assessmentUrn': message.assessmentUrn  ? message.assessmentUrn : assessmentuRN,
                    'previewData': previewData,
                    'defaultLF': defaultLF,
                    'loSpa_Source': message.loSpa_Source,
                    'isSubscribed':message.isSubscribed ? message.isSubscribed : false,
                    'isApprovedSlate':message.isApprovedSlate,
                    'entityURN':message.entityURN,
                    'isSlateLocked':message?.isSlateLocked
                }
            })
        }

        /**
          * This method handles all transactions from Elm Picker SPA
          * @param {*} message | message received from wrapper
          */
        handleElmPickerTransactions = (message) => {
            if (message?.dataToSend?.type) {
                switch (message.dataToSend.type) {
                    case ELM_CREATE_IN_PLACE:
                    case SAVE_ELM_DATA:
                        this.props.setElmPickerData(message.dataToSend);
                        break;
                    case CLOSE_ELM_PICKER:
                    default:
                        this.props.setElmPickerData({})
                        break;
                }
                this.setState({
                    showBlocker: false
                });
            } else {
                this.props.setElmPickerData({})
            }
            hideBlocker();
        }

        /**
         * Updates the element count and refreshes slate
         * @param {String} message element count in a slate
         */
        changeSlateLength = (message) => {
            this.props.setSlateLength(message)
            this.handleRefreshSlate()
        }

        /**
         * Handle the element update action on linking a page
         */
        updatePageLink = (linkData) => {
            let activeElement, linkNode, linkHTML, editor;
            let linkId = "", elementId = "", pageId = "";
            let linkNotification = '';
            document.getElementById('link-notification').innerText = "";
            if ('link' in linkData && linkData.link == "link" && 'elementId' in linkData &&
                'linkId' in linkData && 'pageId' in linkData && 'pageName' in linkData) {

                linkId = linkData.linkId || "";
                elementId = linkData.elementId || "";
                pageId = linkData.pageId || "";

                var html = linkData.pageName;
                var div = document.createElement("div");
                div.innerHTML = html;
                const pageLinkText = div.innerText
                let elementContainer = document.querySelector('.element-container[data-id="' + linkData.elementId + '"]');
                activeElement = elementContainer.querySelectorAll('.cypress-editable');
                activeElement.forEach((item) => {
                    if (item.classList.contains('mce-content-body') || !item.classList.contains('place-holder')) {
                        if (item.querySelector(`[asset-id="${linkData.linkId}"]`) || item.querySelector('#' + linkData.linkId)) {
                            tinymce.activeEditor.undoManager.transact(() => {
                                item.focus();
                                editor = item;

                                let elementTag = "";
                                linkNode = item.querySelector(`[asset-id="${linkData.linkId}"]`) ? item.querySelector(`[asset-id="${linkData.linkId}"]`) :
                                item.querySelector('#' + linkData.linkId);
                                if(linkNode.classList.contains('sup')) {
                                    elementTag = 'sup';
                                } else if(linkNode.classList.contains('sub')) {
                                    elementTag = 'sub';
                                }
                                linkHTML = linkNode.innerHTML || '';
                                linkNode.outerHTML = '<abbr title="Slate Link" class="Pearson-Component AssetPopoverTerm ' + elementTag + '" asset-id="' + linkId +
                                '" element-id="' + elementId + '" data-uri="' + pageId + '">' + linkHTML + '</abbr>';
                                if (/(<abbr [^>]*id="page-link-[^"]*"[^>]*>.*<\/abbr>)/gi.test(linkNode.outerHTML)) {
                                    linkNotification = "Link updated to slate '" + pageLinkText + "'.";
                                } else {
                                    linkNotification = "Link added to slate '" + pageLinkText + "'.";
                                }
                            });
                        }
                    }
                });
            } else if ('link' in linkData && (linkData.link == "cancel" || linkData.link == "unlink" || linkData.link == "unlinkToc") &&
                'elementId' in linkData && 'linkId' in linkData) {
                let elementContainer = document.querySelector('.element-container[data-id="' + linkData.elementId + '"]');
                activeElement = elementContainer.querySelectorAll('.cypress-editable');
                activeElement.forEach((item) => {
                    if (item.classList.contains('mce-content-body') || !item.classList.contains('place-holder')) {
                        if (item.querySelector(`[asset-id="${linkData.linkId}"]`) || item.querySelector('#' + linkData.linkId)) {

                            tinymce.activeEditor.undoManager.transact(() => {
                                item.focus();
                                editor = item;
                                linkNode = item.querySelector(`[asset-id="${linkData.linkId}"]`) ? item.querySelector(`[asset-id="${linkData.linkId}"]`) :
                                        item.querySelector('#' + linkData.linkId);
                                linkHTML = linkNode.innerHTML || '';
                                linkNode.outerHTML = linkHTML;
                                if (linkData.link == "unlink" || linkData.link == "unlinkToc") {
                                    this.props.assetIdForSnapshot(linkData.linkId)
                                    linkNotification = "Link removed.";
                                }
                            });
                        }
                    }
                });
            }

            document.getElementById('link-notification').innerText = linkNotification;
            sendDataToIframe({ 'type': TocToggle, 'message': { "open": false } });

            setTimeout(() => {
                if (editor) {
                    editor.click();
                    editor.blur();
                }
            }, 500);
        }

        handleEditorSave = (message) =>{
            let params = {
                element: message.id,
                editor: this.props.alfrescoEditor,
                asset: message.asset,
                launchAlfrescoPopup: false,
                isInlineEditor: message.isEditor,
                imageArgs: this.props.imageArgs
            }
            this.props.saveInlineImageData(params);
            hideBlocker();
        }

        handleAudioData = (message) => {
            let imageData = message.asset;
            let figureType = imageData?.content?.mimeType?.split('/')[0]
            let smartLinkAssetType = imageData?.properties[CM_DESCRIPTION] && (typeof (imageData.properties[CM_DESCRIPTION]) == "string") ?
            imageData.properties[CM_DESCRIPTION].includes('smartLinkType') ?
            JSON.parse(imageData.properties[CM_DESCRIPTION]).smartLinkType : "" : "";
            if (figureType == "audio" || smartLinkAssetType?.toLowerCase() == "audio") {
                this.props.saveDataFromAlfresco(message);
                let payloadObj = {
                    asset: {},
                    id: ''
                }
                this.props.saveSelectedAssetData(payloadObj);
                hideBlocker();
            } else {
                this.props.showWrongAudioPopup(true);
            }
        }

        /**
         * handle Glossary Image Data
         */
        handleImageData = (message) => {
            let imageData = message.asset;
            let figureType = imageData?.content?.mimeType?.split('/')[0]
            if (figureType == "image") {
                this.props.saveImageDataFromAlfresco(message);
                let payloadObj = {
                    asset: {},
                    id: ''
                }
                this.props.saveSelectedAssetData(payloadObj);
                hideBlocker();
            } else {
                this.props.showWrongImagePopup(true);
            }
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
        /**
         * This function is responsible for handling the updated LOs w.r.t. Slate
         * and updating the Metadata Anchor Elements on Slate
         * @param {*} message Event Message on Saving Ext LF LO data for Slate
         */
        handleExtLOData = message => {
            if (message?.statusForExtLOSave) {
                if (message?.loLinked?.length) {
                    const regex = /<math.*?data-src=\'(.*?)\'.*?<\/math>/g;
                    message.loLinked.map(loData => {
                        loData.label.en = loData?.label?.en.replace(regex, IMG_HTML) ?? loData.label.en;
                    });
                }
                const newLOsLinked = [...message.loLinked];
                let slateData = this.props.slateLevelData;
                const newSlateData = JSON.parse(JSON.stringify(slateData));
                let bodymatter = newSlateData[config.slateManifestURN].contents.bodymatter;
                let loDataToUpdate = prepareLODataForUpdate(bodymatter, message);
                /** Update Existing Metadata Anchors on the Slate */
                if (loDataToUpdate?.length) {
                    let requestPayload = {
                        "loData": loDataToUpdate
                    }
                    this.props.updateElement(requestPayload)
                }
                let updatedSlateLOs = []
                if (message?.loUnlinked?.length && typeof message.loUnlinked[0] === 'string') {
                    const existingSlateLOs = this.props.currentSlateLOData;
                    updatedSlateLOs = existingSlateLOs.filter(existingLO => message?.loUnlinked?.indexOf(existingLO.id ?? existingLO.loUrn) < 0);
                    updatedSlateLOs = updatedSlateLOs.concat(newLOsLinked ?? []);
                } else {
                    updatedSlateLOs = setCurrentSlateLOs(this.props.currentSlateLOData, message.loUnlinked, newLOsLinked);
                }
                const externalLOStatusMessage = Object.assign(message, {loListLength : updatedSlateLOs?.length} )
                this.props.isLOExist(externalLOStatusMessage);
                this.props.currentSlateLO(updatedSlateLOs);
                this.props.currentSlateLOMath(updatedSlateLOs);
                this.props.currentSlateLOType(updatedSlateLOs?.length ? EXTERNAL_LF : "");
                this.props.updateLastAlignedLO(message.lastAlignedExternalLO);

                let lastAlignedLos = localStorage.getItem('lastAlignedLos');
                let lastAlignedLosToSlates = {};
                if(lastAlignedLos && lastAlignedLos.length > 0){
                    lastAlignedLosToSlates = JSON.parse(lastAlignedLos);
                }
                let slateUrn = config.slateManifestURN;
                let newAlignment = {};
                newAlignment[slateUrn] = message.lastAlignedExternalLO
                localStorage.setItem('lastAlignedLos', JSON.stringify({...lastAlignedLosToSlates,...newAlignment}));
            }
        }
        handleLOData = (message) => {
            if (message.statusForSave) {
                message.loObj ? this.props.currentSlateLOMath([message.loObj.label.en]) : this.props.currentSlateLOMath("");
                if (message.loObj && message.loObj.label && message.loObj.label.en) {
                    const regex = /<math.*?data-src=\'(.*?)\'.*?<\/math>/g
                    message.loObj.label.en = message.loObj.label.en.replace(regex, IMG_HTML);
                }
                const loDataToSave = config.slateType == SLATE_ASSESSMENT ? message : message.loObj ? [message.loObj] : [message]
                this.props.currentSlateLO(loDataToSave);
                this.props.currentSlateLOType(message.loObj?.loUrn || message.loObj?.id || config.slateType == SLATE_ASSESSMENT ? CYPRESS_LF : "");
                this.props.isLOExist(message);
                let slateData = this.props.slateLevelData;
                const newSlateData = JSON.parse(JSON.stringify(slateData));
                let bodymatter = newSlateData[config.slateManifestURN].contents.bodymatter
                let LOElements = [];

                let loIndex = [];
                bodymatter.forEach((item, index) => {
                    if (item.type == ELEMENT_LEARNING_OBJECTIVE_MAPPING) {
                        LOElements.push(item.id)
                        loIndex.push(index);
                    }
                    if (item.type == "element-aside") {
                        item.elementdata.bodymatter.forEach((ele, indexInner) => {
                            if (ele.type == ELEMENT_LEARNING_OBJECTIVE_MAPPING) {
                                LOElements.push(ele.id)
                                indexInner = index + "-" + indexInner;
                                loIndex.push(indexInner);
                            }
                        })
                    }
                });
                let currentSlateLOs = Array.isArray(this.props.currentSlateLOData) ? this.props.currentSlateLOData[0] : this.props.currentSlateLOData;
                let loUrn = currentSlateLOs.id ? currentSlateLOs.id : currentSlateLOs.loUrn;
                let LOWipData = {
                    "elementdata": {
                        "loref": loUrn
                    },
                    "metaDataAnchorID": LOElements,
                    "elementVersionType": ELEMENT_LEARNING_OBJECTIVE_MAPPING,
                    "loIndex": loIndex
                }
                if (LOElements.length) {
                    let requestPayload = {
                        "loData": [LOWipData]
                    }
                    this.props.updateElement(requestPayload)
                }
            }
        }

        handlePermissioning = (message) => {
            if (message && message.permissions) {
                this.props.handleUserRole(message.permissions, message.roleId)
            }
        }

        /**
         * function to set owner project slate popup flag as true
         */
        resetOwnerSlatePopupFlag = () => {
            const { projectSubscriptionDetails } = this.props;
            const isOwnerKeyExist = localStorage.getItem('hasOwnerEdit');
            const isSubscribersKeyExist = localStorage.getItem('hasSubscriberView');
            if (isOwnerRole(projectSubscriptionDetails?.sharingContextRole, projectSubscriptionDetails?.projectSubscriptionDetails?.isSubscribed) && !isOwnerKeyExist) {
                this.props.isOwnersSubscribedSlate(true);
            }else if(isSubscriberRole(projectSubscriptionDetails?.sharingContextRole, projectSubscriptionDetails?.projectSubscriptionDetails?.isSubscribed) &&
                    !isSubscribersKeyExist){
                this.props.isSubscribersSubscribedSlate(true);
            }
        }

        handleRefreshSlate = () => {
            const { projectSubscriptionDetails } = this.props;
            localStorage.removeItem('newElement');
            config.slateManifestURN = config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN
            config.slateEntityURN = config.tempSlateEntityURN ? config.tempSlateEntityURN : config.slateEntityURN
            config.tempSlateManifestURN = null
            config.tempSlateEntityURN = null
            config.isPopupSlate = false
            let id = config.slateManifestURN;
            // reset owner slate popup flag on slate refresh
            this.resetOwnerSlatePopupFlag();
            // get slate subscription details on slate refresh from canvas SPA
            if (projectSubscriptionDetails?.projectSharingRole === 'OWNER') {
                sendDataToIframe({ 'type': CHECK_SUBSCRIBED_SLATE_STATUS, 'message': { slateManifestURN: config.slateManifestURN } });
            }
            releaseSlateLockWithCallback(config.projectUrn, config.slateManifestURN, (response) => {
                config.page = 0;
                config.scrolling = true;
                config.totalPageCount = 0;
                config.pageLimit = 0;
                config.fromTOC = false;
                config.elementSlateRefresh = true
                sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': { slateRefreshStatus: 'Refreshing...' } });
                this.props.handleSlateRefresh(id, () => {
                    config.isSlateLockChecked = false;
                    this.props.getSlateLockStatus(config.projectUrn, config.slateManifestURN)
                })
            });
        }

        sendDataToIframe = (messageObj) => {
            sendDataToIframe(messageObj);
        }
        hanndleSplitSlate = (newSlateObj) => {
            this.props.handleSplitSlate(newSlateObj);
        }
        sendingPermissions = () => {
            /**
             * TO BE VERIFIED
             *  */
            let permissionObj = this.props.currentProject || null;
            if (permissionObj === null) {
                permissionObj = {};
                if (this.props.permissions) {
                    let tocEditTitle = this.props.permissions.includes('toc_edit_title') ? 'toc_edit_title' : ""
                    let tocDelete = this.props.permissions.includes('toc_delete_entry') ? 'toc_delete_entry' : ""
                    let tocRearrage = this.props.permissions.includes('toc_rearrange_entry') ? 'toc_rearrange_entry' : ""
                    let tocAdd = this.props.permissions.includes('toc_add_pages') ? 'toc_add_pages' : ""
                    let unlinkContent = this.props.permissions.includes('unlink_content_from_TOC') ? 'unlink_content_from_TOC' : ""
                    permissionObj.permissions = [tocEditTitle, tocDelete, tocRearrage, tocAdd, unlinkContent]
                }
                permissionObj.roleId = this.props.roleId;
            }


            sendDataToIframe({
                'type': 'Permissions',
                'message': { 'permissions': permissionObj.permissions, 'roleName': permissionObj.roleId }
            });
        }

        setCurrentSlate = (message) => {
            config.isSlateLockChecked = false;
            let currentSlateObject = {};
            const projectSubscriptionDetails = {
                isSubscribed: false,
                owner: {}
            }

            if (message?.node?.autoNumberingDetails) {
                this.props.setTocContainersAutoNumberList(message.node.autoNumberingDetails)
            }
            // reset owner slate popup flag on slate change
            this.resetOwnerSlatePopupFlag();
            if (message['category'] === 'titleChange') {
                config.staleTitle = message?.title ?? '';
                currentSlateObject = {
                    title: message.title,
                }
                this.props.setUpdatedSlateTitle(currentSlateObject)
            }
            if (message && message.node) {
                // To prevent the change slate focus action on browser refresh
                let isRefreshBrowser = localStorage.getItem('browser_refresh');
                if (isRefreshBrowser == '1') {
                    localStorage.setItem('browser_refresh', '0');
                    // At the time slate versioning prevent trigger slate level save
                } else if (localStorage.getItem('slateNewVersion') === 'true') {
                    localStorage.removeItem('slateNewVersion');
                } else {
                    triggerSlateLevelSave(config.slateEntityURN, CHANGE_SLATE_ACTION);
                }
                const slateManifest = config.isPopupSlate ? config.tempSlateManifestURN : config.slateManifestURN
                if (this.props.withinLockPeriod === true) {
                    this.props.releaseSlateLock(config.projectUrn, slateManifest)
                    triggerSlateLevelSave(config.slateEntityURN, RELEASE_SLATE_LOCK_ACTION);
                }
                sendDataToIframe({ 'type': 'hideWrapperLoader', 'message': { status: true } })
                sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                currentSlateObject = {
                    title: message.node.unformattedTitle ? message.node.unformattedTitle.en : ''
                }
                this.setState({
                    showBlocker: false
                })
                this.props.setUpdatedSlateTitle(currentSlateObject)
                config.staleTitle = message.node.unformattedTitle ? message.node.unformattedTitle.en : '';
                config.slateEntityURN = message.node.entityUrn;
                config.slateManifestURN = message.node.containerUrn;
                config.tempSlateManifestURN = null;
                config.tempSlateEntityURN = null;
                config.disablePrev = message.disablePrev;
                config.disableNext = message.disableNext;
                config.slateType = message?.node?.nodeLabel === "assessment-slate" ? "assessment" : message?.node?.nodeLabel;
                config.parentContainerUrn = message.node.ParentContainerUrn;
                config.parentEntityUrn = message.node.ParentEntityUrn;
                config.page = 0;
                config.scrolling = true;
                config.totalPageCount = 0;
                config.fromTOC = true;
                config.tcmslatemanifest= null;
                config.parentLabel = message.node.nodeParentLabel;
                config.parentOfParentItem = message.node.parentOfParentItem
                // checking if selected container is subscribed or not
                if (message?.node?.isSubscribed) {
                    projectSubscriptionDetails.isSubscribed = message.node.isSubscribed;
                }
                // calling an action to set project subscription details coming from TOC SPA
                this.props.setProjectSubscriptionDetails(projectSubscriptionDetails);
                this.props.getSlateLockStatus(config.projectUrn, config.slateManifestURN)
                let slateData = {
                    currentProjectId: config.projectUrn,
                    slateEntityUrn: config.slateEntityURN
                }
                /* Message from TOC is current Slate is Joined PDF */
                /** ---------------------------------------------- */
                if (message?.node) {
                    let matterType = 'bodymatter'
                    if (message.node.parentOfParentItem !== "") {
                        if (message.node.parentOfParentItem === 'backmatter') {
                            matterType = 'backmatter'
                        } else if (message.node.parentOfParentItem === 'frontmatter') {
                            matterType = 'frontmatter'
                        }
                    } else if (message.node.nodeParentLabel === 'backmatter') {
                        matterType = 'backmatter'
                    } else if (message.node.nodeParentLabel === 'frontmatter') {
                        matterType = 'frontmatter'
                    }
                    this.props.setSlateMatterType(matterType);
                }
                config.isPopupSlate = false;
                config.figureDataToBeFetched = true;
                this.props.fetchAudioNarrationForContainer(slateData)
                this.props.clearElementStatus()
                this.props.fetchUsageTypeData('assessment');
                this.props.fetchSlateData(message.node.containerUrn, config.slateEntityURN, config.page, '', "");
                this.props.fetchLOBList();
                config.savingInProgress = false
                this.props.setSlateType(config.slateType);
                this.props.setSlateEntity(config.slateEntityURN);
                this.props.setSlateParent(message.node.nodeParentLabel);
                this.props.glossaaryFootnotePopup(false);
                this.props.audioGlossaryPopup(false);
                this.props.savePopupParentSlateData({});
                let apiKeys_LO = {
                    'loApiUrl': config.LEARNING_OBJECTIVES_ENDPOINT,
                    'strApiKey': config.STRUCTURE_APIKEY,
                    'mathmlImagePath': config.S3MathImagePath ? config.S3MathImagePath : defaultMathImagePath,
                    'productApiUrl': config.PRODUCTAPI_ENDPOINT,
                    'manifestReadonlyApi': config.MANIFEST_READONLY_ENDPOINT,
                    'assessmentApiUrl': config.ASSESSMENT_ENDPOINT,
                    'structureApiEndpoint':config.AUDIO_NARRATION_URL
                }
                if (config.parentEntityUrn !== FRONT_MATTER && config.parentEntityUrn !== BACK_MATTER && (FETCH_LO_FOR_SLATES.includes(config.slateType))) {
                    let externalLFUrn = []
                    if (this?.props?.projectLearningFrameworks?.externalLF?.length) {
                        this.props.projectLearningFrameworks.externalLF.map(lf => externalLFUrn.push(lf.urn));
                    }
                    sendDataToIframe({ 'type': 'getSlateLO', 'message': { projectURN: config.projectUrn, slateURN: config.slateManifestURN,
                    apiKeys_LO,externalLFUrn:externalLFUrn ,entityURN:config.slateEntityURN} })
                }
                else if (config.parentEntityUrn !== FRONT_MATTER && config.parentEntityUrn !== BACK_MATTER && config.slateType == "container-introduction") {
                    sendDataToIframe({ 'type': 'getLOList', 'message': { projectURN: config.projectUrn, chapterURN: config.parentContainerUrn, apiKeys_LO } })
                }
            }
            /**
             * TO BE IMPLEMENTED
             *  */
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
                    tocDeleteMessage={this.state.tocDeleteMessage} updatePageLink={this.updatePageLink}  closeUndoTimer = {this.state.closeUndoTimer}/>
                    {this.showLockPopup()}
                </React.Fragment>
            )
        }

    }

    return CommunicationWrapper;
}

export default CommunicationChannel;
