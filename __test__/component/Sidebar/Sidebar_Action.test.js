import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
const middlewares = [thunk];
import axios from 'axios';
const mockStore = configureMockStore(middlewares);
import slateData from '../../../fixtures/SidebarTestData'
import activeElementData from './SidebarInitialState';
import * as sidebarAction from '../../../src/component/Sidebar/Sidebar_Action';
jest.mock('axios');
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn()
}))
jest.mock('../../../src/config/config.js', () => ({
    slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
    slateEntityURN: "urn:pearson:entity:2b03e70f-8730-451b-9f9a-b496b6d91c9e",
    projectUrn: "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d",
    projectEntityUrn: "urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c",
    REACT_APP_API_URL: "https://10.11.7.24:8443/cypress-api/",
    ssoToken: "IZaFs6qIbKAo1yX0WaRCz6fagzA.*AAJTSQACMDIAAlNLABw5WUNuT3h6MEN0OHRFRUlEZUxFamxQa1EyNm89AAJTMQACMDE.*"
}))

const initialState = {
    appStore: {
        slateLevelData: slateData,
        activeElement: activeElementData.paragraph
    }
}
const initialState2 = {
    appStore: {
        slateLevelData: slateData,
        activeElement: activeElementData.assessment
    },
}
const initialState3 = {
    appStore: {
        slateLevelData: slateData,
        activeElement:activeElementData.image
    },
}
const initialState4 = {
    appStore: {
        slateLevelData: slateData,
        activeElement: activeElementData.video
    },
}
const initialState5 = {
    appStore: {
        slateLevelData: slateData,
        activeElement:activeElementData.interactive
    }
}
const initialState6 = {
    appStore: {
        slateLevelData: slateData,
        activeElement:activeElementData.blockcode
    },
}
const initialState7 = {
    appStore: {
        slateLevelData: slateData,
        activeElement:activeElementData.list
    },
}
const initialState8 = {
    appStore: {
        slateLevelData: slateData,
        activeElement: activeElementData.workedexample
    },
}
const initialState9 = {
    appStore: {
        slateLevelData: slateData,
        activeElement:activeElementData.aside 
    },
}
const initialState10 = {
    appStore: {
        slateLevelData: slateData,
        activeElement:activeElementData.aside_authoredtext
    },
}
const initialState11 = {
    appStore: {
        slateLevelData: slateData,
        activeElement: activeElementData.we_authoredtext
    },
}
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
xdescribe('Test convertElement- singleAssessment', () => {
    let store = mockStore(() => initialState2);
    it('Test convertElement  -assessment type', () => {
        store = mockStore(() => initialState2);
        let newData = {
            elementId: "urn:pearson:work:fa8ebea3-d9ba-4aec-8658-2f944841404a",
            elementType: "element-assessment",
            labelText: "Qu",
            primaryOption: "primary-single-assessment",
            secondaryOption: "secondary-single-assessment-tdx",
            toolbar: ["bold", "italic", "underline", "strikethrough", "clearformatting", "increaseindent", "decreaseindent", "footnote", "glossary", "orderedlist", "unorderedlist", "mathml", "chemml", "inlinecode", "superscript", "subscript", "specialcharactor", "undo", "redo", "assetpopover", "slatetag"]
        }
        let acElem={
            elementId: "urn:pearson:work:fa8ebea3-d9ba-4aec-8658-2f944841404a",
            elementType: "element-assessment",
            elementWipType: "figure",
            index: 3,
            primaryOption: "primary-single-assessment",
            secondaryOption: "secondary-single-assessment-cite",
            tag: "Qu",
            toolbar: ["bold", "italic", "underline", "strikethrough", "clearformatting", "increaseindent", "decreaseindent", "footnote", "glossary", "orderedlist", "unorderedlist", "mathml", "chemml", "inlinecode", "superscript", "subscript", "specialcharactor", "undo", "redo", "assetpopover", "slatetag"]
        }
        let oldData={
            "comments": false,
            "contentUrn": "urn:pearson:entity:3880c07d-2740-4768-822b-a719c9303f93",
            "elementdata": { text: null },
            "feedback": false,
            "figuredata": {
                "elementdata": {
                    "assessmentformat": "tdx",
                    "assessmentitemtype": "tdxAssessmentItem",
                    "posterimage": { "path": "https://cite-media-stg.pearson.com/legacy_paths/8e…41-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png" },
                    "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
                    "usagetype": "Quiz",
              },
                "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
                "type": "element-assessment",
                "subtype": "assessment"
            },
            "figuretype": "assessment",
            "html": { "title": "" },
            "id": "urn:pearson:work:fa8ebea3-d9ba-4aec-8658-2f944841404a",
            "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
            "title": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
            "type": "figure",
            "tcm": false,
            "versionUrn": "urn:pearson:work:fa8ebea3-d9ba-4aec-8658-2f944841404a",
        }
        let assessmentDiv = document.createElement('div');
        assessmentDiv.setAttribute('data-id', 'urn:pearson:work:fa8ebea3-d9ba-4aec-8658-2f944841404a')
        let usageTypeSpan = document.createElement('span');
        usageTypeSpan.className = 'singleAssessment_Dropdown_currentLabel';
        usageTypeSpan.innerText = 'Quiz'
        assessmentDiv.appendChild(usageTypeSpan)
        document.body.appendChild(assessmentDiv)
        let store = mockStore(() => initialState2);
        const spyconversionElement = jest.spyOn(sidebarAction, 'conversionElement')
        store.dispatch(sidebarAction.conversionElement(newData));
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
    let store = mockStore(() => initialState11);
    it('Test convertElement  -WORKED-EXAMPLE 1 TO 2', () => {
        store = mockStore(() => initialState11);
        let elementData = {
            elementId: "urn:pearson:work:fcba4843-df9e-491a-a144-b6a22fa5177a",
            elementType: "element-authoredtext",
            labelText: "H1",
            primaryOption: "primary-heading",
            secondaryOption: "secondary-heading-1",
            toolbar: ["bold", "underline", "strikethrough", "orderedlist", "unorderedlist", "increaseindent", "decreaseindent", "glossary", "assetpopover", "slatetag", "redo"]
        }
        let store = mockStore(() => initialState11);
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
xdescribe('Test convertElement- ASIDE-CONTAINER-internal conversion', () => {
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
xdescribe('Test convertElement- MOCK API CALL', () => {
    let store = mockStore(() => initialState4);
    it('Test convertElement  -MOCK API CALL',async () => {
        store = mockStore(() => initialState4);
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
        let expectedRes = {
            status: 200,
            statusText: "",
            data: {
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
                    srctype: "externallink",
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
        }
        let store = mockStore(() => initialState4);
        let expectedRess= {
            elementId: 'urn:pearson:work:e4d3e2ce-71f6-4ffa-9868-3d0b00a69f75',
            index: '5',
            elementType: 'video-audio',
            primaryOption: 'primary-video',
            secondaryOption: 'secondary-video-smartlink',
            tag: 'VID',
            toolbar: [ 'assetpopover', 'glossary' ],
            elementWipType: undefined,
            altText: '',
            longDesc: ''
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
         let result = await sidebarAction.convertElement(oldData, elementData, activeElement, slateData,["5"]);
         result(dispatch);
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
xdescribe('Test convertElement- MOCK API CALL-catch', () => {
    let store = mockStore(() => initialState4);
    it('Test convertElement  -MOCK API CALL',async () => {
        store = mockStore(() => initialState4);
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
        result();
        setTimeout(() => {
            expect(sendDataToIframe).toHaveBeenCalled()
        }, 1000)
    });
});
