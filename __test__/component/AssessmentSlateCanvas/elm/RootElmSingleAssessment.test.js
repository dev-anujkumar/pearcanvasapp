import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
import RootElmComponent from '../../../../src/component/AssessmentSlateCanvas/elm/RootElmComponent.jsx';
import {DefaultSlateData} from '../../../../fixtures/AssessmentSlateCanvasTestingData';
const mockStore = configureMockStore(middlewares);
jest.mock('../../../../src/config/config.js', () => ({
    slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
}))
let initialState = {
   elmReducer:{ 
        elmData:{
           numberOfResources: 88,
           contentUrn: "urn:pearson:entity:dfeb8286-217e-40a4-8d40-3ced46e469e0",
            versionUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef",
},
    errFlag:false,
    errorStatu:""
},
appStore : {
    pageNumberData:{},
    slateLevelData: DefaultSlateData
}};
let apiData={
    "type": "container",
    "label": "project",
    "containerUrn": "urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5",
    "contentUrn": "urn:pearson:entity:4d78888c-774d-42f2-89aa-a80a84124ef6",
    "versionUrn": "urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5",
    "numberOfResources": 11,
    "projectVersionUrn": "urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5",
    "unformattedTitle": {
        "en": "ContentAPI-ELMassessment"
    },
    "alignments": {
        "resourceCollections": [
            {
                "rcUrn": "urn:pearson:rc:015fa639-7ab5-45f5-84c0-5184b689f5cf",
                "title": {
                    "en": "elm|urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5|urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5"
                },
                "description": {
                    "en": "Elm collection for project urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5 container urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5 alignment"
                },
                "resources": [
                    {
                        "urn": "urn:pearson:work:61511f33-f8bd-46b5-b626-0d8485ced081",
                        "title": {
                            "en": "assessment with item name chapter"
                        },
                        "description": {
                            "en": "--"
                        },
                        "type": "assessment",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:ee15bad3-0a26-40dd-9938-32aa6123f89a",
                        "title": {
                            "en": "Copy of 12345"
                        },
                        "description": {
                            "en": "--"
                        },
                        "type": "assessment",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:38536c92-1d69-4116-8f4a-612b4446d91c",
                        "title": {
                            "en": "Copy of assessment with item name chapter"
                        },
                        "description": {
                            "en": "--"
                        },
                        "type": "assessment",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:a1c49063-a1e2-4b9e-909d-d17250ac4155",
                        "title": {
                            "en": "Elm Assessments title is OMJSBLEAQV"
                        },
                        "description": {
                            "en": "--"
                        },
                        "type": "assessment",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:9c1eb7f0-bef9-4de5-9529-bf32a5205ddd",
                        "title": {
                            "en": "Elm Assessments title is 4CTI5F629H"
                        },
                        "description": {
                            "en": "--"
                        },
                        "type": "assessment",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:f76d5705-f147-481a-80e7-3b2c7fa730db",
                        "title": {
                            "en": "Elm Assessments title is RB57BQFJ7U"
                        },
                        "description": {
                            "en": "--"
                        },
                        "type": "assessment",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:1a1385d2-4367-428c-9982-bd3dd9c02281",
                        "title": {
                            "en": "Elm Assessments title is JF7B3PFKKS"
                        },
                        "description": {
                            "en": "--"
                        },
                        "type": "assessment",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:582b215c-61f3-452e-a044-f344120c9462",
                        "title": {
                            "en": "Elm Assessments title is 53Q71PJDPJ_renamed again on mar 11"
                        },
                        "description": {
                            "en": "--"
                        },
                        "type": "assessment",
                        "usageType": "Plan"
                    }
                ]
            }
        ]
    },
    "contents": {
        "bodyMatter": [
            {
                "type": "container",
                "label": "part",
                "containerUrn": "urn:pearson:manifest:fa7817e4-a1fd-4f2a-8d65-bcb0cf37ff41",
                "contentUrn": "urn:pearson:entity:f9b98684-180b-4ec4-b9df-d4b360c06465",
                "versionUrn": "urn:pearson:manifest:fa7817e4-a1fd-4f2a-8d65-bcb0cf37ff41",
                "unformattedTitle": {
                    "en": "Part2"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:a44ec3f3-8519-4e2a-bdf6-babb5a8deeea",
                            "title": {
                                "en": "elm|urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5|urn:pearson:manifest:fa7817e4-a1fd-4f2a-8d65-bcb0cf37ff41"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5 container urn:pearson:manifest:fa7817e4-a1fd-4f2a-8d65-bcb0cf37ff41 alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:582b215c-61f3-452e-a044-f344120c9462",
                                    "title": {
                                        "en": "Elm Assessments title is 53Q71PJDPJ_renamed again on mar 11"
                                    },
                                    "description": {
                                        "en": "--"
                                    },
                                    "type": "assessment",
                                    "usageType": "Plan"
                                }
                            ]
                        }
                    ]
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "chapter",
                            "containerUrn": "urn:pearson:manifest:b714f6a5-f8ed-4094-9c82-ffb27364c6c9",
                            "contentUrn": "urn:pearson:entity:0bf828a6-e106-4a99-a020-c56e612c264f",
                            "versionUrn": "urn:pearson:manifest:b714f6a5-f8ed-4094-9c82-ffb27364c6c9",
                            "unformattedTitle": {
                                "en": "Chapter in part2"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:aee1d33e-63ab-43a9-b7a7-96978b9a2fda",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5|urn:pearson:manifest:b714f6a5-f8ed-4094-9c82-ffb27364c6c9"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5 container urn:pearson:manifest:b714f6a5-f8ed-4094-9c82-ffb27364c6c9 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:582b215c-61f3-452e-a044-f344120c9462",
                                                "title": {
                                                    "en": "Elm Assessments title is 53Q71PJDPJ_renamed again on mar 11"
                                                },
                                                "description": {
                                                    "en": "--"
                                                },
                                                "type": "assessment",
                                                "usageType": "Plan"
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                "type": "container",
                "label": "chapter",
                "containerUrn": "urn:pearson:manifest:426f2d79-1588-4cc1-a078-99a56c40f397",
                "contentUrn": "urn:pearson:entity:2c28c36c-a7e8-46de-b730-ce229dd331e3",
                "versionUrn": "urn:pearson:manifest:426f2d79-1588-4cc1-a078-99a56c40f397",
                "unformattedTitle": {
                    "en": "chapter2"
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "module",
                            "containerUrn": "urn:pearson:manifest:21681648-f723-4a54-afa2-0a0aa46005a4",
                            "contentUrn": "urn:pearson:entity:8d6e6474-f533-4401-b260-0b1d68e3c4df",
                            "versionUrn": "urn:pearson:manifest:21681648-f723-4a54-afa2-0a0aa46005a4",
                            "unformattedTitle": {
                                "en": "Module 1"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:aac3091c-4b3e-4d6d-9470-adf354b1db99",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5|urn:pearson:manifest:21681648-f723-4a54-afa2-0a0aa46005a4"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5 container urn:pearson:manifest:21681648-f723-4a54-afa2-0a0aa46005a4 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:a1c49063-a1e2-4b9e-909d-d17250ac4155",
                                                "title": {
                                                    "en": "Elm Assessments title is OMJSBLEAQV"
                                                },
                                                "description": {
                                                    "en": "--"
                                                },
                                                "type": "assessment",
                                                "usageType": "Plan"
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                "type": "container",
                "label": "chapter",
                "containerUrn": "urn:pearson:manifest:f3a0c1d3-65c9-4248-a2f9-eb4cf004e6f5",
                "contentUrn": "urn:pearson:entity:7a9d5690-fdba-463f-affe-027a5887fb76",
                "versionUrn": "urn:pearson:manifest:f3a0c1d3-65c9-4248-a2f9-eb4cf004e6f5",
                "unformattedTitle": {
                    "en": "Chapter3"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:f22aa956-2940-483a-ab9b-b2ad35991ef2",
                            "title": {
                                "en": "elm|urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5|urn:pearson:manifest:f3a0c1d3-65c9-4248-a2f9-eb4cf004e6f5"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5 container urn:pearson:manifest:f3a0c1d3-65c9-4248-a2f9-eb4cf004e6f5 alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:89f80ea9-b7ce-4122-8e63-2f2247025aec",
                                    "title": {
                                        "en": "Elm Assessments title is 2FT8OVRA5H"
                                    },
                                    "description": {
                                        "en": "--"
                                    },
                                    "type": "assessment",
                                    "usageType": "Plan"
                                }
                            ]
                        }
                    ]
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "module",
                            "containerUrn": "urn:pearson:manifest:76771486-4e08-4f9c-87d6-2a9b90a76e75",
                            "contentUrn": "urn:pearson:entity:c52d2603-324c-4d8a-a880-2962edb6614f",
                            "versionUrn": "urn:pearson:manifest:76771486-4e08-4f9c-87d6-2a9b90a76e75",
                            "unformattedTitle": {
                                "en": "Module 2"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:7ba681b3-25a9-4542-8889-17f7f8fe9bcc",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5|urn:pearson:manifest:76771486-4e08-4f9c-87d6-2a9b90a76e75"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5 container urn:pearson:manifest:76771486-4e08-4f9c-87d6-2a9b90a76e75 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:a6bcc806-7e8e-4db2-948b-554ed21489af",
                                                "title": {
                                                    "en": "Elm Assessments title is 15CHD63E2P"
                                                },
                                                "description": {
                                                    "en": "--"
                                                },
                                                "type": "assessment",
                                                "usageType": "Plan"
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                "type": "container",
                "label": "chapter",
                "containerUrn": "urn:pearson:manifest:6ddf6a75-d94d-4f00-a6ce-9fb7d067fcbf",
                "contentUrn": "urn:pearson:entity:ed18c361-41ac-4bc3-9b3c-47181dd49229",
                "versionUrn": "urn:pearson:manifest:6ddf6a75-d94d-4f00-a6ce-9fb7d067fcbf",
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "module",
                            "containerUrn": "urn:pearson:manifest:593e5bcd-3234-4a93-bb9c-ccc188b3cf23",
                            "contentUrn": "urn:pearson:entity:5576f745-14eb-4fe7-b980-279dfd24ff2b",
                            "versionUrn": "urn:pearson:manifest:593e5bcd-3234-4a93-bb9c-ccc188b3cf23",
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:4a2f3658-f3ed-4aa1-bd7b-e9e639c3a649",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5|urn:pearson:manifest:593e5bcd-3234-4a93-bb9c-ccc188b3cf23"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:60cbb11a-4be2-4f35-b3ef-d4faf5e7d1a5 container urn:pearson:manifest:593e5bcd-3234-4a93-bb9c-ccc188b3cf23 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:08e75a88-7529-4577-9a60-896479c8037c",
                                                "title": {
                                                    "en": "Elm Assessments title is DNKCST0N6R"
                                                },
                                                "description": {
                                                    "en": "--"
                                                },
                                                "type": "assessment",
                                                "usageType": "Plan"
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    }
}
describe('ELM root component test', () => {
    it('renders without crashing', () => {
        let store = mockStore(initialState);
        let props ={
            openedFrom: 'slateAssessment',
            usageTypeMetadata: 'Quiz',
            closeElmWindow: function(){},
            addPufFunction: function(){},
            elmResource: function(){},
       }

        const component = mount(<Provider store={store}><RootElmComponent {...props}/></Provider>)
        expect(component).toHaveLength(1);
        let instance = component.find('RootElmComponent').instance();
        expect(instance).toBeDefined();

    })
});