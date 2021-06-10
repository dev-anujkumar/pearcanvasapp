import React from 'react';
import { accessDenied } from '../SlateWrapper/SlateWrapper_Actions'
import { connect } from 'react-redux';
import { showTocBlocker} from '../../js/toggleLoader'
import config from '../../config/config';
import { hasReviewerRole, sendDataToIframe } from '../../constants/utility.js'
import { alfrescoPopup } from '../AlfrescoPopup/Alfresco_Action'
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
    
    handleSiteOptionsDropdown = (alfrescoPath, id, isGlossary) => {
        let that = this
        let url = 'https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000';
        let SSOToken = config.ssoToken;
        return axios.get(url,
            {
                headers: {
                    'Accept': 'application/json',
                    'ApiKey': config.CMDS_APIKEY,
                    'Content-Type': 'application/json',
                    'PearsonSSOSession': SSOToken
                }
            })
            .then(function (response) {
               let payloadObj = {launchAlfrescoPopup: true, 
                alfrescoPath: alfrescoPath, 
                alfrescoListOption: response.data.list.entries,
                id,
                isGlossary
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
                    let messageObj = { citeName: alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoSiteName  , 
                        citeNodeRef: alfrescoPath?.alfresco?.guid ? alfrescoPath.alfresco.guid : alfrescoPath.alfresco.nodeRef , 
                        elementId: this.props.elementId,
                        calledFrom: 'NarrativeAudio', calledFromGlossaryFootnote: this.props.isGlossary }
                        sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
                } else {
                    this.props.accessDenied(true)
                }
            }
        } else {
            if (this.props.permissions.includes('alfresco_crud_access')) {
                this.handleSiteOptionsDropdown(alfrescoPath, this.props.elementId, this.props.isGlossary)
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
    }
}

export default connect(mapStateToProps,mapActionToProps)(AddAudioBook);