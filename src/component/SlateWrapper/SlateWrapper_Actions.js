import axios from 'axios';
import config from '../../config/config';
import {
    AUTHORING_ELEMENT_CREATED,
    VIDEO_ELEMENT_CREATED
    ,FIGURE_ELEMENT_CREATED,
    INTERACTIVE_ELEMENT_CREATED,
    FETCH_SLATE_DATA
} from '../../constants/Action_Constants';
import {elementAside,elementAsideWorkExample,elementWorkExample} from '../../../fixtures/elementAsideData';
import { sendDataToIframe } from '../../constants/utility.js';
import { HideLoader} from '../../constants/IFrameMessageTypes.js';
Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };
let headers = {
    "Content-Type": "application/json",
    ApiKey: "Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld",//STRUCTURE_APIKEY,
    PearsonSSOSession: config.ssoToken,
}
export const createElement = (type, index) => (dispatch, getState) => {
    config.currentInsertedIndex = index;
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
        for (let key in newParentData) {
                newParentData[key].contents.bodymatter.splice(index, 0, createdElementData);
        }

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
    const {oldIndex, newIndex, currentSlateEntityUrn, swappedElementData,slateId} = dataObj;
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
        let newArr = [];
       // for (let key in newParentData) {

            //for (let k in newParentData[key]) {
                // newParentData[key][k].contents.bodymatter.splice(index, 0, createdElemData.data);
               // newArr = newParentData[key].contents.bodymatter//.splice(newIndex, 0, swappedElementData);

            //    try{
                // [newParentData[key].contents.bodymatter[newIndex], newParentData[key].contents.bodymatter[oldIndex]] = [newParentData[key].contents.bodymatter[oldIndex], newParentData[key].contents.bodymatter[newIndex]];
            //    }
            //    catch(e){
            //        console.log('Error while swapping', e)
            //    }

            //    for(let i in newArr){
            //         if(newArr[i].type == 'element-aside' && newArr[i].id == currentSlateEntityUrn){
            //             //Swap inside WE
            //             // let weArr = newArr[i].elementdata.bodymatter
            //             [newArr[i].elementdata.bodymatter[newIndex], newArr[i].elementdata.bodymatter[oldIndex]] = [newArr[i].elementdata.bodymatter[oldIndex], newArr[i].elementdata.bodymatter[newIndex]];
            //         }
            //    }
                newParentData = JSON.parse(JSON.stringify(newParentData));
                console.log('thsi is newArr', newArr, newParentData)

            //}
       // }
        dispatch({
            type: FETCH_SLATE_DATA,
            payload: {
                slateLevelData: newParentData
            }
        })
        cb();
        }
        console.log('this is response status from swap api', responseData.status)
        
    })
    .catch((err) => {
        console.log('Error occured while swaping element', err)
    })
}