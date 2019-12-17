/**
 * Module - WithWrapperCommunication
 * Description - HOC to inherit channel communication functionalities with wrapper
 * Developer - Abhay Singh
 * Last modified - 09-09-2019
 */

// IMPORT - Plugins //
import React, { Component } from 'react';
// IMPORT - Components/Dependencies //
import config from '../../../config/config.js';
import { sendDataToIframe } from '../../../constants/utility.js';
import { showHeaderBlocker, hideBlocker, showTocBlocker, disableHeader } from '../../../js/toggleLoader';
import { TocToggle } from '../../../constants/IFrameMessageTypes';
import { releaseSlateLockWithCallback, getSlateLockStatusWithCallback } from '../../CanvasWrapper/SlateLock_Actions';
import PopUp from '../../PopUp';
import {loadTrackChanges} from '../../CanvasWrapper/TCM_Integration_Actions';
import { ALREADY_USED_SLATE_TOC } from '../../SlateWrapper/SlateWrapperConstants'

function WithWrapperCommunication(WrappedComponent) {
    class CommunicationWrapper extends Component {
        constructor(props) {
            super(props);
            this.state = {
                project_urn: "",
                isTableLaunched: false,
                showBlocker: false,
                toggleTocDelete: false,
                tocDeleteMessage: null,
                showLockPopup : false,
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
                    this.setCurrentSlate(message);
                    break;
                case 'deleteTocItem':
                    this.onDeleteTocItem(message);
                    break;
                case 'deleteTocItemWithPendingTrack':
                    this.onDeleteTocItem(message, 'withPendingTrack');
                    break;
                case 'showSingleContainerDelete':
                    this.onSingleContainerDelete();
                    break;
                case 'titleChanging': {
                    message['parentId'] = this.state.project_urn;
                    this.setCurrentSlate(message);
                }
                    break;
                case 'newSplitedSlate':
                    setTimeout(()=>{this.hanndleSplitSlate(message)}, 500)
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
                    // config.disablePrev = message.enablePrev;
                    config.disablePrev = false;//message.enablePrev;
                    break;
                case 'enableNext':
                    // config.disablePrev = message.enableNext;
                    config.disableNext = false;//message.enableNext;
                    break;
                case 'disablePrev':
                    // config.disablePrev = message.disablePrev;
                    config.disablePrev = true;//message.disablePrev;
                    break;
                case 'disableNext':
                    // config.disableNext = message.disableNext;
                    config.disableNext = true;//message.disableNext;
                    break;
                case 'swappedIS':
                case 'ISDeleted':
                case 'TocLoader':
                    {
                        /**
                         * TO BE IMPLEMENTED
                         *  */
                    }
                    break;
                case 'refreshElementWithTable':
                    {
                        // this.showCanvasBlocker(true);
                        // showHeaderBlocker();
                        // sendDataToIframe({'type': ShowLoader,'message': { status: true }});
                        // this.props.fetchSlateData(config.slateManifestURN);
                        this.setTableData(message.elementId);
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
                case 'updateSlateTitleByID':
                    this.updateSlateTitleByID(message);
                    break;
                case 'projectDetails' :
                    config.tcmStatus = message.tcm.activated;
                    config.userId = message['x-prsn-user-id'].toLowerCase();
                    config.userName = message['x-prsn-user-id'].toLowerCase();
                    config.ssoToken = message.ssoToken;
                    config.projectUrn = message.id;
                    config.citeUrn = message.citeUrn;
                    config.projectEntityUrn = message.entityUrn;
                    config.alfrescoMetaData = message;
                    config.book_title =  message.name;                  
                    this.props.fetchAuthUser();
                    break;
                case 'permissionsDetails':
                    this.handlePermissioning(message);
                    break;
                case 'statusForSave':
                    this.handleLOData(message);
                break;
                case 'getSlateLOResponse':
                    message?this.props.currentSlateLOMath(message.label.en):this.props.currentSlateLOMath("");
                    if(message){
                        const regex = /<math.*?data-src=\'(.*?)\'.*?<\/math>/g;
                        message.label.en= message.label.en.replace(regex, "<img src='$1'></img>")
                    }
                    this.props.currentSlateLO(message);
                    this.props.isLOExist(message);
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
                    let newMessage = {assessmentResponseMsg:message.assessmentResponseMsg};
                    this.props.isLOExist(newMessage);
                    this.props.currentSlateLO(newMessage);
                   break;    
                case 'refreshSlate' :    
                    this.handleRefreshSlate();
                    break;
                case 'cancelCEPopup':
                    if(this.props.currentSlateLOData && this.props.currentSlateLOData.label && this.props.currentSlateLOData.label.en){
                        const regex = /<math.*?data-src=\'(.*?)\'.*?<\/math>/g;
                        this.props.currentSlateLOData.label.en= this.props.currentSlateLOData.label.en.replace(regex, "<img src='$1'></img>")
                        this.props.currentSlateLO(this.props.currentSlateLOData);
                    }
                    
                    this.setState({
                        showBlocker: false
                    });
                 break;
                case 'slatePreview':
                    this.props.publishContent('slatePreview');
                    break;
                case 'projectPreview':
                    this.props.publishContent('projectPreview');
                    break;
                case 'getSlateLockStatus' :
                    this.releaseLockAndRedirect()
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
                case 'trackChanges':{
                     loadTrackChanges();
                     break;
                }
            }
        }

        /**
         * Releases slate lock and logs user out.
         */
        releaseLockAndLogout = () => {
            const { projectUrn, slateManifestURN} = config;
            releaseSlateLockWithCallback(projectUrn, slateManifestURN, (res) => {
                setTimeout(this.props.logout, 500) 
            })
        }
        
        releaseLockAndRedirect = () => { 
            let projectUrn = config.projectUrn
            let slateId = config.slateManifestURN
            if (projectUrn && slateId){
                releaseSlateLockWithCallback(projectUrn, slateId, (response) => {
                   this.redirectDashboard();                    
                });
            }
        }

        redirectDashboard () {
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
                });
                let loUrn = this.props.currentSlateLOData.id ? this.props.currentSlateLOData.id : this.props.currentSlateLOData.loUrn;
                let LOWipData = {
                    "elementdata": {
                        "loref": loUrn
                    },
                    "metaDataAnchorID": LOElements,
                    "elementVersionType": "element-learningobjectivemapping",
                    "loIndex" : loIndex,
                    "slateUrn": config.slateManifestURN
                }
                if(LOElements.length){
                this.props.updateElement(LOWipData)
                }

            }
        }
        
        handlePermissioning = (message) => {
            if (message && message.permissions) {
                this.props.handleUserRole(message.permissions , message.roleId)
            }
        }

        handleRefreshSlate = () => {
            // if(config.isFetchSlateInProgress){
            //     sendDataToIframe({ 'type': 'stopRefreshSpin', 'message': false }); 
            //     return false;
            // }
            localStorage.removeItem('newElement');
            let id = config.slateManifestURN; 
            releaseSlateLockWithCallback(config.projectUrn, config.slateManifestURN,(response) => {
                config.page = 0;
                config.scrolling = true;
                config.totalPageCount = 0;
                config.pageLimit = 0;
                config.fromTOC = false;
                sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': {slateRefreshStatus :'Refreshing'} });
                this.props.handleSlateRefresh(id,()=>{
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
                    permissionObj.permissions = [tocEditTitle , tocDelete , tocRearrage , tocAdd]
                }
                // permissionObj.permissions = [
                //     'toc_edit_title', 'toc_delete_entry', 'toc_rearrange_entry', 'toc_add_pages'
                // ];
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
                if(this.props.withinLockPeriod === true){
                    this.props.releaseSlateLock(config.projectUrn, config.slateManifestURN)
                }          
                sendDataToIframe({ 'type': 'hideWrapperLoader', 'message': { status: true } })
                sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                currentSlateObject = {
                    title: message.node.unformattedTitle ? message.node.unformattedTitle.en : ''
                }
                this.props.setUpdatedSlateTitle(currentSlateObject)
                config.staleTitle = message.node.unformattedTitle ? message.node.unformattedTitle.en : '';
                config.slateEntityURN = message.node.entityUrn;
                config.slateManifestURN = message.node.containerUrn;
                config.disablePrev = message.disablePrev;
                config.disableNext = message.disableNext;
                config.slateType = message.node.nodeLabel;
                config.parentContainerUrn = message.node.ParentContainerUrn;
                config.parentEntityUrn=message.node.ParentEntityUrn;
                config.page = 0;
                config.scrolling = true;
                config.totalPageCount = 0;
                config.fromTOC = true;
                this.props.getSlateLockStatus(config.projectUrn, config.slateManifestURN)
                let slateData = {
                    currentProjectId: config.projectUrn,
                    slateEntityUrn: config.slateEntityURN
                }
                this.props.fetchAudioNarrationForContainer(slateData)  
                this.props.fetchSlateData(message.node.containerUrn,config.slateEntityURN, config.page,'');
                this.props.setSlateType(config.slateType);
                this.props.setSlateEntity(config.slateEntityURN);
                this.props.setSlateParent(message.node.nodeParentLabel);
                this.props.glossaaryFootnotePopup(false);
                let apiKeys = [config.ASSET_POPOVER_ENDPOINT,config.STRUCTURE_APIKEY,config.PRODUCTAPI_ENDPOINT];
                if(config.parentEntityUrn !== "Front Matter" && config.parentEntityUrn !== "Back Matter" && config.slateType =="section"){
                sendDataToIframe({ 'type': 'getSlateLO', 'message': { projectURN: config.projectUrn, slateURN: config.slateManifestURN, apiKeys} })
                }
                else if(config.parentEntityUrn !== "Front Matter" && config.parentEntityUrn !== "Back Matter" && config.slateType =="container-introduction"){
                sendDataToIframe({ 'type': 'getLOList', 'message': { projectURN: config.projectUrn, chapterURN: config.parentContainerUrn, apiKeys} })
                }
            }
            /**
             * TO BE IMPLEMENTED
             *  */
        }

        slateLockAlert = (userInfo) => {
            this.setState({
                showBlocker: true,
                showLockPopup : true,
                lockOwner : userInfo
            })
        }

        deleteTocItem = (message) => {
            hideBlocker();
            showTocBlocker();
            disableHeader(true);

            this.setState({
                toggleTocDelete: true,
                tocDeleteMessage: message
            })
        }

        //Toggle Delete Popup
        modifyState = (args) => {
            this.setState({
                toggleTocDelete: args,
            })
        }
        deleteTocItemWithPendingTrack = (message)=>{
            this.deleteTocItem(message)
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
                if (response == "error"){
                    if(type==='withPendingTrack') {
                        that.deleteTocItemWithPendingTrack('withPendingTrack');
                    }
                    else {
                        that.deleteTocItem(message);
                    }
                    return false;
                }
                try{
                    let status = {
                        slateLocked : response.isLocked,
                        userInfo : response.userId    
                    }
                    if(userName.toLowerCase() === status.userInfo.toLowerCase()) {
                        status.slateLocked = false;
                    }
                    
                    if(status.slateLocked){
                        that.slateLockAlert(status.userInfo);
                    }
                    else{
                        if(type==='withPendingTrack') {
                            that.deleteTocItemWithPendingTrack('withPendingTrack');
                        }
                        else {
                            that.deleteTocItem(message);
                        }
                    }
                }
                catch(err){
                    if(type==='withPendingTrack') {
                        that.deleteTocItemWithPendingTrack('withPendingTrack');
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

        onSingleContainerDelete = () => {
            /**
             * TO BE IMPLEMENTED
             *  */
            hideBlocker();
            showTocBlocker();
            disableHeader(true);

            this.setState({
                toggleTocDelete: true,
                tocDeleteMessage: "singleContainerDelete"
            })
        }

        updateSlateTitleByID = (messageObj) => {
            if (messageObj.slateType && (messageObj.slateType === 'section' || messageObj.slateType === 'assessment')) {
                this.updateTitleSlate(messageObj);
            }
            else if (messageObj.slateType === 'container-introduction') {
                if (this.props.introObject.isCO === false && messageObj.slateID === this.props.introObject.introSlate) {
                    this.updateTitleSlate(messageObj);
                }
                else {
                    this.fetchOpenerData(messageObj);
                }
            }
        }

        fetchOpenerData = (messageObj) => {
            /**
             * TO BE IMPLEMENTED
             *  */
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

        prohibitPropagation = (event) =>{
            if(event){
                event.preventDefault()
                event.stopPropagation()
            }
            return false
        }

        toggleLockPopup = (toggleValue, event) => {
            this.setState({
                showLockPopup: toggleValue,
                showBlocker : toggleValue
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

        setTableData = (elementId) => {
            this.props.getTableEditorData(elementId);
        }
        

        render() {
            return (
                <React.Fragment>
                    <WrappedComponent {...this.props} showBlocker={this.state.showBlocker} showCanvasBlocker={this.showCanvasBlocker} toggleTocDelete={this.state.toggleTocDelete} tocDeleteMessage={this.state.tocDeleteMessage} modifyState={this.modifyState} />
                    {this.showLockPopup()}
                </React.Fragment>
            )
        }

    }

    return CommunicationWrapper;
}

export default WithWrapperCommunication;
