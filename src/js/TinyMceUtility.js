/**
 * Module - TinyMceUtility
 * Description - This file contains utility functions for the TinyMceEditor
 */
import axios from 'axios';
import tinymce from 'tinymce/tinymce';
import config from '../config/config';
import { sendDataToIframe } from '../constants/utility';
import { c2MediaModule } from './c2_media_module';
import { alfrescoPopup } from '../component/AlfrescoPopup/Alfresco_Action';
/**
  * @description data after selecting an asset from alfresco c2 module
  * @param {*} data selected asset data
  * @param {*} editor tinymce editor
  */
 export const dataFromAlfresco = (data, editor, imageArgs) => {
    let imageData = data;
    let epsURL = imageData.epsUrl? imageData.epsUrl : "";
    //let width = imageData['width'] ? imageData['width'] : "";
    //let height = imageData['height'] ? imageData['height'] : "";
    let altText = imageData.properties["cplg:altText"] ? imageData.properties["cplg:altText"] : '';
    let uniqID = imageData.id ? imageData.id : "";
    let longDesc = imageData.properties['cplg:longDescription'] ? imageData.properties['cplg:longDescription'] : "";
    let figureType = data?.content?.mimeType?.split('/')[0]             
    const imageID = `imageAssetContent:${uniqID}:${Math.floor(1000 + Math.random() * 9000)}`
    const imgData = `<img src=${epsURL} data-id="${imageID}" class="imageAssetContent" width="112" height="150" imageid="urn:pearson:alfresco:${uniqID}" alt="${altText}" longdescription="${longDesc}"/>`;
    const imageTypes = ["image", "table", "mathImage", "authoredtext"];
    if (imageTypes.indexOf(figureType) > -1) {
        if (imageArgs?.id && editor?.targetElm) {
            let getImgNode = editor.targetElm.querySelector(`img[data-id="${imageArgs.id}"]`);
            if (getImgNode) {
                getImgNode.outerHTML = imgData;
                imageArgs.handleBlur(null, true);
            }
        }
        else {
            editor.insertContent(imgData);
            setTimeout(() => editor.targetElm?.classList.remove?.("place-holder"), 100)
        }
    }
    return imgData;
}
/**
 * @description Open C2 module with predefined Alfresco location
 * @param {*} locationData alfresco locationData
 */
const handleC2ExtendedClick = (locationData, editor, imageArgs) => {
    let data_1 = locationData;
    c2MediaModule.productLinkOnsaveCallBack(data_1, (data_2) => {
        c2MediaModule.AddanAssetCallBack(data_2, (data) => {
            dataFromAlfresco(data, editor, imageArgs);
        })
    })
}
/**
 * @description function will be called on image src add and fetch resources from Alfresco
 */
export const handleC2MediaClick = (permissions, editor, element) => {
    // const currentAsset = null;
    // let alfrescoPath = config.alfrescoMetaData;
    // var data_1 = false;
    // if (alfrescoPath?.alfresco && Object.keys(alfrescoPath.alfresco).length > 0) {
    //     /* if alfresco location is available */
    //     if (alfrescoPath.alfresco.nodeRef && permissions && permissions.includes('add_multimedia_via_alfresco')) {
    //         data_1 = alfrescoPath.alfresco;
    //         data_1.currentAsset = currentAsset;
    //         /* data according to new project api */
    //         data_1['repositoryName'] = data_1['repoName'] ? data_1['repoName'] : data_1['repositoryName']
    //         data_1['repositoryFolder'] = data_1['name'] ? data_1['name'] : data_1['repositoryFolder']
    //         data_1['repositoryUrl'] = data_1['repoInstance'] ? data_1['repoInstance'] : data_1['repositoryUrl']
    //         data_1['visibility'] = data_1['siteVisibility'] ? data_1['siteVisibility'] : data_1['visibility']
    //         /* data according to old core api and c2media */
    //         data_1['repoName'] = data_1['repositoryName'] ? data_1['repositoryName'] : data_1['repoName']
    //         data_1['name'] = data_1['repositoryFolder'] ? data_1['repositoryFolder'] : data_1['name']
    //         data_1['repoInstance'] = data_1['repositoryUrl'] ? data_1['repositoryUrl'] : data_1['repoInstance']
    //         data_1['siteVisibility'] = data_1['visibility'] ? data_1['visibility'] : data_1['siteVisibility']
    //         handleC2ExtendedClick(data_1, editor, imageArgs)
    //     }
    // } else {
    //     if (permissions.includes('alfresco_crud_access')) {
    //         c2MediaModule.onLaunchAddAnAsset(function (alfrescoData) {
    //             data_1 = {
    //                 ...alfrescoData,
    //                 currentAsset: currentAsset,
    //             };
    //             let request = {
    //                 eTag: alfrescoPath.etag,
    //                 projectId: alfrescoPath.id,
    //                 ...alfrescoPath,
    //                 additionalMetadata: { ...alfrescoData },
    //                 alfresco: { ...alfrescoData }
    //             };
    //             /* preparing data according to Project api */
    //             request.additionalMetadata['repositoryName'] = data_1['repoName'];
    //             request.additionalMetadata['repositoryFolder'] = data_1['name'];
    //             request.additionalMetadata['repositoryUrl'] = data_1['repoInstance'];
    //             request.additionalMetadata['visibility'] = data_1['siteVisibility'];

    //             request.alfresco['repositoryName'] = data_1['repoName'];
    //             request.alfresco['repositoryFolder'] = data_1['name'];
    //             request.alfresco['repositoryUrl'] = data_1['repoInstance'];
    //             request.alfresco['visibility'] = data_1['siteVisibility'];

    //             handleC2ExtendedClick(data_1, editor, imageArgs)
    //             /* API to set alfresco location on dashboard */
    //             let url = config.PROJECTAPI_ENDPOINT + '/' + request.projectId + '/alfrescodetails';
    //             let SSOToken = request.ssoToken;
    //             return axios.patch(url, request.alfresco,
    //                 {
    //                     headers: {
    //                         'Accept': 'application/json',
    //                         'ApiKey': config.STRUCTURE_APIKEY,
    //                         'Content-Type': 'application/json',
    //                         'PearsonSSOSession': SSOToken,
    //                         'If-Match': request.eTag
    //                     }
    //                 })
    //                 .then(function (response) {
    //                     let tempData = { alfresco: alfrescoData };
    //                     that.setState({
    //                         projectMetadata: tempData
    //                     })
    //                 })
    //                 .catch(function (error) {
    //                     console.log("error", error)
    //                 });
    //         })
    //     }
    // }

    let alfrescoPath = config.alfrescoMetaData;
    if(alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
        if (alfrescoPath?.alfresco?.guid || alfrescoPath?.alfresco?.nodeRef ) {
            if (permissions && permissions.includes('add_multimedia_via_alfresco')) {
                let alfrescoSiteName = alfrescoPath?.alfresco?.name ? alfrescoPath.alfresco.name : alfrescoPath.alfresco.siteId
                let messageObj = { citeName: alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoSiteName  , 
                    citeNodeRef: alfrescoPath?.alfresco?.guid ? alfrescoPath.alfresco.guid : alfrescoPath.alfresco.nodeRef , 
                    elementId: element.id}
                sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
            } else {
                // props.accessDenied(true)
            }
        }
    } else {
        if (permissions.includes('alfresco_crud_access')) {
            handleSiteOptionsDropdown(alfrescoPath, element.id)
        } else {
            // props.accessDenied(true)
        }
    }
}

function handleSiteOptionsDropdown (alfrescoPath, id) {
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
           let payloadObj = {
            launchAlfrescoPopup: true, 
            alfrescoPath: alfrescoPath, 
            alfrescoListOption: response.data.list.entries,
            elementId: id
        }
            alfrescoPopup(payloadObj)
        })
        .catch(function (error) {
            console.log("Error IN SITE API", error)
        });
}