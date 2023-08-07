/**************************Import Plugins**************************/
import React from 'react';
/**************************Import Modules**************************/
import * as assessment_UtiltyFn from '../../../../src/component/AssessmentSlateCanvas/AssessmentActions/assessmentUtility.js';
import { newFigureObj } from '../../../../fixtures/ElementFigureTestingData';
import { audioElementTypeAlfrescoWithData } from '../../../../fixtures/ElementAudioVideoTestingData';
import { Interactive3party, interactiveElm3PI, interactiveWeblink, OpenerElement } from '../../../../fixtures/ElementInteractiveTesting';

describe('Test---Assessment Utility Functions', () => {
    describe('Test 1---setAssessmentTitle Function', () => {
        it('Test 1.1---setAssessmentTitle- Default', () => {
            let model = {
                type: "figure",
                figuredata: {
                    elementdata: {}
                }
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentTitle');
            assessment_UtiltyFn.setAssessmentTitle(model);
            expect(spyFunction).toHaveBeenCalledWith(model);
            spyFunction.mockClear();
        });
        it('Test 1.2---setAssessmentTitle- html.title present', () => {
            let model = {
                type: "element-assessment",
                html: {
                    title: 'Title Present'
                }
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentTitle');
            assessment_UtiltyFn.setAssessmentTitle(model);
            expect(spyFunction).toHaveBeenCalledWith(model);
            expect(spyFunction).toHaveReturnedWith('Title Present');
            spyFunction.mockClear();
        });
        it('Test 1.3---setAssessmentTitle- html.title not present', () => {
            let model = {
                type: "figure",
                title: {
                    text: 'Title Text'
                }
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentTitle');
            assessment_UtiltyFn.setAssessmentTitle(model);
            expect(spyFunction).toHaveBeenCalledWith(model);
            expect(spyFunction).toHaveReturnedWith('Title Text');
            spyFunction.mockClear();
        });
    });
    describe('Test 2---setAssessmentUsageType Function', () => {
        it('Test 2.1---setAssessmentUsageType- Default', () => {
            let model = {
                type: "figure",
                figuredata: {
                    elementdata: {}
                }
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentUsageType');
            assessment_UtiltyFn.setAssessmentUsageType(model);
            expect(spyFunction).toHaveBeenCalledWith(model);
            expect(spyFunction).toHaveReturnedWith('');
            spyFunction.mockClear();
        });
        it('Test 2.2---setAssessmentUsageType- Assessment_Slate', () => {
            let model = {
                type: "element-assessment",
                elementdata: {
                    usagetype: 'Homework'
                }
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentUsageType');
            assessment_UtiltyFn.setAssessmentUsageType(model);
            expect(spyFunction).toHaveBeenCalledWith(model);
            expect(spyFunction).toHaveReturnedWith('Homework');
            spyFunction.mockClear();
        });
        it('Test 2.3---setAssessmentUsageType- Single_Assessment', () => {
            let model = {
                type: "figure",
                figuretype: "assessment",
                figuredata: {
                    elementdata: {
                        usagetype: 'Journal'
                    }
                }
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentUsageType');
            assessment_UtiltyFn.setAssessmentUsageType(model);
            expect(spyFunction).toHaveBeenCalledWith(model);
            expect(spyFunction).toHaveReturnedWith('Journal');
            spyFunction.mockClear();
        });
    });
    describe('Test 3---setAssessmentProperties Function', () => {
        it('Test 3.1---setAssessmentProperties- Default/CITE', () => {
            let elementType = "cite"
            let assessmentClasses = {
                divMainClass: 'divAssessmentItem',
                divInnerClass: 'assessmentItem'
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentProperties');
            assessment_UtiltyFn.setAssessmentProperties(elementType);
            expect(spyFunction).toHaveBeenCalledWith(elementType);
            spyFunction.mockClear();
        });
        it('Test 3.2---setAssessmentProperties- Default/TDX', () => {
            let elementType = "tdx"
            let assessmentClasses = {
                divMainClass: 'divTdxAssessmentItem',
                divInnerClass: 'tdxAssessmentItem'
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentProperties');
            assessment_UtiltyFn.setAssessmentProperties(elementType);
            expect(spyFunction).toHaveBeenCalledWith(elementType);
            spyFunction.mockClear();
        });
        it('Test 3.3---setAssessmentProperties- Default/PUF', () => {
            let elementType = "puf"
            let assessmentClasses = {
                divMainClass: 'divPUFItem',
                divInnerClass: 'pufItem'
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentProperties');
            assessment_UtiltyFn.setAssessmentProperties(elementType);
            expect(spyFunction).toHaveBeenCalledWith(elementType);
            spyFunction.mockClear();
        });
        it('Test 3.4---setAssessmentProperties- Default/LEARNOSITY', () => {
            let elementType = "learnosity"
            let assessmentClasses = {
                divMainClass: 'divLearnosityItem',
                divInnerClass: 'learnosityItem'
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentProperties');
            assessment_UtiltyFn.setAssessmentProperties(elementType);
            expect(spyFunction).toHaveBeenCalledWith(elementType);
            spyFunction.mockClear();
        });
    });
    it('Test 4---setAssessmentFormat', () => {
        let model = {
            elementdata: { assessmentformat: "test" }
        }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentFormat');
        assessment_UtiltyFn.setAssessmentFormat(model);
        expect(spyFunction).toHaveReturnedWith("test");
        spyFunction.mockClear();
    });
    it('Test 4---setAssessmentFormat : else case', () => {
        let model = {
            elementdata: { assessmentformat: "fpo" }
        }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentFormat');
        assessment_UtiltyFn.setAssessmentFormat(model);
        expect(spyFunction).toHaveReturnedWith("");
        spyFunction.mockClear();
    });
    it('Test 5---setAssessmentElement ', () => {
        let model = {
            elementdata: { assessmentid: "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d" }
        }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentElement');
        assessment_UtiltyFn.setAssessmentElement(model);
        expect(spyFunction).toHaveReturnedWith({ "assessmentId": "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d", "itemId": "", "title": "" }
        );
        spyFunction.mockClear();
    });
    it('Test 6---hasAssessmentID ', () => {
        let model = {
            elementdata: { assessmentid: "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d" }
        }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'hasAssessmentID');
        assessment_UtiltyFn.hasAssessmentID(model);
        expect(spyFunction).toHaveReturnedWith(true)
        spyFunction.mockClear();
    });
    it('Test 6---hasAssessmentID : false case', () => {
        let model = {}
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'hasAssessmentID');
        assessment_UtiltyFn.hasAssessmentID(model);
        expect(spyFunction).toHaveReturnedWith(false)
        spyFunction.mockClear();
    });
    it('Test 7.1---checkFullElmAssessment-If', () => {
        let model = {
            type: 'element-assessment',
            elementdata: {
                assessmentformat: "puf",
                assessmentid: "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d"
            }
        }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkFullElmAssessment');
        assessment_UtiltyFn.checkFullElmAssessment(model);
        expect(spyFunction).toHaveReturnedWith(true)
        spyFunction.mockClear();
    });
    it('Test 7.2---checkFullElmAssessment-Else', () => {
        let model = {
            type: 'element-assessment',
            elementdata: {
                assessmentid: "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d"
            }
        }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkFullElmAssessment');
        assessment_UtiltyFn.checkFullElmAssessment(model);
        expect(spyFunction).toHaveReturnedWith(false)
        spyFunction.mockClear();
    });
    it('Test 8.1---checkEmbeddedElmAssessment-If', () => {
        let model = {
            type: 'figure',
            figuretype: 'assessment',
            figuredata: {
                elementdata: {
                    assessmentformat: "puf",
                    assessmentid: "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d"
                }
            }
        }
        let assessReducer = {
            figuredata: {
                elementdata: {
                    assessmentformat: "puf",
                    assessmentid: "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d"
                }
            },
            assessReducer: false
        }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkEmbeddedElmAssessment');
        assessment_UtiltyFn.checkEmbeddedElmAssessment(model,assessReducer);
        expect(spyFunction).toHaveReturnedWith(true)
        spyFunction.mockClear();
    });
    it('Test 8.2---checkEmbeddedElmAssessment-Else', () => {
        let model = {
            type: 'figure',
            figuretype: 'assessment',
            figuredata: {
                elementdata: {
                    assessmentid: "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d"
                }
            }
        }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkEmbeddedElmAssessment');
        assessment_UtiltyFn.checkEmbeddedElmAssessment(model);
        expect(spyFunction).toHaveReturnedWith(false)
        spyFunction.mockClear();
    });
    it('Test 9.1---checkElmAssessmentStatus-If', () => {
        let assessmentId = "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d",
            props = {
                assessmentReducer: {
                    "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d": {
                        showUpdateStatus: false
                    }
                }
            }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkElmAssessmentStatus');
        assessment_UtiltyFn.checkElmAssessmentStatus(assessmentId, props);
        expect(spyFunction).toHaveReturnedWith(false)
        spyFunction.mockClear();
    });
    it('Test 9.2---checkElmAssessmentStatus-Else', () => {
        let assessmentId = "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d",
            props = {
                assessmentReducer: {
                    "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d": {
                        showUpdateStatus: true
                    }
                }
            }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkElmAssessmentStatus');
        assessment_UtiltyFn.checkElmAssessmentStatus(assessmentId, props);
        expect(spyFunction).toHaveReturnedWith(true)
        spyFunction.mockClear();
    });
    it('Test 10---getAssessmentTitle- IF', () => {
        let model = {
            type: "figure",
            figuredata: {
                elementdata: {
                    assessmenttitle: 'main title'
                }
            }
        }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'getAssessmentTitle');
        assessment_UtiltyFn.getAssessmentTitle(model);
        expect(spyFunction).toHaveReturnedWith('main title');
        spyFunction.mockClear();
    });
    it('Test 10---getAssessmentTitle- else', () => {
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'getAssessmentTitle');
        assessment_UtiltyFn.getAssessmentTitle();
        spyFunction.mockClear();
    });
    it('Test 11---setAssessmentItemTitle- IF', () => {
        let model = {
            type: "figure",
            figuredata: {
                elementdata: {
                    assessmentitemtitle: "item's title"
                }
            }
        }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentItemTitle');
        assessment_UtiltyFn.setAssessmentItemTitle(model);
        expect(spyFunction).toHaveReturnedWith("item's title");
        spyFunction.mockClear();
    });
    it('Test 11---setAssessmentItemTitle- else', () => {
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentItemTitle');
        assessment_UtiltyFn.setAssessmentItemTitle();
        spyFunction.mockClear();
    });
    it('Test 12---setAssessmentElement -ELSE', () => {
        let model = {
        }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentElement');
        assessment_UtiltyFn.setAssessmentElement(model);
        expect(spyFunction).toHaveReturnedWith({})
        spyFunction.mockClear();
    });
    it('Test 13---setAssessmentElement - has assessmentitemid', () => {
        let model = {
            elementdata: {
                assessmentid: "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d",
                assessmentitemid: "test"
            }
        }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentElement');
        assessment_UtiltyFn.setAssessmentElement(model);
        expect(spyFunction).toHaveReturnedWith({ "assessmentId": "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d", "itemId": "test", "title": "" })
        spyFunction.mockClear();
    });
    it('Test 14---setAssessmentElement - LT/LA', () => {
        let model = {
            elementdata: {
                "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
                "assessmentid": "urn:pearson:learningtemplate:6edbc20b-83f7-496a-af5a-a0b07c7bc0e8",
                "assessmentformat": "learningtemplate",
                "usagetype": "Diagnostic",
                "learningsystem": "knowdl",
                "templateid": "43208",
                "templatetype": "exploring-solutions",
                "templatelabel": "9001 - myvirtual-x/myvirtual-child",
                "assessmentitemid": ""
            }
        }
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentElement');
        assessment_UtiltyFn.setAssessmentElement(model);
        expect(spyFunction).toHaveReturnedWith({ "assessmentId": "43208", "itemId": "", "title": "9001 - myvirtual-x/myvirtual-child" })
        spyFunction.mockClear();
    });

    it('Test 15B---checkFigureInsideTableElement Image for true case', () => { 
        let element = {
            "id": "urn:pearson:work:ec14b290-537e-41c4-afad-d4062a6aff7e",
            "type": "figure",
            "figuretype": "tableasmarkup",
            "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
            "titlecontentintitlefield": true,
            "figuredata": {
                "schema": "http://schemas.pearson.com/wip-authoring/table/1/definitions/tableasmarkup",
                "tableasHTML": "<table style=\"border-collapse: collapse; width: 1146px; word-break: normal; outline: none; text-align: left;\" class=\"mce-item-table\" class=\"imageAssetContent inlineImage\" contenteditable=\"false\"><tbody><tr><td style=\"width: 573px; outline: none;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/07655e98-e184-407b-9db5-77ee19255e95/Hydrangeas.jpg\" width=\"149\" height=\"112\" data-id=\"imageAssetContent:07655e98-e184-407b-9db5-77ee19255e95:8235\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/07655e98-e184-407b-9db5-77ee19255e95/Hydrangeas.jpg\"/></td><td style=\"width: 573px; outline: none;\"><br></td></tr><tr><td style=\"width: 573px; outline: none;\"><br></td><td style=\"width: 573px; outline: none;\"></td></tr></tbody></table>"
            },
           
        };
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkFigureInsideTableElement');
        let returnedValue = assessment_UtiltyFn.checkFigureInsideTableElement(element, 'editButton', ['alfresco_crud_access', 'add_multimedia_via_alfresco']);
        expect(spyFunction).toHaveBeenCalled();
        expect(returnedValue).toBe(true);
        // expect(spyFunction).toHaveReturnedWith(true);
        spyFunction.mockClear();
    });

    
    it('Test 15B---checkFigureInsideTableElement Image for false case', () => { 
        let element = {}
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkFigureInsideTableElement');
        let returnedValue = assessment_UtiltyFn.checkFigureInsideTableElement(element, 'editButton',["alfresco_crud_access", "add_multimedia_via_alfresco"]);
        expect(spyFunction).toHaveBeenCalled();
        expect(returnedValue).toBe(false);
        spyFunction.mockClear();
    });
    it('Test 15---checkFigureMetadata for Image', () => {
        let element = newFigureObj;
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkFigureMetadata');
        assessment_UtiltyFn.checkFigureMetadata(element);
        expect(spyFunction).toHaveReturnedWith(true);
        spyFunction.mockClear();
    });
    it('Test 16---checkFigureMetadata for Audio/Video', () => {
        let element = audioElementTypeAlfrescoWithData;
        let buttonType = 'alfrescoExpandButton'
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkFigureMetadata');
        assessment_UtiltyFn.checkFigureMetadata(element,buttonType);
        expect(spyFunction).toHaveReturnedWith(true);
        spyFunction.mockClear();
    });
    it('Test 17---checkFigureMetadata for interactive', () => {
        let element = Interactive3party;
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkFigureMetadata');
        assessment_UtiltyFn.checkFigureMetadata(element);
        expect(spyFunction).toHaveReturnedWith(false);
        spyFunction.mockClear();
    });
    it('Test 17---checkFigureMetadata else', () => {
        let element = {};
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkFigureMetadata');
        assessment_UtiltyFn.checkFigureMetadata(element);
        expect(spyFunction).toHaveReturnedWith(false);
        spyFunction.mockClear();
    });
    it('Test 17---checkInteractive', () => {
        let element = interactiveWeblink;
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkInteractive');
        assessment_UtiltyFn.checkInteractive(element);
        expect(spyFunction).toHaveReturnedWith(true);
        spyFunction.mockClear();
    });
    it('Test 17---checkInteractive', () => {
        let element = interactiveElm3PI;
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkInteractive');
        assessment_UtiltyFn.checkInteractive(element);
        expect(spyFunction).toHaveReturnedWith(true);
        spyFunction.mockClear();
    });
    it('Test 17---checkInteractive', () => {
        let element = {};
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkInteractive');
        assessment_UtiltyFn.checkInteractive(element);
        expect(spyFunction).toHaveReturnedWith(false);
        spyFunction.mockClear();
    });
    it('Test 18---checkOpenerElement', () => {
        let element = OpenerElement;
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkOpenerElement');
        assessment_UtiltyFn.checkOpenerElement(element);
        expect(spyFunction).toHaveReturnedWith(true);
        spyFunction.mockClear();
    });
    it('Test 18---checkOpenerElement', () => {
        let element = {};
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkOpenerElement');
        assessment_UtiltyFn.checkOpenerElement(element);
        expect(spyFunction).toHaveReturnedWith(false);
        spyFunction.mockClear();
    });
});
