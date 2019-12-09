import axios from 'axios';
import config from '../../config/config';
import { ShowLoader,HideLoader } from '../../constants/IFrameMessageTypes.js';
import { sendDataToIframe } from '../../constants/utility.js';
import { ADD_COMMENT, AUTHORING_ELEMENT_CREATED, ADD_NEW_COMMENT, AUTHORING_ELEMENT_UPDATE } from "./../../constants/Action_Constants";

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
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
            console.log("Failed to add comment", error);
        })
}

export const deleteElement = (elmId, type, parentUrn, asideData, contentUrn, index) => (dispatch, getState) => {

    const prepareDeleteRequestData = (elementType) => {
        switch (elementType) {
            case "element-workedexample":
            case "element-aside":
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
    _requestData = {..._requestData, index: indexToBeSent.toString().split('-')[indexToBeSent.toString().split('-').length - 1] }
    prepareDataForTcmUpdate(_requestData, elmId, index, asideData, getState);

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
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        console.log("delete Api fail", error);
    })
}

function prepareDataForTcmUpdate (updatedData,id, elementIndex, asideData, getState) {
    let indexes = elementIndex && elementIndex.length > 0 ? elementIndex.split('-') : 0;
    let storeData = getState().appStore.slateLevelData;
    let slateData = JSON.parse(JSON.stringify(storeData));
    let slateBodyMatter = slateData[config.slateManifestURN].contents.bodymatter;
    if(indexes.length === 2){
        if(slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].id === id){
            updatedData.isHead = true;
        }
    }else if(indexes.length === 3){
        if(slateBodyMatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].id === id){
            updatedData.isHead = false;
        }
    }
    if(asideData && asideData.type === "element-aside"){
        if(asideData.subtype === "workedexample"){
            updatedData.parentType = "workedexample";
        }else{
            updatedData.parentType = "element-aside";
        }
    }
    updatedData.projectURN = config.projectUrn;
    updatedData.slateEntity = config.slateEntityURN;
}

/**
 * API to update the element data
 * @param {*} updatedData the updated content
 * @param {*} elementIndex index of the element on the slate
 */
export const updateElement = (updatedData, elementIndex, parentUrn, asideData) => (dispatch, getState) => {
    prepareDataForTcmUpdate(updatedData,updatedData.id, elementIndex, asideData, getState);
    updateStoreInCanvas(updatedData, asideData, parentUrn, dispatch, getState)
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
        if(config.slateManifestURN === updatedData.slateUrn){  //Check applied so that element does not gets copied to next slate while navigating
            if(response.data.id !== updatedData.id){
                if(currentSlateData.status === 'wip'){
                    updateStoreInCanvas(updatedData, asideData, parentUrn, dispatch, getState, response.data, elementIndex, 'Directupdate');
                }else if(currentSlateData.status === 'approved'){
                    sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' }); 
                }
            }else{
                updateStoreInCanvas(updatedData, asideData, parentUrn, dispatch, getState, response.data, elementIndex);
            }
        }  
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })  //hide saving spinner

    }).catch(error => {
        console.log("updateElement Api fail", error);
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })   //hide saving spinner
    })

}

function updateStoreInCanvas(updatedData, asideData, parentUrn,dispatch, getState, versionedData, elementIndex ,Directupdate ){
    //direct dispatching in store
    let parentData = getState().appStore.slateLevelData;
    let newslateData = JSON.parse(JSON.stringify(parentData));
    let _slateObject = Object.values(newslateData)[0];
    let { contents: _slateContent } = _slateObject;
    let { bodymatter: _slateBodyMatter } = _slateContent;
    let elementId = updatedData.id;
    if(!versionedData) {
        _slateBodyMatter = _slateBodyMatter.map(element => {
            if (element.id === elementId) {
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
            } else if(asideData && asideData.type == 'element-aside') {
                if(element.id == asideData.id) {
                    let nestedBodyMatter =  element.elementdata.bodymatter.map((nestedEle)=>{
                        /*This condition add object of element in existing element  in aside */
                        if(nestedEle.id == elementId) {
                            nestedEle  = {
                                ...nestedEle,
                                ...updatedData,
                                elementdata : {
                                    ...nestedEle.elementdata,
                                    text : updatedData.elementdata?updatedData.elementdata.text:null
                                },
                                tcm : _slateObject.tcm?true:false,
                                html : updatedData.html
                            };
                        } else if(nestedEle.type == "manifest" && nestedEle.id == parentUrn.manifestUrn) {
                            /*This condition add object of element in existing element  in section of aside */
                            let element =  nestedEle.contents.bodymatter.map((ele)=>{
                                if(ele.id == elementId) {
                                    ele = {
                                        ...ele,
                                        ...updatedData,
                                        elementdata : {
                                            ...ele.elementdata,
                                            text : updatedData.elementdata?updatedData.elementdata.text:null
                                        },
                                        tcm : _slateObject.tcm?true:false,
                                        html : updatedData.html
                                    };
                                }
                                return ele;
                            })
                            nestedEle.contents.bodymatter = element;
                        }
                        return nestedEle;
                    })
                    element.elementdata.bodymatter = nestedBodyMatter;
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
        let indexes = elementIndex && elementIndex.length > 0 ? elementIndex.split('-') : 0;
        if(Directupdate === 'Directupdate'){
            if(asideData && asideData.type == 'element-aside'){
                if(indexes.length === 2){
                    newslateData[config.slateManifestURN].contents.bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]] = versionedData;
                }else if(indexes.length === 3){
                    newslateData[config.slateManifestURN].contents.bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]] = versionedData;
                }
            }else{
                newslateData[config.slateManifestURN].contents.bodymatter[elementIndex] = versionedData;
            }
        }else if(asideData && asideData.type == 'element-aside' && updatedData.status === 'approved'){
           axios.get(`${config.ASSET_POPOVER_ENDPOINT}context/v2/${config.projectUrn}/ancestors/${updatedData.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "PearsonSSOSession": config.ssoToken
                }
            }).then(ancestorData => {
                if(indexes.length === 2){
                    if(ancestorData.ancestor.versionUrn !== parentUrn.manifestUrn){
                        sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
                    }
                }else if(indexes.length === 3){
                    if(ancestorData.ancestor.ancestor.versionUrn !== asideData.id){
                        sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
                    }
                }
            }).catch(err => {
                console.log('axios Error', err);
            })         
        }
        // else{
        //     newslateData[config.slateManifestURN].contents.bodymatter[elementIndex] = versionedData;
        // }
        return dispatch({
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: newslateData
            }
        })
    }
//diret dispatching in store
}

export const updateFigureData = (figureData, elementIndex, elementId,cb) => (dispatch, getState) => {
    let parentData = getState().appStore.slateLevelData,
        index = elementIndex;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    let  newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter;
    let bodymatter = parentData[config.slateManifestURN].contents.bodymatter;
    if (typeof (index) == 'number') {
        if (newBodymatter[index].versionUrn == elementId) {
            if(newBodymatter[index].figuretype==="assessment"){
                newBodymatter[index].figuredata['elementdata'] = figureData
                element = newBodymatter[index]
            }else{
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
                if(newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuretype==="assessment"){
                    newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata['elementdata'] = figureData
                    element = newBodymatter[index]
                }else{
                    newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata = figureData
                    element = condition
                }
            }
        } else if (indexesLen == 3) {
            condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
            if (condition.versionUrn == elementId) {
                if(newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuretype === "assessment"){
                    newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata['elementdata'] = figureData
                    element = condition
                }else{
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

        newParentData[config.slateManifestURN].contents.bodymatter = updateTableEditorData(elementId, response.data[elementId], newParentData[config.slateManifestURN].contents.bodymatter)

        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        return dispatch({
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: newParentData
            }
        })
    }).catch(error => {
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