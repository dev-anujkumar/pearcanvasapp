import axios from 'axios';
import config from '../../config/config';
import { ShowLoader, HideLoader } from '../../constants/IFrameMessageTypes.js';
import { sendDataToIframe, hasReviewerRole, createLabelNumberTitleModel } from '../../constants/utility.js';
import {
    fetchSlateData
} from '../CanvasWrapper/CanvasWrapper_Actions';
import { ADD_NEW_COMMENT, AUTHORING_ELEMENT_UPDATE, CREATE_SHOW_HIDE_ELEMENT, ERROR_POPUP,DELETE_SHOW_HIDE_ELEMENT, STORE_OLD_ASSET_FOR_TCM, UPDATE_MULTIPLE_COLUMN_INFO, UPDATE_OLD_FIGUREIMAGE_INFO, UPDATE_OLD_SMARTLINK_INFO, UPDATE_OLD_AUDIOVIDEO_INFO, UPDATE_AUTONUMBERING_DROPDOWN_VALUE, SLATE_FIGURE_ELEMENTS } from "./../../constants/Action_Constants";
import { fetchPOPupSlateData} from '../../component/TcmSnapshots/TcmSnapshot_Actions.js'
import { processAndStoreUpdatedResponse, updateStoreInCanvas } from "./ElementContainerUpdate_helpers";
import { onDeleteSuccess, prepareTCMSnapshotsForDelete } from "./ElementContainerDelete_helpers";
import { tcmSnapshotsForCreate, prepareSnapshots_ShowHide} from '../TcmSnapshots/TcmSnapshotsCreate_Update';
import { getShowHideElement, indexOfSectionType,findSectionType } from '../ShowHide/ShowHide_Helper';
import * as slateWrapperConstants from "../SlateWrapper/SlateWrapperConstants";
import ElementConstants, { containersInSH } from "./ElementConstants";
import { checkBlockListElement } from '../../js/TinyMceUtility';
import { getAsideElementsWrtKey } from '../FigureHeader/slateLevelMediaMapper';
import { getAutoNumberedElementsOnSlate } from '../FigureHeader/NestedFigureDataMapper';
import { handleAutonumberingForElementsInContainers } from '../FigureHeader/AutoNumberCreate_helper';
import { autoNumber_ElementTypeToStoreKeysMapper, autoNumberFigureTypesForConverion, LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES } from '../FigureHeader/AutoNumberConstants';
import { setAutonumberingValuesForPayload, getValueOfLabel } from '../FigureHeader/AutoNumber_helperFunctions';
import { updateAutoNumberedElement } from './UpdateElements';
const { SHOW_HIDE, ELEMENT_ASIDE, ELEMENT_WORKEDEXAMPLE } = ElementConstants;

const { 
    AUTO_NUMBER_SETTING_DEFAULT,
    AUTO_NUMBER_SETTING_REMOVE_NUMBER,
    AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
} = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES

export const addComment = (commentString, elementId) => (dispatch) => {
    let url = `${config.NARRATIVE_API_ENDPOINT}v2/${elementId}/comment/`
    let newComment = {
        comment: commentString,
        commentCreator: config.fullName,
        assignee: config.fullName
    };

    let Comment = {
        commentType: "comment",
        commentDateTime: new Date().toISOString(),
        commentAssignee: config.fullName,
        commentCreator: config.fullName,
        commentString: commentString,
        commentStatus: "OPEN",
        commentOnEntity: elementId,
        replyComments: [],
        commentUrn: ""
    }
    newComment = JSON.stringify(newComment);
    return axios.post(url, newComment,
        {
            headers: {
                "Content-Type": "application/json",
                ApiKey: config.STRUCTURE_APIKEY,
                // PearsonSSOSession: config.ssoToken,
                'myCloudProxySession': config.myCloudProxySession
            }
        }
    )
        .then(response => {
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
            Comment.commentUrn = response.data.commentUrn
           
            dispatch({
                type: ADD_NEW_COMMENT,
                payload: Comment
            });

        }).catch(error => {
            showError(error, dispatch, "Failed to add comment")
        })
}

export const deleteElement = (elmId, type, parentUrn, asideData, contentUrn, index, poetryData, element,cutCopyParentUrn) => async (dispatch, getState) => {

    const prepareDeleteRequestData = (elementType) => {
        switch (elementType) {
            case "element-workedexample":
            case "element-aside":
            case "showhide":
            case "popup":
            case "citations":
            case "poetry":
            case "groupedcontent":
            case "manifestlist":
            case "manifestlistitem":
                return {
                    "projectUrn": config.projectUrn,
                    "entityUrn": contentUrn
                }
            default:
                return {
                    "projectUrn": config.projectUrn,
                    "entityUrn": cutCopyParentUrn? cutCopyParentUrn.contentUrn: parentUrn ? parentUrn.contentUrn : config.slateEntityURN,
                    "workUrn": elmId
                }
        }
    }
    if(type === 'popup'){
        dispatch(fetchPOPupSlateData(elmId, contentUrn, 0 , element, index)) 
    }
    const { showHideObj } = getState().appStore
    let elementParentEntityUrn = cutCopyParentUrn ? cutCopyParentUrn.contentUrn : parentUrn && parentUrn.contentUrn || config.slateEntityURN
    let _requestData = prepareDeleteRequestData(type)
    let indexToBeSent = index || "0"
    _requestData = { ..._requestData, index: indexToBeSent.toString().split('-')[indexToBeSent.toString().split('-').length - 1], elementParentEntityUrn }

    const deleteElemData = await axios.post(`${config.REACT_APP_API_URL}v1/slate/deleteElement`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                // "PearsonSSOSession": config.ssoToken,
                'myCloudProxySession': config.myCloudProxySession
            }
        }
    )
    if (deleteElemData.status === 200) {
        const deleteArgs = {
            deleteElemData: deleteElemData.data,
            dispatch,
            getState,
            elmId,
            type,
            parentUrn,
            asideData,
            contentUrn,
            index,
            poetryData,
            cutCopyParentUrn,
            fetchSlateData,
            showHideObj,
            element
        }
        onDeleteSuccess(deleteArgs)
    } 
    else {
        showError(deleteElemData.status, dispatch, "delete Api failed")
    }
}

export const contentEditableFalse = (updatedData) => {
    if(updatedData.type == "element-blockfeature"){
        if(updatedData.html && updatedData.html.text){
            let data = updatedData.html.text;
            updatedData.html.text = data.replace('contenteditable="true"','contenteditable="false"');
            return updatedData ; 
        }
    }
}

/**
 * API to update the element data
 * @param {*} updatedData the updated content
 * @param {*} elementIndex index of the element on the slate
 */
export const updateElement = (updatedData, elementIndex, parentUrn, asideData, showHideType, parentElement, poetryData) => async (dispatch, getState) => {
        if(hasReviewerRole()){
            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })   //hide saving spinner
            return ;
        }
        const { showHideObj,slateLevelData } = getState().appStore
        updatedData.projectUrn = config.projectUrn;
        if (updatedData.loData) {
            updatedData.slateVersionUrn = config.slateManifestURN;
        }
        updatedData = (updatedData.type == "element-blockfeature") ? contentEditableFalse(updatedData): updatedData;
        /** updateBodymatter | Used for TCM Snapshots */
        let updateBodymatter = getState()?.appStore?.slateLevelData[config?.slateManifestURN]?.contents?.bodymatter;
        const helperArgs = { 
            updatedData,
            asideData,
            parentUrn,
            dispatch,
            getState,
            versionedData: null,
            elementIndex,
            showHideType,
            parentElement
        }
        updateStoreInCanvas(helperArgs)
        let updatedData1 = JSON.parse(JSON.stringify(updatedData))
        const data = {
            slateLevelData,
            index: elementIndex
        };
        const blockListData = checkBlockListElement(data, 'TAB');
        if(blockListData && Object.keys(blockListData).length > 0) {
            const { parentData } = blockListData;
            updatedData1.elementParentEntityUrn = parentData?.contentUrn;
        }
        if (showHideType && showHideType === "postertextobject" && !(updatedData1.elementdata.text.trim().length || updatedData1.html.text.match(/<img/))) {
            updatedData1 = {
                ...updatedData,
                elementdata : {
                    text : "Reveal Answer:"
                },
                html: {
                    ...updatedData1.html,
                    text : "<p class=\"paragraphNumeroUno\">Reveal Answer:</p>"
                }
            }
        }
        try {
        const response = await axios.put(`${config.REACT_APP_API_URL}v1/slate/element`,
        updatedData1,
            {
                headers: {
                    "Content-Type": "application/json",
                    // "PearsonSSOSession": config.ssoToken,
                    'myCloudProxySession': config.myCloudProxySession
                }
            }
        )
    
        const updateArgs = {
            updatedData,
            elementIndex,
            parentUrn,
            asideData,
            showHideType,
            parentElement,
            getState,
            dispatch,
            poetryData,
            updateBodymatter,
            fetchSlateData,
            responseData : response.data,
            showHideObj
        }
        processAndStoreUpdatedResponse(updateArgs)
    }
    catch(error) {
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        config.savingInProgress = false
        config.popupCreationCallInProgress = false
        config.isSavingElement = false
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })   //hide saving spinner
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        console.error("updateElement Api fail", error);
    }
}

export const updateFigureData = (figureData, elementIndex, elementId, asideDataFromAfrescoMetadata, cb) => (dispatch, getState) => {
    try{
        let parentData = getState().appStore.slateLevelData,
            //element,
            index = elementIndex;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter;
        let dataToSend = {};

        const { asideData } = getState()?.appStore || {};
        const indexes = index?.toString().split('-') || [];
        /* update figure elements in ShowHide */
        /* asideDataFromAfrescoMetadata is used for editing figure metadata popup field(alttext, longDescription) inside ShowHide element */
        if((asideData?.type === SHOW_HIDE || asideDataFromAfrescoMetadata?.type === SHOW_HIDE ) && indexes?.length >= 3) {
            /* Get the showhide element object from slate data using indexes */
            const shObject = getShowHideElement(newBodymatter, (indexes?.length), indexes);
            const section = indexOfSectionType(indexes); /* Get the section type */
            /* After getting showhide Object, add the new element */
            if(shObject?.type === SHOW_HIDE) {
                /* Get the figure element */
                let figure = shObject?.interactivedata[section][indexes[indexes?.length - 1]];
                if (figure.versionUrn === elementId) {
                    dataToSend = figure?.figuredata;
                    /* update the data */
                    figure.figuredata = figureData;
                }
            }
            /* Update figure inside Aside/WE in S/H */
        } else if((asideData?.type === ELEMENT_ASIDE || asideDataFromAfrescoMetadata?.type === ELEMENT_ASIDE ) && (asideData?.parent?.type === SHOW_HIDE || asideDataFromAfrescoMetadata?.parent?.type === SHOW_HIDE ) && indexes?.length >= 4) { 
            let sectionType = asideData?.parent?.showHideType ? asideData?.parent?.showHideType : asideDataFromAfrescoMetadata?.parent?.showHideType;
            let figure;
            if (sectionType) {
                if ((asideData?.subtype === ELEMENT_WORKEDEXAMPLE || asideDataFromAfrescoMetadata?.subtype === ELEMENT_WORKEDEXAMPLE) && indexes?.length >= 5) {
                    figure = newBodymatter[indexes[0]].interactivedata[sectionType][indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]];
                } else {
                    figure = newBodymatter[indexes[0]].interactivedata[sectionType][indexes[2]].elementdata.bodymatter[indexes[3]];
                }
            }
            if (figure.versionUrn === elementId) {
                dataToSend = figure?.figuredata;
                /* update the data */
                figure.figuredata = figureData;
            }
        } else if (typeof (index) == 'number') {
            if (newBodymatter[index].versionUrn == elementId) {
                if (newBodymatter[index].figuretype === "assessment") {
                    dataToSend =  newBodymatter[index].figuredata['elementdata']
                    newBodymatter[index].figuredata['elementdata'] = figureData
                    //element = newBodymatter[index]
                } else {
                    dataToSend = newBodymatter[index].figuredata
                    newBodymatter[index].figuredata = figureData
                    //element = newBodymatter[index]
                }
            }
        } else {
            let indexes = index.split('-');
            let indexesLen = indexes.length, condition;
            if (indexesLen == 2) {
                condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
                if (condition.versionUrn == elementId) {
                    if (newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuretype === "assessment") {
                        dataToSend = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata['elementdata']
                        newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata['elementdata'] = figureData
                        //element = newBodymatter[index]
                    } else {
                        dataToSend =  newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata
                        newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata = figureData
                        //element = condition
                    }
                }
            } else if (indexesLen == 3) {
                // if (newBodymatter[indexes[0]].type === SHOW_HIDE) { /*For showhide container on slate not inside other container */
                //    const section = findSectionType(indexes[1]); /* Get the section type */
                //    condition = newBodymatter[indexes[0]].interactivedata[section][indexes[2]];
                //    if (condition.versionUrn === elementId) {
                //        dataToSend = condition.figuredata
                //        condition.figuredata = figureData
                //    }
                //} else
                if (newBodymatter[indexes[0]].type === "groupedcontent") {              //For Multi-column container
                    condition = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
                    if (condition.versionUrn == elementId) {
                        dataToSend = condition.figuredata
                        condition.figuredata = figureData
                    }
                } else {
                    condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
                    if (condition.versionUrn == elementId) {
                        if (newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuretype === "assessment") {
                            dataToSend = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata['elementdata']
                            newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata['elementdata'] = figureData
                            //element = condition
                        } else {
                            dataToSend = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata
                            newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata = figureData
                            //element = condition
                        }
                    
                    }
                }
            } else if (Array.isArray(newBodymatter) && newBodymatter[indexes[0]].type === "groupedcontent") { /* 2C:AS:Fig */
                if (indexesLen == 4) {
                    condition = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]];  
                } else if (indexesLen == 5) {
                    condition = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]];
                }
                if (condition.versionUrn === elementId) {
                    dataToSend = condition?.figuredata
                    condition.figuredata = figureData
                }
            }
        }
        dispatch(storeOldAssetForTCM(dataToSend))
        dispatch({
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: newParentData
            }
        })
        setTimeout(() => {
            cb();
        }, 300);

    } catch(error){
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })   //hide saving spinner
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
    }
}

export const getTableEditorData = (elementid,updatedData) => (dispatch, getState) => {
    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
    let elementId = elementid
    if(updatedData && elementid !== updatedData){
        elementId = updatedData;
    }
    return axios.get(`${config.REACT_APP_API_URL}v1/slate/narrative/data/${config.projectUrn}/${elementId}`,
        {
            headers: {
                "Content-Type": "application/json",
                // "PearsonSSOSession": config.ssoToken,
                'myCloudProxySession': config.myCloudProxySession
            }
        }
    ).then(response => {
        let parentData = getState().appStore.slateLevelData;
        /* Table in Showhide - Get the section type */
        const sectionType = getState()?.appStore?.asideData?.sectionType || getState()?.appStore?.asideData?.parent?.showHideType;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        if (newParentData[config.slateManifestURN].status === 'wip') {
            newParentData[config.slateManifestURN].contents.bodymatter = updateTableEditorData(elementid, response.data[elementId], newParentData[config.slateManifestURN].contents.bodymatter, sectionType)
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        } else if (newParentData[config.slateManifestURN].status === 'approved') {
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
        }
        
        return dispatch({
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: newParentData
            }
        })
    }).catch(error => {
        showError(error, dispatch, "getTableEditorData Api fail")
    })
}

const updateTableEditorData = (elementId, tableData, slateBodyMatter, sectionType) => {

    return slateBodyMatter = slateBodyMatter.map(elm => {
        if (elm.id === elementId) {
            elm = {
                ...elm,
                ...tableData
            }
        } else /* "Table in Showhide" - Update the store on adding data in table */
        if (sectionType && elm?.interactivedata?.[sectionType]) {
            elm.interactivedata[sectionType] = updateTableEditorData(elementId, tableData, elm.interactivedata[sectionType], sectionType)
        } 
        else if (elm.elementdata && elm.elementdata.bodymatter) {
            elm.elementdata.bodymatter = updateTableEditorData(elementId, tableData, elm.elementdata.bodymatter, sectionType)
        }
        else if (elm.contents && elm.contents.bodymatter) {
            elm.contents.bodymatter = updateTableEditorData(elementId, tableData, elm.contents.bodymatter, sectionType)
        }
        else if (elm.groupeddata && elm.groupeddata.bodymatter) {
            elm.groupeddata.bodymatter = updateTableEditorData(elementId, tableData, elm.groupeddata.bodymatter, sectionType)
        }
        else if (elm.groupdata && elm.groupdata.bodymatter) {
            elm.groupdata.bodymatter = updateTableEditorData(elementId, tableData, elm.groupdata.bodymatter, sectionType)
        }
        return elm;
    })
}
/**
* @function createShowHideElement
* @description-This function is to create elements inside showhide
* @param {String} elementId - id of parent element (ShowHide)   
* @param {String} type - type of section in showhide element - show|hide|revealAnswer
* @param {Object} index - Array of indexs
* @param {String} parentContentUrn - contentUrn of parent element(showhide)
* @param {Function} cb - )
* @param {Object} parentElement - parent element(showhide)
* @param {String} parentElementIndex - index of parent element(showhide) on slate
* @param {String} type2BAdded - type of new element to be addedd - text|image 
*/
export const createShowHideElement = (elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex, type2BAdded) => (dispatch, getState) => {
    localStorage.setItem('newElement', 1);
    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
    let newIndex = index.split("-")
    let newShowhideIndex = parseInt(newIndex[newIndex.length-1]); //+1
    //const { asideData, parentUrn ,showHideObj } = getState().appStore
    const isAutoNumberingEnabled = getState().autoNumberReducer.isAutoNumberingEnabled;
    let _requestData = {
        "projectUrn": config.projectUrn,
        "slateEntityUrn": parentContentUrn,
        "index": newShowhideIndex,
        "type": type2BAdded || "TEXT",
        "parentType":"showhide",
        "sectionType": type

    };
    if (autoNumberFigureTypesForConverion.includes(type2BAdded) && isAutoNumberingEnabled) {
        _requestData["isAutoNumberingEnabled"] = true;
    }
    return axios.post(`${config.REACT_APP_API_URL}v1/slate/element`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                // "PearsonSSOSession": config.ssoToken,
                'myCloudProxySession': config.myCloudProxySession
            }
        }
    ).then( async (createdElemData) => {
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = newParentData[config.slateManifestURN];

        /** [PCAT-8699] ---------------------------- TCM Snapshot Data handling ------------------------------*/
        /* let containerElement = {
            asideData,
            parentUrn,
            showHideObj
        }; */
        const containerElement = prepareSnapshots_ShowHide({ asideData: {...parentElement}}, createdElemData.data, index);
        let slateData = {
            currentParentData: newParentData,
            bodymatter: currentSlateData.contents.bodymatter,
            response: createdElemData.data,
            cypressPlusProjectStatus: getState()?.appStore?.isCypressPlusEnabled
        };
        //This check is to prevent TCM snapshots for creation of BL in SH once BL will support TCM then it will be removed 
        if(type2BAdded !== "MANIFEST_LIST") {
        if (slateWrapperConstants?.elementType?.indexOf(type2BAdded) !== -1) {
            if (currentSlateData.status === 'approved') {
                await tcmSnapshotsForCreate(slateData, type2BAdded, containerElement, dispatch);
            } else {
                tcmSnapshotsForCreate(slateData, type2BAdded, containerElement, dispatch);
            }
        }}
        if (currentSlateData.status === 'approved') {
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            return false;
        }
        let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter;
        /* Create inner elements in ShowHide */
        const indexes = index?.toString().split('-') || [];
        /* Get the showhide element object from slate data using indexes */
        const shObject = getShowHideElement(newBodymatter, (indexes?.length), indexes);
        /* After getting showhide Object, add the new element */
        if(shObject?.id === elementId) {
            if(shObject?.interactivedata?.hasOwnProperty(type)) {
                shObject?.interactivedata[type]?.splice(newShowhideIndex, 0, createdElemData.data);
            } else { /* if interactivedata dont have sectiontype [when all elements of show/hide deleted] */
                let sectionOfSH = [];
                sectionOfSH.push(createdElemData.data);
                shObject.interactivedata[type] = sectionOfSH;
            }   
        }
        let autoNumberedElementsObj = getState().autoNumberReducer.autoNumberedElements;
        const slateAncestorData = getState().appStore.currentSlateAncestorData;
        let elementsList = {};
        if (autoNumberFigureTypesForConverion.includes(type2BAdded) && isAutoNumberingEnabled) {
            let slateFigures = [];
            let elementObj = {};
            if (type2BAdded === 'CONTAINER' || type2BAdded === 'WORKED_EXAMPLE') {
                slateFigures = await getAsideElementsWrtKey(newBodymatter, 'element-aside', slateFigures);
            } else {
                slateFigures = await getAutoNumberedElementsOnSlate(newParentData[config.slateManifestURN], { dispatch });
                if (slateFigures) {
                    dispatch({
                        type: SLATE_FIGURE_ELEMENTS,
                        payload: {
                            slateFigures
                        }
                    });
                }
            }
            
            elementObj = slateFigures?.find(element => element.contentUrn === createdElemData.data.contentUrn);
            const listType = autoNumber_ElementTypeToStoreKeysMapper[type2BAdded];
            const labelType = createdElemData?.data?.displayedlabel;
            elementsList = autoNumberedElementsObj[listType];
            handleAutonumberingForElementsInContainers(newBodymatter, elementObj, createdElemData.data, elementsList, slateAncestorData, autoNumberedElementsObj, slateFigures, listType, labelType, getState, dispatch);
        }
        /* let condition;
        if (newIndex.length == 4) {
            condition = newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]]
            if (condition.versionUrn == elementId) {
                    newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].interactivedata[type].splice(newShowhideIndex, 0, createdElemData.data)
            }
        } else if (newIndex.length == 5) {
            condition = newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].contents.bodymatter[newIndex[2]]
            if (condition.versionUrn == elementId) {
                    newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].contents.bodymatter[newIndex[2]].interactivedata[type].splice(newShowhideIndex, 0, createdElemData.data)
            }
        } else if (newIndex.length == 6) {
            condition = newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]];
            //condition = newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].contents.bodymatter[newIndex[2]]
            if (condition.versionUrn == elementId) {
                newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]].interactivedata[type].splice(newShowhideIndex, 0, createdElemData.data)
            }
        } else if (newIndex.length == 7) {
            condition = newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]].contents.bodymatter[newIndex[4]];
            if (condition.versionUrn == elementId) {
                newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]].contents.bodymatter[newIndex[4]].interactivedata[type].splice(newShowhideIndex, 0, createdElemData.data)
            }
        }
        else{
            condition =  newBodymatter[newIndex[0]]
            if(condition.versionUrn == elementId){
                newBodymatter[newIndex[0]].interactivedata[type].splice(newShowhideIndex, 0, createdElemData.data)
            }
        } */
        if(parentElement.status && parentElement.status === "approved") cascadeElement(parentElement, dispatch, parentElementIndex)

        if (config.tcmStatus) {
            const { prepareDataForTcmCreate } = (await import("../SlateWrapper/slateWrapperAction_helper.js"))
            //This check will be removed once BL will support TCM
            if(type2BAdded !== "MANIFEST_LIST") {
            if (containersInSH.includes(type2BAdded)) {
                prepareDataForTcmCreate(type2BAdded, createdElemData.data, getState, dispatch);    
            } else {
                prepareDataForTcmCreate("TEXT", createdElemData.data, getState, dispatch);
            }}
        }

        dispatch({
            type: CREATE_SHOW_HIDE_ELEMENT,
            payload: {
                slateLevelData: newParentData,
                showHideId: createdElemData.data.id
            }
        })
        if(cb){
            cb("create",index);
        }
    }).catch(error => {
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        showError(error, dispatch, "error while creating element")
    })
}

/** 
export const deleteShowHideUnit = (elementId, type, parentUrn, index,eleIndex, parentId, cb, parentElement, parentElementIndex) => (dispatch, getState) => {
    let _requestData = {
        projectUrn : config.projectUrn,
        entityUrn : parentUrn,
        workUrn : elementId,
        index : index.toString(),
        elementParentEntityUrn: parentUrn,
        sectionType: type
        // slateEntity : config.slateEntityURN
    }
    const { asideData ,showHideObj } = getState().appStore
    const parentElementUrn = getState().appStore.parentUrn
    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
    return axios.post(`${config.REACT_APP_API_URL}v1/slate/deleteElement`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(async (response)=>{
        let newIndex = eleIndex.split("-")
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = newParentData[config.slateManifestURN];

        // [PCAT-8699] ---------------------------- TCM Snapshot Data handling ------------------------------

        const deleteData = {
            deleteElemData: response.data,
            deleteParentData: newParentData,
            index: showHideObj.index,
            showHideObj,
            type: showHideObj.currentElement.type,
            parentUrn: parentElementUrn,
            asideData,
            contentUrn: showHideObj.currentElement.contentUrn
        }
        if (currentSlateData.status === 'approved') {
            await prepareTCMSnapshotsForDelete(deleteData);
        }
        else {
            prepareTCMSnapshotsForDelete(deleteData);
        } 

        if (currentSlateData.status === 'approved') {
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            return false;
        }
        let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter;
        let condition;
        if (newIndex.length == 4) {
            condition = newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]]
            if (condition.versionUrn == parentId) {
                    newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].interactivedata[type].splice(index, 1)
            }
        } else if (newIndex.length == 5) {
            condition = newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].contents.bodymatter[newIndex[2]]
            if (condition.versionUrn == parentId) {
                    newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].contents.bodymatter[newIndex[2]].interactivedata[type].splice(index, 1)
            }
        }else if (newIndex.length == 6) {
            condition = newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]];
            if (condition.versionUrn == parentId) {
                newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]].interactivedata[type].splice(index, 1)
            }
        } else if (newIndex.length == 7) {
            condition = newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]].contents.bodymatter[newIndex[4]];
            if (condition.versionUrn == parentId) {
                newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]].contents.bodymatter[newIndex[4]].interactivedata[type].splice(index, 1)
            }
        }else{
            condition =  newBodymatter[newIndex[0]]
            if(condition.versionUrn == parentId){
                newBodymatter[newIndex[0]].interactivedata[type].splice(index,1)
               
            }
        }
        if(parentElement.status && parentElement.status === "approved") cascadeElement(parentElement, dispatch, parentElementIndex)

        if (config.tcmStatus) {
            const { prepareTCMforDelete } = (await import("./ElementContainerDelete_helpers.js"))
            prepareTCMforDelete(elementId, dispatch, getState);
        }

        if(cb){
            cb("delete",eleIndex);
        } 
        dispatch({
            type: DELETE_SHOW_HIDE_ELEMENT,
            payload: {
                slateLevelData: newParentData,
            }
        })
  
    }).catch(error => {
        showError(error, dispatch, "error while creating element")
    })
}
*/

export const showError = (error, dispatch, errorMessage) => {
    dispatch({type: ERROR_POPUP, payload:{show: true}})
    sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
    console.error(errorMessage, error)
}

const cascadeElement = (parentElement, dispatch, parentElementIndex) => {
    parentElement.indexes = parentElementIndex;
    dispatch(fetchSlateData(parentElement.id, parentElement.contentUrn, 0, parentElement,"")); 
}

/**
 * Gets element's status of versioning (i.e wip or approved)
 * @param {*} elementWorkId element work URN
 * @param {*} index index of element
 */
export const getElementStatus = (elementWorkId, index) => async (dispatch) => {
    let apiUrl = `${config.NARRATIVE_API_ENDPOINT}v2/${elementWorkId}`
    const resp = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'PearsonSSOSession': config.ssoToken,
            'ApiKey': config.APO_API_KEY,
            'myCloudProxySession': config.myCloudProxySession
        }
      })
    try {
        const res = await resp.json()
        let statusString = res?.status[0]
        let splittedString = statusString?.split("/")
        if(splittedString){
        let elementVersioningStatus = splittedString[splittedString.length - 1]
        config.elementStatus[elementWorkId] = elementVersioningStatus
        }
    } catch (error) {
        console.error("Error in fetching element status", error)
    }
}

/**
 * Responsible for clearing element status store data
 */
export const clearElementStatus = () => {

    return {
        type: "SET_ELEMENT_STATUS",
        payload: {
            clearEntries: true
        }
    }
}

export const storeOldAssetForTCM = (value) => {
    return {
        type: STORE_OLD_ASSET_FOR_TCM,
        payload: {
            oldFiguredata: value
        }
    }
}

export const updateMultipleColumnData = (multipleColumnObjData, objKey) => (dispatch) => {
    dispatch({
        type: UPDATE_MULTIPLE_COLUMN_INFO,
        key: objKey,
        payload: multipleColumnObjData
    })
}

// it saves the asset details of figure image element for compare asset changes
export const updateFigureImageDataForCompare = (oldFigureData) => (dispatch) => {
    dispatch({
        type: UPDATE_OLD_FIGUREIMAGE_INFO,
        payload: oldFigureData
    })
}

// it saves the auto number dropdown value of figure element for dropdown changes
export const updateAutoNumberingDropdownForCompare = (value) => (dispatch) => {
    dispatch({
        type: UPDATE_AUTONUMBERING_DROPDOWN_VALUE,
        payload: value
    })
}

// it saves the asset details of smartlink element for compare asset changes
export const updateSmartLinkDataForCompare = (oldSmartLinkData) => (dispatch) => {
    dispatch({
        type: UPDATE_OLD_SMARTLINK_INFO,
        payload: oldSmartLinkData
    })
}

// it saves the asset details of audio video element for compare asset changes
export const updateAudioVideoDataForCompare = (oldAudioVideoData) => (dispatch) => {
    dispatch({
        type: UPDATE_OLD_AUDIOVIDEO_INFO,
        payload: oldAudioVideoData
    })
}

const updateAsideNumberInStore = (updateParams, updatedId) => (dispatch) => {
    const {
        index,
        updatedElement,
        currentSlateData,
    } = updateParams;

    let tmpIndex = typeof index === 'number' ? index : index.split("-")
    let indexesLen = tmpIndex.length
    let newBodymatter = currentSlateData.contents.bodymatter
    if (updatedId && updatedId !== "") { /** Update Aside Id for versioning */
        updatedElement.id = updatedId
        updatedElement.versionUrn = updatedId
    }
    if (typeof tmpIndex === 'number') {
        currentSlateData.contents.bodymatter[tmpIndex] = updatedElement
    } else {
        switch (indexesLen) {
            case 2:
                newBodymatter[tmpIndex[0]] = updatedElement
                break;
            case 3:
                if (newBodymatter[tmpIndex[0]].type == "groupedcontent") {
                    newBodymatter[tmpIndex[0]].groupeddata.bodymatter[tmpIndex[1]].groupdata.bodymatter[tmpIndex[2]] = updatedElement
                }
                else if (newBodymatter[tmpIndex[0]].type == "showhide") {
                    newBodymatter[tmpIndex[0]].interactivedata[findSectionType(tmpIndex[1])][tmpIndex[2]] = updatedElement
                }
                break;
        }
    }

    return {
        currentSlateData
    }
}

export const prepareAsideTitleForUpdate = (index, isAutoNumberingEnabled) => {
    let labelDOM = document.getElementById(`cypress-${index}-t1`),
        numberDOM = document.getElementById(`cypress-${index}-t2`),
        titleDOM = document.getElementById(`cypress-${index}-t3`)
    let labeleHTML = labelDOM ? labelDOM.innerHTML : "",
        numberHTML = numberDOM ? numberDOM.innerHTML : "",
        titleHTML = titleDOM ? titleDOM.innerHTML : ""
    labeleHTML = labeleHTML.replace(/<br data-mce-bogus="1">/g, '').replace(/\&nbsp;/g, '').trim();
    numberHTML = numberHTML.replace(/<br data-mce-bogus="1">/g, '').replace(/\&nbsp;/g, '').trim();
    if (isAutoNumberingEnabled) {
        return [labeleHTML, numberHTML, titleHTML];
    } else {
        titleHTML = createLabelNumberTitleModel(labeleHTML, numberHTML, titleHTML);
        return titleHTML
    }
}
export const updateAsideNumber = (previousData, index, elementId, isAutoNumberingEnabled, autoNumberOption) => (dispatch, getState) => {
    const parentData = getState().appStore.slateLevelData;
    const activeElementId=elementId;
    const currentParentData = JSON.parse(JSON.stringify(parentData));
    let currentSlateData = currentParentData[config.slateManifestURN];
    let elementEntityUrn = "", updatedElement
    let titleHTML = prepareAsideTitleForUpdate(index, isAutoNumberingEnabled);
    let dataArr, payloadKeys, displayedlabel;
    let numberedandlabel = false;
    let manualoverride = {};
    updatedElement = {
        ...previousData,
        html: {
            title: titleHTML
        }
    }
    /** Updation of AutoNumbered Elements */
    if (isAutoNumberingEnabled && previousData?.hasOwnProperty('numberedandlabel')) {
        dataArr = prepareAsideTitleForUpdate(index, isAutoNumberingEnabled);
        payloadKeys = setAutonumberingValuesForPayload(autoNumberOption, dataArr[0], dataArr[1], false);
        numberedandlabel = payloadKeys?.numberedandlabel;
        manualoverride = payloadKeys?.manualoverride;
        displayedlabel = previousData.displayedlabel;
        if (!(previousData.hasOwnProperty('displayedlabel')) && autoNumberOption !== AUTO_NUMBER_SETTING_REMOVE_NUMBER) {
            displayedlabel = getValueOfLabel(previousData?.subtype);
        }
        updatedElement = {
            ...updatedElement,
            html : {
                ...updatedElement.html,
                title: `<p>${dataArr[2]}</p>`
            },
            numberedandlabel : numberedandlabel,
            displayedlabel : displayedlabel,
            manualoverride : manualoverride
        }
        autoNumberOption === AUTO_NUMBER_SETTING_DEFAULT || autoNumberOption === AUTO_NUMBER_SETTING_REMOVE_NUMBER ? delete updatedElement?.manualoverride : updatedElement;
        (autoNumberOption === AUTO_NUMBER_SETTING_REMOVE_NUMBER || autoNumberOption === AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER) ? delete updatedElement?.displayedlabel : updatedElement;
        const dataToReturn = updateAutoNumberedElement(autoNumberOption, updatedElement, { displayedlabel: updatedElement?.displayedlabel, manualoverride: updatedElement?.manualoverride })
        updatedElement = { ...dataToReturn }
    }
    const updateParams = {
        index,
        updatedElement,
        currentSlateData
    }
    const updatedData = dispatch(updateAsideNumberInStore(updateParams,activeElementId))
    if (previousData?.contentUrn) {
        elementEntityUrn = previousData.contentUrn
    }
    let updatedSlateLevelData = updatedData?.currentSlateData ?? parentData
    currentParentData[config.slateManifestURN] = updatedSlateLevelData
    dispatch({
        type: AUTHORING_ELEMENT_UPDATE,
        payload: {
            slateLevelData: currentParentData
        }
    })
    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
    config.conversionInProcess = true
    config.isSavingElement = true
    let dataToSend;
    dataToSend = {
        id: activeElementId,
        projectUrn: config.projectUrn,
        subtype: previousData.subtype,
        type: previousData.type,
        html: {
            title: titleHTML
        },
        versionUrn: activeElementId,
        contentUrn: previousData.contentUrn,
        status: updatedSlateLevelData.status
    }
    if (isAutoNumberingEnabled && previousData?.hasOwnProperty('numberedandlabel')) {
        
        dataToSend = {
            ...dataToSend,
            html : {
                ...dataToSend.html,
                title: `<p>${dataArr[2]}</p>`
            },
            numberedandlabel : numberedandlabel,
            displayedlabel : displayedlabel,
            manualoverride : manualoverride
        }
        autoNumberOption === AUTO_NUMBER_SETTING_DEFAULT || autoNumberOption === AUTO_NUMBER_SETTING_REMOVE_NUMBER ? delete dataToSend.manualoverride : dataToSend;
        (autoNumberOption === AUTO_NUMBER_SETTING_REMOVE_NUMBER || autoNumberOption === AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER) ? delete dataToSend.displayedlabel : dataToSend;
    }
    let url = `${config.REACT_APP_API_URL}v1/${config.projectUrn}/container/${elementEntityUrn}/metadata?isHtmlPresent=true`
    return axios.put(url, dataToSend, {
        headers: {
            "Content-Type": "application/json",
            // "PearsonSSOSession": config.ssoToken
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then(res => {
        if (currentSlateData?.status === 'approved') {
            if (currentSlateData.type === "popup") {
                sendDataToIframe({ 'type': "tocRefreshVersioning", 'message': true });
                sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, ""));
            }
            else {
                sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            }
            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
            config.conversionInProcess = false
            config.savingInProgress = false
            config.isSavingElement = false
        }
        else {
            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
            const newParentData = getState().appStore.slateLevelData;
            const parsedParentData = JSON.parse(JSON.stringify(newParentData));
            let newSlateData = parsedParentData[config.slateManifestURN];
            const newVersionURN = res?.data?.versionUrn && res.data.versionUrn.trim() !== "" ? res.data.versionUrn : ""
            const updatedSlateData = dispatch(updateAsideNumberInStore({
                index,
                updatedElement,
                currentSlateData: newSlateData
            }, newVersionURN))
            currentParentData[config.slateManifestURN] = updatedSlateData?.currentSlateData
            dispatch({
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: currentParentData
                }
            })
        }
        const oldActiveElement = getState()?.appStore?.activeElement;
        const BLANK_PARA_VALUES = ['<p></p>', '<p><br></p>', '<p><br/></p>', '<br data-mce-bogus="1">', '<p><br data-mce-bogus="1"></p>',"<p class='paragraphNumeroUno'></p>"];
        let activeElementObject = {
            ...oldActiveElement,
            elementId: dataToSend.id,
            asideNumber: (!BLANK_PARA_VALUES.includes(titleHTML)) ? true : false
        };
        if (res?.data?.versionUrn && (res?.data?.versionUrn.trim() !== "")) {
            activeElementObject.elementId = res.data.versionUrn
        }
        // dispatch({  // commented for future reference
        //     type: 'SET_ACTIVE_ELEMENT',
        //     payload: activeElementObject
        // });
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
        config.conversionInProcess = false
        config.savingInProgress = false
        config.isSavingElement = false
    }).catch(err => {
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
        dispatch({ type: ERROR_POPUP, payload: { show: true } })
        config.conversionInProcess = false
        config.savingInProgress = false
        config.isSavingElement = false
        console.error(" Error >> ", err)
    })
}
