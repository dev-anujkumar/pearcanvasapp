export const mockData = {
    addAudio: false,
    openAudio: false,
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp: false,
    openWrongAudioPopup: false,
    indexSplit: 0,
    openAudioGlossaryPopup: false,
    addAudioGlossaryPopup: false,
    audioGlossaryData:{},
    audioData: {
        "narrativeAudioUrn": "135222a8-0dc2-4375-9488-2790133ce794",
        "location": "https://cite-media-stg.pearson.com/legacy_paths/135222a8-0dc2-4375-9488-2790133ce794/Automation_Audio_3.mp3",
        "title": { "en": "Automation_Audio_3.mp3" },
        "format": "audio/mpeg"
    },

}
export const mockGlossaryData ={
    addAudio: false,
    openAudio: false,
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp: false,
    openWrongAudioPopup: false,
    indexSplit: 0,
    openAudioGlossaryPopup: false,
    addAudioGlossaryPopup: false,
    audioData:{},
    audioGlossaryData: {
        "narrativeAudioUrn": "2ddad41f-a05e-4f99-b44c-4a9306bd2a36",
        "location": "https://cite-media-stg.pearson.com/legacy_paths/2ddad41f-a05e-4f99-b44c-4a9306bd2a36/Progressive%20Audio%20sample%20Midsummer_Sky.mp3",
        "title": {
            "en": "Progressive Audio sample Midsummer_Sky.mp3"
        },
        "format": "audio/mpeg"
    },
}

export const mockDatadelete = {
    "audioData":
    {
        "containerUrn": "urn:pearson:manifest:3e986eb4-47de-4abe-a4b6-903702c43742",
        "projectUrn": "urn:pearson:distributable:680aac6d-a035-475e-9f78-7ec42599b17f",
        "containerEntityUrn": "urn:pearson:entity:3d39b57a-1ca3-4919-8771-c3295ee833e9",
        "data": [{
            "narrativeAudioUrn": "135222a8-0dc2-4375-9488-2790133ce794",
            "location": "https://cite-media-stg.pearson.com/legacy_paths/135222a8-0dc2-4375-9488-2790133ce794/Automation_Audio_3.mp3",
            "title": { "en": "Automation_Audio_3.mp3" }, "format": "audio/mpeg"
        },
        {
            "narrativeAudioUrn": "135222a8-0dc2-4375-9488-2790133ce894",
            "location": "https://cite-media-stg.pearson.com/legacy_paths/135222a8-0dc2-4375-9488-2790133ce794/Automation_Audio_3.mp3",
            "title": { "en": "Automation_Audio_3.mp3" }, "format": "audio/mpeg"
        }
        ]
    }
}

  export const openAudio_FINAL_STATE = { 
    addAudio: false,
    openAudio: true,
    audioData: {},
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp : false,
    openWrongAudioPopup: false,
    indexSplit:0,
    openAudioGlossaryPopup:false,
    addAudioGlossaryPopup:false,
    audioGlossaryData:{}
};

export const WrongAudio_FINAL_STATE = { 
    addAudio: false,
    openAudio: false,
    audioData: {},
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp : false,
    openWrongAudioPopup: true,
    indexSplit:0,
    openAudioGlossaryPopup:false,
    addAudioGlossaryPopup:false,
    audioGlossaryData:{}
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
    openRemovePopUp : true,
    openAudioGlossaryPopup:false,
    addAudioGlossaryPopup:false,
    audioGlossaryData:{}
};

export const split_FINAL_STATE = { 
    addAudio: false,
    openAudio: false,
    audioData: {},
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp : true,
    openWrongAudioPopup: false,
    indexSplit:0,
    openAudioGlossaryPopup:false,
    addAudioGlossaryPopup:false,
    audioGlossaryData:{}
};

export const addAudio_FINAL_STATE = { 
    addAudio: true,
    openAudio: false,
    audioData: {},
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp : false,
    openWrongAudioPopup: false,
    indexSplit:0,
    openAudioGlossaryPopup:false,
    addAudioGlossaryPopup:false,
    audioGlossaryData:{}
};

export const openGlossaryAudio_FINAL_STATE = { 
    addAudio: false,
    openAudio: false,
    audioData: {},
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp : false,
    openWrongAudioPopup: false,
    indexSplit:0,
    openAudioGlossaryPopup:true,
    addAudioGlossaryPopup:false,
    audioGlossaryData:{}
};

export const addGlossaryAudio_FINAL_STATE ={
    addAudio: false,
    openAudio: false,
    audioData: {},
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp : false,
    openWrongAudioPopup: false,
    indexSplit:0,
    openAudioGlossaryPopup:false,
    addAudioGlossaryPopup:true,
    audioGlossaryData:{}
}