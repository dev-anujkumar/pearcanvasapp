import axios from 'axios'
import config from '../../config/config.js'
import store from '../../appstore/store.js'
import {
    OPEN_AUDIO_NARRATION,
    SHOW_REMOVE_POPUP,
    SPLIT_REMOVE_POPUP , CURRENT_SLATE_AUDIO_NARRATION , ADD_AUDIO_NARRATION , WRONG_AUDIO_REMOVE_POPUP
} from '../../constants/Action_Constants.js'

const axiosInstance = axios.create({
    baseURL: config.AUDIO_NARRATION_URL,
     withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'ApiKey': config.AUDIO_API_KEY,
        'PearsonSSOSession': config.ssoToken,
    }
})

if (window.addEventListener) {
    // For standards-compliant web browsers       
    window.addEventListener("message", handleIncommingMessages, false);
}
else {
    window.attachEvent("onmessage", handleIncommingMessages);
}

/* function is added just for updating the ssoToken */
const handleIncommingMessages = (e) => {
    let messageType = e.data.type;
    let message = e.data.message;
    switch (messageType) {
        case 'projectDetails' :            
            axiosInstance = axios.create({
                baseURL: config.AUDIO_NARRATION_URL,
                 withCredentials: false,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'ApiKey': config.AUDIO_API_KEY,
                    'PearsonSSOSession': message.ssoToken,
                }
            })                       
            break;
    }
}

/**
 * 
 * @param {*} value 
 */

export const showAudioRemovePopup = (value) => (dispatch, getState) => {
    dispatch({
        type: SHOW_REMOVE_POPUP,
        payload: value
    })
}
export const showAudioSplitPopup = (value) => (dispatch, getState) => {
    dispatch({
        type: SPLIT_REMOVE_POPUP,
        payload: value
    })
}
export const showWrongAudioPopup = (value) => (dispatch, getState) => {
    dispatch({
        type: WRONG_AUDIO_REMOVE_POPUP,
        payload: value
    })
}

/**
 * Method to get audio narration for container / state 
 * @param {object} slateData 
 */
export const fetchAudioNarrationForContainer = (slateData) => async(dispatch, getState) => {
    
    let url = `context/v3/${slateData.currentProjectId}/container/${slateData.slateEntityUrn}/narrativeAudio`;
    try {
        let audioDataResponse = await axiosInstance.get(url);
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

/**
 * Method to Delete audio narration for container / state 
 * @param {object} slateData 
 */
export const deleteAudioNarrationForContainer = (slateData) => async(dispatch, getState) => {
    var storeData = store.getState();
        let slateData = {
            currentProjectId: config.projectUrn,
            slateEntityUrn: config.slateEntityURN
        }
    var narrativeAudioUrn = storeData.audioReducer.audioData.data[0].narrativeAudioUrn
    let url = `context/v2/${slateData.currentProjectId}/container/${slateData.slateEntityUrn}/narrativeAudio/${narrativeAudioUrn}`;

    try {
        let audioDataResponse = await axiosInstance.delete(url);
        if(audioDataResponse && audioDataResponse.status == 200){
            fetchAudioNarrationForContainer(slateData)
            dispatch({ type: OPEN_AUDIO_NARRATION, payload: false })
            dispatch({ type: ADD_AUDIO_NARRATION, payload: true })
        }
        else {
            dispatch({ type: ADD_AUDIO_NARRATION, payload: false })
            dispatch({ type: OPEN_AUDIO_NARRATION, payload: true })
        }

    } catch (e){
        dispatch({ type: ADD_AUDIO_NARRATION, payload: false })
        dispatch({ type: OPEN_AUDIO_NARRATION, payload: true })
    }

}

export const addAudioNarrationForContainer = (audioData) => async(dispatch, getState) => {
        let slateData = {
            currentProjectId: config.projectUrn,
            slateEntityUrn: config.slateEntityURN
        }
    /**
     * Get MP3 location when smarLinkURL is linked with smart link
     */
    let fileName, fileExtension;
    fileName = audioData.location;
    fileExtension = fileName.replace(/^.*\./, '');
    try {
        if (fileExtension != 'mp3' || fileExtension != 'ogg' || fileExtension != 'opus' || fileExtension != 'wav') {
          //  document.getElementsByClassName('.audio-block').style.pointerEvents  = "none"
            let redirectionURL = await fetch(fileName);
            let mp3LocationData = redirectionURL.url;
            audioData = {
                "narrativeAudioUrn": audioData.narrativeAudioUrn || "4567",
                "location": mp3LocationData,
                "title": {
                    "en": audioData.title.en || mp3LocationData.split('/').reverse()[0].split('.')[0]
                },
                "format": "audio/mpeg"
            }
        }
    } catch (e) {
       // document.getElementsByClassName('.audio-block').style.pointerEvents = "auto"
        console.log("Error while getting mp3 location from smartLink URL", e);
    }

    let url = `context/v2/${slateData.currentProjectId}/container/${slateData.slateEntityUrn}/narrativeAudio`;
    try {
        let audioPutResponse = await axiosInstance.put(url, audioData);
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
    }
}