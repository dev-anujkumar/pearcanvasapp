/**
 * Module - WithWrapperCommunication
 * Description - HOC to inherit channel communication functionalities with wrapper
 * Developer - Abhay Singh
 * Last modified - 09-09-2019
 */

// IMPORT - Plugins //
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// IMPORT - Components/Dependencies //
const configModule = {}; // TO BE IMPORTED
import config from '../../../config/config';
import { sendDataToIframe } from '../../../constants/utility.js';
import { showHeaderBlocker, hideBlocker, showTocBlocker, disableHeader } from '../../../js/toggleLoader';
import { getSlateLockStatus, getSlateLockStatusWithCallback } from '../../CanvasWrapper/SlateLock_Actions';
import { thisExpression } from '@babel/types';
import RootContext from '../../CanvasWrapper/CanvasContexts.js';

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
            };
        }

        componentDidMount() {
            // ***********************************************************
            // ****** Uncomment once config module is in place ******
            // let manifest_object = configModule.GET_MANIFEST_OBJECT();
            // let project_urn = manifest_object['PROJECT_URN'];
            // this.setState({ project_urn });
            // ***********************************************************
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
                    this.hanndleSplitSlate(message)
                    break;
                case 'hideCommentsPanel':
                    this.props.toggleCommentsPanel(false);
                    break;
                case 'toggleCommentsPanel':
                        this.props.toggleCommentsPanel(true);
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
                    {
                        /**
                         * TO BE IMPLEMENTED
                         *  */
                    }
                    break;
                case 'ISDeleted':
                    {
                        /**
                         * TO BE IMPLEMENTED
                         *  */
                    }
                    break;
                case 'refreshElementWithTable':
                    {
                        this.showCanvasBlocker(true);
                        showHeaderBlocker();
                        this.props.fetchSlateData(config.slateManifestURN);
                    }
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
                case 'TocLoader':
                    {
                        /**
                         * TO BE IMPLEMENTED
                         *  */
                    }
                    break;
                case 'updateSlateTitleByID':
                    this.updateSlateTitleByID(message);
                    break;
                case 'projectDetails' :
                    config.userId = message['x-prsn-user-id'].toLowerCase()
                    this.props.fetchAuthUser()
                    config.ssoToken = message.ssoToken;
                    config.projectUrn = message.id;
                    config.citeUrn = message.citeUrn;
                    config.projectEntityUrn = message.entityUrn;
                    config.alfrescoMetaData = message.alfresco;
                    config.book_title =  message.name;                  
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
                    message.label.en= message.label.en.replace(/<math.*?data-src=\'(.*?)\'.*?<\/math>/g, "<img src='$1'></img>")}
                    this.props.currentSlateLO(message);
                    this.props.isLOExist(message);
                break;
                case 'loEditResponse':
                    sendDataToIframe({ 'type': "HideLoader", 'message': { status: false } })
                    break;
                case 'getLOlistResponse':
                    this.props.currentSlateLO(message);
                break;
                case 'refreshSlate' :    
                    this.handleRefreshSlate();
                    break;
                case 'slatePreview':
                    this.props.publishContent('slatePreview');
                    break;
                case 'projectPreview':
                    this.props.publishContent('projectPreview');
                    break;
                case 'logout':
                    this.props.logout();
                    break;
            }
        }

        handleLOData=(message) =>{
            if (message.statusForSave) {
                message.loObj?this.props.currentSlateLOMath(message.loObj.label.en):this.props.currentSlateLOMath("");
                if(message.loObj && message.loObj.label && message.loObj.label.en){
                message.loObj.label.en = message.loObj.label.en.replace(/<math.*?data-src=\'(.*?)\'.*?<\/math>/g, "<img src='$1'></img>");
                }
                message.loObj?this.props.currentSlateLO(message.loObj):this.props.currentSlateLO();
                this.props.isLOExist(message);
            }
        }
        handleLOStore=()=> {
            
        }
        handlePermissioning = (message) => {
            if (message && message.permissions) {
                this.props.handleUserRole(message.permissions)
            }
        }

        handleRefreshSlate = () => {
            let id = config.slateManifestURN; 
            sendDataToIframe({ 'type': 'slateRefreshStatus', 'message': {slateRefreshStatus :'Refreshing'} });
            this.props.handleSlateRefresh(id)
        }

        sendDataToIframe = (messageObj) => {
            sendDataToIframe(messageObj);
        }
        hanndleSplitSlate = (newSlateObj) => {
            this.props.handleSplitSlate(newSlateObj)
        }
        sendingPermissions = () => {
            /**
             * TO BE VERIFIED
             *  */
            let permissionObj = this.props.currentProject || null;
            if (permissionObj === null) {
                permissionObj = {};
                permissionObj.permissions = [
                    'toc_edit_title', 'toc_delete_entry', 'toc_rearrange_entry', 'toc_add_pages'
                ];
                permissionObj.roleId = 'admin';
            }


            sendDataToIframe({
                'type': 'Permissions',
                'message': { 'permissions': permissionObj.permissions, 'roleName': permissionObj.roleId }
            });
        }

        setCurrentSlate = (message) => {
            let currentSlateObject = {};
            if (message['category'] === 'titleChange') {
                currentSlateObject = {
                    title: message.title,
                }
                this.props.setUpdatedSlateTitle(currentSlateObject)
            }
            if (message && message.node) {
                this.props.releaseSlateLock(config.projectUrn, config.slateManifestURN)
                sendDataToIframe({ 'type': 'hideWrapperLoader', 'message': { status: true } })
                sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                // const { entityUrn, containerUrn } = message.node;
                currentSlateObject = {
                    title: message.node.unformattedTitle ? message.node.unformattedTitle.en : ''
                }
                this.props.setUpdatedSlateTitle(currentSlateObject)
                config.slateEntityURN = message.node.entityUrn;
                config.slateManifestURN = message.node.containerUrn;
                config.disablePrev = message.disablePrev;
                config.disableNext = message.disableNext;
                config.slateType = message.node.nodeLabel;
                config.parentContainerUrn = message.node.ParentContainerUrn;
                config.parentEntityUrn=message.node.ParentEntityUrn;
                this.props.getSlateLockStatus(config.projectUrn, config.slateManifestURN)
                let slateData = {
                    currentProjectId: config.projectUrn,
                    slateEntityUrn: config.slateEntityURN
                }
                this.props.fetchAudioNarrationForContainer(slateData)  
                this.props.fetchSlateData(message.node.containerUrn);
                this.props.setSlateType(config.slateType);
                this.props.glossaaryFootnotePopup(false);
                let apiKeys = [config.ASSET_POPOVER_ENDPOINT,config.STRUCTURE_APIKEY];
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
            /**
             * TO BE IMPLEMENTED
             *  */
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

        checkSlateLockAndDeleteSlate = (message, type) => {
            let that = this;
            // let projectUrn = message.changedValue.projectUrn;
            // let userName = 'c5test01'//this.getCookie("USER_NAME");
            // let deleteSlateId = message.changedValue.containerUrn;
            /**
             * Delete element details for logging
             */

            that.deleteTocItem(message);


            // getSlateLockStatusWithCallback(projectUrn, deleteSlateId, (response) => {          
            //     if (response == "error"){
            //         if(type==='withPendingTrack') {
            //             // that.deleteTocItemWithPendingTrack(message);
            //         }
            //         else {
            //             that.deleteTocItem(message);
            //         }
            //         return false;
            //     }
            //     try{
            //         let status = {
            //             slateLocked : response.isLocked,
            //             userInfo : response.userId    
            //         }
            //         if(userName.toLowerCase() === status.userInfo.toLowerCase()) {
            //             status.slateLocked = false;
            //         }

            //         if(status.slateLocked){
            //             that.slateLockAlert(status.userInfo);
            //         }

            //         else{
            //             if(type==='withPendingTrack') {
            //                 // that.deleteTocItemWithPendingTrack(message);
            //             }
            //             else {
            //                 that.deleteTocItem(message);
            //             }
            //         }
            //     }
            //     catch(err){
            //         if(type==='withPendingTrack') {
            //             // that.deleteTocItemWithPendingTrack(message);
            //         }
            //         else {
            //             that.deleteTocItem(message);
            //         }
            //     }   
            //});
        }

        onDeleteTocItem = (message, type) => {
            this.checkSlateLockAndDeleteSlate(message, type)
        }

        onSingleContainerDelete = () => {
            /**
             * TO BE IMPLEMENTED
             *  */
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


        render() {
            return (
                <React.Fragment>
                    <WrappedComponent {...this.props} showBlocker={this.state.showBlocker} showCanvasBlocker={this.showCanvasBlocker} toggleTocDelete={this.state.toggleTocDelete} tocDeleteMessage={this.state.tocDeleteMessage} modifyState={this.modifyState} />
                </React.Fragment>
            )
        }

    }

    return CommunicationWrapper;
}

export default WithWrapperCommunication;