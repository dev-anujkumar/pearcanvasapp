import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { JSDOM } from 'jsdom';
const middlewares = [thunk];
import axios from 'axios';
const mockStore = configureMockStore(middlewares);
import slateData from '../../../fixtures/SidebarTestData'
import activeElementData from './SidebarInitialState';
import * as sidebarAction from '../../../src/component/Sidebar/Sidebar_Action';
import config from '../../../src/config/config';
jest.mock('axios');
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn()
}))
jest.mock('../../../src/config/config.js', () => ({
    slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
    slateEntityURN: "urn:pearson:entity:2b03e70f-8730-451b-9f9a-b496b6d91c9e",
    projectUrn: "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d",
    projectEntityUrn: "urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c",
    REACT_APP_API_URL: "https://10.11.7.246:8081/cypress-api/",
    ssoToken: "IZaFs6qIbKAo1yX0WaRCz6fagzA.*AAJTSQACMDIAAlNLABw5WUNuT3h6MEN0OHRFRUlEZUxFamxQa1EyNm89AAJTMQACMDE.*",
    conversionInProcess : false,
    savingnInProcess : false,
    elementStatus : { "urn:pearson:work:4b70896d-090a-4566-97f1-30c080a708b5" : 'wip'}
}))
const initialState = {
    appStore: {
        slateLevelData: slateData.SlateData1,
        activeElement: activeElementData.paragraph
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState2 = {
    appStore: {
        slateLevelData: slateData.SlateData1,
        activeElement: activeElementData.assessment,
        parentUrn:{}
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState3 = {
    appStore: {
        slateLevelData: slateData.SlateData1,
        activeElement:activeElementData.image
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState4 = {
    appStore: {
        slateLevelData: slateData.SlateData1,
        activeElement: activeElementData.video
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState5 = {
    appStore: {
        slateLevelData: slateData.SlateData1,
        activeElement:activeElementData.interactive
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState6 = {
    appStore: {
        slateLevelData: slateData.SlateData1,
        activeElement:activeElementData.blockcode
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState7 = {
    appStore: {
        slateLevelData: slateData.SlateData1,
        activeElement:activeElementData.list
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState8 = {
    appStore: {
        slateLevelData: slateData.SlateData1,
        activeElement: activeElementData.workedexample
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState9 = {
    appStore: {
        slateLevelData: slateData.SlateData1,
        activeElement:activeElementData.aside 
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState10 = {
    appStore: {
        slateLevelData: slateData.SlateData1,
        activeElement:activeElementData.aside_authoredtext
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState11 = {
    appStore: {
        slateLevelData: slateData.SlateData1,
        activeElement: activeElementData.we_authoredtext
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState12 = {
    appStore: {
        slateLevelData: slateData.SlateData2,
        activeElement: activeElementData.we_conversiondata,
        parentUrn: {
            manifestUrn: "urn:pearson:manifest:86fab86c-16ca-4428-9e38-bc15ebdbee49",
            contentUrn: "urn:pearson:entity:646f6acc-e6ce-4ac4-ab04-4e526a6cb866",
            elementType: "element-aside"
        }
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState13 = {
    appStore: {
        slateLevelData: slateData.SlateData2,
        activeElement: activeElementData.Section_ActiveElement,
        parentUrn: {
            manifestUrn: "urn:pearson:manifest:b254fd3f-ce8a-467b-9490-5dcd753de461",
            contentUrn: "urn:pearson:entity:d869c4a6-2ba6-4716-baea-0374393bc784",
            elementType: "manifest"
        }
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState14 = {
    appStore: {
        slateLevelData: slateData.SlateData3,
        activeElement: activeElementData.Aside_ActiveElement,
        parentUrn: {
            manifestUrn: "urn:pearson:manifest:8ed3c625-233e-48ca-a65c-3c4a80242f29",
            contentUrn: "urn:pearson:entity:bc7aea75-84b1-4343-ab8e-fb03d4987337",
            elementType: "element-aside"            
        }
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState15 = {
    appStore: {
        slateLevelData: slateData.SlateData3,
        activeElement: activeElementData.Aside_MMI_ActiveElement,
        parentUrn: {
            manifestUrn: "urn:pearson:manifest:8ed3c625-233e-48ca-a65c-3c4a80242f29",
            contentUrn: "urn:pearson:entity:bc7aea75-84b1-4343-ab8e-fb03d4987337",
            elementType: "element-aside"
        },
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState16 = {
    appStore: {
        slateLevelData: slateData.SlateData4,
        activeElement: activeElementData.SH_ActiveElement,
        parentUrn: {}
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState17 = {
    appStore: {
        slateLevelData: slateData.SlateData4,
        activeElement: activeElementData.SH_Aside,        
        parentUrn: {
            manifestUrn: "urn:pearson:manifest:fdbdba27-bbc4-4515-bde9-3ecd95eb613e",
            contentUrn: "urn:pearson:entity:808c0c76-1786-455a-8410-4f250384b142",
            elementType: "element-aside"
        },
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState18 = {
    appStore: {
        slateLevelData: slateData.SlateData4,
        activeElement: activeElementData.SH_WE_ActiveElement,
        parentUrn: {
            manifestUrn: "urn:pearson:manifest:bc9d51e0-f0df-4127-b09e-9d5e4f75cc36",
            contentUrn: "urn:pearson:entity:5d6c4a51-2587-4250-8423-061b67aebe5e",
            elementType: "element-aside"
        },
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState19 = {
    appStore: {
        slateLevelData: slateData.SlateData4,
        activeElement: activeElementData.BlockCode_OldInfo,
        parentUrn: {},
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[{elemURN : "urn:pearson:work:4b70896d-090a-4566-97f1-30c080a708b5"},{elemURN : "urn:pearson:work:4b70896d-090a-4566-97f1-30c080a708b4"}]
    }
}
describe('Test - Sidebar_Actions',()=>{
    describe('Test convertElement- paragraph', () => {
        let store = mockStore(() => initialState);
        it('Test Convert Element', () => {
            store = mockStore(() => initialState);
            let elementData = {
                elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
                elementType: "element-authoredtext",
                labelText: "H1",
                primaryOption: "primary-heading",
                secondaryOption: "secondary-heading-1",
                toolbar: ["bold", "underline", "strikethrough", "orderedlist", "unorderedlist", "increaseindent", "decreaseindent", "glossary", "assetpopover", "slatetag", "redo"]
            }
            let store = mockStore(() => initialState);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(elementData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
        it('Test handleElementConversion -else case', () => {
            store = mockStore(() => initialState);
            let elementData = {
                elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                elementType: "element-authoredtext",
                labelText: "H1",
                primaryOption: "primary-heading",
                secondaryOption: "secondary-heading-1",
                toolbar: ["bold", "underline", "strikethrough", "orderedlist", "unorderedlist", "increaseindent", "decreaseindent", "glossary", "assetpopover", "slatetag", "redo"]
            }
            let store = mockStore(() => initialState);
    
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(elementData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
    });
    describe('Test convertElement- figure-IMAGE', () => {
        let store = mockStore(() => initialState3);
        it('Test convertElement  -figure-IMAGE to TABLE', () => {
            store = mockStore(() => initialState3);
            let newData = {
                elementId: "urn:pearson:work:be34d78e-1638-4fcc-8511-5db7a3d4b395",
                elementType: "figure",
                labelText: "TB",
                primaryOption: "primary-image-table",
                secondaryOption: "secondary-image-table-half",
                toolbar: ["assetpopover", "decreaseindent", "glossary"]
            }
            let store = mockStore(() => initialState3);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(newData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
    });
    describe('Test convertElement- figure-VIDEO ', () => {
        let store = mockStore(() => initialState4);
        it('Test convertElement  -figure-IMAGE to TABLE', () => {
            store = mockStore(() => initialState4);
            let newData = {
                elementId: "urn:pearson:work:e4d3e2ce-71f6-4ffa-9868-3d0b00a69f75",
                elementType: "video-audio",
                labelText: "VID",
                primaryOption: "primary-video",
                secondaryOption: "secondary-video-smartlink",
                toolbar: ["assetpopover", "glossary"]
            }
            let store = mockStore(() => initialState4);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(newData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
    });
    describe('Test convertElement- figure-INTERACTIVE ', () => {
        let store = mockStore(() => initialState5);
        it('Test convertElement  -MMI-SMARTLINK', () => {
            store = mockStore(() => initialState5);
            let newData = {
                elementId: "urn:pearson:work:180226f6-ba40-406c-8b20-7842071ae4e3",
                elementType: "element-interactive",
                labelText: "SL",
                primaryOption: "primary-smartlink",
                secondaryOption: "secondary-interactive-smartlink-third",
                toolbar: ["assetpopover", "glossary"]
            }
            let store = mockStore(() => initialState5);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(newData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
    });
    describe('Test convertElement- figure-BLOCL-CODE-EDITOR', () => {
        let store = mockStore(() => initialState4);
         it('Test convertElement  -figure-BCE', () => {
            store = mockStore(() => initialState4);
             let newData = {
                elementId: "urn:pearson:work:be34d78e-1638-4fcc-8511-5db7a3d4b395",
                elementType: "figure",
                labelText: "BCE",
                primaryOption: "primary-blockcode-equation",
                secondaryOption: "secondary-blockcode-language-Default",
                toolbar:  ["assetpopover", "decreaseindent", "glossary"]
                
             }
            let store = mockStore(() => initialState4);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(newData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
     });
    describe('Test convertElement- figure-BLOCL-CODE-EDITOR-SUBTYPE', () => {
        let store = mockStore(() => initialState6);
        it('Test convertElement  -figure-BCE-C', () => {
            store = mockStore(() => initialState6);
            let newData =  {
                alignment: "Select",
                captions:{
                    footnotes: [],
                    mathml: [],
                    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    text: "↵",
                    textsemantics: []
                },
                comments: false,
                contentUrn: "urn:pearson:entity:62af2cad-718e-486b-b409-5be2ae99be76",
                credits: { 
                    mathml: [],
                    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    text: "↵",
                    textsemantics: [],
                    footnotes: []
                },
                elementdata:{
                    text: null
                },
                feedback: false,
                figuredata: { 
                    numbered: true,
                    preformattedtext: [""],
                    programlanguage: "Select",
                    schema: "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                    startNumber: 1,
                    type: "codelisting"
                },
                    figuretype: "codelisting",
                html: { 
                    captions: "<p><br></p>",
                    credits: "<p><br></p>",
                    footnotes: {},
                    glossaryentries: {},
                    postertext: "",
                    subtitle: "<p><br></p>",
                    text: "",
                    title: "<p><br></p>",
                },
                id: "urn:pearson:work:e732173b-45a9-4859-a643-77d02abd8c7b",
                subtitle: { 
                    mathml: [],
                    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    text: "↵",
                    textsemantics: [],
                    footnotes: []
                },
                schema: "http://schemas.pearson.com/wip-authoring/figure/1",
                status: "wip",
                subtype: "codelisting",
                tcm: false,
                title: { 
                    mathml: [],
                    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    text: "↵",
                    textsemantics: [],
                    footnotes: []
                },
                type: "figure",
                versionUrn: "urn:pearson:work:e732173b-45a9-4859-a643-77d02abd8c7b",
            }
            let elementData = {
                elementId: "urn:pearson:work:e732173b-45a9-4859-a643-77d02abd8c7b",
                elementType: "figure",
                labelText: "BCE",
                primaryOption: "primary-blockcode-equation",
                secondaryOption: "secondary-blockcode-language-Java",
                toolbar: ["assetpopover", "decreaseindent", "glossary"]
            }
            let store = mockStore(() => initialState6);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(elementData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
    });
    describe('Test convertElement- PARAGRAPH to LIST', () => {
        let store = mockStore(() => initialState);
        it('Test convertElement  -PARAGRAPH to LIST', () => {
            store = mockStore(() => initialState);
            let elementData = {
                elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
                elementType: "element-authoredtext",
                labelText: "UL",
                primaryOption: "primary-list",
                secondaryOption: "secondary-list-1",
            }
            let store = mockStore(() => initialState);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(elementData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
    });
    describe('Test convertElement- UL to NUMBERED LIST', () => {
        let store = mockStore(() => initialState7);
        it('Test convertElement  -UL to NUMBERED LIST', () => {
            store = mockStore(() => initialState7);
            let elementData = {
                elementId: "urn:pearson:work:b922acc4-3ee7-4e77-bd6a-55b7bbe36d90",
                elementType: "element-authoredtext",
                labelText: "OL",
                primaryOption: "primary-list",
                secondaryOption: "secondary-list-3",
                toolbar:[]
            }
            let store = mockStore(() => initialState7);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(elementData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
    });
    describe('Test convertElement- WORKED-EXAMPLE 1 TO 2', () => {
        let store = mockStore(() => initialState8);
        it('Test convertElement  -WORKED-EXAMPLE 1 TO 2', () => {
            store = mockStore(() => initialState8);
            let elementData = {
                elementId: "urn:pearson:manifest:f74c018e-16f1-4a3e-831c-d7e9c239610f",
                elementType: "element-workedexample",
                labelText: "WE",
                primaryOption: "primary-workedexample-we2",
                secondaryOption: "secondary-workedexample-we2",
                toolbar:["bold", "italic", "underline", "strikethrough", "clearformatting", "increaseindent", "decreaseindent", "footnote", "glossary", "orderedlist", "unorderedlist", "mathml", "chemml", "inlinecode", "superscript", "subscript", "specialcharactor", "undo", "redo", "assetpopover", "slatetag"]
    
            }
            let store = mockStore(() => initialState8);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(elementData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
    });
    describe('Test convertElement- WORKED-EXAMPLE -internal conversion', () => {
        let store = mockStore(() => initialState12);
        it('Test convertElement  -WORKED-EXAMPLE 1 TO 2', () => {
            store = mockStore(() => initialState12);
            let elementData = {
                elementId: "urn:pearson:work:fcba4843-df9e-491a-a144-b6a22fa5177a",
                elementType: "element-authoredtext",
                labelText: "H1",
                primaryOption: "primary-heading",
                secondaryOption: "secondary-heading-1",
                toolbar: ["bold", "underline", "strikethrough", "orderedlist", "unorderedlist", "increaseindent", "decreaseindent", "glossary", "assetpopover", "slatetag", "redo"]
            }
            let store = mockStore(() => initialState12);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(elementData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
    });
    describe('Test convertElement- ASIDE-CONTAINER', () => {
        let store = mockStore(() => initialState9);
        it('Test convertElement  - ASIDE-CONTAINER -- SIDEBAR 01', () => {
            store = mockStore(() => initialState9);
            let elementData = {
                elementId: "urn:pearson:manifest:8e16f0f7-40d0-4abf-a515-4a3ac49122d5",
                elementType: "element-aside",
                labelText: "As",
                primaryOption: "primary-aside-aside",
                secondaryOption: "secondary-aside-sb1",
                toolbar:["bold", "italic", "underline", "strikethrough", "clearformatting", "increaseindent", "decreaseindent", "footnote", "glossary", "orderedlist", "unorderedlist", "mathml", "chemml", "inlinecode", "superscript", "subscript", "specialcharactor", "undo", "redo", "assetpopover", "slatetag"]
    
            }
            let store = mockStore(() => initialState9);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(elementData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
        it('Test convertElement  - ASIDE-CONTAINER -- SIDEBAR 02', () => {
            store = mockStore(() => initialState9);
            let elementData = {
                elementId: "urn:pearson:manifest:8e16f0f7-40d0-4abf-a515-4a3ac49122d5",
                elementType: "element-aside",
                labelText: "As",
                primaryOption: "primary-aside-aside",
                secondaryOption: "secondary-aside-sb2",
                toolbar:["bold", "italic", "underline", "strikethrough", "clearformatting", "increaseindent", "decreaseindent", "footnote", "glossary", "orderedlist", "unorderedlist", "mathml", "chemml", "inlinecode", "superscript", "subscript", "specialcharactor", "undo", "redo", "assetpopover", "slatetag"]
    
            }
            let store = mockStore(() => initialState9);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(elementData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
        it('Test convertElement  - ASIDE-CONTAINER -- SIDEBAR 03', () => {
            store = mockStore(() => initialState9);
            let elementData = {
                elementId: "urn:pearson:manifest:8e16f0f7-40d0-4abf-a515-4a3ac49122d5",
                elementType: "element-aside",
                labelText: "As",
                primaryOption: "primary-aside-aside",
                secondaryOption: "secondary-aside-sb3",
                toolbar:["bold", "italic", "underline", "strikethrough", "clearformatting", "increaseindent", "decreaseindent", "footnote", "glossary", "orderedlist", "unorderedlist", "mathml", "chemml", "inlinecode", "superscript", "subscript", "specialcharactor", "undo", "redo", "assetpopover", "slatetag"]
    
            }
            let store = mockStore(() => initialState9);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(elementData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
        it('Test convertElement  - ASIDE-CONTAINER -- SIDEBAR 04', () => {
            store = mockStore(() => initialState9);
            let elementData = {
                elementId: "urn:pearson:manifest:8e16f0f7-40d0-4abf-a515-4a3ac49122d5",
                elementType: "element-aside",
                labelText: "As",
                primaryOption: "primary-aside-aside",
                secondaryOption: "secondary-aside-sb4",
                toolbar:["bold", "italic", "underline", "strikethrough", "clearformatting", "increaseindent", "decreaseindent", "footnote", "glossary", "orderedlist", "unorderedlist", "mathml", "chemml", "inlinecode", "superscript", "subscript", "specialcharactor", "undo", "redo", "assetpopover", "slatetag"]
    
            }
            let store = mockStore(() => initialState9);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(elementData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
        it('Test convertElement  - ASIDE-CONTAINER -- SIDEBAR 05', () => {
            store = mockStore(() => initialState9);
            let elementData = {
                elementId: "urn:pearson:manifest:8e16f0f7-40d0-4abf-a515-4a3ac49122d5",
                elementType: "element-aside",
                labelText: "As",
                primaryOption: "primary-aside-aside",
                secondaryOption: "secondary-aside-sb5",
                toolbar:["bold", "italic", "underline", "strikethrough", "clearformatting", "increaseindent", "decreaseindent", "footnote", "glossary", "orderedlist", "unorderedlist", "mathml", "chemml", "inlinecode", "superscript", "subscript", "specialcharactor", "undo", "redo", "assetpopover", "slatetag"]
    
            }
            let store = mockStore(() => initialState9);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(elementData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
        it('Test convertElement  - ASIDE-CONTAINER -- default', () => {
            store = mockStore(() => initialState9);
            let elementData = {
                elementId: "urn:pearson:manifest:8e16f0f7-40d0-4abf-a515-4a3ac49122d5",
                elementType: "element-aside",
                labelText: "As",
                primaryOption: "primary-aside-aside",
                secondaryOption: "secondary-aside-sb",
                toolbar:["bold", "italic", "underline", "strikethrough", "clearformatting", "increaseindent", "decreaseindent", "footnote", "glossary", "orderedlist", "unorderedlist", "mathml", "chemml", "inlinecode", "superscript", "subscript", "specialcharactor", "undo", "redo", "assetpopover", "slatetag"]
    
            }
            let store = mockStore(() => initialState9);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(elementData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
    });
    describe('Test convertElement- ASIDE-CONTAINER-internal conversion', () => {
        let store = mockStore(() => initialState10);
        it('Test convertElement  - ASIDE-CONTAINER', () => {
            store = mockStore(() => initialState10);
            let elementData = {
                elementId: "urn:pearson:work:9ced8f63-da04-44a6-8ef1-19ecd1af77b1",
                elementType: "element-authoredtext",
                labelText: "H1",
                primaryOption: "primary-heading",
                secondaryOption: "secondary-heading-1",
                toolbar:  ["bold", "underline", "strikethrough", "orderedlist", "unorderedlist", "increaseindent", "decreaseindent", "glossary", "assetpopover", "slatetag", "redo"]
            }
            let store = mockStore(() => initialState10);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(elementData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
    });
    describe('Test convertElement- MOCK API CALL-catch', () => {
        // let store = mockStore(() => initialState4);
        it('Test convertElement  -MOCK API CALL',async () => {
            // store = mockStore(() => initialState4);
            let getState = () => {
                return initialState;
               }
            let elementData = {
                elementId: "urn:pearson:work:e4d3e2ce-71f6-4ffa-9868-3d0b00a69f75",
                elementType: "video-audio",
                labelText: "VID",
                primaryOption: "primary-video",
                secondaryOption: "secondary-video-smartlink",
                toolbar: ["assetpopover", "glossary"],
                altText: "",
                longDesc: "",
                tag: "VID"
            }
            let activeElement = {
                elementId: "urn:pearson:work:e4d3e2ce-71f6-4ffa-9868-3d0b00a69f75",
                elementType: "video-audio",
                elementWipType: "figure",
                index: 5,
                primaryOption: "primary-video",
                secondaryOption: "secondary-video-alfresco",
                tag: "VID",
                toolbar: ["assetpopover", "glossary"]
            }
            let oldData = {
                captions: {
                    footnotes: [],
                    mathml: [],
                    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    text: "↵",
                    textsemantics: []
                },
                comments: false,
                contentUrn: "urn:pearson:entity:a3838838-ad6a-4061-907a-c2dd9165d9b8",
                credits: {
                    mathml: [],
                    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    text: "↵",
                    textsemantics: [],
                    footnotes: []
                },
                elementdata: {
                    text: null
                },
                feedback: false,
                figuredata: {
                    clipinfo: {},
                    height: "399",
                    posterimage: { path: "https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png" },
                    schema: "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
                    srctype: "internal",
                    videos: [{
                        path: "",
                        format: ""
                    }
                    ],
                    width: "600",
                },
                figuretype: "video",
                html: {
                    captions: "<p><br></p>",
                    credits: "<p><br></p>",
                    footnotes: {},
                    glossaryentries: {},
                    postertext: "",
                    subtitle: "<p><br></p>",
                    text: "",
                    title: "<p><br></p>",
                },
                id: "urn:pearson:work:e4d3e2ce-71f6-4ffa-9868-3d0b00a69f75",
                subtitle: {
                    mathml: [],
                    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    text: "↵",
                    textsemantics: [],
                    footnotes: []
                },
                subtype: "figureVideo",
                status: "wip",
                title: {
                    mathml: [],
                    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    text: "↵",
                    textsemantics: [],
                    footnotes: []
                },
                type: "figure",
                versionUrn: "urn:pearson:work:e4d3e2ce-71f6-4ffa-9868-3d0b00a69f75",
            }
            let error= 'TypeError: dispatch is not a function at dispatch (D:\Canvas Stabilization\canvas-stabilization\src\component\Sidebar\Sidebar_Action.js:215:9) at processTicksAndRejections (internal/process/task_queues.js:89:5)'
            axios.post.mockImplementation(() => Promise.reject(error));
             let result = await sidebarAction.convertElement(oldData, elementData, activeElement, slateData,["5"]);
            result(()=>{},getState);
            setTimeout(() => {
                expect(sendDataToIframe).toHaveBeenCalled()
            }, 1000)
        });
    });
    describe('Test convertElement- WORKED-EXAMPLE - H1 TO P', () => {
        let store = mockStore(() => initialState12);
        it('Test convertElement  -WORKED-EXAMPLE H1 TO P', () => {
            store = mockStore(() => initialState12);
            let store = mockStore(() => initialState12);
            const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement')
            store.dispatch(sidebarAction.convertElement(activeElementData.WE_OldData,activeElementData.WE_NewData,activeElementData.WE_OldInfo,slateData.SlateData2,["0", "0"]));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
    });
    describe('Test convertElement- WORKED-EXAMPLE - Section- P-H1', () => {
        let store = mockStore(() => initialState13);
        it('Test convertElement  -WORKED-EXAMPLE Section- P-H1', () => {
            store = mockStore(() => initialState13);
            const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement')
            store.dispatch(sidebarAction.convertElement(activeElementData.Section_OldData,activeElementData.Section_NewData,activeElementData.Section_OldInfo,slateData.SlateData2,["0", "1", "0"]));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
    });
    describe('Test convertElement- ASIDE-CONTAINER - P-H1', () => {
        let store = mockStore(() => initialState14);
        it('Test convertElement- ASIDE-CONTAINER- P-H1', () => {
            store = mockStore(() => initialState14);
            const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement')
            store.dispatch(sidebarAction.convertElement(activeElementData.Aside_OldData,activeElementData.Aside_NewData,activeElementData.Aside_OldInfo,slateData.SlateData3,["0", "1"]));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
    });
    describe('Test convertElement- ASIDE-CONTAINER -MMI to ShowHide', () => {
        let store = mockStore(() => initialState15);
        it('Test convertElement- ASIDE-CONTAINER- MMI to ShowHide', () => {
            store = mockStore(() => initialState15);
            const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement')
            store.dispatch(sidebarAction.convertElement(activeElementData.Aside_MMI_OldData,activeElementData.Aside_MMI_NewData,activeElementData.Aside_MMI_OldInfo,slateData.SlateData3,["0", "2"]));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
    
        });
    });
    xdescribe('Test convertElement- singleAssessment', () => {
        let store = mockStore(() => initialState2);
        beforeEach(() => {
            global.document = (new JSDOM()).window.Element;
            if (!global.Element.prototype.hasOwnProperty("innerText")) {
                Object.defineProperty(global.Element.prototype, 'innerText', {
                    get() {
                        return this.textContent;
                    },
                });
            }
            document.getElementById = () => {
                return "Quiz"
            }
            document.querySelector = () => {
                return {
                    innerText: "Quiz"
                }
            }
        })
        it('Test convertElement  -assessment type', () => {
            let newData = {
                elementId: "urn:pearson:work:fa8ebea3-d9ba-4aec-8658-2f944841404a",
                elementType: "element-assessment",
                labelText: "Qu",
                primaryOption: "primary-single-assessment",
                secondaryOption: "secondary-single-assessment-tdx",
                toolbar: ["bold", "italic", "underline", "strikethrough", "clearformatting", "increaseindent", "decreaseindent", "footnote", "glossary", "orderedlist", "unorderedlist", "mathml", "chemml", "inlinecode", "superscript", "subscript", "specialcharactor", "undo", "redo", "assetpopover", "slatetag"]
            }
            let store = mockStore(() => initialState2);
            const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
            store.dispatch(sidebarAction.conversionElement(newData));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
        it('Test convertElement  -assessment type 2', () => {
            store = mockStore(() => initialState2);
            const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement')
            store.dispatch(sidebarAction.convertElement(activeElementData.SingleAssessment_OldData,activeElementData.SingleAssessment_NewData,activeElementData.SingleAssessment_OldInfo,slateData.slateData1,3));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
    });
    xdescribe('Test convertElement- MOCK API CALL', () => {
    
    
        let assessmentDiv2 = document.createElement('div');
        assessmentDiv2.setAttribute('data-id', 'urn:pearson:work:fa8ebea3-d9ba-4aec-8658-2f944841404a')
        let usageTypeSpan2 = document.createElement('span');
        usageTypeSpan2.className = 'singleAssessment_Dropdown_currentLabel';
        usageTypeSpan2.innerText = 'Quiz';
        assessmentDiv2.appendChild(usageTypeSpan2)
        document.body.appendChild(assessmentDiv2)
        let store = mockStore(() => initialState2);
        it('Test convertElement  -MOCK API CALL',async () => {
    
            store = mockStore(() => initialState2);
            let expectedRes = {
                status: 200,
                statusText: "",
                data: activeElementData.sidebarExpectedRes
            }
            let getState = () => {
                return initialState2;
               }
            const expectedActions = [
                {
                    type: 'FETCH_SLATE_DATA',
                    payload: {}
                }];
    
            axios.post.mockImplementation(() => Promise.resolve(expectedRes));
            let elemData={}
            let dispatch=(obj)=>{
                if(obj.type==='FETCH_SLATE_DATA'){
                    expect(obj.type).toEqual('FETCH_SLATE_DATA');
                    elemData=obj
                }
                else{
                    expect(obj.type).toEqual('SET_ACTIVE_ELEMENT');
                    elemData=obj
                }
            }
    
            let result =   await sidebarAction.convertElement(activeElementData.SingleAssessment_OldData, activeElementData.SingleAssessment_NewData, activeElementData.SingleAssessment_OldInfo, slateData.SlateData1,"3")
            result(dispatch,getState);
            setTimeout(()=>{
                if(elemData.type==='FETCH_SLATE_DATA'){
                    expect(elemData.type).toEqual('FETCH_SLATE_DATA')
    
                }
                else{
                    expect(elemData.type).toEqual('SET_ACTIVE_ELEMENT');
                   
                }
             },1000)
        });
    });
    xdescribe('Test convertElement- aside MOCK API CALL', () => {
    
        it('Test convertElement  -aside MOCK API CALL',async () => {
            let expectedRes = {
                status: 200,
                statusText: "",
                data: activeElementData.Aside_MMI_OldData
            }
            let getState = () => {
                return initialState15;
               }
            axios.post.mockImplementation(() => Promise.resolve(expectedRes));
            let elemData={}
            let dispatch=(obj)=>{
                if(obj.type==='FETCH_SLATE_DATA'){
                    expect(obj.type).toEqual('FETCH_SLATE_DATA');
                    elemData=obj
                }
                else{
                    expect(obj.type).toEqual('SET_ACTIVE_ELEMENT');
                    elemData=obj
                }
            }
            let store = mockStore(() => initialState15);
            let result =   await sidebarAction.convertElement(activeElementData.Aside_MMI_OldData,activeElementData.Aside_MMI_NewData,activeElementData.Aside_MMI_OldInfo,slateData.SlateData3,["0", "2"])
            result(dispatch,getState);
            setTimeout(()=>{
                if(elemData.type==='FETCH_SLATE_DATA'){
                    expect(elemData.type).toEqual('FETCH_SLATE_DATA')
    
                }
                else{
                    expect(elemData.type).toEqual('SET_ACTIVE_ELEMENT');
                   
                }
             },1000)
        });
    });
    describe('Test convertElement- we MOCK API CALL', () => {
    
        xit('Test convertElement  -we MOCK API CALL',async () => {
            let expectedRes = {
                status: 200,
                statusText: "",
                data: activeElementData.Aside_MMI_OldData
            }
            let getState = () => {
                return initialState13;
               }
            axios.post.mockImplementation(() => Promise.resolve(expectedRes));
            let elemData={}
            let dispatch=(obj)=>{
                if(obj.type==='FETCH_SLATE_DATA'){
                    expect(obj.type).toEqual('FETCH_SLATE_DATA');
                    elemData=obj
                }
                else{
                    expect(obj.type).toEqual('SET_ACTIVE_ELEMENT');
                    elemData=obj
                }
            }
            let store = mockStore(() => initialState13);
            let result =   await sidebarAction.convertElement(activeElementData.Section_OldData,activeElementData.Section_NewData,activeElementData.Section_OldInfo,slateData.SlateData2,["0", "1", "0"])
            result(dispatch,getState);
            setTimeout(()=>{
                if(elemData.type==='FETCH_SLATE_DATA'){
                    expect(elemData.type).toEqual('FETCH_SLATE_DATA')
    
                }
                else{
                    expect(elemData.type).toEqual('SET_ACTIVE_ELEMENT');
                   
                }
             },1000)
        });
    });
    describe('Test convertElement- codelisting MOCK API CALL', () => {
    
        it('Test convertElement  -we MOCK API CALL', async () => {
            let expectedRes = {
                status: 200,
                statusText: "",
                data: activeElementData.BlockCode_OldData
            }
            delete expectedRes.data.figuretype;
            axios.post.mockImplementation(() => Promise.resolve(expectedRes));
            let store1 = mockStore(() => initialState19);
            let nextStore = slateData.SlateData4
            await store1.dispatch(sidebarAction.convertElement(activeElementData.BlockCode_OldData, activeElementData.BlockCode_NewData, activeElementData.BlockCode_OldInfo, nextStore, ["3"]));
        });
    })
});
describe('Test handleElementConversion- ShowHide -Paragraph to List', () => {
    let store1 = mockStore(() => initialState16);
    it('Test handleElementConversion- ShowHide -Paragraph to List', async () => {
        store1 = mockStore(() => initialState16);        
        let nextStore = slateData.SlateData4
        let getState = () => {
            return initialState16;
           }
        const spyconversionElement = jest.spyOn(sidebarAction, 'handleElementConversion')
        let expectedRes = {
            status: 200,
            statusText: "",
            data: slateData.SlateData4[config.slateManifestURN].contents.bodymatter[0].interactivedata['show'][0]
        }
        axios.post.mockImplementation(() => Promise.resolve(expectedRes));
        await store1.dispatch(sidebarAction.handleElementConversion(activeElementData.Showhide_Para_ElementData,nextStore,activeElementData.SH_ActiveElement,true,activeElementData.showHideObject1));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()      
    });
});
describe('Test handleElementConversion- ShowHide in Aside -Paragraph to List', () => {
    let store1 = mockStore(() => initialState17);
    it('Test handleElementConversion- ShowHide in Aside -Paragraph to List', async () => {
        store1 = mockStore(() => initialState17);
        let nextStore = slateData.SlateData4
        let expectedRes = {
            status: 200,
            statusText: "",
            data: slateData.SlateData4[config.slateManifestURN].contents.bodymatter[1].elementdata.bodymatter[0].interactivedata['show'][0]
        }   
        const spyconversionElement = jest.spyOn(sidebarAction, 'handleElementConversion')
        axios.post.mockImplementation(() => Promise.resolve(expectedRes));
        await store1.dispatch(sidebarAction.handleElementConversion(activeElementData.SH_Aside_ElementData,nextStore,activeElementData.SH_Aside,true,activeElementData.showHideObject2));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
    });
});
describe('Test handleElementConversion- ShowHide in WE-Paragraph to List', () => {
    let store1 = mockStore(() => initialState18);
    it('Test handleElementConversion- ShowHide in WE -Paragraph to List', async () => {
        store1 = mockStore(() => initialState18);
        let nextStore = slateData.SlateData4
        let expectedRes = {
            status: 200,
            statusText: "",
            data: slateData.SlateData4[config.slateManifestURN].contents.bodymatter[2].elementdata.bodymatter[1].contents.bodymatter[0].interactivedata['show'][0]
        }
        axios.post.mockImplementation(() => Promise.resolve(expectedRes));  
        const spyconversionElement = jest.spyOn(sidebarAction, 'handleElementConversion')
        await store1.dispatch(sidebarAction.handleElementConversion(activeElementData.SH_WE_ElementData,nextStore,activeElementData.SH_WE_ActiveElement,true,activeElementData.showHideObject3));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
    });
});
describe('Test convertElement- Paragraph for snapshot MOCK API CALL', () => {

    it('Test convertElement  -we MOCK API CALL', async () => {
        let expectedRes = {
            status: 200,
            statusText: "",
            data: { ...activeElementData.BlockCode_OldData, id : "urn:pearson:work:4b70896d-090a-4566-97f1-30c080a708b5"}
        }
        let elementData = {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
            elementType: "element-authoredtext",
            labelText: "H1",
            primaryOption: "primary-heading",
            secondaryOption: "secondary-heading-1",
            toolbar: ["bold", "underline", "strikethrough", "orderedlist", "unorderedlist", "increaseindent", "decreaseindent", "glossary", "assetpopover", "slatetag", "redo"]
        }
        let elementinfo = {
            elementId: "urn:pearson:work:4b70896d-090a-4566-97f1-30c080a708b5",
            elementType: "element-authoredtext",
            elementWipType: "element-authoredtext",
            index: 0,
            primaryOption: "primary-paragraph",
            secondaryOption: "secondary-paragraph",
            tag: "P"
        }
        let olddata = {
            contentUrn: "urn:pearson:entity:6d443d7e-5a0d-48ea-bce9-6d12a717aba2",
            elementdata: { schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: "" },
            html: { text: "<p class='paragraphNumeroUno'><br></p>" },
            id: "urn:pearson:work:4b70896d-090a-4566-97f1-30c080a708b4",
            schema: "http://schemas.pearson.com/wip-authoring/element/1",
            status: "wip",
            type: "element-authoredtext",
            versionUrn: "urn:pearson:work:4b70896d-090a-4566-97f1-30c080a708b5"
        }
        config.tcmStatus = true
        axios.post.mockImplementation(() => Promise.resolve(expectedRes));
        let store1 = mockStore(() => initialState19);
        let nextStore = slateData.SlateData4
        await store1.dispatch(sidebarAction.convertElement(olddata, elementData, elementinfo, nextStore, ["3"]));
    });
    it('Test convertElement  -we MOCK API CALL else', async () => {
        let expectedRes = {
            status: 200,
            statusText: "",
            data: { ...activeElementData.BlockCode_OldData, id : "urn:pearson:work:4b70896d-090a-4566-97f1-30c080a708b4"}
        }
        let elementData = {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
            elementType: "element-authoredtext",
            labelText: "H1",
            primaryOption: "primary-heading",
            secondaryOption: "secondary-heading-1",
            toolbar: ["bold", "underline", "strikethrough", "orderedlist", "unorderedlist", "increaseindent", "decreaseindent", "glossary", "assetpopover", "slatetag", "redo"]
        }
        let elementinfo = {
            elementId: "urn:pearson:work:4b70896d-090a-4566-97f1-30c080a708b5",
            elementType: "element-authoredtext",
            elementWipType: "element-authoredtext",
            index: 0,
            primaryOption: "primary-paragraph",
            secondaryOption: "secondary-paragraph",
            tag: "P"
        }
        let olddata = {
            contentUrn: "urn:pearson:entity:6d443d7e-5a0d-48ea-bce9-6d12a717aba2",
            elementdata: { schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: "" },
            html: { text: "<p class='paragraphNumeroUno'><br></p>" },
            id: "urn:pearson:work:4b70896d-090a-4566-97f1-30c080a708b4",
            schema: "http://schemas.pearson.com/wip-authoring/element/1",
            status: "wip",
            type: "element-authoredtext",
            versionUrn: "urn:pearson:work:4b70896d-090a-4566-97f1-30c080a708b5"
        }
        config.tcmStatus = true
        axios.post.mockImplementation(() => Promise.resolve(expectedRes));
        let store1 = mockStore(() => initialState19);
        let nextStore = slateData.SlateData4
        await store1.dispatch(sidebarAction.convertElement(olddata, elementData, elementinfo, nextStore, ["3"]));
    });
    
});
