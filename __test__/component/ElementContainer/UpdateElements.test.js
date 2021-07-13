import * as updateFunction from '../../../src/component/ElementContainer/UpdateElements';
import { poetryTitle, stanzaData, citationElementData, elementAuthoredText, figureData, audioVideoData, interactiveData, mathMLData, blockCodeEditorData, singleAssessmentData, assessmentSlateData, openerElementData,asideElementData, interactiveDataPDF,poetryElementData } from '../../../fixtures/UpdateElementsTestData';
import tinyMCE from 'tinymce/tinymce'
import config from "../../../src/config/config.js"
jest.mock('./../../../src/constants/utility.js', () => ({
    matchHTMLwithRegex: jest.fn(),
    removeBlankTags: jest.fn(),
    createLabelNumberTitleModel: jest.fn()
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
    xit('Test for ELEMENT-TYPE----->figure---->MathML', () => {
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
    xit('Test for ELEMENT-TYPE----->figure---->BlockCodeEditor', () => {
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
    it('Test for ELEMENT-TYPE----->figure---->SingleAssessment- if case', () => {
        let type = "figure",
            previousElementData = singleAssessmentData,
            node = {},
            elementType = "element-assessment",
            primaryOption = "primary-single-assessment",
            secondaryOption = "secondary-single-assessment-cite",
            activeEditorId = "cypress-7-1",
            index = 7,
            containerContext = {}
        jest.spyOn(updateFunction, 'createUpdatedData')
        document.querySelector = () => {
            // if(nodeSelector == "div[data-id='urn:pearson:work:7b027839-60ae-4673-a80b-00d5a6567bd9'] figure.figureAssessment"){
                return {
                    querySelector: (selector) => {
                        switch (selector) {
                            case 'span.embedded-id':
                                return {innerText:'urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa75'};
                            case 'span.embedded-title':
                                return {innerText:'Main Title'};
                            case 'span.embedded-itemtitle':
                                return {innerText:'Item-title'};
                            case 'span.embedded-itemid':
                                return {innerText:'urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74'};
                        }
                    }
                }
            // }
        }
        const result = updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, undefined);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, undefined)
        expect(result.figuredata.elementdata.assessmentid).toBe('urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa75');
        expect(result.figuredata.elementdata.assessmenttitle).toBe('Main Title');
        expect(result.figuredata.elementdata.assessmentitemid).toBe('urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74');
        expect(result.figuredata.elementdata.assessmentitemtitle).toBe('Item-title');
    })
    it('Test for ELEMENT-TYPE----->figure---->SingleAssessment- else case', () => {
        let type = "figure",
            previousElementData = singleAssessmentData,
            node = {},
            elementType = "element-assessment",
            primaryOption = "primary-single-assessment",
            secondaryOption = "secondary-single-assessment-cite",
            activeEditorId = "cypress-7-1",
            index = 7,
            containerContext = {}
        jest.spyOn(updateFunction, 'createUpdatedData')
        document.querySelector = () => {
            return {
                querySelector: (selector) => {
                    switch (selector) {
                        case 'span.embedded-id':
                            return 'urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa75'
                        case 'span.embedded-title':
                            return 'Main Title'
                        case 'span.embedded-itemtitle':
                            return 'Item-title'
                        case 'span.embedded-itemid':
                            return 'urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74'
                    }
                }
            }
        }
        const result = updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, undefined);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, undefined)
        expect(result.figuredata.elementdata.assessmentid).toBe('');
        expect(result.figuredata.elementdata.assessmenttitle).toBe('');
        expect(result.figuredata.elementdata.assessmentitemid).toBe('');
        expect(result.figuredata.elementdata.assessmentitemtitle).toBe('');
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
            previousElementData = stanzaData,
            node = {},
            elementType = "stanza",
            primaryOption = "primary-stanza",
            secondaryOption = "secondary-stanza",
            activeEditorId = "cypress-7-1",
            index = 7,
            containerContext = {},
            parentElement = {
                type: 'poetry',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->poetry', () => {
        let type = "element-authoredtext",
            previousElementData = poetryTitle,
            node = {},
            elementType = "element-authoredtext",
            primaryOption = "primary-paragraph",
            secondaryOption = "secondary-paragraph",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = poetryElementData
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
        let type = "element-authoredtext",
            previousElementData = poetryTitle,
            node = {},
            elementType = "element-authoredtext",
            primaryOption = "primary-paragraph",
            secondaryOption = "secondary-paragraph",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = poetryElementData;
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->poetry subtitle', () => {
        let type = "element-authoredtext",
            previousElementData = poetryTitle,
            node = {},
            elementType = "element-authoredtext",
            primaryOption = "primary-paragraph",
            secondaryOption = "secondary-paragraph",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = poetryElementData
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for ELEMENT-TYPE----->poetry credits summary', () => {
        let type = "element-authoredtext",
            previousElementData = poetryTitle,
            node = {},
            elementType = "element-authoredtext",
            primaryOption = "primary-paragraph",
            secondaryOption = "secondary-paragraph",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = poetryElementData
 
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
    it('Test for ELEMENT-TYPE -----> figure ---->authoredtext', () => {
        let type = "figure",
            previousElementData = {
                figuretype: 'authoredtext',
                subtitle: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>',
                html: {
                    footnotes: []
                }
            },
            node = {},
            elementType = "figure",
            primaryOption = "primary-mathml-equation",
            secondaryOption = "secondary-mathml-equation",
            activeEditorId = "cypress-7-1",
            index = 0,
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
    it('Test for handleBlankLineDom method - without replaceText parameter', () => {
        jest.spyOn(updateFunction, 'handleBlankLineDom');
        const handleBlankLineDom = updateFunction.handleBlankLineDom('<span contenteditable="false" id="blankLine" class="answerLineContent"><\/span>', '');
        expect(handleBlankLineDom).toBe('<span contenteditable="false" id="blankLine" class="answerLineContent"><br></span>');
    })
    it('Test for handleBlankLineDom method - with replaceText parameter', () => {
        jest.spyOn(updateFunction, 'handleBlankLineDom');
        const handleBlankLineDom = updateFunction.handleBlankLineDom('<span contenteditable="false" id="blankLine" class="answerLineContent"><br><\/span>', 'replaceText');
        expect(handleBlankLineDom).toBe('<span contenteditable="false" id="blankLine" class="answerLineContent">replaceText</span>');
    })
    it('Test for getMetaDataFieldForPopup method - !hasFormattedSubtitle block', () => {
        jest.spyOn(updateFunction, 'getMetaDataFieldForPopup');
        const getMetaDataFieldForPopup = updateFunction.getMetaDataFieldForPopup({popupdata: {'formatted-title': ''}}, null);
        expect(getMetaDataFieldForPopup).toBe('formattedTitleOnly');
    })
    it('Test for getMetaDataFieldForPopup method - !hasFormattedTitle block', () => {
        jest.spyOn(updateFunction, 'getMetaDataFieldForPopup');
        const getMetaDataFieldForPopup = updateFunction.getMetaDataFieldForPopup({popupdata: {'formatted-subtitle': ''}}, null);
        expect(getMetaDataFieldForPopup).toBe('formattedSubtitle');
    })
    it('Test for getMetaDataFieldForPopup method - !hasFormattedTitle && !hasFormattedSubtitle', () => {
        jest.spyOn(updateFunction, 'getMetaDataFieldForPopup');
        const getMetaDataFieldForPopup = updateFunction.getMetaDataFieldForPopup({popupdata: {}}, null);
        expect(getMetaDataFieldForPopup).toBe('formattedTitle');
    })
    it('Test for ELEMENT-TYPE----->figure---->codelisting', () => {
        const preformattedText = document.createElement('div');
        preformattedText.id = 'cypress-0-3';
        preformattedText.innerHTML = '';
        document.body.appendChild(preformattedText);
        let type = "figure",
            previousElementData = {
                figuretype: 'codelisting',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y',
                html: {
                    footnotes: []
                },
                figuredata: { programlanguage: '' }
            },
            node = {},
            elementType = "figure",
            primaryOption = "primary-blockcode-equation",
            secondaryOption = "secondary-blockcode-language-default",
            activeEditorId = "cypress-0-1",
            index = 0,
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
            switch (selector) {
                case '.div.element-container.active[data-id="urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y"] div.blockCodeFigure':
                    return null;
            }
        });
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })
})