import axios from 'axios'
import config from '../../config/config.js'
import store from '../../appstore/store.js'
import {
    OPEN_AUDIO_GLOSSARY_POPUP,
    OPEN_AUDIO_NARRATION,
    SHOW_REMOVE_POPUP,
    SPLIT_REMOVE_POPUP , CURRENT_SLATE_AUDIO_NARRATION , ADD_AUDIO_NARRATION , WRONG_AUDIO_REMOVE_POPUP, ERROR_POPUP
} from '../../constants/Action_Constants.js'

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

export const audioGlossaryPopup =(value) => (dispatch,getState)=>{
    dispatch({
        type : OPEN_AUDIO_GLOSSARY_POPUP,
        payload:value
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

/**
 * Method to get audio narration for container / state 
 * @param {object} slateData 
 */
export const fetchAudioNarrationForContainer = (slateData,isGlossary) => async(dispatch, getState) => {

    if(isGlossary){
        let glossaryAudioData = {
            "containerUrn": "urn:pearson:manifest:63814786-9e04-4748-9ba5-e7b339cf95db",
            "projectUrn": "urn:pearson:distributable:c9aad0a6-a4ca-4328-9dec-84ee60b4f803",
            "containerEntityUrn": "urn:pearson:entity:ba3b174a-1300-43dd-abac-efe9686658fb",
            "data": [
              {
                "narrativeAudioUrn": "f8433cd3-04cd-4479-852c-dde4ab410a9f",
                "location": "https://cite-media-stg.pearson.com/legacy_paths/f8433cd3-04cd-4479-852c-dde4ab410a9f/nse_aud_11_u43_l1_m1_02.mp3",
                "title": {
                  "en": "nse_aud_11_u43_l1_m1_02.mp3"
                },
                "format": "audio/mpeg"
              }
            ],
            "createdDate": "2020-12-30T09:31:34.263Z",
            "updatedDate": "2021-01-04T11:57:53.030Z"
        }
        dispatch({ type: CURRENT_SLATE_AUDIO_NARRATION, payload: glossaryAudioData });
        dispatch({ type: OPEN_AUDIO_NARRATION, payload: true })
        dispatch({ type: ADD_AUDIO_NARRATION, payload: false })

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
export const deleteAudioNarrationForContainer = (slateObject) => async(dispatch, getState) => {
    var storeData = store.getState();
        let slateData = {
            currentProjectId: config.projectUrn,
            slateEntityUrn: config.slateEntityURN
        }
    var narrativeAudioUrn = storeData.audioReducer.audioData.data[0].narrativeAudioUrn
    let url = `${config.AUDIO_NARRATION_URL}context/v2/${slateData.currentProjectId}/container/${slateData.slateEntityUrn}/narrativeAudio/${narrativeAudioUrn}`;

    try {
        let audioDataResponse = await axios.delete(url,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'ApiKey': config.AUDIO_API_KEY,
                'PearsonSSOSession': config.ssoToken,
            }
        });
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
        dispatch({type: ERROR_POPUP, payload:{show: true}})
    }

}

export const addAudioNarrationForContainer = (audioData, isGlossary) => async(dispatch, getState) => {
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
    audioData.format= audioData.format? audioData.format: fileExtension ?`audio/${fileExtension}`:"audio/mpeg"
    try {
        if (fileExtension != 'mp3' && fileExtension != 'ogg' && fileExtension != 'opus' && fileExtension != 'wav') {
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
    if(isGlossary){
        dispatch({ type: OPEN_AUDIO_NARRATION, payload: true })
        dispatch({ type: ADD_AUDIO_NARRATION, payload: false })
        store.dispatch(fetchAudioNarrationForContainer(slateData,isGlossary));

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