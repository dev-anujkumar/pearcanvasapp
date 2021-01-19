import {
  OPEN_AUDIO_NARRATION,
  SHOW_REMOVE_POPUP,
  HANDLE_GLOSSARY_AUDIO_DATA,
  SPLIT_REMOVE_POPUP , CURRENT_SLATE_AUDIO_NARRATION , ADD_AUDIO_NARRATION , WRONG_AUDIO_REMOVE_POPUP,OPEN_AUDIO_GLOSSARY_POPUP,ADD_AUDIO_GLOSSARY_POPUP
} from '../constants/Action_Constants'


const INITIAL_STATE = {
  addAudio: false,
  openAudio: false,
  audioData: {},
  openAlfresco: false,
  openPopUp: false,
  openSplitPopUp : false,
  openWrongAudioPopup: false,
  indexSplit:0,
  openAudioGlossaryPopup:false,
  addAudioGlossaryPopup:false,
  audioGlossaryData:{},
  isGlossary:false
}

const INITIAL_ACTION = {
  type: '',
  payload: {}
}

/**
 * Reducer method for user related activation, deactivation and projects
 * @param {object} state 
 * @param {string} action 
 */

export default function audioNarrationReducer (state = INITIAL_STATE, action = INITIAL_ACTION) {
  switch (action.type) {

    case ADD_AUDIO_NARRATION: {
      return {
        ...state,
        addAudio: action.payload
      }
    }
    case OPEN_AUDIO_NARRATION : {
      return {
        ...state,
        openAudio: action.payload
      }
    }
    case CURRENT_SLATE_AUDIO_NARRATION : {
      return {
        ...state,
        audioData: action.payload
      }
    }
    case SHOW_REMOVE_POPUP : {
      return {
        ...state,
        openRemovePopUp: action.payload.value,
        isGlossary:action.payload.isGlossary
      }
    }
    case SPLIT_REMOVE_POPUP : {
      return {
        ...state,
        openSplitPopUp: action.payload.value,
        indexSplit : action.payload.index
      }
    }
    case WRONG_AUDIO_REMOVE_POPUP : {
      return {
        ...state,
        openWrongAudioPopup: action.payload
      }
    }
    case OPEN_AUDIO_GLOSSARY_POPUP:{
      return {
        ...state,
        openAudioGlossaryPopup:action.payload
      }
    }
    case ADD_AUDIO_GLOSSARY_POPUP:{
      return{
        ...state,
        addAudioGlossaryPopup :action.payload
      }
    }
    
    case HANDLE_GLOSSARY_AUDIO_DATA:{
      return{
        ...state,
        audioGlossaryData:action.payload
      }
    }
   
    default:
      return state
  }
}

