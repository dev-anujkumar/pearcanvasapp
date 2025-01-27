import * as updateFunction from '../../../src/component/ElementContainer/UpdateElements';
import * as utils from '../../../src/constants/utility';
import { poetryTitle, stanzaData, citationElementData, elementAuthoredText, figureData, audioVideoData, interactiveData, mathMLData, blockCodeEditorData, singleAssessmentData, assessmentSlateData, openerElementData,asideElementData, interactiveDataPDF,poetryElementData } from '../../../fixtures/UpdateElementsTestData';
import tinyMCE from 'tinymce/tinymce'
import config from "../../../src/config/config.js"
import { figureImageData, updatedElement, figureElmInteractiveData, figureBlockCodeData, figureBlockMathData } from "./UpdateElementsTestData.js";
jest.mock('./../../../src/constants/utility.js', () => ({
    matchHTMLwithRegex: jest.fn(),
    removeBlankTags: jest.fn(),
    createLabelNumberTitleModel: jest.fn(),
    getDesignType:jest.fn(),
    handleTinymceEditorPlugins: jest.fn(() => 'lists advlist placeholder charmap paste image casechange'),
    removeBlankSpaceAndConvertToLowercase: jest.fn(() => "pearsoncanadainline")
}))

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
            },
            showHideType = 'show',
            asideData = {
                element:{subtype:"workedexample"},
                type: "manifestlist",
                index: '0-0-0-1'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,showHideType,asideData);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,showHideType,asideData)
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
            containerContext = {props : {
                activeElement:{
                    assetIdFor3PISmartlink: "3rd-party",
                    selectedIntendedPlaybackModeValue: [
                        { label: 'Inline', value: 'inline' },
                        { label: 'Modal', value: 'modal' },
                        { label: 'New Tab', value: 'tab' },
                        { label: 'New Window', value: 'window' },
                    ]
                }
            }},
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
    it('Test for ELEMENT-TYPE----->Assessment Slate - learningtemplate as assessmentformat', () => {
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
        previousElementData["elementdata"]["assessmentformat"] = 'learningtemplate';
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
    it('Test for ELEMENT-TYPE----->Opener Element without elementData', () => {
        let elementData = null,
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
                contentUrn:"80",
                type: 'showhide'
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
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement, "hide");
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement, "hide")
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
    it('Test for ELEMENT-TYPE -----> poetry without formatted-title', () => {
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
        delete parentElement["contents"]["formatted-title"];
        parentElement["contents"]["creditsarray"][0]["id"] = "urn:pearson:work:ae3869c3-3d38-4219-9546-027cdfbaafad";
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
            },
            asideData = {
                type: "manifestlist",
                index: '0-0-0-1'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"show",asideData);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"show",asideData)
    })
    it('Test for ELEMENT-TYPE -----> show hide parent - poetry - formatted-title', () => {
        let type = "element-authoredtext",
            previousElementData = asideElementData,
            node = {},
            elementType = "poetry",
            primaryOption = "primary-aside-aside",
            secondaryOption = "secondary-aside-sb1",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y',
                contentUrn:"80",
                interactivedata: {
                    show: [{
                        type: 'poetry',
                        contents: {
                            'formatted-title': {
                                id: 'urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636'
                            }
                        }
                    }]
                }
            },
            asideData = {
                index: '0-0-0-1'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"show",asideData);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"show",asideData)
    })
    it('Test for ELEMENT-TYPE -----> show hide parent - poetry - creditsarray', () => {
        let type = "element-authoredtext",
            previousElementData = asideElementData,
            node = {},
            elementType = "poetry",
            primaryOption = "primary-aside-aside",
            secondaryOption = "secondary-aside-sb1",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y',
                contentUrn:"80",
                interactivedata: {
                    show: [{
                        type: 'poetry',
                        contents: {
                            'creditsarray': [{
                                id: 'urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27636'
                            }]
                        }
                    }]
                }
            },
            asideData = {
                index: '0-0-0-1'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"show",asideData);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"show",asideData)
    })
    it('Test for ELEMENT-TYPE -----> show hide - no poetry element', () => {
        let type = "element-authoredtext",
            previousElementData = asideElementData,
            node = {},
            elementType = "poetry",
            primaryOption = "primary-aside-aside",
            secondaryOption = "secondary-aside-sb1",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y',
                contentUrn:"80",
                interactivedata: {
                    show: [{
                        type: 'authored-text'
                    }]
                }
            },
            asideData = {
                index: '0-0-0-1'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"show",asideData);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"show",asideData)
    })
    it('Test for ELEMENT-TYPE -----> show hide parent - elementType - figure', () => {
        let type = "element-authoredtext",
            previousElementData = asideElementData,
            node = {},
            elementType = "figure",
            primaryOption = "primary-aside-aside",
            secondaryOption = "secondary-aside-sb1",
            activeEditorId = "cypress-0-1",
            index = "0-1",
            containerContext = {},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y',
                contentUrn:"80"
            },
            asideData = {
                index: '0-0-0-1'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"show",asideData);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement,"show",asideData)
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
                figuredata: { programlanguage: '' },
                subtitle: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>'
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

    it('Testing - podHtmlmatchWithRegex method - with parameter', () => {
        const getpodHtmlmatchWithRegex = updateFunction.podHtmlmatchWithRegex('print');
        expect(getpodHtmlmatchWithRegex).toBe(true);
    })

    it('Testing - podHtmlmatchWithRegex method - without parameter', () => {
        const getpodHtmlmatchWithRegex = updateFunction.podHtmlmatchWithRegex('');
        expect(getpodHtmlmatchWithRegex).toBe(false);
    })

    xit('Test for ELEMENT-TYPE----->figure---->image/tableImage/mathImage - with DOM reference', () => {

        // creating cypress DOM elements for handling getElementById reference 
        for (let element = 0; element < 6; element++) {
            let cypress = document.createElement('div')
            cypress.id = `cypress-7-${element}`;
            cypress.innerHTML = '<p>cypress</p>';
            cypress.innerText = 'cypress'
            document.body.append(cypress);
        }

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

    it('Test for ELEMENT-TYPE----->figure---->interactive - with DOM reference', () => {
        let type = "figure",
            previousElementData = interactiveData,
            node = {},
            elementType = "element-interactive",
            primaryOption = "primary-mmi",
            secondaryOption = "secondary-interactive-mmi",
            activeEditorId = "cypress-7-1",
            index = 7,
            containerContext = {props : {
                activeElement:{
                    assetIdFor3PISmartlink: "3rd-party",
                    selectedIntendedPlaybackModeValue: [
                        { label: 'Inline', value: 'inline' },
                        { label: 'Modal', value: 'modal' },
                        { label: 'New Tab', value: 'tab' },
                        { label: 'New Window', value: 'window' },
                    ]
                }
            }},
            parentElement = {
                type: 'showhide',
                id: 'urn:pearson:work:f3fbd8cd-6e1b-464a-8a20-c62d4b9f319y'
            };
        jest.spyOn(updateFunction, 'createUpdatedData')
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement);
        expect(updateFunction.createUpdatedData).toHaveBeenCalledWith(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext, parentElement)
    })

    xit('Test for ELEMENT-TYPE----->figure---->codelisting - with DOM reference', () => {
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
            index = 7,
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

    it('Test for ELEMENT-TYPE -----> figure ---->authoredtext - with DOM reference', () => {
        let type = "figure",
            previousElementData = {
                figuretype: 'authoredtext',
                html: {
                    footnotes: []
                }
            },
            node = {},
            elementType = "figure",
            primaryOption = "primary-mathml-equation",
            secondaryOption = "secondary-mathml-equation",
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

    describe("Branch Coverage", () => {
        describe("Testing generateCommonFigureData()", () => {
            it("AutoNumbering is true", () => {
                jest.spyOn(updateFunction, 'generateCommonFigureData');
                document.getElementById = jest.fn()
                    .mockReturnValueOnce({
                        innerHTML: "Figure",
                        innerText: "Figure"
                    })
                    .mockReturnValueOnce({
                        innerHTML: "1",
                        innerText: {
                            replace: jest.fn().mockReturnValueOnce("1")
                        }
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Figure 1",
                        innerText: {
                            replace: jest.fn().mockReturnValueOnce("Figure 1")
                        }
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Caption for Figure 1",
                        innerText: {
                            replace: jest.fn().mockReturnValueOnce("Caption for Figure 1")
                        }
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Credit for Figure 1",
                        innerText: {
                            replace: jest.fn().mockReturnValueOnce("Credit for Figure 1")
                        }
                    })
                document.querySelector = jest.fn()
                    .mockReturnValue({
                        getAttribute: jest.fn().mockReturnValue("100%") 
                    })
                jest.spyOn(utils, "matchHTMLwithRegex").mockReturnValue(true);
                jest.spyOn(updateFunction, "podHtmlmatchWithRegex").mockReturnValue(true);
                updateFunction.generateCommonFigureData(1, figureImageData, null, "primary-image-figure", "secondary-image-figure-width", true, "Default Auto-number");
                expect(updateFunction.generateCommonFigureData).toBeCalled();
            })
        })

        describe("Testing updateAutoNumberedElement()", () => {
            it("Testing for AUTO_NUMBER_SETTING_RESUME_NUMBER", () => {
                jest.spyOn(updateFunction, 'updateAutoNumberedElement');
                updateFunction.updateAutoNumberedElement("Resume numbering with", updatedElement, { displayedlabel: "Figure", manualoverride: { "resumenumbervalue" : 12 } });
                expect(updateFunction.updateAutoNumberedElement).toBeCalled();
            })
            it("Testing for AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER", () => {
                jest.spyOn(updateFunction, 'updateAutoNumberedElement');
                updateFunction.updateAutoNumberedElement("Override label & number", updatedElement, { displayedlabel: "Figure", manualoverride: { "resumenumbervalue" : 12 } });
                expect(updateFunction.updateAutoNumberedElement).toBeCalled();
            })
            it("Testing for AUTO_NUMBER_SETTING_OVERRIDE_NUMBER", () => {
                jest.spyOn(updateFunction, 'updateAutoNumberedElement');
                updateFunction.updateAutoNumberedElement("Override number only", updatedElement, { displayedlabel: "Figure", manualoverride: { "resumenumbervalue" : 12 } });
                expect(updateFunction.updateAutoNumberedElement).toBeCalled();
            })
            it("Testing for AUTO_NUMBER_SETTING_REMOVE_NUMBER", () => {
                jest.spyOn(updateFunction, 'updateAutoNumberedElement');
                let updatedElement2 = {...updatedElement};
                updatedElement2["manualoverride"] = { "resumenumbervalue" : 12 }
                updateFunction.updateAutoNumberedElement("Remove label & number", updatedElement2, { displayedlabel: "Figure", manualoverride: { "resumenumbervalue" : 12 } });
                expect(updateFunction.updateAutoNumberedElement).toBeCalled();
            })
            it("Testing for AUTO_NUMBER_SETTING_DEFAULT", () => {
                jest.spyOn(updateFunction, 'updateAutoNumberedElement');
                let updatedElement2 = {...updatedElement};
                updatedElement2["manualoverride"] = { "resumenumbervalue" : 12 }
                updateFunction.updateAutoNumberedElement("Default Auto-number", updatedElement2, { displayedlabel: "Figure", manualoverride: { "resumenumbervalue" : 12 } });
                expect(updateFunction.updateAutoNumberedElement).toBeCalled();
            })
        })

        describe("Testing generateCommonFigureDataInteractive()", () => {
            it("AutoNumbering is true", () => {
                jest.spyOn(updateFunction, 'generateCommonFigureDataInteractive');
                document.getElementById = jest.fn()
                    .mockReturnValueOnce({
                        innerHTML: "Interactive",
                        innerText: "Interactive"
                    })
                    .mockReturnValueOnce({
                        innerHTML: "1",
                        innerText: {
                            replace: jest.fn().mockReturnValueOnce("1")
                        }
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Elm Interactive 1",
                        innerText: {
                            replace: jest.fn().mockReturnValueOnce("Elm Interactive 1")
                        }
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Caption for Elm Interactive",
                        innerText: {
                            replace: jest.fn().mockReturnValueOnce("Caption for Elm Interactive")
                        }
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Credit for Elm Interactive 1",
                        innerText: {
                            replace: jest.fn().mockReturnValueOnce("Credit for Elm Interactive 1")
                        }
                    })
                document.querySelector = () => {
                    return {
                        querySelector: () => {
                            return {
                                innerText: "Elm Interactive 1"
                            }
                        }
                    }
                }
                let containerContext = {props : {
                    activeElement:{
                        assetIdFor3PISmartlink: "3rd-party",
                        selectedIntendedPlaybackModeValue: [
                            { label: 'Inline', value: 'inline' },
                            { label: 'Modal', value: 'modal' },
                            { label: 'New Tab', value: 'tab' },
                            { label: 'New Window', value: 'window' },
                        ]
                    }
                }};
                updateFunction.generateCommonFigureDataInteractive(1, figureElmInteractiveData, "element-interactive", "primary-elm-interactive", "secondary-elm-interactive", true, "Default Auto-number", containerContext);
                expect(updateFunction.generateCommonFigureDataInteractive).toBeCalled();
            })
            it("AutoNumbering is true - autoNumberOption === AUTO_NUMBER_SETTING_REMOVE_NUMBER", () => {
                jest.spyOn(updateFunction, 'generateCommonFigureDataInteractive');
                document.getElementById = jest.fn()
                    .mockReturnValueOnce({
                        innerHTML: "Interactive",
                        innerText: "Interactive"
                    })
                    .mockReturnValueOnce({
                        innerHTML: "1",
                        innerText: {
                            replace: jest.fn().mockReturnValueOnce("1")
                        }
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Elm Interactive 1",
                        innerText: {
                            replace: jest.fn().mockReturnValueOnce("Elm Interactive 1")
                        }
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Caption for Elm Interactive",
                        innerText: {
                            replace: jest.fn().mockReturnValueOnce("Caption for Elm Interactive")
                        }
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Credit for Elm Interactive 1",
                        innerText: {
                            replace: jest.fn().mockReturnValueOnce("Credit for Elm Interactive 1")
                        }
                    })
                document.querySelector = () => {
                    return {
                        querySelector: () => {
                            return {
                                innerText: "Elm Interactive 1"
                            }
                        }
                    }
                }
                let containerContext = {props : {
                    activeElement:{
                        assetIdFor3PISmartlink: "3rd-party",
                        selectedIntendedPlaybackModeValue: [
                            { label: 'Inline', value: 'inline' },
                            { label: 'Modal', value: 'modal' },
                            { label: 'New Tab', value: 'tab' },
                            { label: 'New Window', value: 'window' },
                        ]
                    }
                }};
                updateFunction.generateCommonFigureDataInteractive(1, figureElmInteractiveData, "element-interactive", "primary-elm-interactive", "secondary-elm-interactive", true, "Remove label & number",containerContext);
                expect(updateFunction.generateCommonFigureDataInteractive).toBeCalled();
            })
            describe(`previousElementData.figuredata.interactivetype === '3rd-party' || previousElementData.figuredata.interactivetype === "table"`, () => {
                it("When podwidth is present", () => {
                    jest.spyOn(updateFunction, 'generateCommonFigureDataInteractive');
                    document.getElementById = jest.fn()
                        .mockReturnValueOnce({
                            innerHTML: "Interactive",
                            innerText: "Interactive"
                        })
                        .mockReturnValueOnce({
                            innerHTML: "1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("1")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Elm Interactive 1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Elm Interactive 1")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Caption for Elm Interactive",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Caption for Elm Interactive")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Credit for Elm Interactive 1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Credit for Elm Interactive 1")
                            }
                        })
                    document.querySelector = jest.fn()
                        .mockReturnValue({
                            getAttribute: jest.fn().mockReturnValue("100%") 
                        })
                    jest.spyOn(utils, "matchHTMLwithRegex").mockReturnValue(true);
                    jest.spyOn(updateFunction, "podHtmlmatchWithRegex").mockReturnValue(true);
                    let figureElmInteractiveData2 = {...figureElmInteractiveData};
                    figureElmInteractiveData2["figuredata"] = {
                        "interactivetype": "table",
                        "posterimage": {
                            "podwidth": "100%"
                        }
                    }
                    let containerContext = {props : {
                        activeElement:{
                            assetIdFor3PISmartlink: "3rd-party",
                            selectedIntendedPlaybackModeValue: [
                                { label: 'Inline', value: 'inline' },
                                { label: 'Modal', value: 'modal' },
                                { label: 'New Tab', value: 'tab' },
                                { label: 'New Window', value: 'window' },
                            ]
                        }
                    }};
                    updateFunction.generateCommonFigureDataInteractive(1, figureElmInteractiveData2, "element-interactive", "primary-elm-interactive", "secondary-elm-interactive", true, "Default Auto-number", containerContext);
                    expect(updateFunction.generateCommonFigureDataInteractive).toBeCalled();
                })
                it("When podwidth is not present", () => {
                    jest.spyOn(updateFunction, 'generateCommonFigureDataInteractive');
                    document.getElementById = jest.fn()
                        .mockReturnValueOnce({
                            innerHTML: "Interactive",
                            innerText: "Interactive"
                        })
                        .mockReturnValueOnce({
                            innerHTML: "1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("1")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Elm Interactive 1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Elm Interactive 1")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Caption for Elm Interactive",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Caption for Elm Interactive")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Credit for Elm Interactive 1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Credit for Elm Interactive 1")
                            }
                        })
                    document.querySelector = jest.fn()
                        .mockReturnValue({
                            getAttribute: jest.fn().mockReturnValue(null)
                        })
                    jest.spyOn(utils, "matchHTMLwithRegex").mockReturnValue(true);
                    jest.spyOn(updateFunction, "podHtmlmatchWithRegex").mockReturnValue(true);
                    let figureElmInteractiveData2 = {...figureElmInteractiveData};
                    figureElmInteractiveData2["figuredata"] = {
                        "interactivetype": "table",
                    }
                    let containerContext = {props : {
                        activeElement:{
                            assetIdFor3PISmartlink: "3rd-party",
                            selectedIntendedPlaybackModeValue: [
                                { label: 'Inline', value: 'inline' },
                                { label: 'Modal', value: 'modal' },
                                { label: 'New Tab', value: 'tab' },
                                { label: 'New Window', value: 'window' },
                            ]
                        }
                    }};
                    updateFunction.generateCommonFigureDataInteractive(1, figureElmInteractiveData2, "element-interactive", "primary-elm-interactive", "secondary-elm-interactive", true, "Default Auto-number",containerContext);
                    expect(updateFunction.generateCommonFigureDataInteractive).toBeCalled();
                })
                it("When podwidth is present and interactivetype === '3rd-party'", () => {
                    jest.spyOn(updateFunction, 'generateCommonFigureDataInteractive');
                    document.getElementById = jest.fn()
                        .mockReturnValueOnce({
                            innerHTML: "Interactive",
                            innerText: "Interactive"
                        })
                        .mockReturnValueOnce({
                            innerHTML: "1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("1")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Elm Interactive 1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Elm Interactive 1")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Caption for Elm Interactive",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Caption for Elm Interactive")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Credit for Elm Interactive 1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Credit for Elm Interactive 1")
                            }
                        })
                    document.querySelector = jest.fn()
                        .mockReturnValue({
                            getAttribute: jest.fn().mockReturnValue("100%") 
                        })
                    jest.spyOn(utils, "matchHTMLwithRegex").mockReturnValue(true);
                    jest.spyOn(updateFunction, "podHtmlmatchWithRegex").mockReturnValue(true);
                    let figureElmInteractiveData2 = {...figureElmInteractiveData};
                    figureElmInteractiveData2["figuredata"] = {
                        "interactivetype": "3rd-party",
                        "posterimage": {
                            "podwidth": "100%"
                        }
                    }
                    let containerContext = {props : {
                        activeElement:{
                            assetIdFor3PISmartlink: "3rd-party",
                            selectedIntendedPlaybackModeValue: [
                                { label: 'Inline', value: 'inline' },
                                { label: 'Modal', value: 'modal' },
                                { label: 'New Tab', value: 'tab' },
                                { label: 'New Window', value: 'window' },
                            ]
                        }
                    }};
                    updateFunction.generateCommonFigureDataInteractive(1, figureElmInteractiveData2, "element-interactive", "primary-elm-interactive", "secondary-elm-interactive", true, "Default Auto-number", containerContext);
                    expect(updateFunction.generateCommonFigureDataInteractive).toBeCalled();
                })
                it("When podwidth is present and interactivetype === '3rd-party' else case", () => {
                    jest.spyOn(updateFunction, 'generateCommonFigureDataInteractive');
                    document.getElementById = jest.fn()
                        .mockReturnValueOnce({
                            innerHTML: "Interactive",
                            innerText: "Interactive"
                        })
                        .mockReturnValueOnce({
                            innerHTML: "1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("1")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Elm Interactive 1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Elm Interactive 1")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Caption for Elm Interactive",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Caption for Elm Interactive")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Credit for Elm Interactive 1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Credit for Elm Interactive 1")
                            }
                        })
                    document.querySelector = jest.fn()
                        .mockReturnValue({
                            getAttribute: jest.fn().mockReturnValue("100%") 
                        })
                    jest.spyOn(utils, "matchHTMLwithRegex").mockReturnValue(true);
                    jest.spyOn(updateFunction, "podHtmlmatchWithRegex").mockReturnValue(true);
                    let figureElmInteractiveData2 = {...figureElmInteractiveData};
                    figureElmInteractiveData2["figuredata"] = {
                        "interactivetype": "3rd-party",
                        "posterimage": {
                            "podwidth": "100%"
                        }
                    }
                    let containerContext = {props : {
                        activeElement:{
                            assetIdFor3PISmartlink: "3rd-party"
                        }
                    }};
                    updateFunction.generateCommonFigureDataInteractive(1, figureElmInteractiveData2, "element-interactive", "primary-elm-interactive", "secondary-elm-interactive", true, "Default Auto-number", containerContext);
                    expect(updateFunction.generateCommonFigureDataInteractive).toBeCalled();
                })
            })
            describe(`previousElementData.figuredata.interactivetype === "pdf" || previousElementData.figuredata.interactivetype === "pop-up-web-link" || previousElementData.figuredata.interactivetype === "web-link"`, () => {
                it("When posterObject & postertext is present", () => {
                    jest.spyOn(updateFunction, 'generateCommonFigureDataInteractive');
                    document.getElementById = jest.fn()
                        .mockReturnValueOnce({
                            innerHTML: "Interactive",
                            innerText: "Interactive"
                        })
                        .mockReturnValueOnce({
                            innerHTML: "1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("1")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Elm Interactive 1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Elm Interactive 1")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Caption for Elm Interactive",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Caption for Elm Interactive")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Credit for Elm Interactive 1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Credit for Elm Interactive 1")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Inner HTML of postertext",
                            innerText: "Inner Text of postertext"
                        })
                    let figureElmInteractiveData2 = {...figureElmInteractiveData};
                    figureElmInteractiveData2["figuredata"] = {
                        "interactivetype": "pdf",
                        "postertext": {
                            "text": "Lorem Ipsum"
                        }
                    }
                    let containerContext = {props : {
                        activeElement:{
                            assetIdFor3PISmartlink: "3rd-party",
                            selectedIntendedPlaybackModeValue: [
                                { label: 'Inline', value: 'inline' },
                                { label: 'Modal', value: 'modal' },
                                { label: 'New Tab', value: 'tab' },
                                { label: 'New Window', value: 'window' },
                            ]
                        }
                    }};
                    updateFunction.generateCommonFigureDataInteractive(1, figureElmInteractiveData2, "element-interactive", "primary-elm-interactive", "secondary-elm-interactive", true, "Default Auto-number",containerContext);
                    expect(updateFunction.generateCommonFigureDataInteractive).toBeCalled();
                })
                it("When posterObject & postertext is present", () => {
                    jest.spyOn(updateFunction, 'generateCommonFigureDataInteractive');
                    document.getElementById = jest.fn()
                        .mockReturnValueOnce({
                            innerHTML: "Interactive",
                            innerText: "Interactive"
                        })
                        .mockReturnValueOnce({
                            innerHTML: "1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("1")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Elm Interactive 1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Elm Interactive 1")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Caption for Elm Interactive",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Caption for Elm Interactive")
                            }
                        })
                        .mockReturnValueOnce({
                            innerHTML: "Credit for Elm Interactive 1",
                            innerText: {
                                replace: jest.fn().mockReturnValueOnce("Credit for Elm Interactive 1")
                            }
                        })
                    let figureElmInteractiveData2 = {...figureElmInteractiveData};
                    figureElmInteractiveData2["figuredata"] = {
                        "interactivetype": "pdf"
                    }
                    let containerContext = {props : {
                        activeElement:{
                            assetIdFor3PISmartlink: "3rd-party",
                            selectedIntendedPlaybackModeValue: [
                                { label: 'Inline', value: 'inline' },
                                { label: 'Modal', value: 'modal' },
                                { label: 'New Tab', value: 'tab' },
                                { label: 'New Window', value: 'window' },
                            ]
                        }
                    }};
                    updateFunction.generateCommonFigureDataInteractive(1, figureElmInteractiveData2, "element-interactive", "primary-elm-interactive", "secondary-elm-interactive", true, "Default Auto-number",containerContext);
                    expect(updateFunction.generateCommonFigureDataInteractive).toBeCalled();
                })
            })
        })

        describe("Testing generateCommonFigureDataBlockCode()", () => {
            it("When Autonumbering is true", () => {
                jest.spyOn(updateFunction, 'createUpdatedData');
                document.querySelector = jest.fn()
                    .mockReturnValueOnce({
                        getAttribute: jest.fn().mockReturnValueOnce(0).mockReturnValueOnce("true").mockReturnValueOnce("true")
                    })
                document.getElementById = jest.fn()
                    .mockReturnValueOnce({
                        innerHTML: "Custom",
                        innerText: "Custom"
                    })
                    .mockReturnValueOnce({
                        innerHTML: "1"
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Block Code Subtitle",
                        innerText: "Block Code Subtitle"
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Preformatted Text"
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Preformatted Text"
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Block Code Caption",
                        innerText: "Block Code Caption"
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Block Code Credit",
                        innerText: "Block Code Credit"
                    })
                updateFunction.createUpdatedData("figure", figureBlockCodeData, null, "figure", "primary-blockcode-equation", "secondary-blockcode-language-c++", null, 1, null, null, null, null, true, "Default Auto-number")
                expect(updateFunction.createUpdatedData).toBeCalled();
            })
        })

        describe("Testing generateCommonFigureDataAT()", () => {
            it("When Autonumbering is true", () => {
                jest.spyOn(updateFunction, 'createUpdatedData');
                document.getElementById = jest.fn()
                    .mockReturnValueOnce({
                        innerHTML: "Custom",
                        innerText: "Custom"
                    })
                    .mockReturnValueOnce({
                        innerHTML: "1"
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Block Math Subtitle",
                        innerText: "Block Math Subtitle"
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Block Math Caption",
                        innerText: "Block Math Caption"
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Block Math Credit",
                        innerText: "Block Math Credit"
                    })
                    .mockReturnValueOnce({
                        innerHTML: "Preformatted Text",
                        innerText: "Preformatted Text"
                    })
                updateFunction.createUpdatedData("figure", figureBlockMathData, null, "figure", "primary-mathml-equation", "secondary-mathml-equation", null, 1, null, null, null, null, true, "Default Auto-number")
                expect(updateFunction.createUpdatedData).toBeCalled();
            })
        })
    })
})