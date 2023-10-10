import React from 'react';
import { accessDenied } from '../SlateWrapper/SlateWrapper_Actions'
import { connect } from 'react-redux';
import { showTocBlocker} from '../../js/toggleLoader'
import config from '../../config/config';
import { hasReviewerRole, sendDataToIframe } from '../../constants/utility.js'
import { alfrescoPopup, saveSelectedAlfrescoElement } from '../AlfrescoPopup/Alfresco_Action'
import axios from 'axios';

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
        let url = `${config.ALFRESCO_EDIT_METADATA}api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000`;
        let SSOToken = config.ssoToken;
        return axios.get(url,
            {
                headers: {
                    'Accept': 'application/json',
                    'ApiKey': config.CMDS_APIKEY,
                    'Content-Type': 'application/json',
                    'myCloudProxySession': config.myCloudProxySession
                }
            })
            .then(function (response) {
               let payloadObj = {launchAlfrescoPopup: true, 
                alfrescoPath: alfrescoPath, 
                alfrescoListOption: response.data.list.entries,
                id,
                isGlossary,
                currentAsset
            }
                that.props.alfrescoPopup(payloadObj);
            })
            .catch(function (error) {
                console.log("Error IN SITE API", error)
            });
    }
    /**
     * @description function will be called on image src add and fetch resources from Alfresco
     */
    handleC2MediaClick = (e) => {
        if(hasReviewerRole()){
            return true
        }
        let that = this;
        let alfrescoPath = config.alfrescoMetaData;
        if (alfrescoPath && this.state.projectMetadata) {
            alfrescoPath.alfresco = this.state.projectMetadata.alfresco;
        }
        if(alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
            if (alfrescoPath?.alfresco?.guid || alfrescoPath?.alfresco?.nodeRef ) {          //if alfresco location is available
                if(this.props.permissions && this.props.permissions.includes('add_multimedia_via_alfresco')) {
                    const alfrescoSiteName = alfrescoPath?.alfresco?.name ? alfrescoPath.alfresco.name : alfrescoPath.alfresco.repositoryFolder
                    const alfrescoSite = alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoSiteName
                    const citeName = alfrescoSite?.split('/')?.[0] || alfrescoSite
                    const citeNodeRef = alfrescoPath?.alfresco?.guid ? alfrescoPath.alfresco.guid : alfrescoPath.alfresco.nodeRef
                    let messageObj = {appName:'cypress', citeName:  citeName, 
                        citeNodeRef: citeNodeRef,
                        elementId: this.props.elementId,
                        calledFrom: 'NarrativeAudio', calledFromGlossaryFootnote: this.props.isGlossary,
                        currentAsset: { type: "audio" }
                    }

                        sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
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
            }
        } else {
            if (this.props.permissions.includes('alfresco_crud_access')) {
                let currentAsset = { type: "audio" }
                this.handleSiteOptionsDropdown(alfrescoPath, this.props.elementId, this.props.isGlossary, currentAsset);
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