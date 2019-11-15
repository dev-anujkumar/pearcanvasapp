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
    FETCH_SLATE_DATA
    
} from '../../constants/Action_Constants';

import { sendDataToIframe } from '../../constants/utility.js';
import { HideLoader, NextSlate } from '../../constants/IFrameMessageTypes.js';



// import { HideLoader, NextSlate } from '../../constants/IFrameMessageTypes.js';

// const openerData = {
//     "id": "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y",
//     "versionUrn": "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y",
//     "contentUrn": "urn:pearson:entity:b345d729-e8b0-4e54-b4c8-0c24650ck8u6",
//     "type": "openerelement",
//     "backgroundcolor": "#000000",
//     "schema": "http://schemas.pearson.com/wip-authoring/openerelement/1",
//     "title": {
//         "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
//         "text": "Chapter X: Opening Element Title",
//         "textsemantics": [
//             {
//                 "type": "label",
//                 "charStart": 0,
//                 "charEnd": 7
//             },
//             {
//                 "type": "number",
//                 "charStart": 8,
//                 "charEnd": 10
//             }
//         ]
//     },
//     "backgroundimage": {
//         "path": "https://d12m40tknrppbi.cloudfront.net/cite/images/ch11_chapter_header.jpg",
//         "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
//         "imageid": "urn:pearson:alfresco:4932d1fb-e6d3-4080-9f23-032e0dfa219a",
//         "credits": {
//             "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
//             "text": "Opening element credits for the background image."
//         }
//     }
// }

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

export const createElement = (type, index, parentUrn, asideData, outerAsideIndex,loref) => (dispatch, getState) => {
    config.currentInsertedIndex = index;
    config.currentInsertedType = type;
    localStorage.setItem('newElement', 1);
    let _requestData = {
        "projectUrn": config.projectUrn,
        "slateEntityUrn": parentUrn && parentUrn.contentUrn || config.slateEntityURN,
        "slateUrn": parentUrn && parentUrn.manifestUrn || config.slateManifestURN,
        "index": outerAsideIndex ? outerAsideIndex : index,
        "type": type,
    };
    if(type=="LO"){
        _requestData.loref = loref?loref:""
    }
    
    return  axios.post(`${config.REACT_APP_API_URL}v1/slate/element`,
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
        console.log("create Api fail", error);
    })
}

export const swapElement = (dataObj, cb) => (dispatch, getState) => {
    const { oldIndex, newIndex, currentSlateEntityUrn, swappedElementData, containerTypeElem, swappedElementId, asideId } = dataObj;
    const slateId = config.slateManifestURN;

    let _requestData = {
        "projectUrn": config.projectUrn,
        "currentSlateEntityUrn": currentSlateEntityUrn ? currentSlateEntityUrn : config.slateEntityURN,
        "destSlateEntityUrn": currentSlateEntityUrn ? currentSlateEntityUrn:config.slateEntityURN,
        "workUrn": swappedElementData.id,
        "entityUrn": swappedElementData.contentUrn,
        "type": swappedElementData.type,
        "index": newIndex
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
                    for(let i in newBodymatter){
                        if( newBodymatter[i].contentUrn== currentSlateEntityUrn){
                            newBodymatter[i].elementdata.bodymatter.move(oldIndex, newIndex);
                        }
                    }
                }else if(containerTypeElem && containerTypeElem == 'section'){
                    newBodymatter.forEach(element => {
                        if(element.id == asideId){
                            element.elementdata.bodymatter.forEach((nestedElem) => {
                                if(nestedElem.contentUrn == currentSlateEntityUrn){
                                    nestedElem.contents.bodymatter.move(oldIndex, newIndex);
                                }
                            })
                        }
                    });
                }else{
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

    let slateLevelData = getState().appStore.slateLevelData[config.slateManifestURN];
    let oldSlateBodymatter = slateLevelData.contents.bodymatter;
    let newSlateBodymatter = oldSlateBodymatter.splice(splitIndex)

    oldSlateBodymatter.forEach((oldSlateBody) => {
        oldSlateData.contents.bodymatter.push({
            type: oldSlateBody.type,
            id: oldSlateBody.id
        })
    })
    newSlateBodymatter.forEach((newSlateBody) => {
        newSlateData.contents.bodymatter.push({
            type: newSlateBody.type,
            id: newSlateBody.id
        })
    })
    slateLevelData.contents.bodymatter=oldSlateBodymatter;
    slateDataList.push(oldSlateData, newSlateData)

    return axios.put(
        `${config.REACT_APP_API_URL}v1/slate/split/${config.projectUrn}`,
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

export const updatePageNumber = (pagenumber, elementId,asideData,parentUrn) => (dispatch, getState) => {
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

            /** This will uncomment when pagenumber key is fixed**/


        /*   const parentData = getState().appStore.slateLevelData;
            const newslateData = JSON.parse(JSON.stringify(parentData));
            let _slateObject = Object.values(newslateData)[0];
            let { contents: _slateContent } = _slateObject;
            let { bodymatter: _slateBodyMatter } = _slateContent;
            const element = _slateBodyMatter.map(element => {
                if (element.id === elementId) {
                    element['pageNumber'] = pagenumber
                } else if (asideData && asideData.type == 'element-aside') {
                    if (element.id == asideData.id) {
                        element.elementdata.bodymatter.map((nestedEle) => {
                         
                            if (nestedEle.id == elementId) {
                                nestedEle['pageNumber'] = pagenumber;
                            } else if (nestedEle.type == "manifest" && nestedEle.id == parentUrn.manifestUrn) {
                              
                                nestedEle.contents.bodymatter.map((ele) => {
                                    if (ele.id == elementId) {
                                        ele['pageNumber'] = pagenumber;
                                    }
                                })
                            }
                        })
                    }
                }
            }) */

            dispatch({
                type: UPDATE_PAGENUMBER_SUCCESS,
                payload: {
                 //   slateLevelData: {},
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
        })
    }

}

export const setUpdatedSlateTitle = (newSlateObj) => (dispatch, getState) => {
    return dispatch({
        type: SET_UPDATED_SLATE_TITLE,
        payload: newSlateObj
    })
}
export const setSlateType = (slateType) => (dispatch, getState) =>{
    return dispatch({
        type: SET_SLATE_TYPE,
        payload: slateType
    }) 
}
export const setSlateEntity = (setSlateEntity) => (dispatch, getState) =>{
    return dispatch({
        type: SET_SLATE_ENTITY,
        payload: setSlateEntity
    }) 
}


export const accessDenied = (value) => (dispatch, getState) => {
    dispatch({
        type: ACCESS_DENIED_POPUP,
        payload: value
    })
}
