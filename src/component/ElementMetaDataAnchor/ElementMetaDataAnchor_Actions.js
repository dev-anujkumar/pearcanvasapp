import axios from 'axios';
import config from '../../config/config';
import {
    AUTHORING_ELEMENT_CREATED,
    SWAP_ELEMENT,
    SET_SPLIT_INDEX
} from '../../constants/Action_Constants';
import { sendDataToIframe } from '../../constants/utility.js';
import { HideLoader,NextSlate} from '../../constants/IFrameMessageTypes.js';

export const currentSlateLO = (currentSlateLOData) =>  (dispatch, getState) => {
    return dispatch({
        type: 'CURRENT_SLATE_LO_DATA',
        payload: {
            currentSlateLOData: currentSlateLOData,
        }
    })
}
export const getLOList = (projectURN,chapterURN,cb) =>{
    try{
        axios.get(config.ASSET_POPOVER_ENDPOINT + `v2/${projectURN}/containers/${chapterURN}/learningobjectives`, {
                headers: {
                    "ApiKey": config.STRUCTURE_APIKEY,
                    "Content-Type": "application/json",
                    'PearsonSSOSession': getDocumentCookies().PearsonSSOSession,
                    "x-Roles": "LearningAdmin"
                }
            }).then(response => {
                if(response.data.contents.bodyMatter.length > 0 ){
                    console.log("LOL data",response.data.contents.bodyMatter);
                    let recAttachedLos= [];
                    let attachedLos = recursivedata(response.data, recAttachedLos);
                    dispatch({
                        type: CURRENT_SLATE_LO_DATA,
                        currentSlateLOData: attachedLos
                    })
                }
                else{
                    dispatch({
                        type: CURRENT_SLATE_LO_DATA,
                        currentSlateLOData: ""
                    })
                }

            }).catch(error => {
                dispatch({
                    type: CURRENT_SLATE_LO_DATA,
                    currentSlateLOData: ""
                })
            })
       } 
       catch(error){
        cb(false);
       }
}
function recursivedata(response, recAttachedLos){
    let moduleArray = [];
    let count=0;
    let allowedOpeners = ["section", "assessment", "container-introduction"];
    if(response.label === "chapter" || response.label === "module" || response.label === "part"){
        if(response.label === "module"){
            if(response.unformattedTitle){
                moduleArray.push("<span class='moduleContainer'><h3 class='moduleName'>"+response.unformattedTitle.en+ "</h3>")}
                
        }
        response['contents']['bodyMatter'] && response['contents']['bodyMatter'].forEach((item, index) => {
            if(allowedOpeners.findIndex(itemLabel => itemLabel === item.label) > -1){
                if(item.learningObjectives.length > 0){
                    if(moduleArray.length !==0){
                        if(count == 0)
                    recAttachedLos.push(moduleArray);
                    count++;
                    }
                    let learningObjectives = item.learningObjectives;
                    let latestLearningObjectives = learningObjectives[0];
                    latestLearningObjectives.label.en = latestLearningObjectives.label.en.replace(/<math.*?data-src=\'(.*?)\'.*?<\/math>/g, "<img src='$1'></img>");
                    recAttachedLos.push("<span class='learningObjectiveData '>"+latestLearningObjectives.label.en+ "</span>")
                }
            }
            if(response['contents']['bodyMatter'].length == count){
                if(moduleArray.length !==0){
                recAttachedLos.push("</span>")
                }
            }
            else{
                recursivedata(item, recAttachedLos);
             }
        })
    }
    return recAttachedLos;
}