import React, { Component } from 'react';
import { accessDenied } from '../SlateWrapper/SlateWrapper_Actions'
import { connect } from 'react-redux';
import { showTocBlocker, hideTocBlocker, disableHeader} from '../../js/toggleLoader'
import { c2MediaModule } from '../../js/c2_media_module';
import { SET_FIGURE_GLOSSARY, ADD_FIGURE_GLOSSARY_POPUP } from '../../constants/Action_Constants.js'
import config from '../../config/config';
import { hasReviewerRole } from '../../constants/utility.js'
import store from '../../appstore/store.js';
import axios from 'axios';
import {showWrongImagePopup} from '../GlossaryFootnotePopup/GlossaryFootnote_Actions.js'

/**
* @description - AddImageGlossary is a class based component. It is defined simply for adding image in glossary.
*/
class AddImageGlossary extends Component {

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
        this.props.closeFigurePopup();
        this.handleC2MediaClick(this)
    }

     /**
    * @description - dataFromAlfresco function responsible for bringing data from the alfresco.
    */
    dataFromAlfresco = (data) => {
        hideTocBlocker();
        disableHeader(false);
        let imageData = data;
        let epsURL = imageData['EpsUrl'] ? imageData['EpsUrl'] : "";              //commented lines will be used to update the element data
        let figureType = imageData['assetType'] ? imageData['assetType'] : "";
        let width = imageData['width'] ? imageData['width'] : "";
        let height = imageData['height'] ? imageData['height'] : "";

        if (figureType === "image") {

            let uniqID = imageData['uniqueID'] ? imageData['uniqueID'] : "";
            let altText = imageData['alt-text'] ? imageData['alt-text'] : "";
            let longDesc = imageData['longDescription'] ? imageData['longDescription'] : "";

            let scaleMarkerData = {};
            Object.assign(scaleMarkerData, (data && data.scalemarker && data.scalemarker.properties) ? { schema: 'http://schemas.pearson.com/wip-authoring/image/1#/definitions/image' } : null,
                (data && data.scalemarker && data.scalemarker.properties) ? { "imageid": data.scalemarker.properties["d.cmis:versionSeriesId"].value || null } : null,
                (data && data.scalemarker && data.scalemarker.properties) ? { "alttext": data.scalemarker.properties["t.cmis:name"].value || "The alttext for the scale image" } : null,
                (data && data.scalemarker && data.scalemarker.EpsUrl) ? { "path": data.scalemarker.EpsUrl || null } : null,
                (data && data.scalemarker && data.scalemarker.properties) ? { "height": data.scalemarker.properties["e.exif:pixelXDimension"].value || null } : null,
                (data && data.scalemarker && data.scalemarker.properties && data.scalemarker.properties["e.exif:pixelYDimension"]) ? { "width": data.scalemarker.properties["e.exif:pixelYDimension"].value || null } : null,
            );

            let setFigureData = {
                path: epsURL,
                height: height,
                width: width,
                schema: "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                imageid: `urn:pearson:alfresco:${uniqID}`,
                alttext: altText,
                longdescription: longDesc,
                title: data.displayName || data.displayTitle
            }
            
            store.dispatch({
                type: SET_FIGURE_GLOSSARY,
                payload:setFigureData 
            })
            store.dispatch({
                type: ADD_FIGURE_GLOSSARY_POPUP,
                payload:true
            })
            hideTocBlocker();
        } 
        else if(figureType !== "image") {
            this.props.showWrongImagePopup(true)
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
        permissions : state.appStore.permissions
    }
}

const mapActionToProps = {
    accessDenied,
    showWrongImagePopup
}

export default connect(mapStateToProps, mapActionToProps)(AddImageGlossary);