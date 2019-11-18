import axios from 'axios';
import config from '../../config/config';
import { HideLoader } from '../../constants/IFrameMessageTypes.js';
import { sendDataToIframe } from '../../constants/utility.js';

import { ADD_COMMENT, DELETE_ELEMENT, AUTHORING_ELEMENT_CREATED, ADD_NEW_COMMENT, AUTHORING_ELEMENT_UPDATE, SET_OLD_IMAGE_PATH } from "./../../constants/Action_Constants";

export const addComment = (commentString, elementId, asideData, parentUrn) => (dispatch, getState) => {
    let url = `${config.STRUCTURE_API_URL}/narrative/v2/${elementId}/comment/`
    let newComment = {
        comment: commentString,
        commentCreator: config.userId,
        assignee: config.assignee
    };

    let Comment = {
        commentType: "comment",
        commentDateTime: new Date().toISOString(),
        commentAssignee: config.userId,
        commentCreator: config.userId,
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
            const element = _slateBodyMatter.map(element => {
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



export const deleteElement = (elmId, type, parentUrn, asideData, contentUrn) => (dispatch, getState) => {

    const prepareDeleteRequestData = (type) => {
        switch (type) {
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
            bodymatter.forEach((element, index) => {
                if (element.id === elmId) {
                    bodymatter.splice(index, 1);
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
/**
 * API to update the element data
 * @param {*} updatedData the updated content
 * @param {*} elementIndex index of the element on the slate
 */
export const updateElement = (updatedData, elementIndex, parentUrn, asideData) => (dispatch, getState) => {
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
        let newslateData = JSON.parse(JSON.stringify(parentData));
        let _slateObject = Object.values(newslateData)[0];
        let { contents: _slateContent } = _slateObject;
        let { bodymatter: _slateBodyMatter } = _slateContent;
        let elementId = updatedData.id

        _slateBodyMatter = _slateBodyMatter.map(element => {
            if (element.id === elementId) {
                element  = {
                    ...element,
                    ...response.data
                };
            }else if(asideData && asideData.type == 'element-aside'){
                if(element.id == asideData.id){
                   let nestedBodyMatter =  element.elementdata.bodymatter.map((nestedEle)=>{
                        /*This condition add object of element in existing element  in aside */
                        if(nestedEle.id == elementId){
                            nestedEle  = {
                                ...nestedEle,
                                ...response.data
                            };
                        }else if(nestedEle.type == "manifest" && nestedEle.id == parentUrn.manifestUrn){
                              /*This condition add object of element in existing element  in section of aside */
                           let ele =  nestedEle.contents.bodymatter.map((ele)=>{
                                if(ele.id == elementId){
                                    ele = {
                                        ...ele,
                                        ...response.data
                                    };
                                }
                                return ele
                            })
                            nestedEle.contents.bodymatter = ele;
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
        dispatch({
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: newslateData
            }
        })
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })  //hide saving spinner

    }).catch(error => {
        console.log("updateElement Api fail", error);
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })   //hide saving spinner
    })
}

export const updateFigureData = (figureData, elementIndex, elementId,cb) => (dispatch, getState) => {
    let parentData = getState().appStore.slateLevelData,
        element,
        interactiveImage = "",
        oldPath,
        index = elementIndex;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    let  newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter,
       bodymatter = parentData[config.slateManifestURN].contents.bodymatter;
      if (typeof (index) == 'number') {
        if (newBodymatter[index].versionUrn == elementId) {
            if(newBodymatter[index].figuretype==="assessment"){
                newBodymatter[index].figuredata['elementdata'] = figureData
                element = newBodymatter[index]
            }else{
                newBodymatter[index].figuredata = figureData
                oldPath = bodymatter[index].figuredata
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
                    oldPath =  bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata.path
                    element = condition
                }
            }
        } else if (indexesLen == 3) {
            condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
            if (condition.versionUrn == elementId) {
                if(newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuretype === "assessment"){
                    newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata['elementdata'] = figureData
                    oldPath =   bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata.path
                    element = condition
                }else{
                    newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata = figureData
                    oldPath =   bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata.path
                    element = condition
                }

            }
        }
      }
    dispatch({
        type: SET_OLD_IMAGE_PATH,
        payload: {
            oldImage: oldPath 
        }
    })
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