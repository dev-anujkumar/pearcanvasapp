import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ElementAudioVideo from './../../src/component/ElementAudioVideo';
import { withInfo } from '@storybook/addon-info';
const mockStore = configureMockStore(middlewares);

const elemAudioVideoData = mockStore({
    slateLockReducer:{slateLockInfo:false}   
  });
const audioElementTypeSLDefault = {
    "id": "urn:pearson:work:f20316ad-0a22-4f45-975d-ebe4ba1f2564",
    "type": "figure",
    "figuretype": "audio",
    "subtype": "figureAudioSL",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "full",

    "title": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": []
    },
    "subtitle": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "captions": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "credits": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "figuredata": {
        "height": "399",
        "width": "600",
        "schema": "http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio",
        "audioid": "urn:pearson:alfresco:5e7f87f1-4662-4093-bb10-f3e1ef66e658",
        "posterimage": {
            "imageid": "urn:pearson:alfresco:5e7f87f1-4662-4093-bb10-f3e1ef66e658",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png"
        },

        "audio": {
            "format": "video/mp4",
            "path": ""
        },
        "srctype": "externallink"
    },
    "html": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "title": "",
        "subtitle": "",
        "caption": "",
        "credit": "",
        "postertext": "",
        "tableasHTML": ""
    },
    "comments": true,
    "tcm": true,
    "versionUrn": "urn:pearson:work:f20316ad-0a22-4f45-975d-ebe4ba1f2564",
    "contentUrn": "urn:pearson:entity:b8c31acf-2c66-4a05-92ac-e0d910ec2720"
}
const audioElementTypeAlfrescoDefault = {
    "id": "urn:pearson:work:f20316ad-0a22-4f45-975d-ebe4ba1f2564",
    "type": "figure",
    "figuretype": "audio",
    "subtype": "figureAudio",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "full",
    "title": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": []
    },
    "subtitle": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "captions": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "credits": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "figuredata": {
        "height": "399",
        "width": "600",
        "schema": "http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio",
        "audioid": "urn:pearson:alfresco:f6269c36-bff5-46e0-ba2f-de9f4f172002",
        "posterimage": {
            "imageid": "urn:pearson:alfresco:f6269c36-bff5-46e0-ba2f-de9f4f172002",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png"
        },
        "audio": {
            "format": "audio/mpeg",
            "path": ""
        },
        "srctype": "internal"
    },
    "html": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "title": "",
        "subtitle": "",
        "caption": "",
        "credit": "",
        "postertext": "",
        "tableasHTML": ""
    },
    "comments": true,
    "tcm": true,
    "versionUrn": "urn:pearson:work:f20316ad-0a22-4f45-975d-ebe4ba1f2564",
    "contentUrn": "urn:pearson:entity:b8c31acf-2c66-4a05-92ac-e0d910ec2720"
}
const audioElementTypeSLWithData = {
    "id": "urn:pearson:work:f20316ad-0a22-4f45-975d-ebe4ba1f2564",
    "type": "figure",
    "figuretype": "audio",
    "subtype": "figureAudioSL",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "full",
    "title": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "sfd",
        "textsemantics": [],
        "mathml": []
    },
    "subtitle": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "gfh",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "captions": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "sdsd",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "credits": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "sdsd",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "figuredata": {
        "height": "399",
        "width": "600",
        "schema": "http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio",
        "audioid": "urn:pearson:alfresco:5e7f87f1-4662-4093-bb10-f3e1ef66e658",
        "posterimage": {
            "imageid": "urn:pearson:alfresco:5e7f87f1-4662-4093-bb10-f3e1ef66e658",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png"
        },

        "audio": {
            "format": "video/mp4",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/5e7f87f1-4662-4093-bb10-f3e1ef66e658/smart_figure_3_6_mc_war_part_b_1025689155684_mp4_video_320x240_168000_primary_audio_1.mp4"
        },
        "srctype": "externallink"
    },
    "html": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "title": "Label",
        "subtitle": "Title",
        "caption": "Caption",
        "credit": "Credit",
        "postertext": "",
        "tableasHTML": ""
    },
    "comments": true,
    "tcm": true,
    "versionUrn": "urn:pearson:work:f20316ad-0a22-4f45-975d-ebe4ba1f2564",
    "contentUrn": "urn:pearson:entity:b8c31acf-2c66-4a05-92ac-e0d910ec2720"
}
const audioElementTypeAlfrescoWithData = {
    "id": "urn:pearson:work:f20316ad-0a22-4f45-975d-ebe4ba1f2564",
    "type": "figure",
    "figuretype": "audio",
    "subtype": "figureAudio",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "full",
    "title": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": []
    },
    "subtitle": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "captions": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "credits": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "figuredata": {
        "height": "399",
        "width": "600",
        "schema": "http://schemas.pearson.com/wip-authoring/audio/1#/definitions/audio",
        "audioid": "urn:pearson:alfresco:f6269c36-bff5-46e0-ba2f-de9f4f172002",
        "posterimage": {
            "imageid": "urn:pearson:alfresco:f6269c36-bff5-46e0-ba2f-de9f4f172002",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png"
        },
        "audio": {
            "format": "audio/mpeg",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/5e7f87f1-4662-4093-bb10-f3e1ef66e658/smart_figure_3_6_mc_war_part_b_1025689155684_mp4_video_320x240_168000_primary_audio_1.mp4"
        },
        "srctype": "internal"
    },
    "html": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "title": "Label",
        "subtitle": "Title",
        "caption": "Caption",
        "credit": "Credit",
        "postertext": "",
        "tableasHTML": ""
    },
    "comments": true,
    "tcm": true,
    "versionUrn": "urn:pearson:work:f20316ad-0a22-4f45-975d-ebe4ba1f2564",
    "contentUrn": "urn:pearson:entity:b8c31acf-2c66-4a05-92ac-e0d910ec2720"
}
const videoElementTypeSLDefault = {
    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    "type": "figure",
    "figuretype": "video",
    "subtype": "figureVideo",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "full",
    "title": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "12345",
        "textsemantics": [],
        "mathml": []
    },
    "subtitle": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "eresrwqe",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "captions": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "sdafsad",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "credits": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "asdfasdfasdf",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "figuredata": {
        "height": "399",
        "width": "600",
        "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
        "videoid": "urn:pearson:alfresco:f6269c36-bff5-46e0-ba2f-de9f4f172002",
        "posterimage": {
            "imageid": "urn:pearson:alfresco:f6269c36-bff5-46e0-ba2f-de9f4f172002",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png"
        },
        "videos": [
            {
                "format": "audio/mpeg",
                "path": ""
            }
        ],
        "tracks": [],
        "srctype": "externallink",
        "clipinfo": {
            "clipid": "",
            "starttime": "",
            "endtime": "",
            "description": "",
            "duration": ""
        }
    },
    "html": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "title": "",
        "subtitle": "",
        "caption": "",
        "credit": "",
        "postertext": "",
        "tableasHTML": ""
    },
    "comments": true,
    "tcm": true,
    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"


};
const videoElementTypeAlfrescoDefault = {


    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    "type": "figure",
    "figuretype": "video",
    "subtype": "figureVideo",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "full",
    "title": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "12345",
        "textsemantics": [],
        "mathml": []
    },
    "subtitle": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "eresrwqe",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "captions": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "sdafsad",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "credits": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "asdfasdfasdf",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "figuredata": {
        "height": "399",
        "width": "600",
        "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
        "videoid": "urn:pearson:alfresco:f6269c36-bff5-46e0-ba2f-de9f4f172002",
        "posterimage": {
            "imageid": "urn:pearson:alfresco:f6269c36-bff5-46e0-ba2f-de9f4f172002",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png"
        },
        "videos": [
            {
                "format": "audio/mpeg",
                "path": ""
            }
        ],
        "tracks": [],
        "srctype": "externallink",
        "clipinfo": {
            "clipid": "",
            "starttime": "",
            "endtime": "",
            "description": "",
            "duration": ""
        }
    },
    "html": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "title": "",
        "subtitle": "",
        "caption": "",
        "credit": "",
        "postertext": "",
        "tableasHTML": ""
    },
    "comments": true,
    "tcm": true,
    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
};

const videoElementTypeSLWithData = {
    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    "type": "figure",
    "figuretype": "video",
    "subtype": "figureVideo",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "full",
    "title": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "12345",
        "textsemantics": [],
        "mathml": []
    },
    "subtitle": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "eresrwqe",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "captions": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "sdafsad",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "credits": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "asdfasdfasdf",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "figuredata": {
        "height": "399",
        "width": "600",
        "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
        "videoid": "urn:pearson:alfresco:f6269c36-bff5-46e0-ba2f-de9f4f172002",
        "posterimage": {
            "imageid": "urn:pearson:alfresco:f6269c36-bff5-46e0-ba2f-de9f4f172002",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png"
        },
        "videos": [
            {
                "format": "audio/mpeg",
                "path": "https://cite-media-stg.pearson.com/legacy_paths/42333091-7625-4317-b095-1f450207961f/dipe.mp4"
            }
        ],
        "tracks": [],
        "srctype": "externallink",
        "clipinfo": {
            "clipid": "",
            "starttime": "",
            "endtime": "",
            "description": "",
            "duration": ""
        }
    },
    "html": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "title": "Label",
        "subtitle": "Title",
        "caption": "Caption",
        "credit": "Credit",
        "postertext": "",
        "tableasHTML": ""
    },
    "comments": true,
    "tcm": true,
    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"

};

const videoElementTypeAlfrescoWithData = {

    "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    "type": "figure",
    "figuretype": "video",
    "subtype": "figureVideo",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "alignment": "full",
    "title": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "12345",
        "textsemantics": [],
        "mathml": []
    },
    "subtitle": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "eresrwqe",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "captions": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "sdafsad",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "credits": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "asdfasdfasdf",
        "textsemantics": [],
        "mathml": [],
        "footnotes": []
    },
    "figuredata": {
        "height": "399",
        "width": "600",
        "schema": "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
        "videoid": "urn:pearson:alfresco:f6269c36-bff5-46e0-ba2f-de9f4f172002",
        "posterimage": {
            "imageid": "urn:pearson:alfresco:f6269c36-bff5-46e0-ba2f-de9f4f172002",
            "path": "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png"
        },
        "videos": [
            {
                "format": "audio/mpeg",
                "path": "https://cite-media-stg.pearson.com/legacy_paths/42333091-7625-4317-b095-1f450207961f/dipe.mp4"
            }
        ],
        "tracks": [],
        "srctype": "externallink",
        "clipinfo": {
            "clipid": "",
            "starttime": "",
            "endtime": "",
            "description": "",
            "duration": ""
        }
    },
    "html": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "title": "Label",
        "subtitle": "Title",
        "caption": "Caption",
        "credit": "Credit",
        "postertext": "",
        "tableasHTML": ""
    },
    "comments": true,
    "tcm": true,
    "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
    "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
}

storiesOf('Components|ElementAudioVideo', module)
    .addDecorator(withInfo)
    .add('Audio Type-SL default', () => <div style={{ width: "500px", position: "relative", left: "100px" }}>  <Provider store={elemAudioVideoData}><ElementAudioVideo model={audioElementTypeSLDefault} index="1" /></Provider> </div>)
    .add('Audio Type-Alfresco default', () => <div style={{ width: "500px", position: "relative", left: "100px" }}> <Provider store={elemAudioVideoData}><ElementAudioVideo model={audioElementTypeAlfrescoDefault} index="2" /></Provider></div>)
    .add('Audio Type-SL with data', () => {
        return (
            <div style={{ width: "500px", position: "relative", left: "100px" }}> <Provider store={elemAudioVideoData}>
                <ElementAudioVideo model={audioElementTypeSLWithData} index="3" /></Provider>
            </div>
        );
    })
    .add('Audio Type-Alfresco with data', () => {
        return (
            <div style={{ width: "500px", position: "relative", left: "100px" }}> <Provider store={elemAudioVideoData}>
                <ElementAudioVideo model={audioElementTypeAlfrescoWithData} index="4" /></Provider>
            </div>
        );
    })
    .add('Video Type-SL default', () => <div style={{ width: "500px", position: "relative", left: "100px" }}> <Provider store={elemAudioVideoData}><ElementAudioVideo model={videoElementTypeSLDefault} index="5" /></Provider></div>)
    .add('Video Type-Alfresco default', () => <div style={{ width: "500px", position: "relative", left: "100px" }}>  <Provider store={elemAudioVideoData}><ElementAudioVideo model={videoElementTypeAlfrescoDefault} index="6" /></Provider></div>)
    .add('Video Type-SL with data', () => {
        return (
            <div style={{ width: "500px", position: "relative", left: "100px" }}> <Provider store={elemAudioVideoData}>
                <ElementAudioVideo model={videoElementTypeSLWithData} index="7" /></Provider>
            </div>
        );
    })
    .add('Video Type-Alfresco with data', () => {
        return (
            <div style={{ width: "500px", position: "relative", left: "100px" }}> <Provider store={elemAudioVideoData}>
                <ElementAudioVideo model={videoElementTypeAlfrescoWithData} index="8" /></Provider>
            </div>
        );
    })