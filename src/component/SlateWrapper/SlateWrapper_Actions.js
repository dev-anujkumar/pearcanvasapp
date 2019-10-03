import axios from 'axios';
import config from '../../config/config';
import {
    AUTHORING_ELEMENT_CREATED,
    VIDEO_ELEMENT_CREATED
    ,FIGURE_ELEMENT_CREATED,
    INTERACTIVE_ELEMENT_CREATED,
    FETCH_SLATE_DATA,
    SWAP_ELEMENT
} from '../../constants/Action_Constants';
import {elementAside,elementAsideWorkExample,elementWorkExample} from '../../../fixtures/elementAsideData';
import { sendDataToIframe } from '../../constants/utility.js';
import { HideLoader} from '../../constants/IFrameMessageTypes.js';
Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };

export const createElement = (type, index) => (dispatch, getState) => {
    config.currentInsertedIndex = index;
    config.currentInsertedType = type;
    let _requestData = {
        "projectUrn": config.projectUrn,
        "slateEntityUrn": config.slateEntityURN,
        "slateUrn": config.slateManifestURN,
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
        if(type == "workedexample"){
            createdElementData = elementWorkExample
        }
     /*    if(type == "element-aside"){
            createdElementData = elementAside
        } */
        newParentData[config.slateManifestURN].contents.bodymatter.splice(index, 0, createdElementData);
        

        dispatch({
            type: AUTHORING_ELEMENT_CREATED,
            payload: {
                slateLevelData: newParentData
            }
        })

    }).catch(error => {
        
        console.log("create Api fail", error);
    }) 
};


export const swapElement = (dataObj,cb) => (dispatch, getState) => {
    const {oldIndex, newIndex, currentSlateEntityUrn, swappedElementData, workedExample} = dataObj;
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
            
        /* For hiding the spinning loader send HideLoader message to Wrapper component */
        sendDataToIframe({'type': HideLoader,'message': { status: false }})
            
        const parentData = getState().appStore.slateLevelData;
        let newParentData = JSON.parse(JSON.stringify(parentData));
        newParentData[slateId].contents.bodymatter.move(oldIndex, newIndex);
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