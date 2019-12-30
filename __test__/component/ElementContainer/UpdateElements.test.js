import * as updateFunction from '../../../src/component/ElementContainer/UpdateElements';
import { elementAuthoredText, figureData, audioVideoData, interactiveData, mathMLData, blockCodeEditorData, singleAssessmentData, assessmentSlateData, openerElementData } from '../../../fixtures/UpdateElementsTestData';
import tinyMCE from 'tinymce/tinymce'
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
    xit('Test for ELEMENT-TYPE----->figure---->BlockCodeEditor', () => {
        const elementDiv = document.createElement('div');
        elementDiv.className = "divCodeSnippetFigure blockCodeFigure";

        const elementPre = document.createElement('pre');
        elementPre.className = "code-listing";

        const code = document.createElement('code');
        code.id = "cypress-4-2";
        code.textContent = "blockCode";
        code.innerText = "blockCode";
        code.innerHTML = "blockCode";
        elementPre.appendChild(code);
        elementDiv.appendChild(elementPre);
        document.body.appendChild(elementDiv);
        
        let type = "figure",
            previousElementData = blockCodeEditorData,
            node = {},
            elementType = "figure",
            primaryOption = "primary-blockcode-equation",
            secondaryOption = "secondary-blockcode-language-C++",
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
    xit('Test for ELEMENT-TYPE----->figure---->SingleAssessment', () => {
        const elementDiv = document.createElement('div');
        elementDiv.setAttribute('data-id', "urn:pearson:work:7b027839-60ae-4673-a80b-00d5a6567bd9");

        const elementFigure = document.createElement('figure');
        elementFigure.className = "figureAssessment";

        const elementTitle = document.createElement('div');
        elementTitle.id = "single_assessment_title";
        // elementTitle.innerText = "Title"
        elementFigure.appendChild(elementTitle);

        const elementIdInfo = document.createElement('div');
        elementIdInfo.className = "singleAssessmentIdInfo";
        elementIdInfo.textContent = "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74";
        elementIdInfo.innerText = "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74";
        elementFigure.appendChild(elementIdInfo);

        const elementItemIdInfo = document.createElement('div');
        elementItemIdInfo.className = "singleAssessmentItemIdInfo";
        elementItemIdInfo.innerText = "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0ba74";
        elementFigure.appendChild(elementItemIdInfo);

        const elementUsageType = document.createElement('span');
        elementUsageType.className = "singleAssessment_Dropdown_currentLabel";
        elementUsageType.innerText = "Quiz";
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
})