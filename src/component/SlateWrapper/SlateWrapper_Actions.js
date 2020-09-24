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
    GET_TCM_RESOURCES,
    PAGE_NUMBER_LOADER

} from '../../constants/Action_Constants';

import { sendDataToIframe } from '../../constants/utility.js';
import { HideLoader, ShowLoader } from '../../constants/IFrameMessageTypes.js';
import { fetchSlateData } from '../CanvasWrapper/CanvasWrapper_Actions';
import { tcmSnapshotsForCreate } from '../TcmSnapshots/TcmSnapshots_Utility.js';
let elementType = ['WORKED_EXAMPLE', 'CONTAINER', 'SECTION_BREAK', 'TEXT', 'CITATION', 'ELEMENT_CITATION', 'POETRY', 'STANZA' , 'MULTI_COLUMN','POP_UP'];
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
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = newParentData[config.slateManifestURN];

        /** [PCAT-8289] ---------------------------- TCM Snapshot Data handling ------------------------------*/
        if (elementType.indexOf(type) !== -1) {
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
            if (elementType.indexOf(type) !== -1) {
                prepareDataForTcmCreate(type, createdElementData, getState, dispatch);
            }
        }
        

        dispatch({
            type: AUTHORING_ELEMENT_CREATED,
            payload: {
                slateLevelData: newParentData
            }
        })
        /*if(type === "SHOW_HIDE"){
            let showHideRevealElement = document.getElementById(`cypress-${index}-2-0`)
               if(showHideRevealElement){
                    showHideRevealElement.focus()
                    showHideRevealElement.blur()
               } 
            }*/
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

export function prepareDataForTcmCreate(type, createdElementData, getState, dispatch) {
    let elmUrn = [];
    const tcmData = getState().tcmReducer.tcmSnapshot;
    if (type === "WORKED_EXAMPLE" || type === "CONTAINER") {
        createdElementData.elementdata.bodymatter.map((item) => {
            if (item.type == "manifest") {
                item.contents.bodymatter.map((ele) => {
                    elmUrn.push(ele.id)
                })
            }
            else {
                elmUrn.push(item.id)
            }

        })
    }
    else if (type === 'SECTION_BREAK' || type == "CITATION" || type === "POETRY") {
        createdElementData.contents.bodymatter.map((item) => {
            elmUrn.push(item.id)
        })
    }
    else if (type === 'TEXT' || type === 'ELEMENT_CITATION' || type === "STANZA") {
        elmUrn.push(createdElementData.id)
    }
    else if (type === "MULTI_COLUMN") {
        /** First Column */
        createdElementData.groupeddata.bodymatter[0].groupdata.bodymatter.map(item => {
            elmUrn.push(item.id)
        })
        /** Second Column */
        createdElementData.groupeddata.bodymatter[1].groupdata.bodymatter.map(item => {
            elmUrn.push(item.id)
        })
    }
    else if (type === 'POP_UP') {
        elmUrn.push(createdElementData.popupdata.postertextobject[0].id)
        elmUrn.push(createdElementData.popupdata.bodymatter[0].id)
    }
    elmUrn.map((item) => {
        return tcmData.push({
            "txCnt": 1,
            "isPrevAcceptedTxAvailable": false,
            "elemURN": item,
            "feedback": null
        })
    })
    if(tcmData.length > 0 ){
        sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'true' });}
    dispatch({
        type: GET_TCM_RESOURCES,
        payload: {
            data: tcmData
        }
    })
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
 * getElementPageNumber | is to get page number on pagenumber option toggle
 */
export const getElementPageNumber = () => (dispatch) => { }

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
