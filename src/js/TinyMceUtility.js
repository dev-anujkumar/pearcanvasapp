/**
 * Module - TinyMceUtility
 * Description - This file contains utility functions for the TinyMceEditor
 */
import axios from 'axios';
import config from '../config/config';
import { sendDataToIframe } from '../constants/utility';
import { MANIFEST_LIST, MANIFEST_LIST_ITEM, BLOCK_LIST_ELEMENT_EVENT_MAPPING, MULTI_COLUMN, TAB } from '../constants/Element_Constants';
import store from '../appstore/store';
import ElementConstants from '../component/ElementContainer/ElementConstants';

import { autoNumberFigureTypesAllowed,
        LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES } from '../component/FigureHeader/AutoNumberConstants';
const {
    AUTO_NUMBER_SETTING_OVERRIDE_NUMBER,
    AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
} = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES
/**
  * @description data after selecting an asset from alfresco c2 module
  * @param {*} data selected asset data
  * @param {*} editor tinymce editor
  */
export const dataFromAlfresco = (data, editor, imageArgs, cb) => {
    let imageData = data;
    let epsURL = imageData?.epsUrl ? imageData?.epsUrl : imageData.hasOwnProperty('institution-urls') ?
    (imageData?.['institution-urls'][0]?.publicationUrl ? imageData?.['institution-urls'][0]?.publicationUrl : "") :"" ;
    let uniqID = imageData.id ? imageData.id : "";
    let figureType = data?.content?.mimeType?.split('/')[0]
    const imageID = `imageAssetContent:${uniqID}:${Math.floor(1000 + Math.random() * 9000)}`
    const imgData = `<img imageid="urn:pearson:alfresco:${uniqID}" src=${epsURL} height="150" width="112"  class="imageAssetContent" data-id="${imageID}"/>`;
    const imageTypes = ["image", "table", "mathImage", "authoredtext"];
     if ((imageTypes.indexOf(figureType) > -1)) {
         if (config.updateInlineImage === true) {
             config.updateInlineImage = false
             if (imageArgs?.id && editor?.targetElm) {
                 let getImgNode = editor.targetElm.querySelector(`img[data-id="${imageArgs.id}"]`);
                 if (!getImgNode) {
                     getImgNode = editor.targetElm.querySelector(`img[imageid="${imageArgs.id}"]`)
                 }
                 if (getImgNode) {
                     getImgNode.outerHTML = imgData;
                     imageArgs.handleBlur(null, true);
                 }
             }
             else {
                // Inserts a DOM node at current selection/caret location
                editor.selection.setContent(imgData);
                // Calling handleBlur in callback function to save element
                cb();
                setTimeout(() => editor.targetElm?.classList.remove?.("place-holder"), 100)
             }
         }
     }
    else{
        store.dispatch({
            type: 'MULTIPLE_LINE_POETRY_ERROR_POPUP',
            payload: {
                show: true,
                message: 'Only Image Type Assets can be added as Inline Image!'
            }
        });
    }
    // return imgData;
}
/**
 * @description function will be called on image src add and fetch resources from Alfresco
 */
export const handleC2MediaClick = (permissions, editor, element, saveSelectedAlfrescoElement) => {

    const imageArgs = store.getState()?.alfrescoReducer?.imageArgs;
    let currentAssetId = ""
    if (imageArgs?.id) {
        const imageId = imageArgs?.id?.split(':')
        currentAssetId = imageId[0] === 'imageAssetContent' ? imageId[1] : (imageId?.pop() || "")
    }
    const currentAsset = {
        id: currentAssetId?.trim() !== "" ? currentAssetId : "",
        type: 'image',
    };
    let alfrescoPath = config.alfrescoMetaData;
    if(alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
        if (alfrescoPath?.alfresco?.guid || alfrescoPath?.alfresco?.nodeRef ) {
            if (permissions && permissions.includes('add_multimedia_via_alfresco')) {
                let alfrescoSiteName = alfrescoPath?.alfresco?.name ? alfrescoPath.alfresco.name : alfrescoPath.alfresco.siteId
                const alfrescoSite = alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoSiteName
                const citeName = alfrescoSite?.split('/')?.[0] || alfrescoSite
                const citeNodeRef = alfrescoPath?.alfresco?.guid ? alfrescoPath.alfresco.guid : alfrescoPath.alfresco.nodeRef
                let messageObj = {appName:'cypress', citeName: citeName,
                    citeNodeRef: citeNodeRef,
                    elementId: element.id,
                    editor: true,
                    currentAsset
                }
                sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
                const messageDataToSaveInlineImage = {
                    id: element.id,
                    editor: true,
                    citeNodeRef: citeNodeRef
                }
                saveSelectedAlfrescoElement(messageDataToSaveInlineImage);
            } else {
                // props.accessDenied(true)
            }
        }
    } else {
        if (permissions.includes('alfresco_crud_access')) {
            handleSiteOptionsDropdown(alfrescoPath, element.id, currentAsset);
        } else {
            // props.accessDenied(true)
        }
    }
}

function handleSiteOptionsDropdown (alfrescoPath, id, currentAsset) {
    let url = `${config.ALFRESCO_EDIT_METADATA}api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000`;
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
           let payloadObj = {
            launchAlfrescoPopup: true,
            alfrescoPath: alfrescoPath,
            alfrescoListOption: response.data.list.entries,
            id,
            editor: true,
            currentAsset
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
            if (((parentElement?.type === "showhide" || parentElement?.type === "element-aside" || parentElement?.type === "groupedcontent" ||
                config.isPopupSlate) && data?.asideData?.type === "manifestlist")) {
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
            if (indexes && indexes.length && contents?.bodymatter[indexes[0]] &&
                'type' in contents?.bodymatter[indexes[0]] && contents?.bodymatter[indexes[0]]?.type === MANIFEST_LIST) {
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

export const isNestingLimitReached = (index,asideData,parentElement) => {
    let BLOCK_LIST_NESTING_LIMIT = 4  // This is default block list nesting limit.
    if (asideData.parent && (asideData.parent.type === "showhide" || asideData.parent.type === "groupedcontent") ||
        parentElement?.type === "element-aside") BLOCK_LIST_NESTING_LIMIT = 5;
    BLOCK_LIST_NESTING_LIMIT = asideData?.parent?.type === MULTI_COLUMN && asideData?.parent?.subtype === TAB ? 6 : BLOCK_LIST_NESTING_LIMIT;
    if(typeof index === 'string' && index.includes('-') && index.split("-").length < BLOCK_LIST_NESTING_LIMIT * 2){
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

            if ((parentElement && parentElement.type === "showhide" && data.asideData.parentManifestList) || (config.isPopupSlate && parentElement?.type === "showhide")) {
                return true;
            }if((contents?.bodymatter[indexes[0]]?.type === "element-aside" && data?.asideData?.type === 'manifestlist') ||
                (config.isPopupSlate && parentElement?.type === 'element-aside'))
                return true
            if ((parentElement && parentElement.type === "groupedcontent" && data.asideData.parentManifestList) ||
                (config.isPopupSlate && parentElement?.type === "groupedcontent"))
                return true;
            if ((indexes && indexes.length && contents?.bodymatter[indexes[0]] && 'type' in contents?.bodymatter[indexes[0]] &&
                contents?.bodymatter[indexes[0]]?.type === MANIFEST_LIST) ||  (config.isPopupSlate && data?.asideData?.type === MANIFEST_LIST)) {
                return true;
            }
        }
    }
    return false;
}

/**
 * This method is used to rescrit spell check for specific element
 */
// PCAT-2426 - This may be used with tinymcespellchecker pro version but not required with browser spellcheck
// export const restrictSpellCheck = (props) => {
//     return !(props?.element?.figuretype === 'codelisting' && (/-3$/.test(props?.index)))
// }

/**
 * This method is used to check current active element
 */
export const checkActiveElement = (elements) => {
    let currentActiveElement = store.getState()?.appStore?.activeElement;
    return (elements.includes(currentActiveElement?.elementType))
}

export const setInstanceToolbar = (element,placeholder,showHideType, labelNumberSetting) => {
    const asideData= store.getState().appStore.asideData
    let toolbar = [];
    let figureTypes = ['image', 'table', 'mathImage', 'audio', 'video', 'tableasmarkup', 'authoredtext', 'codelisting'];
    if (element?.type === 'popup' && placeholder === 'Enter call to action...') {
        toolbar = config.popupCallToActionToolbar
    } else if ((element?.type === 'figure' && figureTypes.includes(element?.figuretype)) || (element?.figuretype === 'interactive' &&
        config.smartlinkContexts.includes(element?.figuredata?.interactivetype))) {
        toolbar = setFigureToolbar(placeholder,labelNumberSetting, element);
    }else if(element?.type === 'element-aside'){
        toolbar = setAsideNumberingToolbar(placeholder);
    } else if (element?.type === 'figure' && placeholder === "Enter Number...") {
        toolbar = config.figureNumberToolbar;
    }
    else if (["Enter Label...", "Enter call to action..."].includes(placeholder) || (element && element.subtype == 'mathml' && placeholder === "Type something...")) {
        toolbar = (element && (element.type === 'poetry' || element.type === 'popup' || placeholder === 'Enter call to action...' )) ?
        config.poetryLabelToolbar : config.labelToolbar;
    }
    else if (placeholder === "Enter Caption..." || placeholder === "Enter Credit...") {
            toolbar = (element && element.type === 'poetry') ? config.poetryCaptionToolbar : config.captionToolbar;
    } else if(element?.type === 'openerelement'){
        toolbar = config.openerElementToolbar
    }
    else if (showHideType &&( showHideType == 'revel' || showHideType == "postertextobject")) {
        toolbar = config.revelToolbar
    } else if (placeholder == "Type Something..." && element && element.type == 'stanza') {
        toolbar = config.poetryStanzaToolbar;
    }
    else if (asideData?.type === "manifestlist") {
        toolbar = config.blockListToolbar
    }
    else {
        toolbar = config.elementToolbar;
    }
    if (element?.type === "element-dialogue") {
        switch(placeholder){
            case "Enter Act Title...":
            case "Enter Scene Title...":
            case "Enter Credit...": {
                toolbar = [...config.playScriptToolbar, 'glossary'];
                break;
            }
            case "Enter Dialogue...": {
                toolbar = [...config.playScriptToolbarForIndent, 'mathml', 'chemml', 'inlinecode'];
                break;
            }
            case "Enter Stage Directions...": {
                toolbar = [...config.playScriptToolbarForIndent, 'italic', 'mathml', 'chemml', 'inlinecode'];
                break;
            }
            case "Enter Character Name...": {
                    toolbar = [...config.playScriptToolbarForIndent, 'bold', 'mathml', 'chemml', 'inlinecode'];
                break;
            }
            default: break;
        }
    }
    if(element?.parentUrn?.subtype === ElementConstants.TAB){
        toolbar = config.tabTitleToolbar;
    }
    return toolbar;
}
export const setFigureToolbar = (placeholder,labelNumberSetting, element) => {
    let isAutoNumberingEnabled = store.getState()?.autoNumberReducer.isAutoNumberingEnabled;
    let toolbar;
    switch (placeholder) {
        case "Number":
            if (isAutoNumberingEnabled && autoNumberFigureTypesAllowed.includes(element?.figuretype)) {
                toolbar =  (labelNumberSetting === AUTO_NUMBER_SETTING_OVERRIDE_NUMBER ||
                            labelNumberSetting === AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER ) ? config.labelToolbarAutonumberMode : config.numberToolbarAutonumberMode;
            } else {
                toolbar = config.figureNumberToolbar;
            }
            break;
        case "Label":
        case "Label Name":
            toolbar = (isAutoNumberingEnabled && autoNumberFigureTypesAllowed.includes(element?.figuretype)) ? config.labelToolbarAutonumberMode : config.figureImageLabelToolbar;
            break;
        case "Title":
        case "Caption":
        case "Credit":
        case "Math Block Content":
            toolbar = config.figurImageCommonToolbar;
            break;
        case "Code Block Content":
            toolbar = setCodeBlockContentToolbar();
            break;
        case "Enter Button Label":
            toolbar = config.smartlinkActionButtonToolbar;
    }
    return toolbar;
}

export const setAsideNumberingToolbar = (placeholder) => {
    let toolbar;
    let isAutoNumberingEnabled = store.getState()?.autoNumberReducer.isAutoNumberingEnabled;
    switch (placeholder) {
        case "Number":
            toolbar = isAutoNumberingEnabled ? config.numberToolbarAutonumberMode : config.AsideNumber;
            break;
        case "Label":
        case "Label Name":
            toolbar = isAutoNumberingEnabled ? config.labelToolbarAutonumberMode : config.AsideLabel;
            break;
        case "Title":
            toolbar = config.AsideTitle;
    }
    return toolbar;
}

export const setCodeBlockContentToolbar = () => {
    let toolbar;
    let syntaxEnabled = document.querySelector('.panel_syntax_highlighting .switch input');
    if (syntaxEnabled?.checked) {
        toolbar = config.codeListingToolbarDisabled;
    }
    else {
        toolbar = config.codeListingToolbarEnabled;
    }
    return toolbar;
}
/**
 * This method is used to check current editor has any selection
 */
export const isSelectionEmpty = (editor) => {
    const selection = editor.selection;
    const range = selection.getRng();
    return range.collapsed;
}

/**
 * This method is used to restore selection on a specific node
 */
export const restoreSelectionAtNode = (editor, node) => {
    const emptySelection = isSelectionEmpty(editor);
    if (emptySelection && node) {
        const selection = editor.selection;
        const newRange = editor.dom.createRng();
        newRange.selectNodeContents(node);
        selection.setRng(newRange);
    }
}
