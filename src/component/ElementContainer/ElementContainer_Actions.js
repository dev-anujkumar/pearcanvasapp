import axios from 'axios';
import config from '../../config/config';
import { HideLoader } from '../../constants/IFrameMessageTypes.js';
import { sendDataToIframe } from '../../constants/utility.js';

import { ADD_COMMENT, DELETE_ELEMENT, AUTHORING_ELEMENT_CREATED, ADD_NEW_COMMENT ,AUTHORING_ELEMENT_UPDATE, SET_OLD_IMAGE_PATH, SET_INTERACTIVE_IMAGE_PATH } from "./../../constants/Action_Constants";

export const addComment = (commentString, elementId,asideData,parentUrn) => (dispatch, getState) => {
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
        commentUrn:""
    }
    newComment = JSON.stringify(newComment);
    return axios.post(url, newComment,
        { headers: {
            "Content-Type": "application/json",
            ApiKey: config.STRUCTURE_APIKEY,
            PearsonSSOSession: config.ssoToken,
        
        } }
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
                }else if(asideData && asideData.type == 'element-aside'){
                    if(element.id == asideData.id){
                        element.elementdata.bodymatter.map((nestedEle)=>{
                            /*This condition add comment in element in aside */
                            if(nestedEle.id == elementId){
                                nestedEle['comments'] = true;
                            }else if(nestedEle.type == "manifest" && nestedEle.id == parentUrn.manifestUrn){
                                  /*This condition add comment in element in section of aside */
                                nestedEle.contents.bodymatter.map((ele)=>{
                                    if(ele.id == elementId){
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
        switch (type){
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
            /*    for (let i = 0; i < newParentData[config.slateManifestURN].contents.bodymatter.length; i++) {
                   let workUrn = newParentData[config.slateManifestURN].contents.bodymatter[i].id;
                   if (workUrn === elmId) {
                       newParentData[config.slateManifestURN].contents.bodymatter.splice(i, 1);
                   }
               } */
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
export const updateElement = (updatedData,elementIndex) => (dispatch, getState) => {
    return axios.put(`${config.REACT_APP_API_URL}v1/slate/element`,
        updatedData,
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(response =>{
        let parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        newParentData[config.slateManifestURN].contents.bodymatter[elementIndex]=response.data;
        dispatch({
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: newParentData
            }
        })
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })  //hide saving spinner

    }).catch(error => {
        console.log("updateElement Api fail", error);
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })   //hide saving spinner
    }) 
}

export const updateFigureData = (figureData, elementIndex, cb) => (dispatch, getState) => {
    let parentData = getState().appStore.slateLevelData;
    let interactiveImage ="";
    const newParentData = JSON.parse(JSON.stringify(parentData));
    newParentData[config.slateManifestURN].contents.bodymatter[elementIndex].figuredata = figureData
    
    if(newParentData[config.slateManifestURN].contents.bodymatter[elementIndex].figuredata.interactivetype  ==='video-mcq' ){
        if(parentData[config.slateManifestURN].contents.bodymatter[elementIndex].figuredata.posterimage){
            interactiveImage =parentData[config.slateManifestURN].contents.bodymatter[elementIndex].figuredata['posterimage'].path;
        }else{
            interactiveImage ='';
        }
        dispatch({
            type: SET_INTERACTIVE_IMAGE_PATH,
            payload: {
                oldImage: interactiveImage
            }
        })
    }else{
        dispatch({
            type: SET_OLD_IMAGE_PATH,
            payload: {
                oldImage: parentData[config.slateManifestURN].contents.bodymatter[elementIndex].figuredata.path
            }
        })
    }
    dispatch({
        type: AUTHORING_ELEMENT_UPDATE,
        payload: {
            slateLevelData: newParentData
        }
    })
    setTimeout(()=>{
        cb();
    },300)
}