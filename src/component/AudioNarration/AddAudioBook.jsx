import React from 'react';
import { accessDenied } from '../SlateWrapper/SlateWrapper_Actions'
import { connect } from 'react-redux';
import { showTocBlocker} from '../../js/toggleLoader'
import config from '../../config/config';
import { hasReviewerRole, sendDataToIframe } from '../../constants/utility.js'
import { alfrescoPopup, saveSelectedAlfrescoElement } from '../AlfrescoPopup/Alfresco_Action'
import axios from 'axios';
import { LAUNCH_CAT_TOOL, LAUNCH_SITE_PICKER } from '../../constants/IFrameMessageTypes.js';

/**
* @description - AddAudioBook is a class based component. It is defined simply for adding audio Narration.
*/
class AddAudioBook extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            assetData: null,
            projectMetadata: false,
        }
    }

    /**
    * @description - processConfirmation function responsible for opening the alfresco.
    */
    processConfirmation = () => {
        this.props.closeAddAudioBook();
        this.handleC2MediaClick(this)
    }

    handleSiteOptionsDropdown = (alfrescoPath, id, isGlossary,currentAsset) => {
        let that = this
        let payloadObj = {
            launchAlfrescoPopup: true,
            alfrescoPath: alfrescoPath,
            id,
            isGlossary,
            currentAsset
        }
        that.props.alfrescoPopup(payloadObj);
    }
    /**
     * @description function will be called on image src add and fetch resources from Alfresco
     */
    handleC2MediaClick = (e) => {
        if(hasReviewerRole()){
            return true
        }
        let alfrescoPath = config.alfrescoMetaData;
        if (alfrescoPath && this.state.projectMetadata) {
            alfrescoPath.alfresco = this.state.projectMetadata.alfresco;
        }
        let currentAsset = { type: "audio" }
        if(alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
            if (alfrescoPath?.alfresco?.guid || alfrescoPath?.alfresco?.nodeRef ) {          //if alfresco location is available
                if(this.props.permissions && this.props.permissions.includes('add_multimedia_via_alfresco')) {
                    const alfrescoSiteName = alfrescoPath?.alfresco?.name ? alfrescoPath.alfresco.name : alfrescoPath.alfresco.repositoryFolder
                    const alfrescoSite = alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoSiteName
                    const citeName = alfrescoSite?.split('/')?.[0] || alfrescoSite
                    const citeNodeRef = alfrescoPath?.alfresco?.guid ? alfrescoPath.alfresco.guid : alfrescoPath.alfresco.nodeRef
                    let messageObj = {
                        appName: 'cypress', rootNodeName:  citeName,
                        rootNodeId: citeNodeRef,
                        elementId: this.props.elementId,
                        calledFrom: 'NarrativeAudio', calledFromGlossaryFootnote: this.props.isGlossary,
                        currentAsset: { type: "audio" },
                        defaultCategory: currentAsset?.type
                    }

                    sendDataToIframe({ 'type': LAUNCH_CAT_TOOL, 'message': messageObj })
                        const messageDataToSaveAudioBook = {
                            id: this.props.elementId,
                            calledFrom: 'NarrativeAudio',
                            calledFromGlossaryFootnote: this.props.isGlossary,
                            editor: undefined,
                            citeNodeRef: citeNodeRef
                        }
                        this.props.saveSelectedAlfrescoElement(messageDataToSaveAudioBook);

                } else {
                    this.props.accessDenied(true)
                }
            } else {
                this.handleSiteOptionsDropdown(alfrescoPath, this.props.elementId, this.props.isGlossary, currentAsset);
                sendDataToIframe({ 'type': LAUNCH_SITE_PICKER, 'message': { browse: false } })
            }
        } else {
            if (this.props.permissions.includes('alfresco_crud_access')) {
                let currentAsset = { type: "audio" }
                this.handleSiteOptionsDropdown(alfrescoPath, this.props.elementId, this.props.isGlossary, currentAsset);
                sendDataToIframe({ 'type': LAUNCH_SITE_PICKER, 'message': { browse: false } })
            } else {
                this.props.accessDenied(true)
            }
        }
    }

    openConfirmationBox = (e) => {
        let that = this
        showTocBlocker();
        that.processConfirmation();
    }

    render = () => {
        return (
            <div>
                {this.openConfirmationBox()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        permissions : state.appStore.permissions
    }
}

const mapActionToProps = (dispatch) =>{
    return{
        accessDenied: (payloadObj) => {
            dispatch(accessDenied(payloadObj))
        },
        alfrescoPopup: (payloadObj) => {
            dispatch(alfrescoPopup(payloadObj))
        },
        saveSelectedAlfrescoElement: (payloadObj) => {
            dispatch(saveSelectedAlfrescoElement(payloadObj))
        }
    }
}

export default connect(mapStateToProps,mapActionToProps)(AddAudioBook);
