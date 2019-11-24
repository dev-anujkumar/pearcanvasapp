export const mockData = {
    addAudio: false,
    openAudio: false,
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp : false,
    openWrongAudioPopup: false,
    indexSplit:0,
     audioData :[{
        "narrativeAudioUrn":"135222a8-0dc2-4375-9488-2790133ce794",
        "location":"https://cite-media-stg.pearson.com/legacy_paths/135222a8-0dc2-4375-9488-2790133ce794/Automation_Audio_3.mp3",
        "title":{"en":"Automation_Audio_3.mp3"},
        "format":"audio/mpeg"
     }]
    }

  export const openAudio_FINAL_STATE = { 
    addAudio: false,
    openAudio: true,
    audioData: {},
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp : false,
    openWrongAudioPopup: false,
    indexSplit:0
};

export const WrongAudio_FINAL_STATE = { 
    addAudio: false,
    openAudio: false,
    audioData: {},
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp : false,
    openWrongAudioPopup: true,
    indexSplit:0
};

export const remove_FINAL_STATE = { 
    addAudio: false,
    openAudio: false,
    audioData: {},
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp : false,
    openWrongAudioPopup: false,
    indexSplit:0,
    openRemovePopUp : true
};

export const split_FINAL_STATE = { 
    addAudio: false,
    openAudio: false,
    audioData: {},
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp : true,
    openWrongAudioPopup: false,
    indexSplit:0
};

export const addAudio_FINAL_STATE = { 
    addAudio: true,
    openAudio: false,
    audioData: {},
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp : false,
    openWrongAudioPopup: false,
    indexSplit:0
};