import React from 'react'
import Button from '../../../src/component/ElementButtons/ElementButton.jsx'
import ElementSaprator from '../../../src/component/ElementSaprator/'
import * as separatorFunctions from '../../../src/component/ElementSaprator/ElementSaprator.jsx'
import config from '../../../src/config/config.js';
import { mount} from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

let initialState = {
    appStore: {
        setSlateParent: 'part'
    },
    selectionReducer: {
        selection: {
            activeAnimation: true,
            deleteElm: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", parentUrn: undefined, asideData: undefined, contentUrn: "urn:pearson:entity:da9f3f72-2cc7-4567-8fb9-9a887c360979"},
            element: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
            inputSubType: "NA",
            inputType: "AUTHORED_TEXT",
            operationType: "copy",
            sourceElementIndex: 2,
            sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
            sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
        }
    },
    projectInfo:{
        showPlayscript:true,
        showDiscussion:true,
        projectSubscriptionDetails: {
            projectSharingRole: "SUBSCRIBER",
            isOwnersSubscribedSlateChecked: false,
            projectSubscriptionDetails: {
                isSubscribed: true
            }
        }
    }
}

let initialState3 = {
    appStore: {
        setSlateParent: 'chapter'
    },
    selectionReducer: {
        selection: {
            activeAnimation: true,
            deleteElm :{
                "id":"urn:pearson:manifest:4afd4505-8ba3-451a-8c02-1743170a7aa7",
                "type":"element-aside",
                "contentUrn":"urn:pearson:entity:80a745d4-5685-43d6-8f94-4def4a1152b8",
                "index":1,
                "cutCopyParentUrn":{
                   "manifestUrn":"urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810",
                   "contentUrn":"urn:pearson:entity:3b8557fa-cf93-47c6-8b28-43ee611a1af3",
                   "sourceSlateManifestUrn":"urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810",
                   "slateLevelData":{
                      "urn:pearson:manifest:41592354-160f-4c09-8d69-f4546e63f945":{
                         "id":"urn:pearson:manifest:41592354-160f-4c09-8d69-f4546e63f945",
                         "type":"manifest",
                         "schema":"http://schemas.pearson.com/wip-authoring/manifest/1",
                         "versionUrn":"urn:pearson:manifest:41592354-160f-4c09-8d69-f4546e63f945",
                         "contentUrn":"urn:pearson:entity:7f32d99e-8db8-4d78-8062-bfe834c7feb2",
                         "contents":{
                            "bodymatter":[
                               {
                                  "id":"urn:pearson:work:7ae139b7-bdb0-49c5-aea1-39ac684a487a",
                                  "type":"element-authoredtext",
                                  "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                  "elementdata":{
                                     "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                     "text":"uuuu rrr"
                                  },
                                  "html":{
                                     "text":"<p class=\"paragraphNumeroUno\">uuuu rrr</p>",
                                     "footnotes":{
                                        
                                     },
                                     "assetsPopover":{
                                        
                                     },
                                     "glossaryentries":{
                                        
                                     },
                                     "indexEntries":{
                                        
                                     }
                                  },
                                  "versionUrn":"urn:pearson:work:7ae139b7-bdb0-49c5-aea1-39ac684a487a",
                                  "contentUrn":"urn:pearson:entity:7a535a59-758c-4771-8814-98377534b51a"
                               },
                               {
                                  "id":"urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810",
                                  "type":"popup",
                                  "schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
                                  "versionUrn":"urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810",
                                  "contentUrn":"urn:pearson:entity:3b8557fa-cf93-47c6-8b28-43ee611a1af3",
                                  "status":"wip",
                                  "popupdata":{
                                     "bodymatter":[
                                        
                                     ],
                                     "postertextobject":[
                                        {
                                           "id":"urn:pearson:work:a7c5d8bf-6a2b-4c98-9069-65f33244084a",
                                           "type":"element-authoredtext",
                                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                           "elementdata":{
                                              "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                              "text":""
                                           },
                                           "html":{
                                              "text":"<p class=\"paragraphNumeroUno\"><br></p>",
                                              "footnotes":{
                                                 
                                              },
                                              "assetsPopover":{
                                                 
                                              },
                                              "glossaryentries":{
                                                 
                                              },
                                              "indexEntries":{
                                                 
                                              }
                                           },
                                           "versionUrn":"urn:pearson:work:a7c5d8bf-6a2b-4c98-9069-65f33244084a",
                                           "contentUrn":"urn:pearson:entity:9ca1969f-e7c0-4148-9d78-a633602da0db"
                                        }
                                     ]
                                  },
                                  "indexPos":[
                                     "1"
                                  ]
                               }
                            ],
                            "schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                         },
                         "status":"wip",
                         "pageNo":0,
                         "pageCount":1,
                         "pageLimit":25
                      },
                      "urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810":{
                         "id":"urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810",
                         "type":"popup",
                         "schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
                         "versionUrn":"urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810",
                         "contentUrn":"urn:pearson:entity:3b8557fa-cf93-47c6-8b28-43ee611a1af3",
                         "contents":{
                            "bodymatter":[
                               {
                                  "id":"urn:pearson:work:33579a4d-cb4f-4930-b9ad-a77b8d7640e2",
                                  "type":"element-authoredtext",
                                  "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                  "elementdata":{
                                     "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                     "text":""
                                  },
                                  "html":{
                                     "text":"<p class=\"paragraphNumeroUno\"><br></p>",
                                     "footnotes":{
                                        
                                     },
                                     "assetsPopover":{
                                        
                                     },
                                     "glossaryentries":{
                                        
                                     },
                                     "indexEntries":{
                                        
                                     }
                                  },
                                  "versionUrn":"urn:pearson:work:33579a4d-cb4f-4930-b9ad-a77b8d7640e2",
                                  "contentUrn":"urn:pearson:entity:b520dfc6-f8e2-48c1-a905-098ae3458d12"
                               },
                               {
                                  "id":"urn:pearson:manifest:4afd4505-8ba3-451a-8c02-1743170a7aa7",
                                  "type":"element-aside",
                                  "subtype":"sidebar",
                                  "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                  "designtype":"asideSidebar01",
                                  "elementdata":{
                                     "bodymatter":[
                                        {
                                           "id":"urn:pearson:work:f65a6198-dab4-4182-bcc4-26b424db7624",
                                           "type":"element-authoredtext",
                                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                           "elementdata":{
                                              "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                              "text":""
                                           },
                                           "html":{
                                              "text":"<p class=\"paragraphNumeroUno\"><br></p>",
                                              "footnotes":{
                                                 
                                              },
                                              "assetsPopover":{
                                                 
                                              },
                                              "glossaryentries":{
                                                 
                                              },
                                              "indexEntries":{
                                                 
                                              }
                                           },
                                           "versionUrn":"urn:pearson:work:f65a6198-dab4-4182-bcc4-26b424db7624",
                                           "contentUrn":"urn:pearson:entity:e2e47fb2-8191-462d-a2d5-5639ac9b8898",
                                           "parentDetails":[
                                              "urn:pearson:entity:80a745d4-5685-43d6-8f94-4def4a1152b8"
                                           ]
                                        }
                                     ],
                                     "schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                                  },
                                  "versionUrn":"urn:pearson:manifest:4afd4505-8ba3-451a-8c02-1743170a7aa7",
                                  "contentUrn":"urn:pearson:entity:80a745d4-5685-43d6-8f94-4def4a1152b8",
                                  "status":"wip",
                                  "indexPos":[
                                     "1"
                                  ]
                               }
                            ]
                         },
                         "status":"wip",
                         "pageNo":0
                      }
                   }
                }
            },
            element:{
                "id":"urn:pearson:manifest:4afd4505-8ba3-451a-8c02-1743170a7aa7",
                "type":'element-aside',
                "subtype":"sidebar",
                "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                "designtype":"asideSidebar01",
                "elementdata":{
                   "bodymatter":[
                      {
                         "id":"urn:pearson:work:f65a6198-dab4-4182-bcc4-26b424db7624",
                         "type":"element-authoredtext",
                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                         "elementdata":{
                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            "text":""
                         },
                         "html":{
                            "text":"<p class=\"paragraphNumeroUno\"><br></p>",
                            "footnotes":{
                               
                            },
                            "assetsPopover":{
                               
                            },
                            "glossaryentries":{
                               
                            },
                            "indexEntries":{
                               
                            }
                         },
                         "versionUrn":"urn:pearson:work:f65a6198-dab4-4182-bcc4-26b424db7624",
                         "contentUrn":"urn:pearson:entity:e2e47fb2-8191-462d-a2d5-5639ac9b8898",
                         "parentDetails":[
                            "urn:pearson:entity:80a745d4-5685-43d6-8f94-4def4a1152b8"
                         ]
                      }
                   ],
                   "schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                },
                "versionUrn":"urn:pearson:manifest:4afd4505-8ba3-451a-8c02-1743170a7aa7",
                "contentUrn":"urn:pearson:entity:80a745d4-5685-43d6-8f94-4def4a1152b8",
                "status":"wip",
                "indexPos":[
                   "1"
                ]
            },
            inputType:"ASIDE",
            inputSubType:"SIDEBAR_01",
            operationType: "cut",
            sourceElementIndex: 1,
            sourceSlateManifestUrn: "urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810",
            sourceSlateEntityUrn: "urn:pearson:entity:3b8557fa-cf93-47c6-8b28-43ee611a1af3",
            sourceEntityUrn: "urn:pearson:entity:3b8557fa-cf93-47c6-8b28-43ee611a1af3",
        }
    },
    projectInfo:{
        showPlayscript:true,
        showDiscussion:true,
        projectSubscriptionDetails: {
            projectSharingRole: "",
            isOwnersSubscribedSlateChecked: false,
            projectSubscriptionDetails: {
                isSubscribed: false
            }
        }
    }
}

let store = mockStore(initialState);
let store2 = mockStore(initialState3);

const METADATA_ANCHOR = 'metadata-anchor',
ELEMENT_ASIDE = 'element-aside',
CONTAINER_INTRO = 'container-introduction',
CITATION_GROUP_ELEMENT = 'citations',
SINGLE_COLUMN = 'group',
POETRY = 'poetry'
let esProps

function splithandlerfunction(type) {
    return ;
}
let propsData={data:[],
    setData:jest.fn(),
    showInteractiveOption:{},
    setshowInteractiveOption:jest.fn(),
    props:{}}

esProps = [
    {
        buttonType: 'text-elem',
        buttonHandler: () => splithandlerfunction('text-elem'),
        tooltipText: 'Text',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'image-elem',
        buttonHandler: () => splithandlerfunction('image-elem'),
        tooltipText: 'Image',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'audio-elem',
        buttonHandler: () => splithandlerfunction('audio-elem'),
        tooltipText: 'Audio/Video',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'interactive-elem-button',
        buttonHandler: () => splithandlerfunction('interactive-elem'),
        tooltipText: 'Interactive',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'assessment-elem',
        buttonHandler: () => splithandlerfunction('assessment-elem'),
        tooltipText: 'Assessment',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'container-elem-button',
        buttonHandler: () => this.splithandlerfunction('container-elem-button'),
        tooltipText: 'Container',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'worked-exp-elem',
        buttonHandler: () => splithandlerfunction('worked-exp-elem'),
        tooltipText: 'Worked Example',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'opener-elem',
        buttonHandler: () => splithandlerfunction('opener-elem'),
        tooltipText: 'Opener Element',
        tooltipDirection: 'left'
    },        
    {
        buttonType: 'citation-elem',
        buttonHandler: () => this.splithandlerfunction('citation-elem'),
        tooltipText: 'Citation Element',
        tooltipDirection: 'left'
    },
]

describe('Testing ElementSaprator rendering', () => {
    it('Render ElementSaprator with props split_slate permission', () => {
        let permissions = ['split_slate'];
        let elementType  = 'test';
        let firstOne = false;
        let props = {
            onClickCapture: jest.fn(),
            source: ''
        }
        let Es = mount(<Provider store={store}><ElementSaprator {...props} esProps = {esProps} permissions ={permissions} elementType = {elementType} firstOne= {firstOne}/></Provider>);
    })

    it('Render ElementSaprator with props elements_add_remove permission', () => {
        let permissions = ['elements_add_remove'];
        let elementType  = 'test';
        let firstOne = false;
        let props = {
            onClickCapture: jest.fn()
        }
        let Es = mount(<Provider store={store}><ElementSaprator {...props} esProps = {esProps} permissions ={permissions} elementType = {elementType} firstOne= {firstOne}/></Provider>);
    })
});
describe('Testing functions', () => {
    it('Testing renderDropdownButtons function CITATION_GROUP_ELEMENT else condition',() => {
        let sectionBreak = true
        let closeDropDown = ''
        config.slateType = 'container-introduction';
        config.isCO = false;
        config.isLOL = false;
        let newData = separatorFunctions.renderDropdownButtons(esProps, 'citations', sectionBreak, closeDropDown, propsData)
    })
    it('Testing renderDropdownButtons function ELEMENT_ASIDE else condition',() => {
        let sectionBreak = false
        let closeDropDown = ''
        config.slateType = 'container-introduction';
        config.isCO = false;
        config.isLOL = false;
        separatorFunctions.renderDropdownButtons(esProps, 'element-aside', sectionBreak, closeDropDown, propsData)
    })
});
describe('Testing functions', () => {

    it('splitSlateClickHandler  testing', () => {
        let tempWrapper;
        let props = {
            permissions: ['split_slate'],
            onClickCapture: jest.fn(),
            handleCopyPastePopup: jest.fn()
        }
        
        tempWrapper = mount(<Provider store={store}><ElementSaprator esProps={esProps} {...props}/></Provider>)
        tempWrapper.setProps({
            toggleSplitSlatePopup : true,
            showAudioSplitPopup: jest.fn()
        })
        tempWrapper.find(Button).at(0).simulate('click');
    })

    
    it('splitSlateClickHandler else testing', () => {
        let tempWrapper;
        let permissions = ['split_slate', 'elements_add_remove']
        let elementType  = 'test';
        let firstOne = false;
        let props = {
            onClickCapture: jest.fn(),
            openAudio: true,
            handleCopyPastePopup: jest.fn()
        }
        tempWrapper = mount(<Provider store={store}><ElementSaprator {...props} esProps={esProps} permissions ={permissions} elementType = {elementType} firstOne= {firstOne}/></Provider>)
        tempWrapper.setProps({
            toggleSplitSlatePopup : jest.fn(),
            showAudioSplitPopup: jest.fn(),
            handleCopyPastePopup: jest.fn()
        })
        tempWrapper.find(Button).at(0).simulate('click');
    })
    it('splitSlateClickHandler else-if testing', () => {
        let tempWrapper;
        let permissions = ['split_slate', 'elements_add_remove']
        let elementType  = 'test';
        let firstOne = false;
        let props = {
            onClickCapture: jest.fn(),
            handleCopyPastePopup: jest.fn()
        }
        tempWrapper = mount(<Provider store={store}><ElementSaprator {...props} esProps={esProps} permissions ={permissions} elementType = {elementType} firstOne= {firstOne}/></Provider>)
        tempWrapper.setProps({
            toggleSplitSlatePopup : jest.fn(),
            showAudioSplitPopup: jest.fn(),
            handleCopyPastePopup: jest.fn()
        })
        tempWrapper.find(Button).at(0).simulate('click');
    })
    

    it('toggleElementList  testing', () => {
        let tempWrapper;
        let props = {
            permissions: ['elements_add_remove'],
            onClickCapture: jest.fn(),
            handleCopyPastePopup: jest.fn()
        }
        
        let samplediv = document.createElement('div');
        let samplediv1 = document.createElement('div');
        let samplediv2 = document.createElement('div');
        samplediv.setAttribute('class', 'show' );
        samplediv1.setAttribute('class', 'show' );
        samplediv2.setAttribute('class', 'opacityClassOn');
        document.body.appendChild(samplediv);
        document.body.appendChild(samplediv1);
        document.body.appendChild(samplediv2);
        tempWrapper = mount(<Provider store={store}><ElementSaprator esProps={esProps} {...props}/></Provider>)
        tempWrapper.setProps({
            toggleSplitSlatePopup : true,
            showAudioSplitPopup: jest.fn()
        })
        tempWrapper.find(Button).at(0).simulate('click');
    })

    it('buttonhandler', () => {
        let tempWrapper;
        let permissions = ['split_slate', 'elements_add_remove']
        let elementType  = 'test';
        let firstOne = false;
        let props = {
            onClickCapture: jest.fn(),
        }
        tempWrapper = mount(<Provider store={store}><ElementSaprator {...props} esProps={esProps} permissions ={permissions} elementType = {elementType} firstOne= {firstOne}/></Provider>)
        tempWrapper.setProps({
            toggleSplitSlatePopup : jest.fn(),
            showAudioSplitPopup: jest.fn()
        })
        tempWrapper.find(Button).at(5).simulate('click');
    })
    
    it('Testing renderDropdownButtons function if condition',() => {
        let elementType = ''
        let sectionBreak = ''
        let closeDropDown = ''
        config.slateType = CONTAINER_INTRO;
        config.isCO = false;
        config.isLOL = true;

        let samplediv2 = document.createElement('div');
        samplediv2.setAttribute('class', METADATA_ANCHOR );
        document.body.appendChild(samplediv2);

        separatorFunctions.renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData)
    })

    it('Testing renderDropdownButtons function isCO else condition',() => {
        let elementType = ''
        let sectionBreak = ''
        let closeDropDown = ''
        config.slateType = CONTAINER_INTRO;
        config.isCO = true;
        config.isLOL = true;

        let samplediv2 = document.createElement('div');
        samplediv2.setAttribute('class', METADATA_ANCHOR );
        document.body.appendChild(samplediv2);

        separatorFunctions.renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData)
    })

    
    it('Testing renderDropdownButtons function ELEMENT_ASIDE if condition',() => {
        let elementType = ELEMENT_ASIDE
        let sectionBreak = true
        let closeDropDown = ''
        config.slateType = 'adsdfsdf';
        config.isCO = true;
        config.isLOL = true;

        config.parentEntityUrn = 'Front Matter' 
        config.parentEntityUrn = 'Back Matter'

        separatorFunctions.renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData)
    })
    it('Testing renderDropdownButtons function CITATION_GROUP_ELEMENT if condition',() => {
        let elementType = CITATION_GROUP_ELEMENT
        let sectionBreak = true
        let closeDropDown = ''
        config.slateType = 'adsdfsdf';
        config.isCO = true;
        config.isLOL = true;

        config.parentEntityUrn = 'Front Matter' 
        config.parentEntityUrn = 'Back Matter'

        separatorFunctions.renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData)
    })

    it('Testing renderDropdownButtons function ELEMENT_ASIDE if-else condition',() => {
        let elementType = ''
        let sectionBreak = true
        let closeDropDown = ''
        config.slateType = 'adsdfsdf';
        config.isCO = true;
        config.isLOL = true;

        config.parentEntityUrn = 'Front Matter' 
        config.parentEntityUrn = 'Back Matter'

        separatorFunctions.renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData)
    })

    it('Testing renderDropdownButtons function ELEMENT_ASIDE if-else condition',() => {
        let elementType = ELEMENT_ASIDE
        let sectionBreak = ''
        let closeDropDown = ''
        config.slateType = 'adsdfsdf'
        config.parentEntityUrn = 'urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527' 
        separatorFunctions.renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData)
    })

    it('Testing renderConditionalButtons function -  element type SINGLE_COLUMN else if condition', () => {
        let elementType = SINGLE_COLUMN
        let sectionBreak = ''
        let closeDropDown = ''
        config.slateType = 'adsdfsdf'
        config.parentEntityUrn = 'urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527'
        esProps.buttonType = 'interactive-elem-button'
        config.isPopupSlate = true
        separatorFunctions.renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData)
    })

    it('Testing renderConditionalButtons function -  element type POETRY else if condition', () => {
        let elementType = POETRY
        let sectionBreak = ''
        let closeDropDown = ''
        config.slateType = 'adsdfsdf'
        config.parentEntityUrn = 'urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527'
        esProps.buttonType = 'interactive-elem-button'
        config.isPopupSlate = true
        separatorFunctions.renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData)
    })

    it('Testing renderConditionalButtons function -  element type = group, subtype = tab', () => {
        let sectionBreak = ''
        let closeDropDown = ''
        config.slateType = 'adsdfsdf'
        config.parentEntityUrn = 'urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527'
        esProps.buttonType = 'interactive-elem-button'
        config.isPopupSlate = true
        separatorFunctions.renderDropdownButtons(esProps, "group", sectionBreak, closeDropDown, propsData, "tab")
    })

    it('Testing pasteElement function - cut', () => {
        const separatorProps = {
            index: 2,
            firstOne: false,
            elementSelection: { element: { id: "urn:pearson:work:324234-4252423fds-23423fds3fgr3" } },
            pasteElement : jest.fn()
        },
        togglePaste = jest.fn(),
        type = 'cut';
        const spyPasteFn = jest.spyOn(separatorFunctions, "pasteElement")
        separatorFunctions.pasteElement(separatorProps, togglePaste, type)
        expect(spyPasteFn).toHaveBeenCalled()
    })

    it('Testing pasteElement function - aside-copy', () => {
        const separatorProps = {
            index: 2,
            firstOne: false,
            elementSelection: { element: { id: "urn:pearson:work:324234-4252423fds-23423fds3fgr3", type: "element-aside" } },
            pasteElement : jest.fn(),
            cloneContainer: jest.fn()
        },
        togglePaste = jest.fn(),
        type = 'copy';
        const spyPasteFn = jest.spyOn(separatorFunctions, "pasteElement")
        separatorFunctions.pasteElement(separatorProps, togglePaste, type)
        expect(spyPasteFn).toHaveBeenCalled()
    })

    it('Testing pasteElement function - showhide with index', () => {
        const separatorProps = {
            elementType: 'showhide',
            index: '0-1',
            firstOne: false,
            elementSelection: { element: { id: "urn:pearson:work:324234-4252423fds-23423fds3fgr3", type: "element-aside" } },
            pasteElement : jest.fn(),
            cloneContainer: jest.fn()
        },
        togglePaste = jest.fn(),
        type = 'copy';
        const spyPasteFn = jest.spyOn(separatorFunctions, "pasteElement")
        separatorFunctions.pasteElement(separatorProps, togglePaste, type)
        expect(spyPasteFn).toHaveBeenCalled()
    })
    
    it('Testing pasteElement function - showhide without index', () => {
        const separatorProps = {
            elementType: 'showhide',
            firstOne: false,
            elementSelection: { element: { id: "urn:pearson:work:324234-4252423fds-23423fds3fgr3", type: "element-aside" } },
            pasteElement : jest.fn(),
            cloneContainer: jest.fn()
        },
        togglePaste = jest.fn(),
        type = 'copy';
        const spyPasteFn = jest.spyOn(separatorFunctions, "pasteElement")
        separatorFunctions.pasteElement(separatorProps, togglePaste, type)
        expect(spyPasteFn).toHaveBeenCalled()
    })

    it('Testing pasteElement function - pasteFnArgs object creation', () => {
        const separatorProps = {
            index: 2,
            firstOne: true,
            elementSelection: { element: { id: "urn:pearson:work:324234-4252423fds-23423fds3fgr3" } },
            pasteElement: jest.fn(),
            parentUrn: '',
            asideData: '',
            poetryData: ''
        },
            togglePaste = jest.fn(),
            type = 'cut';
        const spyPasteFn = jest.spyOn(separatorFunctions, "pasteElement")
        separatorFunctions.pasteElement(separatorProps, togglePaste, type)
        expect(spyPasteFn).toHaveBeenCalled()
    })

    it('Testing pasteElement function - versioning saving call in progress', () => {
        config.savingInProgress = true
        const separatorProps = {
            index: 2,
            firstOne: false,
            elementSelection: { element: { id: "urn:pearson:work:324234-4252423fds-23423fds3fgr3", type: "element-aside" } },
            pasteElement : jest.fn()
        },
        togglePaste = jest.fn(),
        type = 'copy';
        const spyPasteFn = jest.spyOn(separatorFunctions, "pasteElement")
        separatorFunctions.pasteElement(separatorProps, togglePaste, type)
        expect(spyPasteFn).toHaveReturnedWith(false)
    })

    it('Testing rendering paste button for complex elements in POPUp', () => {
        let props ={
            "userRole":"admin",
            "firstOne":true,
            "index":0,
            "esProps":[
               {
                  "buttonType":"text-elem",
                  "tooltipText":"Text",
                  "tooltipDirection":"left"
               },
               {
                  "buttonType":"image-elem",
                  "tooltipText":"Image",
                  "tooltipDirection":"left"
               },
               {
                  "buttonType":"audio-elem",
                  "tooltipText":"Audio/Video",
                  "tooltipDirection":"left"
               },
               {
                  "buttonType":"block-text-button",
                  "tooltipText":"Block Text",
                  "tooltipDirection":"left"
               },
               {
                  "buttonType":"interactive-elem-button",
                  "tooltipText":"Interactive",
                  "tooltipDirection":"left"
               },
               {
                  "buttonType":"table-editor-elem-button",
                  "tooltipText":"Table",
                  "tooltipDirection":"left"
               },
               {
                  "buttonType":"assessment-elem",
                  "tooltipText":"Assessment",
                  "tooltipDirection":"left"
               },
               {
                  "buttonType":"container-elem-button",
                  "tooltipText":"Container",
                  "tooltipDirection":"left"
               },
               {
                  "buttonType":"worked-exp-elem",
                  "tooltipText":"Worked Example",
                  "tooltipDirection":"left"
               },
               {
                  "buttonType":"multi-column-group",
                  "tooltipText":"Multi Column",
                  "tooltipDirection":"left"
               },
               {
                  "buttonType":"section-break-elem",
                  "tooltipText":"Section Break",
                  "tooltipDirection":"left"
               },
               {
                  "buttonType":"metadata-anchor",
                  "tooltipText":"Metadata Anchor",
                  "tooltipDirection":"left"
               },
               {
                  "buttonType":"opener-elem",
                  "tooltipText":"Opener Element",
                  "tooltipDirection":"left"
               },
               {
                  "buttonType":"citation-elem",
                  "tooltipText":"Citation Element",
                  "tooltipDirection":"left"
               },
               {
                  "buttonType":"stanza-elem",
                  "tooltipText":"Stanza",
                  "tooltipDirection":"left"
               }
            ],
            "elementType":"test",
            "permissions":[
               "generate_epub_output",
               "demand_on_print",
               "toggle_tcm",
               "add_instructor_resource_url",
               "grid_crud_access",
               "alfresco_crud_access",
               "project_edit",
               "edit_project_title_author",
               "promote_review",
               "promote_live",
               "create_new_version",
               "project_add_delete_users",
               "toc_add_pages",
               "toc_delete_entry",
               "toc_rearrange_entry",
               "toc_edit_title",
               "elements_add_remove",
               "split_slate",
               "access_formatting_bar",
               "authoring_mathml",
               "trackchanges_approve_reject",
               "notes_access_manager",
               "quad_create_edit_ia",
               "quad_linking_assessment",
               "add_multimedia_via_alfresco",
               "toggle_element_page_no",
               "toggle_element_borders",
               "global_search",
               "global_replace",
               "edit_print_page_no",
               "notes_adding",
               "notes_deleting",
               "notes_delete_others_comment",
               "note_viewer",
               "notes_assigning",
               "notes_resolving_closing",
               "notes_relpying",
               "note_search_comment",
               "lo_edit_metadata",
               "preflight_access",
               "access-to-cypress+",
               "toggle_auto_numbering",
               "login",
               "logout",
               "content_preview",
               "set_favorite_project",
               "sort_projects",
               "search_projects",
               "full_project_slate_preview",
               "slate_traversal",
               "trackchanges_edit",
               "tcm_feedback",
               "learnosity_access",
               "create_custom_user"
            ],
            "openAudio":false,
            "source":"TEXT",
            "setSlateParent":"chapter",
            "elementSelection":{
               "element":{
                  "id":"urn:pearson:manifest:4afd4505-8ba3-451a-8c02-1743170a7aa7",
                  "type":'element-aside',
                  "subtype":"sidebar",
                  "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                  "designtype":"asideSidebar01",
                  "elementdata":{
                     "bodymatter":[
                        {
                           "id":"urn:pearson:work:f65a6198-dab4-4182-bcc4-26b424db7624",
                           "type":"element-authoredtext",
                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                           "elementdata":{
                              "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                              "text":""
                           },
                           "html":{
                              "text":"<p class=\"paragraphNumeroUno\"><br></p>",
                              "footnotes":{
                                 
                              },
                              "assetsPopover":{
                                 
                              },
                              "glossaryentries":{
                                 
                              },
                              "indexEntries":{
                                 
                              }
                           },
                           "versionUrn":"urn:pearson:work:f65a6198-dab4-4182-bcc4-26b424db7624",
                           "contentUrn":"urn:pearson:entity:e2e47fb2-8191-462d-a2d5-5639ac9b8898",
                           "parentDetails":[
                              "urn:pearson:entity:80a745d4-5685-43d6-8f94-4def4a1152b8"
                           ]
                        }
                     ],
                     "schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                  },
                  "versionUrn":"urn:pearson:manifest:4afd4505-8ba3-451a-8c02-1743170a7aa7",
                  "contentUrn":"urn:pearson:entity:80a745d4-5685-43d6-8f94-4def4a1152b8",
                  "status":"wip",
                  "indexPos":[
                     "1"
                  ]
               },
               "operationType":"cut",
               "activeAnimation":true,
               "sourceElementIndex":1,
               "tcmFlag":false,
               "sourceSlateManifestUrn":"urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810",
               "sourceSlateEntityUrn":"urn:pearson:entity:3b8557fa-cf93-47c6-8b28-43ee611a1af3",
               "sourceEntityUrn":"urn:pearson:entity:3b8557fa-cf93-47c6-8b28-43ee611a1af3",
               "deleteElm":{
                  "id":"urn:pearson:manifest:4afd4505-8ba3-451a-8c02-1743170a7aa7",
                  "type":"element-aside",
                  "contentUrn":"urn:pearson:entity:80a745d4-5685-43d6-8f94-4def4a1152b8",
                  "index":1,
                  "cutCopyParentUrn":{
                     "manifestUrn":"urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810",
                     "contentUrn":"urn:pearson:entity:3b8557fa-cf93-47c6-8b28-43ee611a1af3",
                     "sourceSlateManifestUrn":"urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810",
                     "slateLevelData":{
                        "urn:pearson:manifest:41592354-160f-4c09-8d69-f4546e63f945":{
                           "id":"urn:pearson:manifest:41592354-160f-4c09-8d69-f4546e63f945",
                           "type":"manifest",
                           "schema":"http://schemas.pearson.com/wip-authoring/manifest/1",
                           "versionUrn":"urn:pearson:manifest:41592354-160f-4c09-8d69-f4546e63f945",
                           "contentUrn":"urn:pearson:entity:7f32d99e-8db8-4d78-8062-bfe834c7feb2",
                           "contents":{
                              "bodymatter":[
                                 {
                                    "id":"urn:pearson:work:7ae139b7-bdb0-49c5-aea1-39ac684a487a",
                                    "type":"element-authoredtext",
                                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata":{
                                       "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                       "text":"uuuu rrr"
                                    },
                                    "html":{
                                       "text":"<p class=\"paragraphNumeroUno\">uuuu rrr</p>",
                                       "footnotes":{
                                          
                                       },
                                       "assetsPopover":{
                                          
                                       },
                                       "glossaryentries":{
                                          
                                       },
                                       "indexEntries":{
                                          
                                       }
                                    },
                                    "versionUrn":"urn:pearson:work:7ae139b7-bdb0-49c5-aea1-39ac684a487a",
                                    "contentUrn":"urn:pearson:entity:7a535a59-758c-4771-8814-98377534b51a"
                                 },
                                 {
                                    "id":"urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810",
                                    "type":"popup",
                                    "schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
                                    "versionUrn":"urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810",
                                    "contentUrn":"urn:pearson:entity:3b8557fa-cf93-47c6-8b28-43ee611a1af3",
                                    "status":"wip",
                                    "popupdata":{
                                       "bodymatter":[
                                          
                                       ],
                                       "postertextobject":[
                                          {
                                             "id":"urn:pearson:work:a7c5d8bf-6a2b-4c98-9069-65f33244084a",
                                             "type":"element-authoredtext",
                                             "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                             "elementdata":{
                                                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text":""
                                             },
                                             "html":{
                                                "text":"<p class=\"paragraphNumeroUno\"><br></p>",
                                                "footnotes":{
                                                   
                                                },
                                                "assetsPopover":{
                                                   
                                                },
                                                "glossaryentries":{
                                                   
                                                },
                                                "indexEntries":{
                                                   
                                                }
                                             },
                                             "versionUrn":"urn:pearson:work:a7c5d8bf-6a2b-4c98-9069-65f33244084a",
                                             "contentUrn":"urn:pearson:entity:9ca1969f-e7c0-4148-9d78-a633602da0db"
                                          }
                                       ]
                                    },
                                    "indexPos":[
                                       "1"
                                    ]
                                 }
                              ],
                              "schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                           },
                           "status":"wip",
                           "pageNo":0,
                           "pageCount":1,
                           "pageLimit":25
                        },
                        "urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810":{
                           "id":"urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810",
                           "type":"popup",
                           "schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
                           "versionUrn":"urn:pearson:manifest:44597f60-9740-4a2f-acc9-99462e39f810",
                           "contentUrn":"urn:pearson:entity:3b8557fa-cf93-47c6-8b28-43ee611a1af3",
                           "contents":{
                              "bodymatter":[
                                 {
                                    "id":"urn:pearson:work:33579a4d-cb4f-4930-b9ad-a77b8d7640e2",
                                    "type":"element-authoredtext",
                                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata":{
                                       "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                       "text":""
                                    },
                                    "html":{
                                       "text":"<p class=\"paragraphNumeroUno\"><br></p>",
                                       "footnotes":{
                                          
                                       },
                                       "assetsPopover":{
                                          
                                       },
                                       "glossaryentries":{
                                          
                                       },
                                       "indexEntries":{
                                          
                                       }
                                    },
                                    "versionUrn":"urn:pearson:work:33579a4d-cb4f-4930-b9ad-a77b8d7640e2",
                                    "contentUrn":"urn:pearson:entity:b520dfc6-f8e2-48c1-a905-098ae3458d12"
                                 },
                                 {
                                    "id":"urn:pearson:manifest:4afd4505-8ba3-451a-8c02-1743170a7aa7",
                                    "type":"element-aside",
                                    "subtype":"sidebar",
                                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                    "designtype":"asideSidebar01",
                                    "elementdata":{
                                       "bodymatter":[
                                          {
                                             "id":"urn:pearson:work:f65a6198-dab4-4182-bcc4-26b424db7624",
                                             "type":"element-authoredtext",
                                             "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                             "elementdata":{
                                                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                "text":""
                                             },
                                             "html":{
                                                "text":"<p class=\"paragraphNumeroUno\"><br></p>",
                                                "footnotes":{
                                                   
                                                },
                                                "assetsPopover":{
                                                   
                                                },
                                                "glossaryentries":{
                                                   
                                                },
                                                "indexEntries":{
                                                   
                                                }
                                             },
                                             "versionUrn":"urn:pearson:work:f65a6198-dab4-4182-bcc4-26b424db7624",
                                             "contentUrn":"urn:pearson:entity:e2e47fb2-8191-462d-a2d5-5639ac9b8898",
                                             "parentDetails":[
                                                "urn:pearson:entity:80a745d4-5685-43d6-8f94-4def4a1152b8"
                                             ]
                                          }
                                       ],
                                       "schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
                                    },
                                    "versionUrn":"urn:pearson:manifest:4afd4505-8ba3-451a-8c02-1743170a7aa7",
                                    "contentUrn":"urn:pearson:entity:80a745d4-5685-43d6-8f94-4def4a1152b8",
                                    "status":"wip",
                                    "indexPos":[
                                       "1"
                                    ]
                                 }
                              ]
                           },
                           "status":"wip",
                           "pageNo":0
                        }
                     }
                  }
               },
               "inputType":"ASIDE",
               "inputSubType":"SIDEBAR_01",
               "containsBlockList":false,
               "elmComment":[
                  
               ],
               "elmFeedback":[
                  
               ]
            },
            "showPlayscript":true,
            "showDiscussion":true,
            "projectSubscriptionDetails":{
               "usageType":[
                  
               ],
               "discussionItems":[
                  
               ],
               "showPlayscript":true,
               "showDiscussion":true,
               "projectSharingRole":"",
               "projectSubscriptionDetails":{
                  "isSubscribed":false,
                  "owner":{
                     
                  }
               },
               "isOwnersSubscribedSlateChecked":true,
               "workflowRole":{
                  
               },
               "LOBList":[
                  {
                     "lineOfBusiness":"highernationalonline",
                     "label":"HNO",
                     "description":"Higher National Online"
                  },
                  {
                     "lineOfBusiness":"onlineblendedlearning",
                     "label":"OBL",
                     "description":"OBL/Online Blended Learning"
                  },
                  {
                     "lineOfBusiness":"onlineenglishproficiency",
                     "label":"OEP",
                     "description":"Online English Proficiency"
                  }
               ],
               "showDiscussionLOBDropdown":false
            }
         };
        config.isPopupSlate = true;
        let elementType = 'test';

        mount(<Provider store={store2}><ElementSaprator {...props}  elementType={elementType} /></Provider>)
    })

    it('Testing useEffect - if block', () => {
        jest.mock('../../../src/constants/utility.js', () => {
            return {
                isSubscriberRole: () => {
                    return true
                },
                isOwnerRole:()=>{
                    return false
                },
                handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' )
            }
        })
        let props = {
            elementSelection: {},
            projectSubscriptionDetails: {
                projectSharingRole: "SUBSCRIBER",
                isOwnersSubscribedSlateChecked: false,
                projectSubscriptionDetails: {
                    isSubscribed: true
                }
            }
        };
        let permissions = ['elements_add_remove']
        let elementType = 'test';
        let firstOne = false;
        let initialState2 = { ...initialState, selectionReducer: { selection: {} } };
        let store2 = mockStore(initialState2);
        const map = {}
        document.addEventListener = jest.fn((event, cb) => {
            map[event] = cb
        })
        mount(<Provider store={store2}><ElementSaprator {...props} esProps={esProps} permissions={permissions} elementType={elementType} firstOne={firstOne} /></Provider>)
        map.mousedown({ target: document.body })
    })

    it('Testing renderDropdownButtons function - asideData - groupedcontent', () => {
        const spyTypeOfContainerElements = jest.spyOn(separatorFunctions, "typeOfContainerElements");
        const element = {
            buttonType: 'container-elem-button'
        }
        const props = {
            asideData: {
                type: "groupedcontent"
            }
        }
        separatorFunctions.typeOfContainerElements(element, props);
        expect(spyTypeOfContainerElements).toHaveBeenCalled()
    })

    it('Testing renderDropdownButtons function - asideData - groupedcontent', () => {
        const spyTypeOfContainerElements = jest.spyOn(separatorFunctions, "typeOfContainerElements");
        const element = {
            buttonType: 'container-elem-button'
        }
        const props = {
            asideData: {
                type: "groupedcontent",
                subtype: "tab"
            }
        }
        separatorFunctions.typeOfContainerElements(element, props);
        expect(spyTypeOfContainerElements).toHaveBeenCalled()
    })

    it('Testing renderDropdownButtons function - asideData - showhide', () => {
        const spyTypeOfContainerElements = jest.spyOn(separatorFunctions, "typeOfContainerElements");
        const element = {
            buttonType: 'container-elem-button'
        }
        const props = {
            asideData: {
                type: "showhide"
            }
        }
        separatorFunctions.typeOfContainerElements(element, props);
        expect(spyTypeOfContainerElements).toHaveBeenCalled()
    })
    it('Testing renderDropdownButtons function - else block', () => {
        const spyTypeOfContainerElements = jest.spyOn(separatorFunctions, "typeOfContainerElements");
        const element = {
            buttonType: ''
        }
        const props = {}
        separatorFunctions.typeOfContainerElements(element, props);
        expect(spyTypeOfContainerElements).toHaveBeenCalled()
    });
    it('Testing renderDropdownButtons function -if asideData/we inside showhide then block interactive', () => {
        const spyTypeOfContainerElements = jest.spyOn(separatorFunctions, "typeOfContainerElements");
        const props = {
            asideData:{
                type:"element-aside",
                parent:{
                    type:'showhide'
                }
            }
        }
        const element = {
            buttonType:'interactive-elem-button'
        }
        separatorFunctions.typeOfContainerElements(element, props);
        expect(spyTypeOfContainerElements).toHaveBeenCalled()
    });
    it('Testing renderDropdownButtons function -if asideData/we inside showhide then block block-text-button', () => {
        const spyTypeOfContainerElements = jest.spyOn(separatorFunctions, "typeOfContainerElements");
        const props = {
            asideData:{
                type:"element-aside",
                parent:{
                    type:'showhide'
                }
            }
        }
        const element = {
            buttonType:'block-text-button'
        }
        separatorFunctions.typeOfContainerElements(element, props);
        expect(spyTypeOfContainerElements).toHaveBeenCalled()
    });
    it('Testing renderDropdownButtons# function - Do not show block poetry option inside SH if SH is inside Aside/WE/MultiColumn', () => {
        const spyTypeOfContainerElements = jest.spyOn(separatorFunctions, "typeOfContainerElements");
        const props = {
            asideData:{
                grandParent:{
                    asideData:{
                        type1:"type1",
                        type2:"type2"
                    }
                }
            }
        }
        const element = {
            buttonType:'block-text-button'
        }
        separatorFunctions.typeOfContainerElements(element, props);
        expect(spyTypeOfContainerElements).toHaveBeenCalled()
    });

    it('Testing typeOfContainerElements - elem?.buttonType === "multi-column-group" && config.isPopupSlate', () => {
        const spyTypeOfContainerElements = jest.spyOn(separatorFunctions, "typeOfContainerElements");
        const element = {
            buttonType: 'multi-column-group'
        }
        const props = {
            asideData: {
                type: "groupedcontent"
            }
        }
        separatorFunctions.typeOfContainerElements(element, props);
        expect(spyTypeOfContainerElements).toHaveBeenCalled()
    })
});