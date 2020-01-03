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
    ERROR_POPUP

} from '../../constants/Action_Constants';

import { sendDataToIframe } from '../../constants/utility.js';
import { HideLoader, ShowLoader } from '../../constants/IFrameMessageTypes.js';


Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

function prepareDataForTcmUpdate(updatedData, parentData, asideData) {
    if (parentData && parentData.elementType === "element-aside") {
        updatedData.isHead = true;
    } else if (parentData && parentData.elementType === "manifest") {
        updatedData.isHead = false;
    }
    if (asideData && asideData.type === "element-aside") {
        if (asideData.subtype === "workedexample") {
            updatedData.parentType = "workedexample";
        } else {
            updatedData.parentType = "element-aside";
        }
    }
    updatedData.projectURN = config.projectUrn;
    updatedData.slateEntity = config.slateEntityURN;
}

function createNewVersionOfSlate(){
    fetch(`${config.STRUCTURE_API_URL}structure-api/context/v2/${config.projectUrn}/container/${config.slateEntityURN}/version`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "PearsonSSOSession": config.ssoToken,
                "ApiKey": config.APO_API_KEY,
            }
        })
            .then(res => res.json())
            .then((res) => {
                sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
        })
}

export const createElement = (type, index, parentUrn, asideData, outerAsideIndex, loref, cb) => (dispatch, getState) => {
    config.currentInsertedIndex = index;
    config.currentInsertedType = type;
    let  popupSlateData = getState().appStore.popupSlateData
    localStorage.setItem('newElement', 1);
    let slateEntityUrn = parentUrn && parentUrn.contentUrn || popupSlateData && popupSlateData.contentUrn|| config.slateEntityURN,
    slateUrn =  parentUrn && parentUrn.manifestUrn || popupSlateData && popupSlateData.id || config.slateManifestURN
    let _requestData = {
        "projectUrn": config.projectUrn,
        "slateEntityUrn":slateEntityUrn,
        "slateUrn": slateUrn,
        "index": outerAsideIndex ? outerAsideIndex : index,
        "type": type,
    };

    if (type == "LO") {
        _requestData.loref = loref ? loref : ""
    }

    prepareDataForTcmUpdate(_requestData, parentUrn, asideData)
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
            // createNewVersionOfSlate();
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            return false;
        }
        const newPopupSlateData = JSON.parse(JSON.stringify(popupSlateData));
        let createdElementData = createdElemData.data;
        if (type == 'SECTION_BREAK') {
            newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
                if (item.id == asideData.id) {
                    item.elementdata.bodymatter.splice(outerAsideIndex, 0, createdElementData)
                }
            })
        } else if (asideData && asideData.type == 'element-aside' && type !== 'SECTION_BREAK') {
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
        else {
            newParentData[config.slateManifestURN].contents.bodymatter.splice(index, 0, createdElementData);
        }

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

export const swapElement = (dataObj, cb) => (dispatch, getState) => {
    const { oldIndex, newIndex, currentSlateEntityUrn, swappedElementData, containerTypeElem, asideId } = dataObj;
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
    if (currentSlateData.status === 'approved') {
        createNewVersionOfSlate()
        return false;
    }

    config.swappedElementType = _requestData.type;
    config.swappedElementIndex = _requestData.index;

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

                const parentData = getState().appStore.slateLevelData;
                let newParentData = JSON.parse(JSON.stringify(parentData));

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
                } else {
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
            // console.log('Error occured while swaping element', err)
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
            const parentData = getState().appStore.slateLevelData;
            const newslateData = JSON.parse(JSON.stringify(parentData));
            let _slateObject = Object.values(newslateData)[0];
            let { contents: _slateContent } = _slateObject;
            let { bodymatter: _slateBodyMatter } = _slateContent;
            let pageNumberRef = {
                pageNumber: data.pageNumber
            }
            const elementObject = _slateBodyMatter.map(element => {
                if (element.id === elementId) {
                    element['pageNumberRef'] = { ...pageNumberRef, urn: element.id }
                }
                else if (asideData && asideData.type == 'element-aside') {
                    if (element.id == asideData.id) {
                        element.elementdata.bodymatter.map((nestedEle) => {
                            if (nestedEle.id == elementId) {
                                nestedEle['pageNumberRef'] = { ...pageNumberRef, urn: nestedEle.id }
                            }
                            else if (nestedEle.type == "manifest" && nestedEle.id == parentUrn.manifestUrn) {
                                nestedEle.contents.bodymatter.map((ele) => {
                                    if (ele.id == elementId) {
                                        ele['pageNumberRef'] = { ...pageNumberRef, urn: ele.id }
                                    }
                                    return ele
                                })
                            }
                            return nestedEle
                        })
                    }
                }
                return element
            })

            dispatch({
                type: FETCH_SLATE_DATA,
                payload: newslateData
            })
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