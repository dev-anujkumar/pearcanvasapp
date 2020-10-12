import axios from 'axios';
import config from './../../../config/config';
import { fetchSlateData } from './../../CanvasWrapper/CanvasWrapper_Actions';
import {sendDataToIframe } from './../../../constants/utility';

import { SET_SEARCH_URN } from './../../../constants/Search_Constants.js';

const mockData = {
    "id":"urn:pearson:manifest:a2438bed-1188-4f30-8ce7-b535e25598ee",
    "type":"manifest",
    "schema":"http://schemas.pearson.com/wip-authoring/manifest/1",
    "versionUrn":"urn:pearson:manifest:a2438bed-1188-4f30-8ce7-b535e25598ee",
    "contentUrn":"urn:pearson:entity:2139e052-2813-4cbe-9441-48e01e51d34a",
    "contents":{
        "bodymatter":[
            {
                "id":"urn:pearson:work:e09f9098-bc7a-410b-9619-c372102cd5b9",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:7af88fe2-0f49-4b28-8f2d-87134201fd9b",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:df4314ca-73ba-4297-b535-8a1308e9046d",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:46846ff7-5bd4-46f9-ae75-b745c00106e0",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:6da5d099-1838-488c-bf81-7911a8214cef",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:38f9350e-c2b6-4d0c-8753-1c90b437a395",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:9441aaf8-803f-4d64-ab9b-7b7a3e4982a0",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:e0ebe4ef-95b7-49cd-8b5c-02bab520281f",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:2be3d588-b277-41fd-804a-7696522d6f68",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:ecac414f-8d37-4c65-a7f2-3065c82745c7",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:6f19be82-d037-4a3c-a5b5-71776fc2fafb",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:82311675-687a-48f0-a3c0-db0d482024d6",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:ac2cad3f-5587-460d-8cf5-bd46c0ce3ceb",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:94792156-3fac-45d4-931e-052683c1fa48",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:74679c7d-fc54-41f0-8ef4-d3888c561c36",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:8c2cef35-053a-415e-909c-b3220898e953",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:a4b2c304-664f-4746-bdf8-02c1b3c225cc",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:f6d9d638-8c0d-47fd-8eca-930ce31440a7",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            },
            {
                "id":"urn:pearson:work:ebab264e-7d50-4b51-90aa-3e5e5f24c72e",
                "type":"element-authoredtext",
                "contentUrn":"urn:pearson:entity:2e1a0320-b129-4fb9-920c-e8ce5f4bbc3c"
            }
        ]
    }
};

export const searchEvent = {
    index: 0,
    totalCount: 0,
};

export const getContainerData = (searchTerm) => {
    const axiosObject = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'PearsonSSOSession': config.ssoToken
        }
    });

    return async (dispatch, getState) => {
        let payload = '';
        let parent = '';
        let elementIndex = 0;
        let bodymatter = {};
        let slateData = getState().appStore.slateLevelData[config.slateManifestURN].contents.bodymatter || {};

        if(/^(urn\:pearson\:(work|manifest)\:\w{8}(\-\w{4}){3}\-\w{12})$/gi.test(searchTerm) ) {
            await axiosObject.get(`${config.REACT_APP_API_URL}v1/slate/${config.projectUrn}/contentHierarchy/${config.slateEntityURN}/elementids`)
            .then(res => {
                bodymatter = res.data[config.slateManifestURN].contents.bodymatter;
            });
            if((JSON.stringify(bodymatter)).indexOf(searchTerm) >= 0) {
                config.fromTOC = false;
                payload = searchTerm;
                let totalCount = 0;
                // sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                bodymatter.forEach((item, index) => {
                    if((JSON.stringify(item)).indexOf(searchTerm) >= 0) {
                        elementIndex = index + 1;
                        parent = item.id;
                        if(searchTerm === item.id) {
                            totalCount++;
                        }
                    }
                });

                let slateLength = slateData.length;
                do{
                    if(elementIndex > slateLength) {
                        dispatch(fetchSlateData(config.slateManifestURN,config.slateEntityURN, ++config.page,'',""));
                    }
                    slateLength += getState().appStore.slateLength;
                } while(elementIndex > slateLength);

                searchEvent.index = 1;
                searchEvent.totalCount = ((JSON.stringify(bodymatter)).match(new RegExp(`(id(\"|\'|):(\"|\'|)${searchTerm})`, 'g'))).length;
            }
        } else {
            searchEvent.index = 0;
            searchEvent.totalCount = 0;
        }

        dispatch({ type: SET_SEARCH_URN, payload, parent });
    }
}