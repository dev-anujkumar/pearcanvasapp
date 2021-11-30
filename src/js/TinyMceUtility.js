/**
 * Module - TinyMceUtility
 * Description - This file contains utility functions for the TinyMceEditor
 */
import axios from 'axios';
import config from '../config/config';
import { sendDataToIframe } from '../constants/utility';
import { MANIFEST_LIST, MANIFEST_LIST_ITEM, BLOCK_LIST_ELEMENT_EVENT_MAPPING } from '../constants/Element_Constants';
/**
  * @description data after selecting an asset from alfresco c2 module
  * @param {*} data selected asset data
  * @param {*} editor tinymce editor
  */
 export const dataFromAlfresco = (data, editor, imageArgs) => {
    let imageData = data;
    let epsURL = imageData.epsUrl? imageData.epsUrl : "";
    let altText = imageData.properties["cplg:altText"] ? imageData.properties["cplg:altText"] : '';
    let uniqID = imageData.id ? imageData.id : "";
    let longDesc = imageData.properties['cplg:longDescription'] ? imageData.properties['cplg:longDescription'] : "";
    let figureType = data?.content?.mimeType?.split('/')[0]             
    const imageID = `imageAssetContent:${uniqID}:${Math.floor(1000 + Math.random() * 9000)}`
    const imgData = `<img imageid="urn:pearson:alfresco:${uniqID}" src=${epsURL} height="150" width="112"  class="imageAssetContent" data-id="${imageID}"/>`;
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
    // return imgData;
}
/**
 * @description function will be called on image src add and fetch resources from Alfresco
 */
export const handleC2MediaClick = (permissions, editor, element) => {
    let alfrescoPath = config.alfrescoMetaData;
    if(alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
        if (alfrescoPath?.alfresco?.guid || alfrescoPath?.alfresco?.nodeRef ) {
            if (permissions && permissions.includes('add_multimedia_via_alfresco')) {
                let alfrescoSiteName = alfrescoPath?.alfresco?.name ? alfrescoPath.alfresco.name : alfrescoPath.alfresco.siteId
                const alfrescoSite = alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoSiteName
                const citeName = alfrescoSite?.split('/')?.[0] || alfrescoSite
                let messageObj = { citeName: citeName, 
                    citeNodeRef: alfrescoPath?.alfresco?.guid ? alfrescoPath.alfresco.guid : alfrescoPath.alfresco.nodeRef , 
                    elementId: element.id,
                    editor: true}
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
    let url = `${config.ALFRESCO_EDIT_METADATA}/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000`;
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
            id,
            editor: true
        }
            sendDataToIframe({ 'type': 'openInlineAlsfrescoPopup', 'message': payloadObj })
        })
        .catch(function (error) {
            console.log("Error IN SITE API", error)
        });
}

export const checkForDataIdAttribute =(defModel) => {
    let imageAssetContents = defModel.match(/<(img)\s[^>]*imageid=.*?>/g);
    let tempimageAssetContents = defModel.match(/<(img)\s[^>]*imageid=.*?>/g);
    if(imageAssetContents!=null || imageAssetContents!=undefined){
        for(let index = 0; index < imageAssetContents.length; index++) {
            if(!imageAssetContents[index].match(/<(img)\s[^>]*data-id=.*?>/g)){
                const uniqID = imageAssetContents[index].split(' ').find((attribute) => attribute.includes('imageid')).split('alfresco:')[1].replace('"','')
                const imageID = `imageAssetContent:${uniqID}:${Math.floor(1000 + Math.random() * 9000)}`;
                imageAssetContents[index] = imageAssetContents[index].replace('class="imageAssetContent"',`class="imageAssetContent" data-id=${imageID}`)
                defModel = defModel.replace(tempimageAssetContents[index],imageAssetContents[index]);
            }
        }
    }
    return defModel;
}

/**
 * function to get selected block list immediate parent container details 
 * @param {Object} bodymatter 
 * @param {Number} start 
 * @param {Number} end 
 * @param {Array} indexes 
 * @returns {Object}
 */
export const getBLParentContainer = (bodymatter, start, end, indexes) => {
    if (end === 0) return bodymatter;
    if (end && bodymatter && Object.keys(bodymatter).length) {
        if (bodymatter.type === MANIFEST_LIST && bodymatter.listdata && bodymatter.listdata.bodymatter.length) {
            return getBLParentContainer(bodymatter.listdata.bodymatter[Number(indexes[start])], start + 1, end - 1, indexes);
        }
        if (bodymatter.type === MANIFEST_LIST_ITEM && bodymatter.listitemdata && bodymatter.listitemdata.bodymatter.length) {
            return getBLParentContainer(bodymatter.listitemdata.bodymatter[Number(indexes[start])], start + 1, end - 1, indexes);
        }
    }
}

/**
 * function to check if selected container is inside block list and get its parent container details 
 * @param {Object} data 
 * @param {String} keypressed
 * @returns {Boolean}
 */
export const checkBlockListElement = (data, keypressed) => {
    const { slateLevelData, index } = data;
    let elementData = {};
    if (slateLevelData && Object.values(slateLevelData).length && index && keypressed) {
        const { contents } = Object.values(slateLevelData)[0];
        if (contents && contents.bodymatter && contents.bodymatter.length && typeof index === 'string' && index.includes('-')) {
            let indexes = index.split("-");
            let parentElement = data?.asideData?.parent;

            if (parentElement && parentElement.type === "showhide" && data?.asideData.type==="manifestlist") {
                let indexToinsert = null;
                let parentData = {};
                if (keypressed === "TAB") {
                    indexToinsert = Number(indexes[indexes.length - 1]) + 1;
                    parentData = data.parentManifestListItem;
                }
                else if (keypressed === 'ENTER') {
                    indexToinsert = Number(indexes[indexes.length - 2]) + 1;
                    parentData = data.asideData.parentManifestList;
                }
                else if (keypressed === 'SHIFT+TAB') {
                    indexToinsert = Number(indexes[indexes.length - 4]) + 1;
                    parentData = data.asideData.grandParentManifestList
                }
                return {
                    indexToinsert: indexToinsert,
                    parentData: parentData
                }
            }
            if (indexes && indexes.length && contents?.bodymatter[indexes[0]] && 'type' in contents?.bodymatter[indexes[0]] && contents?.bodymatter[indexes[0]]?.type === MANIFEST_LIST) {
                elementData = {
                    indexToinsert: Number(indexes[indexes.length - 1]) + 1,
                    parentData: getBLParentContainer(contents.bodymatter[indexes[0]], 1, indexes.length - BLOCK_LIST_ELEMENT_EVENT_MAPPING[keypressed], indexes)
                }
                if(keypressed === 'SHIFT+TAB') elementData.indexToinsert = Number(indexes[indexes.length - 4]) + 1
                if(keypressed === 'ENTER') elementData.indexToinsert = Number(indexes[indexes.length - 2]) + 1
                return elementData;
            }
        }
    }
    return elementData;
}

export const isNestingLimitReached = (index,asideData) => {
    let BLOCK_LIST_NESTING_LIMIT = 4  // This is default block list nesting limit.
    if(asideData.parent && asideData.parent.type==="showhide") BLOCK_LIST_NESTING_LIMIT = 5;
    if(typeof index === 'string' && index.includes('-') && index.split("-").length< BLOCK_LIST_NESTING_LIMIT * 2){
        return false;
    }
    return true;
}

/**
 * function to check if selected element is inside blocklist or not
 * @param {Object} activeElement selected element details
 * @param {Object} slateData slate data
 * @returns {Boolean} return whether selected element is inside blocklist or not
 */
export const isElementInsideBlocklist = (activeElement, slateData) => {
    const { index,data } = activeElement;
    if (slateData && Object.values(slateData).length && index) {
        const { contents } = Object.values(slateData)[0];
        if (contents && contents?.bodymatter && contents?.bodymatter?.length && typeof index === 'string' && index.includes('-')) {
            const indexes = index.split("-");
            let parentElement = data?.asideData?.parent;

            if (parentElement && parentElement.type === "showhide" && data.asideData.parentManifestList) {
                return true;
            }
            if (indexes && indexes.length && contents?.bodymatter[indexes[0]] && 'type' in contents?.bodymatter[indexes[0]] && contents?.bodymatter[indexes[0]]?.type === MANIFEST_LIST) {
                return true;
            }
        }
    }
    return false;
}