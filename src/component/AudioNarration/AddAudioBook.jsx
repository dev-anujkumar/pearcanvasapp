import React from 'react';
import { addAudioNarrationForContainer , showWrongAudioPopup } from './AudioNarration_Actions'
import { accessDenied } from '../SlateWrapper/SlateWrapper_Actions'
import { connect } from 'react-redux';
import { showTocBlocker, hideTocBlocker, disableHeader} from '../../js/toggleLoader'
import { c2MediaModule } from '../../js/c2_media_module';
import config from '../../config/config';
import { hasReviewerRole } from '../../constants/utility.js'
import axios from 'axios';

let sampleData ={
    uniqueID:'916f295a-6627-49d3-80f6-fda7f6790f20',
    smartLinkURl:"https://mediaplayer.pearsoncmg.com/assets/_pmd.true/audio-myhistorylab-brands_0134567757-brands4_ch9mod2sec3?mimeType=mp3&bitrate=600",
    displayName:'Audio For Accessibility Testing',
    mimetype:null,
    desc:'{"smartLinkType":"Audio"}'|| '',
    assetType:'audio',
    figureType:'audio'
}
/**
* @description - AddAudioBook is a class based component. It is defined simply for adding audio Narration.
*/
class AddAudioBook extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            projectMetadata: false
        }
    }

    /**
    * @description - processConfirmation function responsible for opening the alfresco.
    */
    processConfirmation = () => {
        this.props.closeAddAudioBook();
        this.handleC2MediaClick(this)
    }

     /**
    * @description - dataFromAlfresco function responsible for bringing data from the alfresco.
    */
    dataFromAlfresco = (data) => {
        hideTocBlocker();
        disableHeader(false);
       // let imageData = data;
        let imageData = sampleData;
        let figureType = imageData['assetType'] ? imageData['assetType'] : "";
        let smartLinkType = data && data.desc && data.desc.smartLinkType
        let smartLinkAssetType = (typeof (data.desc) == "string") ? data.desc.includes('smartLinkType') ? JSON.parse(data.desc).smartLinkType : "" : "";
        
        if (figureType === "audio" || smartLinkType === "Audio" || smartLinkAssetType == "Audio") {
                let audioData = {
                    "narrativeAudioUrn": data.uniqueID || "",
                    "location": data.smartLinkURl,
                    "title": {
                        "en": data.displayName || data.displayTitle
                    },
                    "format": data.mimetype
                }
                this.props.addAudioNarrationForContainer(audioData,this.props.isGlossary);
                hideTocBlocker();
                return false;

        }
        else if (figureType != "audio" || smartLinkType != "Audio") {
            this.props.showWrongAudioPopup(true)
            return false;
        }
    }
    /**
     * @description Open C2 module with predefined Alfresco location
     * @param {*} locationData alfresco locationData
     */
    handleC2ExtendedClick = (locationData) => {
        let data_1 = locationData;
        let that = this;
        !hasReviewerRole() && c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
            c2MediaModule.AddanAssetCallBack(data_2, function (data) {
                that.dataFromAlfresco(data);
            })
        })

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
        var data_1 = false;
        if(alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
        if (alfrescoPath.alfresco.nodeRef) {                     //if alfresco location is available
            if(this.props.permissions && this.props.permissions.includes('add_multimedia_via_alfresco'))    {    
            data_1 = alfrescoPath.alfresco;
            /*
                data according to new project api 
            */
            data_1['repositoryName'] = data_1['repoName'] ? data_1['repoName'] : data_1['repositoryName']
            data_1['repositoryFolder'] = data_1['name'] ? data_1['name'] : data_1['repositoryFolder']
            data_1['repositoryUrl'] = data_1['repoInstance'] ? data_1['repoInstance'] : data_1['repositoryUrl']
            data_1['visibility'] = data_1['siteVisibility'] ? data_1['siteVisibility'] : data_1['visibility']

            /*
                data according to old core api and c2media
            */
            data_1['repoName'] = data_1['repositoryName'] ? data_1['repositoryName'] : data_1['repoName']
            data_1['name'] = data_1['repositoryFolder'] ? data_1['repositoryFolder'] : data_1['name']
            data_1['repoInstance'] = data_1['repositoryUrl'] ? data_1['repositoryUrl'] : data_1['repoInstance']
            data_1['siteVisibility'] = data_1['visibility'] ? data_1['visibility'] : data_1['siteVisibility']

            this.handleC2ExtendedClick(data_1)
            } else {
                    this.props.accessDenied(true)
            }
        }
        } else {
            if (this.props.permissions.includes('alfresco_crud_access')) {
                c2MediaModule.onLaunchAddAnAsset(function (alfrescoData) {
                    data_1 = { ...alfrescoData };
                    let request = {
                        eTag: alfrescoPath.etag,
                        projectId: alfrescoPath.id,
                        ...alfrescoPath,
                        additionalMetadata: { ...alfrescoData },
                        alfresco: { ...alfrescoData }
                    };

                    /*
                        preparing data according to Project api
                    */

                    request.additionalMetadata['repositoryName'] = data_1['repoName'];
                    request.additionalMetadata['repositoryFolder'] = data_1['name'];
                    request.additionalMetadata['repositoryUrl'] = data_1['repoInstance'];
                    request.additionalMetadata['visibility'] = data_1['siteVisibility'];

                    request.alfresco['repositoryName'] = data_1['repoName'];
                    request.alfresco['repositoryFolder'] = data_1['name'];
                    request.alfresco['repositoryUrl'] = data_1['repoInstance'];
                    request.alfresco['visibility'] = data_1['siteVisibility'];

                    that.handleC2ExtendedClick(data_1)
                    /*
                        API to set alfresco location on dashboard
                    */
                    let url = config.PROJECTAPI_ENDPOINT + '/' + request.projectId + '/alfrescodetails';
                    let SSOToken = request.ssoToken;
                    return axios.patch(url, request.alfresco,
                        {
                            headers: {
                                'Accept': 'application/json',
                                'ApiKey': config.STRUCTURE_APIKEY,
                                'Content-Type': 'application/json',
                                'PearsonSSOSession': SSOToken,
                                'If-Match': request.eTag
                            }
                        })
                        .then(function (response) {
                            let tempData = { alfresco: alfrescoData };
                            that.setState({
                                projectMetadata: tempData
                            })
                        })
                        .catch(function (error) {
                            console.log("error", error)
                        });
                })
            }
            else {
                this.props.accessDenied(true)
            }
        }

    }

    shouldComponentUpdate() {
        return false;
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
        addAudio: state.audioReducer.addAudio,
        openAudio: state.audioReducer.openAudio,
        openRemovePopUp: state.audioReducer.openRemovePopUp,
        permissions : state.appStore.permissions
    }
}

const mapActionToProps = {
    addAudioNarrationForContainer,
    showWrongAudioPopup,
    accessDenied
}

export default connect(mapStateToProps, mapActionToProps)(AddAudioBook);