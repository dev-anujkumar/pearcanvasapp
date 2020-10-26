import axios from 'axios';
import config from '../../config/config';
import { ShowLoader, HideLoader } from '../../constants/IFrameMessageTypes.js';
import { sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import {
    fetchSlateData
} from '../CanvasWrapper/CanvasWrapper_Actions';
import { AUTHORING_ELEMENT_CREATED, ADD_NEW_COMMENT, AUTHORING_ELEMENT_UPDATE, CREATE_SHOW_HIDE_ELEMENT, ERROR_POPUP,DELETE_SHOW_HIDE_ELEMENT, GET_TCM_RESOURCES, STORE_OLD_ASSET_FOR_TCM } from "./../../constants/Action_Constants";
import { prepareTcmSnapshots, fetchElementWipData, checkContainerElementVersion, fetchManifestStatus } from '../TcmSnapshots/TcmSnapshots_Utility.js';
import { fetchPOPupSlateData} from '../../component/TcmSnapshots/TcmSnapshot_Actions.js'
import { elementTypeTCM, containerType, allowedFigureTypesForTCM } from "./ElementConstants";
import * as elementContainerHelpers from "./ElementContainer_helpers";

export const addComment = (commentString, elementId) => (dispatch) => {
    let url = `${config.STRUCTURE_API_URL}narrative-api/v2/${elementId}/comment/`
    let newComment = {
        comment: commentString,
        commentCreator: config.userName || config.userId,
        assignee: config.assignee || config.userId
    };

    let Comment = {
        commentType: "comment",
        commentDateTime: new Date().toISOString(),
        commentAssignee: config.userName || config.userId,
        commentCreator: config.userName || config.userId,
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
                PearsonSSOSession: config.ssoToken,

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

export const deleteElement = (elmId, type, parentUrn, asideData, contentUrn, index, poetryData, element) => (dispatch, getState) => {

    const prepareDeleteRequestData = (elementType) => {
        switch (elementType) {
            case "element-workedexample":
            case "element-aside":
            case "showhide":
            case "popup":
            case "citations":
            case "poetry":
            case "groupedcontent":
                return {
                    "projectUrn": config.projectUrn,
                    "entityUrn": contentUrn
                }
            default:
                return {
                    "projectUrn": config.projectUrn,
                    "entityUrn": parentUrn ? parentUrn.contentUrn : config.slateEntityURN,
                    "workUrn": elmId
                }
        }
    }
    if(type === 'popup'){
        dispatch(fetchPOPupSlateData(elmId, contentUrn, 0 , element, index)) 
     }
    let elementParentEntityUrn = parentUrn && parentUrn.contentUrn || config.slateEntityURN
    let _requestData = prepareDeleteRequestData(type)
    let indexToBeSent = index || "0"
    _requestData = { ..._requestData, index: indexToBeSent.toString().split('-')[indexToBeSent.toString().split('-').length - 1], elementParentEntityUrn }

    return axios.post(`${config.REACT_APP_API_URL}v1/slate/deleteElement`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(deleteElemData => {
        if (deleteElemData.status === 200) {
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
            const parentData = getState().appStore.slateLevelData;
            const deleteParentData = JSON.parse(JSON.stringify(parentData));

            /** [PCAT-8289] -------------------------- TCM Snapshot Data handling ----------------------------*/
            let deleteBodymatter = deleteParentData[config.slateManifestURN].contents.bodymatter;
            if (elementTypeTCM.indexOf(type) !== -1 || containerType.indexOf(type) !== -1) {
                let wipData = fetchElementWipData(deleteBodymatter, index, type, contentUrn, "delete")
                let containerElement = {
                    asideData: asideData,
                    parentUrn: parentUrn,
                    poetryData: poetryData,
                    parentElement: wipData && wipData.type == 'popup' ? wipData : undefined,
                    metaDataField: wipData && wipData.type == 'popup' && wipData.popupdata['formatted-title'] ? 'formattedTitle' : undefined,
                    sectionType : wipData && wipData.type == 'popup' ? 'postertextobject' : undefined
                }
                let deleteData = {
                    wipData: wipData,
                    currentParentData: deleteParentData,
                    bodymatter: deleteBodymatter,
                    newVersionUrns: deleteElemData.data,
                    index:index
                }
                tcmSnapshotsForDelete(deleteData, type, containerElement)
            }
            /**-----------------------------------------------------------------------------------------------*/

            const newParentData = JSON.parse(JSON.stringify(parentData));
            let currentSlateData = newParentData[config.slateManifestURN];
            if (currentSlateData.status === 'approved') {
                if(currentSlateData.type==="popup"){
                    sendDataToIframe({ 'type': "tocRefreshVersioning", 'message' :true });
                    sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                    dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, ""));
                }
                else{
                    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
                    sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
                }

            return false;
        }

        if (parentUrn && parentUrn.elementType == "group") {
            let elIndex = index.toString().split('-') 
            newParentData[config.slateManifestURN].contents.bodymatter[elIndex[0]].groupeddata.bodymatter[elIndex[1]].groupdata.bodymatter.splice(elIndex[2], 1)
        } else {
            let bodymatter = newParentData[config.slateManifestURN].contents.bodymatter
            bodymatter.forEach((element, key) => {
                if (element.id === elmId) {
                    bodymatter.splice(key, 1);
                } else if (parentUrn && parentUrn.elementType == "element-aside") {
                    if (element.id === parentUrn.manifestUrn) {
                        element.elementdata.bodymatter.forEach((ele, indexInner) => {
                            if (ele.id === elmId) {
                                element.elementdata.bodymatter.splice(indexInner, 1);
                            }
                        })
                    }
                } else if(poetryData && poetryData.type == 'poetry') {
                    if (element.id === poetryData.parentUrn) {
                        element.contents.bodymatter.forEach((ele, indexInner) => {
                            if (ele.id === elmId) {
                                element.contents.bodymatter.splice(indexInner, 1);
                            }
                        })
                    }
                }
                else if (parentUrn && parentUrn.elementType == "manifest") {
                    if (element.id === asideData.id) {
                        element.elementdata.bodymatter.forEach((ele) => {
                            if (ele.id == parentUrn.manifestUrn) {
                                ele.contents.bodymatter.forEach((el, indexInner) => {
                                    if (el.id === elmId) {
                                        ele.contents.bodymatter.splice(indexInner, 1);
                                    }
                                })
                            }

                        })
                    }
                } else if (parentUrn && parentUrn.elementType == "citations"){
                    if (element.id === parentUrn.manifestUrn) {
                        let innerIndex = index.split("-")
                        element.contents.bodymatter.splice([innerIndex[1] - 1], 1)
                    }
                }
            })
        }


            dispatch({
                type: AUTHORING_ELEMENT_CREATED,
                payload: {
                    slateLevelData: newParentData
                }
            })
              /** Delete Tcm data on element delete*/
              if (config.tcmStatus) {
                prepareTCMforDelete(elmId, dispatch,getState);
            }
        }

    }).catch(error => {
        showError(error, dispatch, "delete Api fail")
    })
}
/** Delete Tcm data on element delete*/
export function prepareTCMforDelete(elmId, dispatch,getState) {
        let tcmData = getState().tcmReducer.tcmSnapshot;
        tcmData = tcmData && tcmData.filter(function (tcm) {
            return !tcm.elemURN.includes(elmId);
        });
        dispatch({
            type: GET_TCM_RESOURCES,
            payload: {
                data: tcmData
            }
        });
        if(tcmData.length > 0){
            tcmData.some(function (elem) {
                if (elem.txCnt > 0) {
                    sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'true' });
                    return true;
                }
                else {
                    sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'false' });
                }
            });
        }
        else{
            sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'false' });
        }
        
}

function contentEditableFalse (updatedData){
    if(updatedData.type == "element-blockfeature"){
        if(updatedData.html && updatedData.html.text){
            let data = updatedData.html.text;
            updatedData.html.text = data.replace('contenteditable="true"','contenteditable="false"');
            return updatedData ; 
        }
    }
}

/**
 * @function tcmSnapshotsForDelete
 * @description-This function is to prepare snapshot during create element process
 * @param {Object} elementUpdateData - Object containing required element data
 * @param {String} type - type of element
 * @param {Object} containerElement - Element Parent Data
 * @param {Function} dispatch to dispatch tcmSnapshots
*/
export const tcmSnapshotsForDelete = async (elementDeleteData, type, containerElement) => {
    if (elementDeleteData.wipData.hasOwnProperty("figuretype") && !allowedFigureTypesForTCM.includes(elementDeleteData.wipData.figuretype)) {
        return false
    }
    let actionStatus = {
        action:"delete",
        status:"pending",
        fromWhere:"delete"
    }
    let parentType = ['element-aside', 'citations', 'poetry', 'groupedcontent', 'popup'];
    let versionStatus = {};
    let currentSlateData = elementDeleteData.currentParentData[config.slateManifestURN] 
    if(config.isPopupSlate){
        currentSlateData.popupSlateData = elementDeleteData.currentParentData[config.tempSlateManifestURN]
    }
    if ((parentType.indexOf(type) === -1)) {
        versionStatus = fetchManifestStatus(elementDeleteData.bodymatter, containerElement, type);
    }
    containerElement = await checkContainerElementVersion(containerElement, versionStatus, currentSlateData);
    prepareTcmSnapshots(elementDeleteData.wipData, actionStatus, containerElement, type,elementDeleteData.newVersionUrns,elementDeleteData.index);
}

/**
 * API to update the element data
 * @param {*} updatedData the updated content
 * @param {*} elementIndex index of the element on the slate
 */
export const updateElement = (updatedData, elementIndex, parentUrn, asideData, showHideType, parentElement, poetryData) => (dispatch, getState) => {
    if(hasReviewerRole()){
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })   //hide saving spinner
        return ;
    }
    updatedData.projectUrn = config.projectUrn;
    updatedData = (updatedData.type == "element-blockfeature") ? contentEditableFalse(updatedData): updatedData;
    /** updateBodymatter | Used for TCM Snapshots */
    let updateBodymatter = getState().appStore.slateLevelData[config.slateManifestURN].contents.bodymatter;
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
    elementContainerHelpers.updateStoreInCanvas(helperArgs)
    let updatedData1 = JSON.parse(JSON.stringify(updatedData))
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
    return axios.put(`${config.REACT_APP_API_URL}v1/slate/element`,
    updatedData1,
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(async response => {
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
            responseData : response.data
        }
        elementContainerHelpers.processAndStoreUpdatedResponse(updateArgs)
        
    }).catch(error => {
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        config.savingInProgress = false
        config.popupCreationCallInProgress = false
        console.log("updateElement Api fail", error);
        config.isSavingElement = false
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })   //hide saving spinner
    })
}

export const updateFigureData = (figureData, elementIndex, elementId, cb) => (dispatch, getState) => {
    let parentData = getState().appStore.slateLevelData,
        //element,
        index = elementIndex;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter;
    let dataToSend;
    if (typeof (index) == 'number') {
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
    }, 300)
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
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(response => {
        let parentData = getState().appStore.slateLevelData
        const newParentData = JSON.parse(JSON.stringify(parentData));
        if (newParentData[config.slateManifestURN].status === 'wip') {
            newParentData[config.slateManifestURN].contents.bodymatter = updateTableEditorData(elementid, response.data[elementId], newParentData[config.slateManifestURN].contents.bodymatter)
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

const updateTableEditorData = (elementId, tableData, slateBodyMatter) => {

    return slateBodyMatter = slateBodyMatter.map(elm => {
        if (elm.id === elementId) {
            elm = {
                ...elm,
                ...tableData
            }
        }
        else if (elm.elementdata && elm.elementdata.bodymatter) {
            elm.elementdata.bodymatter = updateTableEditorData(elementId, tableData, elm.elementdata.bodymatter)
        }
        else if (elm.contents && elm.contents.bodymatter) {
            elm.contents.bodymatter = updateTableEditorData(elementId, tableData, elm.contents.bodymatter)
        }
        else if (elm.groupeddata && elm.groupeddata.bodymatter) {
            elm.groupeddata.bodymatter = updateTableEditorData(elementId, tableData, elm.groupeddata.bodymatter)
        }
        else if (elm.groupdata && elm.groupdata.bodymatter) {
            elm.groupdata.bodymatter = updateTableEditorData(elementId, tableData, elm.groupdata.bodymatter)
        }
        return elm;
    })
}

export const createShowHideElement = (elementId, type, index, parentContentUrn, cb, parentElement, parentElementIndex) => (dispatch, getState) => {
    localStorage.setItem('newElement', 1);
    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
    let newIndex = index.split("-")
    let newShowhideIndex = parseInt(newIndex[newIndex.length-1])+1
    let _requestData = {
        "projectUrn": config.projectUrn,
        "slateEntityUrn": parentContentUrn,
        "index": newShowhideIndex,
        "type": "TEXT",
        "parentType":"showhide",
        "sectionType": type

    };
    return axios.post(`${config.REACT_APP_API_URL}v1/slate/element`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(createdElemData => {
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = newParentData[config.slateManifestURN];
        if (currentSlateData.status === 'approved') {
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            return false;
        }
        let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter;
        let condition;
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
        }else{
            condition =  newBodymatter[newIndex[0]]
            if(condition.versionUrn == elementId){
                newBodymatter[newIndex[0]].interactivedata[type].splice(newShowhideIndex, 0, createdElemData.data)
            }
        }
        if(parentElement.status && parentElement.status === "approved") cascadeElement(parentElement, dispatch, parentElementIndex)
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
        showError(error, dispatch, "error while creating element")
    })
}

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
    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
    return axios.post(`${config.REACT_APP_API_URL}v1/slate/deleteElement`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then((response)=>{
        let newIndex = eleIndex.split("-")
        // let newShowhideIndex = parseInt(newIndex[newIndex.length-1])+1
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = newParentData[config.slateManifestURN];
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
        }else{
            condition =  newBodymatter[newIndex[0]]
            if(condition.versionUrn == parentId){
                newBodymatter[newIndex[0]].interactivedata[type].splice(index,1)
               
            }
        }
        if(parentElement.status && parentElement.status === "approved") cascadeElement(parentElement, dispatch, parentElementIndex)
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

export const showError = (error, dispatch, errorMessage) => {
    dispatch({type: ERROR_POPUP, payload:{show: true}})
    sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
    console.log(errorMessage, error)
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
            'PearsonSSOSession': config.ssoToken,
            'ApiKey': config.APO_API_KEY
        }
      })
    try {
        const res = await resp.json()
        let statusString = res.status[0]
        let splittedString = statusString.split("/")
        let elementVersioningStatus = splittedString[splittedString.length - 1]
        config.elementStatus[elementWorkId] = elementVersioningStatus
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
