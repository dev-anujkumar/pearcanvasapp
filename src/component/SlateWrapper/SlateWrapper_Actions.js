import axios from 'axios';
import config from '../../config/config';
import {
    AUTHORING_ELEMENT_CREATED,
    SWAP_ELEMENT,
    SET_SPLIT_INDEX
} from '../../constants/Action_Constants';
import {elementAside,elementAsideWorkExample,elementWorkExample} from '../../../fixtures/elementAsideData';
import { sendDataToIframe } from '../../constants/utility.js';
import { HideLoader,NextSlate} from '../../constants/IFrameMessageTypes.js';

const openerData = {
    "type": "chapterintro",
    "subtype": "chapteropener",
    "id": "urn:pearson:manifest:0fd35c2b-d70c-40c4-8c46-d283203fce09",
    "schema": "http://schemas.pearson.com/wip-authoring/intro/1",
    "contents": {
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
        "title": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": "Chapter X: Opening Element Title",
            "textsemantics": [
                {
                    "type": "label",
                    "charStart": 0,
                    "charEnd": 7
                },
                {
                    "type": "number",
                    "charStart": 8,
                    "charEnd": 10
                }
            ]
        }
    }
}

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };

export const createElement = (type, index,parentUrn) => (dispatch, getState) => {
    config.currentInsertedIndex = index;
    config.currentInsertedType = type;
    let _requestData = {
        "projectUrn": config.projectUrn,
        "slateEntityUrn": parentUrn && parentUrn.contentUrn || config.slateEntityURN ,
        "slateUrn": parentUrn &&  parentUrn.manifestUrn|| config.slateManifestURN,
        "index": index,
        "type": type
    };
    
     axios.post(`${config.REACT_APP_API_URL}v1/slate/element`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(createdElemData => {   
        sendDataToIframe({'type': HideLoader,'message': { status: false }})
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        let createdElementData = createdElemData.data;
        if(createdElementData.type == 'manifest'){
            newParentData[config.slateManifestURN].contents.bodymatter.map( (item)=> {
                if(item.id == parentUrn.manifestUrn){
                    item.elementdata.bodymatter.splice(index, 0, createdElementData)
                }
            })   
        }else{
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
        if(type == "OPENER"){
            sendDataToIframe({'type': HideLoader,'message': { status: false }})
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
        console.log("create Api fail", error);
    }) 
};


export const swapElement = (dataObj, cb) => (dispatch, getState) => {
    const {oldIndex, newIndex, currentSlateEntityUrn, swappedElementData, workedExample, swappedElementId} = dataObj;
    const slateId = config.slateManifestURN;
    
    let _requestData = {
                "projectUrn": config.projectUrn,
                "currentSlateEntityUrn":currentSlateEntityUrn ? currentSlateEntityUrn : config.slateEntityURN,
                "destSlateEntityUrn":config.slateEntityURN,
                "workUrn":swappedElementData.id,
                "entityUrn":swappedElementData.contentUrn,
                "type": swappedElementData.type,
                "index": newIndex
            }
            config.swappedElementType = _requestData.type;
            config.swappedElementIndex = _requestData.index;

    axios.post(`${config.REACT_APP_API_URL}v1/slate/swap`,
    JSON.stringify(_requestData),
    {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    })
    .then((responseData) =>{
        if(responseData && responseData.status == '200'){
       
        //Remove old tinymce instance to hide multiple toolbar
       
       
        // document.getElementById(activeEditorIdTiny).focus();
        
        // else if(config.currentInsertedType === "IMAGE" || config.currentInsertedType === "VIDEO" || config.currentInsertedType === "INTERACTIVE"){
        //     document.getElementById("cypress-"+config.currentInsertedIndex+"-0").focus();
        // }

        /* For hiding the spinning loader send HideLoader message to Wrapper component */
        sendDataToIframe({'type': HideLoader,'message': { status: false }})
            
        const parentData = getState().appStore.slateLevelData;
        let newParentData = JSON.parse(JSON.stringify(parentData));
        newParentData[slateId].contents.bodymatter.move(oldIndex, newIndex);
        console.log('this is data of old elemenet', newParentData[slateId].contents.bodymatter[oldIndex]);

        // let newBodymatter = newParentData[slateId].contents.bodymatter;
        if(workedExample){
            //swap WE element
            // for(let i in newBodymatter){
            //     if(newBodymatter[i].type == 'element-aside' && newBodymatter[i].id == currentSlateEntityUrn){
            //         //Swap inside WE
            //         // let weArr = newArr[i].elementdata.bodymatter
            //         [newArr[i].elementdata.bodymatter[newIndex], newArr[i].elementdata.bodymatter[oldIndex]] = [newArr[i].elementdata.bodymatter[oldIndex], newArr[i].elementdata.bodymatter[newIndex]];
            //     }
            // }
        }
     
            
        newParentData = JSON.parse(JSON.stringify(newParentData));
        dispatch({
            type: SWAP_ELEMENT,
            payload: {
                slateLevelData: newParentData
            }
        })

 
        cb(newParentData)
        }
        
    })
    .catch((err) => {
        console.log('Error occured while swaping element', err)
    })
}

export const setSplittedElementIndex = (index) => (dispatch, getState) => {
    return dispatch({
        type : SET_SPLIT_INDEX,
        payload : index
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
    let oldSlateBodymatter = getState().appStore.slateLevelData[config.slateManifestURN].contents.bodymatter
    let newSlateBodymatter = oldSlateBodymatter.splice(splitIndex)

    oldSlateBodymatter.forEach((oldSlateBody)=>{
        oldSlateData.contents.bodymatter.push({
            type: oldSlateBody.type,
            id: oldSlateBody.id
        })
    })
    newSlateBodymatter.forEach((newSlateBody)=>{
        newSlateData.contents.bodymatter.push({
            type: newSlateBody.type,
            id: newSlateBody.id
        })
    })
    slateDataList.push(oldSlateData, newSlateData)

    return axios.put(
        `${config.REACT_APP_API_URL}v1/slate/split/${config.projectUrn}`,
        JSON.stringify({slateDataList}),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            } 
        }
    ).then(res =>{
        sendDataToIframe({'type': NextSlate,'message': {}})
    }).catch(error =>{
        console.log("SPLIT SLATE API ERROR : ", error)
    })
}