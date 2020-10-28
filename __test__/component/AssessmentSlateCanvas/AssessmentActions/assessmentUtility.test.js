/**************************Import Plugins**************************/
import React from 'react';
/**************************Import Modules**************************/
import * as assessment_UtiltyFn from '../../../../src/component/AssessmentSlateCanvas/AssessmentActions/assessmentUtility.js';

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
        const spyFunction = jest.spyOn(assessment_UtiltyFn, 'checkEmbeddedElmAssessment');
        assessment_UtiltyFn.checkEmbeddedElmAssessment(model);
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
});
