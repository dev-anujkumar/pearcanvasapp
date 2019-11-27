import elementTypeConstant from '../../../src/component/ElementContainer/ElementConstants'
import elementTypes from '../../../src/component/Sidebar/elementTypes';
import config from '../../../src/config/config';
import  * as updateFunction from '../../../src/component/ElementContainer/UpdateElements';

describe('Test for UpdateElements Functions', () => {

    describe('Test for createUpdatedData Function',()=>{
        it('Test for ELEMENT-TYPE----->element-authoredtext',()=>{
            let type="element-authoredtext",
            previousElementData = {
                comments: false,
                contentUrn: "urn:pearson:entity:f8eb3251-4fab-45b8-be3e-7afe954d53ab",
                id: "urn:pearson:work:681c7a22-e40a-451f-9f87-dae336cfb2c0",
                index: "0",
                inputSubType: "NA",
                inputType: "AUTHORED_TEXT",
                schema: "http://schemas.pearson.com/wip-authoring/element/1",
                slateUrn: "urn:pearson:manifest:9e5b79dd-8e21-4e29-b56a-5cb933f51fbd",
                status: "wip",
                subtype: "",
                tcm: true,
                type: "element-authoredtext",
                versionUrn: "urn:pearson:work:681c7a22-e40a-451f-9f87-dae336cfb2c0",
                feedback: false,
                html:{
                    text: '<p class="paragraphNumeroUno"><br></p>'
                },
                elementdata:{
                    schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    text: "↵"
                }
        },
        node={}, 
        elementType="element-authoredtext", 
        primaryOption="primary-paragraph", 
        secondaryOption="secondary-paragraph", 
        activeEditorId="cypress-7", 
        index=7, 
        containerContext={};
        jest.spyOn(updateFunction, 'createUpdatedData') 
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext);
        expect(updateFunction.createUpdatedData).toHaveBeenCalled()
        })
        it('Test for ELEMENT-TYPE----->figure---->image/tableImage/mathImage',()=>{
            let type = "figure",
                previousElementData = {
                    alignment: "text-width",
                    captions: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "↵",
                        textsemantics: [],
                    },
                    comments: false,
                    contentUrn: "urn:pearson:entity:d0dd381d-ca8c-4651-9cf9-e7bbb4c6fd8d",
                    credits: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "↵",
                        textsemantics: [],
                    },
                    elementdata: {
                        text: null
                    },
                    feedback: false,
                    figuredata: {
                        height: "422",
                        path: "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                        schema: "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                        width: "680"
                    },
                    figuretype: "image",
                    html: {
                        captions: "<p><br></p>",
                        credits: "<p><br></p>",
                        footnotes: {},
                        glossaryentries: {},
                        postertext: "",
                        subtitle: "<p>gdg</p>",
                        text: "",
                        title: "<p>dgdg</p>"
                    },
                    id: "urn:pearson:work:f8d3bbf0-33bc-4272-8f88-27cb4dfd5203",
                    index: "1",
                    inputSubType: "IMAGE_TEXT_WIDTH",
                    inputType: "IMAGE",
                    schema: "http://schemas.pearson.com/wip-authoring/figure/1",
                    status: "wip",
                    subtitle: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "gdg",
                        textsemantics: []
                    },
                    subtype: "imageTextWidth",
                    tcm: false,
                    title: {
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "dgdg",
                        textsemantics: []
                    },
                    type: "figure",
                    versionUrn: "urn:pearson:work:f8d3bbf0-33bc-4272-8f88-27cb4dfd5203",
                },
                node = {},
                elementType = "figure",
                primaryOption = "primary-image-figure",
                secondaryOption = "secondary-image-figure-width",
                activeEditorId = "cypress-7-4",
                index = 7,
                containerContext = {};
        jest.spyOn(updateFunction, 'createUpdatedData') 
        updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext);
        expect(updateFunction.createUpdatedData).toHaveBeenCalled()
        })
        it('Test for ELEMENT-TYPE----->figure---->audio/video', () => {
            let type = "figure",
                previousElementData = {
                    alignment: "text-width",
                    captions: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "↵",
                        textsemantics: [],
                    },
                    comments: false,
                    contentUrn: "urn:pearson:entity:d0dd381d-ca8c-4651-9cf9-e7bbb4c6fd8d",
                    credits: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "↵",
                        textsemantics: [],
                    },
                    elementdata: {
                        text: null
                    },
                    feedback: false,
                    figuredata: {
                        clipinfo: {},
                        height: "399",
                        posterimage: {path: "https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png"},
                        schema: "http://schemas.pearson.com/wip-authoring/video/1#/definitions/video",
                        srctype: "externallink",
                        videos: [{path: "", format: ""}],
                        width: "600"
                    },
                    figuretype: "video",
                    html: {
                        captions: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>',
        	            credits: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>',
                        footnotes: {},
                        glossaryentries: {},
                        postertext: "",
                        subtitle: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>',
                        text: "",
                        title: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>'
                    },
                    id: "urn:pearson:work:febc9dd3-e259-4743-8ff3-404860bd9757",
                    index: "1",
                    inputSubType: "EXTERNAL_LINK",
                    inputType: "VIDEO",
                    schema: "http://schemas.pearson.com/wip-authoring/figure/1",
                    status: "wip",
                    subtitle: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "gdg",
                        textsemantics: []
                    },
                    subtype: "figureVideo",
                    tcm: false,
                    title: {
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "dgdg",
                        textsemantics: []
                    },
                    type: "figure",
                    versionUrn: "urn:pearson:work:f8d3bbf0-33bc-4272-8f88-27cb4dfd5203",
                },
                node = {},
                elementType = "video-audio",
                primaryOption = "primary-video",
                secondaryOption = "secondary-video-smartlink",
                activeEditorId = "cypress-7-1",
                index = 7,
                containerContext = {};
            jest.spyOn(updateFunction, 'createUpdatedData')
            updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext);
            expect(updateFunction.createUpdatedData).toHaveBeenCalled()
        })
        it('Test for ELEMENT-TYPE----->figure---->interactive', () => {
            let type = "figure",
                previousElementData = {
                    captions: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "↵",
                        textsemantics: [],
                    },
                    comments: false,
                    contentUrn: "urn:pearson:entity:d0dd381d-ca8c-4651-9cf9-e7bbb4c6fd8d",
                    credits: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "↵",
                        textsemantics: [],
                    },
                    elementdata: {
                        text: null
                    },
                    feedback: false,
                    figuredata: {
                        interactiveformat: "mmi",
                        interactivetype: "fpo",
                        schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive"
                    },
                    figuretype: "interactive",
                    html: {
                        captions: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>',
        	            credits: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>',
                        footnotes: {},
                        glossaryentries: {},
                        postertext: "",
                        subtitle: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>',
                        text: "",
                        title: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>'
                    },
                    id: "urn:pearson:work:febc9dd3-e259-4743-8ff3-404860bd9757",
                    index: "1",
                    inputSubType: "FLASHCARDS",
                    inputType: "MMI",
                    schema: "http://schemas.pearson.com/wip-authoring/figure/1",
                    status: "wip",
                    subtitle: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "gdg",
                        textsemantics: []
                    },
                    tcm: false,
                    title: {
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "dgdg",
                        textsemantics: []
                    },
                    type: "figure",
                    versionUrn: "urn:pearson:work:f8d3bbf0-33bc-4272-8f88-27cb4dfd5203",
                },
                node = {},
                elementType = "element-interactive",
                primaryOption = "primary-mmi",
                secondaryOption = "secondary-interactive-mmi",
                activeEditorId = "cypress-7-1",
                index = 7,
                containerContext = {};
            jest.spyOn(updateFunction, 'createUpdatedData')
            updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext);
            expect(updateFunction.createUpdatedData).toHaveBeenCalled()
        })
        it('Test for ELEMENT-TYPE----->figure---->MathML', () => {
            const element= document.createElement('div');
            element.id="cypress-5-2";
            document.body.appendChild(element);
            let type = "figure",
                previousElementData = {
                    alignment: "",
                    captions: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "↵",
                        textsemantics: [],
                    },
                    comments: false,
                    contentUrn: "urn:pearson:entity:d0dd381d-ca8c-4651-9cf9-e7bbb4c6fd8d",
                    credits: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "↵",
                        textsemantics: [],
                    },                   
                    feedback: false,
                    figuredata: {
                        elementdata: {
                            schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                            text: "",
                            mathml: [],
                            textsemantics: []
                        },
                        schema: "http://schemas.pearson.com/wip-authoring/element/1",
                        type: "element-authoredtext"
                    },
                    figuretype: "authoredtext",
                    html: {
                        captions: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>',
        	            credits: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>',
                        footnotes: {},
                        glossaryentries: {},
                        postertext: "",
                        subtitle: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>',
                        text: "",
                        title: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>'
                    },
                    id: "urn:pearson:work:f8d3bbf0-33bc-4272-8f88-27cb4dfd5203",
                    index: "4",
                    inputSubType: "MATHML",
                    inputType: "MATH_ML_CHEM_EDITOR",
                    schema: "http://schemas.pearson.com/wip-authoring/figure/1",
                    status: "wip",
                    subtitle: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "gdg",
                        textsemantics: []
                    },
                    subtype: "mathml",
                    tcm: false,
                    title: {
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "dgdg",
                        textsemantics: []
                    },
                    type: "figure",
                    versionUrn: "urn:pearson:work:f8d3bbf0-33bc-4272-8f88-27cb4dfd5203",
                },
                node = {},
                elementType = "figure",
                primaryOption = "primary-mathml-equation",
                secondaryOption = "secondary-mathml-equation",
                activeEditorId = "cypress-5-1",
                index = 5,
                containerContext = {};
            jest.spyOn(updateFunction, 'createUpdatedData')
            updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext);
            expect(updateFunction.createUpdatedData).toHaveBeenCalled()
        })
        it('Test for ELEMENT-TYPE----->figure---->BlockCodeEditor', () => {
            const elementDiv= document.createElement('div');
            elementDiv.className="divCodeSnippetFigure blockCodeFigure";

            const elementPre= document.createElement('pre');
            elementPre.className="code-listing";

            const code= document.createElement('code');
            code.id="cypress-4-2";
            code.innerText="blockCode";
            code.innerHTML="blockCode";
            elementPre.appendChild(code);
            elementDiv.appendChild(elementPre);
            document.body.appendChild(elementDiv);

            let type = "figure",
                previousElementData = {
                    alignment: "C++",
                    captions: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "↵",
                        textsemantics: [],
                    },
                    comments: false,
                    contentUrn: "urn:pearson:entity:d0dd381d-ca8c-4651-9cf9-e7bbb4c6fd8d",
                    credits: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "↵",
                        textsemantics: [],
                    },
                    elementdata: {
                        text: null
                    },
                    feedback: false,
                    figuredata: {
                        numbered: "true",
                        programlanguage: "C++",
                        schema: "http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                        startNumber: "1",
                        type: "codelisting",
                        preformattedtext: ["blockCode"]
                    },
                    figuretype: "codelisting",
                    html: {
                        captions: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>',
        	            credits: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>',
                        footnotes: {},
                        glossaryentries: {},
                        postertext: "",
                        subtitle: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>',
                        text: "",
                        title: '<p></p><p class="paragraphNumeroUno"><br></p><p></p>'
                    },
                    id: "urn:pearson:work:f8d3bbf0-33bc-4272-8f88-27cb4dfd5203",
                    index: "4",
                    inputSubType: "C_PLUS",
                    inputType: "BLOCK_CODE_EDITOR",
                    schema: "http://schemas.pearson.com/wip-authoring/figure/1",
                    status: "wip",
                    subtitle: {
                        footnotes: [],
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "gdg",
                        textsemantics: []
                    },
                    subtype: "codelisting",
                    tcm: false,
                    title: {
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "dgdg",
                        textsemantics: []
                    },
                    type: "figure",
                    versionUrn: "urn:pearson:work:f8d3bbf0-33bc-4272-8f88-27cb4dfd5203",
                },
                node = {},
                elementType = "figure",
                primaryOption = "primary-blockcode-equation",
                secondaryOption = "secondary-blockcode-language-C++",
                activeEditorId = "cypress-4-2",
                index = 4,
                containerContext = {};
            jest.spyOn(updateFunction, 'createUpdatedData')
            updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext);
            expect(updateFunction.createUpdatedData).toHaveBeenCalled()
        })
        it('Test for ELEMENT-TYPE----->figure---->SingleAssessment', () => {
            const elementDiv= document.createElement('div');
            elementDiv.setAttribute('data-id',"urn:pearson:work:7b027839-60ae-4673-a80b-00d5a6567bd9");

            const elementFigure= document.createElement('figure');
            elementFigure.className="figureAssessment";

            const elementTitle= document.createElement('div');
            elementTitle.id="single_assessment_title";
            elementTitle.innerText="Title"
            elementFigure.appendChild(elementTitle);

            const elementIdInfo= document.createElement('div');
            elementIdInfo.className="singleAssessmentIdInfo";
            elementIdInfo.innerText="urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74";
            elementFigure.appendChild(elementIdInfo);

            const elementItemIdInfo= document.createElement('div');
            elementItemIdInfo.className="singleAssessmentItemIdInfo";
            elementItemIdInfo.innerText="urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0ba74";
            elementFigure.appendChild(elementItemIdInfo);

            const elementUsageType= document.createElement('span');
            elementUsageType.className="singleAssessment_Dropdown_currentLabel";
            elementUsageType.innerText="Quiz";
            elementFigure.appendChild(elementUsageType);

            elementDiv.appendChild(elementFigure)
            document.body.appendChild(elementDiv);

            let type = "figure",
                previousElementData = {
                    comments: false,
                    contentUrn: "urn:pearson:entity:d0dd381d-ca8c-4651-9cf9-e7bbb4c6fd8d",
                    elementdata: {
                        text: null
                    },
                    feedback: false,
                    figuredata: {
                        elementdata: {
                            assessmentformat: "cite",
                            assessmentid: undefined,
                            assessmentitemid: undefined,
                            assessmentitemtype: "assessmentItem",
                            posterimage: { path: "https://cite-media-stg.pearson.com/legacy_paths/8e…41-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png" },
                            schema: "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
                            usagetype: "Quiz"
                        },
                        height: "501",
                        schema: "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
                        subtype: "assessment",
                        type: "element-assessment",
                        width: "840",
                    },
                    figuretype: "assessment",
                    id: "urn:pearson:work:7b027839-60ae-4673-a80b-00d5a6567bd9",
                    index: "0",
                    inputSubType: "QUIZ",
                    inputType: "SINGLE_ASSESSMENT_CITE",
                    schema: "http://schemas.pearson.com/wip-authoring/figure/1",
                    status: "wip",
                    tcm: false,
                    title: {
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "",
                        textsemantics: []
                    },
                    html:{
                        title: ""
                    },
                    type: "figure",
                    versionUrn: "urn:pearson:work:f8d3bbf0-33bc-4272-8f88-27cb4dfd5203",
                },
                node = {},
                elementType = "element-assessment",
                primaryOption = "primary-single-assessment",
                secondaryOption = "secondary-single-assessment-cite",
                activeEditorId = "cypress-7-1",
                index = 7,
                containerContext = {};
            jest.spyOn(updateFunction, 'createUpdatedData')
            updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext);
            expect(updateFunction.createUpdatedData).toHaveBeenCalled()
        })
        it('Test for ELEMENT-TYPE----->Assessment Slate', () => {
            let type="element-assessment",
                previousElementData = {
                comments: false,
                contentUrn: "urn:pearson:entity:d0dd381d-ca8c-4651-9cf9-e7bbb4c6fd8d",
                elementdata: {
                    assessmentformat: "cite",
                    assessmentid: "urn:pearson:work:5d17ccd9-4b1f-4489-b3c4-6cd558ee09a2",
                    assessmenttitle: "CITE-QA-Alfresco-27112019",
                    schema: "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
                    usagetype: "Quiz"
                },
                feedback: false,
                id: "urn:pearson:work:dacb8e9b-0f68-44e2-9c50-969eeefab538",
                schema: "http://schemas.pearson.com/wip-authoring/element/1",
                status: "wip",
                tcm: false,
                type: "element-assessment",
                versionUrn: "urn:pearson:work:dacb8e9b-0f68-44e2-9c50-969eeefab538"
                },
                elementType = "element-assessment",
                primaryOption = "primary-assessment-slate",
                secondaryOption = "secondary-assessment-cite",
                index = 0,
                node = "",
                activeEditorId = "cypress-7-1",                
                containerContext = {};

            jest.spyOn(updateFunction, 'createUpdatedData')
            updateFunction.createUpdatedData(type,previousElementData,node,elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext);
            expect(updateFunction.createUpdatedData).toHaveBeenCalled()
        })
        it('Test for ELEMENT-TYPE----->Worked-Example/Aside', () => {
            let type = "element-authoredtext",
                previousElementData = {
                    comments: false,
                    contentUrn: "urn:pearson:entity:8903b593-0856-4bdb-ba0f-f0e94f5dd2b6",
                    elementdata: {
                        text: null
                    },
                    feedback: false,
                    figuredata: {
                        elementdata: {
                            assessmentformat: "cite",
                            assessmentid: undefined,
                            assessmentitemid: undefined,
                            assessmentitemtype: "assessmentItem",
                            posterimage: { path: "https://cite-media-stg.pearson.com/legacy_paths/8e…41-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png" },
                            schema: "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
                            usagetype: "Quiz"
                        },
                        height: "501",
                        schema: "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
                        subtype: "assessment",
                        type: "element-assessment",
                        width: "840",
                    },
                    figuretype: "assessment",
                    id: "urn:pearson:work:7b027839-60ae-4673-a80b-00d5a6567bd9",
                    index: "4",
                    inputSubType: "QUIZ",
                    inputType: "SINGLE_ASSESSMENT_CITE",
                    schema: "http://schemas.pearson.com/wip-authoring/figure/1",
                    status: "wip",
                    tcm: false,
                    title: {
                        mathml: [],
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: "",
                        textsemantics: []
                    },
                    html:{
                        title: ""
                    },
                    type: "figure",
                    versionUrn: "urn:pearson:work:f8d3bbf0-33bc-4272-8f88-27cb4dfd5203",
                },
                node = {},
                elementType = "element-authoredtext",
                primaryOption = "primary-paragraph",
                secondaryOption = "secondary-paragraph",
                activeEditorId = "cypress-4-0",
                index = "4-0",
                containerContext = {};
            jest.spyOn(updateFunction, 'createUpdatedData')
            updateFunction.createUpdatedData(type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, index, containerContext);
            expect(updateFunction.createUpdatedData).toHaveBeenCalled()
        })
        it('Test for ELEMENT-TYPE----->Opener Element', () => {
            let elementData = {
                    comments: false,
                    contentUrn: "urn:pearson:entity:39a7a694-d342-42d4-9171-8649de19f0d4",
                    elementdata: {
                        schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        text: ""
                    },
                    feedback: false,
                    id: "urn:pearson:work:b1468edb-1fe1-464e-9e2c-90885e2882d0",
                    schema: "http://schemas.pearson.com/wip-authoring/element/1",
                    status: "wip",
                    subtype: "",
                    tcm: true,
                    type: "element-authoredtext",
                    versionUrn: "urn:pearson:work:b1468edb-1fe1-464e-9e2c-90885e2882d0",
                    html:{
                        text: '<p class="paragraphNumeroUno"></p>'
                    },
                    type: "openerelement"
                },
                elementType = "openerelement",
                primaryOption = "primary-openerelement",
                secondaryOption = "secondary-openerelement";
            jest.spyOn(updateFunction, 'createOpenerElementData')
            updateFunction.createOpenerElementData(elementData, elementType, primaryOption, secondaryOption);
            expect(updateFunction.createOpenerElementData).toHaveBeenCalled()
        })
    })
})