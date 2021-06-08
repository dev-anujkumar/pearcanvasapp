import React from 'react';
import { addAudioNarrationForContainer, showWrongAudioPopup } from './AudioNarration_Actions'
import { accessDenied } from '../SlateWrapper/SlateWrapper_Actions'
import { connect } from 'react-redux';
import { showTocBlocker, hideTocBlocker, disableHeader} from '../../js/toggleLoader'
import { c2MediaModule } from '../../js/c2_media_module';
import config from '../../config/config';
import { hasReviewerRole, sendDataToIframe } from '../../constants/utility.js'
import { alfrescoPopup } from '../AlfrescoPopup/Alfresco_Action'
import { handleAlfrescoSiteUrl, getAlfrescositeResponse } from '../ElementFigure/AlfrescoSiteUrl_helper.js'
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

     /**
    * @description - dataFromAlfresco function responsible for bringing data from the alfresco.
    */
    // dataFromAlfresco = (alfrescoAssetData) => {
    //     hideTocBlocker();
    //     disableHeader(false);
    //     let data = {
    //         EpsUrl: "https://cite-media-stg.pearson.com/legacy_paths/6b641668-1752-47af-a42c-745233892fd4/Everest.jpg",
    //         figureType: alfrescoAssetData?.content?.mimeType?.split('/')[0],  
    //         smartLinkURl: alfrescoAssetData.epsUrl,
    //         mimetype: null,
    //         uniqueID: alfrescoAssetData.id,
    //         text: alfrescoAssetData.text
    //        // text: `{"results":[{"properties":{"s.avs:url":{"id":"avs:url","localName":"url","displayName":"Url","queryName":"s.avs:url","type":"string","value":["https:\/\/www.google.com"]},"s.avs:jsonString":{"id":"avs:jsonString","localName":"jsonString","displayName":"JSON String","queryName":"s.avs:jsonString","type":"string","value":["{\n\"imageReferenceURL\":\"\",\n\"imageAltText\":\"\",\n\"captionText\":\"\",\n\"copyrightCreditText\":\"\",\n\"englishCC\":\"\",\n\"spanishCC\":\"\",\n\"frenchCC\":\"\",\n\"audioDescription\":\"\",\n\"nonsppurlEnabled\":\"No\",\n\"englishCCEnabled\":\"Yes\",\n\"frenchCCEnabled\":\"Yes\",\n\"spanishCCEnabled\":\"No\",\n\"audioDescEnabled\":\"No\"\n}"]}}}],"hasMoreItems":false,"numItems":1}`
    //     }
    //     console.log("Object: ",data);
    //     let imageData = data;
    //     let figureType = imageData['assetType'] ? imageData['assetType'] : "";
    //     let smartLinkType = data && data.desc && data.desc.smartLinkType
    //     let smartLinkAssetType = (typeof (data.desc) == "string") ? data.desc.includes('smartLinkType') ? JSON.parse(data.desc).smartLinkType : "" : "";
        
    //     if (figureType === "audio" || smartLinkType === "Audio" || smartLinkAssetType == "Audio") {
    //             let audioData = {
    //                 "narrativeAudioUrn": data.uniqueID || "",
    //                 "location": data.smartLinkURl,
    //                 "title": {
    //                     "en": data.displayName || data.displayTitle
    //                 },
    //                 "format": data.mimetype
    //             }
    //             this.props.addAudioNarrationForContainer(audioData,this.props.isGlossary);
    //             hideTocBlocker();
    //             return false;

    //     }
    //     else if (figureType != "audio" || smartLinkType != "Audio") {
    //         this.props.showWrongAudioPopup(true)
    //         return false;
    //     }
    // }
    // /**
    //  * @description Open C2 module with predefined Alfresco location
    //  * @param {*} locationData alfresco locationData
    //  */
    // handleC2ExtendedClick = (locationData) => {
    //     let data_1 = locationData;
    //     let that = this;
    //     !hasReviewerRole() && c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
    //         c2MediaModule.AddanAssetCallBack(data_2, function (data) {
    //             that.dataFromAlfresco(data);
    //         })
    //     })

    // }
    
    handleSiteOptionsDropdown = (alfrescoPath, id) => {
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
                elementId: id
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
                    console.log("Props: ",this.props);   
                    let messageObj = { citeName: alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoPath.alfresco.name  , 
                        citeNodeRef: alfrescoPath?.alfresco?.guid ? alfrescoPath.alfresco.guid : alfrescoPath.alfresco.nodeRef , 
                        elementId: this.props.elementId,
                        calledFrom: 'NarrativeAudio', calledFromGlossaryFootnote: this.props.isGlossary }
                        sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
                        // data_1 = alfrescoPath.alfresco;
                        // /*
                        //     data according to new project api 
                        // */
                        // data_1['repositoryName'] = data_1['repoName'] ? data_1['repoName'] : data_1['repositoryName']
                        // data_1['repositoryFolder'] = data_1['name'] ? data_1['name'] : data_1['repositoryFolder']
                        // data_1['repositoryUrl'] = data_1['repoInstance'] ? data_1['repoInstance'] : data_1['repositoryUrl']
                        // data_1['visibility'] = data_1['siteVisibility'] ? data_1['siteVisibility'] : data_1['visibility']

                        // /*
                        //     data according to old core api and c2media
                        // */
                        // data_1['repoName'] = data_1['repositoryName'] ? data_1['repositoryName'] : data_1['repoName']
                        // data_1['name'] = data_1['repositoryFolder'] ? data_1['repositoryFolder'] : data_1['name']
                        // data_1['repoInstance'] = data_1['repositoryUrl'] ? data_1['repositoryUrl'] : data_1['repoInstance']
                        // data_1['siteVisibility'] = data_1['visibility'] ? data_1['visibility'] : data_1['siteVisibility']

                        // this.handleC2ExtendedClick(data_1)
                } else {
                    this.props.accessDenied(true)
                }
            }
        } else {
            if (this.props.permissions.includes('alfresco_crud_access')) {
                this.handleSiteOptionsDropdown(alfrescoPath, this.props.elementId)
                // c2MediaModule.onLaunchAddAnAsset(function (alfrescoData) {
                //     data_1 = { ...alfrescoData };
                //     let request = {
                //         eTag: alfrescoPath.etag,
                //         projectId: alfrescoPath.id,
                //         ...alfrescoPath,
                //         additionalMetadata: { ...alfrescoData },
                //         alfresco: { ...alfrescoData }
                //     };

                //     /*
                //         preparing data according to Project api
                //     */

                //     request.additionalMetadata['repositoryName'] = data_1['repoName'];
                //     request.additionalMetadata['repositoryFolder'] = data_1['name'];
                //     request.additionalMetadata['repositoryUrl'] = data_1['repoInstance'];
                //     request.additionalMetadata['visibility'] = data_1['siteVisibility'];

                //     request.alfresco['repositoryName'] = data_1['repoName'];
                //     request.alfresco['repositoryFolder'] = data_1['name'];
                //     request.alfresco['repositoryUrl'] = data_1['repoInstance'];
                //     request.alfresco['visibility'] = data_1['siteVisibility'];

                //     that.handleC2ExtendedClick(data_1)
                //     /*
                //         API to set alfresco location on dashboard
                //     */
                //     let url = config.PROJECTAPI_ENDPOINT + '/' + request.projectId + '/alfrescodetails';
                //     let SSOToken = request.ssoToken;
                //     return axios.patch(url, request.alfresco,
                //         {
                //             headers: {
                //                 'Accept': 'application/json',
                //                 'ApiKey': config.STRUCTURE_APIKEY,
                //                 'Content-Type': 'application/json',
                //                 'PearsonSSOSession': SSOToken,
                //                 'If-Match': request.eTag
                //             }
                //         })
                //         .then(function (response) {
                //             let tempData = { alfresco: alfrescoData };
                //             that.setState({
                //                 projectMetadata: tempData
                //             })
                //         })
                //         .catch(function (error) {
                //             console.log("error", error)
                //         });
                // })
            } else {
                this.props.accessDenied(true)
            }
        }
    }

    // shouldComponentUpdate() {
    //     return true;
    // }

    openConfirmationBox = (e) => {
        let that = this
        showTocBlocker();
        that.processConfirmation();
    }

    // componentDidMount() {
    //     getAlfrescositeResponse(this.props.elementId, (response) => {
    //         this.setState({
    //             alfrescoSite: response.repositoryFolder,
    //             alfrescoSiteData:{...response}
    //         })
    //     })
    //     console.log(this.state)
    // }

    // componentDidUpdate(prevProps) {
    //     console.log("PreProps: ",prevProps)
    //     console.log("Props: ",this.props)
    //     const { elementId, alfrescoElementId, alfrescoAssetData } = this.props
    //     this.dataFromAlfresco(alfrescoAssetData)
    // }

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
        // addAudio: state.audioReducer.addAudio,
        // openAudio: state.audioReducer.openAudio,
        // openRemovePopUp: state.audioReducer.openRemovePopUp,
        permissions : state.appStore.permissions,
    }
}

// const mapActionToProps = {
//     addAudioNarrationForContainer,
//     showWrongAudioPopup,
//     accessDenied
// }

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