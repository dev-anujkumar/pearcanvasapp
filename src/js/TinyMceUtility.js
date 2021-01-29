import { c2MediaModule } from './c2_media_module';
import config from '../config/config';

/**
  * @description data after selecting an asset from alfresco c2 module
  * @param {*} data selected asset data
  * @param {*} editor tinymce editor
  */
const dataFromAlfresco = (data, editor,coordinates) => {
    let imageData = data;
    let epsURL = imageData['EpsUrl'] ? imageData['EpsUrl'] : "";
    //let width = imageData['width'] ? imageData['width'] : "";
    //let height = imageData['height'] ? imageData['height'] : "";
    let altText = imageData['alt-text'] ? imageData['alt-text'] : "";
    let uniqID = imageData['uniqueID'] ? imageData['uniqueID'] : "";
    let longDesc = imageData['longDescription'] ? imageData['longDescription'] : "";
    let imgData = `<img src=${epsURL} id="imageAssetContent:${uniqID}" class="imageAssetContent" width="112" height="150" imageid="urn:pearson:alfresco:${uniqID}" alt="${altText}" longdescription="${longDesc}"/>`
    console.log('imgData>>>', imgData)
    if(coordinates){
        let positionElement = document.getElementById(coordinates.id);
        if (positionElement) {
            console.log('positionElement',coordinates.xx, coordinates.yy)
            editor.selection.placeCaretAt(coordinates.xx, coordinates.yy);
            editor.selection.setContent(imgData);
            //editor.selection.setCursorLocation(positionElement, 0);
            positionElement.remove();
            // editor.selection.placeCaretAt(coordinates.xx, coordinates.yy);
        }
    }


    console.log('editor selector',editor.selection.getContent())
    if(coordinates){
        editor.selection.placeCaretAt(coordinates.xx, coordinates.yy);
        editor.selection.setContent('<em>TEST</em>');
    }
    else{
        editor.selection.setContent(imgData);
    }
    //console.log('currentImage3',editor.selection.getBoundingClientRect())
   // editor.selection.setContent('<em>DATA</em>');
//    editor.selection.placeCaretAt(coordinates.xx, coordinates.yy);
    //editor.selection.setContent('<em>TEST</em>');
    const listLiText = document.querySelector('#' + tinymce.activeEditor.id + ' li') ? document.querySelector('#' + tinymce.activeEditor.id + ' li').innerText : "";

    if (!listLiText.trim()) {
        const imageContent = document.querySelector('#' + tinymce.activeEditor.id + ' img.imageAssetContent');
        tinyMCE.$('#' + tinymce.activeEditor.id + ' li').find('br').remove();
        document.querySelector('#' + tinymce.activeEditor.id + ' li').append(imageContent);
        imageContent.innerHTML = imgData;
        tinyMCE.$('#' + tinymce.activeEditor.id)[0].innerHTML = removeBOM(tinyMCE.$('#' + tinymce.activeEditor.id)[0].innerHTML);
    }
    editor.targetElm.classList.remove('place-holder');
    return imgData;
}
/**
 * @description Open C2 module with predefined Alfresco location
 * @param {*} locationData alfresco locationData
 */
const handleC2ExtendedClick = (locationData, editor,coordinates) => {
    let data_1 = locationData;
    c2MediaModule.productLinkOnsaveCallBack(data_1, (data_2) => {
        c2MediaModule.AddanAssetCallBack(data_2, (data) => {
            dataFromAlfresco(data, editor,coordinates);
        })
    })

}
/**
 * @description function will be called on image src add and fetch resources from Alfresco
 */
export const handleC2MediaClick = (permissions, editor,coordinates) => {
    const currentAsset = null;
    let alfrescoPath = config.alfrescoMetaData;
    var data_1 = false;
    if (alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0) {
        if (alfrescoPath.alfresco.nodeRef) {         //if alfresco location is available
            if (permissions && permissions.includes('add_multimedia_via_alfresco')) {
                data_1 = alfrescoPath.alfresco;
                data_1.currentAsset = currentAsset;
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
                handleC2ExtendedClick(data_1, editor,coordinates)
            }

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

                handleC2ExtendedClick(data_1, editor,coordinates)
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
    }

}