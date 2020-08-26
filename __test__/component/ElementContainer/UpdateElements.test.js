import * as updateFunction from '../../../src/component/ElementContainer/UpdateElements';
import { citationElementData, elementAuthoredText, figureData, audioVideoData, interactiveData, mathMLData, blockCodeEditorData, singleAssessmentData, assessmentSlateData, openerElementData,asideElementData, interactiveDataPDF,poetryElementData } from '../../../fixtures/UpdateElementsTestData';
import tinyMCE from 'tinymce/tinymce'
import config from "../../../src/config/config.js"
jest.mock('./../../../src/constants/utility.js', () => ({
    matchHTMLwithRegex: jest.fn(),
    removeBlankTags: jest.fn()
}))

config["elementStatus"] = {}

describe('Test for UpdateElements Functions', () => {
    it('Test for ELEMENT-TYPE----->element-authoredtext', () => {
        let type = "element-authoredtext",
            previousElementData = elementAuthoredText,
            node = {},
            elementType = "element-authoredtext",
            primaryOption = "primary-paragraph",
            secondaryOption = "secondary-paragraph",
            activeEditorId = "cypress-7",
            index = 7,
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->figure---->image/tableImage/mathImage', () => {
        let type = "figure",
            previousElementData = figureData,
            node = {},
            elementType = "figure",
            primaryOption = "primary-image-figure",
            secondaryOption = "secondary-image-figure-width",
            activeEditorId = "cypress-7-4",
            index = 7,
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->figure---->audio/video', () => {
        let type = "figure",
            previousElementData = audioVideoData,
            node = {},
            elementType = "video-audio",
            primaryOption = "primary-video",
            secondaryOption = "secondary-video-smartlink",
            activeEditorId = "cypress-7-1",
            index = 7,
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->figure---->interactive', () => {
        let type = "figure",
            previousElementData = interactiveData,
            node = {},
            elementType = "element-interactive",
            primaryOption = "primary-mmi",
            secondaryOption = "secondary-interactive-mmi",
            activeEditorId = "cypress-7-1",
            index = 7,
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->figure---->MathML', () => {
        const element = document.createElement('div');
        element.id = "cypress-5-2";
        document.body.appendChild(element);
        let type = "figure",
            previousElementData = mathMLData,
            node = {},
            elementType = "figure",
            primaryOption = "primary-mathml-equation",
            secondaryOption = "secondary-mathml-equation",
            activeEditorId = "cypress-5-1",
            index = 5,
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->Popup', () => {
        const element = document.createElement('div');
        element.id = "cypress-7-1";
        document.body.appendChild(element);
        let type = "element-authoredtext",
            previousElementData = elementAuthoredText,
            node = {},
            elementType = "element-authoredtext",
            primaryOption = "primary-paragraph",
            secondaryOption = "secondary-paragraph",
            activeEditorId = "cypress-7-1",
            index = 7,
            containerContext = {},
            parentElement = {
                type: 'popup',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y',
                popupdata : {
                    "formatted-title" : { id : "urn:pearson:work:681c7a22-e40a-451f-9f87-dae336cfb2c0" },
                    "formatted-subtitle" : { id : "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f3134" },
                    "postertextobject" : [ { id : "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f3135" } ] ,
                }
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->figure---->BlockCodeEditor', () => {
        const elementDiv = document.createElement('div');
        elementDiv.className = "divCodeSnippetFigure blockCodeFigure";

        const elementPre = document.createElement('pre');
        elementPre.className = "code-listing";

        const code = document.createElement('code');
        code.id = "cypress-4-2";
        code.textContent = "blockCode";
        // code.innerText = "blockCode";
        code.innerHTML = "blockCode";
        elementPre.appendChild(code);
        elementDiv.appendChild(elementPre);
        document.body.appendChild(elementDiv);
        
        let type = "figure",
            previousElementData = blockCodeEditorData,
            node = {},
            elementType = "figure",
            primaryOption = "primary-blockcode-equation",
            secondaryOption = "secondary-blockcode-language-c++",
            activeEditorId = "cypress-4-2",
            index = 4,
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->figure---->SingleAssessment', () => {
        const elementDiv = document.createElement('div');
        elementDiv.setAttribute('data-id', "urn:pearson:work:7b027839-60ae-4673-a80b-00d5a6567bd9");

        const elementFigure = document.createElement('figure');
        elementFigure.className = "figureAssessment";

        const elementTitle = document.createElement('div');
        elementTitle.id = "single_assessment_title";
        // elementTitle.innerText = "Title"
        elementTitle.innerHTML = "Title"
        elementFigure.appendChild(elementTitle);

        const elementIdInfo = document.createElement('div');
        elementIdInfo.className = "singleAssessmentIdInfo";
        elementIdInfo.innerHTML = "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74";
        elementIdInfo.textContent = "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74";
        // elementIdInfo.innerText = "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74";
        elementFigure.appendChild(elementIdInfo);

        const elementItemIdInfo = document.createElement('div');
        elementItemIdInfo.className = "singleAssessmentItemIdInfo";
        elementItemIdInfo.textContent = "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74";
        elementItemIdInfo.innerHTML = "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0ba74";
        // elementItemIdInfo.innerText = "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0ba74";
        elementFigure.appendChild(elementItemIdInfo);

        const elementUsageType = document.createElement('span');
        elementUsageType.className = "singleAssessment_Dropdown_currentLabel";
        // elementUsageType.innerText = "Quiz";
        elementUsageType.innerHTML = "Quiz";
        elementUsageType.textContent = "Quiz";
        elementFigure.appendChild(elementUsageType);

        elementDiv.appendChild(elementFigure)
        document.body.appendChild(elementDiv);

        let type = "figure",
            previousElementData = singleAssessmentData,
            node = {},
            elementType = "element-assessment",
            primaryOption = "primary-single-assessment",
            secondaryOption = "secondary-single-assessment-cite",
            activeEditorId = "cypress-7-1",
            index = 7,
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->Assessment Slate', () => {
        let type = "element-assessment",
            previousElementData = assessmentSlateData,
            elementType = "element-assessment",
            primaryOption = "primary-assessment-slate",
            secondaryOption = "secondary-assessment-cite",
            index = 0,
            node = "",
            activeEditorId = "cypress-7-1",
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };

        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->Opener Element', () => {
        let elementData = openerElementData,
            elementType = "openerelement",
            primaryOption = "primary-openerelement",
            secondaryOption = "secondary-openerelement";
        jest.spyOn(updateFunction, 'createOpenerElementData')
        updateFunction.createOpenerElementData(elementData, elementType, primaryOption, secondaryOption);
        expect(updateFunction.createOpenerElementData).toHaveBeenCalledWith(elementData, elementType, primaryOption, secondaryOption)
    })
    it('Test for ELEMENT-TYPE----->element-citation', () => {
        let type = "element-citation",
            previousElementData = citationElementData,
            node = {},
            elementType = "citations",
            primaryOption = "primary-citations-group",
            secondaryOption = "secondary-citations-group",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = {
                type: 'citations',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->element-aside', () => {
        let type = "element-aside",
            previousElementData = asideElementData,
            node = {},
            elementType = "element-aside",
            primaryOption = "primary-aside-aside",
            secondaryOption = "secondary-aside-sb1",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            asideData={
                contentUrn:"80"
            },
            parentElement = {
                type: 'citations',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"",asideData);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"",asideData)
    })
    it('Test for ELEMENT-TYPE----->element-aside with approved', () => {
        let type = "element-aside",
            previousElementData = asideElementData,
            node = {},
            elementType = "element-aside",
            primaryOption = "primary-aside-aside",
            secondaryOption = "secondary-aside-sb1",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = {
                type: 'citations',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->show hide', () => {
        let type = "element-aside",
            previousElementData = asideElementData,
            node = {},
            elementType = "element-aside",
            primaryOption = "primary-aside-aside",
            secondaryOption = "secondary-aside-sb1",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y',
                contentUrn:"80"
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"show");
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"show")
    })
    xit('Test for ELEMENT-TYPE----->figure---->interactive pdf', () => {
        let type = "figure",
            previousElementData = interactiveDataPDF,
            node = {},
            elementType = "element-interactive",
            primaryOption = "primary-mmi",
            secondaryOption = "secondary-interactive-mmi",
            activeEditorId = "cypress-7-1",
            index = 7,
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->figure---->stanza', () => {
        let type = "stanza",
            previousElementData = interactiveDataPDF,
            node = {},
            elementType = "element-interactive",
            primaryOption = "primary-mmi",
            secondaryOption = "secondary-interactive-mmi",
            activeEditorId = "cypress-7-1",
            index = 7,
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->poetry', () => {
        let type = "stanza",
            previousElementData = poetryElementData,
            node = {},
            elementType = "poetry",
            primaryOption = "primary-poetry",
            secondaryOption = "secondary-poetry",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = {
                type: 'poetry',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->Popup subtitle', () => {
        const element = document.createElement('div');
        element.id = "cypress-7-1";
        document.body.appendChild(element);
        let type = "element-authoredtext",
            previousElementData = elementAuthoredText,
            node = {},
            elementType = "element-authoredtext",
            primaryOption = "primary-paragraph",
            secondaryOption = "secondary-paragraph",
            activeEditorId = "cypress-7-1",
            index = 7,
            containerContext = {},
            parentElement = {
                type: 'popup',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y',
                popupdata : {
                    "formatted-title" : { id : "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f3135" },
                    "formatted-subtitle" : { id : "urn:pearson:work:681c7a22-e40a-451f-9f87-dae336cfb2c0" },
                    "postertextobject" : [ { id : "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f3135" } ] ,
                }
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->Popup postertextobject', () => {
        const element = document.createElement('div');
        element.id = "cypress-7-1";
        document.body.appendChild(element);
        let type = "element-authoredtext",
            previousElementData = elementAuthoredText,
            node = {},
            elementType = "element-authoredtext",
            primaryOption = "primary-paragraph",
            secondaryOption = "secondary-paragraph",
            activeEditorId = "cypress-7-1",
            index = 7,
            containerContext = {},
            parentElement = {
                type: 'popup',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y',
                popupdata : {
                    "formatted-title" : { id : "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f3135" },
                    "formatted-subtitle" : { id : "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f3135" },
                    "postertextobject" : [ { id : "urn:pearson:work:681c7a22-e40a-451f-9f87-dae336cfb2c0" } ] ,
                }
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->poetry title', () => {
        let type = "stanza",
            previousElementData = poetryElementData,
            node = {},
            elementType = "poetry",
            primaryOption = "primary-poetry",
            secondaryOption = "secondary-poetry",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = {
                type: 'poetry',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y',
                contents : {
                    "formatted-title" : { id : "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636" },
                    "formatted-subtitle" : { id : "urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f3135" },
                    "postertextobject" : [ { id : "urn:pearson:work:681c7a22-e40a-451f-9f87-dae336cfb2c0" } ] ,
                }
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->poetry subtitle', () => {
        let type = "stanza",
            previousElementData = poetryElementData,
            node = {},
            elementType = "poetry",
            primaryOption = "primary-poetry",
            secondaryOption = "secondary-poetry",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = {
                type: 'poetry',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y',
                contents : {
                    "formatted-title" : { id : "urn:pearson:work:681c7a22-e40a-451f-9f87-dae336cfb2c0" },
                    "formatted-subtitle" : { id : "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636" },
                    "postertextobject" : [ { id : "urn:pearson:work:681c7a22-e40a-451f-9f87-dae336cfb2c0" } ] ,
                }
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->poetry credits summary', () => {
        let type = "stanza",
            previousElementData = poetryElementData,
            node = {},
            elementType = "poetry",
            primaryOption = "primary-poetry",
            secondaryOption = "secondary-poetry",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = {
                type: 'poetry',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y',
                contents : {
                    "formatted-title" : { id : "urn:pearson:work:681c7a22-e40a-451f-9f87-dae336cfb2c0" },
                    "formatted-subtitle" : { id : "urn:pearson:work:681c7a22-e40a-451f-9f87-dae336cfb2c0" },
                    "creditsarray" : [ { id : "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636" } ] ,
                }
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->element-citation parent', () => {
        let type = "element-authoredtext",
            previousElementData = citationElementData,
            node = {},
            elementType = "citations",
            primaryOption = "primary-citations-group",
            secondaryOption = "secondary-citations-group",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = {
                type: 'citations',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->show hide parent', () => {
        let type = "element-authoredtext",
            previousElementData = asideElementData,
            node = {},
            elementType = "element-aside",
            primaryOption = "primary-aside-aside",
            secondaryOption = "secondary-aside-sb1",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y',
                contentUrn:"80"
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"show");
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"show")
    })
  
})