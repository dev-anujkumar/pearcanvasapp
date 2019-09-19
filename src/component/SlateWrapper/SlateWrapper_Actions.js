import axios from 'axios';
import config from '../../config/config';
import {
    AUTHORING_ELEMENT_CREATED,
    VIDEO_ELEMENT_CREATED
} from '../../constants/Action_Constants';

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

export const createVideoElement = (video, index) => (dispatch, getState) => {
    // let _requestData = {
    //     "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
    //     "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
    //     "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
    //     "type": video.type,
    //     "index": index,
    //     "figuretype": video.figuretype,
    //     "subtype": video.subtype,
    //     "alignment": video.alignment,
    //     "figuredata": {
    //         "posterimage": {
    //         "path": ""
    //         },
    //         },
    // };

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

    // axios.post(`${config.REACT_APP_API_URL}v1/authoredtext`,
    //     JSON.stringify(_requestData),
    //     {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "PearsonSSOSession": config.ssoToken
    //         }
    //     }
    // ).then(createdElemData => {
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