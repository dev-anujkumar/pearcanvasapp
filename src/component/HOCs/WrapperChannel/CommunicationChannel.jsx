/**
 * Module - CommunicationChannel
 * Description - HOC to inherit channel communication functionalities with wrapper
 */

// IMPORT - Plugins //
import React, { Component } from 'react';
// IMPORT - Components/Dependencies //
import config from '../../../config/config.js';
import { sendDataToIframe, defaultMathImagePath } from '../../../constants/utility.js';
import { showHeaderBlocker, hideBlocker, showTocBlocker, disableHeader } from '../../../js/toggleLoader';
import { TocToggle } from '../../../constants/IFrameMessageTypes';
import { releaseSlateLockWithCallback, getSlateLockStatusWithCallback } from '../../CanvasWrapper/SlateLock_Actions';
import PopUp from '../../PopUp';
import { loadTrackChanges } from '../../CanvasWrapper/TCM_Integration_Actions';
import { ALREADY_USED_SLATE_TOC } from '../../SlateWrapper/SlateWrapperConstants'
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
                case 'getPermissions':
                    this.sendingPermissions();
                    break;
                case 'selectedSlate':
                case 'titleChanging':
                    message['parentId'] = this.state.project_urn;
                    this.setCurrentSlate(message);
                    break;
                case 'deleteTocItem':
                    this.onDeleteTocItem(message);
                    break;
                case 'deleteTocItemWithPendingTrack':
                    this.onDeleteTocItem(message, 'withPendingTrack');
                    break;
                case 'showSingleContainerDelete':
                    this.onSingleContainerDelete(message);
                    break;
                case 'newSplitedSlate':
                    setTimeout(() => { this.hanndleSplitSlate(message) }, 1000)
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
                    config.disablePrev = false;//message.enablePrev;
                    break;
                case 'enableNext':
                    config.disableNext = false;//message.enableNext;
                    break;
                case 'disablePrev':
                    config.disablePrev = true;//message.disablePrev;
                    break;
                case 'disableNext':
                    config.disableNext = true;//message.disableNext;
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
                    config.projectUrn = message.id;
                    config.citeUrn = message.citeUrn;
                    config.projectEntityUrn = message.entityUrn;
                    config.alfrescoMetaData = message;
                    config.book_title = message.name;
                    this.props.fetchAuthUser()
                    this.props.fetchLearnosityContent()
                    this.props.fetchProjectLFs()
                    this.props.tcmCosConversionSnapshot()       // for creation of pre-snapshots for cos converted projects
                    break;
                case 'permissionsDetails':
                    this.handlePermissioning(message);
                    break;
                case 'statusForSave':
                    this.handleLOData(message);
                    break;
                case 'getSlateLOResponse':
                    message ? this.props.currentSlateLOMath(message.label.en) : this.props.currentSlateLOMath("");
                    if (message) {
                        const regex = /<math.*?data-src=\'(.*?)\'.*?<\/math>/g;
                        message.label.en = message.label.en.replace(regex, "<img src='$1'></img>")
                    }
                    this.props.currentSlateLO(message);
                    this.props.isLOExist(message);
                    this.props.currentSlateLOType(message);
                    break;
                case 'loEditResponse':
                    this.setState({
                        showBlocker: false
                    });
                    break;
                case 'getLOlistResponse':
                    this.props.currentSlateLO(message);
                    break;
                case 'getAssessmentLOResponse':
                    let newMessage = { assessmentResponseMsg: message.assessmentResponseMsg };
                    this.props.isLOExist(newMessage);
                    this.props.currentSlateLO(newMessage);
                    break;
                case 'refreshSlate':
                    this.handleRefreshSlate();
                    break;
                case 'cancelCEPopup':
                    if (this.props.currentSlateLOData && this.props.currentSlateLOData.label && this.props.currentSlateLOData.label.en) {
                        const regex = /<math.*?data-src=\'(.*?)\'.*?<\/math>/g;
                        this.props.currentSlateLOData.label.en = this.props.currentSlateLOData.label.en.replace(regex, "<img src='$1'></img>")
                        this.props.currentSlateLO(this.props.currentSlateLOData);
                    }

                    this.setState({
                        showBlocker: false
                    });
                    break;
                case 'slatePreview':
                case 'projectPreview':
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
                    this.props.toggleElemBordersAction()
                    break;
                case 'pageNumber':
                    this.props.togglePageNumberAction()
                    break;
                case 'GetActiveSlate':
                    sendDataToIframe({ 'type': 'GetActiveSlate', 'message': { slateEntityURN: config.slateEntityURN } });
                    break;
            }
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

                let elementContainer = document.querySelector('.element-container[data-id="' + linkData.elementId + '"]');              
                activeElement = elementContainer.querySelectorAll('.cypress-editable');
                activeElement.forEach((item) => {
                    if (item.classList.contains('mce-content-body') || !item.classList.contains('place-holder')) {
                        if (item.querySelector(`[asset-id="${linkData.linkId}"]`) || item.querySelector('#' + linkData.linkId)) {
                            tinymce.activeEditor.undoManager.transact(() => {
                                item.focus();
                                editor = item;

                                let elementTag = "";
                                linkNode = item.querySelector(`[asset-id="${linkData.linkId}"]`) ? item.querySelector(`[asset-id="${linkData.linkId}"]`) : item.querySelector('#' + linkData.linkId);
                                if(linkNode.classList.contains('sup')) {
                                    elementTag = 'sup';
                                } else if(linkNode.classList.contains('sub')) {
                                    elementTag = 'sub';
                                }
                                linkHTML = linkNode.innerHTML || '';
                                linkNode.outerHTML = '<abbr title="Slate Link" class="Pearson-Component AssetPopoverTerm ' + elementTag + '" asset-id="' + linkId + '" element-id="' + elementId + '" data-uri="' + pageId + '">' + linkHTML + '</abbr>';
                                if (/(<abbr [^>]*id="page-link-[^"]*"[^>]*>.*<\/abbr>)/gi.test(linkNode.outerHTML)) {
                                    linkNotification = "Link updated to slate '" + linkData.pageName + "'.";
                                } else {
                                    linkNotification = "Link added to slate '" + linkData.pageName + "'.";
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
                                linkNode = item.querySelector(`[asset-id="${linkData.linkId}"]`) ? item.querySelector(`[asset-id="${linkData.linkId}"]`) : item.querySelector('#' + linkData.linkId);
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

        handleLOData = (message) => {
            if (message.statusForSave) {
                message.loObj ? this.props.currentSlateLOMath(message.loObj.label.en) : this.props.currentSlateLOMath("");
                if (message.loObj && message.loObj.label && message.loObj.label.en) {
                    const regex = /<math.*?data-src=\'(.*?)\'.*?<\/math>/g
                    message.loObj.label.en = message.loObj.label.en.replace(regex, "<img src='$1'></img>");
                }
                message.loObj ? this.props.currentSlateLO(message.loObj) : this.props.currentSlateLO(message);
                this.props.isLOExist(message);
                let slateData = this.props.slateLevelData;
                const newSlateData = JSON.parse(JSON.stringify(slateData));
                let bodymatter = newSlateData[config.slateManifestURN].contents.bodymatter
                let LOElements = [];

                let loIndex = [];
                bodymatter.forEach((item, index) => {
                    if (item.type == "element-learningobjectivemapping") {
                        LOElements.push(item.id)
                        loIndex.push(index);
                    }
                    if (item.type == "element-aside") {
                        item.elementdata.bodymatter.forEach((ele, indexInner) => {
                            if (ele.type == "element-learningobjectivemapping") {
                                LOElements.push(ele.id)
                                indexInner = index + "-" + indexInner;
                                loIndex.push(indexInner);
                            }
                        })
                    }
                });
                let loUrn = this.props.currentSlateLOData.id ? this.props.currentSlateLOData.id : this.props.currentSlateLOData.loUrn;
                let LOWipData = {
                    "elementdata": {
                        "loref": loUrn
                    },
                    "metaDataAnchorID": LOElements,
                    "elementVersionType": "element-learningobjectivemapping",
                    "loIndex": loIndex,
                    "slateVersionUrn": config.slateManifestURN
                }
                if (LOElements.length) {
                    this.props.updateElement(LOWipData)
                }

            }
        }

        handlePermissioning = (message) => {
            if (message && message.permissions) {
                this.props.handleUserRole(message.permissions, message.roleId)
            }
        }

        handleRefreshSlate = () => {
            localStorage.removeItem('newElement');
            config.slateManifestURN = config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN
            config.slateEntityURN = config.tempSlateEntityURN ? config.tempSlateEntityURN : config.slateEntityURN
            config.tempSlateManifestURN = null
            config.tempSlateEntityURN = null
            config.isPopupSlate = false
            let id = config.slateManifestURN;
            releaseSlateLockWithCallback(config.projectUrn, config.slateManifestURN, (response) => {
                config.page = 0;
                config.scrolling = true;
                config.totalPageCount = 0;
                config.pageLimit = 0;
                config.fromTOC = false;
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
                    permissionObj.permissions = [tocEditTitle, tocDelete, tocRearrage, tocAdd]
                }
                permissionObj.roleId = 'admin';
            }


            sendDataToIframe({
                'type': 'Permissions',
                'message': { 'permissions': permissionObj.permissions, 'roleName': permissionObj.roleId }
            });
        }

        setCurrentSlate = (message) => {
            config.isSlateLockChecked = false;
            let currentSlateObject = {};
            if (message['category'] === 'titleChange') {
                currentSlateObject = {
                    title: message.title,
                }
                this.props.setUpdatedSlateTitle(currentSlateObject)
            }
            if (message && message.node) {
                if (this.props.withinLockPeriod === true) {
                    this.props.releaseSlateLock(config.projectUrn, config.slateManifestURN)
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
                config.slateType = message.node.nodeLabel;
                config.parentContainerUrn = message.node.ParentContainerUrn;
                config.parentEntityUrn = message.node.ParentEntityUrn;
                config.page = 0;
                config.scrolling = true;
                config.totalPageCount = 0;
                config.fromTOC = true;
                config.tcmslatemanifest= null;
                config.parentLabel = message.node.nodeParentLabel;
                config.parentOfParentItem = message.node.parentOfParentItem
                this.props.getSlateLockStatus(config.projectUrn, config.slateManifestURN)
                let slateData = {
                    currentProjectId: config.projectUrn,
                    slateEntityUrn: config.slateEntityURN
                }
                config.isPopupSlate = false;
                this.props.fetchAudioNarrationForContainer(slateData)
                this.props.clearElementStatus()
                this.props.fetchUsageTypeData('assessment');
                this.props.fetchSlateData(message.node.containerUrn, config.slateEntityURN, config.page, '', "");
                config.savingInProgress = false
                this.props.setSlateType(config.slateType);
                this.props.setSlateEntity(config.slateEntityURN);
                this.props.setSlateParent(message.node.nodeParentLabel);
                this.props.glossaaryFootnotePopup(false);
                this.props.audioGlossaryPopup(false);
                let apiKeys_LO = {
                    'loApiUrl': config.LEARNING_OBJECTIVES_ENDPOINT,
                    'strApiKey': config.STRUCTURE_APIKEY,
                    'mathmlImagePath': config.S3MathImagePath ? config.S3MathImagePath : defaultMathImagePath,
                    'productApiUrl': config.PRODUCTAPI_ENDPOINT,
                    'manifestApiUrl': config.ASSET_POPOVER_ENDPOINT,
                    'assessmentApiUrl': config.ASSESSMENT_ENDPOINT
                }
                if (config.parentEntityUrn !== "Front Matter" && config.parentEntityUrn !== "Back Matter" && config.slateType == "section") {
                    sendDataToIframe({ 'type': 'getSlateLO', 'message': { projectURN: config.projectUrn, slateURN: config.slateManifestURN, apiKeys_LO } })
                }
                else if (config.parentEntityUrn !== "Front Matter" && config.parentEntityUrn !== "Back Matter" && config.slateType == "container-introduction") {
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
        updateTitleSlate = (messageObj) => {
            /**
             * TO BE IMPLEMENTED
             *  */
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
                    <WrappedComponent {...this.props} showBlocker={this.state.showBlocker} showCanvasBlocker={this.showCanvasBlocker} tocDeleteMessage={this.state.tocDeleteMessage} updatePageLink={this.updatePageLink}/>
                    {this.showLockPopup()}
                </React.Fragment>
            )
        }

    }

    return CommunicationWrapper;
}

export default CommunicationChannel;
