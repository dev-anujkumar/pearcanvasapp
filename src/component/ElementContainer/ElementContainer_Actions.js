import axios from 'axios';
import config from '../../config/config';
import { ShowLoader, HideLoader } from '../../constants/IFrameMessageTypes.js';
import { sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import {
    fetchSlateData
} from '../CanvasWrapper/CanvasWrapper_Actions';
import { AUTHORING_ELEMENT_CREATED, ADD_NEW_COMMENT, AUTHORING_ELEMENT_UPDATE, CREATE_SHOW_HIDE_ELEMENT, ERROR_POPUP, OPEN_GLOSSARY_FOOTNOTE,DELETE_SHOW_HIDE_ELEMENT, GET_TCM_RESOURCES} from "./../../constants/Action_Constants";
import { customEvent } from '../../js/utils';

export const addComment = (commentString, elementId, asideData, parentUrn) => (dispatch, getState) => {
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
            /* dispatch({type: ERROR_POPUP, payload:{show: true}})
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
            console.log("Failed to add comment", error); */
        })
}


export const deleteElement = (elmId, type, parentUrn, asideData, contentUrn, index, poetryData) => (dispatch, getState) => {

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
    let elementParentEntityUrn = parentUrn && parentUrn.contentUrn || config.slateEntityURN
    let _requestData = prepareDeleteRequestData(type)
    let indexToBeSent = index || "0"
    _requestData = { ..._requestData, index: indexToBeSent.toString().split('-')[indexToBeSent.toString().split('-').length - 1], elementParentEntityUrn }
    prepareDataForTcmUpdate(_requestData, elmId, index, asideData, getState, type, poetryData);

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
            const newParentData = JSON.parse(JSON.stringify(parentData));
            let currentSlateData = newParentData[config.slateManifestURN];
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
        /* dispatch({type: ERROR_POPUP, payload:{show: true}})
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        console.log("delete Api fail", error); */
    })
}
/** Delete Tcm data on element delete*/
function prepareTCMforDelete(elmId, dispatch,getState) {
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

function prepareDataForTcmUpdate (updatedData,id, elementIndex, asideData, getState, type, poetryData) {
    updatedData = (updatedData.type == "element-blockfeature") ? contentEditableFalse(updatedData): updatedData;
    let indexes = elementIndex && elementIndex.length > 0 ? elementIndex.split('-') : 0;
    let storeData = getState().appStore.slateLevelData;
    let slateData = JSON.parse(JSON.stringify(storeData));
    let slateBodyMatter = slateData[config.slateManifestURN].contents.bodymatter;
    if((type && type === "element-citation") || (updatedData.type === "element-citation")){
        if (slateBodyMatter[indexes[0]].contents.bodymatter[indexes[1] - 1].id === id) {
            updatedData.isHead = true;
            updatedData.parentType = "citations";
        }
    } else if (indexes.length === 2) {
        if (((!poetryData) || (poetryData.type != "poetry")) && slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].id === id) {
        //if (slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].id === id) {
            updatedData.isHead = true;
        }
    } else if (indexes.length === 3 && asideData && asideData.type !== "groupedcontent") {
        if (((!poetryData) || (poetryData.type != "poetry")) && slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].id === id) {
            updatedData.isHead = false;
        } else if (((poetryData && poetryData.type === "poetry") || (type === "stanza")) && slateBodyMatter[indexes[0]].contents.bodymatter[indexes[2]].id === id) {
            updatedData.isHead = false;
        } else if ((asideData && asideData.type == 'groupedcontent') && slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].id === id) {
            updatedData.isHead = true;
            updatedData.parentType = "groupedcontent";
        } 
        /** else if(type==="stanza" && slateBodyMatter[indexes[0]].contents.bodymatter[indexes[2]].id === id){
            updatedData.isHead = false;
        }*/
        
    }
    if (asideData && asideData.type === "element-aside") {
        if (asideData.subtype === "workedexample") {
            updatedData.parentType = "workedexample";
        } else {
            updatedData.parentType = "element-aside";
        }
    } else if (poetryData && poetryData.type === 'poetry'){
        updatedData.parentType = "poetry";
    } else if (asideData && asideData.type === "groupedcontent"){
        updatedData.parentType = asideData.type;
        updatedData.columnName = indexes[1] === "0" ? "C1" : "C2"
    }
    updatedData.projectUrn = config.projectUrn;
    // updatedData.slateEntity = config.slateEntityURN;
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
    prepareDataForTcmUpdate(updatedData,updatedData.id, elementIndex, asideData, getState, updatedData.type, poetryData);
    updateStoreInCanvas(updatedData, asideData, parentUrn, dispatch, getState, null, elementIndex, showHideType, parentElement, poetryData)
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
    ).then(response => {
        let parentData = getState().appStore.slateLevelData;
        let currentParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = currentParentData[config.slateManifestURN];
        let glossaaryFootnoteValue = getState().glossaryFootnoteReducer.glossaryFootnoteValue;
        let glossaryFootNoteCurrentValue = getState().glossaryFootnoteReducer.glossaryFootNoteCurrentValue;
        let elementIndexFootnote = getState().glossaryFootnoteReducer.elementIndex;
        if(response.data.id !== updatedData.id){
            glossaaryFootnoteValue.elementWorkId = response.data.id;
        dispatch({
            type: OPEN_GLOSSARY_FOOTNOTE,
            payload: {
                glossaaryFootnoteValue: glossaaryFootnoteValue,
                glossaryFootNoteCurrentValue:glossaryFootNoteCurrentValue,
                elementIndex: elementIndexFootnote
            }
        });
        }
        
        if(config.slateManifestURN === updatedData.slateVersionUrn){  //Check applied so that element does not gets copied to next slate while navigating
            if (updatedData.elementVersionType === "element-learningobjectivemapping" || updatedData.elementVersionType === "element-generateLOlist") {
                for(let i=0;i <updatedData.metaDataAnchorID.length; i++){
                        if(updatedData.metaDataAnchorID[i] !==  response.data.metaDataAnchorID[i] ){
                            if (currentSlateData.status === 'wip') {
                                updateLOInStore(updatedData, response.data, getState,dispatch);
                            } else if (currentSlateData.status === 'approved') {
                                sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
                            }
                            break;
                        }
                }
            } else if(response.data.id !== updatedData.id){
                if(currentSlateData.status === 'wip'){
                    updateStoreInCanvas(updatedData, asideData, parentUrn, dispatch, getState, response.data, elementIndex, null, parentElement, poetryData);
                    dispatch({
                        type: "SET_ELEMENT_STATUS",
                        payload: {
                            elementWorkId: response.data.id,
                            elementVersioningStatus: "wip"
                        }
                    })
                    config.savingInProgress = false
                }else if(currentSlateData.status === 'approved'){
                    if(currentSlateData.type==="popup"){
                        sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                        dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, "", false));
                    }else{
                        sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' }); 
                    }
                }
            }
            else if (showHideType && showHideType === "postertextobject") {
                updateStoreInCanvas({ ...updatedData, ...response.data }, asideData, parentUrn, dispatch, getState, null, elementIndex, showHideType, parentElement, poetryData)
                let revelDOM = document.querySelector(`div[data-id="${response.data.id}"]`)
                if (revelDOM) revelDOM.classList.remove("place-holder")
            }
        }
        
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })  //hide saving spinner
        
        customEvent.trigger('glossaryFootnoteSave', response.data.id); 
        config.popupCreationCallInProgress = false;

        if(document.getElementById('link-notification').innerText !== "") {
            document.getElementById('link-notification').style.display = "block";
            setTimeout(() => {
                document.getElementById('link-notification').style.display = "none";
                document.getElementById('link-notification').innerText = "";
            }, 4000);
        }
    }).catch(error => {
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        config.savingInProgress = false
        config.popupCreationCallInProgress = false
        console.log("updateElement Api fail", error);
        document.getElementById('link-notification').innerText = "";
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })   //hide saving spinner
    })
}

function updateLOInStore(updatedData, versionedData, getState, dispatch) {
    let parentData = getState().appStore.slateLevelData;
    let newslateData = JSON.parse(JSON.stringify(parentData));
    if(versionedData){
        //let _slateObject = Object.values(newslateData)[0];   can be removed after regression testing
    //let { contents: _slateContent } = _slateObject;
    //let { bodymatter: _slateBodyMatter } = _slateContent;
    for(let i = 0; i < updatedData.loIndex.length; i++){
        newslateData[config.slateManifestURN].contents.bodymatter[i].id = versionedData.metaDataAnchorID[i];
    }
    }
    return dispatch({
        type: AUTHORING_ELEMENT_UPDATE,
        payload: {
            slateLevelData: newslateData
        }
    })
    

}
function updateStoreInCanvas(updatedData, asideData, parentUrn,dispatch, getState, versionedData, elementIndex, showHideType, parentElement, poetryData){
    //direct dispatching in store
    let parentData = getState().appStore.slateLevelData;
    let newslateData = JSON.parse(JSON.stringify(parentData));
    let _slateObject = newslateData[updatedData.slateVersionUrn];
   
    // let _slateObject = Object.values(newslateData)[0];
    let { contents: _slateContent } = _slateObject;
    let { bodymatter: _slateBodyMatter } = _slateContent;
    let elementId = updatedData.id;
    //tcm update code   
    if (config.tcmStatus) {
        let elementType = ['element-authoredtext', 'element-list', 'element-blockfeature', 'element-learningobjectives', 'element-citation', 'stanza'];
        if (elementType.indexOf(updatedData.type) !== -1 && !updatedData.metaDataField  && !updatedData.sectionType) {
            prepareDataForUpdateTcm(updatedData.id, getState, dispatch, versionedData);
        }
    }
    if(versionedData){
        if (updatedData && updatedData.pageNumberRef) {
            versionedData.pageNumberRef = updatedData.pageNumberRef
        }
        let indexes = elementIndex && elementIndex.length > 0 ? elementIndex.split('-') : 0;
            if(asideData && asideData.type == 'element-aside'){
                asideData.indexes = indexes;
                if(indexes.length === 2 || indexes.length === 3){
                    dispatch(fetchSlateData(versionedData.newParentVersion?versionedData.newParentVersion:asideData.id, asideData.contentUrn, 0, asideData,"", false));
                // }else if(indexes.length === 3){
                //     dispatch(fetchSlateData(asideData.id,asideData.contentUrn, 0, asideData));
                }
            } else if(parentElement && parentElement.type == 'poetry'){

                // if(indexes.length === 2 || indexes.length === 3 || indexes === 2 || indexes === 3){
                    parentElement.index = elementIndex;
                    dispatch(fetchSlateData(versionedData.newParentVersion?versionedData.newParentVersion:parentElement.id, parentElement.contentUrn, 0, parentElement,"", false));
                // }
            } 
            else if(parentElement && parentElement.type === "popup" && updatedData.elementParentEntityUrn && (updatedData.metaDataField || updatedData.sectionType === "postertextobject") ){
                dispatch(fetchSlateData(updatedData.slateVersionUrn, updatedData.elementParentEntityUrn, 0, parentElement, "", true)); }
            else if(parentElement && parentElement.type === "showhide"){
                parentElement.indexes =elementIndex;
                dispatch(fetchSlateData(versionedData.newParentVersion?versionedData.newParentVersion:parentElement.id, parentElement.contentUrn, 0, parentElement,"", false)); 
            }
            else if(parentElement && parentElement.type === "citations"){
                dispatch(fetchSlateData(versionedData.newParentVersion?versionedData.newParentVersion:parentElement.id, parentElement.contentUrn, 0, parentElement,"", false));
            }
            else if (parentElement && parentElement.type === "groupedcontent") {
                dispatch(fetchSlateData(parentElement.id, parentElement.contentUrn, 0, parentElement));
            } else {
                elementIndex = indexes.length == 2 ?indexes[0] : elementIndex
                newslateData[config.slateManifestURN].contents.bodymatter[elementIndex] = versionedData;
            }
        return dispatch({
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: newslateData
            }
        })
    }
    else {
        if(parentElement && parentElement.type === "citations"){
            if(updatedData.type === "element-citation"){
                let indexes = elementIndex.split("-")
                _slateBodyMatter[indexes[0]].contents.bodymatter[indexes[1] - 1] = {...updatedData,
                    tcm: _slateObject.tcm ? true : false
                }
            }
            else {
                if(updatedData.type === "element-authoredtext"){
                    _slateBodyMatter[elementIndex].contents["formatted-title"] = {...updatedData}     
                }
            }
        } else if (parentElement && parentElement.type === "groupedcontent") {
            let indexes = elementIndex.split("-")
            _slateBodyMatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]] = {
                ...updatedData,
                tcm: _slateObject.tcm ? true : false
            }
        } else {
            _slateBodyMatter = _slateBodyMatter.map(element => {
                if (element.id === elementId) {

                    if (element.type !== "openerelement") {
                        element = {
                            ...element,
                            ...updatedData,
                            elementdata: {
                                ...element.elementdata,
                                text: updatedData.elementdata ? updatedData.elementdata.text : null
                            },
                            tcm: _slateObject.tcm ? true : false,
                            html: updatedData.html
                        };
                    }
                    else {
                        element = {
                            ...element,
                            ...updatedData,
                            tcm: _slateObject.tcm ? true : false,
                            html: updatedData.html
                        };
                    }
                } else if (asideData && asideData.type == 'element-aside') {
                    if (element.id == asideData.id) {
                        let nestedBodyMatter = element.elementdata.bodymatter.map((nestedEle) => {
                            /*This condition add object of element in existing element  in aside */
                            if (nestedEle.id == elementId) {
                                nestedEle = {
                                    ...nestedEle,
                                    ...updatedData,
                                    elementdata: {
                                        ...nestedEle.elementdata,
                                        text: updatedData.elementdata ? updatedData.elementdata.text : null
                                    },
                                    tcm: _slateObject.tcm ? true : false,
                                    html: updatedData.html
                                };
                            }
                            else if (nestedEle.type === "popup") {
                                if (nestedEle.popupdata["formatted-title"] && nestedEle.popupdata["formatted-title"]["id"] === elementId) {
                                    nestedEle = {
                                        ...nestedEle,
                                        popupdata: {
                                            ...nestedEle.popupdata,
                                            "formatted-title": { ...updatedData }
                                        }
                                    };
                                }
                                else if (nestedEle.popupdata.postertextobject[0].id === elementId) {
                                    nestedEle = {
                                        ...nestedEle,
                                        popupdata: {
                                            ...nestedEle.popupdata,
                                            postertextobject: [{ ...updatedData }]
                                        }
                                    };
                                }
                            } else if (nestedEle.type == "showhide" && showHideType) {
                                nestedEle.interactivedata[showHideType].map((showHideData, index) => {
                                    if (showHideData.id == updatedData.id) {
                                        showHideData.elementdata.text = updatedData.elementdata.text;
                                        showHideData.html = updatedData.html;
                                    }
                                })
                            }
                            else if (nestedEle.type == "manifest" && nestedEle.id == parentUrn.manifestUrn) {
                                /*This condition add object of element in existing element  in section of aside */
                                let elementObject = nestedEle.contents.bodymatter.map((ele) => {
                                    if (ele.id == elementId) {
                                        ele = {
                                            ...ele,
                                            ...updatedData,
                                            elementdata: {
                                                ...ele.elementdata,
                                                text: updatedData.elementdata ? updatedData.elementdata.text : null
                                            },
                                            tcm: _slateObject.tcm ? true : false,
                                            html: updatedData.html
                                        };
                                    }
                                    else if (ele.type === "popup") {
                                        if (ele.popupdata["formatted-title"] && ele.popupdata["formatted-title"]["id"] === elementId) {
                                            ele = {
                                                ...ele,
                                                popupdata: {
                                                    ...ele.popupdata,
                                                    "formatted-title": { ...updatedData }
                                                }
                                            };
                                        }
                                        else if (ele.popupdata.postertextobject[0].id === elementId) {
                                            ele = {
                                                ...ele,
                                                popupdata: {
                                                    ...ele.popupdata,
                                                    postertextobject: [{ ...updatedData }]
                                                }
                                            };
                                        }
                                    } else if (ele.type == "showhide" && showHideType) {
                                        ele.interactivedata[showHideType].map((showHideData, index) => {
                                            if (showHideData.id == updatedData.id) {
                                                showHideData.elementdata.text = updatedData.elementdata.text;
                                                showHideData.html = updatedData.html;
                                            }
                                        })

                                    }
                                    return ele;
                                })
                                nestedEle.contents.bodymatter = elementObject;
                            }
                            return nestedEle;
                        })
                        element.elementdata.bodymatter = nestedBodyMatter;
                    }
                }
                else if (element.type === "popup") {
                    if (element.popupdata["formatted-title"] && element.popupdata["formatted-title"]["id"] === elementId) {
                        element = {
                            ...element,
                            popupdata: {
                                ...element.popupdata,
                                "formatted-title": { ...updatedData }
                            }
                        };
                    }
                    else if (element.popupdata.postertextobject[0].id === elementId) {
                        element = {
                            ...element,
                            popupdata: {
                                ...element.popupdata,
                                postertextobject: [{ ...updatedData }]
                            }
                        };
                    }
                }
                else if (element.type === "poetry") {
                    if (element.contents["formatted-title"] && element.contents["formatted-title"]["id"] === elementId) {
                        element = {
                            ...element,
                            contents: {
                                ...element.contents,
                                "formatted-title": { ...updatedData }
                            }
                        };
                    }
                     else if (element.contents["creditsarray"] && element.contents["creditsarray"][0] && element.contents["creditsarray"][0]["id"] === elementId) {
                         element = {
                             ...element,
                             contents: {
                                 ...element.contents,
                             }
                         };
                         element.contents.creditsarray[0] = updatedData;
                     }
                    else {
                        let newPoetryBodymatter = element.contents.bodymatter.map((stanza) => {
                            if (stanza.id === elementId) {
                                stanza = {
                                    ...stanza,
                                    ...updatedData,
                                    tcm: _slateObject.tcm ? true : false,
                                };
                            }
                            return stanza;
                        })
                        element.contents.bodymatter = newPoetryBodymatter;
                    }
                }
                else if (element.type === "showhide") {
                    if (showHideType) {
                        element.interactivedata[showHideType].forEach((showHideElement, index) => {
                            if (showHideElement.id == updatedData.id) {
                                showHideElement.elementdata.text = updatedData.elementdata.text;
                                showHideElement.html = updatedData.html;
                            }
                        })
                    }
                }

                return element
            })


        }
        _slateContent.bodymatter = _slateBodyMatter
        _slateObject.contents = _slateContent

        //console.log("saving new data dispatched")   
        return dispatch({
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: newslateData
            }
        })
    
    } 
    //diret dispatching in store
    
}
//TCM Update
function prepareDataForUpdateTcm(updatedDataID, getState, dispatch,versionedData) {
    const tcmData = getState().tcmReducer.tcmSnapshot;
    let indexes = []
    tcmData.filter(function (element, index) {
    if (element.elemURN.indexOf(updatedDataID) !== -1 && element.elemURN.includes('urn:pearson:work')) {
            indexes.push(index)
        }
    });
    if (indexes.length == 0 || (versionedData && updatedDataID !== versionedData.id)) {
        tcmData.push({
            "txCnt": 1,
            "isPrevAcceptedTxAvailable": false,
            "elemURN": versionedData && updatedDataID !== versionedData.id ? versionedData.id : updatedDataID,
            "feedback": null
        })
    }
    else {
        tcmData[indexes]["elemURN"] = updatedDataID
        tcmData[indexes]["txCnt"] = tcmData[indexes]["txCnt"] !== 0 ? tcmData[indexes]["txCnt"] : 1
        tcmData[indexes]["feedback"] = tcmData[indexes]["feedback"] !== null ? tcmData[indexes]["feedback"] : null
        tcmData[indexes]["isPrevAcceptedTxAvailable"] = tcmData[indexes]["isPrevAcceptedTxAvailable"] ? tcmData[indexes]["isPrevAcceptedTxAvailable"] : false

    }
  
if (tcmData.length >0) {
    sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'true' });
}
dispatch({
    type: GET_TCM_RESOURCES,
    payload: {
        data: tcmData
    }
})
}
export const updateFigureData = (figureData, elementIndex, elementId, cb) => (dispatch, getState) => {
    let parentData = getState().appStore.slateLevelData,
        //element,
        index = elementIndex;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter;
    // let bodymatter = parentData[config.slateManifestURN].contents.bodymatter;
    if (typeof (index) == 'number') {
        if (newBodymatter[index].versionUrn == elementId) {
            if (newBodymatter[index].figuretype === "assessment") {
                newBodymatter[index].figuredata['elementdata'] = figureData
                //element = newBodymatter[index]
            } else {
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
                    newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata['elementdata'] = figureData
                    //element = newBodymatter[index]
                } else {
                    newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata = figureData
                    //element = condition
                }
            }
        } else if (indexesLen == 3) {
            condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
            if (condition.versionUrn == elementId) {
                if (newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuretype === "assessment") {
                    newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata['elementdata'] = figureData
                    //element = condition
                } else {
                    newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata = figureData
                    //element = condition
                }

            }
        }
    }
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
    console.log(elementId, config.projectUrn, ">>>>>")
    return axios.get(`${config.REACT_APP_API_URL}v1/slate/narrative/data/${config.projectUrn}/${elementId}`,
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(response => {
        console.log(response, "<<<<<<<<<<<<")
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
        /* dispatch({type: ERROR_POPUP, payload:{show: true}})
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        console.log("getTableEditorData Api fail", error); */
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
        showError(error, dispatch, "error while createing element")
        /* dispatch({type: ERROR_POPUP, payload:{show: true}})
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        console.log("error while createing element",error) */
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
        /* dispatch({type: ERROR_POPUP, payload:{show: true}})
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        console.log("error while createing element",error) */
    })
}

const showError = (error, dispatch, errorMessage) => {
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
export const getElementStatus = (elementWorkId, index) => (dispatch) => {
    let apiUrl = `${config.NARRATIVE_API_ENDPOINT}v2/${elementWorkId}`
    return fetch(apiUrl, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'PearsonSSOSession': config.ssoToken,
            'ApiKey': config.APO_API_KEY
        }
      })
      .then(resp => resp.json()).then(res => {
            let statusString = res.status[0]
            let splittedString = statusString.split("/")
            let elementVersioningStatus = splittedString[splittedString.length - 1]

            dispatch({
                type: "SET_ELEMENT_STATUS",
                payload: {
                    elementWorkId,
                    elementVersioningStatus
                }
            })
      })
      .catch(err => {
        console.log(`ERROR for element at ${index}`, err)
    })
    /* return axios.get(apiUrl,
        {
            headers : {
                'Content-Type': "application/json",
                'PearsonSSOSession': config.ssoToken,
                'ApiKey': config.APO_API_KEY
            }
        }).then(res => {
            let statusString = res.data.status[0]
            let splittedString = statusString.split("/")
            let elementVersioningStatus = splittedString[splittedString.length - 1]

            dispatch({
                type: "SET_ELEMENT_STATUS",
                payload: {
                    elementWorkId,
                    elementVersioningStatus
                }
            })
        })
        .catch(err => {
            console.log(`ERROR for element at ${index}`, err)
        }) */
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
