export const mockData = {
    addAudio: false,
    openAudio: false,
    openAlfresco: false,
    openPopUp: false,
    openSplitPopUp: false,
    openWrongAudioPopup: false,
    indexSplit: 0,
    isGlossary:false,
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
    isGlossary:false,
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
    },
    'audioGlossaryData': {
        "narrativeAudioUrn": "2ddad41f-a05e-4f99-b44c-4a9306bd2a36",
        "location": "https://cite-media-stg.pearson.com/legacy_paths/2ddad41f-a05e-4f99-b44c-4a9306bd2a36/Progressive%20Audio%20sample%20Midsummer_Sky.mp3",
        "title": {
            "en": "Progressive Audio sample Midsummer_Sky.mp3"
        },
        "format": "audio/mpeg"
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
    audioGlossaryData:{},
    isGlossary:false,
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
    audioGlossaryData:{},
    isGlossary:false
};

export const remove_FINAL_STATE = { 
    isGlossary:false,
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
    audioGlossaryData:{},
    isGlossary:true
};

export const split_FINAL_STATE = { 
    isGlossary:false,
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
    isGlossary:false,
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
    audioGlossaryData:{},
    isGlossary:false,
    positions:{
        left:'20px',
        top:'10px'
    }
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
    audioGlossaryData:{},
    isGlossary:false
}

export const alfrescoDataTesting = {
    'asset': {
        'aspectNames': ["audio:audio", "pp:publicationDetails", "pp:published", "cm:versionable", "cm:titled", "cm:auditable", "pp:publishStatus", "cm:author"],
        'content': {
            'encoding': "UTF-8",
            'mimeType': "audio/mpeg",
            'mimeTypeName': "MPEG Audio",
            'sizeInBytes': 4527015
        },
        'createdByUser': {
            'displayName': "C5TEST09 C5TEST09",
            'id': "C5TEST09"
        },
        'epsStatus': true,
        'epsUrl': "https://cite-media-stg.pearson.com/legacy_paths/42c244f2-e564-4801-b610-a5d2ac8e75c9/sci-ehap-chapter-1-audio-summary.mp3",
        'id': "42c244f2-e564-4801-b610-a5d2ac8e75c9",
        'institution-urls': [
            {
                'contentAction': false,
                'contentVersion': "1.0",
                'instName': "https://epspqa.stg-openclass.com/cite-media-stg",
                'institutionUrl': "https://epspqa.stg-openclass.com/cite-media-stg/",
                'pdosUrl': "https://epspqa.stg-openclass.com/cite-media-stg/api/item/4cf87579-11cb-40c9-a7ce-797f65a7fdac/1/file/sci-ehap-chapter-1-audio-summary.mp3",
                'publicationUrl': "https://cite-media-stg.pearson.com/legacy_paths/42c244f2-e564-4801-b610-a5d2ac8e75c9/sci-ehap-chapter-1-audio-summary.mp3",
                'status': "Published"
            },
            {
                'contentAction': true,
                'contentVersion': "",
                'instName': "SchoolContent",
                'institutionUrl': "https://epspqa.stg-openclass.com/schoolcontent-stg/",
                'pdosUrl': "",
                'publicationUrl': "",
                'status': ""
            }
        ],
        'modifiedAt': "2021-07-30T10:53:31.714+0000",
        'name': "sci-ehap-chapter-1-audio-summary.mp3",
        'nodeRef': "workspace://SpacesStore/42c244f2-e564-4801-b610-a5d2ac8e75c9",
        'path': {
            'elements': [
                {
                    'aspectNames': ["cm:versionable", "cm:titled", "cm:auditable", "pp:containsPublishedContent", "app:uifacets"],
                    'id': "d93486b2-a063-485b-94cd-b2908ed4c118",
                    'name': "Company Home",
                    'nodeType': "cm:folder"
                },
                {
                    'aspectNames': ["rule:rules", "cm:versionable", "cm:titled", "cm:auditable", "pp:containsPublishedContent", "app:uifacets"],
                    'id': "27697dfe-1d6b-4002-b095-69a6e772fc9d",
                    'name': "Sites",
                    'nodeType': "st:sites"
                },
                {
                    'aspectNames': ["cm:tagscope", "cm:versionable", "cm:titled", "cm:auditable", "pp:containsPublishedContent", "ds:regionData", "pp:publishable"],
                    'id': "ebaaf975-a68b-4ca6-9604-3d37111b847a",
                    'name': "c5-media-poc",
                    'nodeType': "st:site"
                },
                {
                    'aspectNames': ["cm:tagscope", "st:siteContainer", "cm:versionable", "cm:auditable", "mt:autoRender"],
                    'id': "bbcb1d7d-ae62-46fd-af11-a0e371b9a379",
                    'name': "documentLibrary",
                    'nodeType': "cm:folder"
                },
                {
                    'aspectNames': ["cm:versionable", "cm:titled", "cm:auditable", "pp:containsPublishedContent", "mt:autoRender"],
                    'id': "80526196-1296-4055-b1c9-febdad0590ea",
                    'name': "Welding_29721",
                    'nodeType': "cm:folder"
                }
            ],
            'isComplete': true,
            'name': "/Company Home/Sites/c5-media-poc/documentLibrary/Welding_29721"
        },
        'previewUrl': "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/s/api/node/workspace/SpacesStore/42c244f2-e564-4801-b610-a5d2ac8e75c9/content/thumbnails/imgpreview?c=queue&ph=true",
        'properties': {
            'audio:channelType': "Stereo",
            'audio:compressor': "MP3",
            'audio:releaseDate': "2021-01-01T00:00:00.000+0000",
            'audio:sampleRate': 44100,
            'audio:trackNumber': 1,
            'cm:description': "Ch_1_Audio_Tour",
            'cm:title': "Ch_1_Audio_Tour",
            'cm:versionLabel': "1.0",
            'cm:versionType': "MAJOR",
            'pp:expanded': [true],
            'pp:institutionDetails': [
                {
                    "institutionUrl": "https://epspqa.stg-openclass.com/cite-media-stg/",
                    "pdosUrl": "https://epspqa.stg-openclass.com/cite-media-stg/api/item/4cf87579-11cb-40c9-a7ce-797f65a7fdac/1/file/sci-ehap-chapter-1-audio-summary.mp3",
                    "contentVersion": "1.0",
                    "instName": "",
                    "status": "",
                    "publicationUrl": "",
                    "contentAction": false
                }
            ],
            'pp:institutionUrl': ["https://epspqa.stg-openclass.com/cite-media-stg/"],
            'pp:isRoot': true,
            'pp:pubInstUrlChangeUpdated': [],
            'pp:status': [
                {
                    "pstatus": {
                        "dateTime": "2021-07-30 10:53:31",
                        "instName": "https://epspqa.stg-openclass.com/cite-media-stg",
                        "contentVersion": "1.0",
                        "status": true,
                        "filePath": "",
                        "unZipStatus": "true"
                    },
                    "history": []
                }
            ],
            'pp:targetId': ["4cf87579-11cb-40c9-a7ce-797f65a7fdac/1"]
        },
        'publish-history': [
            {
                'history': [],
                'pstatus': {
                    'contentVersion': "1.0",
                    'dateTime': "2021-07-30 10:53:31",
                    'filePath': "",
                    'instName': "https://epspqa.stg-openclass.com/cite-media-stg",
                    'status': true,
                    'unZipStatus': "true"
                }
            }
        ],
        'smartLinkURl': "https://cite-media-stg.pearson.com/legacy_paths/42c244f2-e564-4801-b610-a5d2ac8e75c9/sci-ehap-chapter-1-audio-summary.mp3",
        'thumbnailUrl': "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/s/api/node/workspace/SpacesStore/42c244f2-e564-4801-b610-a5d2ac8e75c9/content/thumbnails/doclib?c=queue&ph=true",
        'type': "Audio"
    },
    'calledFrom': "NarrativeAudio",
    'calledFromGlossaryFootnote': true,
    'calledFromImageGlossaryFootnote': undefined,
    'changedSiteUrl': false,
    'id': "urn:pearson:work:ffd5c425-e5e3-4597-b5a0-aef5f05137e2",
    'launchAlfrescoPopup': false
}