import axios from 'axios';
import config from '../../config/config';
import {
    AUTHORING_ELEMENT_CREATED,
    SWAP_ELEMENT,
    SET_SPLIT_INDEX,
    GET_PAGE_NUMBER,
    SET_UPDATED_SLATE_TITLE,
    UPDATE_PAGENUMBER_SUCCESS,
    UPDATE_PAGENUMBER,
    UPDATE_PAGENUMBER_FAIL,
    SET_SLATE_TYPE,
    SET_SLATE_ENTITY,
    ACCESS_DENIED_POPUP,
    FETCH_SLATE_DATA,
    SET_PARENT_NODE,
    ERROR_POPUP,
    PAGE_NUMBER_LOADER,
    WIRIS_ALT_TEXT_POPUP

} from '../../constants/Action_Constants';

import { sendDataToIframe, replaceWirisClassAndAttr } from '../../constants/utility.js';
import { HideLoader, ShowLoader } from '../../constants/IFrameMessageTypes.js';
import { fetchSlateData } from '../CanvasWrapper/CanvasWrapper_Actions';
import { tcmSnapshotsForCreate } from '../TcmSnapshots/TcmSnapshots_Utility.js';
import * as slateWrapperConstants from "./SlateWrapperConstants"
import { onPasteSuccess, checkElementExistence, prepareDataForTcmCreate } from "./slateWrapperAction_helper"
import { handleAlfrescoSiteUrl } from '../ElementFigure/AlfrescoSiteUrl_helper.js'
import { SET_SELECTION } from './../../constants/Action_Constants.js';
import tinymce from 'tinymce'
import SLATE_CONSTANTS  from '../../component/ElementSaprator/ElementSepratorConstants';

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

export const createElement = (type, index, parentUrn, asideData, outerAsideIndex, loref, cb,poetryData) => (dispatch, getState) => {
    config.currentInsertedIndex = index;
    let  popupSlateData = getState().appStore.popupSlateData
    localStorage.setItem('newElement', 1);
    let slateEntityUrn = parentUrn && parentUrn.contentUrn || popupSlateData && popupSlateData.contentUrn || poetryData && poetryData.contentUrn || config.slateEntityURN
    let _requestData = {
        "projectUrn": config.projectUrn,
        "slateEntityUrn":slateEntityUrn,
        "index": outerAsideIndex ? outerAsideIndex : index,
        "type": type
    };
    if (type == "LO") {
        _requestData.loref = loref ? loref : ""
    } 
    else if (type == 'ELEMENT_CITATION') {
        _requestData.parentType = "citations"
    }
    else if (type && type === "LO_LIST" && config.parentLabel && config.slateType && config.parentLabel === 'part' && config.slateType === SLATE_CONSTANTS.CONTAINER_INTRO) {
        _requestData.isPart = true
    }
    else if (parentUrn && parentUrn.elementType === 'group') {
        _requestData["parentType"] = "groupedcontent"
        _requestData["columnName"] = parentUrn.columnName
    }

    return axios.post(`${config.REACT_APP_API_URL}v1/slate/element`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(async createdElemData => {
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        let currentSlateData = newParentData[config.slateManifestURN];

        /** [PCAT-8289] ---------------------------- TCM Snapshot Data handling ------------------------------*/
        if (slateWrapperConstants.elementType.indexOf(type) !== -1) {
            let containerElement = {
                asideData: asideData,
                parentUrn: parentUrn,
                poetryData: poetryData
            };
            let slateData = {
                currentParentData: newParentData,
                bodymatter: currentSlateData.contents.bodymatter,
                response: createdElemData.data
            };
            if (currentSlateData.status === 'approved') {
                await tcmSnapshotsForCreate(slateData, type, containerElement, dispatch);
            }
            else {
                tcmSnapshotsForCreate(slateData, type, containerElement, dispatch);
            }
        }
        /**---------------------------------------------------------------------------------------------------*/

        if (currentSlateData.status === 'approved') {
            if(currentSlateData.type==="popup"){
                sendDataToIframe({ 'type': "tocRefreshVersioning", 'message' :true });
                sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, ""));
            } else {
            // createNewVersionOfSlate();
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            return false;
            }
        }
        const newPopupSlateData = JSON.parse(JSON.stringify(popupSlateData));
        let createdElementData = createdElemData.data;
        if (type == 'SECTION_BREAK') {
            newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
                if (item.id == asideData.id) {
                    item.elementdata.bodymatter.splice(outerAsideIndex, 0, createdElementData)
                }
            })
        } else if (asideData && asideData.type == 'element-aside'  && type !== 'SECTION_BREAK') {
            newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
                if (item.id == parentUrn.manifestUrn) {
                    item.elementdata.bodymatter.splice(index, 0, createdElementData)
                } else if (item.type == "element-aside" && item.id == asideData.id) {
                    item.elementdata.bodymatter && item.elementdata.bodymatter.map((ele) => {
                        if (ele.id === parentUrn.manifestUrn) {
                            ele.contents.bodymatter.splice(index, 0, createdElementData)
                        }
                    })
                }
            })
        }else if (popupSlateData && popupSlateData.type == "popup"){
            newPopupSlateData.popupdata.bodymatter.splice(index, 0, createdElementData);
        }
        else if(asideData && asideData.type == 'citations'){
            newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
                if (item.id == parentUrn.manifestUrn) {
                    item.contents.bodymatter.splice(index, 0, createdElementData)
                }
            })
        }
        else if (poetryData && poetryData.type == "poetry"){
            newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
                if (item.id == poetryData.parentUrn) {
                    item.contents.bodymatter.splice(index, 0, createdElementData)
                } 
                else if (item.type == "poetry" && item.id == poetryData.id) {
                    item.contents.bodymatter && item.contents.bodymatter.map((ele) => {
                        if (ele.id === poetryData.parentUrn) {
                            ele.contents.bodymatter.splice(index, 0, createdElementData)
                        }
                    })
                }
            })  
        }
        else if (asideData && asideData.type === 'groupedcontent') {
            newParentData[config.slateManifestURN].contents.bodymatter.map((item, i) => {
                if (item.id === asideData.id) {
                    item.groupeddata.bodymatter[parentUrn.columnIndex].groupdata.bodymatter.splice(index, 0, createdElementData)
                }
            })
        }
        else {
            newParentData[config.slateManifestURN].contents.bodymatter.splice(index, 0, createdElementData);
        }
        if (config.tcmStatus) {
            if (slateWrapperConstants.elementType.indexOf(type) !== -1) {
                prepareDataForTcmCreate(type, createdElementData, getState, dispatch);
            }
        }
        const activeEditorId = tinymce && tinymce.activeEditor && tinymce.activeEditor.id
        replaceWirisClassAndAttr(activeEditorId)
        dispatch({
            type: AUTHORING_ELEMENT_CREATED,
            payload: {
                slateLevelData: newParentData
            }
        })
        
        if (cb) {
            cb();
        }   
    }).catch(error => {
        // Opener Element mock creation

        if (type == "OPENER") {
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
            const parentData = getState().appStore.slateLevelData;
            const newParentData = JSON.parse(JSON.stringify(parentData));
            const createdElementData = openerData
            newParentData[config.slateManifestURN].contents.bodymatter.splice(index, 0, createdElementData);
            dispatch({
                type: AUTHORING_ELEMENT_CREATED,
                payload: {
                    slateLevelData: newParentData
                }
            })
        }
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        console.log("create Api fail", error);
        if (cb) {
            cb();
        }
    })
}

/**
 * Calls Powerpaste API and appends elements to the slate
 * @param {Array} powerPasteData Elements to be pasted
 * @param {Number} index index of insertion
 */
export const createPowerPasteElements = (powerPasteData, index) => async (dispatch, getState) => {
    let data = []
    let slateEntityUrn = config.slateEntityURN
    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
    const parentData = getState().appStore.slateLevelData;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    const currentSlateData = newParentData[config.slateManifestURN]
    localStorage.setItem('newElement', 1);
    let _requestData = {
        "content":data
    };
    let indexOfInsertion = index
    powerPasteData.forEach(pastedElement => {
        const newElement = {
            "html" : {
                text: pastedElement.html
            },
            ...slateWrapperConstants.elementDataByTag[pastedElement.tagName],
            index: indexOfInsertion++
        }
        data.push(newElement)
    });

    try {
        const url = `${config.REACT_APP_API_URL}v1/content/project/${config.projectUrn}/container/${slateEntityUrn}/powerpaste?index=${index}`
        const response = await axios.post(url, JSON.stringify(_requestData), {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        })

        /** -------------------------- TCM Snapshot Data handling ------------------------------*/
        let indexOfElement = 0
        while (indexOfElement < response.data.length) {
            if (slateWrapperConstants.elementType.indexOf("TEXT") !== -1){
                const containerElement = {
                    asideData: null,
                    parentUrn: null,
                    poetryData: null
                };
                const slateData = {
                    currentParentData: newParentData,
                    bodymatter: currentSlateData.contents.bodymatter,
                    response: response.data[indexOfElement]
                };
                if (currentSlateData.status === 'approved') {
                    await tcmSnapshotsForCreate(slateData, "TEXT", containerElement, dispatch);
                }
                else {
                    tcmSnapshotsForCreate(slateData, "TEXT", containerElement, dispatch);
                }

                config.tcmStatus && prepareDataForTcmCreate("TEXT", response.data[indexOfElement], getState, dispatch);
            }
            indexOfElement++
        }

        if (currentSlateData.status === 'approved') {
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            return false;
        }

        newParentData[config.slateManifestURN].contents.bodymatter.splice(index, 0, ...response.data); 
        
        dispatch({
            type: AUTHORING_ELEMENT_CREATED,
            payload: {
                slateLevelData: newParentData
            }
        });
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
    } catch (error) {
        console.error("Error in Powerpaste", error)
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
    }
    
}


export const swapElement = (dataObj, cb) => (dispatch, getState) => {
    const { oldIndex, newIndex, currentSlateEntityUrn, swappedElementData, containerTypeElem, asideId, poetryId} = dataObj;
    const slateId = config.slateManifestURN;

    let _requestData = {
        "projectUrn": config.projectUrn,
        "currentSlateEntityUrn": currentSlateEntityUrn ? currentSlateEntityUrn : config.slateEntityURN,
        "destSlateEntityUrn": currentSlateEntityUrn ? currentSlateEntityUrn : config.slateEntityURN,
        "workUrn": swappedElementData.id,
        "entityUrn": swappedElementData.contentUrn,
        "type": swappedElementData.type,
        "index": newIndex
    }

    let parentData = getState().appStore.slateLevelData;
    let currentParentData = JSON.parse(JSON.stringify(parentData));
    let currentSlateData = currentParentData[config.slateManifestURN];
    config.swappedElementType = _requestData.type;
    config.swappedElementIndex = _requestData.index;
    config.citationFlag= true;
    return axios.post(`${config.REACT_APP_API_URL}v1/slate/swap`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        })
        .then((responseData) => {
            if (responseData && responseData.status == '200') {

                /* For hiding the spinning loader send HideLoader message to Wrapper component */
                sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
                let newParentData = JSON.parse(JSON.stringify(parentData));
                if (currentSlateData.status === 'approved') {
                    if(currentSlateData.type==="popup"){
                        sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                        dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, ""));
                    }
                    else{
                        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
                        sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
                    }
                    return false;
                }
                let newBodymatter = newParentData[slateId].contents.bodymatter;
                if (containerTypeElem && containerTypeElem == 'we') {
                    //swap WE element
                    for (let i in newBodymatter) {
                        if (newBodymatter[i].contentUrn == currentSlateEntityUrn) {
                            newBodymatter[i].elementdata.bodymatter.move(oldIndex, newIndex);
                        }
                    }
                } else if (containerTypeElem && containerTypeElem == 'section') {
                    newBodymatter.forEach(element => {
                        if (element.id == asideId) {
                            element.elementdata.bodymatter.forEach((nestedElem) => {
                                if (nestedElem.contentUrn == currentSlateEntityUrn) {
                                    nestedElem.contents.bodymatter.move(oldIndex, newIndex);
                                }
                            })
                        }
                    });
                } 
                /** ----------Swapping elements inside Citations Group Element----------------- */
                else if (containerTypeElem && containerTypeElem == 'cg') {
                    for (let i in newBodymatter) {
                        if (newBodymatter[i].contentUrn == currentSlateEntityUrn) {
                            newBodymatter[i].contents.bodymatter.move(oldIndex, newIndex);
                        }
                    }
                }
                else if (containerTypeElem && containerTypeElem == 'pe') {
                    newBodymatter.forEach(element => {
                        if (element.id == poetryId) {
                            element.contents.bodymatter.move(oldIndex, newIndex);
                        }
                    });
                }
                else if (containerTypeElem && containerTypeElem == '2C') {
                    newBodymatter[dataObj.containerIndex].groupeddata.bodymatter[dataObj.columnIndex].groupdata.bodymatter.move(oldIndex, newIndex);
                    /* newBodymatter.forEach(element => {
                        if (element.id == poetryId) {
                            element.contents.bodymatter.move(oldIndex, newIndex);
                        }
                    }); */
                }
                else {
                    newParentData[slateId].contents.bodymatter.move(oldIndex, newIndex);
                }

                newParentData = JSON.parse(JSON.stringify(newParentData));

                dispatch({
                    type: SWAP_ELEMENT,
                    payload: {
                        slateLevelData: newParentData,
                    }
                })


                cb(newParentData)
            }

        })
        .catch((err) => {
            /* For hiding the spinning loader send HideLoader message to Wrapper component */
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
            dispatch({type: ERROR_POPUP, payload:{show: true}})
            console.log('Error occured while swaping element', err)
        })
}

export const setSplittedElementIndex = (index) => (dispatch, getState) => {
    return dispatch({
        type: SET_SPLIT_INDEX,
        payload: index
    })
}
export const handleSplitSlate = (newSlateObj) => (dispatch, getState) => {
    let slateDataList = []
    let splitIndex = getState().appStore.splittedElementIndex
    let oldSlateData = {
        "id": config.slateManifestURN,
        "type": "manifest",
        "contents": {
            "frontmatter": [],
            "bodymatter": [],
            "backmatter": []
        },
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "contentUrn": config.slateEntityURN,
        "versionUrn": config.slateManifestURN
    }
    let newSlateData = {
        "id": newSlateObj.containerUrn,
        "type": "manifest",
        "contents": {
            "frontmatter": [],
            "bodymatter": [],
            "backmatter": []
        },
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "contentUrn": newSlateObj.entityUrn,
        "versionUrn": newSlateObj.containerUrn
    }

    slateDataList.push(oldSlateData, newSlateData)
    let slateLevelData = getState().appStore.slateLevelData[config.slateManifestURN];
    let oldSlateBodymatterLocal = slateLevelData.contents.bodymatter;
    oldSlateBodymatterLocal.splice(splitIndex)
    slateLevelData.contents.bodymatter = oldSlateBodymatterLocal;
    return axios.put(
        `${config.REACT_APP_API_URL}v1/slate/split/${config.projectUrn}/${config.slateEntityURN}/${splitIndex}`,
        JSON.stringify({ slateDataList }),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(res => {
        // Perform TCM splitSlate
        /**
        axios({
            method: 'patch',
            url: '/cypress/trackchanges-srvr/splitslatetcm',
            timeout: 1000,
            headers: { "Content-Type": "application/json", "PearsonSSOSession": config.ssoToken },
            data: {
                "splitSlateDurn": config.projectUrn, "splitSlateEurn": newSlateObj.entityUrn, "oldSlateUrn": config.slateManifestURN
            }
        })
        .then(response => {
            console.log("TCM split slate API success : ", response)
        })
        .catch(error => {
            console.log("TCM split slate API error : ", error)
        })
        */
        // Update selection store data after split
        let selection = getState().selectionReducer.selection || {};
        if(Object.keys(selection).length > 0 && selection.sourceSlateEntityUrn === config.slateEntityURN && selection.sourceElementIndex >= splitIndex) {
            selection.sourceSlateEntityUrn = newSlateObj.entityUrn;
            selection.sourceSlateManifestUrn = newSlateObj.containerUrn;
            selection.element.slateVersionUrn = newSlateObj.containerUrn;

            if('deleteElm' in selection && Object.keys(selection.deleteElm).length > 0) {
                selection.deleteElm.cutCopyParentUrn.contentUrn = newSlateObj.entityUrn;
                selection.deleteElm.cutCopyParentUrn.manifestUrn = newSlateObj.containerUrn;
                selection.deleteElm.cutCopyParentUrn.slateLevelData = null;
                selection.deleteElm.index = (selection.sourceElementIndex - splitIndex);
            }

            selection.sourceElementIndex = (selection.sourceElementIndex - splitIndex);
            dispatch({ type: SET_SELECTION, payload: selection });
        }

        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
        let parentData = getState().appStore.slateLevelData;
        let currentParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = currentParentData[config.slateManifestURN];
        if (currentSlateData.status === 'approved') {
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            return;
        }
        dispatch({
            type: FETCH_SLATE_DATA,
            payload: {
                [config.slateManifestURN]: slateLevelData,
            }
        })
    }).catch(error => {
        //console.log("SPLIT SLATE API ERROR : ", error)
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
        dispatch({type: ERROR_POPUP, payload:{show: true}})
    })
}

/**
 * setElementPageNumber | is to set page number relative to element back to store and backend
 * @param {object} numberObject , contains pagenumber object relative to element
 */
export const setElementPageNumber = (numberObject) => (dispatch, getState) => {
    const { pageNumberData } = getState().appStore;
    let { id, type, pageid, pagenumber } = numberObject;
    // if pagenumber data is not present for current element
    if (!pageNumberData.hasOwnProperty(id)) {
        let newPageNumber = {
            id: id,
            type: type,
            pagereference: {
                pageid: pageid,
                pagenumber: pagenumber
            }
        }
        pageNumberData[id] = newPageNumber;
    }
    else {
        let existingPageNumber = pageNumberData[id];
        let { pagereference } = existingPageNumber;
        if (pagereference.pagenumber) {
            pagereference.pagenumber = pagenumber;
        }
        else {
            existingPageNumber.pagereference = {
                pageid: pageid,
                pagenumber: pagenumber
            }
        }
    }
    dispatch({
        type: GET_PAGE_NUMBER,
        payload: pageNumberData
    })
}

export const updatePageNumber = (pagenumber, elementId, asideData, parentUrn) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_PAGENUMBER,
        payload: {
            pageLoading: true
        }
    })
    let data = {
        pageNumber: pagenumber
    }
    if (data.pageNumber) {
        return axios.put(
            `${config.PAGE_NUMBER_UPDATE_ENDPOINT}/v2/pageNumberMapping/${elementId}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'ApiKey': config.OPENER_ELEMENT_COREAPI_KEY,
                    "PearsonSSOSession": config.ssoToken
                }
            }
        ).then(res => {
            let pageNumberData = getState().appStore.pageNumberData;
            pageNumberData.forEach(function (element, index) {
                if (element.id.indexOf(elementId) !== -1) {
                    pageNumberData[index]["id"] = elementId
                    pageNumberData[index]["pageNumber"] = pagenumber
                }
            });
            dispatch({
                type: GET_PAGE_NUMBER,
                payload: {
                    pageNumberData: pageNumberData,
                    allElemPageData : getState().appStore.allElemPageData

                }
            });
            dispatch({
                type: UPDATE_PAGENUMBER_SUCCESS,
                payload: {
                    pageLoading: false
                }
            })
        }).catch(error => {
            dispatch({
                type: UPDATE_PAGENUMBER_FAIL,
                payload: {
                    pageLoading: false
                }
            })
            console.log("UPDATE PAGE NUMBER ERROR : ", error)
            dispatch({type: ERROR_POPUP, payload:{show: true}})
        })
    }
    else {
        return axios.delete(
            `${config.PAGE_NUMBER_UPDATE_ENDPOINT}/v2/pageNumberMapping/${elementId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'ApiKey': config.OPENER_ELEMENT_COREAPI_KEY,
                    "PearsonSSOSession": config.ssoToken
                }
            }
        ).then(res => {
            let pageNumberData = getState().appStore.pageNumberData;
            let allElemPageData = getState().appStore.allElemPageData;
            pageNumberData = pageNumberData && pageNumberData.filter(function (pageNumber) {
            return !pageNumber.id.includes(elementId);
        });
        if(allElemPageData && allElemPageData.length >0){
            allElemPageData = allElemPageData.filter(ele => { return ele != elementId;});
        }
       
        dispatch({
            type: GET_PAGE_NUMBER,
            payload: {pageNumberData: pageNumberData,
                allElemPageData : allElemPageData}
        });
            dispatch({
                type: UPDATE_PAGENUMBER_SUCCESS,
                payload: {
                    pageLoading: false
                }
            })
        }).catch(error => {
            dispatch({
                type: UPDATE_PAGENUMBER_FAIL,
                payload: {
                    pageLoading: false
                }
            })
            console.log("DELETE PAGE NUMBER ERROR : ", error)
        if(!(error.response.status===404 && error.response.data.message==="Not Found")){
                dispatch({type: ERROR_POPUP, payload:{show: true}})
            }
        })
    }
}

export const setUpdatedSlateTitle = (newSlateObj) => (dispatch, getState) => {
    return dispatch({
        type: SET_UPDATED_SLATE_TITLE,
        payload: newSlateObj
    })
}
export const setSlateType = (slateType) => (dispatch, getState) => {
    return dispatch({
        type: SET_SLATE_TYPE,
        payload: slateType
    })
}
export const setSlateEntity = (setSlateEntityParams) => (dispatch, getState) => {
    return dispatch({
        type: SET_SLATE_ENTITY,
        payload: setSlateEntityParams
    })
}

export const accessDenied = (value) => (dispatch, getState) => {
    dispatch({
        type: ACCESS_DENIED_POPUP,
        payload: value
    })
}
export const setSlateParent = (setSlateParentParams) => (dispatch, getState) => {
    return dispatch({
        type: SET_PARENT_NODE,
        payload: setSlateParentParams
    })
}
export const getPageNumber = (elementID) => (dispatch, getState) => {
    dispatch({
        type: PAGE_NUMBER_LOADER,
        payload: {
            pageNumberLoading: true
        }
    })
    let pageNumberData = getState().appStore.pageNumberData;
    let allElemPageData = getState().appStore.allElemPageData;
    allElemPageData.push(elementID)
    let url = `${config.PAGE_NUMBER_UPDATE_ENDPOINT}/v2/pageNumberMapping/${elementID}`;
    return axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken
        }
    }).then((response) => {
        let newPageNumber = {
            id: elementID,
            pageNumber: response.data.pageNumber
        }
        pageNumberData.push(newPageNumber)
        config.pageNumberInProcess = true;

        dispatch({
            type: GET_PAGE_NUMBER,
            payload: {
                pageNumberData:pageNumberData,
                allElemPageData:allElemPageData
            }
        });
        dispatch({
            type: PAGE_NUMBER_LOADER,
            payload: {
                pageNumberLoading: false
            }
        })
       return response.data;
    }).catch((error) => {
        console.log(error)
        let newPageNumber = {
            id: elementID,
            pageNumber: ""
        }
        pageNumberData.push(newPageNumber)
        config.pageNumberInProcess = true;
        dispatch({
            type: GET_PAGE_NUMBER,
            payload: {
                pageNumberData:pageNumberData,
                allElemPageData:allElemPageData
            }
        });
        dispatch({
            type: PAGE_NUMBER_LOADER,
            payload: {
                pageNumberLoading: false
            }
        })
    })
}
export const pageData = (pageNumberData) => (dispatch, getState) => {
    dispatch({
        type: GET_PAGE_NUMBER,
        payload: {
            pageNumberData:pageNumberData,
            allElemPageData : getState().appStore.allElemPageData
        }
    });
}

export const pasteElement = (params) => async (dispatch, getState) => {
    let selection = getState().selectionReducer.selection || {};

    if(Object.keys(selection).length > 0 && 'element' in selection) {
        const {
            index,
            parentUrn,
            asideData,
            poetryData
        } = params
        config.currentInsertedIndex = index;
        localStorage.setItem('newElement', 1);

        let slateEntityUrn = config.slateEntityURN;
        if(parentUrn && 'contentUrn' in parentUrn) {
            slateEntityUrn = parentUrn.contentUrn;
        } else if(poetryData && 'contentUrn' in poetryData) {
            slateEntityUrn = poetryData.contentUrn;
        }

        let cutIndex = index;
        let elmExist = false;
        if(slateEntityUrn === config.slateEntityURN && selection.sourceSlateEntityUrn === config.slateEntityURN && selection.operationType === 'cut') {
            elmExist = await checkElementExistence(config.slateEntityURN, selection.element.id);
            if(cutIndex > selection.sourceElementIndex) {
                cutIndex -= elmExist ? 1 : 0;
            }
        }

        if(slateEntityUrn !== config.slateEntityURN && selection.sourceEntityUrn === slateEntityUrn && selection.operationType === 'cut') {
            elmExist = await checkElementExistence(config.slateEntityURN, selection.element.id);
            let elmIndexes = selection.sourceElementIndex.split('-');
            let sourceElementIndex = elmIndexes[elmIndexes.length -1];
            if(cutIndex > sourceElementIndex) {
                cutIndex -= elmExist ? 1 : 0;
            }
        }
        
        let elmHtml = ('html' in selection.element) ? selection.element.html : {};
        let elmType = ['figure'];
        let elmSubtype = ['assessment'];
        if(elmType.indexOf(selection.element.type) >= 0 && 
            'figuretype' in selection.element && elmSubtype.indexOf(selection.element.type) >= 0) {
            if(!('html' in selection.element)) {
                elmHtml = { "title": selection.element.title.text || "" }
            }
        }
        
        if(selection.operationType === 'copy' && 'html' in selection.element && 'text' in  selection.element.html) {
            let htmlText = (selection.element.html.text);
            htmlText = htmlText.replace(/(\"page-link-[0-9]{1,2}-[0-9]{2,4}\")/gi, () => `"page-link-${Math.floor(Math.random() * 100)}-${Math.floor(Math.random() * 10000)}"`);
            selection.element.html.text = htmlText;
        }

        let _requestData = {
            "content": [{
                "type": selection.element.type,
                "index": cutIndex,
                "inputType": selection.inputType,
                "inputSubType": selection.inputSubType,
                "schema": selection.element.schema,
                "html": elmHtml,
                "slateVersionUrn": selection.sourceSlateManifestUrn,
                "id": selection.element.id,
                "elementParentEntityUrn": selection.sourceEntityUrn,// selection.sourceSlateEntityUrn,
                "versionUrn": selection.element.versionUrn,
                "contentUrn": selection.element.contentUrn,
                "destinationSlateUrn": slateEntityUrn
            }]
        };

        if(selection.operationType.toUpperCase() === "COPY") {
            delete _requestData.content[0].slateVersionUrn;
            delete _requestData.content[0].id;
            delete _requestData.content[0].versionUrn;
            delete _requestData.content[0].contentUrn;
        }

        if(selection.element.type === "discussion") {
            _requestData = {
                "content": [{
                    ..._requestData.content[0],
                    "elementdata": selection.element.elementdata
                }]
            }
        }

        if(selection.element.type === "figure") {
            _requestData = {
                "content": [{
                    ..._requestData.content[0],
                    "figuredata": selection.element.figuredata
                }]
            }
        }
        
        const acceptedTypes=["element-aside","citations","poetry","groupedcontent","workedexample",'showhide','popup']
        if(acceptedTypes.includes(selection.element.type)) {
            const payloadParams = {
                ...params,
                cutIndex,
                selection
            }
            const { setPayloadForContainerCopyPaste } = (await import("./slateWrapperAction_helper.js"))
            _requestData = setPayloadForContainerCopyPaste(payloadParams)
        }

        if('manifestationUrn' in selection.element) {
            _requestData = {
                "content": [{
                    ..._requestData.content[0],
                    "manifestationUrn": selection.element.manifestationUrn
                }]
            }
        }

        try {
            let url = `${config.REACT_APP_API_URL}v1/projects/${config.projectUrn}/containers/${slateEntityUrn}/element/paste?type=${selection.operationType.toUpperCase()}`
            const createdElemData = await axios.post(
                url,
                JSON.stringify(_requestData),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "PearsonSSOSession": config.ssoToken
                    }
                }
            )
            if (createdElemData && createdElemData.status == '200') {
                let responseData = Object.values(createdElemData.data)

                const figureTypes = ["image", "mathImage", "table", "video", "audio"]
                if((responseData[0]?.type === "figure") && figureTypes.includes(responseData[0]?.figuretype) ){
                    const elementId = responseData[0].id
                    handleAlfrescoSiteUrl(elementId, selection.alfrescoSiteData)   
                }
                
                const pasteSuccessArgs = {
                    responseData: responseData[0],
                    index,
                    cutIndex,
                    dispatch,
                    getState,
                    elmExist,
                    parentUrn,
                    asideData,
                    poetryData,
                    slateEntityUrn
                };
        
                await onPasteSuccess(pasteSuccessArgs)
                if (responseData[0].elementdata?.type === "blockquote") {  
                    setTimeout(() => {
                        const node1 = document.querySelector(`[data-id="${responseData[0].id}"]`)
                        const node2 = node1?.querySelector(`.paragraphNummerEins`)
                        node2?.focus()
                    }, 200)
                }
            }
        }
        catch(error) {
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
            console.error("Exceptional Error on pasting the element:::", error);
        }
    }
}
export const wirisAltTextPopup = (data) => (dispatch) => {
    return dispatch({
        type: WIRIS_ALT_TEXT_POPUP,
        payload: data
    })
}

/**
 * Calls the clone API to get the request ID
 * @param {*} insertionIndex index of insertion
 * @param {*} manifestUrn container urn
 */
export const cloneContainer = (insertionIndex, manifestUrn,parentUrn,asideData) => async (dispatch) => {
    try {
        //Clone container
        const cloneApiUrl = `${config.AUDIO_NARRATION_URL}container/${manifestUrn}/clone`
        const cloneResponse = await axios.post(
            cloneApiUrl,
            null,
            {
                headers: {
                    "ApiKey": config.STRUCTURE_APIKEY,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "PearsonSSOSession": config.ssoToken
                }
            }
        )
        const requestId = cloneResponse.data.message.split(",")[1].replace(" request id:","")

        //Fetch Status
        const fetchAndPasteArgs = {
            insertionIndex,
            requestId,
            dispatch,
            pasteElement,
            parentUrn,
            asideData
        }
        await (await import("./slateWrapperAction_helper.js")).fetchStatusAndPaste(fetchAndPasteArgs)  
    }
    catch(error) {
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        console.error("Error in cloning the container:::", error);
    }
}
