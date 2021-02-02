/**
 * Module - TinyMceUtility
 * Description - This file contains utility functions for the TinyMceEditor
 */
import axios from 'axios';
import tinymce from 'tinymce/tinymce';
import config from '../config/config';
import { c2MediaModule } from './c2_media_module';
/**
  * @description data after selecting an asset from alfresco c2 module
  * @param {*} data selected asset data
  * @param {*} editor tinymce editor
  */
const dataFromAlfresco = (data, editor, imageArgs) => {
    let imageData = data;
    let epsURL = imageData['EpsUrl'] ? imageData['EpsUrl'] : "";
    //let width = imageData['width'] ? imageData['width'] : "";
    //let height = imageData['height'] ? imageData['height'] : "";
    let altText = imageData['alt-text'] ? imageData['alt-text'] : "";
    let uniqID = imageData['uniqueID'] ? imageData['uniqueID'] : "";
    let longDesc = imageData['longDescription'] ? imageData['longDescription'] : "";
    const imageID = `imageAssetContent:${uniqID}:${Math.floor(1000 + Math.random() * 9000)}`
    const imgData = `<img src=${epsURL} data-id="${imageID}" class="imageAssetContent" width="112" height="150" imageid="urn:pearson:alfresco:${uniqID}" alt="${altText}" longdescription="${longDesc}"/>`;
    if (imageArgs) {
        let getImgNode = document.querySelector(`img[data-id="${imageArgs.id}"]`);
        getImgNode.outerHTML = imgData;
    }
    else {
        editor.selection.setContent(imgData);
    }
    const listLiText = document.querySelector('#' + tinymce.activeEditor.id + ' li') ? document.querySelector('#' + tinymce.activeEditor.id + ' li').innerText : "";

    if (!listLiText.trim()) {
        const imageContent = document.querySelector('#' + tinymce.activeEditor.id + ' img.imageAssetContent');
        tinyMCE.$('#' + tinymce.activeEditor.id + ' li').find('br').remove();
        document.querySelector('#' + tinymce.activeEditor.id + ' li').append(imageContent);
        imageContent.innerHTML = imgData;
    }
    editor.targetElm.classList.remove('place-holder');
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
export const handleC2MediaClick = (permissions, editor, imageArgs) => {
    const currentAsset = null;
    let alfrescoPath = config.alfrescoMetaData;
    var data_1 = false;
    if (alfrescoPath?.alfresco && Object.keys(alfrescoPath.alfresco).length > 0) {
        /* if alfresco location is available */
        if (alfrescoPath.alfresco.nodeRef && permissions && permissions.includes('add_multimedia_via_alfresco')) {
            data_1 = alfrescoPath.alfresco;
            data_1.currentAsset = currentAsset;
            /* data according to new project api */
            data_1['repositoryName'] = data_1['repoName'] ? data_1['repoName'] : data_1['repositoryName']
            data_1['repositoryFolder'] = data_1['name'] ? data_1['name'] : data_1['repositoryFolder']
            data_1['repositoryUrl'] = data_1['repoInstance'] ? data_1['repoInstance'] : data_1['repositoryUrl']
            data_1['visibility'] = data_1['siteVisibility'] ? data_1['siteVisibility'] : data_1['visibility']
            /* data according to old core api and c2media */
            data_1['repoName'] = data_1['repositoryName'] ? data_1['repositoryName'] : data_1['repoName']
            data_1['name'] = data_1['repositoryFolder'] ? data_1['repositoryFolder'] : data_1['name']
            data_1['repoInstance'] = data_1['repositoryUrl'] ? data_1['repositoryUrl'] : data_1['repoInstance']
            data_1['siteVisibility'] = data_1['visibility'] ? data_1['visibility'] : data_1['siteVisibility']
            handleC2ExtendedClick(data_1, editor, imageArgs)
        }
    } else {
        if (permissions.includes('alfresco_crud_access')) {
            c2MediaModule.onLaunchAddAnAsset(function (alfrescoData) {
                data_1 = {
                    ...alfrescoData,
                    currentAsset: currentAsset,
                };
                let request = {
                    eTag: alfrescoPath.etag,
                    projectId: alfrescoPath.id,
                    ...alfrescoPath,
                    additionalMetadata: { ...alfrescoData },
                    alfresco: { ...alfrescoData }
                };
                /* preparing data according to Project api */
                request.additionalMetadata['repositoryName'] = data_1['repoName'];
                request.additionalMetadata['repositoryFolder'] = data_1['name'];
                request.additionalMetadata['repositoryUrl'] = data_1['repoInstance'];
                request.additionalMetadata['visibility'] = data_1['siteVisibility'];

                request.alfresco['repositoryName'] = data_1['repoName'];
                request.alfresco['repositoryFolder'] = data_1['name'];
                request.alfresco['repositoryUrl'] = data_1['repoInstance'];
                request.alfresco['visibility'] = data_1['siteVisibility'];

                handleC2ExtendedClick(data_1, editor, imageArgs)
                /* API to set alfresco location on dashboard */
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
    }

}