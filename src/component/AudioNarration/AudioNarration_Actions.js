import axios from 'axios'
import config from '../../config/config.js'
import store from '../../appstore/store.js'
import {
     HANDLE_GLOSSARY_AUDIO_DATA,
    ADD_AUDIO_GLOSSARY_POPUP,
    OPEN_AUDIO_GLOSSARY_POPUP,
    OPEN_AUDIO_NARRATION,
    SHOW_REMOVE_POPUP,
    SPLIT_REMOVE_POPUP , CURRENT_SLATE_AUDIO_NARRATION , ADD_AUDIO_NARRATION , WRONG_AUDIO_REMOVE_POPUP, ERROR_POPUP
} from '../../constants/Action_Constants.js'
import { hideTocBlocker } from '../../js/toggleLoader'
/**
 * 
 * @param {*} value 
 */

export const showAudioRemovePopup = (value,isGlossary) => (dispatch, getState) => {
    dispatch({
        type: SHOW_REMOVE_POPUP,
        payload:{
            value:value,
            isGlossary:isGlossary
        } 
    })
}

export const audioGlossaryPopup =(value,positions) => (dispatch)=>{
    dispatch({
        type : OPEN_AUDIO_GLOSSARY_POPUP,
        payload:{
            value:value,
            positions:positions
        }
    })
}

export const showAudioSplitPopup = (value,index) => (dispatch, getState) => {
    dispatch({
        type: SPLIT_REMOVE_POPUP,
        payload: {
            value: value,
            index : index
        }
    })
}
export const showWrongAudioPopup = (value) => (dispatch, getState) => {
    dispatch({
        type: WRONG_AUDIO_REMOVE_POPUP,
        payload: value
    })
}

function handleAudioActions(audioDatatype, audioData) {
    return dispatch => {
        dispatch({ type: ADD_AUDIO_GLOSSARY_POPUP, payload: audioDatatype })
        dispatch({ type: HANDLE_GLOSSARY_AUDIO_DATA, payload: audioData });
    }
}

function removeAudioActions(glossaryAudioData,addAudioPopup,openAudioPopup){
    return dispatch =>{
        dispatch({ type: HANDLE_GLOSSARY_AUDIO_DATA, payload: glossaryAudioData });
        dispatch({ type: ADD_AUDIO_GLOSSARY_POPUP, payload: addAudioPopup })
        dispatch({ type: OPEN_AUDIO_GLOSSARY_POPUP, payload: {openAudioGlossaryPopup:openAudioPopup} })
    }
}

/**
 * Method to get audio narration for container / state 
 * @param {object} slateData 
 */
export const fetchAudioNarrationForContainer = (slateData,isGlossary ='') => async(dispatch, getState) => {

    if (isGlossary) {
        if (slateData) {
            store.dispatch( handleAudioActions(false, slateData))
        }
        dispatch({ type: ADD_AUDIO_GLOSSARY_POPUP, payload: true })
    }
    else{
        let url = `${config.AUDIO_NARRATION_URL}context/v3/${slateData.currentProjectId}/container/${slateData.slateEntityUrn}/narrativeAudio`;
        try {
            let audioDataResponse = await axios.get(url,{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'ApiKey': config.AUDIO_API_KEY,
                    'PearsonSSOSession': config.ssoToken,
                }
            });
            if(audioDataResponse && audioDataResponse.data && audioDataResponse.status == 200){
                dispatch({ type: CURRENT_SLATE_AUDIO_NARRATION, payload: audioDataResponse.data});
                dispatch({ type: OPEN_AUDIO_NARRATION, payload: true })
                dispatch({ type: ADD_AUDIO_NARRATION, payload: false })
            }
            else {
                dispatch({ type: ADD_AUDIO_NARRATION, payload: true })
                dispatch({ type: OPEN_AUDIO_NARRATION, payload: false })
            }
    
        } catch (e){
            dispatch({ type: ADD_AUDIO_NARRATION, payload: true })
            dispatch({ type: OPEN_AUDIO_NARRATION, payload: false })
        }
    }

}

/**
 * Method to Delete audio narration for container / state 
 * @param {object} slateObject 
 */
export const deleteAudioNarrationForContainer = (isGlossary = null) => async(dispatch, getState) => {
    
    if(isGlossary){
        store.dispatch(removeAudioActions({},false,false))
    }
    else{
        var storeData = store.getState();
        let slateData = {
            currentProjectId: config.projectUrn,
            slateEntityUrn: config.slateEntityURN
        }
        var narrativeAudioUrn = storeData.audioReducer.audioData.data[0].narrativeAudioUrn
        let url = `${config.AUDIO_NARRATION_URL}context/v2/${slateData.currentProjectId}/container/${slateData.slateEntityUrn}/narrativeAudio/${narrativeAudioUrn}`;

        try {
            let audioDataResponse = await axios.delete(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'ApiKey': config.AUDIO_API_KEY,
                    'PearsonSSOSession': config.ssoToken,
                }
            });
            if (audioDataResponse && audioDataResponse.status == 200) {
                fetchAudioNarrationForContainer(slateData)
                dispatch({ type: OPEN_AUDIO_NARRATION, payload: false })
                dispatch({ type: ADD_AUDIO_NARRATION, payload: true })
            }
            else {
                dispatch({ type: ADD_AUDIO_NARRATION, payload: false })
                dispatch({ type: OPEN_AUDIO_NARRATION, payload: true })
            }

        } catch (e) {
            dispatch({ type: ADD_AUDIO_NARRATION, payload: false })
            dispatch({ type: OPEN_AUDIO_NARRATION, payload: true })
            dispatch({ type: ERROR_POPUP, payload: { show: true } })
        }

    }
}

export const addAudioNarrationForContainer = (audioData, isGlossary='') => async(dispatch, getState) => {
        let slateData = {
            currentProjectId: config.projectUrn,
            slateEntityUrn: config.slateEntityURN
        }
    /**
     * Get MP3 location when smarLinkURL is linked with smart link
     */
    let fileName, fileExtension;
    fileName = audioData?.location;
    fileExtension = fileName?.replace(/^.*\./, '');
    audioData.format= audioData?.format? audioData.format: fileExtension ?`audio/${fileExtension}`:"audio/mpeg"
    try {
        if (fileExtension != 'mp3' && fileExtension != 'ogg' && fileExtension != 'opus' && fileExtension != 'wav') {
          //  document.getElementsByClassName('.audio-block').style.pointerEvents  = "none"
            let redirectionURL = await fetch(fileName);
            let mp3LocationData = redirectionURL?.url;
            audioData = {
                "narrativeAudioUrn": audioData?.narrativeAudioUrn || "4567",
                "location": mp3LocationData,
                "title": {
                    "en": audioData?.title?.en || mp3LocationData?.split('/').reverse()[0].split('.')[0]
                },
                "format": "audio/mpeg"
            }
        }
    } catch (e) {
       // document.getElementsByClassName('.audio-block').style.pointerEvents = "auto"
        console.log("Error while getting mp3 location from smartLink URL", e);
    }

    if(isGlossary){
       store.dispatch(handleAudioActions(true, audioData))
       dispatch(fetchAudioNarrationForContainer(audioData,isGlossary));


    }else{
        let url = `${config.AUDIO_NARRATION_URL}context/v2/${slateData.currentProjectId}/container/${slateData.slateEntityUrn}/narrativeAudio`;
        try {
            let audioPutResponse = await axios.put(url, audioData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'ApiKey': config.AUDIO_API_KEY,
                    'PearsonSSOSession': config.ssoToken,
                }
            });
           // document.getElementsByClassName('.audio-block').style.pointerEvents = "auto"
            if( audioPutResponse && audioPutResponse.status == 400) {
                dispatch({ type: OPEN_AUDIO_NARRATION, payload: false })
                dispatch({ type: ADD_AUDIO_NARRATION, payload: true })
    
            } else {
                dispatch({ type: OPEN_AUDIO_NARRATION, payload: true })
                dispatch({ type: ADD_AUDIO_NARRATION, payload: false })
                store.dispatch(fetchAudioNarrationForContainer(slateData));
            }
        } catch(e) {
          // document.getElementsByClassName('.audio-block').style.pointerEvents = "auto"
            console.log("Error while adding / updating audio narrative tool",e);
            dispatch({type: ERROR_POPUP, payload:{show: true}})
        }
    } 
}

export const saveDataFromAlfresco = (message) => dispatch => {
    let imageData = message?.asset;
    let audioData = {
        "narrativeAudioUrn": imageData.id ?? "",
        "title": {
            "en": imageData?.name
        }
    }
    let figureType = imageData?.content?.mimeType?.split('/')[0]
    let smartLinkAssetType = imageData?.properties["cm:description"] && (typeof (imageData.properties["cm:description"]) == "string") ? imageData.properties["cm:description"].includes('smartLinkType') ? JSON.parse(imageData.properties["cm:description"]).smartLinkType : "" : "";
    const audioFormat = imageData?.mimetype ?? imageData?.content?.mimeType ?? "";
    if (figureType === 'audio') {
        let nonSmartLinkUrl = imageData["institution-urls"] && imageData["institution-urls"][0]?.publicationUrl
        if (figureType === "audio" && !nonSmartLinkUrl) {
            nonSmartLinkUrl = imageData?.smartLinkURl
        }
        audioData.location = nonSmartLinkUrl
        audioData.format = audioFormat
    } else if (smartLinkAssetType.toLowerCase() === 'audio') {
        let assetFormat = "";
        let smartLinkUrl = imageData?.properties["avs:url"] ? imageData.properties["avs:url"] : "";
        if (smartLinkUrl && smartLinkUrl?.split('=') && smartLinkUrl?.split('=').length > 1) {
            assetFormat = 'audio' + "/" + smartLinkUrl?.split('=')[1]
        }
        audioData.location = smartLinkUrl
        audioData.format = audioFormat ?? assetFormat ?? ""
    }
    let calledfromGlossaryFootnote = message?.calledFromGlossaryFootnote ? message.calledFromGlossaryFootnote : false;
    if (audioData?.location?.trim() !== "" && audioData?.narrativeAudioUrn?.trim() !== "") {
        dispatch(addAudioNarrationForContainer(audioData, calledfromGlossaryFootnote));
    }
    hideTocBlocker();
}