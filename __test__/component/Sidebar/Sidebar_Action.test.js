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
import testData from "./TestData";
import { CHECK_ASIDE_NUMBER } from '../../../src/constants/Action_Constants'
import tinymce from 'tinymce/tinymce';

jest.mock('axios');
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
    handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' )
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
    autoNumberReducer: { isAutoNumberingEnabled: true },
    appStore: {
        slateLevelData: slateData.SlateData1,
        activeElement: activeElementData.paragraph,
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
const initialState2 = {
    autoNumberReducer: { isAutoNumberingEnabled: false },
    appStore: {
        slateLevelData: slateData.SlateData1,
        activeElement: activeElementData.assessment,
        parentUrn:{},
        asideData: {
            parent: {
                type: "showhide"
            },
            type: "groupedcontent",
            subtype: "tab"
        }
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState3 = {
    autoNumberReducer: { isAutoNumberingEnabled: true },
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
    autoNumberReducer: { isAutoNumberingEnabled: true },
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
    autoNumberReducer: { isAutoNumberingEnabled: true },
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
    autoNumberReducer: { isAutoNumberingEnabled: true },
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
    autoNumberReducer: { isAutoNumberingEnabled: true },
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
    autoNumberReducer: { isAutoNumberingEnabled: true },
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
    autoNumberReducer: { isAutoNumberingEnabled: true },
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
    autoNumberReducer: { isAutoNumberingEnabled: true },
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
    autoNumberReducer: { isAutoNumberingEnabled: true },
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
    autoNumberReducer: { isAutoNumberingEnabled: true },
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
    autoNumberReducer: { isAutoNumberingEnabled: true },
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
    autoNumberReducer: { isAutoNumberingEnabled: true },
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
    autoNumberReducer: { isAutoNumberingEnabled: true },
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
    autoNumberReducer: { isAutoNumberingEnabled: true },
    appStore: {
        slateLevelData: slateData.SlateData4,
        activeElement: activeElementData.SH_ActiveElement,
        parentUrn: {},
        asideData: {contentUrn: "urn:pearson:entity:808c0c76-1786-455a-8410-4f250384b142"}
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState17 = {
    autoNumberReducer: { isAutoNumberingEnabled: true },
    appStore: {
        slateLevelData: slateData.SlateData4,
        activeElement: activeElementData.SH_Aside,        
        parentUrn: {
            manifestUrn: "urn:pearson:manifest:fdbdba27-bbc4-4515-bde9-3ecd95eb613e",
            contentUrn: "urn:pearson:entity:808c0c76-1786-455a-8410-4f250384b142",
            elementType: "element-aside"
        },
        asideData: {contentUrn: "urn:pearson:entity:808c0c76-1786-455a-8410-4f250384b142"}
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState18 = {
    autoNumberReducer: { isAutoNumberingEnabled: true },
    appStore: {
        slateLevelData: slateData.SlateData4,
        activeElement: activeElementData.SH_WE_ActiveElement,
        parentUrn: {
            manifestUrn: "urn:pearson:manifest:bc9d51e0-f0df-4127-b09e-9d5e4f75cc36",
            contentUrn: "urn:pearson:entity:5d6c4a51-2587-4250-8423-061b67aebe5e",
            elementType: "element-aside"
        },
        asideData: {contentUrn: "urn:pearson:entity:808c0c76-1786-455a-8410-4f250384b142"}
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}
const initialState19 = {
    autoNumberReducer: { isAutoNumberingEnabled: true },
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

const initialState20 = {
    autoNumberReducer: { isAutoNumberingEnabled: true },
    appStore: {
        slateLevelData: slateData.SlateData5,
        activeElement: activeElementData.image,
        parentUrn: {},
    },
    elementStatusReducer:{},
    tcmReducer:{
        tcmSnapshot:[]
    }
}

describe('Test - Sidebar_Actions',()=>{
    describe('Test convertElement- paragraph', () => {
        let store = mockStore(() => initialState);
        it('Test Convert Element', () => {
            store = mockStore(() => initialState);
            tinymce.activeEditor = {'id' : 'cypress-1'}
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
        it('Test Convert Element > 3rd if', () => {
            store = mockStore(() => initialState);
            tinymce.activeEditor = {}
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
                secondaryOption: "secondary-video-smartlink",
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
        it('Test convertElement  -WORKED-EXAMPLE Section- P-H1', () => {
            store = mockStore(() => initialState13);
            const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement')
            let oldElementData = {
                ...activeElementData.Section_OldData,
                subtype: "tab"
            }
            store.dispatch(sidebarAction.convertElement(oldElementData,activeElementData.Section_NewData,activeElementData.Section_OldInfo,slateData.SlateData2,["0", "1", "0"]));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
    });
    describe('Test convertElement- oldElementData?.subtype === ElementConstants.TAB', () => {
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
describe('1 Test convertElement ', () => {
    const showHideObj = { index: "0-0",
        element: { contentUrn: "urn:pearson:entity:808c0c76-1786-455a-8410-4f250384b142" }
    };
    it('1.1 Test convertElement  Image ', () => {
        const { oldElementData, newElementData, oldElementInfo } = testData?.testcase8;
        let store = mockStore(() => initialState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
        store.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0"], "",""));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
        
    });
    it('1.2 Test convertElement - codelisting Element ', async () => {
         const expectedRes = {
            status: 200,
            statusText: "",
            data: testData.testcase9.oldElementData
        }
        const { oldElementData, newElementData, oldElementInfo } = testData?.testcase9;
        config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
        const storeMock = mockStore(() => initialState);
        axios.post.mockImplementation(() => Promise.resolve(expectedRes));
        const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
        await storeMock.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, storeMock, ["0","0","0","0"], "", {}));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear();
    });
    it('1.3 Test convertElement - Remove subtype key on conversion from BQ to P/H/LO ', () => {
        const { oldElementData, newElementData, oldElementInfo } = testData?.testcase10;
        
        let store = mockStore(() => initialState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
        store.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0"], "",""));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
        
    });
    it('1.4 Test convertElement - figuretype === "assessment" ', () => {
        const elementDiv = document.createElement('div');
        elementDiv.setAttribute("data-id", "urn:pearson:work:fd5d9748-6928-43ed-85b7-48c1a4a42bb4");
        const elementSpan = document.createElement('span');
        elementSpan.setAttribute("class", "singleAssessment_Dropdown_currentLabel");
        elementSpan.innerText = "figure";
        elementDiv.appendChild(elementSpan);
        document.body.appendChild(elementDiv);

        const { oldElementData, newElementData, oldElementInfo } = testData?.testcase7;
        let store = mockStore(() => initialState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
        store.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0"], "",""));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
        
    });
    it('1.4 Test convertElement - figuretype === "assessment" > prepareAssessmentDataForConversion ', () => {
        const elementDiv = document.createElement('div');
        elementDiv.setAttribute("data-id", "urn:pearson:work:fd5d9748-6928-43ed-85b7-48c1a4a42bb4");
        const elementSpan = document.createElement('span');
        elementSpan.setAttribute("class", "singleAssessment_Dropdown_currentLabel");
        elementSpan.innerText = "figure";
        elementDiv.appendChild(elementSpan);
        document.body.appendChild(elementDiv);

        const { oldElementData, newElementData, oldElementInfo } = testData?.testcase77;
        let store = mockStore(() => initialState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
        store.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0"], "",""));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
        
    });
    it('1.5 Test convertElement - outputSubTypeEnum !== "DISC" ', () => {
        
        const { oldElementData, newElementData, oldElementInfo } = testData?.testcase11;
        const elementDiv3 = document.createElement('div');
        elementDiv3.setAttribute("id", "cypress-0-0");
        document.body.appendChild(elementDiv3);

        jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
            return {querySelector: () => ({
                querySelector: () => {
                    return {"innerHTML":"world"};
                }
            })};
        })
        let store = mockStore(() => initialState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
        store.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0"], "",showHideObj));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
        
    });
    it('1.5.1 Test convertElement - Else Cases ', () => {
        const { oldElementData, newElementData, oldElementInfo } = testData?.testcase11;
        const newElementData_1 = {...newElementData, startvalue: "1" }
        const elementDiv3 = document.createElement('div');
        elementDiv3.setAttribute("id", "cypress-0-0");
        elementDiv3.setAttribute("innerHTML", oldElementData.html.text);
        document.body.appendChild(elementDiv3);

        jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
            return {querySelector: () => ({
                querySelector: () => {
                    return { "innerHTML": oldElementData.html.text };
                }
            })};
        })
        let store = mockStore(() => initialState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
        store.dispatch(sidebarAction.convertElement(oldElementData, newElementData_1, oldElementInfo, store, ["0"], "",showHideObj));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
        
    });
    it('1.5.2 Test convertElement - Else Cases - editableDom, containerDom ', () => {
        const { oldElementData, newElementData, oldElementInfo } = testData?.testcase11;
        const elementDiv3 = document.createElement('div');
        elementDiv3.setAttribute("id", "cypress-0-0-0");
        document.body.appendChild(elementDiv3);

        jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
            return {querySelector: () => ({
                querySelector: () => {
                    return null;
                }
            })};
        })
        let store = mockStore(() => initialState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
        store.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0"], "",showHideObj));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
        
    });
    it('1.6 Test convertElement - oldElementInfo.primaryOption === "primary-list" ', () => {
        const { oldElementData, newElementData, oldElementInfo } = testData?.testcase12;
       
        let store = mockStore(() => initialState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
        store.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0"], "",""));
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
        
    });
    it('1.7 Test convertElement - inputPrimaryOptionEnum === outputPrimaryOptionEnum ', () => {
        const { oldElementData, newElementData, oldElementInfo } = testData?.testcase13;
        
        let store = mockStore(() => initialState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
        store.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0"],{ toolbar: ['insertMedia']},"")); 
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
        
    });
    it('1.8 Test convertElement - oldElementData.subtype === "workedexample" ', () => {
        const { oldElementData, newElementData, oldElementInfo } = testData?.testcase15;
        
        let store = mockStore(() => initialState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
        store.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0"],{ toolbar: ['insertMedia']},"")); 
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear();
    });
    describe('1.9 Test convertElement - oldElementData.subtype === "sidebar" ', () => {
        it('1.9.1 case "SIDEBAR_02": ', () => {
            const { oldElementData, newElementData, oldElementInfo } = testData?.testcase16;
            config.elementStatus = { "urn:pearson:manifest:af90f8aa-8e6a-45cf-9692-0fae06ef4548": "approved" }
            let store = mockStore(() => initialState);
            const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
            store.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0"],{ toolbar: ['insertMedia']},"")); 
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
        it('1.9.2 case "SIDEBAR_03": ', () => {
            const { oldElementData, newElementData, oldElementInfo } = testData?.testcase16;
            const newElementData_3 = {...newElementData, "secondaryOption":"secondary-aside-sb3",}
            let store = mockStore(() => initialState);
            const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
            store.dispatch(sidebarAction.convertElement(oldElementData, newElementData_3, oldElementInfo, store, ["0"],{ toolbar: ['insertMedia']},"")); 
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
        it('1.9.2 case "SIDEBAR_04": ', () => {
            const { oldElementData, newElementData, oldElementInfo } = testData?.testcase16;
            const newElementData_4 = {...newElementData, "secondaryOption":"secondary-aside-sb4",}
            let store = mockStore(() => initialState);
            const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
            store.dispatch(sidebarAction.convertElement(oldElementData, newElementData_4, oldElementInfo, store, ["0"],{ toolbar: ['insertMedia']},"")); 
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
        it('1.9.2 case "SIDEBAR_05": ', () => {
            const { oldElementData, newElementData, oldElementInfo } = testData?.testcase16;
            const newElementData_5 = {...newElementData, "secondaryOption":"secondary-aside-sb5",}
            let store = mockStore(() => initialState);
            const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
            store.dispatch(sidebarAction.convertElement(oldElementData, newElementData_5, oldElementInfo, store, ["0"],{ toolbar: ['insertMedia']},"")); 
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
        it('1.9.2 case "SIDEBAR_01": ', () => {
            const { oldElementData, newElementData, oldElementInfo } = testData?.testcase16;
            const newElementData_1 = {...newElementData, "secondaryOption":"secondary-aside-sb1",}
            let store = mockStore(() => initialState);
            const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
            store.dispatch(sidebarAction.convertElement(oldElementData, newElementData_1, oldElementInfo, store, ["0"],{ toolbar: ['insertMedia']},"")); 
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
    });
    describe('1.10 Test convertElement - Update showhide inner elements ', () => {
        const expectedRes = {
            status: 200,
            statusText: "",
            data: testData.testcase17.oldElementData
        }
        it('1.10.1 if (showHideObj) ', async () => {         
            const { oldElementData, newElementData, oldElementInfo, store, showHideObj } = testData?.testcase17;
            config.slateManifestURN = "urn:pearson:manifest:c981f32b-7a2d-4a73-ae33-51ac40ad9fb4";
            let store_1 = mockStore(() => initialState);
            axios.post.mockImplementation(() => Promise.resolve(expectedRes));
            const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
            await store_1.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0","0","0"], "", showHideObj));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
            
        });
        it('1.10.2 Test  appStore.parentUrn.elementType === "group" ', async () => {
            config.isPopupSlate = true;
            config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
            const { initState, store, showHideObj } = testData?.testcase1;
            const { oldElementData, newElementData, oldElementInfo } = testData?.testcase17;
            const storeMock = mockStore(() => initState);
            axios.post.mockImplementation(() => Promise.resolve(expectedRes));
            const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
            await storeMock.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0","0","0"], "", showHideObj));
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
        describe('1.10.3 appStore?.asideData?.parent?.type === "groupedcontent  ', () => {
            it('1.10.3.1 indexes.length === 4 ', async () => {
                const { initState, store, showHideObj } = testData?.testcase2;
                const { oldElementData, newElementData, oldElementInfo } = testData?.testcase17;
                config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
                const storeMock = mockStore(() => initState);
                axios.post.mockImplementation(() => Promise.resolve(newExpectedRes));
                const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
                await storeMock.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0","0","0","0"], "", showHideObj));
                expect(spyconversionElement).toHaveBeenCalled()
                spyconversionElement.mockClear()
            });
            it('1.10.3.2 indexes.length === 5 ', async () => {
                const { initState, store, showHideObj } = testData?.testcase2;
                const { oldElementData, newElementData, oldElementInfo } = testData?.testcase17;
                config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
                const storeMock = mockStore(() => initState);
                axios.post.mockImplementation(() => Promise.resolve(expectedRes));
                const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
                await storeMock.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0","0","0","2","0"], "", showHideObj));
                expect(spyconversionElement).toHaveBeenCalled()
                spyconversionElement.mockClear()
            });
        });
        describe('1.10.4 indexes.forEach(index => {  ', () => {
            it('1.10.4.1 bodymatter[index] else case ', async () => {
                const { initState, store, showHideObj } = testData?.testcase3;
                const { oldElementData, newElementData, oldElementInfo } = testData?.testcase17;
                config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
                const storeMock = mockStore(() => initState);
                axios.post.mockImplementation(() => Promise.resolve(expectedRes));
                const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
                await storeMock.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0","0","0","2","0"], "", showHideObj));
                expect(spyconversionElement).toHaveBeenCalled()
                spyconversionElement.mockClear()
            });
            it('1.10.4.2 elementData.elementId !== bodymatter[index].id ', async () => {
                const { initState, store, showHideObj } = testData?.testcase4;
                const { oldElementData, newElementData, oldElementInfo } = testData?.testcase17;
                config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
                const storeMock = mockStore(() => initState);
                axios.post.mockImplementation(() => Promise.resolve(expectedRes));
                const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
                await storeMock.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0","0","0","2","0"], "", showHideObj));
                expect(spyconversionElement).toHaveBeenCalled()
                spyconversionElement.mockClear()
            });
            it('1.10.4.3 else ', async () => {
                const { initState, store, showHideObj } = testData?.testcase5;
                const { oldElementData, newElementData, oldElementInfo } = testData?.testcase17;
                config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
                const storeMock = mockStore(() => initState);
                axios.post.mockImplementation(() => Promise.resolve(expectedRes));
                const spyconversionElement = jest.spyOn(sidebarAction, 'convertElement');
                await storeMock.dispatch(sidebarAction.convertElement(oldElementData, newElementData, oldElementInfo, store, ["0","0","0","2","0"], "", showHideObj));
                expect(spyconversionElement).toHaveBeenCalled()
                spyconversionElement.mockClear()
            });
        });
    });
});
describe('2 Test handleElementConversion  ', () => {
 
    it('2.1 Test handleElementConversion  - Object.keys(store).length < 0; Else Case ', () => {
        let store = mockStore(() => initialState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'handleElementConversion');
        store.dispatch(sidebarAction.handleElementConversion({}, {}, "", "","")); 
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
    });
    it('2.2 Test handleElementConversion  - appStore && appStore.parentUrn ', () => {
        config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
        const { initState, elementData, store, activeElement, fromToolbar,showHideObj } = testData?.testcase1;
        const storeMock = mockStore(() => initState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'handleElementConversion');
        storeMock.dispatch(sidebarAction.handleElementConversion(elementData, store, activeElement, fromToolbar,showHideObj)); 
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
    });
    describe('2.3 appStore?.asideData?.parent?.type === "groupedcontent  ', () => {
        const { initState, elementData, store, activeElement, fromToolbar,showHideObj } = testData?.testcase2;
        it('1.3.1 indexes.length === 4 ', () => {
            config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
            const storeMock = mockStore(() => initState);
            const spyconversionElement = jest.spyOn(sidebarAction, 'handleElementConversion');
            storeMock.dispatch(sidebarAction.handleElementConversion(elementData, store, activeElement, fromToolbar,showHideObj)); 
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
        it('1.3.2 indexes.length === 5 ', () => {
            config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
            const storeMock = mockStore(() => initState);
            const newActiveElement = { ...activeElement, index: "0-0-0-2-0" }
            const spyconversionElement = jest.spyOn(sidebarAction, 'handleElementConversion');
            storeMock.dispatch(sidebarAction.handleElementConversion(elementData, store, newActiveElement, fromToolbar,showHideObj)); 
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
    });
    describe('2.3 appStore?.asideData?.parent?.type === "groupedcontent  ', () => {
        it('1.3.1 indexes.length === 4 ', () => {
            const { initState, elementData, store, activeElement, fromToolbar,showHideObj } = testData?.testcase28;
            config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
            const storeMock = mockStore(() => initState);
            const spyconversionElement = jest.spyOn(sidebarAction, 'handleElementConversion');
            storeMock.dispatch(sidebarAction.handleElementConversion(elementData, store, activeElement, fromToolbar,showHideObj)); 
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
        it('1.3.1 indexes.length === 4 ', () => {
            const { initState, elementData, store, activeElement, fromToolbar,showHideObj } = testData?.testcase29;
            config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
            const storeMock = mockStore(() => initState);
            const spyconversionElement = jest.spyOn(sidebarAction, 'handleElementConversion');
            storeMock.dispatch(sidebarAction.handleElementConversion(elementData, store, activeElement, fromToolbar,showHideObj)); 
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
    });
    describe('2.4 indexes.forEach(index => {  ', () => {
        it('1.4.1 bodymatter[index] else case ', () => {
            const { initState, elementData, store, activeElement, fromToolbar,showHideObj } = testData?.testcase3;
            config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
            const storeMock = mockStore(() => initState);
            const spyconversionElement = jest.spyOn(sidebarAction, 'handleElementConversion');
            storeMock.dispatch(sidebarAction.handleElementConversion(elementData, store, activeElement, fromToolbar,showHideObj)); 
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
        it('1.4.2 elementData.elementId !== bodymatter[index].id ', () => {
            const { initState, elementData, store, activeElement, fromToolbar,showHideObj } = testData?.testcase4;
            config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
            const storeMock = mockStore(() => initState);
            const spyconversionElement = jest.spyOn(sidebarAction, 'handleElementConversion');
            storeMock.dispatch(sidebarAction.handleElementConversion(elementData, store, activeElement, fromToolbar,showHideObj)); 
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
         it('1.4.3 else ', () => {
            const { initState, elementData, store, activeElement, fromToolbar,showHideObj } = testData?.testcase5;
            config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
            const storeMock = mockStore(() => initState);
            const spyconversionElement = jest.spyOn(sidebarAction, 'handleElementConversion');
            storeMock.dispatch(sidebarAction.handleElementConversion(elementData, store, activeElement, fromToolbar,showHideObj)); 
            expect(spyconversionElement).toHaveBeenCalled()
            spyconversionElement.mockClear()
        });
    });
});
describe('3 Test setBCEMetadata ', () => {
    it('3.1 Test setBCEMetadata ', () => {
        const { initState, attribute, value } = testData?.testcase6;
        const storeMock = mockStore(() => initState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'setBCEMetadata');
        storeMock.dispatch(sidebarAction.setBCEMetadata(attribute,value)); 
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
    });
});
describe('4 Test tcmSnapshotsForConversion  ', () => {
    const { elementConversionData, indexes, appStore } = testData?.testcase14;
    it('4.1 Test response.hasOwnProperty("figuretype") ', () => {
        let actionStatus={
            action:"update",
            status:"",
            fromWhere:"conversion"
        }
        config.slateManifestURN = "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d";
        const storeMock = mockStore(() => initialState);
        const spyconversionElement = jest.spyOn(sidebarAction, 'tcmSnapshotsForConversion');
        sidebarAction.tcmSnapshotsForConversion(elementConversionData,indexes,appStore, storeMock.dispatch);
        expect(spyconversionElement).toHaveBeenCalled()
        spyconversionElement.mockClear()
    });
});
describe('5 Test updateContainerMetadata ', () => {
    it('5.1 Test Case for API resolve updateContainerMetadata and status is wip', () => {
        let responseData = {}
        const {initState,dataToUpdate} = testData?.testcase18;
        config.slateManifestURN = "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateContainerMetadata');
        axios.put = jest.fn(() => Promise.resolve(responseData));
        sidebarAction.updateContainerMetadata(dataToUpdate);
        storeMock.dispatch(sidebarAction.updateContainerMetadata(dataToUpdate)); 
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    });
    it('5.1 Test Case updateContainerMetadataInStore > else if', () => {
        let responseData = {}
        const {initState,dataToUpdate} = testData?.testcase1888;
        config.slateManifestURN = "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateContainerMetadata');
        axios.put = jest.fn(() => Promise.resolve(responseData));
        sidebarAction.updateContainerMetadata(dataToUpdate);
        storeMock.dispatch(sidebarAction.updateContainerMetadata(dataToUpdate)); 
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    });
    it('5.1 Test Case updateContainerMetadataInStore > else if > else > else', () => {
        let responseData = {}
        const {initState,dataToUpdate} = testData?.testcase27;
        config.slateManifestURN = "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateContainerMetadata');
        axios.put = jest.fn(() => Promise.resolve(responseData));
        sidebarAction.updateContainerMetadata(dataToUpdate);
        storeMock.dispatch(sidebarAction.updateContainerMetadata(dataToUpdate)); 
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    });
    it('5.1 Test Case updateContainerMetadataInStore > 1st if > else', () => {
        let responseData = {}
        const {initState,dataToUpdate} = testData?.testcase188;
        config.slateManifestURN = "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateContainerMetadata');
        axios.put = jest.fn(() => Promise.resolve(responseData));
        sidebarAction.updateContainerMetadata(dataToUpdate);
        storeMock.dispatch(sidebarAction.updateContainerMetadata(dataToUpdate)); 
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    });
    it('5.2 Test Case for API resolve updateContainerMetadata and status is approved', () => {
        let responseData = {}
        const {initState,dataToUpdate} = testData?.testcase19;
        config.slateManifestURN = "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateContainerMetadata');
        axios.put = jest.fn(() => Promise.resolve(responseData));
        sidebarAction.updateContainerMetadata(dataToUpdate);
        storeMock.dispatch(sidebarAction.updateContainerMetadata(dataToUpdate)); 
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    });
    it('5.3 Test Case for updateContainerMetadata and status is approved type is not popup', () => {
        let responseData = {}
        const {initState,dataToUpdate} = testData?.testcase20;
        config.slateManifestURN = "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateContainerMetadata');
        axios.put = jest.fn(() => Promise.resolve(responseData));
        sidebarAction.updateContainerMetadata(dataToUpdate);
        storeMock.dispatch(sidebarAction.updateContainerMetadata(dataToUpdate)); 
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    });
    it('5.4 Test Case for API reject updateContainerMetadata', () => {
        let responseData = {}
        const {initState,dataToUpdate} = testData?.testcase18;
        config.slateManifestURN = "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateContainerMetadata');
        axios.put = jest.fn(() => Promise.reject(responseData));
        sidebarAction.updateContainerMetadata(dataToUpdate);
        storeMock.dispatch(sidebarAction.updateContainerMetadata(dataToUpdate)); 
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    });
    describe("element conversion in showhide",()=>{
        xit('handle conversion of As in SH',()=>{
            let dispatch=()=>{}
            let store1 = mockStore(() => initialState20);
            let nextStore = slateData.SlateData5
            config.slateManifestURN = "urn:pearson:manifest:6b249fd3-c25b-4c91-b8ac-037c9f30c012"
            let activeElement = {
                altText: "",
                elementId: "urn:pearson:work:6eda30b3-170e-476f-ab17-6ea6098d3d99",
                elementType: "figure",
                elementWipType: "figure",
                index: "0-0-1-1",
                longDesc: "",
                podwidth: "",
                primaryOption: "primary-image-table",
                secondaryOption: "secondary-image-table-half",
                tag: "TB"
            }
        const spyconversionElement = jest.spyOn(sidebarAction, 'handleElementConversion');
        let result=store1.dispatch(sidebarAction.conversionElement(activeElement,nextStore,activeElement,undefined,""));
        expect(result).toHaveBeenCalled();
        spyconversionElement.mockClear() 
        })
    })
});

describe('Test - ManifestList conversion', () => {
    it('Test - updateBLMetaData', () => {
        const elementData = {
            id: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65334"
        }
        const metadata = {
            subtype: 'roman',
            columnnumber: 1,
            fontstyle:2,
            iconcolor:2
        }
        const spyFunction = jest.spyOn(sidebarAction, 'updateBLMetaData');
        sidebarAction.updateBLMetaData("urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65334", elementData, metadata);
        expect(spyFunction).toHaveBeenCalled()
    })

    it('Test - updateBLMetaData - listdata', () => {
        const elementData = {
            listdata: {
                bodymatter: [{ id: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65334"}]
            }
        }
        const metadata = {
            subtype: 'roman',
            columnnumber: 1,
            fontstyle:2,
            iconcolor:2
        }
        const spyFunction = jest.spyOn(sidebarAction, 'updateBLMetaData');
        sidebarAction.updateBLMetaData("urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65334", elementData, metadata);
        expect(spyFunction).toHaveBeenCalled()
    })

    it('Test - updateBLMetaData - listitemdata', () => {
        const elementData = {
            listitemdata: {
                bodymatter: [{ id: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65332"},{ id: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65334"}]
            }
        }
        const metadata = {
            subtype: 'roman',
            columnnumber: 1,
            fontstyle:2,
            iconcolor:2
        }
        const spyFunction = jest.spyOn(sidebarAction, 'updateBLMetaData');
        sidebarAction.updateBLMetaData("urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65334", elementData, metadata);
        expect(spyFunction).toHaveBeenCalled()
    })
    it('Test - updateBlockListMetadata - success block', async () => {
        const {initState} = testData?.testcase18;
        config.slateManifestURN = "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateBlockListMetadata');
        axios.put = jest.fn(() => Promise.resolve({}));
        const dataToUpdate = {
            blockListData: {
                contentUrn: '',
                id: '',
            },
            dataToSend: {
                columnnumber: 1,
                slateLevelBLIndex: 1
            },
            asideData:{
                parent:{
                    type:"showhide"
                }
            }
        }
        storeMock.dispatch(sidebarAction.updateBlockListMetadata(dataToUpdate));
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    })
    it('Test - updateBlockListMetadata1- success block', async () => {
        const {initState} = testData?.testcase18;
        config.slateManifestURN = "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateBlockListMetadata');
        axios.put = jest.fn(() => Promise.resolve({}));
        const dataToUpdate = {
            blockListData: {
                contentUrn: '',
                id: '',
            },
            dataToSend: {
                columnnumber: 1,
                slateLevelBLIndex: 1
            },
            asideData:{
                    type:"showhide"
            }
        }
        storeMock.dispatch(sidebarAction.updateBlockListMetadata(dataToUpdate));
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    })
    it('Test - updateBlockListMetadata2- success block', async () => {
        const {initState} = testData?.testcase18;
        config.slateManifestURN = "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateBlockListMetadata');
        axios.put = jest.fn(() => Promise.resolve({}));
        const dataToUpdate = {
            blockListData: {
                contentUrn: '',
                id: '',
            },
            dataToSend: {
                columnnumber: 1,
                slateLevelBLIndex: 1
            },
            asideData:{
                parent:{
                    type:"showhide",
                    showHideType:"showhide"
                }
            }
        }
        storeMock.dispatch(sidebarAction.updateBlockListMetadata(dataToUpdate));
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    })
    it('Test - updateBlockListMetadata2-AS- success block', async () => {
        const {initState} = testData?.testcase23;
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateBlockListMetadata');
        axios.put = jest.fn(() => Promise.resolve({}));
        const dataToUpdate = {
            blockListData: {
                contentUrn: '',
                id: 'urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b',
            },
            slateLevelBLIndex:[0,0,0,0],
            dataToSend: {
                columnnumber: 1,
                slateLevelBLIndex: 1
            },
            asideData:{
                "type":"manifestlist",
                "subtype":"decimal",
                "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
                "element":{
                   "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                   "type":"manifestlist",
                   "subtype":"decimal",
                   "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                   "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                   "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
                   "listdata":{
                      "bodymatter":[
                         {
                            "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                            "type":"manifestlistitem",
                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                            "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                            "listitemdata":{
                               "bodymatter":[
                                  {
                                     "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                     "type":"element-authoredtext",
                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata":{
                                        "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text":""
                                     },
                                     "html":{
                                        "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                     },
                                     "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                     "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                     "status":"wip",
                                     "index":"0-0-0-0"
                                  }
                               ]
                            }
                         }
                      ]
                   },
                   "listtype":"ordered",
                   "startNumber":1,
                   "columnnumber":1,
                   "iconcolor":"iconColor1",
                   "fontstyle":"fontStyle1"
                },
                "index":"0-0",
                "parent":{
                   "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
                   "type":"element-aside",
                   "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
                },
                "parentManifestList":{
                   "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                   "type":"manifestlist",
                   "subtype":"decimal",
                   "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                   "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                   "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
                   "listdata":{
                      "bodymatter":[
                         {
                            "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                            "type":"manifestlistitem",
                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                            "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                            "listitemdata":{
                               "bodymatter":[
                                  {
                                     "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                     "type":"element-authoredtext",
                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata":{
                                        "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text":""
                                     },
                                     "html":{
                                        "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                     },
                                     "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                     "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                     "status":"wip",
                                     "index":"0-0-0-0"
                                  }
                               ]
                            }
                         }
                      ]
                   },
                   "listtype":"ordered",
                   "startNumber":1,
                   "columnnumber":1,
                   "iconcolor":"iconColor1",
                   "fontstyle":"fontStyle1"
                }
             }
        }
        storeMock.dispatch(sidebarAction.updateBlockListMetadata(dataToUpdate));
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    })
    it('Test - updateBlockListMetadata .slateLevelBLIndex === number', async () => {
        const {initState} = testData?.testcase23;
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateBlockListMetadata');
        axios.put = jest.fn(() => Promise.resolve({}));
        const dataToUpdate = {
            blockListData: {
                contentUrn: '',
                id: 'urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b',
            },
            slateLevelBLIndex:0,
            dataToSend: {
                columnnumber: 1,
                slateLevelBLIndex: 1
            },
            asideData:{
                "type":"manifestlist",
                "subtype":"decimal",
                "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
                "element":{
                   "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                   "type":"manifestlist",
                   "subtype":"decimal",
                   "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                   "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                   "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
                   "listdata":{
                      "bodymatter":[
                         {
                            "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                            "type":"manifestlistitem",
                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                            "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                            "listitemdata":{
                               "bodymatter":[
                                  {
                                     "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                     "type":"element-authoredtext",
                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata":{
                                        "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text":""
                                     },
                                     "html":{
                                        "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                     },
                                     "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                     "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                     "status":"wip",
                                     "index":"0-0-0-0"
                                  }
                               ]
                            }
                         }
                      ]
                   },
                   "listtype":"ordered",
                   "startNumber":1,
                   "columnnumber":1,
                   "iconcolor":"iconColor1",
                   "fontstyle":"fontStyle1"
                },
                "index":"0-0",
                "parent":{
                   "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
                   "type":"element-aside",
                   "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
                },
                "parentManifestList":{
                   "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                   "type":"manifestlist",
                   "subtype":"decimal",
                   "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                   "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                   "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
                   "listdata":{
                      "bodymatter":[
                         {
                            "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                            "type":"manifestlistitem",
                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                            "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                            "listitemdata":{
                               "bodymatter":[
                                  {
                                     "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                     "type":"element-authoredtext",
                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata":{
                                        "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text":""
                                     },
                                     "html":{
                                        "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                     },
                                     "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                     "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                     "status":"wip",
                                     "index":"0-0-0-0"
                                  }
                               ]
                            }
                         }
                      ]
                   },
                   "listtype":"ordered",
                   "startNumber":1,
                   "columnnumber":1,
                   "iconcolor":"iconColor1",
                   "fontstyle":"fontStyle1"
                }
             }
        }
        storeMock.dispatch(sidebarAction.updateBlockListMetadata(dataToUpdate));
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    })
    it('Test - updateBlockListMetadata2-WE- success block', async () => {
        const {initState} = testData?.testcase23;
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateBlockListMetadata');
        axios.put = jest.fn(() => Promise.resolve({}));
        const dataToUpdate = {
            blockListData: {
                contentUrn: '',
                id: 'urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b',
            },
            slateLevelBLIndex:[0,0,0,0,0],
            dataToSend: {
                columnnumber: 1,
                slateLevelBLIndex: 1
            },
            asideData:{
                "type":"manifestlist",
                "subtype":"decimal",
                "id":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                "contentUrn":"urn:pearson:entity:f4b0d0f4-7f40-4b0e-9845-45b28e6ace11",
                "element":{
                   "id":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                   "type":"manifestlist",
                   "subtype":"decimal",
                   "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                   "versionUrn":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                   "contentUrn":"urn:pearson:entity:f4b0d0f4-7f40-4b0e-9845-45b28e6ace11",
                   "listdata":{
                      "bodymatter":[
                         {
                            "id":"urn:pearson:manifest:4f683a64-980b-48e3-ad3c-d638678c2d79",
                            "type":"manifestlistitem",
                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn":"urn:pearson:manifest:4f683a64-980b-48e3-ad3c-d638678c2d79",
                            "contentUrn":"urn:pearson:entity:b2314342-6262-4740-8bf2-285a6c93a867",
                            "listitemdata":{
                               "bodymatter":[
                                  {
                                     "id":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                                     "type":"element-authoredtext",
                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata":{
                                        "text":"dasfsfasfad sdasd"
                                     },
                                     "html":{
                                        "text":"<p class=\"paragraphNumeroUno\">dasfsfasfad sdasd</p>",
                                        "footnotes":{
                                           
                                        },
                                        "glossaryentries":{
                                           
                                        },
                                        "indexEntries":{
                                           
                                        }
                                     },
                                     "versionUrn":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                                     "contentUrn":"urn:pearson:entity:c43ce28f-4e5d-434e-a78e-cb6d7b9496e1",
                                     "status":"wip",
                                     "inputType":"AUTHORED_TEXT",
                                     "inputSubType":"NA",
                                     "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                     "index":"0-0-0-0-0",
                                     "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                     "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                  }
                               ]
                            }
                         }
                      ]
                   },
                   "listtype":"ordered",
                   "startNumber":1,
                   "columnnumber":1,
                   "iconcolor":"iconColor1",
                   "fontstyle":"fontStyle1"
                },
                "index":"0-0-0",
                "parent":{
                   "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
                   "type":"element-aside",
                   "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
                },
                "parentManifestList":{
                   "id":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                   "type":"manifestlist",
                   "subtype":"decimal",
                   "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                   "versionUrn":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                   "contentUrn":"urn:pearson:entity:f4b0d0f4-7f40-4b0e-9845-45b28e6ace11",
                   "listdata":{
                      "bodymatter":[
                         {
                            "id":"urn:pearson:manifest:4f683a64-980b-48e3-ad3c-d638678c2d79",
                            "type":"manifestlistitem",
                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn":"urn:pearson:manifest:4f683a64-980b-48e3-ad3c-d638678c2d79",
                            "contentUrn":"urn:pearson:entity:b2314342-6262-4740-8bf2-285a6c93a867",
                            "listitemdata":{
                               "bodymatter":[
                                  {
                                     "id":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                                     "type":"element-authoredtext",
                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata":{
                                        "text":"dasfsfasfad sdasd"
                                     },
                                     "html":{
                                        "text":"<p class=\"paragraphNumeroUno\">dasfsfasfad sdasd</p>",
                                        "footnotes":{
                                           
                                        },
                                        "glossaryentries":{
                                           
                                        },
                                        "indexEntries":{
                                           
                                        }
                                     },
                                     "versionUrn":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                                     "contentUrn":"urn:pearson:entity:c43ce28f-4e5d-434e-a78e-cb6d7b9496e1",
                                     "status":"wip",
                                     "inputType":"AUTHORED_TEXT",
                                     "inputSubType":"NA",
                                     "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                     "index":"0-0-0-0-0",
                                     "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                     "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                  }
                               ]
                            }
                         }
                      ]
                   },
                   "listtype":"ordered",
                   "startNumber":1,
                   "columnnumber":1,
                   "iconcolor":"iconColor1",
                   "fontstyle":"fontStyle1"
                }
             },
        }
        storeMock.dispatch(sidebarAction.updateBlockListMetadata(dataToUpdate));
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    })
    it('Test - updateBlockListMetadata2-2C/3C- success block', async () => {
        const {initState} = testData?.testcase25;
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateBlockListMetadata');
        axios.put = jest.fn(() => Promise.resolve({}));
        const dataToUpdate = {
            blockListData: {
                contentUrn: '',
                id: 'urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b',
            },
            slateLevelBLIndex:[0,0,0,0,0],
            dataToSend: {
                columnnumber: 1,
                slateLevelBLIndex: 1
            },
            asideData:{
                "type":"manifestlist",
                "subtype":"decimal",
                "id":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                "contentUrn":"urn:pearson:entity:f4b0d0f4-7f40-4b0e-9845-45b28e6ace11",
                "element":{
                   "id":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                   "type":"manifestlist",
                   "subtype":"decimal",
                   "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                   "versionUrn":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                   "contentUrn":"urn:pearson:entity:f4b0d0f4-7f40-4b0e-9845-45b28e6ace11",
                   "listdata":{
                      "bodymatter":[
                         {
                            "id":"urn:pearson:manifest:4f683a64-980b-48e3-ad3c-d638678c2d79",
                            "type":"manifestlistitem",
                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn":"urn:pearson:manifest:4f683a64-980b-48e3-ad3c-d638678c2d79",
                            "contentUrn":"urn:pearson:entity:b2314342-6262-4740-8bf2-285a6c93a867",
                            "listitemdata":{
                               "bodymatter":[
                                  {
                                     "id":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                                     "type":"element-authoredtext",
                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata":{
                                        "text":"dasfsfasfad sdasd"
                                     },
                                     "html":{
                                        "text":"<p class=\"paragraphNumeroUno\">dasfsfasfad sdasd</p>",
                                        "footnotes":{
                                           
                                        },
                                        "glossaryentries":{
                                           
                                        },
                                        "indexEntries":{
                                           
                                        }
                                     },
                                     "versionUrn":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                                     "contentUrn":"urn:pearson:entity:c43ce28f-4e5d-434e-a78e-cb6d7b9496e1",
                                     "status":"wip",
                                     "inputType":"AUTHORED_TEXT",
                                     "inputSubType":"NA",
                                     "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                     "index":"0-0-0-0-0",
                                     "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                     "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                  }
                               ]
                            }
                         }
                      ]
                   },
                   "listtype":"ordered",
                   "startNumber":1,
                   "columnnumber":1,
                   "iconcolor":"iconColor1",
                   "fontstyle":"fontStyle1"
                },
                "index":"0-0-0",
                "parent":{
                   "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
                   "type":"groupedcontent",
                   "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
                },
                "parentManifestList":{
                   "id":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                   "type":"manifestlist",
                   "subtype":"decimal",
                   "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                   "versionUrn":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                   "contentUrn":"urn:pearson:entity:f4b0d0f4-7f40-4b0e-9845-45b28e6ace11",
                   "listdata":{
                      "bodymatter":[
                         {
                            "id":"urn:pearson:manifest:4f683a64-980b-48e3-ad3c-d638678c2d79",
                            "type":"manifestlistitem",
                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn":"urn:pearson:manifest:4f683a64-980b-48e3-ad3c-d638678c2d79",
                            "contentUrn":"urn:pearson:entity:b2314342-6262-4740-8bf2-285a6c93a867",
                            "listitemdata":{
                               "bodymatter":[
                                  {
                                     "id":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                                     "type":"element-authoredtext",
                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata":{
                                        "text":"dasfsfasfad sdasd"
                                     },
                                     "html":{
                                        "text":"<p class=\"paragraphNumeroUno\">dasfsfasfad sdasd</p>",
                                        "footnotes":{
                                           
                                        },
                                        "glossaryentries":{
                                           
                                        },
                                        "indexEntries":{
                                           
                                        }
                                     },
                                     "versionUrn":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                                     "contentUrn":"urn:pearson:entity:c43ce28f-4e5d-434e-a78e-cb6d7b9496e1",
                                     "status":"wip",
                                     "inputType":"AUTHORED_TEXT",
                                     "inputSubType":"NA",
                                     "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                     "index":"0-0-0-0-0",
                                     "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                     "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                  }
                               ]
                            }
                         }
                      ]
                   },
                   "listtype":"ordered",
                   "startNumber":1,
                   "columnnumber":1,
                   "iconcolor":"iconColor1",
                   "fontstyle":"fontStyle1"
                }
             },
        }
        storeMock.dispatch(sidebarAction.updateBlockListMetadata(dataToUpdate));
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    })
    it('Test - updateBlockListMetadata2-BL- success block', async () => {
        const {initState} = testData?.testcase24;
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateBlockListMetadata');
        axios.put = jest.fn(() => Promise.resolve({}));
        const dataToUpdate = {
            blockListData: {
                contentUrn: '',
                id: 'urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b',
            },
            slateLevelBLIndex:[0,0,0],
            dataToSend: {
                columnnumber: 1,
                slateLevelBLIndex: 1
            },
            asideData:{
                "type":"manifestlist",
                "subtype":"decimal",
                "id":"urn:pearson:manifest:045cde04-a001-47e0-9720-76fda6510d7b",
                "contentUrn":"urn:pearson:entity:cfad7e8f-0c35-4429-9e09-5bfff8824fc1",
                "element":{
                   "id":"urn:pearson:manifest:045cde04-a001-47e0-9720-76fda6510d7b",
                   "type":"manifestlist",
                   "subtype":"decimal",
                   "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                   "versionUrn":"urn:pearson:manifest:045cde04-a001-47e0-9720-76fda6510d7b",
                   "contentUrn":"urn:pearson:entity:cfad7e8f-0c35-4429-9e09-5bfff8824fc1",
                   "listdata":{
                      "bodymatter":[
                         {
                            "id":"urn:pearson:manifest:ca64b7a5-2c4b-423d-8a37-0cebdecfef46",
                            "type":"manifestlistitem",
                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn":"urn:pearson:manifest:ca64b7a5-2c4b-423d-8a37-0cebdecfef46",
                            "contentUrn":"urn:pearson:entity:774efdd9-d15f-4b50-ac54-bfdf0a87b1e9",
                            "listitemdata":{
                               "bodymatter":[
                                  {
                                     "id":"urn:pearson:work:1a6c1bb8-9745-4206-94b0-2d31d74ad0fc",
                                     "type":"element-authoredtext",
                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata":{
                                        "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text":""
                                     },
                                     "html":{
                                        "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                     },
                                     "versionUrn":"urn:pearson:work:1a6c1bb8-9745-4206-94b0-2d31d74ad0fc",
                                     "contentUrn":"urn:pearson:entity:b89a9fed-a4d9-4312-8fe6-aeabd08e84ba",
                                     "status":"wip",
                                     "index":"0-0-0"
                                  }
                               ]
                            }
                         }
                      ]
                   },
                   "listtype":"ordered",
                   "startNumber":1,
                   "columnnumber":1,
                   "iconcolor":"iconColor1",
                   "fontstyle":"fontStyle1"
                },
                "index":0,
                "parentManifestList":{
                   "id":"urn:pearson:manifest:045cde04-a001-47e0-9720-76fda6510d7b",
                   "type":"manifestlist",
                   "subtype":"decimal",
                   "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                   "versionUrn":"urn:pearson:manifest:045cde04-a001-47e0-9720-76fda6510d7b",
                   "contentUrn":"urn:pearson:entity:cfad7e8f-0c35-4429-9e09-5bfff8824fc1",
                   "listdata":{
                      "bodymatter":[
                         {
                            "id":"urn:pearson:manifest:ca64b7a5-2c4b-423d-8a37-0cebdecfef46",
                            "type":"manifestlistitem",
                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn":"urn:pearson:manifest:ca64b7a5-2c4b-423d-8a37-0cebdecfef46",
                            "contentUrn":"urn:pearson:entity:774efdd9-d15f-4b50-ac54-bfdf0a87b1e9",
                            "listitemdata":{
                               "bodymatter":[
                                  {
                                     "id":"urn:pearson:work:1a6c1bb8-9745-4206-94b0-2d31d74ad0fc",
                                     "type":"element-authoredtext",
                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata":{
                                        "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text":""
                                     },
                                     "html":{
                                        "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                     },
                                     "versionUrn":"urn:pearson:work:1a6c1bb8-9745-4206-94b0-2d31d74ad0fc",
                                     "contentUrn":"urn:pearson:entity:b89a9fed-a4d9-4312-8fe6-aeabd08e84ba",
                                     "status":"wip",
                                     "index":"0-0-0"
                                  }
                               ]
                            }
                         }
                      ]
                   },
                   "listtype":"ordered",
                   "startNumber":1,
                   "columnnumber":1,
                   "iconcolor":"iconColor1",
                   "fontstyle":"fontStyle1"
                }
             },
        }
        storeMock.dispatch(sidebarAction.updateBlockListMetadata(dataToUpdate));
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    })
    it('Test - updateBlockListMetadata2- success block', async () => {
        const {initState} = testData?.testcase18;
        config.slateManifestURN = "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateBlockListMetadata');
        axios.put = jest.fn(() => Promise.resolve({}));
        const dataToUpdate = {
            blockListData: {
                contentUrn: '',
                id: '',
            },
            dataToSend: {
                columnnumber: 1,
                slateLevelBLIndex: 1
            },
            asideData:{
                sectionType:"showhide",
            }
        }
        storeMock.dispatch(sidebarAction.updateBlockListMetadata(dataToUpdate));
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    })
    it('Test - updateBlockListMetadata - catch block', async () => {
        const {initState} = testData?.testcase21;
        config.slateManifestURN = "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateBlockListMetadata');
        axios.put = jest.fn(() => Promise.reject({}));
        const dataToUpdate = {
            blockListData: {
                contentUrn: '',
                id: '',
            },
            dataToSend: {
                columnnumber: 1,
                slateLevelBLIndex: 1
            },
            asideData:{
                parent:{
                    type:"showhide"
                }
            }
        }
        storeMock.dispatch(sidebarAction.updateBlockListMetadata(dataToUpdate));
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    })
    it('Test - updateBlockListMetadata - success - approved block', async () => {
        const {initState} = testData?.testcase21;
        config.slateManifestURN = "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateBlockListMetadata');
        axios.put = jest.fn(() => Promise.resolve({}));
        const dataToUpdate = {
            blockListData: {
                contentUrn: '',
                id: '',
            },
            dataToSend: {
                columnnumber: 1,
                slateLevelBLIndex: 1
            },
            asideData:{
                sectionType:"showhide",
                parent:{
                    type:"showhide"
                }
            }
        }
        storeMock.dispatch(sidebarAction.updateBlockListMetadata(dataToUpdate));
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    })
    it('Test - updateBlockListMetadata - success - approved - parent - popup', async () => {
        const {initState} = testData?.testcase22;
        config.slateManifestURN = "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333";
        const storeMock = mockStore(() => initState);
        const spyFunction = jest.spyOn(sidebarAction, 'updateBlockListMetadata');
        axios.put = jest.fn(() => Promise.resolve({}));
        const dataToUpdate = {
            blockListData: {
                contentUrn: '',
                id: '',
            },
            dataToSend: {
                columnnumber: 1,
                slateLevelBLIndex: 1
            }
        }
        storeMock.dispatch(sidebarAction.updateBlockListMetadata(dataToUpdate));
        expect(spyFunction).toHaveBeenCalled()
        spyFunction.mockClear()
    })
    it('testing-- enableAsideNumbering  action', () => {
        let dispatch = (obj) => {
            expect(obj.type).toBe(CHECK_ASIDE_NUMBER);
            expect(obj.payload).toEqual({"elementId": undefined, "isAsideNumber": true});
        };
        const spyFunction = jest.spyOn(sidebarAction, 'enableAsideNumbering');
        sidebarAction.enableAsideNumbering(true)(dispatch)
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    })
});
