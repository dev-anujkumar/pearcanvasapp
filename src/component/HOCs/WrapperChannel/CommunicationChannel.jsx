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

import PopUp from '../../PopUp';
import { getSlateLockStatus } from '../../CanvasWrapper/SlateLock_Actions';

function WithWrapperCommunication(WrappedComponent) {
    class CommunicationWrapper extends Component {
        constructor(props) {
            super(props);
            this.state = {
                project_urn: "",
                isTableLaunched: false,
                showBlocker : false
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
                    {
                        /**             
                         * TO BE IMPLEMENTED             
                         * */
                    }
                    break;
                case 'hideCommentsPanel':
                    this.props.toggleCommentsPanel(false);
                    break;
                case 'enablePrev':
                    {
                        /**
                         * TO BE IMPLEMENTED
                         *  */
                    }
                    break;
                case 'enableNext':
                    {
                        /**
                         * TO BE IMPLEMENTED
                         *  */
                    }
                    break;
                case 'disablePrev':
                    {
                        /**
                         * TO BE IMPLEMENTED
                         *  */
                    }
                    break;
                case 'disableNext':
                    {
                        /**
                         * TO BE IMPLEMENTED
                         *  */
                    }
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
                        /**
                         * TO BE IMPLEMENTED
                         *  */
                    }
                case 'canvasBlocker':
                    {
                        if(message.status) {
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
                     config.projectUrn = message.id;
                     config.projectEntityUrn = message.entityUrn;
                    break;
                case 'permissionsDetails' :                    
                    this.handlePermissioning(message);
                    break;
            }
        }

        handlePermissioning = (message) => {
            if(message && message.permissions) {                  
                config.PERMISSIONS = message.permissions;              
            }
        }

        sendDataToIframe = (messageObj) => {
            sendDataToIframe(messageObj);
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
            console.log("setCurrentSlate >> ", message)
            if (message && message.node) {
                this.props.releaseSlateLock(config.projectUrn, config.slateManifestURN)
                sendDataToIframe({'type': 'hideWrapperLoader','message': { status: true }})
                sendDataToIframe({'type': "ShowLoader",'message': { status: true }});
               // const { entityUrn, containerUrn } = message.node;
                config.slateEntityURN = message.node.entityUrn;
                config.slateManifestURN = message.node.containerUrn;
                config.disablePrev = message.disablePrev;
                config.disableNext = message.disableNext;
                config.slateType = message.node.nodeLabel;
                this.props.getSlateLockStatus(config.projectUrn, config.slateManifestURN)
                this.props.fetchSlateData(message.node.containerUrn);
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

        deleteAccepted = () => {
            that.sendDataToIframe({ 'type': 'deleteAccepted', 'message': message })
        }

        deleteRejected = () => {
            that.sendDataToIframe({ 'type': 'deleteRejected', 'message': {} });
            disableHeader(false);
        }

        deleteTocItem = (message) => {
            let that = this;
            hideBlocker();
            showTocBlocker();
            disableHeader(true);

            // vex.dialog.open({
            //     message: 'Warning!',
            //     input: [
            //         '<div class="delete-element-text">Are you sure you want to delete, this action cannot be undone?</div>',
            //     ].join(''),
            //     buttons: [
            //         $.extend({}, vex.dialog.buttons.YES, { text: 'Yes' }),
            //         $.extend({}, vex.dialog.buttons.NO, { text: 'Cancel' })
            //     ],
            //     callback: function (data) {
            //         if (!data) {
            //             that.sendDataToIframe({ 'type': 'deleteRejected', 'message': {} })
            //             disableHeader(false);
            //         } else {
            //             that.sendDataToIframe({ 'type': 'deleteAccepted', 'message': message })
            //         }
            //     }
            // });
            
            <PopUp 
                togglePopup={this.deleteRejected}
                active={true}
                saveContent={this.deleteAccepted}
                saveButtonText='Yes'
                dialogText='Are you sure you want to delete this slate/container with pending changes?'
                tocDelete = {true}
                tocDeleteClass = 'tocDeleteClass'
                />
        }

        checkSlateLockAndDeleteSlate = (message, type) => {
            let that=this;
            let projectUrn = message.changedValue.projectUrn;
            let userName = 'c5test01'//this.getCookie("USER_NAME");
            let deleteSlateId = message.changedValue.containerUrn;
            /**
             * Delete element details for logging
             */

            that.deleteTocItem(message);

    
            // getSlateLockStatus(projectUrn, deleteSlateId, (response) => {          
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
            // });
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

        showCanvasBlocker = (bFlag) =>{
            this.setState({
                showBlocker: bFlag
            });
        }

        render() {
            return (
                <React.Fragment>
                    <WrappedComponent {...this.props} showBlocker = {this.state.showBlocker} showCanvasBlocker = {this.showCanvasBlocker} />
                </React.Fragment>
            )
        }

    }

    return CommunicationWrapper;
}

export default WithWrapperCommunication;