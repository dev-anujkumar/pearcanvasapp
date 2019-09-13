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
import { sendDataToIframe } from '../../../constants/utility.js';


function WithWrapperCommunication(WrappedComponent) {
    class CommunicationWrapper extends Component {
        constructor(props) {
            super(props);
            this.state = {
                project_urn: "",
                isTableLaunched: false
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
                        /**
                         * TO BE IMPLEMENTED
                         *  */
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
            if (message && message.node) {
                const { entityUrn, containerUrn } = message.node;
                this.props.fetchSlateData(containerUrn);
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

        checkSlateLockAndDeleteSlate = (message, type) => {
            /**
             * TO BE IMPLEMENTED
             *  */
        }

        onDeleteTocItem = (message, type) => {
            /**
             * TO BE IMPLEMENTED
             *  */
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

        render() {
            return (
                <React.Fragment>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }

    }

    return CommunicationWrapper;
}

export default WithWrapperCommunication;