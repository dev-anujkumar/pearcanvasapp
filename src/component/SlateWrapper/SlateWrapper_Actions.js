import axios from 'axios';
import config from '../../config/config';
import {
    AUTHORING_ELEMENT_CREATED,
    VIDEO_ELEMENT_CREATED
    ,FIGURE_ELEMENT_CREATED
} from '../../constants/Action_Constants';
import { sendDataToIframe } from '../../constants/utility.js';

let headers = {
    "Content-Type": "application/json",
    ApiKey: "Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld",//STRUCTURE_APIKEY,
    PearsonSSOSession: config.ssoToken,
}
export const createElement = (type, index) => (dispatch, getState) => {
    let _requestData = {
        "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
        "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
        "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
        "type": type,
        "index": index
    };

    axios.post(`${config.REACT_APP_API_URL}v1/authoredtext`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(createdElemData => {        
        sendDataToIframe({
            'type': 'HideLoader',
            'message': { status: false }
        })
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        for (let key in newParentData) {
            //for (let k in newParentData[key]) {
                // newParentData[key][k].contents.bodymatter.splice(index, 0, createdElemData.data);
                newParentData[key].contents.bodymatter.splice(index, 0, createdElemData.data);
            //}

        }

        dispatch({
            type: AUTHORING_ELEMENT_CREATED,
            payload: {
                slateLevelData: newParentData
            }
        })

    })
};
export const createFigureElement = (eleFigure, index) => (dispatch, getState) => {
    let _requestData = {
        "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
        "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
        "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
        "type": eleFigure.type,
        "figuretype":eleFigure.figuretype,
        "subtype":eleFigure.subtype,
        "alignment":eleFigure.alignment,
        "index": index
    };

    // axios.post(`${config.REACT_APP_API_URL}v1/figure`,
    //     JSON.stringify(_requestData),
    //     {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "PearsonSSOSession": config.ssoToken
    //         }
    //     }
    // ).then(createdFigureElemData => {        
       var createdFigureElemData={
        
            "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            "type": "figure",
            "figuretype": "image",
            "subtype": "image50Text",
            "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
            "alignment": "half-text",
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
                "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                "height": "1225",
                "width": "1440",
                "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                "imageid": "urn:pearson:alfresco:600efdb1-a28c-4ec3-8b54-9aad364c8c2c"
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
            "comments": false,
            "tcm": false,
            "versionUrn": "urn:pearson:work:c04d373e-4534-412f-bb75-dfb8d32577f5",
            "contentUrn": "urn:pearson:entity:853c3a70-01e4-41e3-b3d7-ee2d157b0d89"
        
       }

       sendDataToIframe({
        'type': 'HideLoader',
            'message': { status: false }
        })
    
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        for (let key in newParentData) {
            //for (let k in newParentData[key]) {
                // newParentData[key][k].contents.bodymatter.splice(index, 0, createdElemData.data);
                newParentData[key].contents.bodymatter.splice(index, 0, createdFigureElemData);
            //}
        }
        dispatch({
            type: FIGURE_ELEMENT_CREATED,
            payload: {
                slateLevelData: newParentData
            }
        })

    // })
};

export const createVideoElement = (eleVideo, index) => (dispatch, getState) => {
     // let _requestData = {
    //     "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
    //     "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
    //     "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
    //     "type": eleVideo.type,
    //     "index": index,
    //     "figuretype": eleVideo.figuretype,
    //     "subtype": eleVideo.subtype,
    //     "alignment": eleVideo.alignment,
    //     "figuredata": {
    //         "posterimage": {
    //         "path": ""
    //         },
    //         },
    // };

    // axios.post(`${config.REACT_APP_API_URL}v1/figure`,
    //     JSON.stringify(_requestData),
    //     {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "PearsonSSOSession": config.ssoToken
    //         }
    //     }
    // ).then(createdFigureElemData => {        
        var createdVideoData = {
       
            "id": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
            "type": "figure",
            "figuretype": "video",
            "subtype": "figureVideo",
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
                "tracks": [ ],
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
        }
        
        sendDataToIframe({
            'type': 'HideLoader',
            'message': { status: false }
        })

        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        for (let key in newParentData) {
            //for (let k in newParentData[key]) {
                // newParentData[key][k].contents.bodymatter.splice(index, 0, createdElemData.data);
                newParentData[key].contents.bodymatter.splice(index, 0, createdVideoData);
            //}
        }
        dispatch({
            type: VIDEO_ELEMENT_CREATED,
            payload: {
                slateLevelData: newParentData
            }
        })

    // })
};