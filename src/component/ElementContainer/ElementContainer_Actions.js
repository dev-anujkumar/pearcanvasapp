import axios from 'axios';
import config from '../../config/config';
import { ShowLoader, HideLoader } from '../../constants/IFrameMessageTypes.js';
import { sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import {
    fetchSlateData
} from '../CanvasWrapper/CanvasWrapper_Actions';
import { ADD_COMMENT, AUTHORING_ELEMENT_CREATED, ADD_NEW_COMMENT, AUTHORING_ELEMENT_UPDATE, CREATE_SHOW_HIDE_ELEMENT, ERROR_POPUP, OPEN_GLOSSARY_FOOTNOTE,DELETE_SHOW_HIDE_ELEMENT } from "./../../constants/Action_Constants";
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
            const parentData = getState().appStore.slateLevelData;
            const newslateData = JSON.parse(JSON.stringify(parentData));
            let _slateObject = Object.values(newslateData)[0];
            let { contents: _slateContent } = _slateObject;
            let { bodymatter: _slateBodyMatter } = _slateContent;
            Comment.commentUrn = response.data.commentUrn
            //const elementBM = _slateBodyMatter.map(element => {
            _slateBodyMatter.map(element => {
                if (element.id === elementId) {
                    element['comments'] = true
                } else if (asideData && asideData.type == 'element-aside') {
                    if (element.id == asideData.id) {
                        element.elementdata.bodymatter.map((nestedEle) => {
                            /*This condition add comment in element in aside */
                            if (nestedEle.id == elementId) {
                                nestedEle['comments'] = true;
                            } else if (nestedEle.type == "manifest" && nestedEle.id == parentUrn.manifestUrn) {
                                /*This condition add comment in element in section of aside */
                                nestedEle.contents.bodymatter.map((ele) => {
                                    if (ele.id == elementId) {
                                        ele['comments'] = true;
                                    }
                                })
                            }
                        })
                    }
                }
            }
            );
            dispatch({
                type: ADD_COMMENT,
                payload: newslateData
            });
            dispatch({
                type: ADD_NEW_COMMENT,
                payload: Comment
            });

        }).catch(error => {
            dispatch({type: ERROR_POPUP, payload:{show: true}})
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
            console.log("Failed to add comment", error);
        })
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
            .then(res => res.json()) // OR res.json()
            .then((res) => {
                sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
        })
}

export const deleteElement = (elmId, type, parentUrn, asideData, contentUrn, index) => (dispatch, getState) => {

    const prepareDeleteRequestData = (elementType) => {
        switch (elementType) {
            case "element-workedexample":
            case "element-aside":
            case "showhide":
            case "popup":
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

    let _requestData = prepareDeleteRequestData(type)
    let indexToBeSent = index || "0"
    _requestData = { ..._requestData, index: indexToBeSent.toString().split('-')[indexToBeSent.toString().split('-').length - 1] }
    prepareDataForTcmUpdate(_requestData, elmId, index, asideData, getState, type);

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
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
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
                } else if (parentUrn && parentUrn.elementType == "manifest") {
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
                }

            })

            dispatch({
                type: AUTHORING_ELEMENT_CREATED,
                payload: {
                    slateLevelData: newParentData
                }
            })
        }

    }).catch(error => {
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        console.log("delete Api fail", error);
    })
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

function prepareDataForTcmUpdate (updatedData,id, elementIndex, asideData, getState, type) {
    updatedData = (updatedData.type == "element-blockfeature") ? contentEditableFalse(updatedData): updatedData;
    let indexes = elementIndex && elementIndex.length > 0 ? elementIndex.split('-') : 0;
    let storeData = getState().appStore.slateLevelData;
    let slateData = JSON.parse(JSON.stringify(storeData));
    let slateBodyMatter = slateData[config.slateManifestURN].contents.bodymatter;
    if (indexes.length === 2) {
        if (slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].id === id) {
            updatedData.isHead = true;
        }
    } else if (indexes.length === 3) {
        if (slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].id === id) {
            updatedData.isHead = false;
        }
    }
    if (asideData && asideData.type === "element-aside") {
        if (asideData.subtype === "workedexample") {
            updatedData.parentType = "workedexample";
        } else {
            updatedData.parentType = "element-aside";
        }
    }

    if(config.tempSlateManifestURN){
        updatedData.parentType = "popup"
    }
    updatedData.projectURN = config.projectUrn;
    updatedData.slateEntity = config.slateEntityURN;
}

/**
 * API to update the element data
 * @param {*} updatedData the updated content
 * @param {*} elementIndex index of the element on the slate
 */
export const updateElement = (updatedData, elementIndex, parentUrn, asideData, showHideType, parentElement) => (dispatch, getState) => {
    if(hasReviewerRole()){
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })   //hide saving spinner
        return ;
    }
    prepareDataForTcmUpdate(updatedData,updatedData.id, elementIndex, asideData, getState);
    updateStoreInCanvas(updatedData, asideData, parentUrn, dispatch, getState, null, null, showHideType, parentElement)
    return axios.put(`${config.REACT_APP_API_URL}v1/slate/element`,
        updatedData,
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
            glossaaryFootnoteValue.elementWorkId =response.data.id;
        dispatch({
            type: OPEN_GLOSSARY_FOOTNOTE,
            payload: {
                glossaaryFootnoteValue: glossaaryFootnoteValue,
                glossaryFootNoteCurrentValue:glossaryFootNoteCurrentValue,
                elementIndex: elementIndexFootnote
            }
        });
        }
        
        if(config.slateManifestURN === updatedData.slateUrn){  //Check applied so that element does not gets copied to next slate while navigating
            if (updatedData.elementVersionType === "element-learningobjectivemapping" || updatedData.elementVersionType === "element-generateLOlist") {
                console.log("mapping inside")
                for(let i=0;i <updatedData.metaDataAnchorID.length; i++){
                        if(updatedData.metaDataAnchorID[i] !==  response.data.metaDataAnchorID[i] ){
                            if (currentSlateData.status === 'wip') {
                                console.log("mapping wip")
                                updateLOInStore(updatedData, response.data, getState,dispatch);
                            } else if (currentSlateData.status === 'approved') {
                                console.log("mapping approved")
                                sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
                            }
                            break;
                        }
                       
                   
                }
              
                
            } else if(response.data.id !== updatedData.id){
                if(currentSlateData.status === 'wip'){
                    updateStoreInCanvas(updatedData, asideData, parentUrn, dispatch, getState, response.data, elementIndex, null, parentElement);
                }else if(currentSlateData.status === 'approved'){
                    sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' }); 
                }
            }
        }
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })  //hide saving spinner
        
        customEvent.trigger('glossaryFootnoteSave', response.data.id); 
       

    }).catch(error => {
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        console.log("updateElement Api fail", error);
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })   //hide saving spinner
    })
}

function updateLOInStore(updatedData, versionedData, getState, dispatch) {
    console.log("updateLOInStore")
    let parentData = getState().appStore.slateLevelData;
    let newslateData = JSON.parse(JSON.stringify(parentData));
    if(versionedData){
        let _slateObject = Object.values(newslateData)[0];
    let { contents: _slateContent } = _slateObject;
    let { bodymatter: _slateBodyMatter } = _slateContent;
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
function updateStoreInCanvas(updatedData, asideData, parentUrn,dispatch, getState, versionedData, elementIndex, showHideType, parentElement){
    //direct dispatching in store
    let parentData = getState().appStore.slateLevelData;
    let newslateData = JSON.parse(JSON.stringify(parentData));
    let _slateObject = newslateData[updatedData.slateUrn];
   
    // let _slateObject = Object.values(newslateData)[0];
    let { contents: _slateContent } = _slateObject;
    let { bodymatter: _slateBodyMatter } = _slateContent;
    let elementId = updatedData.id;
    if(!versionedData) {
        _slateBodyMatter = _slateBodyMatter.map(element => {
            if (element.id === elementId) {
               
                if(element.type !== "openerelement"){
                    element  = {
                        ...element,
                        ...updatedData,
                        elementdata : {
                            ...element.elementdata,
                            text : updatedData.elementdata?updatedData.elementdata.text:null
                        },
                        tcm : _slateObject.tcm?true:false,
                        html : updatedData.html
                    };
                }
                else{
                    element  = {
                        ...element,
                        ...updatedData,
                        tcm : _slateObject.tcm?true:false,
                        html : updatedData.html
                    };
                }
            }else if(asideData && asideData.type == 'element-aside'){
                if(element.id == asideData.id){
                   let nestedBodyMatter =  element.elementdata.bodymatter.map((nestedEle)=>{
                        /*This condition add object of element in existing element  in aside */
                        if(nestedEle.id == elementId) {
                            nestedEle  = {
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
                        else if(nestedEle.type === "popup"){
                            if(nestedEle.popupdata["formatted-title"]["id"] === elementId){
                                nestedEle  = {
                                    ...nestedEle,
                                    popupdata : {
                                        ...nestedEle.popupdata,
                                        "formatted-title" : {...updatedData}
                                    }
                                };
                            } else if(nestedEle.popupdata["formatted-subtitle"]["id"] === elementId){
                                nestedEle  = {
                                    ...nestedEle,
                                    popupdata : {
                                        ...nestedEle.popupdata,
                                        "formatted-subtitle" : {...updatedData}
                                    }
                                };
                            } else if(nestedEle.popupdata.postertextobject[0].id === elementId){
                                nestedEle  = {
                                    ...nestedEle,
                                    popupdata : {
                                        ...nestedEle.popupdata,
                                        postertextobject : [{...updatedData}]
                                    }
                                };
                            }
                        }else if(nestedEle.type == "showhide" && showHideType){
                            nestedEle.interactivedata[showHideType].map((showHideData,index)=>{
                                if(showHideData.id == updatedData.id){
                                    showHideData.elementdata.text =  updatedData.elementdata.text;
                                    showHideData.html = updatedData.html;
                                }
                            })
                        }
                         else if(nestedEle.type == "manifest" && nestedEle.id == parentUrn.manifestUrn) {
                            /*This condition add object of element in existing element  in section of aside */
                            let elementObject =  nestedEle.contents.bodymatter.map((ele)=>{
                                if(ele.id == elementId) {
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
                                else if(ele.type === "popup"){
                                    if(ele.popupdata["formatted-title"]["id"] === elementId){
                                        ele  = {
                                            ...ele,
                                            popupdata : {
                                                ...ele.popupdata,
                                                "formatted-title" : {...updatedData}
                                            }
                                        };
                                    } else if(ele.popupdata["formatted-subtitle"]["id"] === elementId){
                                        ele  = {
                                            ...ele,
                                            popupdata : {
                                                ...ele.popupdata,
                                                "formatted-subtitle" : {...updatedData}
                                            }
                                        };
                                    } else if(ele.popupdata.postertextobject[0].id === elementId){
                                        ele  = {
                                            ...ele,
                                            popupdata : {
                                                ...ele.popupdata,
                                                postertextobject : [{...updatedData}]
                                            }
                                        };
                                    }
                                }else if(ele.type == "showhide" && showHideType){
                                    ele.interactivedata[showHideType].map((showHideData,index)=>{
                                        if(showHideData.id == updatedData.id){
                                            showHideData.elementdata.text =  updatedData.elementdata.text;
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
            else if(element.type === "popup"){
                if(element.popupdata["formatted-title"]["id"] === elementId){
                    element  = {
                        ...element,
                        popupdata : {
                            ...element.popupdata,
                            "formatted-title" : {...updatedData}
                        }
                    };
                } else if(element.popupdata["formatted-subtitle"]["id"] === elementId){
                    element  = {
                        ...element,
                        popupdata : {
                            ...element.popupdata,
                            "formatted-subtitle" : {...updatedData}
                        }
                    };
                } else if(element.popupdata.postertextobject[0].id === elementId){
                    element  = {
                        ...element,
                        popupdata : {
                            ...element.popupdata,
                            postertextobject : [{...updatedData}]
                        }
                    };
                }
            }
            else if(element.type === "showhide"){
                if(showHideType){
                    element.interactivedata[showHideType].forEach((showHideElement, index) => {
                        if(showHideElement.id === elementId){
                            showHideElement = {...updatedData}
                            element.interactivedata[showHideType][index] = showHideElement
                        }
                    })
                }
                
            }
            return element
        })
        _slateContent.bodymatter = _slateBodyMatter
        _slateObject.contents = _slateContent

        //console.log("saving new data dispatched")
        return dispatch({
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: newslateData
            }
        })
    } else if(versionedData){
        if (updatedData && updatedData.pageNumberRef) {
            versionedData.pageNumberRef = updatedData.pageNumberRef
        }
        let indexes = elementIndex && elementIndex.length > 0 ? elementIndex.split('-') : 0;
            if(asideData && asideData.type == 'element-aside'){
                asideData.indexes = indexes;
                if(indexes.length === 2 || indexes.length === 3){
                    dispatch(fetchSlateData(asideData.id, asideData.contentUrn, 0, asideData));
                // }else if(indexes.length === 3){
                //     dispatch(fetchSlateData(asideData.id,asideData.contentUrn, 0, asideData));
                }
            } 
            else if(parentElement && parentElement.type === "popup" && updatedData.popupEntityUrn && (updatedData.updatePopupElementField || updatedData.section === "postertextobject") ){
                dispatch(fetchSlateData(updatedData.slateUrn, updatedData.slateEntity, 0)); }
            else if(parentElement && parentElement.type === "showhide"){
                parentElement.indexes =elementIndex;
                dispatch(fetchSlateData(parentElement.id, parentElement.contentUrn, 0, parentElement)); 
            }
            else {
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
    //diret dispatching in store
}

export const updateFigureData = (figureData, elementIndex, elementId, cb) => (dispatch, getState) => {
    let parentData = getState().appStore.slateLevelData,
        element,
        index = elementIndex;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter;
    // let bodymatter = parentData[config.slateManifestURN].contents.bodymatter;
    if (typeof (index) == 'number') {
        if (newBodymatter[index].versionUrn == elementId) {
            if (newBodymatter[index].figuretype === "assessment") {
                newBodymatter[index].figuredata['elementdata'] = figureData
                element = newBodymatter[index]
            } else {
                newBodymatter[index].figuredata = figureData
                element = newBodymatter[index]
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
                    element = newBodymatter[index]
                } else {
                    newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata = figureData
                    element = condition
                }
            }
        } else if (indexesLen == 3) {
            condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
            if (condition.versionUrn == elementId) {
                if (newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuretype === "assessment") {
                    newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata['elementdata'] = figureData
                    element = condition
                } else {
                    newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata = figureData
                    element = condition
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

export const getTableEditorData = (elementId) => (dispatch, getState) => {
    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
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
        let status = response.data[elementId].status
        if (status === 'wip') {
            newParentData[config.slateManifestURN].contents.bodymatter = updateTableEditorData(elementId, response.data[elementId], newParentData[config.slateManifestURN].contents.bodymatter)
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        } else if (status === 'approved') {
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
        }
        
        return dispatch({
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: newParentData
            }
        })
    }).catch(error => {
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        console.log("getTableEditorData Api fail", error);
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

export const createShowHideElement = (elementId, type, index,parentContentUrn , cb) => (dispatch, getState) => {
    localStorage.setItem('newElement', 1);
    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
    let newIndex = index.split("-")
    let newShowhideIndex = parseInt(newIndex[newIndex.length-1])+1
    let _requestData = {
        "projectUrn": config.projectUrn,
        "slateEntityUrn": parentContentUrn,
        "slateUrn":  elementId,
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
        dispatch({
            type: CREATE_SHOW_HIDE_ELEMENT,
            payload: {
                slateLevelData: newParentData,
                showHideId: createdElemData.data.id
            }
        })
        if(cb){
            cb(true);
        }  
    }).catch(error => {
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        console.log("error while createing element",error)
    })
}

export const deleteShowHideUnit = (elementId, type, parentUrn, index,eleIndex,parentId,cb) => (dispatch, getState) => {
    let _requestData = {
        projectUrn : config.projectUrn,
        entityUrn : parentUrn,
        workUrn : elementId,
        index : index.toString(),
        slateEntity : config.slateEntityURN
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
        if(cb){
            cb(true);
        } 
        dispatch({
            type: DELETE_SHOW_HIDE_ELEMENT,
            payload: {
                slateLevelData: newParentData,
            }
        })
  
    }).catch(error => {
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        console.log("error while createing element",error)
    })
}
