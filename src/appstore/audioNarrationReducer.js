
const INITIAL_STATE = {
  addAudio: false,
  openAudio: false,
  audioData: {},
  openAlfresco: false,
  openPopUp: false,
  openSplitPopUp : false
}
/**
 * Reducer method for user related activation, deactivation and projects
 * @param {object} state 
 * @param {string} action 
 */

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {

    case 'ADD_AUDIO_NARRATION': {
      return {
        ...state,
        addAudio: action.payload
      }
    }
    case 'OPEN_AUDIO_NARRATION' : {
      return {
        ...state,
        openAudio: action.payload
      }
    }
    case 'CURRENT_SLATE_AUDIO_NARRATION' : {
      return {
        ...state,
        audioData: action.payload
      }
    }
    // case 'OPEN_ALFRESCO_AUDIO' : {
    //   return {
    //     ...state,
    //     openAlfresco: action.payload
    //   }
    // }
    case 'SHOW_REMOVE_POPUP' : {
      return {
        ...state,
        openRemovePopUp: action.payload
      }
    }
    case 'SPLIT_REMOVE_POPUP' : {
      return {
        ...state,
        openSplitPopUp: action.payload
      }
    }
   
    default:
      return state
  }
}

